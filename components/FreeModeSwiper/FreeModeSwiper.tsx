import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import css from "../PopularMovieSwiper/PopularMovieSwiper.module.css";
// import required modules
import { Navigation, FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDiscoveredContent } from "@/lib/api";

interface FreeModeSwiperProps {
  queryKey: string[];
  path: string;
  linkPrefix?: string;
  slidesPerView?: number;
  responseType?: "results" | "cast";
}

const FreeModeSwiper = ({
  queryKey,
  path,
  linkPrefix,
  slidesPerView,
  responseType = "results",
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

  const movies = data?.pages.flatMap((page) => page[responseType]) || [];

  const handleSlideChange = (swiper: SwiperClass) => {
    if (swiper.isEnd && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      {movies.length > 0 && (
        <Swiper
          onSlideChange={handleSlideChange}
          slidesPerView={slidesPerView}
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          pagination={false}
          modules={[FreeMode, Pagination, Navigation]}
          className={css.homeSwiper}
        >
          {movies?.map((movie) => {
            return (
              <SwiperSlide key={movie?.imdb_id}>
                <Link href={`/${linkPrefix}/${movie?.id}`}>
                  <Image
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "/noPhoto2.jpg"
                    }
                    alt={movie?.title ?? movie?.name ?? "Poster"}
                    width={200}
                    height={200}
                    className={css.image}
                  />
                </Link>
                {responseType === "cast" && movie?.character && (
                  <p className={css.descr}>{movie.character}</p>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};
export default FreeModeSwiper;
