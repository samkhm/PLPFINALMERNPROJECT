import RoomCard from "./RoomCard";
import { getUserRole } from "@/utils/auth";

export default function Rooms({rooms, loading, onDelete}){
    const userRole = getUserRole();

         if (loading){
        return(
            <>
                
                <main className="max-w-5xl mx-auto p-4">
                    <div className="flex justify-centre items-centre items-centre h-64 w-full">
                        <div className="text-lg">Loading rooms...</div>
                    </div>

                </main>
            </>
        );
    }

        if(userRole === 'user'){

    
                return(
                    <div className="max-w-5xl mx-auto p-4">
                    <section
                        className="grid gap-6
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4"
                        >
                            {rooms.map(r => (
                                <RoomCard
                                    key={r._id}
                                    room={r}                        
                                    onDelete={onDelete}
                                />

                            ))}

                        </section>

                        {rooms.length === 0 &&(
                        <div className="text-centre py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                No rooms found
                            </p>
                        </div>
                    )}

                    </div>
                );
            }

        if (userRole === 'admin'){
            return(
                //  create a room
                



                <div className="max-w-5xl mx-auto p-4">
                    <section
                        className="grid gap-6
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4"
                        >
                            {rooms.map(r => (
                                <RoomCard
                                    key={r._id}
                                    room={r}                        
                                    onDelete={onDelete}
                                />

                            ))}

                        </section>

                        {rooms.length === 0 &&(
                        <div className="text-centre py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                No rooms found
                            </p>
                        </div>
                    )}

                 </div>
            )
        }

}