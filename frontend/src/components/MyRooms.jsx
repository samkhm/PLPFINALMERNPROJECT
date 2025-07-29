import RoomCard from "./RoomCard";
import RoomDialog from "./RoomDialog";
import { getUserRole } from "@/utils/auth";
import API from "@/services/api";
import { toast } from "sonner";

export default function MyRooms({ myRooms, deleteRoom, createRoom, bookRoom, deleteBookedRoom }) {
  const userRole = getUserRole(); // If async, you'd use useEffect and useState

const makePayment = async (id) => {
  try {
    const response = await API.post(`/payment/makepayment/${id}`);
    const message = response?.data?.CustomerMessage || "Payment initiated successfully";
    toast.success(message);
  } catch (error) {
    const message =
      error?.response?.data?.error || error?.response?.data?.message || "Payment failed";
    toast.error(message);
    console.error("STK push error", error);
  }
};


  // const isAdmin = userRole === "admin";
  // const isUser = userRole === "user";

  // const bookedRooms = isUser
  //   ? myRooms.filter((room) => room.booked)
  //   : myRooms;

  return (
    <div className="max-w-5xl mx-auto p-4">
      
      {myRooms.length > 0 ? (
        <section
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {myRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              deleteRoom={deleteRoom}
              bookRoom={bookRoom}
              makePayment={makePayment}
              
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
