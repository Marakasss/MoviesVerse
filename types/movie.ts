export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  budget: number;
  imdb_id: string;
  production_companies: Company[];
  production_countries: Countries[];
  popularity: number;
  name?: string;
  first_air_date?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Company {
  logo_path: string;
  name: string;
}

export interface Countries {
  name: string;
}

export interface Trailer {
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Reviews {
  author: string;
  content: string;
  created_at: string;
  id: string;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  known_for: Movie[];
}
