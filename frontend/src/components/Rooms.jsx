import RoomCard from "./RoomCard";
import RoomDialog from "./RoomDialog";
import { getUserRole } from "@/utils/auth";

export default function Rooms({ rooms, deleteRoom, createRoom }) {
  const userRole = getUserRole(); // if async, refactor as described

  return (
    <div className="max-w-5xl mx-auto p-4">
      {userRole === "admin" && <RoomDialog onSubmit = {createRoom} />}

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
             deleteRoom={deleteRoom} />
        ))}
      </section>

      {rooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No rooms found</p>
        </div>
      )}
    </div>
  );
}
