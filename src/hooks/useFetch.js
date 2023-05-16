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

  const fetchData = useCallback(async (url) => {
    setLoading(true);
    console.log(`Fetching data from: ${url}`); // Add console log to print the URL
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setData(data);
      } else {
        throw new Error(`Error fetching data from ${url}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, doFetch: fetchData };
}
