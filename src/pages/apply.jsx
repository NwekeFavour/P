import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import Friends from "../assets/images/friends.webp";
import Couple from "../assets/images/couple.webp";
import Portraits from "../assets/images/portrait.webp";
import PremiumPaymentPage from "../components/premiumpayment";
import { Check } from "lucide-react";

function Apply() {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [isStudent, setIsStudent] = useState(false);
  const [showPremium, setShowPremium] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [errorActive, setErrorActive] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    level: "",
    track: "",
    social: "",
    university: "",
    package: "Free",
    cohortId: "", // added cohort
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Load universities
  useEffect(() => {
    fetch("/data/uni.json")
      .then((res) => res.json())
      .then((data) => setUniversities(data))
      .catch((err) => console.error("Error loading universities:", err));
  }, []);

  // Load cohorts
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/applications/cohorts/active`);
        const data = await res.json();
        // console.log(data);
        setErrorActive(data.message);
        if (data.success && data.data) {
          setCohorts([data.data]);
          setErrorActive("");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching cohorts:", err);
      }
    };
    fetchCohorts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        if (formData.package === "Paid") {
          setShowPremium(false);
        } else {
          setMessage("🎉 Application submitted successfully!");
          setShowCongrats(true);
        }
      } else {
        setError(result.message || "Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Congratulations screen
  if (showCongrats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 text-center p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Congratulations, {formData.fname}!
        </h1>
        <p className="text-gray-700 text-lg max-w-md mb-6">
          You’ve successfully applied for the{" "}
          <strong>KNOWNLY Internship Program</strong>!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-black transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {showPremium ? (
        <section className="flex min-h-screen flex-col md:flex-row bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300 relative">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 opacity-70 hover:underline absolute top-4 right-8"
          >
            Go back
          </button>

          {/* Left visual */}
          <div className="sm:flex hidden flex-1 flex-col items-center justify-center px-6 py-12 relative">
            <div className="absolute inset-0 bg-white/70 md:bg-transparent"></div>
            <div className="relative z-10 max-w-md">
              <h1 className="text-[30px] md:text-[35px] lg:text-[40px] font-bold text-gray-900 leading-snug">
                Ready to <span className="text-blue-600">Level Up</span> Your
                Tech Career?
              </h1>
              <p className="mt-4 text-gray-600 text-sm md:text-base">
                Join the <strong>KNOWNLY</strong> Internship and gain real-world
                experience, mentorship, and a global network.
              </p>
              <div className="mt-8 w-full max-w-sm overflow-hidden rounded-xl">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={true}
                  className="w-full h-[320px] sm:h-[380px] lg:h-[500px]"
                >
                  {[Friends, Couple, Portraits].map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="flex flex-1 items-center justify-center px-4 py-14 sm:px-6 sm:py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Enroll Now 🚀
              </h2>
              {errorActive && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                  {errorActive}
                </div>
              )}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {message && <p className="text-blue-800 text-sm">{message}</p>}

                {/* Name */}
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>

                {/* Email & Phone */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />

                {/* Student / Professional */}
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Are you a student or a professional?
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="level"
                      value="Student"
                      checked={formData.level === "Student"}
                      onChange={(e) => {
                        setIsStudent(true);
                        setFormData({ ...formData, level: e.target.value });
                      }}
                    />
                    Student
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="level"
                      value="Professional"
                      checked={formData.level === "Professional"}
                      onChange={(e) => {
                        setIsStudent(false);
                        setFormData({ ...formData, level: e.target.value });
                      }}
                    />
                    Professional
                  </label>
                </div>

                {/* Cohort selection */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Active Cohort
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {cohorts.map((c) => {
                      const isSelected = formData.cohortId === c._id;
                      const isPastDeadline =
                        new Date(c.applicationDeadline) < new Date();

                      return (
                        <div
                          key={c._id}
                          onClick={() =>
                            !isPastDeadline &&
                            setFormData({ ...formData, cohortId: c._id })
                          }
                          className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50/50 shadow-md"
                              : "border-slate-100 bg-white hover:border-slate-200"
                          } ${isPastDeadline ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-black text-slate-900">
                                {c.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1">
                                Starts:{" "}
                                {new Date(c.startDate).toLocaleDateString(
                                  undefined,
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-2">
                              {c.availableTracks.slice(0, 2).map((track, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold"
                                >
                                  {track}
                                </span>
                              ))}
                              {c.availableTracks.length > 2 && (
                                <span className="text-[10px] text-slate-400">
                                  +{c.availableTracks.length - 2}
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-[10px] font-black uppercase tracking-tighter ${isPastDeadline ? "text-rose-500" : "text-emerald-600"}`}
                            >
                              Deadline:{" "}
                              {new Date(
                                c.applicationDeadline,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Track */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select Your Track
                  </label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select a track</option>
                    <option>Frontend Development</option>
                    <option>Backend Development</option>
                    <option>UI/UX Design</option>
                    <option>Data Analysis</option>
                    <option>Project Management</option>
                  </select>
                </div>

                {/* Social */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    How did you hear about us?
                  </label>
                  <select
                    name="social"
                    required // Ensures the browser validates it
                    value={formData.social}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    {/* 1. Add a placeholder with an empty value */}
                    <option value="" disabled>
                      Select an option
                    </option>

                    {/* 2. Add explicit values to your options */}
                    <option value="Social Media">Social Media</option>
                    <option value="Friend or Colleague">
                      Friend or Colleague
                    </option>
                    <option value="Online Search">Online Search</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* University */}
                {isStudent && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      What School did you attend?
                    </label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="">Select University</option>
                      {universities.map((uni, i) => (
                        <option key={i} value={uni.name}>
                          {uni.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Package */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Would you like a certificate?
                  </p>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="package"
                        value="Free"
                        checked={formData.package === "Free"}
                        onChange={handleChange}
                      />
                      Free (No Certificate)
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="package"
                        value="Paid"
                        checked={formData.package === "Paid"}
                        onChange={handleChange}
                      />
                      Paid – Certificate + 1yr Premium Access
                    </label>
                  </div>
                </div>

                {/* Privacy */}
                <label className="flex items-start gap-2 text-xs text-gray-600">
                  <input type="checkbox" required />I agree to the{" "}
                  <a href="/terms" className="text-blue-600 underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 underline">
                    Privacy Policy
                  </a>
                  .
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-full py-3 text-white font-semibold transition mt-6 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-black"}`}
                >
                  {loading ? "Submitting..." : "Continue to Enroll"}
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <PremiumPaymentPage userData={formData} />
      )}
    </div>
  );
}

export default Apply;
