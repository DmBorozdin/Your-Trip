import { Favorite } from "@mui/icons-material";
import styles from "./card.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../../store/users/users";
import { APPRoute } from "../../const";
import { useAppSelector } from "../../hooks/redux";
import { getAuthUserId } from "../../store/users/selector";
import PropTypes from "prop-types";
import { makeOfferUrl } from "../../utils/api";
import useHistory from "../../hooks/use-history";
import { Offer } from "../../types/offers";
import { deleteFirstNumber } from "../../utils/card";

const Card = ({
  offer,
  checkIn,
  checkOut,
}: {
  offer: Offer;
  checkIn: string;
  checkOut: string;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector(getAuthUserId);
  const url = makeOfferUrl(offer.id, checkIn, checkOut);
  const { addHistoryItem } = useHistory();

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

  const handleCardClick = () =>
    addHistoryItem(deleteFirstNumber(offer.title), url);

  return (
    <article className={styles.card}>
      {offer.badge && (
        <div className={styles.mark}>
          <span>{offer.badge}</span>
        </div>
      )}
      {offer.isSponsored && (
        <div className={styles.sponsor}>
          <span>Sponsored</span>
        </div>
      )}
      <div className={styles.imageWrapper}>
        <Link to={url}>
          <img
            className={styles.image}
            src={offer.cardPhotos[0]}
            width="260"
            height="200"
            alt="Place image"
            onClick={handleCardClick}
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
        <h2 className={styles.cardName} onClick={handleCardClick}>
          <Link to={url}>{offer.title}</Link>
        </h2>
      </div>
    </article>
  );
};

Card.propTypes = {
  offer: PropTypes.shape({
    badge: PropTypes.string.isRequired,
    bubbleRating: PropTypes.shape({
      count: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }).isRequired,
    cardPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    isSponsored: PropTypes.bool.isRequired,
    priceForDisplay: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
};

export default Card;
