import { Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { getUserRole } from "@/utils/auth";
export default function RoomCard({room, onBook, onPay, deleteRoom, bookRoom}){

    const user = getUserRole();
    return(
        <Card className={`relative animation-fade ${
            room.booked ? "bg-green-100" : ""
        }`}>

            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                 {room.roomNumber}
                </CardTitle>
             </CardHeader>

             <CardContent>
                <p className="text-md font-semibold">Amount: {room.price}</p>
             </CardContent>
             <CardContent>
                <p className="text-md font-semibold">Location: {room?.location?.charAt(0).toUpperCase() + room?.location?.slice(1)}</p>
             </CardContent>

             <CardFooter className="flex justify-between gap-2 flex-wrap">
                <Button onClick={() => bookRoom(room._id)} className={`bg-gray-400 ${room.booked ? "bg-blue-200" : ""}`}>{room.booked ? "Booked" : "Book Now"}</Button>
                <Button className={`bg-gray-400 ${room.booked ? "bg-green-200" : ""}`}>{room.payment ? "Payed" : "Pay Now"}</Button>
            
              { user === "admin" && (

                 <Button
                  size ="icon"
                  variant = "destructive"
                  onClick={() => deleteRoom(room._id)}
                > 
                 <TrashIcon className="h-5 w-5"/>
                </Button>              
            
              )}

                   

             </CardFooter>


        </Card>
    )
}