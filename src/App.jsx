import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleDashboard from "./pages/RoleDashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Toaster } from "sonner";

export default function App(){
  return(
    <BrowserRouter>
      < Toaster richColors position="top-right"/>
      <Routes>
        <Route path="/" element={<Navigate to ="/dashboard"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
           path="/dashboard"
           element = {
            <ProtectedRoutes>
              <RoleDashboard />
            </ProtectedRoutes>
           }
        />
      </Routes>
    </BrowserRouter>
  )
}