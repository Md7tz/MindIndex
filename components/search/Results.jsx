// SearchResults.js
import React from "react";

const SearchResults = ({ data }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {data.map((result, index) => (
        <div className="col" key={index}>
          <div className="card bg-dark text-white h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                {result.title && result.title.length > 30
                  ? result.title.substring(0, 30) + "..."
                  : result.title || result.name}
              </h5>
              <p className="card-text">
                {result.description && result.description.length > 100
                  ? result.description.substring(0, 100) + "..."
                  : result.description || result.body}
              </p>
              <div className="mt-auto d-flex justify-content-end">
                <a href="#" className="btn btn-primary">
                  View
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
