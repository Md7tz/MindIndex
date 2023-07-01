import React from "react";
import styles from "../components/styles/Profile.module.css";
import NoteForm from "./NoteForm";

export default function UserNotes({
  notes,
  notesPageNumber,
  setNotesPageNumber,
  pagesize,
}) {
  return (
    <div className="col-sm-6 mb-3">
      <div className={`${styles.card} h-100`}>
        <div className={`${styles.cardBody}`}>
          <h4 className="d-flex align-items-center mb-3">Notes</h4>
          <ul className="list-group">
            {notes?.results?.length > 0
              ? notes?.results.map((note, index) => (
                  <>
                    <a
                      href={`#view${note.id}`}
                      key={index}
                      className="list-group-item"
                      data-bs-toggle="modal"
                    >
                      {note.title}
                    </a>
                    <NoteForm mode={"view"} result={note} />
                  </>
                ))
              : "No notes found."}

            {notes?.results?.length < pagesize &&
              Array(pagesize - notes?.results?.length)
                .fill()
                .map((_, index) => (
                  <li key={index} className="list-group-item">
                    &nbsp;
                  </li>
                ))}
          </ul>
          <ul className="pagination d-flex justify-content-center m-1">
            <li
              className={`page-item ${notesPageNumber === 1 ? "disabled" : ""}`}
            >
              <button
                disabled={notesPageNumber === 1}
                className="page-link"
                onClick={() => {
                  setNotesPageNumber(notesPageNumber - 1);
                }}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li className="page-item disabled">
              <button disabled className="page-link text-dark">
                {notesPageNumber}
                {/* of {} */}
              </button>
            </li>

            <li
              className={`page-item ${
                notes?.total > notesPageNumber * pagesize ? "" : "disabled"
              }`}
            >
              <button
                disabled={notes?.length < pagesize}
                className="page-link"
                aria-label="Next"
                onClick={() => {
                  setNotesPageNumber(notesPageNumber + 1);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
