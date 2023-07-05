import { createSlice } from "@reduxjs/toolkit";

interface OFFERS {
  offers: Array<{
    price: number;
    name: string;
    type: string;
    rating: number;
    isMark: boolean;
    src: string;
  }>;
}

const initialState: OFFERS = {
  offers: [
    {
      price: 120,
      name: "Beautiful &amp; luxurious apartment at great location",
      type: "Apartment",
      rating: 5,
      isMark: true,
      src: "img/apartment-01.jpg",
    },
    {
      price: 80,
      name: "Wood and stone place",
      type: "Private room",
      rating: 4,
      isMark: false,
      src: "img/apartment-04.jpg",
    },
    {
      price: 132,
      name: "Canal View Prinsengracht",
      type: "Apartment",
      rating: 4,
      isMark: false,
      src: "img/apartment-02.jpg",
    },
    {
      price: 180,
      name: "Nice, cozy, warm big bed apartment",
      type: "Apartment",
      rating: 5,
      isMark: true,
      src: "img/apartment-03.jpg",
    },
    {
      price: 80,
      name: "Wood and stone place",
      type: "Private room",
      rating: 5,
      isMark: false,
      src: "img/apartment-04.jpg",
    },
  ],
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    loadOffers(state, action) {
      state.offers = action.payload;
    },
  },
});

export const { loadOffers } = offersSlice.actions;

export default offersSlice.reducer;
