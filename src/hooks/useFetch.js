import { useState, useCallback } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const fetchData = useCallback(
    async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error(`Error fetching data from ${url}`);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, loading, error, doFetch: fetchData };
}
