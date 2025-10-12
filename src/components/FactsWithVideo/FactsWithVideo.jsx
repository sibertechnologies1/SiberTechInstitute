import React from "react";
import { FaPlay } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import bgImage from "../FactsWithVideo/bgImage.jpg"; // replace with your actual background image
import videoThumb from "../FactsWithVideo/videoThumb.png"; // replace with your video thumbnail

function FactsWithVideo() {
  const stats = [
    { number: 94, suffix: "%", label: "Successed Students" },
    { number: 2345, suffix: "", label: "New Students" },
    { number: 126, suffix: "", label: "Current Teachers" },
    { number: 32, suffix: "", label: "Awards" },
  ];

  // Track when the stats section is visible
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  return (
    <section
      className="relative py-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Side - Stats */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            A Few Facts About Our University
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 rounded-xl p-6 text-center shadow-lg"
              >
                <h3 className="text-2xl font-extrabold text-[#172554]">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={item.number}
                      duration={2.5}
                      suffix={item.suffix}
                    />
                  ) : (
                    "0"
                  )}
                </h3>
                <p className="text-gray-200 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Video */}
        <div className="relative">
          <img
            src={videoThumb}
            alt="Campus Video"
            className="rounded-xl shadow-lg"
          />
          <button className="absolute inset-0 flex items-center justify-center">
            <span className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition">
              <FaPlay size={20} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FactsWithVideo;
