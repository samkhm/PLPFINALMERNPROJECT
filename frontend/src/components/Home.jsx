import RoomCard from "./RoomCard";
import { getUserRole, getUserFromToken } from "@/utils/auth";

export default function Home() {
  const user = getUserFromToken();
  const userRole = getUserRole();

  const capitalizedFirstName =
    user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1);

  // Determine current time of day
  const currentHour = new Date().getHours();
  let timeOfDay = "day";

  if (currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-5 bg-green-100">
        <p className="text-xl font-semibold dark:text-black">
          {`Good ${timeOfDay}, ${capitalizedFirstName}. Welcome!`}
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
