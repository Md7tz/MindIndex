import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ListView from "./ListView";
import ClientApi from "../ClientApi";
import styles from "../styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery.trim()) return;

      try {
        const authenticationToken = await ClientApi.getToken();
        const response = await axios.get(process.env.NEXT_PUBLIC_BASEPATH + `/api/search?query=${searchQuery}`, {
          headers: {
            Authorization: `Bearer ${authenticationToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const onSubmit = (event) => {
    event.preventDefault();

    router.push({
      pathname: "/search",
      query: { query: searchQuery, type: "collections", page: 1 },
    });
  };

  const onChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <form
      className="col d-flex justify-content-center input-group ms-lg-3 my-3 my-lg-0"
      onSubmit={onSubmit}
    >
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
      {searchQuery.trim() !== "" && (
        <ListView data={data} query={searchQuery} />
      )}
    </form>
  );
}
