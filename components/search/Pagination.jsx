// SearchPagination.js
import React from "react";

const SearchPagination = ({ currentPage, handlePreviousPage, handleNextPage, hasMoreData }) => {
  return (
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
          <button
            className="page-link"
            onClick={hasMoreData ? handleNextPage : null}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SearchPagination;
