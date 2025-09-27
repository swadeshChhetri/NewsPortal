import { Link } from "react-router-dom";
import SkeletonCard from "../../../components/loaders/SkeletonCard";

// Helper to show relative time
const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${
      Math.floor(diff / 3600) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(diff / 86400)} day${
    Math.floor(diff / 86400) > 1 ? "s" : ""
  } ago`;
};

const CategoryHighlights = ({ categories }) => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-400 pl-2">
        Category Highlights
      </h2>

      {categories.length > 0 ? (
        categories.map((cat) => (
          <div key={cat.slug} className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <Link
                to={`/category/${cat.slug}`}
                className="text-yellow-600 text-sm font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.news.slice(0, 3).map((item) => (
                <Link
                  key={item._id}
                  to={`/news/${item._id}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                    />

                    {/* Highlight badge */}
                    {item.is_highlight && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
                        HIGHLIGHT
                      </span>
                    )}
                  </div>

                  <div className="p-3 flex flex-col flex-grow space-y-2">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 hover:text-yellow-600 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-700 line-clamp-3">
                      {item.content || "No description available."}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <span>Published: {timeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} height="h-48" />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryHighlights;
