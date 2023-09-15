
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";

export const Login = ({ setToken, setStaff }) => {
  const email = useRef();
  const password = useRef();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    loginUser(user)
      .then((res) => {
        if ("valid" in res && res.valid && "token" in res) {
          setToken(res.token);
          setStaff(res.staff);
          navigate("/home");
          setTimeout(() => {
            if (res.staff) {
              window.alert("Hello admin user");
            } else {
              window.alert(
                "NEW USERS!!!\nIf you're new to foraging wild edibles, please take a moment to review the harvest guidelines and safety tips."
              );
            }
          }, 100);
        } else {
          setIsUnsuccessful(true);
        }
      });
  };

  return (
    <main className="bg-white min-h-full flex items-center justify-center">
      <section className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Food Under Foot</h1>
        <h2 className="text-xl mb-4">Please sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              ref={email}
              type="email"
              id="email"
              className="form-input w-full rounded border-gray-300"
              placeholder="Email"
              required
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-input w-full rounded border-gray-300"
              placeholder="Password"
              required
            />
          </div>
          <div className="text-center">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105 focus:outline-none"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:underline">
            Not a member yet?
          </Link>
        </div>
      </section>
      {isUnsuccessful && (
        <section className="mt-4 text-center text-red-500">
          Email or password is not valid
        </section>
      )}
    </main>
  );
};
