import { Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

export default function RoomCard(room, onBook, onPay, deleteRoom){
    return(
        <Card className={`relative animation-fade ${
            room.booked ? "bg-green-300" : ""
        }`}>

            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                 {room.roomNumber}
                </CardTitle>
             </CardHeader>

             <CardContent>
                <p className="text-md font-semibold">Amount: {room.price}</p>
             </CardContent>

             <CardFooter className="flex justify-between gap-2">
                <Button className={`bg-red-400 ${room.booked ? "bg-yellow-200" : ""}`}>{room.status}</Button>
                <Button className={`bg-red-400 ${room.booked ? "bg-yellow-200" : ""}`}>Payment</Button>
                <Button
                  size ="icon"
                  variant = "destructive"
                  onClick={() => deleteRoom(room._id)}
                >
                    <TrashIcon className="h-5 w-5"/>
                </Button>
             </CardFooter>


        </Card>
    )
}