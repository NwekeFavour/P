import React, { useState } from 'react';
import CoupleTwo from "../assets/images/couple2.webp";
import ManOne from "../assets/images/man1.webp";
import WomanTwo from "../assets/images/womantwo.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Mail, Phone, Loader2, CreditCard, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';


function PremiumPaymentPage({userData}) {
    const [loading, setLoading] = useState(false);
    const [message, SetMessage] = useState("");
    const [error, SetError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        plan: "Premium",
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "proof") {
        setForm({ ...form, proof: files[0] });
        } else {
        setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate upload delay
        setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        }, 2000);
    };
    return (
        <div>
            <button
                onClick={() => navigate(-1)} // 👈 goes back one step in history
                className="text-gray-600 opacity-70 hover:underline absolute top-4 right-8"
            >
                Go back
            </button>
            <div className='lg:flex min-h-screen flex-col  lg:gap-10 xl:gap-20 md:flex-row bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300'>
                <div className="min-h-screen flex items-center justify-center px-4 py-16 lg:pl-40 lg:bg-white">
                    <div className="max-w-lg w-full rounded-2xl  p-8 text-white relative">
                        {!submitted ? (
                        <>
                            <h2 className="text-[30px] md:text-3xl text-black font-bold mb-2 text-center">
                            Upgrade to <span className="text-blue-600">Premium</span>
                            </h2>
                            <p className="text-gray-400 text-center text-sm mb-8">
                            Gain mentorship, verified certificates, and access to exclusive
                            projects.
                            </p>

                            {/* Plan Info */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
                            <p className="text-gray-800 font-medium mb-1">
                                💳 Plan: Premium Membership
                            </p>
                            <p className="text-gray-900">
                                <span className="font-semibold text-black">Amount:</span> ₦5,000 <br />
                                <span className="font-semibold text-black">Duration:</span> Lifetime Access
                            </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                Full Name
                                </label>
                                <input
                                type="text"
                                name="name"
                                value={
                                userData?.fname && userData?.lname
                                    ? `${userData.fname} ${userData.lname}`
                                    : form.name
                                }                                
                                onChange={handleChange}
                                required
                                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-neutral-100 outline-none bg-transparent text-black placeholder-gray-500"
                                placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                Email Address
                                </label>
                                <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={userData?.email || form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-neutral-300 rounded-lg pl-9 py-2 focus:ring-2 focus:ring-neutral-100 outline-none bg-transparent text-black placeholder-gray-500"
                                    placeholder="example@email.com"
                                />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                Phone Number
                                </label>
                                <div className="relative">
                                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-neutral-300 rounded-lg pl-9 py-2 focus:ring-2 focus:ring-neutral-100 outline-none bg-transparent text-black placeholder-gray-500"
                                    placeholder="+234 801 234 5678"
                                />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-gray-500/90  hover:bg-gray-500 hover:text-white text-gray-100 font-semibold py-3 rounded-lg transition"
                            >
                                {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5" /> Initializing...
                                </>
                                ) : (
                                <>
                                    <CreditCard className="w-5 h-5" /> Pay ₦5,000 Securely
                                </>
                                )}
                            </button>
                            </form>

                            <p className="text-xs text-gray-500 text-center mt-4">
                            Need help? Email{" "}
                            <a
                                href="mailto:premium@techlaunchng.com"
                                className="text-blue-400 font-medium underline"
                            >
                                premium@techlaunchng.com
                            </a>
                            </p>
                        </>
                        ) : (
                        <div className="text-center space-y-4 py-10">
                            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
                            <h3 className="text-xl font-semibold text-white">
                            Payment Successful 🎉
                            </h3>
                            <p className="text-gray-400 text-sm max-w-xs mx-auto">
                            Your payment has been confirmed! A confirmation email will be sent
                            to you shortly.
                            </p>
                            <button
                            onClick={() => setSubmitted(false)}
                            className="mt-4 bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-700 transition"
                            >
                            Back to Homepage
                            </button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='xl:py-20 lg:py-22 md:py-20 lg:block hidden'>
                    <div className="relative z-10 max-w-md sm:block hidden">
                        <h1 className="text-[26px] md:text-[30px] lg:text-[35px] font-bold text-gray-900 leading-snug">
                        Join the <span className="text-blue-600">Circle of Innovators.</span> Go Premium Today.
                        </h1>
                        <p className="mt-4 text-gray-600 text-[13px] lg:text-[13.5px] xl:text-sm md:text-base">
                            Unlock access to expert mentors, live workshops, and a global network of top tech talents. With Premium, you’re not just learning, you’re becoming part of something bigger.
                        </p>

                        {/* Swiper Image Slider */}
                        <div className="mt-8 w-full max-w-sm md:mx-0 sm:mx-auto overflow-hidden rounded-xl">
                            <Swiper
                                modules={[Autoplay]}
                                autoplay={{ delay: 4000, disableOnInteraction: false }}
                                loop={true}
                                className="w-full md:h-[400px] sm:h-[370px] h-[320px] md:w-[300px]  lg:w-full lg:h-[400px]" 
                            >
                                <SwiperSlide>
                                <img
                                    src={CoupleTwo}
                                    alt="Internship Preview 1"
                                    className="w-full h-full object-cover"
                                />
                                </SwiperSlide>
                                <SwiperSlide>
                                <img
                                    src={ManOne}
                                    alt="Internship Preview 2"
                                    className="w-full h-full object-cover"
                                />
                                </SwiperSlide>
                                <SwiperSlide>
                                <img
                                    src={WomanTwo}
                                    alt="Internship Preview 3"
                                    className="w-full h-full object-cover"
                                />
                                </SwiperSlide>
                            </Swiper>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PremiumPaymentPage;