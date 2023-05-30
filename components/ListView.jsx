import React from "react";
import styles from "../styles/ListView.module.css";

const ListView = ({ data }) => {
  return (
    <div className={`m-2 ${styles["list-view-container"]}`}>
      <div className={styles["list-view"]}>
        <table className={styles["list-view-table"]}>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.merged_id}>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </td>
                <td>
                  <a
                    href={`${entry.type}/${entry.id}`}
                    className={styles["link-style"]}
                  >
                    <div className={styles["header"]}>
                      {entry.name ? entry.name : entry.title}
                    </div>
                    <div className={styles["subtext"]}>
                      {entry.description ? entry.description : entry.body}
                    </div>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
