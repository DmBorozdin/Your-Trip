import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const getOffers = (state: RootState) => state.offers;

export const getOffersForAuth = createSelector(
  [
    (state: RootState) => state.offers.offers,
    (state: RootState) => state.users,
  ],
  (offers, users) => {
    const favorites = users.users.find(
      (user) => user.id === users.authUser
    )?.favorites;
    if (favorites && Object.keys(favorites).length > 0) {
      return offers.map((offer) =>
        favorites[offer.id] ? { ...offer, isFavorite: true } : offer
      );
    }
    return offers;
  }
);
