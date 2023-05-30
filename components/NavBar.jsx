import React from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Basepath from "./Basepath";

export default function NavBar() {
  return (
    <nav
      className={`${styles["custom-navbar"]} navbar navbar-expand-lg custom-navbar border-bottom`}
    >
      <div className="row container-fluid text-dark">
        <div className={`col d-flex ${styles.brand}`}>
          <a className={`navbar-brand me-1 ${styles.logolink}`} href={Basepath.get('/')}>
            <Image
              src={"/img/Logo.jpg"}
              alt="MindIndex"
              className={`me-1 ${styles.logo}`}
              width={40}
              height={40}
            />
          </a>
          <a
            className={`navbar-brand text-dark ${styles.milink} fs-7 pe-3 m-1`}
            href={Basepath.get('/')}
          >
            MindIndex
          </a>
          <div className="border-end"></div>
        </div>
        <form className="col d-flex justify-content-center input-group ms-lg-3 my-3 my-lg-0">
          <div className={`${styles.searchWrapper}`}>
            <input
              className={`${styles.searchInput}`}
              type="text"
              placeholder="Search"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "dark" }}
              size="1x"
              fixedWidth
            />
          </div>
        </form>
        <div className="col" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
            <li className="nav-item">
              <a
                className="nav-link active text-dark"
                aria-current="page"
                href="#loginForm"
                data-bs-toggle="modal"
              >
                <div className="d-flex align-items-center ps-2">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ color: "dark" }}
                    size="1x"
                    fixedWidth
                  />
                  <span className="px-2">Login</span>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active text-dark d-flex align-items-center"
                aria-current="page"
                href="#registerForm"
                data-bs-toggle="modal"
              >
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  style={{ color: "dark" }}
                  size="1x"
                  fixedWidth
                />
                <div className="d-flex align-items-center ps-2">
                  <span className="">Register</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <LoginForm />
      <RegisterForm />
    </nav>
  );
}
