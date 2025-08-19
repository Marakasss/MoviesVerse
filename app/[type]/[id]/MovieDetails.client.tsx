"use client";

import { fetchContentById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

import React from "react";
import css from "./MovieDetails.module.css";
import Trailer from "@/components/Trailer/Trailer";
import Reviews from "@/components/Reviews/Reviews";
import PersonsSwiper from "@/components/PersonsSwiper/PersonsSwiper";

const MovieDetailsClient = () => {
  const { id, type } = useParams();

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchContentById(String(type), String(id)),
    refetchOnMount: false,
  });

  const pathToPersonPage =
    type === "movie"
      ? `/${type}/${id}/credits`
      : `/${type}/${id}/aggregate_credits`;

  return (
    <>
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
            {movie?.title ?? movie?.name}{" "}
            {movie?.release_date
              ? `(${movie.release_date.slice(0, 4)})`
              : movie?.first_air_date
              ? `(${movie.first_air_date.slice(0, 4)})`
              : ""}
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
            {movie?.release_date
              ? movie.release_date
              : movie?.first_air_date
              ? movie.first_air_date
              : ""}
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
                ? movie?.production_countries.map(({ name }, index) => (
                    <li key={name ?? index}>{name}</li>
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
      <div>
        <h2 className={css.swiperTitle}>Cast</h2>
        <PersonsSwiper typeOfPersons="cast" path={pathToPersonPage} />
      </div>
      {/* <PersonsSwiper typeOfPersons="crew" path={pathToPersonPage} /> */}
      <Trailer type={String(type)} id={String(id)} />

      <div>
        <Reviews type={String(type)} id={String(id)} />
      </div>
    </>
  );
};

export default MovieDetailsClient;
