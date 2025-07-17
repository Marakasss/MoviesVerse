import { fetchMovieById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import MovieDetailsClient from "./MovieDetails.client";

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

const MovieDetails = async ({ params }: MovieDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieDetailsClient />
    </HydrationBoundary>
  );
};

export default MovieDetails;
