import { useState } from "react";
import { Card } from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useFetch } from "../hooks/useFetch";
// استيراد مكون الزر
import { Button } from "../components/Button";
import { useTitle } from "../hooks/useTitle";

export function MovieList({ apiPath, title }) {
  const [page, setPage] = useState(1);

  useTitle(title);
  const {
    data: response,
    loading,
    error,
  } = useFetch({
    path: apiPath,
    query: `page=${page}`,
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
          <div className="flex justify-between my-8 gap-x-4">
            <Button
              onClick={handlePreviousPage}
              disabled={page === 1}
              // يمكنك تخصيص الستايل هنا إذا أردت
            >
              السابق
            </Button>
            <span className="self-center text-lg font-bold text-gray-700 dark:text-white">
              صفحة {page} من {totalPages}
            </span>
            <Button onClick={handleNextPage} disabled={page === totalPages}>
              التالي
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
