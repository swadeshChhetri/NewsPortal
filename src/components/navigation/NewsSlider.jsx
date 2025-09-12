import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import NewsCard from "../news/NewsCard";


const NewsSlider = ({
  newsList,
  slidesPerView,
  breakpoints,
  autoPlay = false,
  autoplayDelay = 3000,
  loop = true,
  height,
  navigation = true,
  pagination = false,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative">
      {navigation && (
        <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none z-10">
          <button
            ref={prevRef}
            className="bg-white p-3 rounded-full shadow hover:bg-yellow-400 transition pointer-events-auto"
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
            className="bg-white p-3 rounded-full shadow hover:bg-yellow-400 transition pointer-events-auto"
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
      
        className="rounded-lg"
      >
        {newsList.map((news, idx) => {
          // Pick correct image URL

          return (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full" >
                <NewsCard key={news.id} item={news}  />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default NewsSlider;
