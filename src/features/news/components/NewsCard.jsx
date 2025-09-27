import { Link } from "react-router-dom";

const NewsCard = ({ item }) => {
  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000); // difference in seconds

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

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col h-full">
      {/* Image */}
      <Link
        to={`/news/${item._id}`}
        className="relative w-full h-48 overflow-hidden"
      >
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

        {/* Category badge */}
        {item.category_id?.name && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {item.category_id.name.toUpperCase()}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow space-y-2">
        {/* Title */}
        <h3 className="text-md sm:text-lg font-bold text-gray-900 line-clamp-2 hover:text-yellow-600 transition-colors">
          <Link to={`/news/${item._id}`}>{item.title}</Link>
        </h3>

        {/* Content snippet */}
        <p className="text-sm text-gray-700 line-clamp-3">
          {item.content || "No description available."}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <span>Published: {timeAgo(item.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
