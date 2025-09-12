import SpinnerLoader from "../components/loaders/SpinnerLoader";

import NewsHighlights from "../components/news/NewsHighlights";
import LatestNews from "../components/news/LatestNews";
import PopularNewsSidebar from "../components/news/PopularNewsSidebar";
import CategoryHighlights from "../components/news/CategoryHighlights";

import { useNewsHighlights } from "../hooks/useNewsHighlights";
import { useLatestNews } from "../hooks/useLatestNews";
import { useCategoryHighlights } from "../hooks/useCategoryHighlights";
import Layout from "../components/layout/layout";

const Home = () => {
  const {
    newsHighlights,
    loading: highlightsLoading,
    error: highlightsError,
  } = useNewsHighlights();
  const {
    latestNews,
    loading: latestLoading,
    error: latestError,
  } = useLatestNews();
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryHighlights();

  const loading = highlightsLoading || latestLoading || categoryLoading;
  const error = highlightsError || latestError || categoryError;

  if (loading) return <SpinnerLoader size={60} color="yellow-500" />;

  return (
    <Layout className="font-sans bg-gray-50 text-gray-800">
      {error && <p className="text-red-600 text-center">{error}</p>}

      <NewsHighlights newsHighlights={newsHighlights} />

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <LatestNews newsList={latestNews} />
        <PopularNewsSidebar newsList={latestNews} />
      </section>

      <CategoryHighlights categories={categories} />
    </Layout>
  );
};

export default Home;
