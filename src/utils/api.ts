import { APPRoute, DATE_FORMAT } from "../const";
import dayjs from "dayjs";
import { Amenities, Offer } from "../types/offers";
import {
  DetailedOfferServer,
  LocationResponse,
  OffersServer,
} from "../types/serverOffers";

const photoSize = {
  offer: {
    width: "1100",
    height: "500",
    minHeight: 500,
  },
  avatar: {
    width: "100",
    height: "100",
  },
  card: {
    width: "300",
    height: "200",
  },
};

const amenitiesTitle = {
  room: ["Comfort", "Room features", "Kitchen", "Entertainment", "Bath"],
  roomTypes: ["View", "Room types"],
};

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

export const getTransformedOffers = (offersResponse: OffersServer) => {
  const transformedOffers = offersResponse.data.data.map((hotel) => ({
    badge: hotel.badge.type || "",
    bubbleRating: {
      count: hotel.bubbleRating.count || "",
      rating: hotel.bubbleRating.rating || 0,
    },
    cardPhotos: hotel.cardPhotos.map((photo) =>
      photo.sizes.urlTemplate
        .replace(/\{width\}/, photoSize.card.width)
        .replace(/\{height\}/, photoSize.card.height)
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

export const getTransformedOffer = (response: DetailedOfferServer) => {
  const newAmenities: Amenities = {
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

  return {
    photos: response.data.photos
      .filter((photo) => Number(photo.maxHeight) > photoSize.offer.minHeight)
      .map((photo) =>
        formatPhotoUrl(
          photo.urlTemplate,
          photoSize.offer.width,
          photoSize.offer.height
        )
      ),
    title: response.data.title || "",
    rating: response.data.rating || 0,
    numberReviews: response.data.numberReviews || 0,
    rankingDetails: response.data.rankingDetails
      ? response.data.rankingDetails.replace(/<a>|<\/a>/g, "")
      : "",
    price: response.data.price.displayPrice || "0",
    reviews: response.data.reviews.content.map((review) => ({
      title: review.title || "",
      text: review.text ? review.text.replace(/<br \/>/g, "") : "",
      publishedDate: review.publishedDate || "",
      avatar: review.userProfile.avatar.urlTemplate
        ? formatPhotoUrl(
            review.userProfile.avatar.urlTemplate,
            photoSize.avatar.width,
            photoSize.avatar.height
          )
        : "",
    })),
    location: response.data.location.address || "",
    status: response.status,
    amenities: newAmenities,
  };
};
