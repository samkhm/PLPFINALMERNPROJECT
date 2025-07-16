import RoomCard from "./RoomCard";
export default function Rooms({rooms, loading, onDelete}){

         if (loading){
        return(
            <>
                
                <main className="max-w-5xl mx-auto p-4">
                    <div className="flex justify-centre items-centre h-64">
                        <div className="text-lg">Loading rooms...</div>
                    </div>

                </main>
            </>
        );
    }
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
    )

}