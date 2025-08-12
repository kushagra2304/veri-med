import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Stethoscope,
  Clock,
  ShoppingBag,
  UserCircle,
  LogOut,
  MessageSquare,
} from "lucide-react";

export default function UserSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItems = [
    { to: "/doctors", label: "Doctor", icon: <Stethoscope size={18} /> },
    { to: "/user/history", label: "History", icon: <Clock size={18} /> },
    // { to: "/buy-meds", label: "Buy Medicines", icon: <ShoppingBag size={18} /> },
    // { to: "/user/messages", label: "Chat", icon: <MessageSquare size={18} /> },
    { to: "/profile", label: "Profile", icon: <UserCircle size={18} /> },
  ];

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 text-black bg-black p-2 rounded"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} color="white" />
        </button>
      )}

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-[#010D2A] text-white shadow-lg p-4 z-40 transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <button className="text-white" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 text-sm font-medium">
            {navItems.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-2 text-white hover:text-blue-400 ${
                    isActive ? "text-blue-400" : ""
                  }`}
                >
                  {icon}
                  <span className="relative inline-block">
                    {label}
                    <span
                      className={`absolute bottom-0 right-0 h-0.5 bg-red-500 transform origin-right transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      } w-full`}
                    ></span>
                  </span>
                </Link>
              );
            })}

            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="group relative mt-8 flex items-center gap-2 text-red-400 hover:text-red-600"
            >
              <LogOut size={18} />
              <span className="relative inline-block">
                Logout
                <span className="absolute bottom-0 right-0 h-0.5 bg-red-500 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 w-full"></span>
              </span>
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
