import { Route, Routes } from "react-router-dom";
import { MovieList, MovieDetail, Search, PageNotFound } from "../pages";

export function AllRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MovieList apiPath="movie/now_playing" title="Home" />}
        />
        {/* ... مسارات أخرى */}
        <Route
          path="movies/Iraqi"
          element={
            <MovieList
              apiPath="discover/movie"
              query="with_origin_country=IQ"
              title="Iraqi Movies"
            />
          }
        />
        <Route
          path="movies/egyptian"
          element={
            <MovieList
              apiPath="discover/movie"
              query="with_origin_country=EG"
              title="Egyptian Movies"
            />
          }
        />
        <Route
          path="movies/arabian"
          element={
            <MovieList
              apiPath="discover/movie"
              query="with_origin_country=SA"
              title="Arabian Movies"
            />
          }
        />
        <Route
          path="movies/anime"
          element={
            <MovieList
              apiPath="discover/movie"
              query="with_genres=16&with_original_language=ja"
              title="Anime"
            />
          }
        />
        <Route path="search" element={<Search apiPath="search/movie" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
