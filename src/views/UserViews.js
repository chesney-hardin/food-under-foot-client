import { Route, Routes } from "react-router-dom"
import { UserHome } from "../components/LandingPage/UserHome"

export const UserViews = ({ token }) => {
    return <>
        <Routes>
            <Route path="/home" element={<UserHome token={token} />} />
        </Routes></>
}