import { useState, useEffect } from "react";

export default function useFetch(initialUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        return;
      }
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
    };

    fetchData();
  }, [url]);

  return { data, loading, error, setUrl };
}
