import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import css from "./Navigation.module.css";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<null | string>(null);
  const [isHover, setIsHover] = useState<boolean>(false);
  const moviesMenuRef = useRef<HTMLUListElement>(null);
  const tvMenuRef = useRef<HTMLUListElement>(null);
  const isMobile = useIsMobile();

  //Toggle menu on click
  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
    console.log("activeMenu", activeMenu);
  };

  //Close menu on click outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      (activeMenu === "movies" &&
        moviesMenuRef.current &&
        !moviesMenuRef.current.contains(target)) ||
      (activeMenu === "tv" &&
        tvMenuRef.current &&
        !tvMenuRef.current.contains(target))
    ) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Toggle menu on hover
  useEffect(() => {
    if (!isHover) {
      const timeOut = setTimeout(() => setActiveMenu(null), 300);
      return () => clearTimeout(timeOut);
    }
  }, [isHover]);

  return (
    <nav>
      <ul className={css.navigation}>
        <li
          onMouseEnter={() => {
            if (!isMobile) {
              setActiveMenu("movies");
              setIsHover(true);
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setIsHover(false);
            }
          }}
          className={css.menuListItem}
        >
          <button
            onClick={() => toggleMenu("movies")}
            className={css.navButton}
          >
            MOVIES
          </button>
          {activeMenu === "movies" && (
            <ul ref={moviesMenuRef} className={css.menuList}>
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
          )}
        </li>
        <li
          onMouseEnter={() => {
            setActiveMenu("tv");
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className={css.menuListItem}
        >
          <button onClick={() => toggleMenu("tv")} className={css.navButton}>
            TV SERIES
          </button>
          {activeMenu === "tv" && (
            <ul ref={tvMenuRef} className={css.menuList}>
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
          )}
        </li>
        <li className={css.menuListItem}>
          <Link className={css.navButton} href="/persons">
            PERSONS
          </Link>
        </li>
        <li className={css.menuListItem}>
          <button className={css.navButton}>GENRES</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
