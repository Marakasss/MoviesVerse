"use client";

import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";
import fetchMovies from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import React, { useState } from "react";

interface MoviesClientProps {
  query: string;
}

const MoviesClient = ({ query }: MoviesClientProps) => {
  //STATES

  const [currentPage, setCurrentPage] = useState<number>(1);

  //SEARCHING AND RENDERING MOVIES BY QUERY
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    placeholderData: keepPreviousData,
  });
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <>
      <div>
        <MovieList movies={movies} />
      </div>
      <div>
        {totalPages > 0 && (
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
