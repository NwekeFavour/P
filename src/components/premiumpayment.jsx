import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Mail, Phone, Loader2, CreditCard, CheckCircle, PartyPopper } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import "swiper/css";

// Assets (Ensure these paths are correct)
import CoupleTwo from "../assets/images/couple2.webp";
import ManOne from "../assets/images/man1.webp";
import WomanTwo from "../assets/images/womantwo.webp";
import axios from 'axios';
import { toast } from 'sonner';

function PremiumPaymentPage({ userData }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const [form, setForm] = useState({
        // Extracting first name for the Congrats screen
        fname: userData?.fname || "",
        lname: userData?.lname || "",
        email: userData?.email || "",
        phone: userData.phone || "",
    });

    const amountInKobo = 5000 * 100;



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const config = {
    reference: `KN-${new Date().getTime()}`,
    email: form.email,
    amount: amountInKobo,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    metadata: {
        fname: form.fname,
        lname: form.lname,
        phone: form.phone,
        university: userData?.university,
        track: userData?.track,
        level: userData?.level,
        cohortId: userData?.cohortId,
        social: userData?.social || "Other",
    }
};

// 2. Initialize the hook with the config
const initializePayment = usePaystackPayment(config);

const onSuccess = async (paystackResponse) => {
    console.log("Paystack responded:", paystackResponse); // CHECK THIS IN BROWSER CONSOLE
    setLoading(true);
    const loadingToast = toast.loading("Verifying payment...");

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`, {
            reference: paystackResponse.reference,
            email: form.email.toLowerCase(),
        });

        if (response.data.success) {
            toast.success("Premium activated!", { id: loadingToast });
            setSubmitted(true);
        }
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        toast.error("Server verification failed.", { id: loadingToast });
    } finally {
        setLoading(false);
    }
};

const handlePaymentTrigger = (e) => {
    e.preventDefault();
    if (!form.phone) return toast.warning("Phone required");
    
    // Trigger the modal
    initializePayment(onSuccess, onClose);
};

    const onClose = () => {
    setLoading(false);
    toast.info("Transaction cancelled.");
};

    // --- CONGRATULATIONS SCREEN ---
    if (submitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 text-center p-6">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center max-w-lg">
                    <div className="bg-green-100 p-4 rounded-full mb-6">
                        <PartyPopper className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🎉 Congratulations, {form.fname}!
                    </h1>
                    <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                        You’ve successfully upgraded to the <strong>KNOWNLY Premium Track</strong>! 
                        Prepare for a journey of mentorship and growth.
                    </p>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Global Loader Overlay - Shows when verifying payment */}
            {loading && (
                <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                    <p className="text-gray-900 font-medium">Processing your transaction...</p>
                    <p className="text-gray-500 text-sm">Please do not refresh this page.</p>
                </div>
            )}

            <button
                onClick={() => navigate(-1)}
                className="text-gray-600 opacity-70 hover:underline absolute top-4 right-8 z-50 text-sm"
            >
                Go back
            </button>
            
            <div className='lg:flex min-h-screen flex-col lg:gap-10 xl:gap-20 md:flex-row bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300'>
                <div className="min-h-screen flex items-center justify-center px-4 py-16 lg:pl-40 lg:bg-white w-full lg:w-1/2">
                    <div className="max-w-lg w-full p-8 relative">
                        <h2 className="text-[30px] md:text-3xl text-black font-bold mb-2 text-center">
                            Upgrade to <span className="text-blue-600">Premium</span>
                        </h2>
                        <p className="text-gray-400 text-center text-sm mb-8">
                            Gain mentorship, verified certificates, and access to exclusive projects.
                        </p>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">Plan</p>
                                    <p className="text-gray-900 font-bold text-lg">Premium Membership</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-xs">Amount</p>
                                    <p className="text-blue-700 font-black text-xl">₦5,000</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handlePaymentTrigger} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.fname + " " + form.lname}
                                    readOnly // Since it's from userData, usually best to keep readOnly
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                        readOnly
                                        className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-black transition-all"
                                        placeholder="0801 234 5678"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-xl shadow-blue-100 disabled:opacity-50"
                            >
                                <CreditCard className="w-5 h-5" /> Pay Now
                            </button>
                        </form>
                    </div>
                </div>

                {/* Slider (Hidden on mobile) */}
                <div className='xl:py-20 lg:py-22 lg:block hidden w-1/2 pr-20'>
                    <div className="relative z-10 max-w-md">
                        <h1 className="text-[35px] font-bold text-gray-900 leading-tight">
                            Join the <span className="text-blue-600">Circle of Innovators.</span>
                        </h1>
                        <div className="mt-8 w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                            <Swiper
                                modules={[Autoplay]}
                                autoplay={{ delay: 4000 }}
                                loop={true}
                                className="w-full h-[450px]"
                            >
                                <SwiperSlide><img src={CoupleTwo} alt="Slide 1" className="w-full h-full object-cover" /></SwiperSlide>
                                <SwiperSlide><img src={ManOne} alt="Slide 2" className="w-full h-full object-cover" /></SwiperSlide>
                                <SwiperSlide><img src={WomanTwo} alt="Slide 3" className="w-full h-full object-cover" /></SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PremiumPaymentPage;