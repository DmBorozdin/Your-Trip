import React from "react";
import { Favorite } from "@mui/icons-material";
import styles from "./card.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../../store/users/users";
import { APPRoute } from "../../const";
import { useAppSelector } from "../../app/hooks";
import { getAuthUser } from "../../store/users/selector";
import PropTypes from "prop-types";

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
  const navigate = useNavigate();
  const authUser = useAppSelector(getAuthUser);

  const handleFavoriteClick = () => {
    if (authUser) {
      dispatch(
        addToFavorite({
          ...offer,
          title: deleteFirstNumber(offer.title),
          isSponsored: false,
          isFavorite: true,
        })
      );
    } else {
      navigate(APPRoute.LOGIN);
    }
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

Card.propTypes = {
  offer: PropTypes.shape({
    accentedLabel: PropTypes.bool,
    badge: PropTypes.shape({
      size: PropTypes.string,
      type: PropTypes.string,
      year: PropTypes.string,
    }).isRequired,
    bubbleRating: PropTypes.shape({
      count: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }).isRequired,
    cardPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    isSponsored: PropTypes.bool.isRequired,
    priceForDisplay: PropTypes.string.isRequired,
    secondaryInfo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
};

export default Card;
