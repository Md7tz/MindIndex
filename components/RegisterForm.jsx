import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Auth.module.css";
import { toast } from "react-toastify";
import { Navigate } from "./Basepath";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASEPATH + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: confirmPassword,
          email,
          fullname,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        Navigate.push("/#loginForm");
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
        id="registerForm"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="registerStaticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h5
                className="modal-title w-100 text-center"
                id="registerStaticBackdropLabel"
              >
                Welcome to MindIndex! | Register
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className=""
                id="pills-register"
                aria-labelledby="tab-register"
              >
                <form onSubmit={handleSubmit}>
                  {/* <div className="text-center mb-2">
                    <p>Continue with:</p>
                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <FontAwesomeIcon icon={faGoogle} size="2x" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </button>
                  </div>

                  <p className="text-center">or:</p> */}

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="registerName"
                      className="form-control"
                      placeholder="Name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="registerUsername"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="registerEmail"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerPassword"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerRepeatPassword"
                      className="form-control"
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-2">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="registerCheck"
                      aria-describedby="registerCheckHelpText"
                    />
                    <label className="form-check-label" htmlFor="registerCheck">
                      I have read and agree to the terms
                    </label>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
