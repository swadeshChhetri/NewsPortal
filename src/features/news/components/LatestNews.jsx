import NewsSlider from "../../../components/navigation/NewsSlider";
import SkeletonCard from "../../../components/loaders/SkeletonCard";

const LatestNews = ({ newsList }) => {
  return (
    <section className="lg:col-span-3 py-10">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-400 pl-2">
        Latest News
      </h2>
      {newsList.length > 0 ? (
        <NewsSlider
          newsList={newsList}
          slidesPerView={4}
          autoPlay={false}
          navigation
          height="40"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} height="h-40" />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestNews;
