import React from "react";
import styles from "../styles/ListView.module.css";

const ListView = ({ data, urlWithPath }) => {
  return (
    <div className={`m-2 border-0 rounded-0 ${styles["list-view-container"]}`}>
      <div className={styles["list-view"]}>
        <table className={styles["list-view-table"]}>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.merged_id}>
                <td>
                  <a href={`${urlWithPath}`} className={styles["link-style"]}>
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
