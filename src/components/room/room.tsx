import React, { useRef } from "react";
import styles from "./room.module.scss";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate, Alert, Spin, Carousel } from "antd";
import { Favorite, LocationOn } from "@mui/icons-material";
import Reviews from "../reviews/reviews";
import Amenities from "../amenities/amenities";
import { useGetOfferQuery } from "../../services/apiSlice";
import { APPRoute } from "../../const";
import { CarouselRef } from "antd/es/carousel";
import { getAuthUserId, getFavoritesObj } from "../../store/users/selector";
import { addToFavoriteFromDetailsPage } from "../../store/users/users";
import { useAppSelector } from "../../hooks/redux";
import { getAssessmentDescription } from "../../utils/room";
import { Review } from "../../types/offers";

export const ReviewsContext = React.createContext<Review[]>([]);

const Room = () => {
  const pageId = useParams()?.id || "";
  const [searchParams] = useSearchParams();
  const params = {
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
  };
  const {
    data: offer,
    isLoading,
    isSuccess,
  } = useGetOfferQuery({ offerId: pageId, ...params });
  const carouselRef = useRef<CarouselRef>(null);
  const favorites = useSelector(getFavoritesObj);
  const dispatch = useDispatch();
  const authUser = useAppSelector(getAuthUserId);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (authUser) {
      dispatch(addToFavoriteFromDetailsPage({ id: pageId, ...offer }));
    } else {
      navigate(APPRoute.LOGIN);
    }
  };

  return (
    <main className={styles.main}>
      {isLoading && (
        <div className={styles.preloaderContainer}>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
      {isSuccess && offer.status && (
        <section>
          <div className={`${styles.container} ${styles.galleryContainer}`}>
            <div className={styles.gallery}>
              <Carousel ref={carouselRef}>
                {offer.photos.map((photo, index) => (
                  <div key={photo}>
                    <img
                      src={photo}
                      alt={`Room photo ${index}`}
                      className={styles.image}
                      onClick={() => carouselRef.current?.next()}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className={`${styles.container} ${styles.propertyContainer}`}>
            <div className={styles.wrapper}>
              <div className={styles.nameContainer}>
                <h1 className={styles.name}>{offer.title}</h1>
                <button
                  className={`${styles.bookmarkButton} ${
                    favorites[pageId] ? styles.bookmarkButtonActive : ""
                  }`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <Favorite id={styles.favoriteIcon} />
                </button>
              </div>
              <div className={styles.location}>
                <LocationOn /> {offer.location}
              </div>
              <div className={styles.ratingPriceContainer}>
                <div className={styles.rating}>
                  <span className={styles.ratingValue}>{offer.rating}</span>
                  <div className={styles.ratingContainer}>
                    <span>{getAssessmentDescription(offer.rating)}</span>
                    <Rate allowHalf disabled defaultValue={offer.rating} />
                  </div>

                  <span className={styles.ratingReviews}>
                    {offer.numberReviews} reviews
                  </span>
                </div>
                {offer.price !== "0" && (
                  <div className={styles.price}>
                    <b className={styles.priceValue}>{offer.price}</b>
                    <span className={styles.priceText}>&nbsp;night</span>
                  </div>
                )}
              </div>
              {offer.amenities.roomTypes.length > 0 && (
                <div className={styles.inside}>
                  <h2 className={styles.insideTitle}>Room types</h2>
                  <ul className={styles.roomTypes}>
                    {offer.amenities.roomTypes.map((сonvenience) => (
                      <li className={styles.roomType} key={сonvenience}>
                        {сonvenience}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {offer.amenities.hotel.length > 0 && (
                <Amenities
                  amenities={offer.amenities.hotel.slice(0, 12)}
                  amenitiesTitle="Property amenities"
                />
              )}
              {offer.amenities.room.length > 0 && (
                <Amenities
                  amenities={offer.amenities.room}
                  amenitiesTitle="Room amenities"
                />
              )}
              {offer.reviews.length > 0 && (
                <ReviewsContext.Provider value={offer.reviews}>
                  <Reviews />
                </ReviewsContext.Provider>
              )}
            </div>
          </div>
        </section>
      )}
      {isSuccess && !offer.status && (
        <div className={styles.alertContainer}>
          <Alert type="error" message="Loading error" showIcon closable />
          <Link to={APPRoute.MAIN}>
            <div className={styles.homeLink}>Go to the home page</div>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Room;
