import React, { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate, Alert, Spin, Carousel } from "antd";
import { Favorite, LocationOn } from "@mui/icons-material";
import styles from "./room.module.scss";
import CardsList from "../cards-list/cards-list";
import { getOffersForAuth } from "../../store/offers/selector";
import { useGetOfferQuery } from "../../services/apiSlice";
import { APPRoute } from "../../const";
import { CarouselRef } from "antd/es/carousel";
import { getFavoritesObj } from "../../store/users/selector";
import { addToFavoriteFromDetailsPage } from "../../store/users/users";
import { useAppSelector } from "../../app/hooks";

const getAssessmentDescription = (rating: number) => {
  let description = "Excellent";
  if (rating < 2.5) {
    description = "Terrible";
  } else if (rating < 3.5) {
    description = "Poor";
  } else if (rating < 4) {
    description = `Average`;
  } else if (rating < 4.5) {
    description = `Very good`;
  }

  return description;
};

const Room = () => {
  const pageId = Number(useParams().id);
  const {
    data: offer,
    isLoading,
    isSuccess,
  } = useGetOfferQuery(pageId.toString());
  const offers = useSelector(getOffersForAuth).slice(0, 4);
  const carouselRef = useRef<CarouselRef>(null);
  const favorites = useSelector(getFavoritesObj);
  const dispatch = useDispatch();
  const authUser = useAppSelector((state) => state.users.authUser);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (authUser) {
      dispatch(
        addToFavoriteFromDetailsPage({ id: pageId.toString(), ...offer })
      );
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
        <React.Fragment>
          <section>
            <div className={`${styles.container} ${styles.galleryContainer}`}>
              <div className={styles.gallery}>
                <Carousel ref={carouselRef}>
                  {offer.photos.map((photo: string, index: number) => (
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
                      favorites[pageId.toString()]
                        ? styles.bookmarkButtonActive
                        : ""
                    }`}
                    type="button"
                    onClick={handleFavoriteClick}
                  >
                    <Favorite id={styles.favoriteIcon} />
                  </button>
                </div>
                <div className={styles.location}>
                  <LocationOn /> {offer.location.address}
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
                  {offer.price !== 0 && (
                    <div className={styles.price}>
                      <b className={styles.priceValue}>{offer.price}</b>
                      <span className={styles.priceText}>&nbsp;night</span>
                    </div>
                  )}
                </div>
                <div className={styles.inside}>
                  <h2 className={styles.insideTitle}>Room types</h2>
                  <ul className={styles.roomTypes}>
                    {offer.amenities.roomTypes.map((сonvenience: string) => (
                      <li className={styles.roomType} key={сonvenience}>
                        {сonvenience}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.inside}>
                  <h2 className={styles.insideTitle}>Property amenities</h2>
                  <ul className={styles.insideList}>
                    {offer.amenities.hotel
                      .slice(0, 12)
                      .map((сonvenience: string) => (
                        <li className={styles.insideItem} key={сonvenience}>
                          {сonvenience}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className={styles.inside}>
                  <h2 className={styles.insideTitle}>Room amenities</h2>
                  <ul className={styles.insideList}>
                    {offer.amenities.room.map((сonvenience: string) => (
                      <li className={styles.insideItem} key={сonvenience}>
                        {сonvenience}
                      </li>
                    ))}
                  </ul>
                </div>

                <section className={styles.reviews}>
                  <h2 className={styles.reviewsTitle}>Reviews</h2>
                  <ul className={styles.reviewsList}>
                    {offer.reviews.map(
                      (review: {
                        title: string;
                        text: string;
                        publishedDate: string;
                        avatar: string;
                      }) => (
                        <li className={styles.reviewsItem} key={review.title}>
                          <div className={styles.reviewsAvatarWrapper}>
                            <img
                              className={styles.reviewsAvatar}
                              src={review.avatar}
                              width="100"
                              height="100"
                              alt="Reviews avatar"
                            />
                          </div>
                          <div>
                            <h3 className={styles.reviewTitle}>
                              {review.title}
                            </h3>
                            <p className={styles.reviewText}>{review.text}</p>
                            <p className={styles.publishedDate}>
                              {review.publishedDate}
                            </p>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </section>
              </div>
            </div>
          </section>
          {offers.length > 0 && (
            <div className={styles.container}>
              <section className={styles.nearPlaces}>
                <h2 className={styles.nearPlacesTitle}>
                  Other places in the neighbourhood
                </h2>
                <div className={styles.nearPlacesList}>
                  <CardsList offers={offers} />
                </div>
              </section>
            </div>
          )}
        </React.Fragment>
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
