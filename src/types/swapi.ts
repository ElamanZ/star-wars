export interface PeopleListItem {
  uid: string;
  name: string;
  url: string;
}

export interface PeopleListResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: PeopleListItem[];
}

export interface PersonProperties {
  name: string;
  gender: string;
  skin_color: string;
  hair_color: string;
  height: string;
  eye_color: string;
  mass: string;
  homeworld: string;
  birth_year: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  species: string[];
  url: string;
  created: string;
  edited: string;
}

export interface PersonDetailResponse {
  message: string;
  result: {
    properties: PersonProperties;
    _id: string;
    description: string;
    uid: string;
  };
}

export interface SpeciesProperties {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
  films: string[];
  url: string;
}

export interface SpeciesDetailResponse {
  message: string;
  result: {
    properties: SpeciesProperties;
    uid: string;
  };
}

export interface FilmProperties {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
  created: string;
  edited: string;
}

export interface FilmItem {
  properties: FilmProperties;
  _id: string;
  description: string;
  uid: string;
}

export interface FilmsListResponse {
  message: string;
  result: FilmItem[];
}

export interface FilmDetailResponse {
  message: string;
  result: FilmItem;
}

export interface PeopleQueryParams {
  page?: number;
  limit?: number;
  name?: string;
}