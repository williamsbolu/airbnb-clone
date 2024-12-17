"use server";

import getCurrentUser from "../libs/getCurrentUser";
import prisma from "@/app/libs/prismadb";

type CreateReservationProps = {
  totalPrice: number;
  startDate: Date;
  endDate: Date;
  listingId: string;
};

export async function createReservation({
  totalPrice,
  startDate,
  endDate,
  listingId,
}: CreateReservationProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("You must be logged in to create a reservation.");
  }

  if (!totalPrice || !startDate || !endDate || !listingId) {
    throw new Error("Missing required fields.");
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return listingAndReservation;
}

export async function deleteReservation(reservationId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "You must be logged in to create a reservation." };
  }

  if (!reservationId || typeof reservationId !== "string") {
    return { error: "Invalid ID" };
  }

  // We ensure the only people able to delete a reservation is the "creator" of the reservation, or the creator of the listing "The owner of the property".
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return { success: reservation };
}
