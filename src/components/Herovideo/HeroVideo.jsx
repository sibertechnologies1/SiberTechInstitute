import React from "react";
import bg2 from "../Herovideo/bg2.jpg";

function HeroVideo() {
  return (
   <div>
     <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={bg2}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 bg-fixed"
        alt="Background"
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center md:mx-[6rem] h-full text-white px-4">
       <div className=" max-w-[600px]">
         <h4 className=" text-[1.5rem]">Hello Students</h4>
        <h1 className="text-3xl sm:text-5xl font-bold">Welcome to Technology</h1>
        <p className="my-[2rem] text-xl ">This is the official educational website  for Siber Techs Institute, a modern tech training facility dedicated to nurturing the next generation of innovators.</p>
           <a href="#" className="rounded-full bg-[#172554] text-white font-bold uppercase px-6 py-3 mt-[rem]">Join Us NOW</a>
       </div>
      </div>
    </section>
   </div>
  );
}

export default HeroVideo;
