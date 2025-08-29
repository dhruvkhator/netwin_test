import { useState } from "react";
export default function InputField ({ label, register , error, type="text", ...rest}){
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    return (
        <div className="mb-4 relative">
            <label className="block font-medium mb-1">{label}</label>
            <input
                type={isPassword ? (show ? "text" : "password") : type}
                {...register}
                {...rest}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            {isPassword && (
                <span
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={() => setShow((prev) => !prev)}
                >
                    {show ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.001 12c2.25 4.5 6.75 7.5 12 7.5 1.664 0 3.26-.262 4.74-.75M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.02-3.777A10.477 10.477 0 0 1 21.999 12c-2.25 4.5-6.75 7.5-12 7.5a10.477 10.477 0 0 1-4.74-.75" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-5.12M6.1 6.1A10.477 10.477 0 0 0 2.001 12c2.25 4.5 6.75 7.5 12 7.5 1.664 0 3.26-.262 4.74-.75M15 12a3 3 0 0 1-6 0 3 3 0 0 1 6 0Zm6.02-3.777A10.477 10.477 0 0 1 21.999 12c-2.25 4.5-6.75 7.5-12 7.5a10.477 10.477 0 0 1-4.74-.75" />
                        </svg>
                    )}
                </span>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    )
}