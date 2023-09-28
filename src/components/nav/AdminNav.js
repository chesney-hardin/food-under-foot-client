import { Link, useNavigate } from "react-router-dom"
import Logo from "./logo-fuf.png"
import { useEffect, useState } from "react"
import { getUnapprovedRecipesAndTipsForReview } from "../../managers/TipsAndRecipesManager"

export const AdminNav = ({ token, setToken }) => {
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [needReview, setNeedReview] = useState(0)

    useEffect(() => {
        getUnapprovedRecipesAndTipsForReview().then((posts) => setNeedReview(posts.length))
    }, [isDropdownOpen])


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleLogout = () => {
        setIsDropdownOpen(false)
        setToken("")
        localStorage.removeItem("staff")
        navigate("/login")
    }

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
                            <span className="text-5xl">&#8801</span>
                        </button>
                    )}
                    {token && isDropdownOpen ? (
                        <div className="absolute right-0 mt-2 py-2 w-36 bg-fuf-teal rounded-md shadow-lg z-10">
                            <Link
                                to="/home"
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/manage-edibles"
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                            >
                                Manage Wild Edibles
                            </Link>
                            <Link
                                to="/harvest-guidelines"
                                className="block px-4 py-2 text-gray-700 hover:bg-fuf-teal-200"
                            >
                                Harvest Guidelines
                            </Link>
                            <Link
                                to="/tips-recipes-review/"
                                className=" px-4 py-2 text-gray-700 hover:bg-fuf-teal-200 flex"
                            >
                                Review Tips and Recipes 
                                <div className="bg-fuf-green rounded-full font-bold text-fuf-teal p-1 align-middle my-2">{needReview}</div>
                            </Link>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : ("")}
                </div>
            </div>
        </nav>
    )
}
