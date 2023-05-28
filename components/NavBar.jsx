import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Logo from "./imgs/Logo.jpg";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import axios from "axios";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collections, setCollections] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("/api/collections");
        setCollections(response.data["collections"]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data["notes"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollections();
    fetchNotes();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCollections(filteredCollections);
      setFilteredNotes(filteredNotes);
    };

    filterData();
  }, [searchQuery, collections, notes]);

  // onChange function
  const onChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      console.log(filteredCollections);
      console.log(filteredNotes);
    } catch (error) {
      console.error(error);
    }
  };

  // handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload on form submission
    console.log(event);
    console.log("HI");
  };
  return (
    <nav
      className={`${styles["custom-navbar"]} navbar navbar-expand-lg custom-navbar`}
    >
      <div className="container-fluid text-white">
        <div className={`d-flex ${styles.brand}`}>
          <a className={`navbar-brand me-1 ${styles.logolink}`} href="#">
            <Image
              src={Logo}
              alt="MindIndex"
              className={`me-1 ${styles.logo}`}
              width={40}
              height={40}
            />
          </a>
          <a
            className={`navbar-brand text-white ${styles.milink} fs-7 pe-3 m-1`}
            href="#"
          >
            MindIndex
          </a>
          <div className="border-end"></div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                <div className="d-flex align-items-center ps-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                  </svg>
                  <span className="px-2 mt-2!important ">Home</span>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#loginForm"
                data-bs-toggle="modal"
              >
                <div className="d-flex align-items-center ps-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  <span className="px-2">Login</span>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active text-white d-flex align-items-center"
                aria-current="page"
                href="#registerForm"
                data-bs-toggle="modal"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M15 12L3 12M15 12L11 16M15 12L11 8"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <div className="d-flex align-items-center ps-2">
                  <span className="">Register</span>
                </div>
              </a>
            </li>
          </ul>

          <form
            className="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              name="searchQuery"
              value={searchQuery}
              className={`form-control ${styles["search-box"]}`}
              onChange={onChange}
              placeholder="Search MindIndex"
              aria-label="Search MindIndex"
            />
            <button
              className="btn btn-dark"
              type="submit"
              data-mdb-ripple-color="dark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
            </button>
            {/* Display filtered collections as a dropdown list */}
            <select>
              {filteredCollections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>

            {/* Display filtered notes as a dropdown list */}
            <select>
              {filteredNotes.map((note) => (
                <option key={note.id} value={note.id}>
                  {note.title}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <LoginForm />
      <RegisterForm />
    </nav>
  );
}
