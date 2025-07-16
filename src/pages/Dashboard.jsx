import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import API from "@/services/api";
import RoomCard from "@/components/RoomCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { Sidebar } from "lucide-react";
import { Receipt } from "lucide-react";
import Rooms from "@/components/Rooms";
import Home from "@/components/Home";

export default function Dashboard(){
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
        <Router>
            <div className="grid grid-rows-[auto_1fr] grid-cols-[16rem_1fr] h-screen">
                <Navbar openSidebar={openSidebar} />                
                <Sidebar className="row-start-2" openSidebarToggle={openSidebarToggle} openSidebar={openSidebar} />
                    <main className="bg-white p-6 row-start-2 col-start-2">
                        <Routes to="/" element={<Home rooms={rooms} loading={loading} setLoading={setLoading}/>} />
                        <Route to="/rooms" element={<Rooms />}/>
                        <Route to="/receipts" element=""/>
                    </main>

                
            </div>
        </Router>


    )



}