import NewsSlider from "../navigation/NewsSlider";
import SkeletonCard from "../loaders/SkeletonCard";

const NewsHighlights = ({ newsHighlights }) => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-2">
        News Highlights
      </h2>
      {newsHighlights.length > 0 ? (
        <NewsSlider
          newsList={newsHighlights}
          slidesPerView={1}
          autoPlay
          loop
          navigation
          pagination
          height="400px"
        />
      ) : (
        <div className="grid sm:grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} height="h-40" />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsHighlights;
