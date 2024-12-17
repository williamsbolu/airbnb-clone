import EmptyState from "../components/EmptyState";
// import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../libs/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import { getListing } from "../data/listings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListing({ userId: currentUser.id });

  if (!listings.length) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
