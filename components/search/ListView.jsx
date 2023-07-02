import React from "react";
import styles from "../styles/ListView.module.css";
import Basepath from "../Basepath"

const ListView = ({ data, query}) => {
  return (
    <div className={`m-2 border-0 rounded-0 ${styles["list-view-container"]}`}>
      <div className={styles["list-view"]}>
        <table className={styles["list-view-table"]}>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>
                  <a href={Basepath.get(`/search?query=${query}&type=${entry.item.name ? "collections" : "notes"}&page=1`)} className={styles["link-style"]}>
                    <div className={styles["header"]}>
                      {entry.item.name ? entry.item.name : entry.item.title}
                    </div>
                    <div className={styles["subtext"]}>
                      {entry.item.description ? entry.item.description : entry.item.body}
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
