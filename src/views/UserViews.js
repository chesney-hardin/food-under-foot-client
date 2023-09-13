import { Route, Routes } from "react-router-dom"
import { UserHome } from "../components/LandingPage/UserHome"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { EdiblePlantProfile } from "../components/WildEdibles/EdiblePlantProfile"
import { WildEdiblesList } from "../components/WildEdibles/WildEdiblesList"
import { PublicHarvestLogs } from "../components/HarvestLogs/PublicHarvestLogs"


export const UserViews = ({ token, setToken, staff, setStaff }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} staff={staff}/>} />
            <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff}/>} />
            <Route element={<Authorized token={token} staff={staff} />}>
                <Route path="/home" element={<UserHome token={token} />} />
                <Route path="/edibles" element={<WildEdiblesList token={token} />} />
                <Route path="/edible-profile/:plantId" element={<EdiblePlantProfile token={token} />} />
                <Route path="/public-harvest-logs/:plantId" element={<PublicHarvestLogs />} />
            </Route>
        </Routes>
    </>
}