import { useContext } from "react";
import styles from "./reviews.module.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { ReviewsContext } from "../room/room";

const Reviews = () => {
  const reviews = useContext(ReviewsContext);
  return (
    <section className={styles.reviews}>
      <h2 className={styles.reviewsTitle}>Reviews</h2>
      <ul className={styles.reviewsList}>
        {reviews.map((review) => (
          <li className={styles.reviewsItem} key={review.title}>
            <div className={styles.reviewsAvatarWrapper}>
              {review.avatar && (
                <img
                  className={styles.reviewsAvatar}
                  src={review.avatar}
                  width="100"
                  height="100"
                  alt="Reviews avatar"
                />
              )}
              {!review.avatar && (
                <PersonOutlineIcon
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%",
                    border: "1px solid",
                  }}
                />
              )}
            </div>
            <div>
              <h3 className={styles.reviewTitle}>{review.title}</h3>
              <p className={styles.reviewText}>{review.text}</p>
              <p className={styles.publishedDate}>{review.publishedDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reviews;
