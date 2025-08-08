"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "@/lib/api";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import css from "./PopularMovieSwiper.module.css";
import Link from "next/link";
import type { Swiper as SwiperClass } from "swiper";

const PopularMovieSwiper = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: ({ pageParam = 1 }) => fetchPopularMovies(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
      initialPageParam: 1,
    });

  const movies = data?.pages.flatMap((page) => page.results) || [];

  const handleSlideChange = (swiper: SwiperClass) => {
    if (swiper.isEnd && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false}
        spaceBetween={60}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 360,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        onSlideChange={handleSlideChange}
        className={css.homeSwiper}
      >
        {movies?.map((movie) => {
          return (
            <SwiperSlide key={movie.imdb_id} style={{ width: "200px" }}>
              <Link href={`/movie/${movie.id}`}>
                <div className={css.imageWrp}>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={200}
                    className={css.image}
                  />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default PopularMovieSwiper;
