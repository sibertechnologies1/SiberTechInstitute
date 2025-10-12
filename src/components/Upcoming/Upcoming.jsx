import React from 'react'
import Img1 from '../Upcoming/Img1.jpg'
import Img2 from '../Upcoming/Img2.jpg'
import Img3 from '../Upcoming/Img3.jpg'
import Img4 from '../Upcoming/Img4.jpg'

function Upcoming() {
  return (
    <div className="relative z-10 md:mt-[15rem] mt-[4rem]">
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide border-b border-b-zinc-50 py-6">
              Upcoming Meetings
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="bg-white rounded-2xl md:h-[360px] shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Meeting Categories
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="block text-gray-600 hover:text-red-600">Leadership & Management</a></li>
                <li><a href="#" className="block text-gray-600 hover:text-red-600">Education & Training</a></li>
                <li><a href="#" className="block text-gray-600 hover:text-red-600">Technology in Learning</a></li>
                <li><a href="#" className="block text-gray-600 hover:text-red-600">Community Engagement</a></li>
                <li><a href="#" className="block text-gray-600 hover:text-red-600">Innovation & Research</a></li>
              </ul>
              <button className="w-full mt-10 bg-[#172554] hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition">
                All Upcoming Meetings
              </button>
            </aside>

            {/* Meeting Cards */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <div className="relative">
                  <img src={Img1} alt="New Lecturers Meeting" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 left-2 bg-[#172554] text-white px-3 py-1 text-sm font-semibold rounded-full">$22.00</span>
                </div>
                <div className="p-4">
                  <span className="block text-sm text-gray-500">NOV 10</span>
                  <h4 className="font-bold text-gray-800 mt-1">New Lecturers Meeting</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    A special orientation session for new lecturers to discuss teaching methods,
                    faculty expectations, and strategies for effective classroom management.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <div className="relative">
                  <img src={Img2} alt="Online Teaching Techniques" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 left-2 bg-[#172554] text-white px-3 py-1 text-sm font-semibold rounded-full">$36.00</span>
                </div>
                <div className="p-4">
                  <span className="block text-sm text-gray-500">NOV 24</span>
                  <h4 className="font-bold text-gray-800 mt-1">Online Teaching Techniques</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Learn innovative digital teaching tools, virtual engagement methods, and
                    effective online classroom management practices for modern educators.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <div className="relative">
                  <img src={Img3} alt="Higher Education Conference" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 left-2 bg-[#172554] text-white px-3 py-1 text-sm font-semibold rounded-full">$14.00</span>
                </div>
                <div className="p-4">
                  <span className="block text-sm text-gray-500">NOV 26</span>
                  <h4 className="font-bold text-gray-800 mt-1">Higher Education Conference</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    A national conference bringing together leaders, researchers, and students to
                    share insights on the future of higher education and institutional growth.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <div className="relative">
                  <img src={Img4} alt="Student Training Meetup" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 left-2 bg-[#172554] text-white px-3 py-1 text-sm font-semibold rounded-full">$48.00</span>
                </div>
                <div className="p-4">
                  <span className="block text-sm text-gray-500">NOV 30</span>
                  <h4 className="font-bold text-gray-800 mt-1">Student Training Meetup</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    A collaborative meetup for students to develop leadership, teamwork, and
                    presentation skills through interactive workshops and real-life simulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Upcoming
