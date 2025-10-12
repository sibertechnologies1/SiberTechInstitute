import React, { useState } from "react";

function Hero2() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Our Programs & Courses",
      content:
        "Siber Techs Institute offers innovative programs in IT, networking, software development, and modern technologies. Each course blends theory with hands-on skills to prepare students for real-world challenges.",
    },
    {
      title: "Student Opportunities",
      content:
        "We provide pathways for internships, mentorships, and industry collaborations. Students gain practical experience and connections that help them succeed after graduation.",
    },
    {
      title: "Join Our Tech Community",
      content:
        "Our students are part of a vibrant community of innovators and tech enthusiasts. Through workshops, events, and networking, we create a culture of growth and collaboration.",
    },
  ];

  return (
    <div className="hero2 w-full relative">
      <div className="content max-w-7xl mx-auto px-6 md:px-12 py-16 grid lg:grid-cols-2 grid-cols-1 gap-12 md:gap-20 relative z-10">
        {/* Left Section - Cards */}
        <div className="flex flex-col gap-8">
          {/* Card 1 */}
          <div className="flex flex-col w-full px-6 py-10 bg-[#475569]/70 rounded-2xl shadow-lg">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
              APPLY FOR BACHELOR DEGREE
            </h1>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed text-justify">
              Begin your journey at Siber Techs Institute with our Bachelor’s
              programs, designed to build a strong foundation in technology,
              problem-solving, and innovation.
            </p>
            <a
              href="#"
              className="mt-6 inline-block rounded-full bg-[#172554] hover:bg-[#0f172a] transition text-white font-bold uppercase px-6 py-3 w-fit"
            >
              JOIN US NOW
            </a>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col w-full px-6 py-10 bg-[#475569]/70 rounded-2xl shadow-lg">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
              APPLY FOR MASTER’S DEGREE
            </h1>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed text-justify">
              Advance your expertise with our Master’s program, combining deep
              technical knowledge with leadership and real-world problem-solving.
            </p>
            <a
              href="#"
              className="mt-6 inline-block rounded-full bg-[#172554] hover:bg-[#0f172a] transition text-white font-bold uppercase px-6 py-3 w-fit"
            >
              JOIN US NOW
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-orange-500">
            About Siber Techs Institute
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
            At Siber Techs Institute, we are dedicated to nurturing the next
            generation of innovators and technology leaders. Our mission is to
            provide quality education, practical training, and career
            opportunities that empower students to excel in the digital world.
          </p>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Accordion */}
          <div className="flex flex-col divide-y divide-gray-200">
            {accordionItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center py-3 w-full text-left focus:outline-none"
                >
                  <span className="font-bold text-gray-800">{item.title}</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-90" : ""
                    } text-gray-500`}
                  >
                    ›
                  </span>
                </button>
                {openIndex === index && (
                  <div className="py-2 text-gray-600 text-sm text-justify">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
