import { getRandomBackdropUrl } from "@/lib/getRandomBg";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import css from "../../app/page.module.css";

const RandomBackdropSection = () => {
  const [backGround, setBackground] = useState<string | null>(null);

  //   FETCH RANDOM POSTERS FOR PAGE BACKDROP

  const bgQuery = useQuery({
    queryKey: ["bg"],
    queryFn: getRandomBackdropUrl,
    refetchInterval: 8000, // інтервал тільки для цього запиту
    staleTime: 0, // можна лишити 0, бо ти хочеш оновлюватися часто
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!bgQuery.data) return;
    const img = new Image();
    img.src = bgQuery.data;
    img.onload = () => setBackground(bgQuery.data);
  }, [bgQuery.data]);
  return (
    <div
      className={css.randomMovie}
      style={{ backgroundImage: `url(${backGround})` }}
    >
      {" "}
      <div className={css.header}>
        <h1>
          Not sure what to watch?
          <br /> Start exploring.
          <br /> Let the perfect movie find you.
        </h1>
      </div>
    </div>
  );
};

export default RandomBackdropSection;
