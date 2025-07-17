"use client";

import React, { useEffect, useState } from "react";
import css from "./page.module.css";
import { getRandomBackdropUrl } from "@/lib/getRandomBg";
import { useQuery } from "@tanstack/react-query";


const HomePageClient = () => {
  const [backGround, setBackground] = useState<string | null>(null);

  //FETCH RANDOM POSTERS FOR PAGE BACKDROP

  const bgQuery = useQuery({
    queryKey: ["bg"],
    queryFn: getRandomBackdropUrl,
    refetchInterval: 8000,
  });

  useEffect(() => {
    if (!bgQuery.data) return;
    const img = new Image();
    img.src = bgQuery.data;
    img.onload = () => setBackground(bgQuery.data);
  }, [bgQuery.data]);

  return (
    <div
      className={css.homePageWrapper}
      style={{ backgroundImage: `url(${backGround})` }}
    >
      <div className={css.contentWrapper}>
        <div className={css.header}>
          <h1>
            Not sure what to watch?
            <br /> Start exploring.
            <br /> Let the perfect movie find you.
          </h1>
        </div>

        <div className={css.description}>
          <p>
            MovieFinder is a fast and user-friendly movie search app powered by
            The Movie Database (TMDB) API. Whether you're planning a movie night
            or just exploring what's trending, MovieFinder helps you discover
            detailed information about films — including posters, ratings,
            overviews, and more.
          </p>
          <p>
            Built with React, Next.js, and TypeScript, the app delivers smooth
            navigation and responsive design. It also uses React Query for
            efficient data fetching and caching, ensuring fast performance and a
            seamless user experience.
          </p>
          <p>Start typing to find your next favorite movie. 🍿</p>
        </div>
      </div>
    </div>
  );
};

export default HomePageClient;
