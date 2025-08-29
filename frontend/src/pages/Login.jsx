import { useForm } from "react-hook-form";
import axios from axios;
import {zodResolver} from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authSchema";
import InputField from "../components/forms/InputField";
import {Link} from "react-router-dom";

export default function Login() {
    const { register, handleSubmit, formState:{errors}} =useForm({resolver : zodResolver(loginSchema)});

    const onSubmit = async (data) =>{
        try {
            const res = await axios.post("https://localhost:5000/api/auth/login", data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user))
            window.location.href = "/dashboard";
        } catch (error) {
            alert(error.response?.data?.messgae || "Login failed")
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-6">Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Email" register={register("email")} error={errors.email} />
                <InputField label="Password" register={register("password")} error={errors.password} />
                <button type="submit" className="w-full bg-blue-600 text-whtie py-2 rounded-lg hover:bg-blue-700">
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
        </div>
    )
}