import React from "react";
import Card from "../card/card";
// import { Link } from "react-router-dom";
// import { APPRoute } from "../../const";
import { ExpandMore } from "@mui/icons-material";
import styles from "./main.module.scss";

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
              <div className={styles.placesList}>
                <Card />

                <article className="cities__place-card place-card">
                  <div className="cities__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img
                        className="place-card__image"
                        src="img/room.jpg"
                        width="260"
                        height="200"
                        alt="Place image"
                      />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;80</b>
                        <span className="place-card__price-text">
                          &#47;&nbsp;night
                        </span>
                      </div>
                      <button
                        className="place-card__bookmark-button place-card__bookmark-button--active button"
                        type="button"
                      >
                        <svg
                          className="place-card__bookmark-icon"
                          width="18"
                          height="19"
                        >
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `80%` }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">Wood and stone place</a>
                    </h2>
                    <p className="place-card__type">Private room</p>
                  </div>
                </article>

                <article className="cities__place-card place-card">
                  <div className="cities__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img
                        className="place-card__image"
                        src="img/apartment-02.jpg"
                        width="260"
                        height="200"
                        alt="Place image"
                      />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;132</b>
                        <span className="place-card__price-text">
                          &#47;&nbsp;night
                        </span>
                      </div>
                      <button
                        className="place-card__bookmark-button button"
                        type="button"
                      >
                        <svg
                          className="place-card__bookmark-icon"
                          width="18"
                          height="19"
                        >
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `80%` }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">Canal View Prinsengracht</a>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>

                <article className="cities__place-card place-card">
                  <div className="place-card__mark">
                    <span>Premium</span>
                  </div>
                  <div className="cities__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img
                        className="place-card__image"
                        src="img/apartment-03.jpg"
                        width="260"
                        height="200"
                        alt="Place image"
                      />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;180</b>
                        <span className="place-card__price-text">
                          &#47;&nbsp;night
                        </span>
                      </div>
                      <button
                        className="place-card__bookmark-button button"
                        type="button"
                      >
                        <svg
                          className="place-card__bookmark-icon"
                          width="18"
                          height="19"
                        >
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `100%` }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">Nice, cozy, warm big bed apartment</a>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>

                <article className="cities__place-card place-card">
                  <div className="cities__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img
                        className="place-card__image"
                        src="img/room.jpg"
                        width="260"
                        height="200"
                        alt="Place image"
                      />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;80</b>
                        <span className="place-card__price-text">
                          &#47;&nbsp;night
                        </span>
                      </div>
                      <button
                        className="place-card__bookmark-button place-card__bookmark-button--active button"
                        type="button"
                      >
                        <svg
                          className="place-card__bookmark-icon"
                          width="18"
                          height="19"
                        >
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `80%` }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">Wood and stone place</a>
                    </h2>
                    <p className="place-card__type">Private room</p>
                  </div>
                </article>
              </div>
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
