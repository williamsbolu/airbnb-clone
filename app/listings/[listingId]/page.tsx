import EmptyState from "@/app/components/EmptyState";
import { getListingById } from "@/app/data/listings";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/libs/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservations } from "@/app/data/reservations";

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const listing = await getListingById(params.listingId);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    // <ClientOnly>
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
    // </ClientOnly>
  );
};

export default ListingPage;
