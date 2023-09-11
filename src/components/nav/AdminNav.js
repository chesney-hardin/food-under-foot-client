import { Link, useNavigate } from "react-router-dom"

export const AdminNav = () => {
    const navigate = useNavigate()
    return <>
        <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/login">Manage Wild Edibles</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/register">Profile</Link>
        </li></>
}