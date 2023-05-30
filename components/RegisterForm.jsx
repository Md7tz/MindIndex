import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Auth.module.css";

export default function RegisterForm() {
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
                <form>
                  <div className="text-center mb-2">
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

                  <p className="text-center">or:</p>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="registerName"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="registerUsername"
                      className="form-control"
                      placeholder="Username"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="registerEmail"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerPassword"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="registerRepeatPassword"
                      className="form-control"
                      placeholder="Repeat password"
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
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
