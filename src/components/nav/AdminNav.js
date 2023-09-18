import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo-fuf.png";
import { useState } from "react";

export const AdminNav = ({ token, setToken }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("staff");
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
                            className="text-gray group-hover-bg-fuf-green px-3 py-1 rounded-md hover:bg-fuf-green focus:outline-none"
                        >
                            <span className="text-5xl">&#8801;</span>
                        </button>
                    )}
                    {token && isDropdownOpen ? (
                        <div className="absolute right-0 mt-2 py-2 bg-fuf-green rounded-md shadow-lg z-10">
                            <Link
                                to="/home"
                                className="block px-4 py-2 text-fuf-teal hover:bg-fuf-teal-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/manage-edibles"
                                className="block px-4 py-2 text-fuf-teal hover:bg-fuf-teal-200"
                            >
                                Manage Wild Edibles
                            </Link>
                            <Link
                                to="/harvest-guidelines"
                                className="block px-4 py-2 text-fuf-teal hover:bg-fuf-teal-200"
                            >
                                Harvest Guidelines
                            </Link>
                            <Link
                                to="/tips-recipes-review/"
                                className="block px-4 py-2 text-fuf-teal hover:bg-fuf-teal-200"
                            >
                                Review Tips and Recipes
                            </Link>
                            <button
                                className="block w-full text-left px-4 py-2 text-fuf-teal hover:bg-gray-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : ("")}
                </div>
            </div>
        </nav>
    );
};
