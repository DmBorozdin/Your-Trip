import { OffersbyLocation } from "../../services/apiSlice";
import { Favorites } from "../users/users";

export const getOffersForAuth = (
  favorites: Favorites,
  data: OffersbyLocation | undefined
) => {
  if (!data) {
    return [];
  }
  const offers = data.offers.offers;

  if (Object.keys(favorites).length > 0) {
    return offers.map((offer) =>
      favorites[offer.id] ? { ...offer, isFavorite: true } : offer
    );
  }
  return offers;
};
