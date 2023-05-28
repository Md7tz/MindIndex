import React from "react";
import styles from "../styles/Navbar.module.css";

const SearchBar = ({handleSubmit, searchQuery, onChange, filteredCollections, filteredNotes}) => {
  return (
    <form
      className="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        name="searchQuery"
        value={searchQuery}
        className={`form-control ${styles["search-box"]}`}
        onChange={onChange}
        placeholder="Search MindIndex"
        aria-label="Search MindIndex"
      />
      <button
        className="btn btn-dark"
        type="submit"
        data-mdb-ripple-color="dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg>
      </button>
      {/* Display filtered collections as a dropdown list */}
      <select>
        {filteredCollections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>

      {/* Display filtered notes as a dropdown list */}
      <select>
        {filteredNotes.map((note) => (
          <option key={note.id} value={note.id}>
            {note.title}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchBar;
