import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ClientApi from "/components/ClientApi";
import axios from "axios";

import TabBar from "/components/search/TabBar";
import Results from "/components/search/Results";
import Pagination from "/components/search/Pagination";

const SearchPage = () => {
  const router = useRouter();
  const { query, type, page } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchData = async () => {
    try {
      const authenticationToken = await ClientApi.getToken();

      const params = {
        query: query,
        page: currentPage,
      };
      const url = `/api/${type}`;

      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${authenticationToken}`,
        },
      });

      const newData =
        type === "collections"
          ? response.data.collections
          : response.data.notes;

      setData(newData.results);

      setLoading(false);

      // Check if there is more data available
      if (page == Math.ceil(newData.total / 9) || newData.total == 0) {
        setHasMoreData(false);
      } else {
        setHasMoreData(true);
      }
    } catch (error) {
      // Handle the error here
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady, page, type, query]);

  const handleTabClick = () => {
    setCurrentPage(1);
    setHasMoreData(true);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    router.push(`/search?query=${query}&type=${type}&page=${nextPage}`);
    setCurrentPage(nextPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      router.push(`/search?query=${query}&type=${type}&page=${previousPage}`);
      setCurrentPage(previousPage);
    }
  };

  return (
    <div>
      <header className="py-3 text-black">
        <div className="container-fluid">
          <TabBar
            query={query}
            type={type}
            handleTabClick={handleTabClick}
          />
          <h1 className="">Results for "{query}"</h1>
        </div>
      </header>

      <div className="container-fluid">
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          <Results data={data} />
        ) : (
          <p className="text-center mt-5 text-xl">
            No content found. Please try a different search query.
          </p>
        )}

        <Pagination
          currentPage={currentPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          hasMoreData={hasMoreData}
        />
      </div>
    </div>
  );
};

export default SearchPage;
