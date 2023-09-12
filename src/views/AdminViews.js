import { Link, Route, Routes } from "react-router-dom"
import { AdminHome } from "../components/LandingPage/AdminHome"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { ManageWildPlants } from "../components/WildEdibles/ManageWildPlants"
import { ManageEdibleProfile } from "../components/WildEdibles/ManageEdibleProfile"
import { AdminNewPlantForm } from "../components/WildEdibles/AdminNewPlantForm"
import { AdminNewEdiblePart } from "../components/WildEdibles/AdminNewEdiblePart"

export const AdminViews = ({ token, setToken, staff, setStaff }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} />} />
            <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff}/>} />
            <Route element={<Authorized token={token} staff={staff} />}>
                <Route path="/home" element={<AdminHome token={token} />} />
                <Route path="/manage-edibles" element={<ManageWildPlants token={token} />} />
                <Route path="/manage-edible-profile/:plantId" element={<ManageEdibleProfile token={token} />} />
                <Route path="/new-plant-form" element={<AdminNewPlantForm token={token} />} />
                <Route path="/new-edible-part-form/:plantId" element={<AdminNewEdiblePart token={token} />} />
            </Route>
        </Routes>
    </>
}
