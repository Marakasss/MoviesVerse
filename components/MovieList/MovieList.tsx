import css from "./MovieList.module.css";
import type { Movie } from "../../types/movie";

import Image from "next/image";
import Link from "next/link";

interface MovieGridProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const { id, poster_path, title } = movie;

        return (
          <li key={id}>
            <Link href={`/movies/${id}`}>
              <div className={css.card} role="button" tabIndex={0}>
                <Image
                  className={css.image}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                      : "/poster-placeholder.png"
                  }
                  alt={title}
                  loading="lazy"
                  width={278}
                  height={300}
                />
                <h2 className={css.title}>{title}</h2>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
