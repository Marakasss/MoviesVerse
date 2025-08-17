import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import css from "./Navigation.module.css";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import MoviesNavMenu from "../MoviesNavMenu/MoviesNavMenu";
import TvNavMenu from "../TvNavMenu/TvNavMenu";
import { GenresNavMenu } from "../GenresNavMenu/GenresNavMenu";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<null | string>(null);
  const [isHover, setIsHover] = useState<boolean>(false);
  const moviesMenuRef = useRef<HTMLDivElement>(null);
  const tvMenuRef = useRef<HTMLDivElement>(null);
  const genresMenuRef = useRef<HTMLDivElement>(null);
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
            <div ref={moviesMenuRef}>
              <MoviesNavMenu />
            </div>
          )}
        </li>
        <li
          onMouseEnter={() => {
            if (!isMobile) {
              setActiveMenu("tv");
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
          <button onClick={() => toggleMenu("tv")} className={css.navButton}>
            TV SERIES
          </button>
          {activeMenu === "tv" && (
            <div ref={tvMenuRef}>
              <TvNavMenu />
            </div>
          )}
        </li>
        <li className={css.menuListItem}>
          <Link className={css.navButton} href="/persons">
            PERSONS
          </Link>
        </li>
        <li
          onMouseEnter={() => {
            if (!isMobile) {
              setActiveMenu("genres");
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
            onClick={() => toggleMenu("genres")}
            className={css.navButton}
          >
            GENRES
          </button>
          {activeMenu === "genres" && (
            <div ref={genresMenuRef}>
              <GenresNavMenu />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
