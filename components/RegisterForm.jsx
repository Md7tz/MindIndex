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
        tabindex="-1"
        aria-labelledby="registerStaticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark">
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
            <div className="modal-body"></div>
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
