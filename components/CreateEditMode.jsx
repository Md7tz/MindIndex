import React from "react";
import styles from "./styles/NoteForm.module.css";

const CreateEditMode = ({ onSubmit, title, setTitle, body, setBody, formMode }) => {
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

export default CreateEditMode;
