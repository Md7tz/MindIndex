import React, { useState, useEffect } from "react";

import ProfileForm from "../components/profile/ProfileForm";
import UserProfile from "../components/profile/UserProfile";
import ClientApi from "../components/ClientApi";
import styles from "../components/styles/Profile.module.css";

export default function Profile() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });
  const [profile, setProfile] = useState({
    avatar_url: "",
    occupation: "",
    address: "",
    bio: "",
    birth_date: "",
    gender: "",
    interests: "",
    socials: {
      website: "",
      facebook: "",
      twitter: "",
      instagram: "",
      github: "",
    },
  });

  const [profileEditMode, setProfileEditMode] = useState(false);
  const [collections, setCollections] = useState({});
  const [notes, setNotes] = useState({});
  const [collectionsPageNumber, setCollectionsPageNumber] = useState(1);
  const [notesPageNumber, setNotesPageNumber] = useState(1);
  const pagesize = 10;

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
    async function getProfile() {
      if (user.id) {
        try {
          const res = await fetch(process.env.NEXT_PUBLIC_BASEPATH + `/api/users/${user.id}/profile`, {
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
          const res = await fetch(process.env.NEXT_PUBLIC_BASEPATH + `/api/users/${user.id}/collections?page=${collectionsPageNumber}&pagesize=${pagesize}`,
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
          const res = await fetch(process.env.NEXT_PUBLIC_BASEPATH + `/api/users/${user.id}/notes?page=${notesPageNumber}&pagesize=${pagesize}`,
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

  return (
    <div className="container">
      <div className={`${styles.mainBody}`}>
        {profileEditMode ? (
          <ProfileForm
            user={user}
            setUser={setUser}
            profile={profile}
            setProfile={setProfile}
            collections={collections}
            notes={notes}
            collectionsPageNumber={collectionsPageNumber}
            setCollectionsPageNumber={setCollectionsPageNumber}
            notesPageNumber={notesPageNumber}
            setNotesPageNumber={setNotesPageNumber}
            pagesize={pagesize}
            profileEditMode={profileEditMode}
            setProfileEditMode={setProfileEditMode}
          />
        ) : (
          <UserProfile
            user={user}
            profile={profile}
            collections={collections}
            notes={notes}
            collectionsPageNumber={collectionsPageNumber}
            setCollectionsPageNumber={setCollectionsPageNumber}
            notesPageNumber={notesPageNumber}
            setNotesPageNumber={setNotesPageNumber}
            pagesize={pagesize}
            profileEditMode={profileEditMode}
            setProfileEditMode={setProfileEditMode}
          />
        )}
      </div>
    </div>
  );
}
