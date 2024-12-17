"use client";

import { useRouter } from "next/navigation";
import { Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState, useTransition } from "react";
import { deleteReservation } from "../actions/reservations";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { ReservationPropsType } from "../types";

interface TripsClientProps {
  reservations: ReservationPropsType[];
  currentUser: User | null;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [isPending, startTransition] = useTransition();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      startTransition(() => {
        deleteReservation(id)
          .then((data) => {
            if (data.success) {
              toast.success("Reservation cancelled");
              router.refresh();
            }
            if (data.error) {
              toast.error(data.error);
            }
          })
          .catch((err) => {
            toast.error("Something went wrong");
          })
          .finally(() => {
            setDeletingId("");
          });
      });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={isPending && deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
