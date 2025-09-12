import { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout/layout";
import SpinnerLoader from "../components/loaders/SpinnerLoader";
import SkeletonCard from "../components/loaders/SkeletonCard";
import NewsCard from "../components/news/NewsCard";
import Pagination from "../components/pagination/pagination";

import { useSearchResults } from "../hooks/useSearchResults";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const { results, loading, error } = useSearchResults(query);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil((results?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems =
    results?.slice(startIndex, startIndex + itemsPerPage) || [];

  if (loading) return <SpinnerLoader size={60} color="yellow-500" />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <Layout>
      {/* Heading */}
      <div className="w-full mx-auto px-6 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Search Results for:{" "}
          <span className="text-yellow-600 italic">"{query}"</span>
        </h2>
        <p className="text-gray-600 text-sm">
          Showing results related to your search.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {/* Sidebar placeholder */}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Layout>
  );
};

export default SearchResults;
