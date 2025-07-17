import { Dialog, DialogTrigger, DialogContent, 
    DialogHeader, DialogTitle, DialogDescription, 
    DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RoomDialog({ onSubmit }){
    const [roomNumber, setRoomNumber] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = () =>{
        onSubmit({ roomNumber, price, location});
        setRoomNumber("");
        setPrice("");
        setLocation("");
    };

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Room</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Room</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Create a new room for your tenants.
                </DialogDescription>

                <Input 
                  placeholder="Enter room number, e.g A01"
                  value={roomNumber}
                  onChange={e => setRoomNumber(e.target.value)}
                />
                <Input 
                  placeholder="Price"
                  type= "number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
                <Input 
                  placeholder="Location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}