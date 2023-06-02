import { useState, useEffect } from "react";

export default function useFetch(initialUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        setLoading(true);
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(`Error fetching data from ${url}`);
          }

          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error("Fetch error:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
    console.log(`data array in useFetch: ${data}`);
  }, [url]);

  return { data, loading, error, setUrl };
}
