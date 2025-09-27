import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NewsAPI } from "../../../services/api";

export const useSingleNews = (id) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    if (!id) return;

    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await NewsAPI.fetchById(id);
        const res = data.data;
        setNews(res);
      } catch (err) {
        const msg = err.response?.res?.message || "Failed to fetch news.";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [id]);

  const postComment = async (commentText) => {
    if (!commentText.trim()) return;

    try {
      const data = await NewsAPI.postComment(id, commentText); // token handled in api.js
      setNews((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), data],
      }));
      toast.success("Comment posted!");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to post comment.";
      toast.error(msg);
      console.error(err);
    }
  };

  return { news, loading, error, postComment };
};
