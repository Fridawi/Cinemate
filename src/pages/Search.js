import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useFetch } from "../hooks/useFetch";
import { Button } from "../components/Button";
import { useTitle } from "../hooks/useTitle";

export function Search({ apiPath }) {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const genreId = searchParams.get("genreId");
  const genreName = searchParams.get("genreName");
  const [page, setPage] = useState(1);

  useTitle(`Search result for ${queryTerm}`);

  useEffect(() => {
    setPage(1);
  }, [queryTerm, genreId]);

  let fetchPath = apiPath;
  let fetchQuery = "";
  if (queryTerm) {
    fetchPath = "search/movie";
    fetchQuery = `query=${encodeURIComponent(queryTerm)}&page=${page}`;
  } else if (genreId) {
    fetchPath = "discover/movie";
    fetchQuery = `with_genres=${genreId}&page=${page}`;
  }

  const {
    data: response,
    loading,
    error,
  } = useFetch({
    path: fetchPath,
    query: fetchQuery,
  });

  const movies = response?.results;
  const totalPages = response?.total_pages;

  const headingText = loading
    ? "Searching..."
    : genreId
    ? movies && movies.length > 0
      ? `Movie results: ${genreName}`
      : `No results found for type: '${genreName}'`
    : queryTerm
    ? movies && movies.length > 0
      ? `Search results for: '${queryTerm}'`
      : `No results found for: '${queryTerm}'`
    : "Enter a word to search for movies.";

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="text-4xl text-slate-800">
      <section className="max-w-7xl mx-auto py-7">
        <p className="text-3xl text-gray-700 dark:text-white my-4 text-center">
          {headingText}
        </p>
        <div className="flex justify-start flex-wrap other:justify-evenly">
          {loading && <Spinner />}
          {error && <ErrorMessage message={error} />}
          {movies &&
            movies.length > 0 &&
            movies.map((movie) => <Card movie={movie} key={movie.id} />)}

          {!loading &&
            !error &&
            (queryTerm || genreId) &&
            movies &&
            movies.length === 0 && (
              <p className="text-xl text-center w-full text-gray-500 dark:text-gray-400">
                Sorry, no movies were found that match your search.
              </p>
            )}
        </div>

        {!loading && !error && movies && movies.length > 0 && (
          <div className="flex justify-between my-8 gap-x-4">
            <Button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </Button>
            <span className="self-center text-sm md:text-lg font-bold text-gray-700 dark:text-white">
              Page {page} of {totalPages}
            </span>
            <Button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
