import React from "react";
import CardsList from "../cards-list/cards-list";
// import { Link } from "react-router-dom";
// import { APPRoute } from "../../const";
import { ExpandMore } from "@mui/icons-material";
import styles from "./main.module.scss";

const mockData = [
  {
    price: 120,
    name: "Beautiful &amp; luxurious apartment at great location",
    type: "Apartment",
    rating: 5,
    isMark: true,
    src: "img/apartment-01.jpg",
  },
  {
    price: 80,
    name: "Wood and stone place",
    type: "Private room",
    rating: 4,
    isMark: false,
    src: "img/apartment-04.jpg",
  },
  {
    price: 132,
    name: "Canal View Prinsengracht",
    type: "Apartment",
    rating: 4,
    isMark: false,
    src: "img/apartment-02.jpg",
  },
  {
    price: 180,
    name: "Nice, cozy, warm big bed apartment",
    type: "Apartment",
    rating: 5,
    isMark: true,
    src: "img/apartment-03.jpg",
  },
  {
    price: 80,
    name: "Wood and stone place",
    type: "Private room",
    rating: 5,
    isMark: false,
    src: "img/apartment-04.jpg",
  },
];

const Main = () => {
  return (
    <React.Fragment>
      <main className={styles.main}>
        <div>
          <section className={styles.container}>
            <ul className={styles.locationsList}>
              <li className={styles.locationsItem}>
                <a className={styles.locationsItemLink} href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className={styles.locationsItem}>
                <a className={styles.locationsItemLink} href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className={styles.locationsItem}>
                <a className={styles.locationsItemLink} href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className={styles.locationsItem}>
                <a
                  className={`${styles.locationsItemLink} ${styles.locationsItemLinkActive}`}
                >
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className={styles.locationsItem}>
                <a className={styles.locationsItemLink} href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className={styles.locationsItem}>
                <a className={styles.locationsItemLink} href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className={styles.cities}>
          <div className={`${styles.placesContainer} ${styles.container}`}>
            <section className={styles.places}>
              <b className={styles.placesFound}>
                312 places to stay in Amsterdam
              </b>
              <form className={styles.sorting} action="#" method="get">
                <span className={styles.sortingCaption}>Sort by</span>
                <span className={styles.sortingType} tabIndex={0}>
                  Popular
                  <ExpandMore className={styles.sortingArrow} />
                </span>
                <ul className={styles.options}>
                  <li
                    className={`${styles.option} ${styles.optionActive}`}
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className={`${styles.option}`} tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className={`${styles.option}`} tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className={`${styles.option}`} tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <CardsList rooms={mockData} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Main;
