import { Link, Route, Routes } from "react-router-dom"
import { AdminHome } from "../components/LandingPage/AdminHome"

export const AdminViews = ({ token }) => {
    return <>
    
        <Routes>
            <Route path="/home" element={<AdminHome token={token}/>} />
        </Routes>
    </>
}