"use client";

import { fetchMovieTrailer } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import React from "react";

interface TrailerProps {
  id: string;
}

const Trailer = ({ id }: TrailerProps) => {
  const { data: youtubeVideo } = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => fetchMovieTrailer(id),
  });

  if (!youtubeVideo) return <p>Трейлер не знайдено 😕</p>;
  return (
    <>
      <h2>Trailer</h2>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1024px",
          aspectRatio: "16/9",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideo.key}`}
          title={youtubeVideo?.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        ></iframe>
      </div>
    </>
  );
};

export default Trailer;
