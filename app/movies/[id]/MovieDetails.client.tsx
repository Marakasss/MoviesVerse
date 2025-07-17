"use client";

import { fetchMovieById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

import React from "react";

const MovieDetailsClient = () => {
  const { id } = useParams();

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(String(id)),
    refetchOnMount: false,
  });

  return (
    <div>
      <Image
        src={
          movie?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
            : "/poster-placeholder.png"
        }
        alt={movie?.title ?? "Movie Poster"}
        width={278}
        height={300}
      />
      <div>
        <h2>{movie?.title}</h2>
        <p>{movie?.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie?.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {`${movie?.vote_average}/10`}
        </p>
      </div>
    </div>
  );
};

export default MovieDetailsClient;
