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
