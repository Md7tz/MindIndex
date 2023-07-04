import React from "react";
import styles from "../styles/Profile.module.css";

import UserCollections from "./UserCollections";
import UserNotes from "./UserNotes";
import Socials from "./Socials";

export default function UserProfile({
  user,
  profile,
  collections,
  notes,
  collectionsPageNumber,
  setCollectionsPageNumber,
  notesPageNumber,
  setNotesPageNumber,
  pagesize,
  profileEditMode,
  setProfileEditMode,
}) {
  return (
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className={`${styles.card}`}>
          <div className={`${styles.cardBody}`}>
            <div className="d-flex flex-column align-items-center text-center">
              <img
                src={profile?.avatar_url || "http://www.gravatar.com/avatar/?d=mp"}
                alt="Profile Picture"
                className="rounded-circle"
                width={150}
                height={150}
              />

              <div className="mt-3">
                <h4>{user.id ? user.username : ""}</h4>
                <p className="text-secondary mb-1">{profile?.occupation}</p>
                <p className="text-muted font-size-sm">{profile?.address}</p>
                <div className="mt-3">
                  <h5>Bio</h5>
                  <p>{profile?.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Socials userProfile={profile} />
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
              <div className="col-sm-9 text-secondary">{profile?.gender}</div>
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
          <UserCollections
            collections={collections}
            collectionsPageNumber={collectionsPageNumber}
            setCollectionsPageNumber={setCollectionsPageNumber}
            pagesize={pagesize}
          />
          <UserNotes
            notes={notes}
            notesPageNumber={notesPageNumber}
            setNotesPageNumber={setNotesPageNumber}
            pagesize={pagesize}
          />
        </div>
      </div>
    </div>
  );
}
