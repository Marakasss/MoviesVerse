import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import css from "./Navigation.module.css";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<null | string>(null);
  const [isHover, setIsHover] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  //Toggle menu on click
  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  //Close menu on click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
            setActiveMenu("movies");
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
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
            <ul ref={menuRef} className={css.menuList}>
              <li>
                <Link className={css.link} href="/movies">
                  Now playing
                </Link>
              </li>
              <li>
                <Link className={css.link} href="/tv-series">
                  Popular
                </Link>
              </li>
              <li>
                <Link className={css.link} href="/people">
                  Top rated
                </Link>
              </li>
              <li>
                <Link className={css.link} href="/people">
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
            <ul ref={menuRef} className={css.menuList}>
              <li>
                <Link className={css.link} href="/movies">
                  Airing Today
                </Link>
              </li>
              <li>
                <Link className={css.link} href="/tv-series">
                  On The Air
                </Link>
              </li>
              <li>
                <Link className={css.link} href="/people">
                  Popular
                </Link>
              </li>
              <li>
                <Link className={css.link} href="/people">
                  Top Rated
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={css.menuListItem}>
          <button className={css.navButton}>PEOPLE</button>
        </li>
        <li className={css.menuListItem}>
          <button className={css.navButton}>GENRES</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
