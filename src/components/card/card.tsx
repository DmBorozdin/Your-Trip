import React from "react";
import { Bookmark } from "@mui/icons-material";
import styles from "./card.module.scss";

interface Room {
  room: {
    price: number;
    name: string;
    type: string;
    rating: number;
    isMark: boolean;
    src: string;
  };
}

const Card = ({ room }: Room) => {
  return (
    <article className={styles.card}>
      {room.isMark && (
        <div className={styles.mark}>
          <span>Premium</span>
        </div>
      )}
      <div className={styles.imageWrapper}>
        <a href="#">
          <img
            className={styles.image}
            src={room.src}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className={styles.info}>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>
            <b className={styles.priceValue}>&euro;{room.price}</b>
            <span className={styles.priceText}>&#47;&nbsp;night</span>
          </div>
          <button className={styles.bookmarkButton} type="button">
            <Bookmark id={styles.bookmarkIcon} />
          </button>
        </div>
        <div className={styles.rating}>
          <div className={styles.stars}>
            <span></span>
          </div>
        </div>
        <h2 className={styles.cardName}>
          <a href="#">{room.name}</a>
        </h2>
        <p className={styles.cardType}>{room.type}</p>
      </div>
    </article>
  );
};

export default Card;
