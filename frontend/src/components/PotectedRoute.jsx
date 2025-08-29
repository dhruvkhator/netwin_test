import { Navigate, replace} from "react-router-dom";

export default function ProtectedRoute({children}){
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" replace />
}