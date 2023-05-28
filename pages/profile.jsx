import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Profile.module.css";
import Image from "next/image";

export default function Profile() {
  const [showAllCollections, setShowAllCollections] = useState(false);
  const collections = [
    "Collection 1",
    "Collection 2",
    "Collection 3",
    "Collection 4",
    "Collection 5",
    "Collection 6",
    "Collection 7",
    "Collection 8",
    "Collection 9",
    "Collection 10",
  ];

  const toggleCollections = () => {
    setShowAllCollections(!showAllCollections);
  };

  const [showAllNotes, setShowAllNotes] = useState(false);
  const notes = [
    "Note 1",
    "Note 2",
    "Note 3",
    "Note 4",
    "Note 5",
    "Note 6",
    "Note 7",
    "Note 8",
    "Note 9",
    "Note 10",
  ];

  const toggleNotes = () => {
    setShowAllNotes(!showAllNotes);
  };

  const userAvatarUrl =
    "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=360";

  const interests = ["interest 1", "interest 2", "interest 3", "interest 4"];

  return (
    <div className="container">
      <div className={`${styles.mainBody}`}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className={`${styles.card}`}>
              <div className={`${styles.cardBody}`}>
                <div className="d-flex flex-column align-items-center text-center">
                  <Image
                    src={userAvatarUrl}
                    alt="Profile Picture"
                    className="rounded-circle"
                    width={150}
                    height={150}
                  />
                  <div className="mt-3">
                    <h4>Username</h4>
                    <p className="text-secondary mb-1">occupation</p>
                    <p className="text-muted font-size-sm">address</p>
                    <div className="mt-3">
                      <h5>Bio</h5>
                      <p>bio</p>
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                    kasnofc23985y210onfsoi38
                  </div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">full name</div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">email@email.com</div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">+123456789</div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Birth Date</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">yyyy-mm-dd</div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Gender</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">M</div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Interests</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {interests.join(", ")}.
                  </div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-sm d-flex justify-content-end">
                    <a className="btn btn-primary " href="#triggerModal">
                      Edit Profile
                    </a>
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
                      {collections
                        .slice(0, showAllCollections ? collections.length : 5)
                        .map((collection, index) => (
                          <a
                            href={`/collections/${index}`}
                            key={index}
                            className="list-group-item"
                          >
                            {collection}
                          </a>
                        ))}
                      <li className="list-group-item">
                        <div className="d-flex justify-content-center">
                          <button
                            className={`btn btn-link p-0 border-0`}
                            onClick={toggleCollections}
                          >
                            {showAllCollections ? "Show Less" : "Show All"}
                          </button>
                        </div>
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
                      {notes
                        .slice(0, showAllNotes ? notes.length : 5)
                        .map((note, index) => (
                          <a
                            href={`/notes/${index}`}
                            key={index}
                            className="list-group-item"
                          >
                            {note}
                          </a>
                        ))}
                      <li className="list-group-item">
                        <div className="d-flex justify-content-center">
                          <button
                            className={`btn btn-link p-0 border-0`}
                            onClick={toggleNotes}
                          >
                            {showAllNotes ? "Show Less" : "Show All"}
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
