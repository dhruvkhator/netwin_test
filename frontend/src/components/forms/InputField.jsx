export default function InputField ({ label, register , error, type="text", ...rest}){
    return (
        <div className="mb-4">
            <label className="block font-medium mb-1">{label}</label>
            <input type={type} {...register} {...rest} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus: ring-2 focus:ring-blue-500" />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    )
}