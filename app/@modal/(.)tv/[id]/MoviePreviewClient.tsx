"use client";

import Modal from "@/components/Modal/Modal";
import { fetchContentById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import css from "./MoviePreviewClient.module.css";

const MoviePreviewClient = () => {
  const router = useRouter();
  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const { id } = useParams();
  const type = "tv";

  const { data: tvList } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchContentById(String(type), String(id)),
    refetchOnMount: false,
  });

  const handleClick = () => {
    window.location.href = `/${type}/${id}`;
  };

  return (
    <Modal onClose={onClose}>
      <Image
        src={
          tvList?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${tvList.backdrop_path}`
            : tvList?.poster_path
            ? `https://image.tmdb.org/t/p/original/${tvList.poster_path}`
            : "/poster-placeholder.png"
        }
        alt={tvList?.title ?? tvList?.name ?? "TV Poster"}
        width={278}
        height={300}
        placeholder="blur"
        blurDataURL="/blurPlaceholder.jpg"
        objectFit="contain"
        className={css.image}
      />
      <div className={css.content}>
        <h2>{tvList?.title ?? tvList?.name}</h2>
        <p>{tvList?.overview}</p>
        <p>
          <strong>Release Date:</strong>{" "}
          {tvList?.release_date ?? tvList?.first_air_date}
        </p>
        <p>
          <strong>Rating:</strong> {`${tvList?.vote_average}/10`}
        </p>
        <button className={css.button} type="button" onClick={handleClick}>
          more
        </button>
      </div>
    </Modal>
  );
};

export default MoviePreviewClient;
