"use client";

import Link from "next/link";
import React from "react";
import css from "./GenresNavMenu.module.css";
import { fetchGenresList } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const GenresNavMenu = () => {
  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchGenresList(),
    refetchOnMount: false,
  });
  const genres = data?.genres;
  return (
    <ul className={css.menuList}>
      {genres?.map((genre) => {
        return (
          <li key={genre.id}>
            <Link
              className={css.link}
              href={`/discover/discover/movie?with_genres=${genre.id}`}
            >
              {genre.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default GenresNavMenu;
