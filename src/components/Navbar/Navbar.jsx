import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ import Link for React Router

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Track scroll for fade effect
  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = window.scrollY;
      let opacity = Math.min(scrollTop / 150, 1);
      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Meetings", path: "/meetings" },
    { name: "Apply Now", path: "/apply" },
    { name: "Pages", path: "/pages" },
    { name: "Courses", path: "/courses" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header
      className="fixed top-[3rem] left-0 w-full z-50 transition-colors duration-300"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
        boxShadow: bgOpacity > 0.3 ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        backdropFilter: bgOpacity < 0.2 ? "blur(6px)" : "none",
      }}
    >
      <div className="flex justify-between items-center h-[5rem] px-5">
        {/* Logo */}
        <h1
          className={`font-bold lg:text-[2rem] text-[1.5rem] transition-colors duration-300 ${
            bgOpacity > 0.5 ? "text-gray-900" : "text-white"
          }`}
        >
          <Link to="/" className="hover:text-orange-500">
            Siber Techs
          </Link>
        </h1>

        {/* Desktop Menu */}
        <nav aria-label="Main Navigation" className="hidden md:block">
          <ul className="flex gap-6">
            {navLinks.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`uppercase font-semibold transition-colors duration-300 ${
                    bgOpacity > 0.5
                      ? "text-gray-900 hover:text-orange-500"
                      : "text-white hover:text-orange-400"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`text-2xl md:hidden z-50 transition-colors duration-300 ${
            bgOpacity > 0.5 ? "text-gray-900" : "text-white"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-[5rem] left-0 w-full md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${bgOpacity > 0.5 ? "bg-white/95" : "bg-[#172554] backdrop-blur-md"}`}
      >
        <ul className="flex flex-col gap-4 p-5">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`block uppercase font-semibold transition-colors duration-300 ${
                  bgOpacity > 0.5
                    ? "text-gray-900 hover:text-orange-500"
                    : "text-white hover:text-orange-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
