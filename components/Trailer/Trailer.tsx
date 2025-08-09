"use client";

import { fetchMovieTrailer } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import css from "./Trailer.module.css";

interface TrailerProps {
  type: string;
  id: string;
}

const Trailer = ({ type, id }: TrailerProps) => {
  const { data: youtubeVideo } = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => fetchMovieTrailer(type, id),
  });

  if (!youtubeVideo) return <p>Трейлер не знайдено 😕</p>;
  return (
    <>
      <h2 className={css.title}>Trailer</h2>
      <div className={css.frameWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideo.key}`}
          title={youtubeVideo?.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={css.frame}
        ></iframe>
      </div>
    </>
  );
};

export default Trailer;
