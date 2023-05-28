import styles from "../styles/Navbar.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ListView from "./ListView";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [collections, setCollections] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("/api/collections");
        setCollections(response.data["collections"]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data["notes"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollections();
    fetchNotes();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCollections(filteredCollections);
      setFilteredNotes(filteredNotes);
    };

    filterData();
  }, [searchQuery, collections, notes]);

  // onChange function
  const onChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      console.log(filteredCollections);
      console.log(filteredNotes);
    } catch (error) {
      console.error(error);
    }
  };

  // handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload on form submission
    console.log(event);
    console.log("HI");
  };
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
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
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
      {isSearchFocused && (
              <ListView
                collections={filteredCollections}
                notes={filteredNotes}
              />
            )}
    </form>
  );
};

export default SearchBar;
