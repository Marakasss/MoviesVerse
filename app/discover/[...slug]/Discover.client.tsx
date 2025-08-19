"use client";
import Loader from "@/components/Loader/Loader";
import { fetchDiscoveredContent } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import css from "../../NotFound.module.css";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";

interface DiscoverClientProps {
  path: string;
}

const DiscoverClient = ({ path }: DiscoverClientProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["discover", path, currentPage],
    queryFn: () => fetchDiscoveredContent(path, currentPage),
    placeholderData: keepPreviousData,
  });

  const content = data?.results ?? [];

  const type = path.split("/")[0] === "discover" ? "movie" : path.split("/")[0];

  const totalPages = data?.total_pages ?? 0;

  if (isError) return <p className={css.notFound}>Something went wrong.</p>;
  if (isLoading) return <Loader />;
  return (
    <>
      <div>
        <MovieList movies={content} type={type} />
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

export default DiscoverClient;
