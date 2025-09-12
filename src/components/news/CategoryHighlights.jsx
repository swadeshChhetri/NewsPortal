import { Link } from "react-router-dom";
import SkeletonCard from "../loaders/SkeletonCard";

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
            <div className="grid sm:grid-cols-3 gap-6">
              {cat.news.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                    alt={item.title}
                    className="rounded-t-lg w-full h-45 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} height="h-40" />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryHighlights;
