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
                  <a href={`${entry.type}/${entry.id}`} className={styles["link-style"]}>
                    {entry.name ? entry.name : entry.title}
                  </a>
                </td>
                <td>
                  <a href={`${entry.type}/${entry.id}`} className={styles["link-style"]}>
                    {entry.description ? entry.description : entry.body}
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
