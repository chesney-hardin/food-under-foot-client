import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"


export const Login = ({ setToken, setStaff }) => {
    const email = useRef()
    const password = useRef()
    const [isUnsuccessful, setIsUnsuccessful] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            email: email.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setToken(res.token)
                    setStaff(res.staff)
                    navigate("/home")
                    setTimeout(() => {
                        if (res.staff) {
                            window.alert("Hello admin user");
                        } else {
                            window.alert("NEW USERS!!!\nIf you're new to foraging wild edibles, please take a moment to review the harvest guidelines and safety tips.");
                        }
                    }, 100)
                } else {
                    setIsUnsuccessful(true)
                }
            })
    }

    const showAlert = () => {
        window.alert('Email or password is not valid');
    };


    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Food Under Foot</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> email </label>
                        <input ref={email} type="email" id="email" className="form-control" placeholder="Email" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            {
                isUnsuccessful ? showAlert() : ''
            }
        </main>
    )
}
