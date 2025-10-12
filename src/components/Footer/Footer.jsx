import React from "react";

function Footer() {
  return (
    <footer className="bg-[#0f172a]/75 text-center border-t border-gray-700 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-gray-300 text-sm md:text-base capitalize">
          Copyright © {new Date().getFullYear()} <span className="font-semibold text-white">Siber Techs Institute</span>. All Rights Reserved.
        </p>

        <p className="text-gray-400 text-sm mt-2 capitalize">
          Owned By{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-500 font-medium transition capitalize"
          >
            Siber Technologies
          </a>{" "}
          | Developed By{" "}
          <a
            href="#"
            className="text-yellow-400 hover:text-yellow-500 font-medium transition "
          >
            Grat Dimafa
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
