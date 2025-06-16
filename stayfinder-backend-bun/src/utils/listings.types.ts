import type { Listing, Image, User } from '../../generated/prisma';

type Msg = { msg: string };

export type ListingWithImages = Listing & {
  images: Image[];
};

export type ListingWithUser = Listing & {
  user: User;
};

export type ListingFull = Listing & {
  images: Image[];
  user: User;
};

export type ListingsResponse = ListingFull[];
export type SingleListingResponse = ListingFull | Msg;
export type CreateListingResponse = ListingWithImages | Msg;
