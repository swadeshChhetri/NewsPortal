// src/components/news/NewsCard.jsx
import { Link } from "react-router-dom";

const NewsCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <Link
        to={`/news/${item.id}`}
        className="block relative w-full h-48 overflow-hidden rounded-t-lg"
      >
        <img
          src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold mb-1 leading-snug line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed flex-grow line-clamp-3">
          {item.content?.substring(0, 100)}...
        </p>
        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
          {/* Show category instead of just author_id */}
          <span className="font-medium text-gray-700">
            {item.categories?.name || "Uncategorized"}
          </span>
          <span>
            {item.published_at
              ? new Date(item.published_at).toLocaleDateString()
              : new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

