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
      <div className="container-fluid">
        <div className="row">
          {filteredResults.map((result) => (
            <div className="col-md-4 mb-4 pt-4" key={result.merged_id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{result.title || result.name}</h5>
                  <p className="card-text">
                    {result.description || result.body}
                  </p>
                    <a href="#" class="card-link">link to the note/collection view</a>
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
