import RoomCard from "./RoomCard";
import RoomDialog from "./RoomDialog";
import { getUserRole } from "@/utils/auth";

export default function Rooms({ rooms, deleteRoom, createRoom }) {
  const userRole = getUserRole(); // If async, you'd use useEffect and useState

  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";

  const availableRooms = isUser
    ? rooms.filter((room) => !room.booked)
    : rooms;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {isAdmin && <RoomDialog onSubmit={createRoom} />}

      {availableRooms.length > 0 ? (
        <section
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {availableRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              deleteRoom={deleteRoom}
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
