import { AdminNav } from "./AdminNav"
import { UserNav } from "./UserNav"

export const NavBar = ({ token, setToken, staff }) => {

    let currentNav = <></>

    if (staff) {
        currentNav = <AdminNav token={token} setToken={setToken} staff={staff} />
    } else {
        currentNav = <UserNav token={token} setToken={setToken} staff={staff} />
    }
    return currentNav
}
