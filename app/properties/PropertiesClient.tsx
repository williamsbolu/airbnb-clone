"use client";

import { useRouter } from "next/navigation";
import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { deleteListing } from "../actions/listings";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser: User | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [isPending, startTransition] = useTransition();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      startTransition(() => {
        deleteListing(id)
          .then((data) => {
            if (data.success) {
              toast.success("Listing deleted");
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={isPending && deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
