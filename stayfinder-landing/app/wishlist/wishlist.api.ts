import { getAuthHeaders } from "@/lib/getAuthHeaders";

const API_BASE = "/api/wishlist"; // assuming this goes through Next.js route that proxies to backend

export const fetchWishlist = async () => {
  const res = await fetch(API_BASE, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch wishlist");

  return res.json();
};

export const addToWishlist = async (listingId: number) => {
  const res = await fetch(`${API_BASE}/${listingId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Failed to add to wishlist");

  return res.json();
};

export const removeFromWishlist = async (listingId: number) => {
  const res = await fetch(`${API_BASE}/${listingId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to remove from wishlist");

  return res.json();
};

export const toggleWishlist = async (listingId: number, isWishlisted: boolean) => {
  return isWishlisted
    ? await removeFromWishlist(listingId)
    : await addToWishlist(listingId);
};
