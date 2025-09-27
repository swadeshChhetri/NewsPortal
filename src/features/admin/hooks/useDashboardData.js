import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NewsAPI, CategoryAPI, CommentAPI } from "../../../services/api";

export const useDashboardData = () => {
  const [newsData, setNewsData] = useState([]);
  const [stats, setStats] = useState({
    totalNews: 0,
    published: 0,
    drafts: 0,
    categories: 0,
    comments: 0,
  });
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await NewsAPI.fetchAll();
        const res = data.news;
        setNewsData(res);

        const categoryRes = await CategoryAPI.fetchAll();
        // Calculate stats
        const totalNews = res.length;

        const recentCommentsRes = await CommentAPI.fetchLatest();
        setRecentComments(recentCommentsRes.comments);

        const published = res.filter((n) => n.status === "published").length;
        const drafts = res.filter((n) => n.status === "draft").length;
        const categories = categoryRes.categories.length;
        const comments = res.reduce(
          (acc, n) => acc + (n.comments?.length || 0),
          0
        );

        setStats({ totalNews, published, drafts, categories, comments });

        // Recent comments
        const allComments = res.flatMap((n) =>
          (n.comments || []).map((c) => ({
            id: c.id,
            user: c.user?.name || "Anonymous",
            comment: c.comment,
            date: c.created_at,
          }))
        );

        // setRecentComments(
        //   allComments
        //     .sort((a, b) => new Date(b.date) - new Date(a.date))
        //     .slice(0, 5)
        // );
      } catch (err) {
        toast.error(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { newsData, stats, recentComments, loading };
};
