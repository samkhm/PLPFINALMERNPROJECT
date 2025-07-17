import { useEffect, useState } from "react";
import API from "@/services/api";
// import RoomCard from "@/components/RoomCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import MainContent from "@components/MainContent"
// import { Sidebar } from "lucide-react";
// import { Receipt } from "lucide-react";
// import Rooms from "@/components/Rooms";
// import Home from "@/components/Home";

export default function Dashboard(){
const [activeSection, setActiveSection] = useState('home')
const [openSidebar, setSidebar] = useState(false);

    return(
        <div>
            <Navbar />
            <div className="grid grid-cols-1 h-screen">
                <Sidebar activeSecction ={activeSection} setActiveSection={setActiveSection} />
                <MainContent activeSecction={activeSection} />

            </div>
        </div>
    )
}