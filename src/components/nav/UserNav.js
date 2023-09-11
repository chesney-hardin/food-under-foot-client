import { Link, useNavigate } from "react-router-dom"

export const UserNav = () => {
    const navigate = useNavigate()
    return <>
    <li className="nav-item">
        <Link className="nav-link" to="/home">Home</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/">Harvest Guidelines</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/">Your Harvest Logs</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/">Profile</Link>
    </li></>
}