import React from "react";
import Card from "../card/card";
import styles from "./cards-list.module.scss";

interface Room {
  price: number;
  name: string;
  type: string;
  rating: number;
  isMark: boolean;
  src: string;
}

const CardsList = ({ rooms }: { rooms: Room[] }) => {
  return (
    <div className={styles.list}>
      {rooms.map((room: Room, index) => (
        <Card room={room} key={`${room.name}${index}`} />
      ))}
    </div>
  );
};

export default CardsList;
