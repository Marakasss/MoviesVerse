import React from "react";
import DiscoverClient from "./Discover.client";

interface DiscoverPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string }>;
}

const Discover = async ({ params, searchParams }: DiscoverPageProps) => {
  const searchParamsObj = await searchParams;
  const searchParamsString = new URLSearchParams(searchParamsObj).toString();

  const { slug } = await params;
  console.log(slug);
  const path = searchParamsString.includes("with_genres")
    ? "discover/" + slug.slice(-2).join("/") + `${"?" + searchParamsString}`
    : slug.slice(-2).join("/");

  return <DiscoverClient path={path} />;
};

export default Discover;
