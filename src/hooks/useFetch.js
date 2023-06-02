import { useState, useEffect } from "react";

export default function useFetch(initialUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    if (url) {
      setLoading(true);
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error(`Error fetching data from ${url}`);
        })
        .then((data) => setData(data))
        .catch((error) => {
          console.error("Fetch error:", error);
          setError(error);
        })
        .finally(() => setLoading(false));
    }
  }, [url]);

  return { data, loading, error, setUrl };
}
