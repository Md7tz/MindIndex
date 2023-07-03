import React, { useEffect, useState } from "react";
import styles from "../components/styles/Landing.module.css";
import Image from "next/image";
import { faStar, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Event from "../components/Event";
import ClientApi from "../components/ClientApi";
import Basepath from "../components/Basepath";
import { toast } from "react-toastify";

export default function Landing() {
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
          const res = await fetch(process.env.NEXT_PUBLIC_BASEPATH + `/api/users/${user.id}/subscription`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await ClientApi.getToken()}`,
            },
          });

          const data = await res.json();
          setSubscription(data.metadata);
        } catch (err) {
          console.log(err);
        }
      }
    }

    getSubscriptionStatus();
  }, [user]);

  useEffect(() => {
    Event.off("welcome", () => {});
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const canceled = urlParams.get("canceled");

    const handlePaymentStatus = (message) => {
      toast[message.type](message.text);
      setTimeout(() => {
        window.location.replace(
          window.location.href.replace(window.location.search, "")
        );
      }, 2000);
    };

    if (success === "true") {
      handlePaymentStatus({ type: "success", text: "Payment was successful!" });
    } else if (canceled === "true") {
      handlePaymentStatus({ type: "error", text: "Payment was canceled!" });
    }
  }, []);
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!user || !user.id || !user.email) {
      // Handle the case where the user or email is missing
      ClientApi.logout();
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASEPATH + "/api/stripe/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await ClientApi.getToken()}`,
        },
        body: JSON.stringify({
          user: user,
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.replace(url);
      } else {
        const error = await response.json();
        throw new Error(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={Basepath.get("/img/landing_image.jpg")}
              alt="Friends' group studying"
            />
          </div>
          <div className="col-lg-5 text-dark">
            <h1 className="font-weight-light">
              The best digital flashcards and study tools
            </h1>
            <p>
              Join students using MindIndex’s science-backed flashcards,
              practice questions to improve your grades and reach your goals.
            </p>
            {!user?.id && (
              <a
                className="btn btn-success"
                aria-current="page"
                href="#registerForm"
                data-bs-toggle="modal"
              >
                Sign Up for free
              </a>
            )}
          </div>
        </div>
        <div className="row gx-4 gx-lg-5">
          <div className="col-md-4 mb-5">
            <div className={`card h-100 ${styles.customCard}`}>
              <div className="card-body">
                <h2 className="card-title">Flashcard Collections</h2>
                <p className="card-text">
                  Take your studying to the next level with our extensive
                  collections of flashcards. MindIndex offers a diverse range of
                  subject-specific flashcard sets meticulously created by
                  experts. Whether you're preparing for exams, mastering a new
                  topic, or reviewing key concepts, our curated collections have
                  got you covered. Each flashcard set is designed to help you
                  retain information effectively and reinforce your learning.
                  Explore our ever-growing library of flashcard collections and
                  unlock the power of focused and targeted studying.
                </p>
              </div>
              <div className="card-footer">
                <img
                  className="card-img-bottom"
                  // src="https://images.prismic.io/quizlet-prod/31c85d7d-9e36-40a4-9fae-5027c355ddee_Flashcards-1.gif?auto=compress,format"
                  src={Basepath.get("/img/flashcard.gif")}
                  alt="Card image cap"
                ></img>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className={`card h-100 ${styles.customCard}`}>
              <div className="card-body">
                <h2 className="card-title">Notes & Diaries</h2>
                <p className="card-text">
                  Keep your study journey organized and efficient with our
                  Diaries of Notes feature. Capture and consolidate your key
                  learnings, insights, and summaries in one central location.
                  Create personalized diaries for each subject, topic, or
                  course, allowing you to easily review and revise important
                  information whenever needed. With MindIndex's Diaries of
                  Notes, you can structure your notes, add annotations, and
                  access them anytime, anywhere. Stay organized, streamline your
                  study process, and elevate your learning experience with this
                  powerful tool.
                </p>
              </div>
              <div className="card-footer">
                <img
                  className="card-img-bottom"
                  src={Basepath.get("/img/taking_notes.gif")}
                  alt="Card image cap"
                ></img>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className={`card h-100 ${styles.customCard}`}>
              <div className="card-body text-justify">
                <div className="d-flex align-items-center">
                  <h2 className="card-title me-2">MindIndex</h2>
                  <h1 className="badge text-dark bg-warning">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "dark" }}
                      size="1x"
                      fixedWidth
                    />
                    Premium
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "dark" }}
                      size="1x"
                      fixedWidth
                    />
                  </h1>
                </div>

                <p className="card-text text-justify">
                  Accelerate your learning with MindIndex Premium. Gain access
                  to powerful study tools, including science-backed digital
                  flashcards, curated practice questions, and personalized study
                  plans. Our expertly crafted content and advanced analytics
                  help you track progress and achieve your academic goals.
                  Upgrade to MindIndex Premium today to unlock a world of
                  knowledge and boost your grades.
                </p>
                <div className="d-flex justify-content-center">
                  <Image
                    src={Basepath.get("/img/Premium.png")}
                    alt="MindIndex Premium"
                    className={`${styles.logo}`}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="card-footer d-flex justify-content-center">
                {user?.id ? (
                  <button
                    className={`btn btn-warning btn-block ${subscription?.subscribed && "disabled"}`}
                    onClick={subscription?.subscribed ? null : handleSubscribe}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {subscription?.subscribed
                        ? "You are subscribed! Enjoy Premium perks"
                        : "Go Premium"}
                    </span>
                    <FontAwesomeIcon
                      icon={faRocket}
                      style={{ color: "dark" }}
                      size="1x"
                      fixedWidth
                    />
                  </button>
                ) : (
                  <a
                    className="btn btn-warning btn-block"
                    aria-current="page"
                    href="#loginForm"
                    data-bs-toggle="modal"
                  >
                    <span style={{ fontWeight: "bold" }}>
                      Login and Go Premium
                    </span>
                    <FontAwesomeIcon
                      icon={faRocket}
                      style={{ color: "dark" }}
                      size="1x"
                      fixedWidth
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
