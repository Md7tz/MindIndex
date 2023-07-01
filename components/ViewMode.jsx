import React from "react";
import styles from "./styles/NoteForm.module.css";

const ViewMode = ({ title, body, setFormMode }) => {
  return (
    <div className={styles["view-mode-container"]}>
      <h6 className={styles["view-mode-title"]}>{title}</h6>
      <p className={styles["view-mode-text"]}>{body}</p>
      <button
        type="button"
        className={`btn btn-primary ml-4 ${styles["note-form-button"]} text-center`}
        onClick={() => setFormMode("edit")}
      >
        Update Note
      </button>
    </div>
  );
};

export default ViewMode;
