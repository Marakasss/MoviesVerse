import Link from "next/link";
import React from "react";
import css from "./TvNavMenu.module.css";

const TvNavMenu = () => {
  return (
    <ul className={css.menuList}>
      <li>
        <Link className={css.link} href="/discover/tv/airing_today">
          Airing Today
        </Link>
      </li>
      <li>
        <Link className={css.link} href="/discover/tv/on_the_air">
          On The Air
        </Link>
      </li>
      <li>
        <Link className={css.link} href="/discover/tv/popular">
          Popular
        </Link>
      </li>
      <li>
        <Link className={css.link} href="/discover/tv/top_rated">
          Top Rated
        </Link>
      </li>
    </ul>
  );
};

export default TvNavMenu;
