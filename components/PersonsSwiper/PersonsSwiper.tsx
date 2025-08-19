import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import css from "./PersonsSviper.module.css";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchPersonsFromMovie } from "@/lib/api";

interface PersonsSwiperProps {
  path: string;
  typeOfPersons?: "cast" | "crew";
}

const PersonsSwiper = ({ path, typeOfPersons }: PersonsSwiperProps) => {
  const { data } = useQuery({
    queryKey: [["personsSwiper", path]],
    queryFn: () => fetchPersonsFromMovie(path),
  });

  const cast = data?.cast ?? [];
  const crew = data?.crew ?? [];
  const items = typeOfPersons === "cast" ? cast : crew;

  return (
    <div className={css.swiperWrap}>
      {items.length > 0 && (
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          freeMode={true}
          pagination={false}
          modules={[FreeMode, Pagination]}
          className={css.homeSwiper}
        >
          {items.map((person) => {
            return (
              <SwiperSlide key={person.id}>
                <Link href={`/persons/${person.id.toString()}`}>
                  <Image
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                        : "/noPhoto2.jpg"
                    }
                    alt={person.name}
                    width={200}
                    height={200}
                    className={css.image}
                  />
                </Link>
                <h3 className={css.description}>{person.name}</h3>
                {typeOfPersons === "cast" && (
                  <p className={css.description}>{`character: ${
                    person.character ?? person.roles?.[0]?.character
                  }`}</p>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};
export default PersonsSwiper;
