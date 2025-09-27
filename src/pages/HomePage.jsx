import SpinnerLoader from "../components/loaders/SpinnerLoader";

import NewsHighlights from "../features/news/components/NewsHighlights";
import LatestNews from "../features/news/components/LatestNews";
import PopularNewsSidebar from "../features/news/components/PopularNewsSidebar";
import CategoryHighlights from "../features/news/components/CategoryHighlights";

import { useNewsHighlights } from "../features/news/hooks/useNewsHighlights";
import { useLatestNews } from "../features/news/hooks/useLatestNews";
// import { useCategoryHighlights } from "../features/news/hooks/useCategoryHighlights";
import MainLayout from "../components/layout/Mainlayout";


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

  const groupedHighlights = newsHighlights.reduce((acc, news) => {
    const categoryName = news.category_id?.name || "Uncategorized";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(news);
    return acc;
  }, {});

  const groupedHighlightsArray = Object.entries(groupedHighlights).map(
    ([name, news]) => ({
      name,
      slug: news[0]?.category_id?.slug || "uncategorized",
      news,
    })
  );

  // const loading = highlightsLoading || latestLoading || categoryLoading;
  // const error = highlightsError || latestError || categoryError;

  // if (loading) return <SpinnerLoader size={60} color="yellow-500" />;

  return (
    <MainLayout className="font-sans bg-gray-50 text-gray-800">
      {/* {error && <p className="text-red-600 text-center">{error}</p>} */}

      <NewsHighlights newsHighlights={newsHighlights} />

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <LatestNews newsList={latestNews} />
        <PopularNewsSidebar newsList={latestNews} />
      </section>

      <CategoryHighlights categories={groupedHighlightsArray} />
    </MainLayout>
  );
};

export default Home;
