import { useState, useEffect } from "react";
import API from "../services/api";
import SubjectCard from "../components/SubjectCard";
import SubjectDialog from "@/components/SubjectDialog";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function AdminDashboard(){
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadSubjects = async () =>{
        try {

            const res = await API.get("/subjects/all");
            setSubjects(res.data);
            
        } catch (error) {
            toast.error("Failed to load subjects");
            
        }finally{
            setLoading(false);
        }
    };

    useEffect(() =>{
        loadSubjects();
    }, []);

    const createSubject = async (payload) =>{
        try{
            const res = await API.post("/subjects", payload);
            setSubjects(prev => [res.data, ...prev]);
            toast.success("Task created");
        }catch(err){
            toast.error("Failed to create subject")
        }
    };

    const toggleSubject = async (id) =>{
        try {
            const subject = subjects.find(s => s._id === id);
            const res = await API.put(`/subjects/${id}`, {completed: !subject.completed});
            setSubjects(prev => prev.map(s => (s._id === id ? res.data : s)));
            toast.success("Task updated");
            
        } catch (error) {
            toast.error("Failed to update subject");
            
        }
    };

    const deleteSubject = async (id) =>{
        try {
            await API.delete (`/subjects/${id}`);
            setSubjects(prev => prev.filter(s => s._id !== id));
            toast.success("Subject deleted");
            
        } catch (error) {
            toast.error("Failed to delete subject");
            
        }
    };

    if (loading){
        return(
            <>
                <Navbar />
                <main className="max-w-5xl mx-auto p-4">
                    <div className="flex justify-centre items-centre h-64">
                        <div className="text-lg">Loading tasks...</div>
                    </div>

                </main>
            </>
        );
    }

    return(
        <>
           <Navbar />
           <main className="max-w-5xl mx-auto p-4">
             <div className="flex justify-between items-centre mb-6">
                <div>
                    <h1 className="tect-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-300">Manage all the subjects</p>
                </div>
                <SubjectDialog onSubmit={createSubject} />
             </div>

             <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h2 className="font-semibold text-blue-900 dark:text-blue-100">Admin view</h2>
                 <p className="text-sm text-blue-700 dark:text-blue-300">
                  You can do CRUD operations. Total subjects: {subjects.length}
                 </p>
             </div>

             <section
                 className="grid gap-6
                             sm:grid-cols-2
                             lg:grid-cols-3
                             xl:grid-cols-4"                 
                 >
                    {subjects.map(s =>(
                        <div key={s._id} className="relative">
                            <SubjectCard
                                subject={s}
                                onToggle={toggleSubject}
                                onDelete={deleteSubject} 
                            />

                            {s.owner && (
                                <div className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                                    @{s.owner.first_name}

                                </div>
                            )}

                        </div>
                    ))}

             </section>
          {subjects.length === 0 &&(
            <div className="text-centre py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    No subjects found
                </p>
            </div>
          )}

           </main>
        </>
    );
}