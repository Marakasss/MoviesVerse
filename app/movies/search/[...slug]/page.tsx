import React from "react";
import MoviesClient from "./Movies.client";
import { Metadata } from "next";

interface MoviesProps {
  params: Promise<{ slug: string[] }>;
}

//MetaData--------------------------------------

const imgUrl = "https://movies-verse-mocha.vercel.app/metadata.png";

export const generateMetadata = async ({
  params,
}: MoviesProps): Promise<Metadata> => {
  const { slug } = await params;
  const query = slug[slug.length - 1] ?? "";
  const description = `Searching movies by query ${query}`;

  return {
    title: "MoviesVerse",
    description,
    keywords: [
      "movies",
      "movie finder",
      "movie database",
      "film",
      "cinema",
      "MoviesVerse",
      query,
    ],
    openGraph: {
      title: "MoviesVerse",
      description,
      url: "https://movies-verse-mocha.vercel.app/",
      siteName: "MoviesVerse",

      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: "MoviesVerse",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "MoviesVerse",
      description,
      images: [imgUrl],
    },
  };
};

const Movies = async ({ params }: MoviesProps) => {
  const { slug } = await params;
  const query = slug[slug.length - 1];

  return <MoviesClient query={query} />;
};

export default Movies;
