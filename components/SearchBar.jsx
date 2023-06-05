import React, { useEffect, useState } from "react";
import ListView from "./ListView";
import ClientApi from "./ClientApi";
import styles from "../styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchData, filteredData } from "/utils/search";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(async () => {
    setData(await fetchData(await ClientApi.getToken()));
  }, []);

  const filteredResults = filteredData(searchQuery, data);

  const destinationURL = "/search";
  const urlWithPath = `${destinationURL}?searchQuery=${searchQuery}`;

  const onChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <form className="col d-flex justify-content-center input-group ms-lg-3 my-3 my-lg-0">
      <div className={`${styles.searchWrapper}`}>
        <input
          className={`${styles.searchInput}`}
          placeholder="Search"
          type="text"
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
      {filteredResults.length !== 0 && (
        <ListView data={filteredResults} urlWithPath={urlWithPath} />
      )}
    </form>
  );
};

export default SearchBar;
