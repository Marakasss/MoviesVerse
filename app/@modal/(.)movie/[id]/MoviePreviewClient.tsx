"use client";

import Modal from "@/components/Modal/Modal";
import { fetchContentById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import css from "./MoviePreviewClient.module.css";

const MoviePreviewClient = () => {
  const router = useRouter();
  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const { id } = useParams();
  const type = "movie";

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchContentById(String(type), String(id)),
    refetchOnMount: false,
  });

  const handleClick = () => {
    window.location.href = `/${type}/${id}`;
  };

  return (
    <Modal onClose={onClose}>
      <Image
        src={
          movie?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            : movie?.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : "/poster-placeholder.png"
        }
        alt={movie?.title ?? movie?.name ?? "Movie Poster"}
        width={278}
        height={300}
        placeholder="blur"
        blurDataURL="/blurPlaceholder.jpg"
        objectFit="contain"
        className={css.image}
      />
      <div className={css.content}>
        <h2>{movie?.title ?? movie?.name}</h2>
        <p>{movie?.overview}</p>
        <p>
          <strong>Release Date:</strong>{" "}
          {movie?.release_date ?? movie?.first_air_date}
        </p>
        <p>
          <strong>Rating:</strong> {`${movie?.vote_average}/10`}
        </p>
        <button className={css.button} type="button" onClick={handleClick}>
          more
        </button>
      </div>
    </Modal>
  );
};

export default MoviePreviewClient;
