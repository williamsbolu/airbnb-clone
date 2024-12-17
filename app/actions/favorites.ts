"use server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "../libs/getCurrentUser";

export async function addFavorite(listingId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Log in to create a listing.");
  }

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return { success: user };
}

export async function deleteFavorite(listingId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Log in to delete a listing.");
  }

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return { success: user };
}
