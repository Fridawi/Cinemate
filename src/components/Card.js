import { Link } from "react-router-dom";
import Backup from "../assets/images/backup.png";
import { useState } from "react"; // استيراد useState

export const Card = ({ movie }) => {
  const { id, original_title, overview, poster_path } = movie;
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : Backup;

  const [showFullOverview, setShowFullOverview] = useState(false);

  const maxWords = 20;
  const words = overview.split(" ");
  const needsTruncation = words.length > maxWords;
  const displayedOverview =
    needsTruncation && !showFullOverview
      ? words.slice(0, maxWords).join(" ") + "..."
      : overview;

  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-3">
      <Link to={`/movie/${id}`}>
        <img className="rounded-t-lg" src={image} alt={original_title} />
      </Link>
      <div className="p-5">
        <Link to={`/movie/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {original_title}
          </h5>
        </Link>
        <p className="mb-3 text-xl  font-normal text-gray-700 dark:text-gray-400">
          {displayedOverview}
        </p>
        <div className="flex items-center justify-center">
          {needsTruncation && (
            <button
              onClick={() => setShowFullOverview(!showFullOverview)}
              className="text-blue-600 hover:underline font-medium text-xl  dark:text-white"
            >
              {showFullOverview ? "See Less" : "See More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
