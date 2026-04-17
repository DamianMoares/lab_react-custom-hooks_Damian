import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setData([]);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
        setError(null);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
