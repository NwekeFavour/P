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
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const PREMIUM_ONLY_TRACKS = ["UI/UX Design", "Digital Marketing"];

  // Load universities
  useEffect(() => {
    fetch("/data/uni.json")
      .then((res) => res.json())
      .then((data) => setUniversities(data))
      .catch((err) => console.error("Error loading universities:", err));
  }, []);

  // // Load cohorts
  // useEffect(() => {
  //   const fetchCohorts = async () => {
  //     try {
  //       const res = await fetch(`${BASE_URL}/api/applications/cohorts/active`);
  //       const data = await res.json();
  //       // console.log(data);
  //       setErrorActive(data.message);
  //       if (data.success && data.data) {
  //         setCohorts([data.data]);
  //         setErrorActive("");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       console.error("Error fetching cohorts:", err);
  //     }
  //   };
  //   fetchCohorts();
  // }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "track") {
      if (PREMIUM_ONLY_TRACKS.includes(value)) {
        setFormData({
          ...formData,
          track: value,
          package: "Premium", // auto-switch
        });
        setShowPremium(true);
      } else {
        setFormData({
          ...formData,
          track: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
        if (formData.package === "Premium") {
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
          <div className="flex bg-white flex-1 items-center justify-center px-4 py-14 sm:px-6 sm:py-12">
            <div className="w-full max-w-md sm:p-0 p-4 rounded-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Reserve Your Spot Today! 🚀
              </h2>
              {errorActive && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                  {errorActive}
                </div>
              )}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <p className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded">
                    {error}
                  </p>
                )}
                {message && (
                  <p className="text-blue-800 text-sm font-medium bg-blue-50 p-2 rounded">
                    {message}
                  </p>
                )}

                {/* Name Row */}
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                {/* Student / Professional Toggle */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Are you a student or a professional?
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
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
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
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
                </div>

                {/* Track Selection */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select Your Track
                  </label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    <option value="">Select a track</option>
                    <option>Frontend Development</option>
                    <option>Backend Development</option>
                    <option>UI/UX Design</option>
                    <option>Digital Marketing</option>
                  </select>
                </div>

                {PREMIUM_ONLY_TRACKS.includes(formData.track) && (
                  <div className="mt-2 text-xs bg-yellow-50 text-yellow-800 p-3 border border-yellow-100 rounded-md">
                    ⚠️ <strong>{formData.track}</strong> is a Premium-only
                    track. Certificate and 1-year Premium access required.
                  </div>
                )}

                {/* Referral Source */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    How did you hear about us?
                  </label>
                  <select
                    name="social"
                    required
                    value={formData.social}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend or Colleague">
                      Friend or Colleague
                    </option>
                    <option value="Online Search">Online Search</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* University (Conditional) */}
                {isStudent && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      What School did you attend?
                    </label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
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

                {/* Package Choice */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-sm font-bold text-gray-700 mb-3">
                    Certification & Access
                  </p>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center gap-2 text-sm ${PREMIUM_ONLY_TRACKS.includes(formData.track) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value="Free"
                        disabled={PREMIUM_ONLY_TRACKS.includes(formData.track)}
                        checked={formData.package === "Free"}
                        onChange={handleChange}
                      />
                      Free (No Certificate)
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="package"
                        value="Premium"
                        checked={formData.package === "Premium"}
                        onChange={handleChange}
                      />
                      <span className="font-semibold text-indigo-600">
                        Premium
                      </span>{" "}
                      – Certificate + 1yr Network Access
                    </label>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" className="mt-0.5" required />
                  <span>
                    I agree to the{" "}
                    <a href="/terms" className="text-indigo-600 underline">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-indigo-600 underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {/* Premium Info Box */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100/30">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
                      Paying for <strong>Knownly Premium</strong> means you will
                      receive your verified certificate as soon as you make it
                      through <strong>Stage 8(Final Stage)</strong>. It also
                      gives you exclusive access to the{" "}
                      <strong>Knownly Premium Network</strong>, a dedicated
                      workspace where you get job offers and network with other
                      techies in weekly online events. If you face any challenge
                      or need help, kindly reach out to{" "}
                      <a
                        href="mailto:support@knownly.tech"
                        className="text-indigo-600 font-bold hover:underline"
                      >
                        support@knownly.tech
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-full py-4 text-white font-bold transition-all shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                  }`}
                >
                  {loading ? "Processing..." : "Continue to Enroll"}
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
