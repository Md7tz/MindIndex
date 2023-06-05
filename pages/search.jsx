import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchData, filteredData } from "/utils/search";
import ClientApi from "/components/ClientApi";
const SearchPage = () => {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { searchQuery } = router.query;
  useEffect(async () => {
    setData(await fetchData(await ClientApi.getToken()));
  }, []);

  const filteredResults = filteredData(searchQuery, data);
  return (
    <div>
      <header className="py-3 text-black ">
        <div className="container-fluid">
          <h1 className="">Results for "{searchQuery}"</h1>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          {filteredResults.map((result) => (
            <div className="col" key={result.merged_id}>
              <div
                className={`card ${
                  result.type === "collection" ? "bg-info" : "bg-dark"
                } text-white h-100`}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{result.title || result.name}</h5>
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
      </div>
    </div>
  );
};

export default SearchPage;
