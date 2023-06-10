import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ClientApi from "/components/ClientApi";
import axios from "axios";
import Basepath from "/components/Basepath";

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
      if (
        page == Math.ceil(newData.total / 9) ||
        newData.total == 0
      ) {
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
          <div className="container-fluid tab-bar mb-3">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    type === "collections" ? "active" : ""
                  }`}
                  aria-current="page"
                  href={Basepath.get(
                    `/search?query=${query}&type=collections&page=1`
                  )}
                  onClick={handleTabClick}
                >
                  collections
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${type === "notes" ? "active" : ""}`}
                  href={Basepath.get(
                    `/search?query=${query}&type=notes&page=1`
                  )}
                  onClick={handleTabClick}
                >
                  notes
                </a>
              </li>
            </ul>
          </div>
          <h1 className="">Results for "{query}"</h1>
        </div>
      </header>

      <div className="container-fluid">
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {data.map((result, index) => (
              <div className="col" key={index}>
                <div className="card bg-dark text-white h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      {/* Limit title length and add ellipsis */}
                      {result.title && result.title.length > 30
                        ? result.title.substring(0, 30) + "..."
                        : result.title || result.name}
                    </h5>
                    <p className="card-text">
                      {/* Limit description length and add ellipsis */}
                      {result.description && result.description.length > 100
                        ? result.description.substring(0, 100) + "..."
                        : result.description || result.body}
                    </p>
                    <div className="mt-auto d-flex justify-content-end">
                      <a href="#" className="btn btn-primary">
                        View
                      </a>
                      {/* link-to-either-collection-or-note use, result.type/result.id */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-5 text-xl">
            No content found. Please try a different search query.
          </p>
        )}

        <nav className="m-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePreviousPage}>
                Previous
              </button>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                {currentPage}
              </a>
            </li>
            <li className={`page-item ${!hasMoreData ? "disabled" : ""}`}>
              {/* Disable the "Next" button if no more data */}
              <button
                className="page-link"
                onClick={hasMoreData ? handleNextPage : null}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SearchPage;
