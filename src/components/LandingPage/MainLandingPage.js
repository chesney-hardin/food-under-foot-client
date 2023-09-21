import Logo from "/Users/chesneyhardin/workspace/food-under-foot/food-under-foot-client/src/components/nav/logo-fuf.png"
import { Link } from "react-router-dom"

export const MainLandingPage = () => {
    return <>
        <div className="flex items-center justify-center">
            <img src={Logo} alt="Logo" className="w-120" />
            <div className="flex">
                <Link to="/login" className="text-white text-lg font-bold mr-6">
                    Login
                </Link>
                <Link to="/register" className="text-white text-lg font-bold mr-6">
                    Register
                </Link>
            </div>
        </div></>
}