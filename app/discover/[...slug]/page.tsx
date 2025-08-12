import React from "react";
import DiscoverClient from "./Discover.client";

interface DiscoverPageProps {
  params: Promise<{ slug: string[] }>;
}

const Discover = async ({ params }: DiscoverPageProps) => {
  const { slug } = await params;
  const path = slug.slice(-2).join("/");

  return <DiscoverClient path={path} />;
};

export default Discover;
