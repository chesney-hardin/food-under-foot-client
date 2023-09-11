import { Route, Routes } from "react-router-dom"
import { UserHome } from "../components/LandingPage/UserHome"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"


export const UserViews = ({ token, setToken, staff, setStaff }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} />} />
            <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff}/>} />
            <Route element={<Authorized token={token} staff={staff} />}>
                <Route path="/home" element={<UserHome token={token} />} />
            </Route>
        </Routes>
    </>
}