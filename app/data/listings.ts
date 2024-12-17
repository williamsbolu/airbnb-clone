import prisma from "@/app/libs/prismadb";
import getCurrentUser from "../libs/getCurrentUser";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export async function getListing(params: IListingParams) {
  try {
    const {
      userId,
      roomCount,
      bathroomCount,
      guestCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (locationValue) query.locationValue = locationValue;
    // we filter out all listings which have a reservation in our desired date range: (Meaning we filter out properties which have already been booked within that given time frame selected by the use)
    if (startDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to get listing");
  }
}

export async function getListingById(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (err) {
    throw new Error("Failed to get listing");
  }
}

export async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    // The where clause checks if the id of a listing is in the list of IDs stored in currentUser.favoriteIds
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (error) {
    throw new Error("Failed to get favorite listings");
  }
}
