import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import API from "@/services/api";
// import RoomCard from "@/components/RoomCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
// import { Sidebar } from "lucide-react";
// import { Receipt } from "lucide-react";
// import Rooms from "@/components/Rooms";
// import Home from "@/components/Home";

export default function AdminDashboard(){
    const [rooms, setRooms] = useState([]);
    const [openSidebarToggle, setOpenSidebareToggle] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadRooms = async () =>{
        const res = await API.get("/rooms/me");
        setRooms(res.data);
    };

    useEffect(() =>{
        loadRooms();
    }, []);

    const openSidebar = () =>{
        setOpenSidebareToggle(!openSidebarToggle);
    };

    return(
        <div>
            <Navbar />
        </div>
    )
    
    

   



}