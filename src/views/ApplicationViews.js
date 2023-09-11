import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AdminViews } from "./AdminViews"
import { UserViews } from "./UserViews"

export const ApplicationViews = ({ token, setToken, staff, setStaff }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized token={token} staff={staff} />}>
                {staff === true ? (
                    <Route path="*" element={<AdminViews token={token}/>} />
                ) : (
                    <Route path="*" element={<UserViews token={token}/>} />
                )}
            </Route>
        </Routes>
    </>
}