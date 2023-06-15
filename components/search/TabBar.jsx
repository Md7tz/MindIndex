// SearchTabs.js
import React from "react";
import Basepath from "/components/Basepath";

const SearchTabs = ({ query, type, handleTabClick }) => {
  return (
    <div className="container-fluid tab-bar mb-3">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a
            className={`nav-link ${type === "collections" ? "active" : ""}`}
            aria-current="page"
            href={Basepath.get(`/search?query=${query}&type=collections&page=1`)}
            onClick={handleTabClick}
          >
            collections
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${type === "notes" ? "active" : ""}`}
            href={Basepath.get(`/search?query=${query}&type=notes&page=1`)}
            onClick={handleTabClick}
          >
            notes
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SearchTabs;
