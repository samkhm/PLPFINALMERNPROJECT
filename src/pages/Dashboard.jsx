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
const [myRooms, setMyRooms] = useState([]);
const [myRoomCount, setMyRoomCount] = useState(null);

const loadRooms = async () =>{
    try {
        const res = await API.get("/rooms/all");
        setRooms(res.data);
        
    } catch (error) {
        const message = error?.response?.data?.message || "Room already exist";
        toast.error(message);        
    }finally{
        setLoading(false);
    }
};

const loadBookedRooms = async () =>{
    try {
        const res = await API.get("/rooms/getMyRoom");
        setMyRooms(res.data);
        setMyRoomCount(res.data.length);
        
    } catch (error) {
        const message = error?.response?.data?.message || "No Booked rooms";
        toast.error(message);        
    }finally{
        setLoading(false);
    }
};


useEffect(() =>{
    loadRooms();
    loadBookedRooms();
}, []);



const bookRoom = async (id) => {
    const room = rooms.find(r => r._id === id);
    if (!room) {
        toast.error("Room not found");
        return;
    }

    try {
        const res = await API.post(`/rooms/bookRoom/${id}`); // A new unified endpoint

        setRooms(prev => prev.map(r => (r._id === id ? res.data.room : r)));
        toast.success("Room booked successfully");

    } catch (error) {
        console.error("Booking error:", error);
        const message = error?.response?.data?.message || "Failed to book a room";
        toast.error(message);
    }
};



const deleteBookedRoom = async (id) =>{
    try {
        await API.delete(`/rooms/deleteBookedRoom/${id}`);
        setMyRooms(prev => prev.filter(r => r._id !== id));
        toast("Room unbooked successful");
        
    } catch (error) {
        console.log("Booking error", error);
        toast.error("Failed to cancel unbook");
        
    }
}



    return(
        <div>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] h-screen">
                <Sidebar activeSection ={activeSection} setActiveSection={setActiveSection} />
                <MainContent activeSection={activeSection}  
                loading={loading} rooms={rooms} myRooms={myRooms} 
                bookRoom={bookRoom} deleteBookedRoom={deleteBookedRoom}
                myRoomCount={myRoomCount}/>

            </div>
        </div>
    )
}