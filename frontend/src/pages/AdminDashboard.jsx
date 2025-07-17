import { useEffect, useState } from "react";
import API from "@/services/api";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import AdminMainContent from "@/components/AdminMainContent";
import { use } from "react";
import fa from "zod/v4/locales/fa.cjs";


export default function AdminDashboard(){
const [activeSection, setActiveSection] = useState('home');
const [loading, setLoading] = useState(true);
const [openSidebar, setSidebar] = useState(false);
const [rooms, setRooms] = useState([]);

const loadRooms = async () =>{
    try {
    const res = await API.get("/rooms/all");
    setRooms(res.data);
    // console.log("res.data", res.data);
            
    } catch (error) {
        toast.error("Failed to load rooms");
        console.log("Fetch error", error);
        
    }finally{
        setLoading(false);
    }

};

useEffect(() => {
    loadRooms();
}, []);

const createRoom = async (payload) =>{
    try {
        const res = await API.post("/rooms", payload);
        
        setRooms(prev => [res.data, ...prev]);
        toast("Room created succesfuly");
        
        
    } catch (error) {
        console.log('Error when creating room', error);
        
    }
};

const approveRoom = async (id) =>{
    try {
        const room = rooms.find(r => r._id === id);
        const res = await API.put(`/room/${id}`, {available: !room.available});
        setRooms(prev => prev.map(r => (r._id === id ? res.data : r)));
        toast("Room approved");
        
    } catch (error) {
        toast.error("Failed to approve!")
        
    }
}

const deleteRoom = async (id) =>{
    await API.delete(`/rooms/${id}`);
    setRooms(prev => prev.filter(r => r._id !== id));
    toast("Room deleted");
};


    return(
        <div>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] h-screen">
                <Sidebar activeSection ={activeSection} setActiveSection={setActiveSection} />
                <AdminMainContent activeSection={activeSection}  loading={loading} createRoom={createRoom} deleteRoom={deleteRoom} onApprove={approveRoom} rooms={rooms}/>

            </div>
        </div>
    )
}