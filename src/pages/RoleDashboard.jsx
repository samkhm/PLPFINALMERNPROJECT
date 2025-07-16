import { getUserRole } from "../utils/auth";
import  AdminDashboard from "./AdminDashboard";
import UserDashboard from "./Dashboard";
import { Navigate } from "react-router-dom";

export default function RoleDashboard(){
    const userRole = getUserRole();

    // if no role go to login
    if(!userRole){
        return <Navigate to="/login" replace />
    }

    // render dashboard based on role
    switch(userRole){
        case 'admin':
            return <AdminDashboard />;
        case 'user':
            return <UserDashboard />;
        default:
            return <Navigate to="/login" replace />
    }
}