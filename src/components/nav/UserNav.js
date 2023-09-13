import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "./fufLogo.png"

export const UserNav = ({ token, setToken, isAdmin }) => {
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">

            <a className="navbar-item" href="/home">
                <img src={Logo} height="150rem" alt="Fuf Logo" />
            </a>



            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        token
                            ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/harvest-guidelines">Harvest Guidelines</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-harvest-logs">Your Harvest Logs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/edibles">Wild Edibles</Link>
                                </li>



                            </>
                            :
                            ""
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                token
                                    ?
                                    <button className="button is-outlined" onClick={() => {
                                        setToken('')
                                        localStorage.removeItem('staff')
                                        navigate('/login')
                                    }}>Logout</button>
                                    :
                                    <>
                                        <Link to="/register" className="button is-link">Register</Link>
                                        <Link to="/login" className="button is-outlined">Login</Link>

                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}