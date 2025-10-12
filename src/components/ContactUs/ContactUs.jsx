import React from "react";

function ContactUs() {
  return (
    <section className="py-16 bg-[#0f172a]/75">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        
        {/* Contact Form */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            LET&apos;S GET IN TOUCH
          </h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name...*" required
                className="w-full border rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email..." required
                className="w-full border rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Subject...*" required
                className="w-full border rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Your Message..." required
              rows="6"
              className="w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-[#172554] hover:bg-[#172554]/70 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              SEND MESSAGE NOW
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-[#172554] text-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <h4 className="font-semibold">Phone Number</h4>
            <p className="text-lg">0502 156 703</p>
          </div>
          <div>
            <h4 className="font-semibold">Email Address</h4>
            <p className="text-lg">info@sibertechs.edu</p>
          </div>
          <div>
            <h4 className="font-semibold">Street Address</h4>
            <p className="text-lg">Bolgatanga, UER, Ghana</p>
          </div>
          <div>
            <h4 className="font-semibold">Website URL</h4>
            <p className="text-lg">www.sibertechs.edu</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
