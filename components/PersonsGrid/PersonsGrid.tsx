"use client";

import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { fetchPersons, searchPersons } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ChromaGrid from "../ChromaGrid/ChromaGrid";
import { useDebounce } from "use-debounce";
import PersonSearchBox from "../PersonsSearchBox/PersonSearchBox";

const PersonsGrid = () => {
  const [page, setPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const { data } = useQuery({
    queryKey: ["persons", debouncedInputValue, page],
    queryFn: () =>
      debouncedInputValue
        ? searchPersons(debouncedInputValue, page) // if searching
        : fetchPersons(page), // if no searching value
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  // Incorrectly respons from the API
  const totalPages = data?.total_pages || 1;
  // const totalPages = 500;

  const items =
    data?.results.map((person) => ({
      id: person.id.toString(),
      image: person.profile_path
        ? `https://image.tmdb.org/t/p/original${person.profile_path}`
        : "/unknownPerson.PNG",
      title: person.name,
      subtitle: "",
      handle: "",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: `/persons/${person.id.toString()}`,
    })) || [];

  const handleSearchChange = (newSearch: string) => {
    setInputValue(newSearch);
    setPage(1);
  };

  return (
    <>
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        <PersonSearchBox value={inputValue} onSearch={handleSearchChange} />
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
    </>
  );
};

export default PersonsGrid;
