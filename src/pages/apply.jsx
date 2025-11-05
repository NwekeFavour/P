import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import Friends from "../assets/images/friends.webp";
import Couple from "../assets/images/couple.webp";
import Portraits from "../assets/images/portrait.webp";
import PremiumPaymentPage from "../components/premiumpayment";

function Apply() {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [isStudent, setIsStudent] = useState(false);
  const [selectedUni, setSelectedUni] = useState("");
  const [showPremium, setShowPremium] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showCongrats, setShowCongrats] = useState(false); // 👈 added
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

  // Load universities list from public/data/uni.json
  useEffect(() => {
    fetch("/data/uni.json")
      .then((res) => res.json())
      .then((data) => setUniversities(data))
      .catch((err) => console.error("Error loading universities:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/applications/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("knownly_user", JSON.stringify(result.data));

        if (formData.package === "Paid") {
          setShowPremium(false); // Show payment page
        } else {
          setMessage("🎉 Application submitted successfully!");
          setShowCongrats(true); // 👈 Show congratulations screen
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

  // --- Congratulations View ---
  if (showCongrats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 text-center p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Congratulations, {formData.fname}!
        </h1>
        <p className="text-gray-700 text-lg max-w-md mb-6">
          You’ve successfully applied for the <strong>knownly Internship Program</strong>!
          We’re thrilled to have you on board and can’t wait for you to begin your journey.
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
          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 opacity-70 hover:underline absolute top-4 right-8"
          >
            Go back
          </button>

          {/* Left side — Visuals & Text */}
          <div className="sm:flex hidden flex-1 flex-col items-center justify-center px-6 py-12 relative">
            <div className="absolute inset-0 bg-white/70 md:bg-transparent"></div>
            <div className="relative z-10 max-w-md">
              <h1 className="text-[30px] md:text-[35px] lg:text-[40px] font-bold text-gray-900 leading-snug">
                Ready to <span className="text-blue-600">Level Up</span> Your Tech Career?
              </h1>
              <p className="mt-4 text-gray-600 text-sm md:text-base">
                Join the <strong>KNOWNLY</strong> Internship and gain real-world experience, mentorship,
                and a global network. Whether you’re into coding, design, data, or
                marketing, we’ve got a track for you.
              </p>

              {/* Swiper Image Slider */}
              <div className="mt-8 w-full max-w-sm overflow-hidden rounded-xl">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={true}
                  className="w-full h-[320px] sm:h-[380px] lg:h-[500px]"
                >
                  {[Friends, Couple, Portraits].map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Right side — Form */}
          <div className="flex flex-1 items-center justify-center px-4 py-14 sm:px-6 sm:py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Enroll Now 🚀
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {message && <p className="text-blue-800 text-sm">{message}</p>}

                {/* First & Last Name */}
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={formData.fname}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    required
                  />
                  <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    value={formData.lname}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    required
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />

                {/* Phone */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />

                {/* Student or Professional */}
                <div className="text-sm font-medium text-gray-700 mb-2">Are you a student or a professional?</div>
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

                {/* Track Selection */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Select Your Track</label>
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

                {/* How did you hear about us? */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    How did you hear about us?
                  </label>
                  <select
                    name="social"
                    value={formData.social}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option>Social Media</option>
                    <option>Friend or Colleague</option>
                    <option>Online Search</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* University (if student) */}
                {isStudent && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">What School did you attend?</label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="">Select University</option>
                      {universities.map((uni, i) => (
                        <option key={i} value={uni.name}>{uni.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Certificate Option */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Would you like a certificate?</p>
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

                {/* Privacy Agreement */}
                <label className="flex items-start gap-2 text-xs text-gray-600">
                  <input type="checkbox" required />
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 underline">Terms</a> and{" "}
                  <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-full py-3 text-white font-semibold transition mt-6 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-black"
                  }`}
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