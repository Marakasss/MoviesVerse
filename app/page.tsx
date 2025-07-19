import { Metadata } from "next";
import HomePageClient from "./HomePage.client";
import css from "./page.module.css";

//MetaData--------------------------------------

const imgUrl = "https://movies-verse-mocha.vercel.app/metadata.png";

export const metadata: Metadata = {
  title: "MoviesVerse",
  description: "A simple and efficient application for discovering movies.",
  keywords: [
    "movies",
    "movie finder",
    "movie database",
    "film",
    "cinema",
    "MoviesVerse",
  ],
  openGraph: {
    title: "MoviesVerse",
    description: "A simple and efficient application for discovering movies.",
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
    description: "A simple and efficient application for discovering movies.",
    images: [imgUrl],
  },
};

export default function Home() {
  return (
    <div className={css.homePageWrapper}>
      <HomePageClient />
    </div>
  );
}
