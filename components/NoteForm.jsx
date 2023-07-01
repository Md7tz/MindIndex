import styles from "./styles/NoteForm.module.css";
import React, { useEffect, useState } from "react";
import ClientApi from "./ClientApi";

const NoteForm = ({ mode, result }) => {
  const [formMode, setFormMode] = useState(mode);
  const [title, setTitle] = useState(result ? result.title : "");
  const [body, setBody] = useState(result ? result.body : "");

  useEffect(() => {}, [formMode, result]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const authenticationToken = await ClientApi.getToken();

    // Make an API call to create or update a note
    const response = await fetch(
      `/api/notes${formMode === "edit" ? `/${result.id}` : ""}`,
      {
        method: formMode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticationToken}`,
        },
        body: JSON.stringify({ title, body }),
      }
    );

    if (response.ok) {
      // Handle successful create or update operation
      console.log(`Note ${formMode}d successfully!`);
      window.location.reload();
    } else {
      // Handle create or update operation failure
      console.error(`Failed to ${formMode}d note.`);
    }
  };

  const renderViewMode = () => {
    return (
      <div className={styles["view-mode-container"]}>
        <h6 className={styles["view-mode-title"]}>{result.title}</h6>
        <p className={styles["view-mode-text"]}>{result.body}</p>
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

  const renderCreateEditMode = () => {
    return (
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label
            htmlFor="title"
            className={`form-label ${styles["note-form-label"]}`}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control note-form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="body"
            className={`form-label ${styles["note-form-label"]}`}
          >
            Body
          </label>
          <textarea
            className={`form-control ${styles["note-form-control"]}`}
            id="body"
            rows="3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
      id={`${formMode}${result ? result.id : ""}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles["note-modal-content"]}`}>
          <div className={`modal-header ${styles["note-modal-header"]}`}>
            <h5 className="modal-title w-100 text-center" id="noteModalLabel">
              {formMode === "view"
                ? "View Note"
                : formMode === "create"
                ? "Create Note"
                : "Edit Note"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className={`modal-body ${styles["note-modal-body"]}`}>
            {formMode === "view" ? renderViewMode() : renderCreateEditMode()}
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
