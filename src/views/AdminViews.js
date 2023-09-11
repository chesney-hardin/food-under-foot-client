import { Link, Route, Routes } from "react-router-dom"
import { AdminHome } from "../components/LandingPage/AdminHome"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { ManageWildEdiblesList } from "../components/WildEdibles/ManageWildPlants"
import { ManageEdibleProfile } from "../components/WildEdibles/ManageEdibleProfile"

export const AdminViews = ({ token, setToken, staff, setStaff }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} />} />
            <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff}/>} />
            <Route element={<Authorized token={token} staff={staff} />}>
                <Route path="/home" element={<AdminHome token={token} />} />
                <Route path="/manage-edibles" element={<ManageWildEdiblesList token={token} />} />
                <Route path="/edible-profile/:plantId" element={<ManageEdibleProfile token={token} />} />
            </Route>
        </Routes>
    </>
}