import { HomeModernIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
export default function Sidebar({ openSidebarToggle, openSidebar}){
    return(
        <aside id="sidebar" className={ openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className="sidebar-title">
                <span className="icon close_icon" onClick={openSidebar}>X</span>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link to="/">
                    <HomeModernIcon />
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to ="/rooms">Rooms</Link>
                </li>
                 <li className="sidebar-list-item">
                    <Link to ="/receipt">Receipt</Link>
                </li>

            </ul>
            
        </aside>
    )

}