import React, { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import ListView from "./ListView";
import styles from "../styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionsResponse, notesResponse] = await Promise.all([
          axios.get("/api/collections"),
          axios.get("/api/notes"),
        ]);

        const collections = collectionsResponse.data.collections.map(
          (collection) => ({
            ...collection,
            merged_id: `collection_${collection.id}`,
            type: "collection",
          })
        );

        const notes = notesResponse.data.notes.map((note) => ({
          ...note,
          merged_id: `note_${note.id}`,
          type: "note",
        }));

        setData([...collections, ...notes]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredData = searchQuery
    ? new Fuse(data, {
        keys: ["title", "body", "description", "name"],
        includeScore: true,
        threshold: 0.4,
      })
        .search(searchQuery)
        .map((result) => result.item)
    : [];

  const onChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <form
      className="col d-flex justify-content-center input-group ms-lg-3 my-3 my-lg-0"
    >
      <div className={`${styles.searchWrapper}`}>
        <input
          className={`${styles.searchInput}`}
          placeholder="Search"
          type="search"
          name="searchQuery"
          value={searchQuery}
          onChange={onChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ color: "dark" }}
          size="1x"
          fixedWidth
        />
      </div>
      {searchQuery.length > 0 && filteredData.length !== 0 && (
        <ListView data={filteredData} />
      )}
    </form>
  );
};

export default SearchBar;
