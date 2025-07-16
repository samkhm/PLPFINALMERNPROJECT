import { useEffect, useState } from "react";
import API from "../services/api";
import RoomCard from "../components/SubjectCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function Dashboard(){
    const [rooms, setRooms] = useState([]);

    const loadRooms = async () =>{
        const res = await API.get("/rooms/me");
        setRooms(res.data);
    };

    useEffect(() => {
        loadRooms();
    }, []);


    const toggleSubject = async (id) =>{
        const subject = subjects.find(s => s._id === id);
        const res = await API.put(`/subjects/${id}`, {completed: !subject.completed});
        setSubjects(prev => prev.map(s => (s._id === id ? res.data : s)));
    };

    const deleteRoom = async (id) =>{
        await API.delete(`/rooms/${id}`);
        setRooms(prev => prev.filter(s => s._id !== id));
        toast("Room deleted");
    };

  return(
    <>
        
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-centre mb-6">
                <h1 className="text-2xl font-bold">My Subjects</h1>
                <SubjectDialog onSubmit={createSubject} />
                
            </div>

            <section
               className="grid gap-6
               sm:grid-cols-2
               lg:grid-cols-3
               xl:grid-cols-4"
            >
                {subjects.map(s => (
                    <SubjectCard
                        key={s._id}
                        subject={s}
                        onToggle={toggleSubject}
                        onDelete={deleteSubject}
                     />

                ))}

            </section>

        </main>
    </>

  )
}