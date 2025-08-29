import { useForm } from "react-hook-form";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authSchema";
import InputField from "../components/forms/InputField";
import {Link, useLocation} from "react-router-dom";

import { useState } from "react";
export default function Login() {
    const { register, handleSubmit, formState:{errors}} =useForm({resolver : zodResolver(loginSchema)});
    const [backendError, setBackendError] = useState("");
    const location = useLocation();
    const signupSuccess = location.state?.signupSuccess;

    const onSubmit = async (data) =>{
        setBackendError("");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", data);
            localStorage.setItem("token", res.data.token);
            // Fetch user data from backend using token
            const userRes = await axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${res.data.token}` }
            });
            localStorage.setItem("user", JSON.stringify(userRes.data.user));
            window.location.href = "/dashboard";
        } catch (error) {
            setBackendError(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            {signupSuccess && <div className="text-green-600 mb-4">Successfully signed up! Please login.</div>}
            {backendError && <div className="text-red-500 mb-4">{backendError}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Email" register={register("email")} error={errors.email} />
                <InputField label="Password" register={register("password")} error={errors.password} type="password" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
        </div>
    )
}