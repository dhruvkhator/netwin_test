import { useForm } from "react-hook-form";
import axios from axios;
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/authSchema";
import InputField from "../components/forms/InputField";
import { Link } from "react-router-dom";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("https://localhost:5000/api/auth/signup", data);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            alert(error.response?.data?.messgae || "Signup failed")
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-6">Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Name" register={register("name")} error={errors.name} />
                <InputField label="Email" register={register("email")} error={errors.email} />
                <InputField label="Password" register={register("password")} error={errors.password} />
                <button type="submit" className="w-full bg-blue-600 text-whtie py-2 rounded-lg hover:bg-blue-700">
                    Signup
                </button>
            </form>
            <p className="mt-4 text-center">Already have an account?{' '}
                <Link to="/" className="text-blue-600 hover:underline">Login</Link>
            </p>
        </div>
    )
}