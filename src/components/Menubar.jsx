import { useState, useRef, useEffect, useContext } from "react";
import {LogOut, X, Menu} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";
import Avatar from "./Avatar.jsx";

const Menubar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [logoBroken, setLogoBroken] = useState(false);
    const dropdownRef = useRef(null);
    const { clearUser, user } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
            <div className="flex items-center gap-5">
                <button
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
                    onClick={() => {
                        setOpenSideMenu(!openSideMenu);
                    }}
                >
                    {openSideMenu ? (
                        <X className="text-2xl" />
                    ) : (
                        <Menu className="text-2xl" />
                    )}
                </button>

                <div className="flex items-center gap-2">
                    {!logoBroken ? (
                        <img
                            src={assets.logo}
                            alt="logo"
                            className="h-10 w-10 object-contain"
                            onError={() => setLogoBroken(true)}
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm">
                            MM
                        </div>
                    )}
                    <span className="text-lg font-medium text-black truncate">FinTrackr</span>
                </div>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200
                    rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800
                    focus:ring-offset-2 overflow-hidden"
                >
                    <Avatar src={user?.profileImageUrl} className="w-10 h-10" />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Avatar src={user?.profileImageUrl} className="w-8 h-8" iconClassName="w-4 h-4" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.fullName || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700
                                 hover:bg-gray-50 transition-colors duration-150"
                            >
                                <LogOut className="w-4 h-4 text-gray-500" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Menubar;
