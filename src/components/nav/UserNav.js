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
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={Logo} height="150rem" alt="Fuf Logo" /> <h1 className="title is-4">Food Under Foot</h1>
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

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
                                    <Link className="nav-link" to="/">Harvest Guidelines</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Your Harvest Logs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Profile</Link>
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