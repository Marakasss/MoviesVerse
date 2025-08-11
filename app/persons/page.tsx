"use client";
import ChromaGrid from "@/components/ChromaGrid/ChromaGrid";
import { fetchPersons } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PersonsPage = () => {
  const { data: persons } = useQuery({
    queryKey: ["persons"],
    queryFn: () => fetchPersons(),
  });

  const items =
    persons?.results.map((person) => ({
      image: `https://image.tmdb.org/t/p/original${person.profile_path}`,
      title: person.name,
      subtitle: "",
      handle: "",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://linkedin.com/in/mikechen",
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
    </div>
  );
};

export default PersonsPage;
