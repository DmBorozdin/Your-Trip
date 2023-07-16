import { useSelector } from "react-redux";
import { getHistory } from "../../store/users/selector";
import styles from "./history.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import useHistory from "../../hooks/use-history";

const History = () => {
  const history = useSelector(getHistory);
  const { resetHistory } = useHistory();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.history}>
          {history.length > 0 && (
            <React.Fragment>
              <h1 className={styles.title}>Visited list</h1>
              <ul className={styles.historyList}>
                {history.map((historyItem, index) => (
                  <Link to={historyItem.url} key={index}>
                    <li className={styles.historyItem}>
                      {`${index + 1}. ${historyItem.title}`}
                    </li>
                  </Link>
                ))}
              </ul>
              <button onClick={resetHistory} className={styles.resetButton}>
                Reset history
              </button>
            </React.Fragment>
          )}
          {history.length === 0 && (
            <div className={styles.statusWrapper}>
              <b className={styles.status}>Nothing yet visited.</b>
              <p className={styles.statusDescription}>
                Plan future trips and add your favorite hotels.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default History;
