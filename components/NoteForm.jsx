import React from "react";
import styles from "./styles/NoteForm.module.css";

const NoteForm = () => {
  return (
    <div
      className="modal fade note-modal"
      id="noteForm"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles["note-modal-content"]}`}>
          <div className={`modal-header ${styles["note-modal-header"]}`}>
            <h5 className="modal-title w-100 text-center" id="noteModalLabel">
              Add a Note
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className={`modal-body ${styles["note-modal-body"]}`}>
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label note-form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control note-form-control"
                  id="title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="body" className="form-label note-form-label">
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
                  Create Note
                </button>
              </div>
            </form>
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
