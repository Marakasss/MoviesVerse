import { fetchPersonDetails } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import PersonDetailsClient from "./PersonDetails.client";

interface PersonDetailsProps {
  params: Promise<{ id: string }>;
}

const PersonDetails = async ({ params }: PersonDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["personDetails", id],
    queryFn: () => fetchPersonDetails(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PersonDetailsClient />
    </HydrationBoundary>
  );
};

export default PersonDetails;
