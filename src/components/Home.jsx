import RoomCard from "./RoomCard";

export default function Home({ room, loading, setLoading, user}){
    <div>
        <p>{`Hello ${user.firstName} welcome`}</p>
    </div>

       if (loading){
        return(
            <>
                
                <main className="max-w-5xl mx-auto p-4">
                    <div className="flex justify-centre items-centre h-64">
                        <div className="text-lg">Loading your rooms...</div>
                    </div>

                </main>
            </>
        );
    }
    return(
        <div className="max-w-5xl mx-auto p-4">
             { room.booked ? (
                            <RoomCard />

                        ) : "" }

        </div>
    )
       
                       



     
}