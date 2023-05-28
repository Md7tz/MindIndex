import React from "react";
import styles from "../styles/ListView.module.css";

const ListView = ({ collections, notes }) => {
  return (
    <div className={`m-2 ${styles["list-view-container"]}` }>
      <div className={styles["list-view"]}>
        <table className={styles["list-view-table"]}>
          <thead>
            <tr>
              <th>Collections</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id}>
                <td>{collection.name}</td>
              </tr>
            ))}
            {/* {console.log(`collectoins: ${collections}` )} */}
          </tbody>
        </table>
        <table className={styles["list-view-table"]}>
          <thead>
            <tr>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
