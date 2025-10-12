import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";

const cards = [
  {
    title: "Best Education",
    desc: "At Siber Techs Institute, we provide world-class IT education designed to blend theory with hands-on practice. Our programs focus on practical skills, creativity, and innovation. We empower students to excel academically while preparing them for real-world opportunities.",
    icon: <FaGraduationCap className="text-5xl" />,
  },
  {
    title: "Best Teachers",
    desc: "At Siber Techs Institute, our instructors are seasoned industry experts with years of real-world experience. They are dedicated mentors who guide students step by step, combining technical expertise with personalized support. With their passion for teaching, they inspire learners to achieve their fullest potential in the tech world.",
    icon: <FaChalkboardTeacher className="text-5xl" />,
  },
  {
    title: "Best Students",
    desc: "At Siber Techs Institute, we nurture brilliant minds by fostering creativity, collaboration, and excellence. We build confidence, sharpen skills, and inspire innovation.Our students are prepared to thrive in the fast-changing world of technology",
    icon: <FaUserGraduate className="text-5xl" />,
  },

  {
   title: "Best Networking",
desc: "We provide more than connections — we create lasting relationships. Students engage with peers, mentors, and industry experts through events and projects. Our network empowers growth, insight, and opportunities beyond graduation.",

    icon: <FaUserGraduate className="text-5xl" />,
  },


  {
    title: "Online Meeting",
    desc: "At Siber Techs Institute, we make learning accessible through seamless online meetings and virtual classrooms. Students can connect with instructors and peers from anywhere, ensuring flexibility without compromising quality. Our online platform fosters real-time collaboration, interactive discussions, and engaging tech-driven learning.",
    icon: <FaUserGraduate className="text-5xl" />,
  },
];

export default function HomeCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="md:absolute relative md:bottom-[-15rem] mt-16 w-full px-6 z-">
      <div className="max-w-7xl mx-auto relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="py-6"
        >
          {cards.map((c, i) => (
            <SwiperSlide key={i}>
              <div className="h-[400px] pt-8 pb-4 flex items-center justify-center">
                <div className=" md:w-[28rem] w-full bg-[#172554]/20 backdrop-blur-md rounded- p-10 shadow-2xl text-white text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="rounded-full bg-white/20 w-20 h-20 flex items-center justify-center">
                      {c.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{c.title}</h3>
                    <p className="text-base opacity-90">{c.desc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev / Next buttons */}
        <button
          ref={prevRef}
          className="absolute left-[-1rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center z-[60]"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          ref={nextRef}
          className="absolute right-[-1rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center z-[60]"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
