import React from "react";
import { Favorite } from "@mui/icons-material";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../../store/users/users";
import { APPRoute } from "../../const";

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
  isFavorite: boolean;
}

const deleteFirstNumber = (str: string) => {
  if (Number(str[0])) {
    return str.split(" ").slice(1).join(" ");
  }
  return str;
};

const Card = ({ offer }: { offer: Offer }) => {
  const dispatch = useDispatch();
  const handleFavoriteClick = () => {
    dispatch(
      addToFavorite({
        ...offer,
        title: deleteFirstNumber(offer.title),
        isSponsored: false,
        isFavorite: true,
      })
    );
  };

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
        <Link to={`${APPRoute.ROOM}/${offer.id}`}>
          <img
            className={styles.image}
            src={offer.cardPhotos[0]}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>
            <b className={styles.priceValue}>{offer.priceForDisplay}</b>
            <span className={styles.priceText}>&#47;&nbsp;night</span>
          </div>
          <button
            className={`${styles.favoriteButton} ${
              offer.isFavorite ? styles.favoriteButtonActive : ""
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
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
          <Link to={`${APPRoute.ROOM}/${offer.id}`}>{offer.title}</Link>
        </h2>
      </div>
    </article>
  );
};

export default Card;
