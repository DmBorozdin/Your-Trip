import React from "react";
import styles from "./card.module.scss";

const Card = () => {
  return (
    <article className={styles.card}>
      <div className={styles.mark}>
        <span>Premium</span>
      </div>
      <div className={styles.imageWrapper}>
        <a href="#">
          <img
            className={styles.image}
            src="img/apartment-01.jpg"
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className={styles.info}>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>
            <b className={styles.priceValue}>&euro;120</b>
            <span className={styles.priceText}>&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
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
          <a href="#">Beautiful &amp; luxurious apartment at great location</a>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
};

export default Card;
