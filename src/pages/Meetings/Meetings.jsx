// src/pages/Meetings/Meetings.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";
import Img1 from "../Meetings/Img1.jpg";
import Img2 from "../Meetings/Img2.jpg";
import Img3 from "../Meetings/Img3.jpg";
import Img4 from "../Meetings/Img4.jpg";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ChatWidget from "../../components/ChatWidget/ChatWidget";

const Meetings = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [showForm, setShowForm] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // meetings dataset — note `isPast` controls registration availability
  const meetings = {
    Upcoming: [
      {
        id: "m-lect-2025-11-10",
        title: "New Lecturers Orientation",
        date: "Nov 10, 2025",
        time: "10:00 AM - 2:00 PM",
        speakers: "Prof. Samuel Adjei & Dr. Ama Owusu",
        venue: "Main Auditorium, Block A",
        image: Img1,
        isPast: false,
        description:
          "A welcome and orientation for newly hired lecturers. Topics: pedagogy, policies, and campus systems.",
      },
      {
        id: "m-digital-2025-11-18",
        title: "Digital Teaching Workshop",
        date: "Nov 18, 2025",
        time: "9:00 AM - 1:00 PM",
        speakers: "Mr. Kwame Aboagye",
        venue: "ICT Lab 2",
        image: Img2,
        isPast: false,
        description:
          "Hands-on workshop for digital tools and modern teaching techniques for blended learning.",
      },
      {
        id: "m-network-2025-12-05",
        title: "Practical Networking Bootcamp",
        date: "Dec 5, 2025",
        time: "9:00 AM - 4:00 PM",
        speakers: "Eng. Yaw Mensah",
        venue: "Network Lab",
        image: Img4,
        isPast: false,
        description:
          "One-day intensive bootcamp on network fundamentals, labs and real-world scenarios.",
      },
    ],
    Past: [
      {
        id: "m-higher-2025-09-24",
        title: "Higher Education Seminar",
        date: "Sep 24, 2025",
        time: "1:00 PM - 4:00 PM",
        speakers: "Dr. Linda Asare",
        venue: "Conference Hall B",
        image: Img3,
        isPast: true,
        description: "A seminar on trends and research in higher education.",
      },
      {
        id: "m-ai-2025-08-18",
        title: "AI in Education Roundtable",
        date: "Aug 18, 2025",
        time: "10:00 AM - 12:00 PM",
        speakers: "Panel of Industry Experts",
        venue: "Seminar Room 1",
        image: Img3,
        isPast: true,
        description: "Participants discussed AI use-cases and challenges in teaching.",
      },
    ],
    Workshops: [
      {
        id: "m-student-2025-11-30",
        title: "Student Training Meetup",
        date: "Nov 30, 2025",
        time: "11:00 AM - 3:00 PM",
        speakers: "Eng. Bright Koomson",
        venue: "Engineering Block",
        image: Img4,
        isPast: false,
        description: "Training meetup with practical sessions for students.",
      },
    ],
    Conferences: [
      {
        id: "m-tech-2025-12-15",
        title: "Tech & Innovation Summit",
        date: "Dec 15, 2025",
        time: "8:30 AM - 5:00 PM",
        speakers: "Industry Leaders (Panel)",
        venue: "Auditorium 1",
        image: Img3,
        isPast: false,
        description: "Flagship summit covering innovation and tech trends.",
      },
    ],
  };

  // When user clicks register: if meeting is past, show message; otherwise open modal
  const onClickRegister = (meeting) => {
    if (meeting.isPast) {
      setFeedback({
        type: "error",
        message: "This meeting is in the past and is no longer available for registration.",
      });
      // auto-clear after a few seconds
      setTimeout(() => setFeedback(null), 4500);
      return;
    }
    setSelectedMeeting(meeting);
    setShowForm(true);
    setFeedback(null);
  };

  // Registration submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const { name, email, phone } = formData;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFeedback({ type: "error", message: "Please complete all fields." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFeedback({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);

    try {
      // send payload to your backend (update URL if necessary)
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        meeting: selectedMeeting?.title || activeTab,
      };

      // debug log (browser console)
      // console.log("Sending:", payload);

      const res = await fetch("https://sibertechsinstitute.great-site.net/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "omit",
      });

      // sometimes server returns HTML on error -> guard
      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response: " + text.slice(0, 300));
      }

      if (result.success) {
        setFeedback({
          type: "success",
          message:
            "Registration successful! A confirmation email has been sent to you. We'll be in touch with details.",
        });
        setFormData({ name: "", email: "", phone: "" });
        setTimeout(() => {
          setShowForm(false);
          setFeedback(null);
        }, 2500);
      } else {
        setFeedback({ type: "error", message: result.message || "Registration failed." });
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message:
          "An error occurred while submitting. Please try again or contact us at sibertechs@gmail.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Partner logos and links (replace image URLs with local assets if desired)
  const partners = [
    {
      name: "Google",
      href: "https://google.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Microsoft",
      href: "https://microsoft.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Zoom",
      href: "https://zoom.us",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Zoom_Communications_Logo.svg",
    },
    {
      name: "GitHub",
      href: "https://github.com",
      logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    {
      name: "AWS",
      href: "https://aws.amazon.com",
      logo: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
    },
  ];

  return (
    <div>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-600/30 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Page header */}
          <div className="text-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Meetings & Events
            </motion.h1>
            <p className="mt-4 text-white max-w-3xl mx-auto">
              Join training sessions, workshops, and conferences — connect with educators and industry
              experts. Register for events that match your interests.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {Object.keys(meetings).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                  activeTab === tab
                    ? "bg-[#172554] text-white shadow"
                    : "bg-white text-[#172554] border border-[#172554] hover:bg-[#172554] hover:text-white"
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.section
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {meetings[activeTab].map((m, i) => (
                <motion.article
                  key={m.id}
                  whileHover={{ translateY: -6 }}
                  className="rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="relative">
                    <img src={m.image} alt={m.title} className="w-full h-48 object-cover" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-sm">
                      {m.date}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{m.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{m.description}</p>

                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" /> <span>{m.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUserTie className="text-gray-400" /> <span>{m.speakers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" /> <span>{m.venue}</span>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => onClickRegister(m)}
                        className={`w-full py-2 rounded-full font-semibold transition ${
                          m.isPast
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-[#172554] text-white hover:bg-[#0f172a]"
                        }`}
                        aria-disabled={m.isPast}
                      >
                        {m.isPast ? "Event Ended" : "Register Now"}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.section>
          </AnimatePresence>

          {/* Featured speakers */}
          <section className="mt-14 text-center">
            <h2 className="text-2xl font-bold text-[#172554] mb-3">Featured Speakers</h2>
            <p className="text-white max-w-3xl mx-auto">
              We invite experienced professionals and educators who bring practical insights and guidance.
            </p>
          </section>

          {/* Partners */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#172554] text-center mb-6">Our Partners</h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {partners.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm hover:scale-105 transition"
                  title={p.name}
                >
                  <img src={p.logo} alt={`${p.name} logo`} className="w-10 h-10 object-contain" />
                  <span className="hidden md:inline text-gray-700 font-medium">{p.name}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Registration Modal */}
      <AnimatePresence>
        {showForm && selectedMeeting && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                setShowForm(false);
                setFeedback(null);
              }}
            />

            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-md p-6 z-10"
              role="dialog"
              aria-modal="true"
              aria-label={`Register for ${selectedMeeting.title}`}
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setFeedback(null);
                }}
                className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
                aria-label="Close registration form"
              >
                &times;
              </button>

              <h3 className="text-xl font-bold text-[#172554] mb-1">
                Register — <span className="text-red-600">{selectedMeeting.title}</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">{selectedMeeting.date} • {selectedMeeting.time}</p>

              <form onSubmit={handleRegister} className="space-y-3">
                <label className="block">
                  <span className="text-sm text-gray-700">Full name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:ring-2 focus:ring-[#172554]"
                    required
                    placeholder="Your full name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-700">Email address</span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:ring-2 focus:ring-[#172554]"
                    required
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-700">Phone number</span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:ring-2 focus:ring-[#172554]"
                    required
                    placeholder="+233 50 123 4567"
                  />
                </label>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg font-semibold ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#172554] text-white hover:bg-[#0f172a]"
                    }`}
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>
                </div>

                {feedback && (
                  <p
                    className={`mt-2 text-center font-medium ${
                      feedback.type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                    role="status"
                  >
                    {feedback.message}
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Meetings;
