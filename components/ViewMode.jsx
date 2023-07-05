import React from "react";
import styles from "./styles/NoteForm.module.css";
import ClientApi from "./ClientApi";
import { toast } from "react-toastify";

const ViewMode = ({id, title, body, setFormMode }) => {
  const onDelete = async (e) => {
    const confirmation = window.confirm("Are you sure you want to delete this note?");
    if(!confirmation) return;
    const authenticationToken = await ClientApi.getToken();

    // Make an API call to create or update a note
    const response = await fetch(
      `/api/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticationToken}`,
        },
      }
    );

    if (response.ok) {
      // Handle successful create or update operation
      window.location.reload();
      toast.success(`Note has been deleted successfully!`)

    } else {
      // Handle create or update operation failure
      toast.error(`Failed to delete the note.`);

    }
  };
    

  return (
    <div className={styles["view-mode-container"]}>
      <h6 className={styles["view-mode-title"]}>{title}</h6>
      <p className={styles["view-mode-text"]}>{body}</p>
      <div id="outer">

      <button
        type="button"
        className={`inner btn btn-primary ml-4 ${styles["note-form-update-button"]} text-center`}
        onClick={() => setFormMode("edit")}
        data-inline="true"
        >
        Update Note
      </button>
      <button
        type="button"
        className={`inner btn btn-danger ${styles["note-form-delete-button"]} text-center`}
        onClick={onDelete}
        data-inline="true"
        >
        Delete Note
      </button>
      </div>
    </div>
  );
};

export default ViewMode;
