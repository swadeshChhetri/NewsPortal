import SkeletonCard from "../../../components/loaders/SkeletonCard";

// Helper for relative time
const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
};

const PopularNewsSidebar = ({ newsList }) => {
  return (
    <aside className="lg:col-span-1 space-y-8">
      <div className="bg-white p-4 shadow-lg rounded-xl border border-gray-100 max-h-[400px] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4 border-b pb-2 border-gray-200">
          Popular News
        </h3>
        <ul className="space-y-3">
          {newsList.length > 0
            ? newsList.slice(0, 20).map((item) => (
                <li
                  key={item._id}
                  className="flex items-start gap-3 hover:bg-yellow-50 p-2 rounded-lg cursor-pointer transition"
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex flex-col flex-grow">
                    <h4 className="text-sm font-semibold line-clamp-2 text-gray-800">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 mt-1">
                      {item.category_id?.name || "Uncategorized"} &bull; {timeAgo(item.createdAt)}
                    </span>
                  </div>
                </li>
              ))
            : [1, 2, 3, 4, 5].map((i) => (
                <SkeletonCard key={i} height="h-16 w-full" />
              ))}
        </ul>
      </div>
    </aside>
  );
};

export default PopularNewsSidebar;
