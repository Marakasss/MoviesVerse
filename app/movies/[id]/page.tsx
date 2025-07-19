import { fetchMovieById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import MovieDetailsClient from "./MovieDetails.client";
import { Metadata } from "next";

//Types--------------------------------------

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

//Metadata--------------------------------------

export const generateMetadata = async ({
  params,
}: MovieDetailsProps): Promise<Metadata> => {
  const { id } = await params;
  const movie = await fetchMovieById(id);
  const title = movie?.title || "Movie Details | MoviesVerse";
  const description =
    movie?.overview?.length > 0
      ? movie.overview.slice(0, 60) + "..."
      : "Discover detailed information about this movie on MoviesVerse.";
  const imgUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
    : movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
    : "https://movies-verse-mocha.vercel.app/metadata.png";

  return {
    title,
    description,
    keywords: [
      "movies",
      "movie finder",
      "movie database",
      "film",
      "cinema",
      "MoviesVerse",
      title,
    ],
    openGraph: {
      title,
      description,
      url: `https://movies-verse-mocha.vercel.app/movies/${id}`,
      siteName: "MoviesVerse",

      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: movie.title || "MoviesVerse",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imgUrl],
    },
  };
};

//Component--------------------------------------

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
