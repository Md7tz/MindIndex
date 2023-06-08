import { useEffect, useState } from "react";
import ClientApi from "/components/ClientApi";
import axios from "axios";

const SearchPage = ({ query, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const authenticationToken = await ClientApi.getToken();
      const url = `/api/${type}?query=${query}`;
      console.log(url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authenticationToken}`,
        },
      });

      setData(
        type === "collections" ? response.data.collections : response.data.notes
      );
      setLoading(false);
    } catch (error) {
      // Handle the error here
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, type]);


  return (
    <div>
      <header className="py-3 text-black ">
        <div className="container-fluid">
          <div className="container-fluid tab-bar mb-3">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    type === "collections" ? "active" : ""
                  }`}
                  aria-current="page"
                  href={`/search?query=${query}&type=collections`}
                  onClick={() => fetchData()}
                >
                  collections
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${type === "notes" ? "active" : ""}`}
                  href={`/search?query=${query}&type=notes`}
                  onClick={() => fetchData()}
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
                      <a href="#" className="btn btn-primary ">
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
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query, type } = context.query;

  return {
    props: {
      query,
      type,
    },
  };
}

export default SearchPage;
