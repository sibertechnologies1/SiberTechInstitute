import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhoneAlt,
  FaFileUpload,
  FaBook,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ChatWidget from "../../components/ChatWidget/ChatWidget";

const SHS_PROGRAMS = [
  "General Science",
  "General Arts",
  "Visual Arts",
  "Business",
  "Agricultural Science",
  "Home Economics",
  "Technical",
];

const CORE_SUBJECTS = [
  "English",
  "Core Mathematics",
  "Integrated Science",
  "Social Studies",
];

const ELECTIVE_SUBJECTS = {
  "General Science": ["Physics", "Chemistry", "Biology", "Elective Mathematics", "ICT"],
  "General Arts": ["Economics", "Government", "Literature", "History", "Geography", "Christian Religious Studies"],
  "Visual Arts": ["Economics", "Geography", "History", "Design & Technology"],
  "Business": ["Accounting", "Economics", "Business Management", "Costing"],
  "Agricultural Science": ["Biology", "Chemistry", "Agriculture", "Animal Husbandry"],
  "Home Economics": ["Food & Nutrition", "Clothing", "Management in Living", "Chemistry"],
  "Technical": ["Technical Drawing", "Electronics", "Metal Work", "Wood Work"],
};

const GRADES = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];

const ApplyNow = () => {
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passportError, setPassportError] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    email: "",
    phone: "",
    shsProgram: "",
    lastSchool: "",
    graduationYear: "",
    enrollmentTerm: "",
    emergencyContact: "",
    extracurriculars: "",
    certificate: null,
    passport: null,
    consent: false,
    coreGrades: {},
    electiveGrades: {},
  });

  useEffect(() => {
    if (formData.shsProgram) {
      setFormData((prev) => ({
        ...prev,
        electiveGrades: {},
      }));
    }
  }, [formData.shsProgram]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name.startsWith("coreGrade_")) {
      const subject = name.split("coreGrade_")[1];
      setFormData((prev) => ({
        ...prev,
        coreGrades: {
          ...prev.coreGrades,
          [subject]: value,
        },
      }));
    } else if (name.startsWith("electiveGrade_")) {
      const subject = name.split("electiveGrade_")[1];
      setFormData((prev) => ({
        ...prev,
        electiveGrades: {
          ...prev.electiveGrades,
          [subject]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : files ? files[0] : value,
      }));
    }
  };

  const validatePassportPhoto = (file) => {
    return new Promise((resolve, reject) => {
      if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
        reject("Only JPG format is allowed for the passport photo.");
        return;
      }

      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width !== 400 || height !== 400) {
          reject("Image must be exactly 400x400 pixels.");
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const corners = [
          ctx.getImageData(0, 0, 1, 1).data,
          ctx.getImageData(width - 1, 0, 1, 1).data,
          ctx.getImageData(0, height - 1, 1, 1).data,
          ctx.getImageData(width - 1, height - 1, 1, 1).data,
        ];

        const threshold = 240;
        for (const pixel of corners) {
          if (pixel[0] < threshold || pixel[1] < threshold || pixel[2] < threshold) {
            reject("Background color must be white.");
            return;
          }
        }

        resolve(true);
      };

      img.onerror = () => {
        reject("Failed to load image for validation.");
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePassportChange = async (e) => {
    const file = e.target.files[0];
    setPassportError(null);
    if (file) {
      try {
        await validatePassportPhoto(file);
        setFormData((prev) => ({ ...prev, passport: file }));
      } catch (error) {
        setPassportError(error);
        setFormData((prev) => ({ ...prev, passport: null }));
      }
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const {
        fullname,
        dob,
        gender,
        nationality,
        address,
        email,
        phone,
        shsProgram,
        lastSchool,
        graduationYear,
        enrollmentTerm,
        emergencyContact,
        consent,
        coreGrades,
      } = formData;

      if (
        !fullname ||
        !dob ||
        !gender ||
        !nationality ||
        !address ||
        !email ||
        !phone ||
        !shsProgram ||
        !lastSchool ||
        !graduationYear ||
        !enrollmentTerm ||
        !emergencyContact
      ) {
        setFeedback({
          type: "error",
          message: "⚠️ Please fill out all required personal and education information fields.",
        });
        return;
      }

      if (!consent) {
        setFeedback({
          type: "error",
          message: "⚠️ You must agree to the terms and conditions to proceed.",
        });
        return;
      }

      for (const subject of CORE_SUBJECTS) {
        if (!coreGrades[subject]) {
          setFeedback({
            type: "error",
            message: `⚠️ Please select a grade for core subject: ${subject}.`,
          });
          return;
        }
      }
    }

    if (step === 2) {
      const electiveSubjects = ELECTIVE_SUBJECTS[formData.shsProgram] || [];
      // Validate all elective subjects have grades selected
      for (const subject of electiveSubjects) {
        if (!formData.electiveGrades[subject]) {
          setFeedback({
            type: "error",
            message: `⚠️ Please select a grade for elective subject: ${subject}.`,
          });
          return;
        }
      }

      if (!formData.certificate) {
        setFeedback({
          type: "error",
          message: "⚠️ Please upload your SHS certificate.",
        });
        return;
      }
      if (!formData.passport) {
        setFeedback({
          type: "error",
          message: "⚠️ Please upload your passport photo.",
        });
        return;
      }
      if (passportError) {
        setFeedback({
          type: "error",
          message: `⚠️ Passport photo issue: ${passportError}`,
        });
        return;
      }
    }

    setFeedback(null);
    setStep((prev) => prev + 1);
  };

  const [showPreview, setShowPreview] = useState(false);

  const prevStep = () => setStep((prev) => prev - 1);


async function handleSubmit(event) {
  event.preventDefault();

  // ✅ Step 1: Check if the backend is online
  const isServerOnline = await checkServerStatus();

  if (!isServerOnline) {
    alert("⚠️ The server is currently unreachable. Please try again later.");
    return;
  }

  // ✅ Step 2: Continue to send your form data
  const formDataToSend = new FormData(event.target);

  try {
    const response = await fetch("https://sibertechsinstitute.great-site.net/register/apply_register.php", {
      method: "POST",
      body: formDataToSend,
    });

    const result = await response.json();
    if (result.success) {
      alert("✅ " + result.message);
    } else {
      alert("⚠️ " + result.message);
    }
  } catch (error) {
    alert("❌ Something went wrong: " + error.message);
  }
}




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("program", formData.shsProgram);
      formDataToSend.append("shsProgram", formData.shsProgram);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("nationality", formData.nationality);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("lastSchool", formData.lastSchool);
      formDataToSend.append("graduationYear", formData.graduationYear);
      formDataToSend.append("enrollmentTerm", formData.enrollmentTerm);
      formDataToSend.append("emergencyContact", formData.emergencyContact);
      formDataToSend.append("extracurriculars", formData.extracurriculars || "");
      formDataToSend.append("coreGrades", JSON.stringify(formData.coreGrades));
      formDataToSend.append("electiveGrades", JSON.stringify(formData.electiveGrades));
      formDataToSend.append("consent", formData.consent ? "Yes" : "No");

      if (formData.certificate) {
        formDataToSend.append("certificate", formData.certificate);
      }
      if (formData.passport) {
        formDataToSend.append("passport", formData.passport);
      }

      const response = await fetch("https://sibertechsinstitute.great-site.net/register/apply_register.php", {
        method: "POST",
        body: formDataToSend,
      });

      const text = await response.text();
      console.log("Raw server response:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response: " + text);
      }

      if (result.success) {
        setFeedback({ type: "success", message: "✅ Application submitted successfully! Check your email." });

        setFormData({
          fullname: "",
          dob: "",
          gender: "",
          nationality: "",
          address: "",
          email: "",
          phone: "",
          shsProgram: "",
          lastSchool: "",
          graduationYear: "",
          enrollmentTerm: "",
          emergencyContact: "",
          extracurriculars: "",
          certificate: null,
          passport: null,
          consent: false,
          coreGrades: {},
          electiveGrades: {},
        });
        setStep(1);
        setShowPreview(false);
      } else {
        setFeedback({
          type: "error",
          message: result.message || "❌ Submission failed. Please check your info and try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFeedback({
        type: "error",
        message: "⚠️ Server error. Please try again later or contact [sibertechs@gmail.com](mailto:sibertechs@gmail.com).",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-600/30 min-h-screen">
      <Header />
      <Navbar />

      <div className="relative  text-white text-center py-24 mt-20 applybg">
        <div className="content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold uppercase"
          >
            Apply for Admission
          </motion.h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 p">
          Start your academic journey with <strong>Siber Techs Institute</strong>.
        </p>
      </div>

      <div className="flex justify-center items-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white  shadow-2xl w-full max-w-4xl p-10 border border-gray-100"
        >
          <form onSubmit={handleSubmit} method="POST">
            {/* Progress Tracker */}
            <div className="flex justify-between items-center mb-10 relative">
              {["Personal Info & Grades", "Upload Certificate & Passport", "Review & Submit"].map((label, index) => (
                <div key={index} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-2 ${
                      step > index + 1
                        ? "bg-[#007bff] text-white border-[#007bff]"
                        : step === index + 1
                        ? "border-[#007bff] text-[#007bff]"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {step > index + 1 ? <FaCheckCircle /> : index + 1}
                  </div>
                  <p className="text-xs mt-2 font-semibold text-gray-600">{label}</p>
                  {index < 2 && (
                    <div
                      className={`absolute top-5 left-[calc(16.6%+10px)] w-[67%] h-1 ${
                        step > index + 1 ? "bg-[#007bff]" : "bg-gray-300"
                      } transition-all`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Personal Info & Grades */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#007bff] mb-6 flex items-center gap-2">
                  <FaUserGraduate /> Step 1: Personal Info & SHS Grades
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal info fields */}
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <textarea
                    name="address"
                    placeholder="Permanent Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none col-span-full"
                    required
                  ></textarea>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <select
                    name="shsProgram"
                    value={formData.shsProgram}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  >
                    <option value="">Select SHS Program</option>
                    {SHS_PROGRAMS.map((prog) => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="lastSchool"
                    placeholder="Last Attended School"
                    value={formData.lastSchool}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <input
                    type="number"
                    name="graduationYear"
                    placeholder="Graduation Year"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <select
                    name="enrollmentTerm"
                    value={formData.enrollmentTerm}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  >
                    <option value="">Select Enrollment Term</option>
                    <option value="Fall 2026">Fall 2026</option>
                    <option value="Spring 2027">Spring 2027</option>
                    <option value="Summer 2027">Summer 2027</option>
                  </select>
                  <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency Contact Number"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                    required
                  />
                  <textarea
                    name="extracurriculars"
                    placeholder="Extracurricular Activities / Awards (optional)"
                    value={formData.extracurriculars}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007bff] outline-none col-span-full"
                  ></textarea>
                  <label className="flex items-center gap-2 col-span-full mt-2">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                    />
                    I agree to the&nbsp;
                    <a href="/terms" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                      terms and conditions
                    </a>.
                  </label>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-3 text-[#007bff]">Core Subjects Grades (Required)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CORE_SUBJECTS.map((subject) => (
                      <div key={subject} className="flex items-center gap-3">
                        <label className="w-48">{subject}</label>
                        <select
                          name={`coreGrade_${subject}`}
                          value={formData.coreGrades[subject] || ""}
                          onChange={handleChange}
                          required
                          className="border rounded px-3 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                        >
                          <option value="">Select Grade</option>
                          {GRADES.map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {formData.shsProgram && (
                    <>
                      <h3 className="text-lg font-semibold mt-8 mb-3 text-[#007bff]">
                        Elective Subjects Grades (Required)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(ELECTIVE_SUBJECTS[formData.shsProgram] || []).map((subject) => (
                          <div key={subject} className="flex items-center gap-3">
                            <label className="w-48">{subject}</label>
                            <select
                              name={`electiveGrade_${subject}`}
                              value={formData.electiveGrades[subject] || ""}
                              onChange={handleChange}
                              required
                              className="border rounded px-3 py-2 focus:ring-2 focus:ring-[#007bff] outline-none"
                            >
                              <option value="">Select Grade</option>
                              {GRADES.map((grade) => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Upload Certificate & Passport Photo */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#007bff] mb-6 flex items-center gap-2">
                  <FaFileUpload /> Step 2: Upload SHS Certificate & Passport Photo
                </h2>

                <div className="mb-8">
                  <label className="block mb-2 font-semibold text-gray-700">
                    SHS Certificate (PDF, JPG, PNG)
                  </label>
                  <input
                    type="file"
                    name="certificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="border rounded px-3 py-2 w-full text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Passport Photo (JPG only, 400x400px, White background)
                  </label>
                  <input
                    type="file"
                    name="passport"
                    accept=".jpg,.jpeg"
                    onChange={handlePassportChange}
                    className={`border rounded px-3 py-2 w-full text-gray-700 ${
                      passportError ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {passportError && (
                    <p className="text-red-600 mt-2 text-sm font-semibold">{passportError}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#007bff] mb-6 flex items-center gap-2">
                  <FaBook /> Step 3: Review & Submit
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Full Name:</strong> {formData.fullname}</p>
                  <p><strong>Date of Birth:</strong> {formData.dob}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>Nationality:</strong> {formData.nationality}</p>
                  <p><strong>Address:</strong> {formData.address}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>SHS Program:</strong> {formData.shsProgram}</p>
                  <p><strong>Last School:</strong> {formData.lastSchool}</p>
                  <p><strong>Graduation Year:</strong> {formData.graduationYear}</p>
                  <p><strong>Enrollment Term:</strong> {formData.enrollmentTerm}</p>
                  <p><strong>Emergency Contact:</strong> {formData.emergencyContact}</p>
                  <p><strong>Extracurriculars:</strong> {formData.extracurriculars || "None"}</p>

                  <div>
                    <strong>Core Subject Grades:</strong>
                    <ul className="list-disc list-inside">
                      {CORE_SUBJECTS.map((subject) => (
                        <li key={subject}>{subject}: {formData.coreGrades[subject]}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Elective Subject Grades:</strong>
                    <ul className="list-disc list-inside">
                      {(ELECTIVE_SUBJECTS[formData.shsProgram] || []).map((subject) => (
                        <li key={subject}>{subject}: {formData.electiveGrades[subject]}</li>
                      ))}
                    </ul>
                  </div>

                  <p><strong>Certificate:</strong> {formData.certificate ? formData.certificate.name : "Not uploaded"}</p>
                  <p><strong>Passport Photo:</strong> {formData.passport ? formData.passport.name : "Not uploaded"}</p>
                  <p><strong>Consent Given:</strong> {formData.consent ? "Yes" : "No"}</p>
                </div>
              </motion.div>
            )}

            {/* Feedback */}
            {feedback && (
              <p className={`mt-5 text-center font-medium ${feedback.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {feedback.message}
              </p>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 text-[#007bff] font-semibold hover:underline"
                >
                  <FaArrowLeft /> Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-2 bg-[#007bff] text-white px-6 py-2 rounded-lg hover:bg-[#0056b3] transition-all"
                >
                  Next <FaArrowRight />
                </button>
              ) : (
                <>
                  {!showPreview ? (
                    <button
                      type="button"
                      onClick={() => setShowPreview(true)}
                      disabled={loading}
                      className={`ml-auto flex items-center gap-2 bg-[#007bff] text-white px-6 py-2 rounded-lg hover:bg-[#0056b3] transition-all ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Processing..." : "Preview Application"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className={`ml-auto flex items-center gap-2 bg-[#28a745] text-white px-6 py-2 rounded-lg hover:bg-[#1e7e34] transition-all ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Submitting..." : "Confirm & Submit"}
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ApplyNow;
