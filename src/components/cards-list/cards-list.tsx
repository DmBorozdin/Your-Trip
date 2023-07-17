import { Offer } from "../../types/offers";
import Card from "../card/card";
import styles from "./cards-list.module.scss";

const CardsList = ({
  offers,
  checkIn,
  checkOut,
}: {
  offers: Offer[];
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
