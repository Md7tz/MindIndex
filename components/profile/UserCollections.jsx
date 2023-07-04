import React from "react";
import styles from "../styles/Profile.module.css";

export default function UserCollections({
  collections,
  collectionsPageNumber,
  setCollectionsPageNumber,
  pagesize,
}) {
  return (
    <div className="col-sm-6 mb-3">
      <div className={`${styles.card} h-100`}>
        <div className={`${styles.cardBody}`}>
          <h4 className="d-flex align-items-center mb-3">
            Flashcard Collections
          </h4>
          <ul className="list-group">
            {collections?.results?.length > 0
              ? collections?.results.map((collection, index) => (
                  <a
                    href={`/user/study-set/${collection.id}`}
                    key={index}
                    className="list-group-item"
                  >
                    {collection.name}
                  </a>
                ))
              : "No collections found."}

            {collections?.results?.length < pagesize &&
              Array(pagesize - collections?.results?.length)
                .fill()
                .map((_, index) => (
                  <li key={index} className="list-group-item">
                    &nbsp;
                  </li>
                ))}
          </ul>
          <ul className="pagination d-flex justify-content-center m-1">
            <li
              className={`page-item ${
                collectionsPageNumber === 1 ? "disabled" : ""
              }`}
            >
              <button
                disabled={collectionsPageNumber === 1}
                className="page-link"
                onClick={() => {
                  setCollectionsPageNumber(collectionsPageNumber - 1);
                }}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li className="page-item disabled">
              <button disabled className="page-link text-dark">
                {collectionsPageNumber}
                {/* of {} */}
              </button>
            </li>

            <li
              className={`page-item ${
                collections?.total > collectionsPageNumber * pagesize
                  ? ""
                  : "disabled"
              }`}
            >
              <button
                disabled={collections?.results?.length < pagesize}
                className="page-link"
                aria-label="Next"
                onClick={() => {
                  setCollectionsPageNumber(collectionsPageNumber + 1);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
