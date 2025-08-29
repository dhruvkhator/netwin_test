import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../validation/taskSchema";
import InputField from "../components/forms/InputField";
import { Task, TaskStatus, User } from "../types";


export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [backendError, setBackendError] = useState("");
    const [activeFilter, setActiveFilter] = useState<string>("all");

    const token = localStorage.getItem("token");
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(taskSchema) })

    const fetchTasks = async (status = "") => {
        setBackendError("");
        setActiveFilter(status === "" ? "all" : status);
        try {
            const res = await axios.get<Task[]>(`http://localhost:5000/api/tasks${status ? `?status=${status}` : ""}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setTasks(res.data);
        } catch (error) {
            setBackendError(error.response?.data?.message || "Failed to fetch tasks");
        }
    }

    const onSubmit = async (data) => {
        setBackendError("");
        try {
            await axios.post('http://localhost:5000/api/tasks', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            reset();
            fetchTasks();
        } catch (error) {
            setBackendError(error.response?.data?.message || "Failed to add task");
        }
    }

    const handleDelete = async (id: string) => {
        setBackendError("");
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            setBackendError(error.response?.data?.message || "Failed to delete task");
        }
    }

    const handleUpdate = async (id: string, status: TaskStatus) => {
        setBackendError("");
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            setBackendError(error.response?.data?.message || "Failed to update task");
        }
    }

    useEffect(() => { fetchTasks() }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className=" flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || "User"}</h1>
                <button onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >Logout</button>
            </div>
            {backendError && <div className="text-red-500 mb-4">{backendError}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow rounded-xl mb-6">
                <InputField label="Title" register={register("title")} error={errors.title} />
                <select {...register("status")} className="border rounded-lg w-full px-3 py-2 mb-4">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Add Task</button>
            </form>

            <div className="flex gap-3 mb-2">
                {["all", "pending", "in-progress", "completed"].map((s) => (
                    <button
                        key={s}
                        onClick={() => fetchTasks(s === "all" ? "" : s)}
                        className={`px-3 py-1 rounded-lg transition-all font-medium border ${
                            activeFilter === s
                                ? "bg-blue-600 text-white border-blue-600 shadow"
                                : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                        }`}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
                    </button>
                ))}
            </div>
            <div className="mb-4 text-sm text-gray-600">
                Showing: <span className="font-semibold text-blue-700">{activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1).replace("-", " ")}</span> tasks
            </div>

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task._id} className="p-5 bg-white shadow-lg rounded-2xl flex items-center justify-between transition-all hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-lg font-semibold">{task.title}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                    task.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                    task.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                                    "bg-green-100 text-green-700"
                                }`}>
                                    {task.status.replace("-", " ")}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-1">
                                {["pending", "in-progress", "completed"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleUpdate(task._id, status as TaskStatus)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                                            task.status === status
                                                ? status === "pending"
                                                    ? "bg-yellow-400 text-white border-yellow-400"
                                                    : status === "in-progress"
                                                        ? "bg-blue-500 text-white border-blue-500"
                                                        : "bg-green-500 text-white border-green-500"
                                                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                                        }`}
                                        disabled={task.status === status}
                                    >
                                        {status.replace("-", " ")}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all"
                            title="Delete Task"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}