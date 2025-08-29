import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../validation/taskSchema";
import InputField from "../components/forms/InputField";
import { Task, TaskStatus, User } from "../types";


export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const token = localStorage.getItem("token");
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(taskSchema) })

    const fetchTasks = async (status = "") => {
        try {
            const res = await axios.get<Task[]>(`/api/tasks${status ? `?status=${status}` : ""}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setTasks(res.data);
        } catch (error) {
            console.log(error)
        }

    }

    const onSubmit = async (data) => {
        await axios.post('https://localhost:5000/api/tasks', data, {
            headers: { Authorization: `Bearer ${token}` }
        }
        );
        reset();
        fetchTasks();
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (id: string, status: TaskStatus) => {
        try {
            await axios.put(`https://localhost:5000/api/tasks/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            console.log(error)
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

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow rounded-xl mb-6">
                <InputField label="Title" register={register("title")} error={errors.title} />
                <select {...register("status")} className="border rounded-lg w-full px-3 py-2 mb-4">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button className="w-full bg-green-600 text-whtie py-2 rounded-lg hover:bg-green-700">Add Task</button>
            </form>


            <div className="flex gap-3 mb-4">
                {["all", "pending", "in-progres", "completed"].map((s) => (
                    <button key={s} onClick={() => fetchTasks(s === "all" ? "" : s)} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
                        {s}
                    </button>
                ))}
            </div>

            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li key={task._id} className="p-4 bg-white shadow rounded-xl flex justify-between">
                        <span>
                            {task.title}{" "}
                            <span className="text-sm text-gray-500">[{task.status}]</span>
                            <div className="flex gap-2">
                                <select value={task.status}
                                    onChange={(e) => handleUpdate(task._id, e.target.value as TaskStatus)}
                                    className="border px-2 py-1 rounded">
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onClick={()=> handleDelete(task._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                                        Delete
                                </button>
                            </div>
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    )
}