import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Phone, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "swiper/css";

// Assets
import CoupleTwo from "../assets/images/couple2.webp";
import ManOne from "../assets/images/man1.webp";
import WomanTwo from "../assets/images/womantwo.webp";

function PremiumPaymentPage({ userData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fname: userData?.fname || "",
    lname: userData?.lname || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
  });

  const amountInKobo = 5000 * 100;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePaymentRedirect = async (e) => {
    e.preventDefault();
    if (!form.phone) return toast.warning("Phone required");

    try {
      setLoading(true);

      // 1️⃣ Request backend to create payment
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-payment`,
        {
          email: form.email,
          amount: amountInKobo,
          metadata: {
            fname: form.fname,
            lname: form.lname,
            phone: form.phone,
            university: userData?.university,
            track: userData?.track,
            level: userData?.level,
            social: userData?.social || "Other",
          },
        }
      );

      if (!data.success) throw new Error(data.message || "Failed to initialize payment");
        localStorage.setItem("userEmail", form.email);

      // 2️⃣ Redirect user to Paystack hosted checkout
      window.location.href = data.payment_url;

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment initialization failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-900 font-medium">Redirecting to Paystack...</p>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:underline absolute top-4 right-6 z-50 text-sm"
      >
        Go back
      </button>

      <div className="lg:flex min-h-screen md:flex-row flex-col bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300">
        {/* Form Section */}
        <div className="min-h-screen flex items-center justify-center w-full lg:w-1/2 px-6 py-16 lg:bg-white">
          <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              Upgrade to <span className="text-blue-600">Premium</span>
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Unlock mentorship, verified certificates, and exclusive projects.
            </p>

            <form onSubmit={handlePaymentRedirect} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={`${form.fname} ${form.lname}`}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-black transition-all"
                    placeholder="0801 234 5678"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-md disabled:opacity-50"
              >
                Pay Now ₦5,000
              </button>
            </form>
          </div>
        </div>

        {/* Slider Section */}
        <div className="lg:block hidden w-1/2 pr-12 py-16">
          <div className="relative max-w-lg mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join the <span className="text-blue-600">Circle of Innovators</span>
            </h1>
            <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 4000 }}
                loop
                className="w-full h-[400px]"
              >
                <SwiperSlide>
                  <img src={CoupleTwo} alt="Couple" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={ManOne} alt="Man" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={WomanTwo} alt="Woman" className="w-full h-full object-cover" />
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
