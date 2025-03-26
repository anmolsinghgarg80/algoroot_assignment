import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Settings, User, MenuIcon } from "lucide-react";

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

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-min-screen bg-gray-200 hidden md:block">
      <div className="mt-5 px-4 mx-3">
        {isOpen == true ? (
          <ul className="space-y-2 flex flex-col items-center">
            <div className="flex flex-row justify-between w-full">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Menu</h2>
              <MenuIcon onClick={toggleSidebar} />
            </div>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                        flex flex-row items-center justify-around px-4 py-2 rounded-md transition-colors duration-200
                        ${
                          location.pathname === item.path
                            ? "bg-blue-200 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                  >
                    <Icon className="mr-5 w-5 h-5" />
                    <div className="mr-5">{item.name}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="space-y-2 flex flex-col items-center">
            <MenuIcon onClick={toggleSidebar} />
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-4 py-2 rounded-md transition-colors duration-200
                      ${
                        location.pathname === item.path
                          ? "bg-blue-200 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="mx-3 w-5 h-5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
