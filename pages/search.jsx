import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchData, filteredData } from "/utils/search";

const SearchPage = () => {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { searchQuery } = router.query;
  useEffect(() => {
    const fetchDataAsync = async () => {
      setData(await fetchData());
    };

    fetchDataAsync();
  }, []);

  const filteredResults = filteredData(searchQuery, data);
  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Query: {}</p>
    </div>
  );
};

export default SearchPage;
