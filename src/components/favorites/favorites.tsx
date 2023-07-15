import React from "react";
import CardsList from "../cards-list/cards-list";
import styles from "./favorites.module.scss";
import { useSelector } from "react-redux";
import { getFavorites } from "../../store/users/selector";
import dayjs from "dayjs";

const DATE_FORMAT = "YYYY-MM-DD";

const Favorites = () => {
  const favorites = useSelector(getFavorites);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.favorites}>
          {favorites.length > 0 && (
            <React.Fragment>
              <h1 className={styles.title}>Saved listing</h1>
              <CardsList
                offers={favorites}
                checkIn={dayjs().add(1, "d").format(DATE_FORMAT)}
                checkOut={dayjs().add(2, "d").format(DATE_FORMAT)}
              />
            </React.Fragment>
          )}
          {favorites.length === 0 && (
            <div className={styles.statusWrapper}>
              <b className={styles.status}>Nothing yet saved.</b>
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

export default Favorites;
