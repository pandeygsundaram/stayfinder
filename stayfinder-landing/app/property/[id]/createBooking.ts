export async function createBooking({
  listingId,
  checkIn,
  checkOut,
  guests,
}: {
  listingId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}) {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify({
      listingId,
      startDate: checkIn.toISOString(),
      endDate: checkOut.toISOString(),
      guests,
    }),
  });

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes.message || "Failed to create booking");
  }

  return res.json();
}