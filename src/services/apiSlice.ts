import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  getTransformedLocation,
  getTransformedOffer,
  getTransformedOffers,
} from "../utils/api";
import { DetailedOffer, OffersbyLocation } from "../types/offers";
import { LocationResponse, OffersServer } from "../types/serverOffers";

interface SearchAll {
  location: string;
  checkIn: string;
  checkOut: string;
}

interface SearchDetailOffer {
  offerId: string;
  checkIn: string;
  checkOut: string;
}

//Без as может возвращаться тип undefined
export const API_KEY = process.env.REACT_APP_API_KEY as string;

export const apiSlice = createApi({
  reducerPath: "offers",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tripadvisor16.p.rapidapi.com/api/v1/hotels",
    timeout: 20000,
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  }),
  endpoints: (builder) => ({
    getOffer: builder.query<DetailedOffer, SearchDetailOffer>({
      query: (offerParams) => ({
        url: "/getHotelDetails",
        params: {
          id: offerParams.offerId,
          checkIn: offerParams.checkIn,
          checkOut: offerParams.checkOut,
          currencyCode: "USD",
        },
      }),
      transformResponse: getTransformedOffer,
    }),
    //ниже большое колличество использования as - взято из примера официальной документации как делать несколько запросов на сервер из одной endPoint.
    // https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#performing-multiple-requests-with-a-single-query
    getAllOffers: builder.query<OffersbyLocation, SearchAll>({
      async queryFn(searchParams, _queryApi, _extraOptions, fetchWithBQ) {
        const locationResponse = await fetchWithBQ({
          url: "/searchLocation",
          params: {
            query: searchParams.location,
          },
        });
        if (locationResponse.error) {
          return { error: locationResponse.error as FetchBaseQueryError };
        }
        const location = getTransformedLocation(
          locationResponse.data as LocationResponse
        );
        const offersServer = await fetchWithBQ({
          url: "/searchHotels",
          params: {
            geoId: location.geoId,
            checkIn: searchParams.checkIn,
            checkOut: searchParams.checkOut,
            currencyCode: "USD",
          },
        });
        if (offersServer.error) {
          return { error: offersServer.error as FetchBaseQueryError };
        }
        const offersResponceData = offersServer.data as OffersServer;
        const offers = getTransformedOffers(offersResponceData);
        return { data: { location, offers } };
      },
    }),
  }),
});

export const { useGetOfferQuery, useGetAllOffersQuery } = apiSlice;
