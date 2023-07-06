import React, { useEffect, useState } from "react";
import ClientApi from "./ClientApi";
import ViewMode from "./ViewMode";
import CreateEditMode from "./CreateEditMode";
import styles from "./styles/NoteForm.module.css";
import { toast } from "react-toastify";

const NoteForm = ({ mode, result }) => {
  const [formMode, setFormMode] = useState(mode);
  const [title, setTitle] = useState(result ? result.title : "");
  const [body, setBody] = useState(result ? result.body : "");
  const [collection_id, setCollection_id] = useState(
    result ? result.collection_id : null
  );
  const [id, setId] = useState(result ? result.id : 0);

  useEffect(() => { }, [formMode, result]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const authenticationToken = await ClientApi.getToken();

    // Make an API call to create or update a note
    const response = await fetch(process.env.NEXT_PUBLIC_BASEPATH +
      `/api/notes${formMode === "edit" ? `/${result.id}` : ""}`,
      {
        method: formMode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticationToken}`,
        },
        body: JSON.stringify({ title, body, collection_id }),
      }
    );

    if (response.ok) {
      // Handle successful create or update operation
      window.location.reload();
      toast.success(`Note ${formMode}d successfully!`);
    } else {
      // Handle create or update operation failure
      toast.error(`Failed to ${formMode}d note.`);
    }
  };

  const onClose = () => {
    if (formMode === "edit") window.location.reload();
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
              onClick={onClose}
            ></button>
          </div>
          <div className={`modal-body ${styles["note-modal-body"]}`}>
            {formMode === "view" ? (
              <ViewMode
                id={result.id}
                title={result.title}
                body={result.body}
                setFormMode={setFormMode}
              />
            ) : (
              <CreateEditMode
                onSubmit={onSubmit}
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
                setCollection_id={setCollection_id}
                collection_id={collection_id}
                formMode={formMode}
              />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
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
