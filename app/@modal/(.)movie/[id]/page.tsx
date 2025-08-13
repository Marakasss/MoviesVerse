import { fetchContentById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import MoviePreviewClient from "./MoviePreviewClient";

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

const MovieDetails = async ({ params }: MovieDetailsProps) => {
  const { id } = await params;
  const type = "movie";
  const queryClient = new QueryClient();
  console.log(`Fetching movie with ID: ${id} and type: ${type}`);

  await queryClient.prefetchQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchContentById(type, id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoviePreviewClient />
    </HydrationBoundary>
  );
};

export default MovieDetails;
