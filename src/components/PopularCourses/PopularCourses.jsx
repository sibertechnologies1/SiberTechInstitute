import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import img1 from "../PopularCourses/img1.jpg";
import img2 from "../PopularCourses/img2.jpg";
import img3 from "../PopularCourses/img3.jpg";
import img4 from "../PopularCourses/img4.jpg";
import img5 from "../PopularCourses/img5.jpg";

function PopularCourses() {
  const courses = [
    { img: img1, title: "Web Development", price: "$480", rating: 5 },
    { img: img2, title: "Networking", price: "$560", rating: 5 },
    { img: img3, title: "Mobile App Development", price: "$160", rating: 5 },
    { img: img4, title: "Blockchain", price: "$180", rating: 2 },
    { img: img5, title: "Cyber Security", price: "$180", rating: 2 },
  ];

  return (
    <section className="py-12 bg-[#0f172a]/75 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 text-center md:text-left">
          OUR POPULAR COURSES
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md overflow-hidden  hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-[180px]">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-2">
                    {course.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    {/* Rating */}
                    <div className="flex text-yellow-500 text-sm">
                      {"★".repeat(course.rating)}
                      {"☆".repeat(5 - course.rating)}
                    </div>
                    {/* Price */}
                    <span className="text-red-600 font-bold">
                      {course.price}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="hidden md:flex items-center justify-center">
          {/* Prev */}
          <button
            className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
            aria-label="Previous"
          >
            <FaArrowLeft />
          </button>

          {/* Next */}
          <button
            className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
            aria-label="Next"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PopularCourses;
