import { fetchMovieById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import MoviePreviewClient from "./MoviePreviewClient";

interface MovieDetailsProps {
  params: Promise<{ id: string; type: string }>;
}

const MovieDetails = async ({ params }: MovieDetailsProps) => {
  const { id, type } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(type, id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoviePreviewClient />
    </HydrationBoundary>
  );
};

export default MovieDetails;
