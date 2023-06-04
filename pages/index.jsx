import React, { useEffect } from "react";
import styles from "../styles/Landing.module.css";
import Image from "next/image";
import { faStar, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Event from "../components/Event";

export default function Landing() {
  useEffect(() => {
    Event.off("welcome", ()=>{});
  }, []);

  return (
    <>
      <div className="container">
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://unitecloud.org/wp-content/uploads/2022/08/2.jpg"
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

            <a
              className="btn btn-success"
              aria-current="page"
              href="#registerForm"
              data-bs-toggle="modal"
            >
              Sign Up for free
            </a>
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
                  class="card-img-bottom"
                  // src="https://images.prismic.io/quizlet-prod/31c85d7d-9e36-40a4-9fae-5027c355ddee_Flashcards-1.gif?auto=compress,format"
                  src="https://global-uploads.webflow.com/611b774c624f22e8063bb429/6357f11b6cc0d06f175d4bb1_Flip%2520flashcards.gif"
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
                  class="card-img-bottom"
                  src="https://gifdb.com/images/high/writing-notes-and-copying-npndvx442t7q6kt9.gif"
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
                    src={"/img/Premium.png"}
                    alt="MindIndex Premium"
                    className={`${styles.logo}`}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="card-footer d-flex justify-content-center">
                <a className="btn btn-warning btn-block" href="#!">
                  <span style={{ fontWeight: "bold" }}>Go Premium</span>
                  <FontAwesomeIcon
                    icon={faRocket}
                    style={{ color: "dark" }}
                    size="1x"
                    fixedWidth
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
