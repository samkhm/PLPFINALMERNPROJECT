import RoomCard from "./RoomCard";
import RoomDialog from "./RoomDialog";
import { getUserRole } from "@/utils/auth";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";



export default function Rooms({ rooms, deleteRoom, createRoom, deleteBookedRoom, 
  bookRoom, cancelRoom, query, setQuery}) {

 
    const [category, setCategory] = useState("all");
  const userRole = getUserRole(); // If async, you'd use useEffect and useState

  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";

  const availableRooms = isUser
    ? rooms.filter((room) => !room.booked)
    : rooms;

  
  //filter rooms based on serach
  let filtered = [ ...availableRooms];

      switch (category){
        case "booked":
          filtered = filtered.filter(room => room.booked);
          break;
        case "unbooked":
          filtered = filtered.filter(room => !room.booked);
          break;
        case "all":
        default:
          break;
      }
 

  const filteredRooms = isAdmin && query.trim() ? filtered.filter((room) => 
    room.roomNumber?.toLowerCase().includes(query.toLowerCase())) : filtered;

const categoryValue = [
  { name: "All Rooms", key: "all"},
  { name: "Booked", key: "booked"},
  { name: "Unbooked", key: "unbooked"},
]
  return (
    <div className="max-w-5xl mx-auto p-4">

     <div className="flex flex-wrap bg-gray-100 rounded gap-5 mb-5">
       {isAdmin && (
        <Input className="bg-gray-200 max-w-100 border-1 border-solid border-gray-700"
        placeholder = "Search..."
        value={query}
        onChange = {e => setQuery(e.target.value)}
         
         /> 
      )}
      {isAdmin && <RoomDialog onSubmit={createRoom} />}
      {isAdmin && (
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryValue.map((v) => (
                  <SelectItem key={v.key} value={v.key}>{v.name}</SelectItem>
                ))}                
                
              </SelectContent>
            </Select>
      )}

     </div>



      {filteredRooms.length > 0 ? (
        <section
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              deleteRoom={deleteRoom}
              bookRoom={bookRoom}
              cancelRoom={cancelRoom}
              deleteBookedRoom={deleteBookedRoom}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No rooms found</p>
        </div>
      )}
    </div>
  );
}
