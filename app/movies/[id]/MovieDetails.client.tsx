"use client";

import { fetchMovieById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

import React from "react";
import css from "./MovieDetails.module.css";

const MovieDetailsClient = () => {
  const { id } = useParams();

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(String(id)),
    refetchOnMount: false,
  });

  return (
    <div className={css.pageWrapper}>
      <Image
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
            : movie?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
            : "/poster-placeholder.png"
        }
        alt={movie?.title ?? "Movie Poster"}
        width={500}
        height={750}
        className={css.poster}
        style={{ objectFit: "contain" }}
      />
      <div className={css.descrWrapper}>
        <h2 className={css.title}>
          {movie?.title}{" "}
          {movie?.release_date ? `(${movie?.release_date.slice(0, 4)})` : ""}
        </h2>
        <div className={css.genresWrp}>
          <p className={css.info}>
            <strong>Genre:</strong>
          </p>
          <ul className={css.genres}>
            {movie?.genres.map(({ id, name }) => (
              <li key={id}>{name ? name : "no info"}</li>
            ))}
          </ul>
        </div>
        <p>
          <strong className={css.info}>Release Date:</strong>{" "}
          {movie?.release_date ? movie?.release_date : "no info"}
        </p>

        <p>
          <strong className={css.info}>Rating:</strong>{" "}
          {`${movie?.vote_average}/10`}
        </p>

        <div className={css.infoItem}>
          <p className={css.info}>
            <strong>Production countries:</strong>
          </p>
          <ul className={css.genres}>
            {movie?.production_countries
              ? movie?.production_countries.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))
              : "no info"}
          </ul>
        </div>

        <p>
          <strong className={css.info}>Budget:</strong>
          {movie?.budget ? movie?.budget + "$" : "no info"}
        </p>

        <p className={css.overview}>{movie?.overview}</p>
        <p className={css.info}>
          <strong>Production companies:</strong>
        </p>
        <div className={css.companiesList}>
          <ul className={css.genres}>
            {movie?.production_companies.map(({ name, logo_path }) => (
              <li key={logo_path} className={css.companyCard}>
                <p className={css.company}>{name}</p>
                {logo_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${logo_path}`}
                    alt={name}
                    width={120}
                    height={120}
                    style={{ objectFit: "contain" }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsClient;
