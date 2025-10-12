import React from "react";
import { FaFacebookF, FaTwitter, FaBehance, FaLinkedinIn } from "react-icons/fa6";

function Header() {
  return (
    <div className="fixed top-0 left-0 w-full h-[3rem] bg-gray-800 flex justify-center sm:justify-between items-center px-4 z-[70]">
      {/* Left text */}
      <div className="hidden sm:block">
        <h4 className="text-white font-semibold text-sm">
          Siber Techs Institute is a tech facility for tech lovers
        </h4>
      </div>

      {/* Social Icons */}
      <div className="flex flex-row justify-center text-white gap-4 text-lg">
        <FaFacebookF className="cursor-pointer hover:text-orange-400 transition-colors duration-300" aria-label="Facebook" />
        <FaTwitter className="cursor-pointer hover:text-orange-400 transition-colors duration-300" aria-label="Twitter" />
        <FaBehance className="cursor-pointer hover:text-orange-400 transition-colors duration-300" aria-label="Behance" />
        <FaLinkedinIn className="cursor-pointer hover:text-orange-400 transition-colors duration-300" aria-label="LinkedIn" />
      </div>
    </div>
  );
}

export default Header;
