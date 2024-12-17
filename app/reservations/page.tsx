import EmptyState from "../components/EmptyState";
import getCurrentUser from "../libs/getCurrentUser";
import { getReservations } from "../data/reservations";
import ReservationsClient from "./ReservationsClient";
import { Suspense } from "react";
import Loader from "../components/Loader";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Suspense>
  );
};

export default ReservationsPage;

// For all the reservations other people have made on a user listings.
