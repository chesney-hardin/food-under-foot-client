import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo-fuf.png";
import { useState } from "react";

export const UserNav = ({ token, setToken }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("staff")
        navigate("/login");
    };

    return (
        <nav className="bg-white py-4 px-6">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/home" className="text-white text-lg font-bold mr-6">
                        <img src={Logo} alt="Logo" className="w-20" />
                    </Link>
                </div>
                <div className="flex-grow"></div>
                <div className="relative group">
                    {token && (
                        <button
                            onClick={toggleDropdown}
                            className="text-gray group-hover:bg-fuf-green px-3 py-2 rounded-md hover:bg-fuf-green focus:outline-none"
                        >
                            <span className="text-5xl">&#8801;</span>
                        </button>
                    )}
                    {token && isDropdownOpen ? (
                        <div className="absolute right-0 mt-2 py-2 w-36 bg-fuf-teal rounded-md shadow-lg z-10">
                            
                            <Link
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                                to="/home"
                            >
                                Home
                            </Link>
                           
                            <Link
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                                to="/harvest-guidelines"
                            >
                                Harvest Guidelines
                            </Link>
                            <Link
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                                to="/user-harvest-logs"
                            >
                                Your Harvest Logs
                            </Link>
                            <Link
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                                to="/user-tips-recipes"
                            >
                                Your Recipes and Tips
                            </Link>
                            <Link
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                                to="/edibles"
                            >
                                All Wild Edibles
                            </Link>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </nav>
    );
}; 