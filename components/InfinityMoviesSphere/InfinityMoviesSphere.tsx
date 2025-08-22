"use client";

import { useQuery } from "@tanstack/react-query";

import InfiniteMenu from "../InfiniteMenu/InfiniteMenu";
import React from "react";
import { fetchDiscoveredContent } from "@/lib/api";
import css from "./InfinityMoviesSphere.module.css";

const InfinityMoviesSphere = () => {
  const { data: movies } = useQuery({
    queryKey: ["topRated"],
    queryFn: () => fetchDiscoveredContent("movie/top_rated", 1),
    staleTime: 300000, // 5 хвилин
    refetchOnWindowFocus: false, // не перезапитувати при фокусі вкладки
  });

  const items =
    movies?.results.map((movie) => {
      const { title, poster_path, id } = movie;
      return {
        image: `https://image.tmdb.org/t/p/original${poster_path}`,
        link: `https://movies-verse-mocha.vercel.app/movie/${id}`,
        title: title,
        description: "",
      };
    }) || [];

  return (
    <>
      <p className={css.title}>Swipe to choose a movie</p>{" "}
      <div
        style={{
          height: "600px",
          maxWidth: "1440px",
          position: "relative",
          backgroundColor: "transparent",
          margin: "0 auto",
        }}
      >
        <InfiniteMenu items={items} />
      </div>
    </>
  );
};

export default InfinityMoviesSphere;
