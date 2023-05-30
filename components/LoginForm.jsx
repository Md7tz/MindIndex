import React, { useState } from "react";
import styles from "../styles/Auth.module.css";
import { Navigate } from "./Basepath";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the API request to login
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASEPATH+"api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Navigate.push("/");
      } else {
        const error = await response.json();
        toast.error("Error: " + error.message);
      }
    } catch (error) {
      // console.error("Error:", error);
      toast.error("Error: " + error);
    }
  };

  return (
    <>
      <div
        className={`modal fade ${styles.authFont}`}
        id="loginForm"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="loginStaticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h5
                className="modal-title w-100 text-center"
                id="loginStaticBackdropLabel"
              >
                Happy to have you back! | Login
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="mb-2">Email address</label>
                  // Email address input
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2">Password</label>
                  // Password input
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-evenly">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />{" "}
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                  <p className="forgot-password text-right">
                    <a href="#">Forgot password?</a>
                  </p>
                </div>
                <p className="forgot-password text-center">
                  Don't have an account yet? Register{" "}
                  <a href="#registerForm" data-bs-toggle="modal">
                    here
                  </a>
                </p>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
