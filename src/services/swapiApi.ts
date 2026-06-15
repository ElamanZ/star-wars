import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PeopleListResponse,
  PersonDetailResponse,
  FilmsListResponse,
  FilmDetailResponse,
  SpeciesDetailResponse,
  PeopleQueryParams,
} from "../types/swapi";

export const swapiApi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["People", "Person", "Films", "Film", "Species"],
  endpoints: (builder) => ({

    getPeople: builder.query<PeopleListResponse, PeopleQueryParams>({
      query: ({ page = 1, limit = 10, name } = {}) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (name && name.trim()) params.set("name", name.trim());
        return `/people?${params.toString()}`;
      },
      transformResponse: (response: PeopleListResponse & {
        result?: Array<{ uid: string; properties: { name: string; url: string } }>;
      }): PeopleListResponse => {
        if (Array.isArray(response.result)) {
          const results = response.result.map((item) => ({
            uid: item.uid,
            name: item.properties.name,
            url: item.properties.url,
          }));
          return {
            message: response.message,
            total_records: results.length,
            total_pages: 1,
            previous: null,
            next: null,
            results,
          };
        }
        return response;
      },
      providesTags: ["People"],
    }),

    getPersonById: builder.query<PersonDetailResponse, string>({
      query: (id) => `/people/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Person", id }],
    }),

    getFilms: builder.query<FilmsListResponse, void>({
      query: () => `/films`,
      providesTags: ["Films"],
    }),

    getFilmById: builder.query<FilmDetailResponse, string>({
      query: (idOrUrl) => {
        const id = idOrUrl.includes("/")
          ? idOrUrl.split("/").filter(Boolean).pop()
          : idOrUrl;
        return `/films/${id}`;
      },
      providesTags: (_result, _err, id) => [{ type: "Film", id }],
    }),

    getSpeciesById: builder.query<SpeciesDetailResponse, string>({
      query: (idOrUrl) => {
        const id = idOrUrl.includes("/")
          ? idOrUrl.split("/").filter(Boolean).pop()
          : idOrUrl;
        return `/species/${id}`;
      },
      providesTags: (_result, _err, id) => [{ type: "Species", id }],
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useGetPersonByIdQuery,
  useGetFilmsQuery,
  useGetFilmByIdQuery,
  useGetSpeciesByIdQuery,
} = swapiApi;
