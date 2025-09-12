import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerLoader from "../components/loaders/SpinnerLoader";
import Layout from "../components/layout/layout";
import NewsCard from "../components/news/NewsCard";
import CategorySidebar from "../components/sidebar/CategorySidebar";

import { useCategoryNews } from "../hooks/useCategoryNews";

const CategoryPage = () => {
  const { slug } = useParams();
  const { news, category, loading, error } = useCategoryNews(slug);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil((news?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = news?.slice(startIndex, startIndex + itemsPerPage) || [];

  const sideLinks = [
    { name: "News", slug: "news" },
    { name: "Life", slug: "life" },
    { name: "Tech", slug: "tech" },
    { name: "Travel", slug: "travel" },
    { name: "Money", slug: "money" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
  ];

  if (loading) return <SpinnerLoader size={60} color="yellow-500" />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <Layout>
      <div className="pt-8 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">
          {category} News
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* News List */}
          <div className="lg:col-span-3 grid sm:grid-cols-4 gap-4">
            {currentItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <CategorySidebar sideLinks={sideLinks} />
          </aside>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
