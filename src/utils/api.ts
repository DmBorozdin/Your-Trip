import { APPRoute, DATE_FORMAT } from "../const";
import { LocationResponse, OffersResponce, Offer } from "../services/apiSlice";
import dayjs from "dayjs";

export const formatPhotoUrl = (
  url: string,
  newWidth: string,
  newHeight: string
) => url.replace(/\{width\}/, newWidth).replace(/\{height\}/, newHeight);

export const makeLocationUrl = (
  location: string,
  checkIn: dayjs.Dayjs,
  checkOut: dayjs.Dayjs
): string =>
  `${APPRoute.SEARCH}?location=${location}&checkIn=${checkIn.format(
    DATE_FORMAT
  )}&checkOut=${checkOut.format(DATE_FORMAT)}`;

export const makeOfferUrl = (
  offerId: string,
  checkIn: string,
  checkOut: string
): string =>
  `${APPRoute.ROOM}/${offerId}?checkIn=${checkIn}&checkOut=${checkOut}`;

export const getTransformedLocation = (location: LocationResponse) => ({
  title: location.data[0].title.replace(/<b>|<\/b>/g, ""),
  geoId: location.data[0].geoId.split(";")[1],
  status: location.status,
});

export const getTransformedTotalOffers = (totalOffers: string) => {
  return totalOffers.replace(",", "").split(" ").slice(0, 3).join(" ");
};

export const getTransformedOffers = (offersResponse: OffersResponce) => {
  const transformedOffers = offersResponse.data.data.map((hotel) => ({
    badge: hotel.badge.type || "",
    bubbleRating: {
      count: hotel.bubbleRating.count || "",
      rating: hotel.bubbleRating.rating || 0,
    },
    cardPhotos: hotel.cardPhotos.map((photo) =>
      photo.sizes.urlTemplate
        .replace(/\{width\}/, "300")
        .replace(/\{height\}/, "200")
    ),
    id: hotel.id,
    isSponsored: hotel.isSponsored,
    priceForDisplay: hotel.priceForDisplay || "",
    title: hotel.title,
    isFavorite: false,
  }));
  const filteredOffers = transformedOffers.reduce((newArr: Offer[], offer) => {
    if (!newArr.find((newArrOffer) => newArrOffer.title === offer.title)) {
      newArr.push(offer);
    }
    return newArr;
  }, []);

  return {
    status: offersResponse.status,
    offers: filteredOffers,
    totalOffers: getTransformedTotalOffers(offersResponse.data.sortDisclaimer),
  };
};
