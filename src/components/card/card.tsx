import React from "react";
import { Favorite } from "@mui/icons-material";
import styles from "./card.module.scss";
import { Rate } from "antd";

interface Offer {
  accentedLabel: boolean;
  badge: {
    size: string;
    type: string;
    year: string;
  };
  bubbleRating: {
    count: string;
    rating: number;
  };
  cardPhotos: Array<string>;
  id: string;
  isSponsored: boolean;
  priceForDisplay: string;
  secondaryInfo: null | string;
  title: string;
}

const Card = ({ offer }: { offer: Offer }) => {
  return (
    <article className={styles.card}>
      {offer.badge.type && (
        <div className={styles.mark}>
          <span>{offer.badge.type}</span>
        </div>
      )}
      {offer.isSponsored && (
        <div className={styles.sponsor}>
          <span>Sponsored</span>
        </div>
      )}
      <div className={styles.imageWrapper}>
        <a href="#">
          <img
            className={styles.image}
            src={offer.cardPhotos[0]}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className={styles.info}>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>
            <b className={styles.priceValue}>{offer.priceForDisplay}</b>
            <span className={styles.priceText}>&#47;&nbsp;night</span>
          </div>
          <button className={styles.favoriteButton} type="button">
            <Favorite id={styles.favoriteIcon} />
          </button>
        </div>
        <div className={styles.rating}>
          <Rate allowHalf disabled defaultValue={offer.bubbleRating.rating} />
          <span className={styles.reviews}>
            {offer.bubbleRating.count} reviews
          </span>
        </div>
        <h2 className={styles.cardName}>
          <a href="#">{offer.title}</a>
        </h2>
      </div>
    </article>
  );
};

export default Card;
