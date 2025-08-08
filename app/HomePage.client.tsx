"use client";

import React, { useEffect, useState } from "react";
import css from "./page.module.css";
import { getRandomBackdropUrl } from "@/lib/getRandomBg";
import { useQuery } from "@tanstack/react-query";
import UpcomingMovieSwiper from "@/components/UpcomingMovieSwiper/UpcomingMovieSwiper";
import PopularMovieSwiper from "@/components/PopularMovieSwiper/PopularMovieSwiper";

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
    <div>
      <div className={css.about}>
        <div className={css.description}>
          <h1 className={css.title}>Welcome</h1>
          <p> Millions of movies, TV shows, and more. Explore now.</p> <br />
          <p>
            MovieVerse is a fast and user-friendly movie search app powered by
            The Movie Database (TMDB) API. Whether you&#39;re planning a movie
            night or just exploring what&#39;s trending, MovieFinder helps you
            discover detailed information about films — including posters,
            ratings, overviews, and more.
          </p>
          <br />
          <p>
            Built with React, Next.js, and TypeScript, the app delivers smooth
            navigation and responsive design. It also uses React Query for
            efficient data fetching and caching, ensuring fast performance and a
            seamless user experience.
          </p>
          <br />
          <p>Start typing to find your next favorite movie. 🍿</p>
        </div>
      </div>
      <div
        className={css.randomMovie}
        style={{ backgroundImage: `url(${backGround})` }}
      >
        {" "}
        <div className={css.header}>
          <h1>
            Not sure what to watch?
            <br /> Start exploring.
            <br /> Let the perfect movie find you.
          </h1>
        </div>
      </div>
      <div className={css.contentWrapper}>
        <div className={css.movieSwiperWrp}>
          <div className={css.titleLine}>POPULAR</div>
          <PopularMovieSwiper />
        </div>

        <div>
          <div className={css.titleLine}>UPCOMING</div>
          <UpcomingMovieSwiper />
        </div>
      </div>
    </div>
  );
};

export default HomePageClient;
