/* import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const accountType = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "email": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "account_type": accountType.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("fuf_token", res.token)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail">email</label>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="admin"> Account Type</label>
                    <select ref={accountType} name="accountType" className="form-control">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
 */

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";

export const Register = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const accountType = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        email: email.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        account_type: accountType.current.value,
        password: password.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("token" in res) {
          localStorage.setItem("fuf_token", res.token);
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="text-blue-500 hover:underline"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full" onSubmit={handleRegister}>
        <h1 className="text-3xl font-bold mb-4">Register an account</h1>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600">
            First Name
          </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-input w-full rounded border-gray-300"
            placeholder="First name"
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600">
            Last Name
          </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-input w-full rounded border-gray-300"
            placeholder="Last name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            ref={email}
            type="text"
            name="email"
            className="form-input w-full rounded border-gray-300"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-input w-full rounded border-gray-300"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="verifyPassword" className="block text-gray-600">
            Verify Password
          </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-input w-full rounded border-gray-300"
            placeholder="Verify password"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="accountType" className="block text-gray-600">
            Account Type
          </label>
          <select
            ref={accountType}
            name="accountType"
            className="form-select w-full rounded border-gray-300"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="text-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105 focus:outline-none"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        Already registered? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </div>
    </main>
  );
};
