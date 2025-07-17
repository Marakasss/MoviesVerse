"use client";

import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";
import fetchMovies from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "../../../../components/MovieList/MovieList.module.css";
import { useState } from "react";

interface MoviesClientProps {
  query: string;
}

const MoviesClient = ({ query }: MoviesClientProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  //SEARCHING AND RENDERING MOVIES BY QUERY
  const { data, isError } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    placeholderData: keepPreviousData,
  });
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  if (movies.length === 0)
    return <p className={css.notFound}>Nothing found.</p>;
  if (isError) return <p className={css.notFound}>Something went wrong.</p>;

  return (
    <>
      <div>
        <MovieList movies={movies} />
      </div>
      <div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default MoviesClient;
