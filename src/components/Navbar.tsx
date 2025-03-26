import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Trash2, Menu, X, Home, Settings, User } from "lucide-react";

const sidebarItems = [
  {
    name: "Details",
    path: "/details",
    icon: Home,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Navbar = () => {
  const { user, logout, deleteAccount } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check user menu
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }

      // Check nav menu
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node)
      ) {
        setShowNavMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-slate-300 shadow-sm py-3 px-4 flex justify-between items-center relative">
      <div className="font-bold text-lg md:text-xl text-gray-800 flex items-center">
        <button
          onClick={() => setShowNavMenu(!showNavMenu)}
          className="md:hidden mr-3"
        >
          {showNavMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        Algo Root
      </div>

      {showNavMenu && (
        <div
          ref={navMenuRef}
          className="absolute top-full left-0 right-0 bg-white md:hidden"
        >
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setShowNavMenu(false)}
                className={`
                  flex items-center px-4 py-3 border-b
                  ${
                    location.pathname === item.path
                      ? "bg-blue-200 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon className="mr-3 w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* User Menu */}
      <div className="relative" ref={userMenuRef}>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
        >
          {user?.name ? (
            <span className="text-2xl font-bold">
              {user.name[0].toUpperCase()}
            </span>
          ) : (
            <span className="text-sm text-gray-600">ID</span>
          )}
        </button>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b">
              <p className="font-semibold text-gray-800 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs md:text-sm text-gray-600 truncate">
                {user?.email}
              </p>
            </div>
            <div className="py-1">
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 transition text-gray-700"
              >
                <LogOut className="mr-2 w-4 h-4" />
                Logout
              </button>
              <button
                onClick={deleteAccount}
                className="w-full flex items-center px-4 py-2 hover:bg-red-50 text-red-600 hover:text-red-800 transition"
              >
                <Trash2 className="mr-2 w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
