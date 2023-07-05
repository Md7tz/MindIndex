import React from "react";
import NoteForm from "../NoteForm";
const Card = ({ result }) => {
  return (
    <div className="card bg-dark text-white h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {result.title && result.title.length > 30
            ? result.title.substring(0, 30) + "..."
            : result.title || result.name}
        </h5>
        <p className="card-text">
          {result.description && result.description.length > 100
            ? result.description.substring(0, 100) + "..."
            : result.description || result.body}
        </p>
        <div className="mt-auto d-flex justify-content-end">
          {/* either for collection view or note */}
          <a
            href={result.title ? `#view${result.id}` : "#"}
            className="btn btn-primary"
            data-bs-toggle="modal"
          >
            View
          </a>
        </div>
      </div>
      {result.title && <NoteForm mode={"view"} result={result} />}
    </div>
  );
};

export default Card;
