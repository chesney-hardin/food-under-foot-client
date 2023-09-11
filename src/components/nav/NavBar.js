import { Link, useNavigate } from "react-router-dom";
import { AdminNav } from "./AdminNav";
import { UserNav } from "./UserNav";
//import fufLogo from '../images/fufLogo.png' ;

export const NavBar = ({ token, staff }) => {
    const navigate = useNavigate()

    return <>

        <ul>
            {staff === true ? <AdminNav /> : <UserNav />}
            {
                token ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("fuf_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>

            }
        </ul>

    </>
}
