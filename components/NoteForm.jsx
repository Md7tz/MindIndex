import styles from "./styles/NoteForm.module.css";
import React, { useEffect } from "react";

const NoteForm = ({ mode, index }) => {
  const [formMode, setFormMode] = React.useState(mode);
  useEffect(() => {
    console.log(`mode: ${formMode}, index: ${index}`);
  }, [formMode, index]);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const renderViewMode = () => {
    return (
      <div className={styles["view-mode-container"]}>
        <h6 className={styles["view-mode-title"]}>Wanderlust Chronicles</h6>
        <p className={styles["view-mode-text"]}>
          Venturing into the realm of travel, discovering new destinations and experiences.
        </p>
        <button
          type="button"
          className={`btn btn-primary ml-4 ${styles["note-form-button"]} text-center`}
          onClick={() => {
            setFormMode("edit");
          }}
        >
          Update Note
        </button>
      </div>
    );
  };

  const renderEditMode = () => {
    return (
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className={`form-label ${styles["note-form-label"]}`}>
            Title
          </label>
          <input type="text" className="form-control note-form-control" id="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className={`form-label ${styles["note-form-label"]}`}>
            Body
          </label>
          <textarea
            className={`form-control ${styles["note-form-control"]}`}
            id="body"
            rows="3"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`btn btn-primary ml-4 ${styles["note-form-button"]} text-center`}
          >
            {formMode === "create" ? "Create Note" : "Update Note"}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div
      className="modal fade note-modal"
      id={`${formMode}${index ? index : ""}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles["note-modal-content"]}`}>
          <div className={`modal-header ${styles["note-modal-header"]}`}>
            <h5 className="modal-title w-100 text-center" id="noteModalLabel">
              {formMode === "view" ? "View Note" : formMode === "create" ? "Create Note" : "Edit Note"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className={`modal-body ${styles["note-modal-body"]}`}>
            {formMode === "view" ? renderViewMode() : renderEditMode()}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
