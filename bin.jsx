// 🔥 How to Use
// 1. Auto slide (1 card at a time)
{/* <NewsSlider
  newsList={latestNews}
  slidesPerView={1}
  autoPlay={true}
  loop={true}
/> */}

// 2. Manual (4 cards, no auto)
// <NewsSlider
//   newsList={popularNews}
//   slidesPerView={4}
//   autoPlay={false}
//   navigation={true}
// />

// 3. Auto + Manual (4 cards, auto + nav)
// <NewsSlider
//   newsList={trendingNews}
//   slidesPerView={4}
//   autoPlay={true}
//   autoplayDelay={4000}
//   loop={true}
//   navigation={true}
// />




// src/pages/CategoryPage.tsx
// import React, { useState } from "react";
// import Navbar from "../components/navigation/Navbar";
// import Footer from "../components/navigation/Footer";
// import { Link } from "react-router-dom";

// const CategoryPage = () => {
//   const categoryName = "Sports";
//   const categoryDesc =
//     "Latest sports updates, match highlights, and player news from around the world.";


//   const trending = ["Messi joins new football club", "Top 10 cricket moments of 2025", "Why eSports is booming", "NBA finals predictions"];
//   const categories = ["World", "Life", "Tech", "Travel", "Money", "Sports", "Entertainment"];

//   // ✅ Pagination logic
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(newsList.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = newsList.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <>
//       <Navbar />

//       <div className="font-sans bg-gray-50 text-gray-800 pt-32">
//         {/* Breadcrumbs */}
//         <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500">
//           <Link to="/" className="hover:text-yellow-600 transition-colors font-medium">
//             Home
//           </Link>{" "}z
//           / <span className="text-gray-900 font-medium">{categoryName}</span>
//         </div>

//         {/* Category Title */}
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <h2 className="text-3xl font-bold text-yellow-600 mb-2">{categoryName} News</h2>
//           <p className="text-gray-600">{categoryDesc}</p>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* News List */}
//           <div className="lg:col-span-3">
//             <div className="grid sm:grid-cols-4 gap-4">
//               {currentItems.map((news, idx) => (
//                 <div key={idx} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full">
//                   <img src={news.img} alt={news.title} className="rounded-t-lg w-full object-cover h-40" />
//                   <div className="p-4 flex flex-col flex-grow">
//                     <span className="text-[10px] uppercase text-yellow-600 font-semibold">{news.tag}</span>
//                     <h3 className="text-sm font-semibold mt-1 mb-1 leading-snug line-clamp-2">{news.title}</h3>
//                     <p className="text-xs text-gray-600 leading-relaxed flex-grow line-clamp-3">{news.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center mt-8 space-x-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 className="px-3 py-1 border rounded hover:bg-gray-200"
//               >
//                 Prev
//               </button>

//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-yellow-500 text-white" : "hover:bg-gray-200"}`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 className="px-3 py-1 border rounded hover:bg-gray-200"
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <aside className="space-y-8">
//             {/* Trending */}
//             <div className="bg-white p-4 rounded-lg shadow">
//               <h3 className="text-lg font-bold mb-3">Trending</h3>
//               <ul className="space-y-2 text-sm">
//                 {trending.map((item, idx) => (
//                   <li key={idx} className="hover:text-yellow-600 cursor-pointer border-b pb-2">
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Categories */}
//             <div className="bg-white p-4 rounded-lg shadow">
//               <h3 className="text-lg font-bold mb-3">Categories</h3>
//               <ul className="space-y-2 text-sm">
//                 {categories.map((cat, idx) => (
//                   <li key={idx} className="hover:text-yellow-600 cursor-pointer border-b pb-2">
//                     {cat}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </aside>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default CategoryPage;



 {/* 
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet bg-gray-400 opacity-70 w-3 h-3 rounded-full mx-1",
              bulletActiveClass:
                "swiper-pagination-bullet-active bg-yellow-400 opacity-100",
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            loop
            className="rounded-lg relative"
          >
            {/* Slide 1 *
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://verpex.com/assets/uploads/images/blog/What-is-a-Hero-Section-on-a-Website.webp?v"
                  alt="hero-news"
                  className="rounded-lg w-full max-h-96 object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-white p-6 rounded-lg shadow max-w-md">
                  <h3 className="text-xl font-semibold mb-2">
                    ChatGPT passes exams from law and business schools
                  </h3>
                  <p className="text-sm text-gray-600">
                    ChatGPT is smart enough to pass prestigious graduate-level
                    exams though not with particularly high marks...
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 *
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://ichef.bbci.co.uk/images/ic/raw/p0g6qbw7.jpg"
                  alt="hero-news"
                  className="rounded-lg w-full max-h-96 object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-white p-6 rounded-lg shadow max-w-md">
                  <h3 className="text-xl font-semibold mb-2">
                    AI shaping the future of jobs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Experts discuss how artificial intelligence is transforming
                    industries and creating new opportunities...
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 *
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://about.fb.com/wp-content/uploads/2024/02/Facebook-News-Update_US_AU_Header.jpg"
                  alt="hero-news"
                  className="rounded-lg w-full max-h-96 object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-white p-6 rounded-lg shadow max-w-md">
                  <h3 className="text-xl font-semibold mb-2">
                    Sports industry embraces new tech
                  </h3>
                  <p className="text-sm text-gray-600">
                    From wearable devices to AI analytics, technology is
                    redefining how fans and players experience sports...
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper> 
          
          */}

    // Group by tag
  // const groupedByTag = newsList.reduce((acc, news) => {
  //   if (!acc[news.tag]) acc[news.tag] = [];
  //   acc[news.tag].push(news);
  //   return acc;
  // }, {}); // Convert to array format const

  // categoryHighlights = Object.keys(groupedByTag).map((tag) => ({
  //   category: tag,
  //   slug: tag.toLowerCase(),
  //   news: groupedByTag[tag],
  // }));


      {/* Multimedia */}
        {/* {multimediaList.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-400 pl-2">
              Multimedia
            </h2>
            <NewsSlider
              newsList={multimediaList}
              slidesPerView={4}
              autoPlay
              loop
              navigation
              autoplayDelay={4000}
            />
          </section>
        )} */}
