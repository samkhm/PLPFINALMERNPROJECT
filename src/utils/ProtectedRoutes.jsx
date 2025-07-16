import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(){
    const token = localStorage.getItem("token");
    return token ? children: <Navigate to="/login" replace/>
}