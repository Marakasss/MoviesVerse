import PersonsGrid from "@/components/PersonsGrid/PersonsGrid";
import { fetchPersons } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const PersonsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["persons", 1],
    queryFn: () => fetchPersons(1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PersonsGrid />
    </HydrationBoundary>
  );
};

export default PersonsPage;
