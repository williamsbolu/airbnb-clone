"use server";

import { FieldValues } from "react-hook-form";
import getCurrentUser from "../libs/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function createListing(data: FieldValues) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return { error: "Log in to create a listing." };

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = data;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return { success: "Listing created!", data: listing };
}

export async function deleteListing(listingId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return { error: "Log in to delete a listing." };

  const listing = await prisma.listing.delete({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return { success: "Listing deleted!", data: listing };
}
