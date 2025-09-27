import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { Link } from "react-router-dom";

const NewsSlider = ({
  newsList,
  slidesPerView,
  breakpoints,
  autoPlay = false,
  autoplayDelay = 3000,
  loop = true,
  navigation = true,
  pagination = false,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);

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
    <div className="relative">
      {navigation && (
        <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none z-20">
          <button
            ref={prevRef}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow hover:bg-yellow-400 transition pointer-events-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            ref={nextRef}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow hover:bg-yellow-400 transition pointer-events-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        autoplay={
          autoPlay
            ? { delay: autoplayDelay, disableOnInteraction: false }
            : false
        }
        loop={loop}
        pagination={pagination ? { clickable: true } : false}
        onSwiper={(swiper) => {
          if (navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        className="rounded-xl"
      >
        {newsList.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative rounded-xl overflow-hidden group h-64 sm:h-72 md:h-80 shadow-lg hover:shadow-2xl transition">
              {/* Image */}
              <Link to={`/news/${item._id}`} className="block h-full w-full">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />

                {/* Highlight badge */}
                {item.is_highlight && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded shadow">
                    HIGHLIGHT
                  </span>
                )}

                {/* Category badge */}
                {item.category_id?.name && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                    {item.category_id.name.toUpperCase()}
                  </span>
                )}
              </Link>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-black/25 p-4 text-white z-10">
                <h3 className="text-lg font-bold line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  <Link to={`/news/${item._id}`}>{item.title}</Link>
                </h3>

                <p className="text-sm text-gray-200 line-clamp-2 mt-1">
                  {item.content || "No description available."}
                </p>

                <div className="flex items-center justify-between text-xs mt-2 text-gray-300">
                  <span>Published: {timeAgo(item.createdAt)}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsSlider;
