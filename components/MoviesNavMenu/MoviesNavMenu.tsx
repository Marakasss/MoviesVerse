import Link from "next/link";
import React from "react";
import css from "./MoviesNavMenu.module.css";

const MoviesNavMenu = () => {
  return (
    <ul className={css.menuList}>
      <li>
        <Link className={css.link} href="/discover/movie/now_playing">
          Now playing
        </Link>
      </li>
      <li>
        <Link className={css.link} href="/discover/movie/popular">
          Popular
        </Link>
      </li>
      <li>
        <Link className={css.link} href="/discover/movie/top_rated">
          Top rated
        </Link>
      </li>
      <li>
        <Link className={css.link} href="/discover/movie/upcoming">
          Upcoming
        </Link>
      </li>
    </ul>
  );
};

export default MoviesNavMenu;
