import { useEffect, useState } from "react";

const URL = "https://api.themoviedb.org/3/";
const V3_API_KEY = process.env.REACT_APP_V3_API_KEY;

export function useFetch({ path, query = "" }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        if (!V3_API_KEY) {
          throw new Error(
            "V3 API Key is not defined in environment variables."
          );
        }

        let fullUrl = `${URL}${path}?api_key=${V3_API_KEY}`;
        if (query !== "") {
          fullUrl += `&${query}`;
        }

        const res = await fetch(fullUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
          signal: signal,
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized: Check your API v3 key.");
          } else if (res.status === 404) {
            throw new Error("Resource not found: Check the entered path.");
          }
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [path, query]);

  return { data, loading, error };
}
