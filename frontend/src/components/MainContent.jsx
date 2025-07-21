import Home from "@/components/Home";
import Rooms from "./Rooms";
import Receipts from "./Receipts";
import MyRooms from "./MyRooms";

export default function MainContent({ activeSection, loading, rooms, bookRoom}){
    let content;
    switch(activeSection){
        case 'home':
            content = <div className="dark:bg-gray-300"> <Home loading={loading}/> </div>
            break;
        case 'rooms':
            content = <div className="dark:bg-gray-300"><Rooms loading={loading} rooms={rooms} bookRoom={bookRoom}/></div>
            break;
        case 'myrooms':
            content = <div className="dark:bg-gray-300"><MyRooms loading={loading} rooms={rooms}/></div>
            break;
        case 'receipts':
            content = <div className="dark:bg-gray-300"><Receipts loading={loading}/></div>
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