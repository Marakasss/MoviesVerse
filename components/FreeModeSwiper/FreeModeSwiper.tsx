import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import css from "../PopularMovieSwiper/PopularMovieSwiper.module.css";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDiscoveredContent } from "@/lib/api";

interface FreeModeSwiperProps {
  queryKey: string[];
  path: string;
  linkPrefix?: string;
  slidesPerView?: number;
}

const FreeModeSwiper = ({
  queryKey,
  path,
  linkPrefix,
  slidesPerView,
}: FreeModeSwiperProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: ({ pageParam = 1 }) => fetchDiscoveredContent(path, pageParam),
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
        onSlideChange={handleSlideChange}
        slidesPerView={slidesPerView}
        spaceBetween={30}
        freeMode={true}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className={css.homeSwiper}
      >
        {movies?.map((movie) => {
          return (
            <SwiperSlide key={movie.imdb_id}>
              <Link href={`/${linkPrefix}/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title ?? movie.name}
                  width={200}
                  height={200}
                  className={css.image}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default FreeModeSwiper;
