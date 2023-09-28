import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../components/LandingPage/AdminHome"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { ManageWildPlants } from "../components/WildEdibles/ManageWildPlants"
import { ManageEdibleProfile } from "../components/WildEdibles/ManageEdibleProfile"
import { AdminNewPlantForm } from "../components/WildEdibles/AdminNewPlantForm"
import { EditEdibleProfileForm } from "../components/WildEdibles/EditEdibleProfileForm"
import { EditEdiblePart } from "../components/WildEdibles/EditEdiblePart"
import { PublicHarvestLogs } from "../components/HarvestLogs/PublicHarvestLogs"
import { HarvestGuidelines } from "../components/HarvestGuidelines/HarvestGuidelines"
import { EdiblePlantProfile } from "../components/WildEdibles/EdiblePlantProfile"
import { AdminReviewRecipeTipList } from "../components/TipsAndRecipes/AdminReviewRecipeTipsList"
import { ReviewRecipeTipForm } from "../components/TipsAndRecipes/ReviewRecipeTipForm"
import { MainLandingPage } from "../components/LandingPage/MainLandingPage"
import { HarvestLogForm } from "../components/HarvestLogs/HarvestLogForm"

export const AdminViews = ({ token, setToken, staff, setStaff }) => {
    return <>
        <Routes>
            <Route path="/" element={<MainLandingPage />} />
            <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff}/>} />
            <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff}/>} />
            <Route element={<Authorized token={token} staff={staff} />}>
                <Route path="/home" element={<AdminHome token={token} />} />
                <Route path="/harvest-guidelines" element={<HarvestGuidelines />} />
                <Route path="/edible-profile/:plantId" element={<EdiblePlantProfile staff={staff}/>} />
                <Route path="/manage-edibles" element={<ManageWildPlants />} />
                <Route path="/manage-edible-profile/:plantId" element={<ManageEdibleProfile staff={staff}/>} />
                <Route path="/new-plant-form" element={<AdminNewPlantForm/>} />
                <Route path="/edit-edible-profile/:plantId" element={<EditEdibleProfileForm />} />
                <Route path="/edit-edible-part/:partId" element={<EditEdiblePart />} />
                <Route path="/harvest-logs/:plantId" element={<PublicHarvestLogs />} />
                <Route path="/tips-recipes-review/" element={<AdminReviewRecipeTipList />} />
                <Route path="/tips-recipes-review/:recipeTipId" element={<ReviewRecipeTipForm />} />
                <Route path="/public-harvest-logs/:plantId" element={<PublicHarvestLogs />} />
                <Route path="/harvest-log-form/:plantId" element={<HarvestLogForm />} />
            </Route>
        </Routes>
    </>
}
