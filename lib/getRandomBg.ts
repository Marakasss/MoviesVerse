import axios from "axios";

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

interface MovieBackdrop {
  backdrop_path: string | null;
}

interface TMDBResponse {
  results: MovieBackdrop[];
}

export async function getRandomBackdropUrl(): Promise<string | null> {
  if (!TMDB_TOKEN) {
    console.error("TMDB token is not set!");
    return null;
  }
  const randomPage = Math.floor(Math.random() * 500) + 1;
  const { data } = await axios.get<TMDBResponse>(
    "https://api.themoviedb.org/3/movie/top_rated",
    {
      params: {
        include_adult: false,
        page: randomPage,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );

  const movies = data.results.filter((movie) => movie.backdrop_path);
  if (movies.length === 0) return null;

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  return `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`;
}
// https://media.themoviedb.org/t/p/w880_and_h600_multi_faces_filter(duotone,00192f,00baff)/pQvqGK6KQDILL7SJrhMQsRvJfLB.jpg
