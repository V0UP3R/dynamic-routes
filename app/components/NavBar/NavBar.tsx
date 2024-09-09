'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaHome, FaUser, FaCog } from "react-icons/fa";

function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(''); // Estado para o item ativo
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (item:any) => {
    setActiveItem(item); // Define o item ativo quando clicado
  };

  return (
    <div className={`h-screen bg-gray-800 ${isCollapsed ? 'w-20' : 'w-64'} duration-300`}>
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-white font-semibold text-xl ${isCollapsed && 'hidden'}`}>Menu</h2>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>
      
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <Link 
              href="/dashboard" 
              className={`flex items-center text-gray-300 p-2 rounded-md ${pathname == '/dashboard' ? 'bg-white text-black' : 'hover:bg-gray-700'}`} 
              onClick={() => handleItemClick('home')}
            >
              <FaHome size={20} className="mr-4" />
              {!isCollapsed && <span>Home</span>}
            </Link>
          </li>
          <li className="mb-4">
            <a 
              href="/dashboard/documents" 
              className={`flex items-center text-gray-300 p-2 rounded-md ${pathname.startsWith('/dashboard/documents') ? 'bg-white text-black' : 'hover:bg-gray-700'}`}
              onClick={() => handleItemClick('documents')}
            >
              <FaUser size={20} className="mr-4" />
              {!isCollapsed && <span>Documentos</span>}
            </a>
          </li>
          <li className="mb-4">
            <a 
              href="/dashboard/settings"  
              className={`flex items-center text-gray-300 p-2 rounded-md ${pathname.startsWith('/dashboard/settings') ? 'bg-white text-black' : 'hover:bg-gray-700'}`}
              onClick={() => handleItemClick('settings')}
            >
              <FaCog size={20} className="mr-4" />
              {!isCollapsed && <span>Settings</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
