"use client";

import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { fetchPersons } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ChromaGrid from "../ChromaGrid/ChromaGrid";

const PersonsGrid = () => {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["persons", page],
    queryFn: () => fetchPersons(page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  // Incorrectly respons from the API
  //   const totalPages = data?.total_pages || 1;
  const totalPages = 500; //

  const items =
    data?.results.map((person) => ({
      id: person.id.toString(),
      image: `https://image.tmdb.org/t/p/original${person.profile_path}`,
      title: person.name,
      subtitle: "",
      handle: "",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: `/persons/${person.id.toString()}`,
    })) || [];

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <ChromaGrid
        items={items}
        radius={600}
        damping={0.45}
        fadeOut={0.3}
        ease="power3.out"
        columns={4}
      />

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default PersonsGrid;
