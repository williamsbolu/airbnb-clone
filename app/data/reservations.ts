import prisma from "@/app/libs/prismadb";

interface GetReservationProps {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export async function getReservations({
  authorId,
  listingId,
  userId,
}: GetReservationProps) {
  try {
    const query: any = {};

    if (listingId) query.listingId = listingId;

    if (userId) query.userId = userId;

    // Reservations that other users made for our listings
    if (authorId) query.listing = { userId: authorId };

    const reservations = await prisma.reservation.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        listing: true,
      },
    });

    return reservations;
  } catch (err) {
    throw new Error("Failed to fetch reservations.");
  }
}
