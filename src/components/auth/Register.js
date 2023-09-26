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
            <option value="0">Select type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="text-center">
          <button
            className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            type="submit"
          >
            Register
          </button>
        </div>
      <div className="mt-4 text-center">
        Already registered? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </div>
      </form>
    </main>
  );
};
