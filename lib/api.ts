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

// Fetch movies based on a search query
// Returns a paginated response of movies
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

// Fetch movie details by ID
// Returns a single movie object
export async function fetchMovieById(id: string): Promise<Movie> {
  const response = await api.get<Movie>(`/movie/${id}`);
  return response.data;
}

export async function fetchPopularMovies(page: number = 1) {
  const response = await api.get<MoviesResponse>("/movie/popular", {
    params: { page, include_adult: false },
  });
  return response.data;
}
