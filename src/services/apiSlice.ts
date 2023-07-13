import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";

const DATE_FORMAT = "YYYY-MM-DD";

interface Offer {
  photos: string[];
  title: string;
  rating: number;
  numberReviews: number;
  rankingDetails: string;
  price: string;
  reviews: {
    title: string;
    text: string;
    publishedDate: string;
    avatar: string;
  }[];
  location: string;
  status: boolean;
  amenities: { hotel: string[]; room: string[]; roomTypes: string[] };
}

const amenitiesTitle = {
  room: ["Comfort", "Room features", "Kitchen", "Entertainment", "Bath"],
  roomTypes: ["View", "Room types"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTransformedOffer = (response: any): Offer => {
  const newAmenities: { hotel: string[]; room: string[]; roomTypes: string[] } =
    {
      hotel: [],
      room: [],
      roomTypes: [],
    };
  response.data.amenitiesScreen.forEach(
    (element: { title: string; content: string[] }) => {
      if (amenitiesTitle.room.includes(element.title)) {
        newAmenities.room.push(...element.content);
      } else if (amenitiesTitle.roomTypes.includes(element.title)) {
        newAmenities.roomTypes.push(...element.content);
      } else {
        newAmenities.hotel.push(...element.content);
      }
    }
  );

  const adaptedResponce = {
    ...response.data,
    status: response.status,
    price: response.data.price.displayPrice
      ? response.data.price.displayPrice
      : "0",
    photos: response.data.photos
      .filter(
        (photo: { maxHeight: number; maxWidth: number; urlTemplate: string }) =>
          Number(photo.maxHeight) > 500
      )
      .map(
        (photo: { maxHeight: number; maxWidth: number; urlTemplate: string }) =>
          photo.urlTemplate
            .replace(/\{width\}/, "1100")
            .replace(/\{height\}/, "500")
      ),
    rankingDetails: response.data.rankingDetails.replace(/<a>|<\/a>/g, ""),
    amenities: newAmenities,
    reviews: response.data.reviews.content.map(
      (review: {
        title: string;
        text: string;
        bubbleRatingText: string;
        publishedDate: string;
        userProfile: {
          deprecatedContributionCount: string;
          avatar: { maxHeight: number; maxWidth: number; urlTemplate: string };
          photos: string[];
        };
      }) => ({
        title: review.title,
        text: review.text.replace(/<br \/>/g, ""),
        publishedDate: review.publishedDate,
        avatar: review.userProfile.avatar.urlTemplate
          ? review.userProfile.avatar.urlTemplate
              .replace(/\{width\}/, "100")
              .replace(/\{height\}/, "100")
          : "",
      })
    ),
    location: response.data.location.address,
  };

  delete adaptedResponce.restaurantsNearby;
  delete adaptedResponce.qA;
  delete adaptedResponce.attractionsNearby;
  delete adaptedResponce.amenitiesScreen;
  delete adaptedResponce.about;
  delete adaptedResponce.geoPoint;

  return adaptedResponce;
};

export const API_KEY = process.env.REACT_APP_API_KEY as string;

export const apiSlice = createApi({
  reducerPath: "offerDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tripadvisor16.p.rapidapi.com/api/v1/hotels",
    timeout: 20000,
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  }),
  endpoints: (builder) => ({
    getOffer: builder.query({
      query: (offerId: string) => ({
        url: "/getHotelDetails",
        params: {
          id: offerId,
          checkIn: dayjs().format(DATE_FORMAT),
          checkOut: dayjs().add(1, "d").format(DATE_FORMAT),
          currencyCode: "USD",
        },
      }),
      transformResponse: getTransformedOffer,
    }),
  }),
});

export const { useGetOfferQuery } = apiSlice;
