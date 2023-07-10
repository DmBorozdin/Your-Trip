import React from "react";
import Card from "../card/card";
import styles from "./cards-list.module.scss";

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

const CardsList = ({ offers }: { offers: Array<Offer> }) => {
  return (
    <div className={styles.list}>
      {offers.map((offer) => (
        <Card offer={offer} key={offer.title} />
      ))}
    </div>
  );
};

export default CardsList;
