import React from "react";
import styles from "../styles/Auth.module.css";

export default function LoginForm() {
  return (
    <>
      <div
        className={`modal fade ${styles.authFont}`}
        id="loginForm"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="loginStaticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark">
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
              <form>
                <div className="mb-3">
                  <label className="mb-2">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
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
              <button type="button" className="btn btn-success">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
