// src/pages/SingleNewsPage.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  MessageCircle,
} from "lucide-react";

import Layout from "../components/layout/layout";
import SpinnerLoader from "../components/loaders/SpinnerLoader";
import { useSingleNews } from "../hooks/useSingleNews";
import NewsComment from "../components/news/NewsComment";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const SingleNewsPage = () => {
  const { id } = useParams();
  const { news, loading, error, postComment } = useSingleNews(id);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);

  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerLoader size={80} color="yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-medium">
        {error}
      </div>
    );
  }

  const handlePostComment = async () => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty ");
      return;
    }

    setPosting(true);
    try {
      await postComment(commentText);
      setCommentText("");
    } catch (err) {
      toast.error("Failed to post comment. Try again.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-10 px-2">
        {/* Headline */}
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-gray-900 leading-snug">
          {news.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-6 border-b pb-3">
          <p>
        {" "}
            |{" "}
            {new Date(news.published_at || news.created_at).toLocaleDateString(
              "en-IN",
              { day: "numeric", month: "long", year: "numeric" }
            )}
          </p>
          {news.categories && (
            <Link
              to={`/category/${news.categories.slug}`}
              className="text-yellow-600 font-medium hover:underline"
            >
              {news.categories.name}
            </Link>
          )}
        </div>

        {/* Featured image */}
        {news.image && (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${news.image}`}
            alt={news.title}
            className="rounded-lg w-full max-h-[450px] object-cover mb-6 shadow"
          />
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-10">
          {news.content.split("\n").map((para, idx) => (
            <p key={idx} className="mb-4">
              {para}
            </p>
          ))}
        </article>

        {/* Share buttons */}
        <div className="flex items-center gap-4 mb-12 border-t pt-4">
          <span className="text-gray-600 flex items-center gap-2">
            <Share2 size={18} /> Share:
          </span>
          <a
            href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <Facebook />
          </a>
          <a
            href={`https://twitter.com/share?url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="text-sky-500 hover:text-sky-700"
          >
            <Twitter />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 hover:text-blue-900"
          >
            <Linkedin />
          </a>
        </div>

        {/* Comments Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MessageCircle size={22} /> Comments
          </h2>

          {/* Add comment */}
          {user ? (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <textarea
                placeholder="Write a comment..."
                className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                onClick={handlePostComment}
                disabled={posting}
                className="mt-3 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {posting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mb-6">
              You must{" "}
              <Link to="/login" className="text-blue-600 font-medium">
                log in
              </Link>{" "}
              to post a comment.
            </p>
          )}

          {/* List comments */}
          {news.comments && news.comments.length > 0 ? (
            <div className="space-y-4">
              {news.comments.map((comment) => (
                <NewsComment key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default SingleNewsPage;
