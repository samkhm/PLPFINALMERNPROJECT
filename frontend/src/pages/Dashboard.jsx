import { useEffect, useState } from "react";
import API from "@/services/api";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

export default function Dashboard(){
const [activeSection, setActiveSection] = useState('home');
const [loading, setLoading] = useState(true);
const [openSidebar, setSidebar] = useState(false);
const [rooms, setRooms] = useState([]);

const loadRooms = async () =>{
    try {
        const res = await API.get("/rooms/all");
        setRooms(res.data);
        
    } catch (error) {
        toast.error("Failed to load rooms")
        
    }finally{
        setLoading(false);
    }
};

useEffect(() =>{
    loadRooms();
}, []);




    return(
        <div>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] h-screen">
                <Sidebar activeSection ={activeSection} setActiveSection={setActiveSection} />
                <MainContent activeSection={activeSection}  loading={loading} rooms={rooms}/>

            </div>
        </div>
    )
}