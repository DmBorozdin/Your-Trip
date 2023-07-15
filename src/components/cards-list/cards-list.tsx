import Card from "../card/card";
import styles from "./cards-list.module.scss";

interface Offer {
  badge: string;
  bubbleRating: {
    count: string;
    rating: number;
  };
  cardPhotos: Array<string>;
  id: string;
  isSponsored: boolean;
  priceForDisplay: string;
  title: string;
  isFavorite: boolean;
}

const CardsList = ({
  offers,
  checkIn,
  checkOut,
}: {
  offers: Array<Offer>;
  checkIn: string;
  checkOut: string;
}) => {
  return (
    <div className={styles.list}>
      {offers.map((offer) => (
        <Card
          offer={offer}
          key={offer.title}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      ))}
    </div>
  );
};

export default CardsList;
