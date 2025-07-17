import RoomCard from "./RoomCard";
import { getUserRole, getUserFromToken } from "@/utils/auth";

export default function Home({ room, loading }) {
  const user = getUserFromToken();
  const userRole = getUserRole();

  const capitalizedFirstName =
    user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="p-5 bg-green-100">
          <p className="text-xl font-semibold dark:text-black">
            {`Hello ${capitalizedFirstName}, welcome`}
          </p>
        </div>
        <main className="max-w-5xl mx-auto p-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg dark:text-black">
              {userRole === "user"
                ? "Head over to rooms to book one."
                : "Head over to rooms and create them."}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // When not loading
  if (userRole === "user") {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div>
          <p className="text-xl font-semibold dark:text-black">
            {`Hello ${capitalizedFirstName}, welcome`}
          </p>
        </div>
        {room?.booked && <RoomCard />}
      </div>
    );
  }

  // For admin or other roles
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-5 bg-green-100">
        <p className="text-xl font-semibold dark:text-black">
          {`Hello ${capitalizedFirstName}, welcome`}
        </p>
      </div>
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg dark:text-black">
            Head over to rooms and create them.
          </div>
        </div>
      </main>
    </div>
  );
}
