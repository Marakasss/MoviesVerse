import React from "react";
import MoviesClient from "./Movies.client";

interface MoviesProps {
  params: Promise<{ slug: string[] }>;
}
const Movies = async ({ params }: MoviesProps) => {
  const { slug } = await params;
  const query = slug[slug.length - 1];
  console.log("slug", slug);

  return <MoviesClient query={query} />;
};

export default Movies;
