import RoomCard from "./RoomCard";
import { getUserFromToken } from "@/utils/auth";

export default function Home({ room, loading}){
    const user = getUserFromToken();

     if (loading){
        return(
         
            <>
             <div className="flex flex-col justify-centre items-centre">
                     <div className="p-5 bg-green-100">
                    <p className="text-xl font-semibold dark:text-black">{`Hello ${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} welcome`}</p>
                    
                    </div>
                
                <main className="max-w-5xl mx-auto p-4">
                    <div className="flex justify-centre items-centre h-64">
                        <div className="text-lg dark:text-black">Head over to rooms to book it.</div>
                    </div>

                </main>
             </div>

            </>
        );
    }
    return(
        
        <div className="max-w-5xl mx-auto p-4">
                           <div>
                             <p>{`Hello ${user.firstName} welcome`}</p>
                        
                          </div>
             { room.booked ? (
                            <RoomCard />

                        ) : "" }

        </div>
    )
  
       
                       



     
}