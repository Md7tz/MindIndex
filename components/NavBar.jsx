import React, { useEffect, useState } from "react";
import styles from "./styles/Navbar.module.css";
import Image from "next/image";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import SearchBar from "./SearchBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCircleUser,
  faFolderPlus,
  faBook,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import Basepath from "./Basepath";
import ClientApi from "./ClientApi";

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setUser(await ClientApi.getUser());
    };

    fetchData();
  }, []);

  const onClickLogout = async () => {
    await ClientApi.logout();
    setUser(null);
  };

  return (
    <nav
      className={`${styles["custom-navbar"]} navbar navbar-expand-lg custom-navbar border-bottom`}
    >
      <div className="row container-fluid text-dark">
        <div className={`col d-flex ${styles.brand}`}>
          <a
            className={`navbar-brand me-1 ${styles.logolink}`}
            href={Basepath.get("/")}
          >
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
            href={Basepath.get("/")}
          >
            MindIndex
          </a>
          <div className="border-end"></div>
        </div>

        {user?.id && <SearchBar />}

        <div className="col" id="navbarSupportedContent">
          {user?.id ? (
            <div className="d-flex justify-content-end">
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active text-dark"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faFolderPlus} className="me-2" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href={Basepath.get("/study-set/add")}
                    >
                      <FontAwesomeIcon icon={faBook} className="me-2" />
                      Study Set
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FontAwesomeIcon icon={faStickyNote} className="me-2" />
                      Note
                    </a>
                  </li>
                </ul>
              </div>

              <a
                className="nav-link active text-dark"
                aria-current="page"
                href={Basepath.get("/profile")}
                data-bs-toggle="modal"
              >
                <div className="d-flex align-items-center ps-2">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ color: "dark" }}
                    size="1x"
                    fixedWidth
                  />
                  <span className="px-2">Profile</span>
                </div>
              </a>

              <button
                className="nav-link active text-dark border-0 bg-transparent"
                aria-current="page"
                onClick={onClickLogout}
                data-bs-toggle="modal"
              >
                <div className="d-flex align-items-center ps-2">
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{ color: "dark" }}
                    size="1x"
                    fixedWidth
                  />
                  <span className="px-2">Logout</span>
                </div>
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <LoginForm />
      <RegisterForm />
    </nav>
  );
}
