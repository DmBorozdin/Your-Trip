import React from "react";
import styles from "./amenities.module.scss";
import PropTypes from "prop-types";

const Amenities = ({
  amenities,
  amenitiesTitle,
}: {
  amenities: string[];
  amenitiesTitle: string;
}) => {
  return (
    <div className={styles.inside}>
      <h2 className={styles.insideTitle}>{amenitiesTitle}</h2>
      <ul className={styles.insideList}>
        {amenities.map((сonvenience) => (
          <li className={styles.insideItem} key={сonvenience}>
            {сonvenience}
          </li>
        ))}
      </ul>
    </div>
  );
};

Amenities.propTypes = {
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  amenitiesTitle: PropTypes.string.isRequired,
};

export default Amenities;
