import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/profile.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import { Navigate } from "../components/Basepath";
import ClientApi from "../components/ClientApi";

export default function Profile() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  const [avatarURL, setAvatarURL] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [interests, setInterests] = useState("");

  const [profileEditMode, setProfileEditMode] = useState(false);
  const [collections, setCollections] = useState([{}]);
  const [notes, setNotes] = useState([]);
  const [collectionsPageNumber, setCollectionsPageNumber] = useState(1);
  const [notesPageNumber, setNotesPageNumber] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function getUser() {
      try {
        setUser(await ClientApi.getUser());

        if (!user) {
          toast.error("You are not logged in!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            Navigate.replace("");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    setFullname(user?.fullname);
    setEmail(user?.email);
    setAvatarURL(profile?.avatar_url);
    setOccupation(profile?.occupation);
    setAddress(profile?.address);
    setBio(profile?.bio);
    setBirthDate(profile?.birth_date);
    setSelectedGender(profile?.gender);
    setInterests(profile?.interests);
  }, [profile, user]);

  useEffect(() => {
    async function getProfile() {
      if (user.id) {
        try {
          const res = await fetch(`/api/user/${user.id}/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await ClientApi.getToken()}`,
            },
          });

          const data = await res.json();
          setProfile(data.profile);
        } catch (error) {
          console.log(error);
        }
      }
    }

    getProfile();
  }, [user]);

  useEffect(() => {
    async function fetchUserCollections() {
      if (user.id) {
        try {
          const res = await fetch(
            `/api/user/${user.id}/collections/${pageSize}/${pageNumber}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await ClientApi.getToken()}`,
              },
            }
          );

          const data = await res.json();
          setCollections(data.collections);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchUserCollections();
  }, [user, collectionsPageNumber]);

  useEffect(() => {
    async function fetchUserNotes() {
      if (user.id) {
        try {
          const res = await fetch(
            `/api/user/${user.id}/notes/${pageSize}/${notesPageNumber}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await ClientApi.getToken()}`,
              },
            }
          );

          const data = await res.json();
          setNotes(data.notes);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchUserNotes();
  }, [user, notesPageNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user/${user.id}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await ClientApi.getToken()}`,
        },
        body: JSON.stringify({
          bio,
          avatar_url: avatarURL,
          address,
          birth_date: birthDate,
          gender: selectedGender,
          occupation,
          interests,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Profile updated successfully!");
        Navigate.replace("/profile");
      } else {
        const error = await response.json();
        console.log(error);
        toast.error("Please fill in all the fields.");
        setProfileEditMode(false);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <div className="container">
      <div className={`${styles.mainBody}`}>
        {profileEditMode ? (
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-4 mb-3">
              <div className={`${styles.card}`}>
                <div className={`${styles.cardBody}`}>
                  <div className="d-flex flex-column align-items-center text-center">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Paste your profile picture URL here"
                      value={avatarURL}
                      onChange={(e) => setAvatarURL(e.target.value)}
                    />
                    <div className="mt-3">
                      <h4>{user.id ? user.username : ""}</h4>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Occupation/Job"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <div className="mt-3">
                        <h5>Bio</h5>
                        <textarea
                          rows={7}
                          type="text"
                          className="form-control"
                          placeholder="Bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.card} mt-3`}>
                <ul className={`${styles.card} list-group list-group-flush`}>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe mr-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>{" "}
                      Website
                    </h6>
                    <span className="text-secondary">https://website.com</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github mr-2 icon-inline"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>{" "}
                      Github
                    </h6>
                    <span className="text-secondary">gitacc</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter mr-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>{" "}
                      Twitter
                    </h6>
                    <span className="text-secondary">@twitterAcc</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram mr-2 icon-inline text-danger"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>{" "}
                      Instagram
                    </h6>
                    <span className="text-secondary">InstaAcc</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook mr-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>{" "}
                      Facebook
                    </h6>
                    <span className="text-secondary">FbAcc</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className={`${styles.card} mb-3`}>
                <div className={`${styles.cardBody}`}>
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">User ID</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.id ? user.id : ""}
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Birth Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Birth Date"
                        value={birthDate}
                        onChange={(e) =>
                          setBirthDate(
                            new Date(e.target.value).toISOString().slice(0, 10)
                          )
                        }
                      />
                      <p>Selected Date: {birthDate}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 d-flex justify-content-around">
                      <label>
                        <input
                          type="radio"
                          className="m-1"
                          value="M"
                          checked={selectedGender === "M"}
                          onChange={(e) => setSelectedGender(e.target.value)}
                        />
                        Male {"(M)"}
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          className="m-1"
                          value="F"
                          checked={selectedGender === "F"}
                          onChange={(e) => setSelectedGender(e.target.value)}
                        />
                        Female {"(F)"}
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Interests</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your interests"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm d-flex justify-content-end">
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className={`${styles.card} h-100`}>
                    <div className={`${styles.cardBody}`}>
                      <h4 className="d-flex align-items-center mb-3">
                        Flashcard Collections
                      </h4>
                      <ul className="list-group">
                        {collections.map((collection, index) => (
                          <a
                            href={`/collections/${index}`}
                            key={index}
                            className="list-group-item"
                          >
                            {collection.name}
                          </a>
                        ))}
                        <li className="list-group-item"></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className={`${styles.card} h-100`}>
                    <div className={`${styles.cardBody}`}>
                      <h4 className="d-flex align-items-center mb-3">Notes</h4>
                      <ul className="list-group">
                        {notes.map((note, index) => (
                          <a
                            href={`/notes/${index}`}
                            key={index}
                            className="list-group-item"
                          >
                            {note}
                          </a>
                        ))}
                        <li className="list-group-item"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className={`${styles.card}`}>
                <div className={`${styles.cardBody}`}>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={profile?.avatar_url}
                      alt="Profile Picture"
                      className="rounded-circle"
                      width={150}
                      height={150}
                    />

                    <div className="mt-3">
                      <h4>{user.id ? user.username : ""}</h4>
                      <p className="text-secondary mb-1">
                        {profile?.occupation}
                      </p>
                      <p className="text-muted font-size-sm">
                        {profile?.address}
                      </p>
                      <div className="mt-3">
                        <h5>Bio</h5>
                        <p>{profile?.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.card} mt-3`}>
                <ul className={`${styles.card} list-group list-group-flush`}>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe mr-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>{" "}
                      Website
                    </h6>
                    <span className="text-secondary">https://website.com</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github mr-2 icon-inline"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>{" "}
                      Github
                    </h6>
                    <span className="text-secondary">gitacc</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter mr-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>{" "}
                      Twitter
                    </h6>
                    <span className="text-secondary">@twitterAcc</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram mr-2 icon-inline text-danger"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>{" "}
                      Instagram
                    </h6>
                    <span className="text-secondary">InstaAcc</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook mr-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>{" "}
                      Facebook
                    </h6>
                    <span className="text-secondary">FbAcc</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className={`${styles.card} mb-3`}>
                <div className={`${styles.cardBody}`}>
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">User ID</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.id ? user.id : ""}
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.id ? user.fullname : ""}
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.id ? user.email : ""}
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Birth Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile?.birth_date}
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile?.gender}
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Interests</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile?.interests}
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-sm d-flex justify-content-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => setProfileEditMode(!profileEditMode)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className={`${styles.card} h-100`}>
                    <div className={`${styles.cardBody}`}>
                      <h4 className="d-flex align-items-center mb-3">
                        Flashcard Collections
                      </h4>
                      <ul className="list-group">
                        {collections != []
                          ? collections.map((collection, index) => (
                              <a
                                href={`/collections/${index}`}
                                key={index}
                                className="list-group-item"
                              >
                                {collection.name}
                              </a>
                            ))
                          : "No collections left"}

                        {collections.length < pageSize &&
                          Array(pageSize - collections.length)
                            .fill()
                            .map((_, index) => (
                              <li key={index} className="list-group-item">
                                &nbsp;
                              </li>
                            ))}
                      </ul>
                      <ul className="pagination d-flex justify-content-center m-1">
                        <li
                          className={`page-item ${
                            pageNumber === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            disabled={pageNumber === 1}
                            className="page-link"
                            onClick={() => {
                              setPageNumber(pageNumber - 1);
                            }}
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                        <li className="page-item disabled">
                          <button disabled className="page-link text-dark">
                            Page {pageNumber}
                            {/* of {} */}
                          </button>
                        </li>

                        <li
                          className={`page-item ${
                            collections.length < pageSize ? "disabled" : ""
                          }`}
                        >
                          <button
                            disabled={collections.length < pageSize}
                            className="page-link"
                            aria-label="Next"
                            onClick={() => {
                              setPageNumber(pageNumber + 1);
                            }}
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className={`${styles.card} h-100`}>
                    <div className={`${styles.cardBody}`}>
                      <h4 className="d-flex align-items-center mb-3">Notes</h4>
                      <ul className="list-group">
                        {notes.map((note, index) => (
                          <a
                            href={`/notes/${index}`}
                            key={index}
                            className="list-group-item"
                          >
                            {note}
                          </a>
                        ))}
                        <li className="list-group-item"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
