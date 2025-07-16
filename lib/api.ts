import { Movie } from "@/types/movie";
import axios from "axios";

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;
if (!TMDB_TOKEN) {
  throw new Error("TOKEN IS MISSING");
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

export default async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesResponse> {
  const response = await api.get<MoviesResponse>("/search/movie", {
    params: {
      query,
      page,
      include_adult: true,
    },
  });

  return response.data;
}
