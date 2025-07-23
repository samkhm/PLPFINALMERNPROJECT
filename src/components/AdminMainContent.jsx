import Home from "@/components/Home";
import Rooms from "./Rooms";
import Receipts from "./Receipts";
import Users from "./Users";

export default function MainContent({ activeSection, loading, rooms, users, createRoom, deleteRoom, onApprove, receipts, roomCount, userCount, bookedRoomCount, unBookedRoomCount, userAndRoom }){
    let content;
    switch(activeSection){
        case 'home':
            content = <div className="dark:bg-gray-300"> <Home loading={loading} roomCount={roomCount} userCount={userCount}
                                                           bookedRoomCount={bookedRoomCount} unBookedRoomCount={unBookedRoomCount}/> </div>
            break;
        case 'users':
            content = <div className="dark:bg-gray-300"> <Users users={users} userAndRoom={userAndRoom} /></div>
            break;
        case 'rooms':
            content = <div className="dark:bg-gray-300"> <Rooms loading={loading} rooms={rooms} createRoom={createRoom} deleteRoom={deleteRoom}/> </div>
            break;
        case 'receipts':
            content = <div className="dark:bg-gray-300"> <Receipts loading={loading} receipts={receipts}/> </div>
            break;
        
        default:
            content = <div>Select a section from the side bar</div>
    }

    return(
        <div className="p-6 bg-gray-100 w-full">
            <h1 className="text-xl font-semibold mb-4 capitalize dark:text-black">{activeSection}</h1>
            <div>{content}</div>
        </div>
    );
};