import { Route, Routes } from "react-router-dom"
import { UserHome } from "../components/LandingPage/UserHome"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { EdiblePlantProfile } from "../components/WildEdibles/EdiblePlantProfile"
import { WildEdiblesList } from "../components/WildEdibles/WildEdiblesList"
import { PublicHarvestLogs } from "../components/HarvestLogs/PublicHarvestLogs"
import { HarvestLogForm } from "../components/HarvestLogs/HarvestLogForm"
import { UserHarvestLogs } from "../components/HarvestLogs/UserHarvestLogs"
import { HarvestLogEditForm } from "../components/HarvestLogs/HarvestLogEditForm"
import { HarvestGuidelines } from "../components/HarvestGuidelines/HarvestGuidelines"


export const UserViews = ({ token, setToken, staff, setStaff }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} staff={staff}/>} />
            <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff}/>} />
            <Route element={<Authorized token={token} staff={staff} />}>
                <Route path="/home" element={<UserHome />} />
                <Route path="/edibles" element={<WildEdiblesList />} />
                <Route path="/harvest-guidelines" element={<HarvestGuidelines />} />
                <Route path="/edible-profile/:plantId" element={<EdiblePlantProfile />} />
                <Route path="/public-harvest-logs/:plantId" element={<PublicHarvestLogs />} />
                <Route path="/harvest-log-form" element={<HarvestLogForm token={token} />} />
                <Route path="/user-harvest-logs" element={<UserHarvestLogs token={token} />} />
                <Route path="/edit-harvest-log/:harvestLogId" element={<HarvestLogEditForm />} />
                
            </Route>
        </Routes>
    </>
}