import EmptyState from "../components/EmptyState";
import { getFavoriteListings } from "../data/listings";
import getCurrentUser from "../libs/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <EmptyState
        title="No favorites"
        subtitle="Looks like you have no favorite listings."
      />
    );

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
