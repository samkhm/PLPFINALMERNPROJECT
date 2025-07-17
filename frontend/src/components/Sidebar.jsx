import { HomeModernIcon, HomeIcon } from "@heroicons/react/24/solid";
import { getUserRole } from "@/utils/auth";

export default function Sidebar({ activeSection, setActiveSection }) {
    const userRole = getUserRole();

    const userMenuItems = [
        { name: "Home", icon: <HomeModernIcon />, key: 'home' },
        { name: "Rooms", icon: <HomeIcon />, key: 'rooms' },
        { name: "Receipts", icon: <HomeIcon />, key: 'receipt' }
    ];

    const adminMenuItems = [
        { name: "Home", icon: <HomeModernIcon />, key: 'home' },
        { name: "Rooms", icon: <HomeIcon />, key: 'rooms' },
        { name: "Receipts", icon: <HomeIcon />, key: 'receipt' }
    ];

    const menuItems = userRole === 'user' ? userMenuItems : adminMenuItems;

    return (
        <aside className="bg-gray-900 text-white p-4 space-y-4 w-full">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            {menuItems.map(i => (
                <button
                    key={i.key}
                    className={`flex items-center space-x-2 w-full text-left p-2 rounded-xl transition hover:bg-gray-600 ${
                        activeSection === i.key ? "bg-gray-700" : ""
                    }`}
                    onClick={() => setActiveSection(i.key)}
                >
                    {i.icon}
                    <span>{i.name}</span>
                </button>
            ))}
        </aside>
    );
}
