import { useEffect, useState } from "react";
import ClientApi from "/components/ClientApi";
import axios from "axios";

const SearchPage = ({ query, type, page }) => {
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

      setData(newData);
      setLoading(false);

      // Check if there is more data available
      if (newData.length < 9) {
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
    fetchData();
  }, [query, type, currentPage]);

  const handleTabClick = () => {
    setCurrentPage(1);
    setHasMoreData(true);
    fetchData();
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
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
                  href={`/search?query=${query}&type=collections&page=1`}
                  onClick={handleTabClick}
                >
                  collections
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${type === "notes" ? "active" : ""}`}
                  href={`/search?query=${query}&type=notes&page=1`}
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
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4 ">
            {data.map((result, index) => (
              <div className="col" key={index}>
                <div className={`card bg-dark text-white h-100`}>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      {result.title || result.name}
                    </h5>
                    <p className="card-text">
                      {result.description || result.body}
                    </p>
                    <div className="mt-auto d-flex justify-content-end">
                      <a href="#" className="btn btn-primary">
                        Preview
                      </a>
                      {/* link-to-either-collection-or-note use, result.type/result.id */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <nav className="m-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href={`/search?query=${query}&type=${type}&page=${currentPage}`}
                onClick={handlePreviousPage}
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                {currentPage}
              </a>
            </li>
            <li className={`page-item ${!hasMoreData ? "disabled" : ""}`}>
              {/* Disable the "Next" button if no more data */}
              <a
                className="page-link"
                href={`/search?query=${query}&type=${type}&page=${currentPage}`}
                onClick={hasMoreData ? handleNextPage : null}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query, type, page } = context.query;

  return {
    props: {
      query,
      type,
      page,
    },
  };
}

export default SearchPage;
