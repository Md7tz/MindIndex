import React from "react";
import styles from "../styles/ListView.module.css";

const ListView = ({ collections, notes }) => {
  return (
    <div className={`m-2 ${styles["list-view-container"]}`}>
      <div className={styles["list-view"]}>
        <table className={styles["list-view-table"]}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Content</th> {/* New column for collection description */}
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id}>
                <td>{collection.name}</td>
                <td>{collection.description}</td> {/* Display collection description */}
              </tr>
            ))}
          </tbody>
        </table>
        <table className={styles["list-view-table"]}>
         
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.body}</td> {/* Display note body */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
