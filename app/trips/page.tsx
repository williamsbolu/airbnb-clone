import EmptyState from "../components/EmptyState";
// import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../libs/getCurrentUser";
import { getReservations } from "../data/reservations";
import TripsClient from "./TripsClient";
import { Suspense } from "react";
import Loader from "../components/Loader";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (!reservations.length) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips."
      />
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </Suspense>
  );
};

export default TripsPage;
