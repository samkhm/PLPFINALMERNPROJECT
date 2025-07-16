import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import API from "@/services/api";
import RoomCard from "@/components/RoomCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { Sidebar } from "lucide-react";
import { Receipt } from "lucide-react";

export default function Dashboard(){
    const [rooms, setRooms] = useState([]);
    const [openSidebarToggle, setOpenSidebareToggle] = useState(false);

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
        <Router>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 bg- p-5">
                        <Routes to="/" element={<Home />} />
                        <Route to="/rooms" element={<Rooms />}/>
                        <Route to="/receipts" element={<Receipts />} />
                    </main>

                </div>
            </div>
        </Router>


    )



}