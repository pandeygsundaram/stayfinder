import type { Listing, Image, User, Booking } from '../../generated/prisma';

type Msg = { msg: string };

export type ListingWithImages = Listing & {
  images: Image[];
};

export type ListingWithUser = Listing & {
  user: User;
  images: Image[];

  bookings: Booking[]
};

export type ListingFull = Listing & {
  images: Image[];
  user: User;

};

export type ListingsResponse = ListingFull[];
export type SingleListingResponse = ListingWithUser | Msg;
export type CreateListingResponse = ListingWithImages | Msg;
