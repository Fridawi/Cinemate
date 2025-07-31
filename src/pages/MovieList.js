import { useState } from "react";
import { Card } from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useFetch } from "../hooks/useFetch";
import { Button } from "../components/Button";
import { useTitle } from "../hooks/useTitle";

export function MovieList({ apiPath, title, query: initialQuery = "" }) {
  const [page, setPage] = useState(1);
  const finalQuery = `${initialQuery}${initialQuery ? "&" : ""}page=${page}`;

  useTitle(title);
  const {
    data: response,
    loading,
    error,
  } = useFetch({
    path: apiPath,
    query: finalQuery,
  });
  const movies = response?.results;
  const totalPages = response?.total_pages;

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
        <div className="flex justify-start flex-wrap other:justify-evenly">
          {loading && <Spinner />}
          {error && <ErrorMessage message={error} />}
          {movies &&
            movies.map((movie) => <Card movie={movie} key={movie.id} />)}
        </div>

        {!loading && !error && movies && movies.length > 0 && (
          // إضافة `gap-x-4` للفصل بين الأزرار
          <div className="flex justify-between items-center my-8 gap-x-4">
            <Button
              onClick={handlePreviousPage}
              disabled={page === 1}
              // يمكنك تخصيص الستايل هنا إذا أردت
            >
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
