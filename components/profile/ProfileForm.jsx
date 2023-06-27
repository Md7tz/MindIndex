import React from "react";
import styles from "../styles/Profile.module.css";
import { toast } from "react-toastify";
import { Navigate } from "../Basepath";

import ClientApi from "../ClientApi";

import UserCollections from "./UserCollections";
import UserNotes from "./UserNotes";

export default function ProfileForm({
  user,
  setUser,
  profile,
  setProfile,
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASEPATH + `/api/users/${user.id}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await ClientApi.getToken()}`,
        },
        body: JSON.stringify({
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          address: profile.address,
          birth_date: profile.birth_date,
          gender: profile.gender,
          occupation: profile.occupation,
          interests: profile.interests,
          socials: profile.socials,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        Navigate.replace("/profile");
      } else {
        const error = await response.json();
        console.log(error);
        toast.error(error.message);
        // setProfileEditMode(false);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-md-4 mb-3">
        <div className={`${styles.card}`}>
          <div className={`${styles.cardBody}`}>
            <div className="d-flex flex-column align-items-center text-center">
              <input
                type="text"
                className="form-control"
                placeholder="Paste your profile picture URL here"
                value={profile?.avatar_url}
                onChange={(e) =>
                  setProfile({ ...profile, avatar_url: e.target.value })
                }
              />
              <div className="mt-3">
                <h4>{user.id ? user.username : ""}</h4>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Occupation/Job"
                  value={profile?.occupation}
                  onChange={(e) =>
                    setProfile({ ...profile, occupation: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={profile?.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />
                <div className="mt-3">
                  <h5>Bio</h5>
                  <textarea
                    rows={7}
                    type="text"
                    className="form-control"
                    placeholder="Bio"
                    value={profile?.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.card} mt-3`}>
          <ul className={`${styles.card} list-group list-group-flush`}>
            <li
              className="list-group-item row g-0"
              style={{
                backgroundColor: "rgb(242, 242, 242)",
              }}
            >
              <h6 className="col mb-1">
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
              <input
                type="text"
                className="col form-control"
                placeholder="Your website link"
                value={profile?.socials?.website}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: {
                      ...profile.socials,
                      website: e.target.value,
                    },
                  })
                }
              />
            </li>
            <li
              className="list-group-item row g-0"
              style={{
                backgroundColor: "rgb(242, 242, 242)",
              }}
            >
              <h6 className="col mb-1">
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
              <input
                type="text"
                className="col form-control"
                placeholder="Your GitHub account"
                value={profile?.socials?.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: {
                      ...profile.socials,
                      github: e.target.value,
                    },
                  })
                }
              />
            </li>
            <li
              className="list-group-item row g-0"
              style={{
                backgroundColor: "rgb(242, 242, 242)",
              }}
            >
              <h6 className="col mb-1">
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
              <input
                type="text"
                className="col form-control"
                placeholder="Your Twitter account"
                value={profile?.socials?.twitter}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: {
                      ...profile.socials,
                      twitter: e.target.value,
                    },
                  })
                }
              />
            </li>
            <li
              className="list-group-item row g-0"
              style={{
                backgroundColor: "rgb(242, 242, 242)",
              }}
            >
              <h6 className="col mb-1">
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>{" "}
                Instagram
              </h6>
              <input
                type="text"
                className="col form-control"
                placeholder="Your Instagram account"
                value={profile?.socials?.instagram}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: {
                      ...profile.socials,
                      instagram: e.target.value,
                    },
                  })
                }
              />
            </li>
            <li
              className="list-group-item row g-0"
              style={{
                backgroundColor: "rgb(242, 242, 242)",
              }}
            >
              <h6 className="col mb-1">
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
              <input
                type="text"
                className="col form-control"
                placeholder="Your Facebook account"
                value={profile?.socials?.facebook}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: {
                      ...profile.socials,
                      facebook: e.target.value,
                    },
                  })
                }
              />
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
                  value={user?.fullname}
                  onChange={(e) =>
                    setUser({ ...user, fullname: e.target.value })
                  }
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
                  value={user?.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                  value={profile?.birth_date}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      birth_date: new Date(e.target.value)
                        .toISOString()
                        .slice(0, 10),
                    })
                  }
                />
                <p>Selected Date: {profile?.birth_date}</p>
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
                    checked={profile?.gender === "M"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gender: e.target.value,
                      })
                    }
                  />
                  Male {"(M)"}
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    className="m-1"
                    value="F"
                    checked={profile?.gender === "F"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gender: e.target.value,
                      })
                    }
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
                  value={profile?.interests}
                  onChange={(e) =>
                    setProfile({ ...profile, interests: e.target.value })
                  }
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
    </form>
  );
}
