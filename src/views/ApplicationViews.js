import { AdminViews } from "./AdminViews"
import { UserViews } from "./UserViews"

export const ApplicationViews = ({ token, setToken, staff, setStaff }) => {
    if (JSON.parse(staff)) {
        return (
            <AdminViews
                token={token}
                setToken={setToken}
                staff={staff}
                setStaff={setStaff}
            />
        )
    } else {
        return (
            <UserViews
                token={token}
                setToken={setToken}
                staff={staff}
                setStaff={setStaff}
            />
        )
    }
}