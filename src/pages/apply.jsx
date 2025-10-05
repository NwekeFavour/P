import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Friends from "../assets/images/friends.webp";
import Couple from "../assets/images/couple.webp";
import Portraits from "../assets/images/portrait.webp";
import { useNavigate } from "react-router-dom";

function Apply() {
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);
    const [prof, setProf] = useState(false);
    const [selectedUni, setSelectedUni] = useState("");
    const [prem, setPrem] = useState(true);
 
    useEffect(() => {
        fetch("/uni.json") // make sure uni.json is in your public/ folder
        .then((res) => res.json())
        .then((data) => setUniversities(data))
        .catch((err) => console.error("Error loading universities:", err));
    }, []);
  return (
    <section className="flex min-h-screen flex-col md:flex-row bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300">
        <button
            onClick={() => navigate(-1)} // 👈 goes back one step in history
            className="text-gray-600 opacity-70 hover:underline absolute top-4 right-8"
        >
            Go back
        </button>
      {/* Left side - Visuals & CTA */}
        <div className=" sm:flex hidden flex-1 flex-col items-center justify-center px-5 py-2 sm:px-8 sm:py-12 text-center md:text-left relative">
        <div className="absolute inset-0 bg-white/70 md:bg-transparent sm:block hidden"></div>

        <div className="relative z-10 max-w-md sm:block hidden">
            <h1 className="text-[30px] md:text-[35px] lg:text-[40px] font-bold text-gray-900 leading-snug">
            Ready to <span className="text-blue-600">Level Up</span> Your Tech
            Career?
            </h1>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
            Join the HNG Internship and gain real-world experience, mentorship,
            and a global network. Whether you’re into coding, design, data, or
            marketing, we’ve got a track for you.
            </p>

            {/* Swiper Image Slider */}
           <div className="mt-8 w-full max-w-sm md:mx-0 sm:mx-auto overflow-hidden rounded-xl">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full md:h-[400px] sm:h-[370px] h-[320px] md:w-[300px]  lg:w-full lg:h-[500px]" 
                >
                    <SwiperSlide>
                    <img
                        src={Friends}
                        alt="Internship Preview 1"
                        className="w-full h-full object-cover"
                    />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img
                        src={Couple}
                        alt="Internship Preview 2"
                        className="w-full h-full object-cover"
                    />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img
                        src={Portraits}
                        alt="Internship Preview 3"
                        className="w-full h-full object-cover"
                    />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
        </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-center justify-center px-4  py-4 sm:px-6 sm:py-12">
        <div className="w-full max-w-md bg-white sm:mt-0 mt-20 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Enroll Now 🚀
          </h2>
          <form className="space-y-5">
            {/* First & Last Name */}
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />

            <div className="text-sm font-medium text-gray-700 mb-2">
                Are you a student or a professional?
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <label className="flex items-center gap-2 text-sm">
                <input 
                    type="radio" 
                    name="status" 
                    onChange={() => setProf(true)} 
                />
                Student
                </label>
                <label className="flex items-center gap-2 text-sm">
                <input 
                    type="radio" 
                    name="status" 
                    onChange={() => setProf(false)} 
                />
                Professional
                </label>
                <label className="flex items-center gap-2 text-sm">
                <input 
                    type="radio" 
                    name="status" 
                    onChange={() => setProf(false)} 
                />
                None of the above
                </label>
            </div>

            {/* Track Selection */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Select Your Track
              </label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>Frontend Development</option>
                <option>Backend Development</option>
                <option>UI/UX Design</option>
                <option>Data Analysis</option>
                <option>Project Management</option>
              </select>
            </div>
            
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="">How did you hear about us?</label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                    <option>Social Media</option>
                    <option>Friend or Colleague</option>
                    <option>Online Search</option>
                    <option>Other</option>
                </select>
            </div>

            {prof && (
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="">What School did you attend?</label>
                    <select
                        value={selectedUni}
                        onChange={(e) => setSelectedUni(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="" disabled>
                        Select University
                        </option>
                        {universities.map((uni, index) => (
                        <option key={index} value={uni.name}>
                            {uni.name}
                        </option>
                        ))}
                    </select>
                </div>
            )}
            {/* Certificate Option */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Would you like a certificate?
              </p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" checked={prem} name="certificate" />
                  Free (No Certificate)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" onClick={() => setPrem(prem => !prem)}  name="certificate" />
                  Paid – Certificate + 1yr Premium Access
                </label>
              </div>
            </div>

            {/* Privacy Agreement */}
            <label className="lg:flex items-start  gap-2 text-xs text-gray-600">
              <input type="checkbox" />
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-full bg-gray-600 py-3 text-white font-semibold hover:bg-gray-700/20 transition mt-6"
            >
              Continue to Enroll
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Apply;
