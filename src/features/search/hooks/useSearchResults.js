// src/hooks/useSearchResults.jsx
import { useState, useEffect } from "react";
import { NewsAPI } from "../../../services/api";
import toast from "react-hot-toast";

export const useSearchResults = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await NewsAPI.search(query);
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error(err.message || "Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return { results, loading };
};
