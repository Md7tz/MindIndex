import React, { useEffect, useState } from "react";
import styles from "./styles/Navbar.module.css";
import Image from "next/image";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

import SearchBar from "./search/SearchBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCircleUser,
  faFolderPlus,
  faBook,
  faStickyNote,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Basepath from "./Basepath";
import ClientApi from "./ClientApi";

export default function NavBar() {
  const [user, setUser] = useState({});
  const [subscription, setSubscription] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setUser(await ClientApi.getUser());
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function getSubscriptionStatus() {
      if (user?.id) {
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_BASEPATH +
              `/api/users/${user.id}/subscription`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await ClientApi.getToken()}`,
              },
            }
          );

          const data = await res.json();
          setSubscription(data.metadata);
        } catch (err) {
          console.log(err);
        }
      }
    }

    getSubscriptionStatus();
  }, [user]);

  const onClickLogout = async () => {
    await ClientApi.logout();
    setUser(null);
  };

  return (
    <nav
      className={`${styles["custom-navbar"]} navbar navbar-expand-lg custom-navbar border-bottom`}
    >
      <div className="row container-fluid text-dark">
        <div
          className={`col-2 d-flex align-items-center justify-content-center ${styles.brand} border-end`}
          style={{ width: 190 }}
        >
          <a
            className={`navbar-brand me-1 ${styles.logolink}`}
            href={Basepath.get("/") || "#"}
          >
            <Image
              src={Basepath.get("/img/Logo.jpg")}
              alt="MindIndex"
              className={`me-1 ${styles.logo}`}
              width={40}
              height={40}
            />
          </a>
          <a
            className={`navbar-brand text-dark ${styles.milink} fs-7 pe-3 m-1`}
            href={Basepath.get("/") || "#"}
          >
            MindIndex
          </a>
        </div>

        <div
          className="col-3 d-flex align-items-center justify-content-center"
          style={{ width: 350 }}
        >
          {subscription?.subscribed && (
            <div className="d-flex justify-content-center align-items-center mx-2">
              <h6 className="badge text-dark bg-warning mb-0">
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "dark" }}
                  size="2xs"
                  fixedWidth
                />{" "}
                Premium{" "}
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "dark" }}
                  size="2xs"
                  fixedWidth
                />
              </h6>
            </div>
          )}
          {subscription?.subscribed &&
          user?.limits &&
          !isNaN(user?.collections_count) &&
          !isNaN(user?.flashcards_count) &&
          !isNaN(user?.notes_count) ? (
            <div className="d-flex justify-content-center align-items-center gap-1 ">
              <span
                title="Study sets"
                className="badge rounded-pill bg-dark text-white"
              >
                S {user?.collections_count}/&infin;
              </span>
              <span
                title="Flashcards"
                className="badge rounded-pill bg-info text-dark"
              >
                F {user?.flashcards_count}/&infin;
              </span>
              <span title="Notes" className="badge rounded-pill bg-success">
                N {user?.notes_count}/&infin;
              </span>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center gap-1 ">
              <span
                title="Study sets"
                className="badge rounded-pill bg-dark text-white"
              >
                S {user?.collections_count}/{user?.limits?.collections}
              </span>
              <span
                title="Flashcards"
                className="badge rounded-pill bg-info text-dark"
              >
                F {user?.flashcards_count}/{user?.limits?.flashcards}
              </span>
              <span title="Notes" className="badge rounded-pill bg-success">
                N {user?.notes_count}/{user?.limits?.notes}
              </span>
            </div>
          )}
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
                      href={Basepath.get("/study-set/add") || "#"}
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
                href={Basepath.get("/profile") || "#"}
              >
                <div className="d-flex align-items-center ps-2 cursor">
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
