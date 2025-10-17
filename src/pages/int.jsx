import React, { useState } from 'react';
import { ArrowRight, Users,  Zap,  Star, Target } from 'lucide-react';
import Header from '../components/header';
import Woman from "../assets/images/woman.webp"
import Man from "../assets/images/man.webp"
import Group from "../assets/images/group.webp"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../assets/styles/index.css";
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
export default function Int() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const tracks = [
    { name: 'Frontend Development', icon: '💻', color: 'blue' },
    { name: 'Backend Development', icon: '⚙️', color: 'purple' },
    { name: 'Mobile Development', icon: '📱', color: 'green' },
    { name: 'Product Design', icon: '🎨', color: 'pink' },
    { name: 'Data Science', icon: '📊', color: 'orange' },
    { name: 'DevOps Engineering', icon: '🚀', color: 'cyan' }
  ];

  const testimonials = [
    {
      quote: "TechLaunch NG didn't just teach me to code—it transformed my entire career trajectory. Within 2 months of graduating, I landed a role at one of Nigeria's top fintech companies.",
      author: "Adebayo Michael",
      role: "Software Engineer at Paystack",
      cohort: "Cohort 4 (2024)",
      image: "AM"
    },
    {
      quote: "The hands-on projects and mentorship I received were invaluable. I went from tutorial hell to shipping production code. Best decision I ever made.",
      author: "Chioma Okafor",
      role: "Full Stack Developer at Flutterwave",
      cohort: "Cohort 3 (2024)",
      image: "CO"
    },
    {
      quote: "What sets TechLaunch apart is the real-world experience. You're not just learning—you're building actual products that real users interact with.",
      author: "Ibrahim Hassan",
      role: "Backend Engineer at Andela",
      cohort: "Cohort 5 (2024)",
      image: "IH"
    }
  ];

  const benefits = [
    {
      title: 'Practical Project-Based Learning',
      description: 'Work on real-world projects from day one. Build production-ready applications that solve actual problems for Nigerian businesses.',
      icon: Target
    },
    {
      title: 'Work Under Pressure',
      description: 'Experience the intensity of real tech environments. Learn to ship code fast, debug efficiently, and meet tight deadlines—skills that matter.',
      icon: Zap
    },
    {
      title: 'Mentorship & Community',
      description: 'Get guidance from senior engineers at top companies. Join a network of 5,000+ alumni working across the Nigerian tech ecosystem.',
      icon: Users
    }
  ];

  return (
    <div className="">
      {/* Hero Section */}
        <Header/>

        <section className="relative  pb-32 px-6 overflow-hidden">

            {/* Subtle background pattern */}
            <div className="absolute inset-0 left-0 end-0 opacity-5">
            <div className="absolute top-[100px] left-[500px] w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 pt-13 sm:pt-20">
            <div className="mx-auto text-center mb-16">
                <div className="flex flex-col md:flex-row  justify-between gap-10 md:gap-16">
                    {/* Left side text */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex  justify-start mb-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                <span className="sm:text-sm text-[12px] font-semibold text-orange-700">Applications are Open</span>
                            </div>
                        </div>
                        <h1 className="text-[32px]  text-start md:text-[40px] lg:text-[60px] lg:mb-0 mb-3 font-bold text-gray-900 leading-tight">
                        Ready to put your skills <br />
                        <span className="text-gray-400">to the test?</span>
                        </h1>
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] text-gray-600 text-justify leading-relaxed">
                            TechLaunchNG Internship is a remote, stage-based bootcamp where students gain hands-on experience, build real projects, and work in teams like a real tech company. Open to frontend devs, backend devs, designers, data analysts, and writers.
                            🚀 Next cohort starts soon, Free to apply!
                        </p>
                        <div className="flex gap-4 justify-start items-center mt-5 mb-8">
                            <Link className="group lg:text-center md:text-start text-start px-3 lg:px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-[14px] font-semibold rounded-lg transition-all duration-300 flex items-center gap-3" to={"/techlaunchng/internships"}> 
                                Enroll for free!
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <div className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-900">Start Date:</span> February 15, 2025
                            </div>
                        </div>
                    </div>

                    {/* Right side slider */}
                    <div className="flex-1 flex  mx-auto justify-center w-full max-w-[400px] md:max-w-[450px]">
                        <div className="relative md:w-[300px]  lg:w-full h-[300px] md:h-[350px] lg:h-[466px] overflow-hidden rounded-2xl shadow-xl" data-aos="zoom-in">
                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            loop={true}
                            className="h-full w-full"
                        >
                            <SwiperSlide>
                            <img
                                src={Woman}
                                alt="Internship 1"
                                className="h-full w-full object-cover"
                            />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img
                                src={Man}
                                alt="Internship 2"
                                className="h-full w-full object-cover"
                            />
                            </SwiperSlide>
                            <SwiperSlide>
                            <img
                                src={Group}
                                alt="Internship 3"
                                className="h-full w-full object-cover"
                            />
                            </SwiperSlide>
                        </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">5K+</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Alumni</div>
                </div>
                <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Hire Rate</div>
                </div>
                <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">6</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Tracks</div>
                </div>
                <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">8</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Weeks</div>
                </div>
            </div>
            </div>
        </section>

        {/* Company Logos Section */}
        <section className="bg-gray-50 py-16 px-6 border-y border-gray-200">
            <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-8 font-semibold">
                Our finalists work in global companies, and earn at international levels
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                <div className="text-3xl font-bold text-gray-400">Paystack</div>
                <div className="text-3xl font-bold text-gray-400">Flutterwave</div>
                <div className="text-3xl font-bold text-gray-400">Andela</div>
                <div className="text-3xl font-bold text-gray-400">Kuda</div>
                <div className="text-3xl font-bold text-gray-400">PiggyVest</div>
            </div>
            </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                <div className="sm:w-20 w-14 h-14 sm:h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-6" />
                <h2 className="text-[27px] md:text-[35px] lg:text-[40px] font-bold text-gray-900 mb-6 leading-tight">
                    TechLaunch is for those who believe that they are special...
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    We're focused on the best of the best. Work with other very smart techies to collaboratively learn and build solutions in a 8-week, intensive bootcamp.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                    At the end of the program, we offer paid opportunities and job placement in top Nigerian and international companies.
                </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <div className="text-5xl font-bold text-gray-900 mb-2">3K+</div>
                    <div className="text-gray-600 text-sm">Finalists</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <div className="text-5xl font-bold text-gray-900 mb-2">6+</div>
                    <div className="text-gray-600 text-sm">Tech Tracks</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <div className="text-5xl font-bold text-gray-900 mb-2">21+</div>
                    <div className="text-gray-600 text-sm">Countries</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <div className="text-5xl font-bold text-gray-900 mb-2">50+</div>
                    <div className="text-gray-600 text-sm">Partners</div>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-20 sm:py-24 px-3 sm:px-6">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-[26px] md:text-5xl font-bold text-gray-900 mb-4">
                What unique advantage does<br />TechLaunch give you?
                </h2>
            </div>
            <div   className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                    <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"         data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 200}>
                        <Icon className="w-12 h-12 text-gray-900 mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                );
                })}
            </div>
            </div>
        </section>

      {/* Tracks Section */}
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-semibold">No Limits, No Boundaries</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tracks Available</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracks.map((track, index) => (
                <div key={index} className="group bg-white border-2 border-gray-200 hover:border-gray-900 rounded-2xl p-8 transition-all duration-300 cursor-pointer" data-aos="fade-left" data-aos-duration="1000" data-aos-delay={index * 200}>
                    <div className="text-5xl mb-4">{track.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{track.name}</h3>
                </div>
                ))}
            </div>
            </div>
        </section>

      {/* Testimonials Section */}
        <section className="bg-gray-50 py-24 px-6">
            <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Life-changing Stories</h2>
                <p className="text-[16px] text-gray-600">
                Read how TechLaunch changed the lives of interns who attended the program
                </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-lg">
                <div className="mb-8">
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
                <p className="text-[18px] text-gray-900 leading-relaxed mb-8 italic">
                    "{testimonials[activeTestimonial].quote}"
                </p>
                </div>

                <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[activeTestimonial].image}
                </div>
                <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonials[activeTestimonial].author}</div>
                    <div className="text-gray-600 text-sm">{testimonials[activeTestimonial].role}</div>
                    <div className="text-gray-500 text-xs">{testimonials[activeTestimonial].cohort}</div>
                </div>
                </div>

                <div className="flex gap-2">
                {testimonials.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${
                        activeTestimonial === index ? 'w-8 bg-gray-900' : 'w-2 bg-gray-300'
                    }`}
                    />
                ))}
                </div>
            </div>
            </div>
        </section>
      {/* Premium Package Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free vs Premium – Choose Your Path
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Everyone can join for free. But with Premium, you unlock mentorship, certificates, and career perks.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Tier</h3>
              <ul className="text-gray-600 space-y-3 text-left">
                <li>✅ Learn by doing</li>
                <li>✅ Join community & teamwork</li>
                <li>✅ Access to all internship stages</li>
                <li>❌ No certificates</li>
                <li>❌ No mentorship</li>
              </ul>
            </div>

            {/* Premium Tier */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 border border-gray-900 shadow-lg relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                Popular
              </div>
              <h3 className="text-2xl sm:mt-0 mt-7 font-bold mb-4">Premium Tier</h3>
              <ul className="space-y-3 text-left mb-10">
                <li>✅ 1-on-1 Mentorship</li>
                <li>✅ Certificate of Completion</li>
                <li>✅ Career perks (CV review, job referrals)</li>
                <li>✅ Alumni network access</li>
                <li>✅ Priority support</li>
              </ul>
              <Link to={"/premium/checkout"} className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
                Upgrade to Premium
              </Link>
              <p className="mt-4 text-sm text-gray-400">
                Only <span className="font-bold text-yellow-300">50 slots</span> available this cohort!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Go Premium?
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Hear from interns who upgraded their journey with Premium.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                “Premium gave me a mentor and certificate. That certificate helped me land interviews faster.”
              </p>
              <div className="font-bold text-gray-900">– Grace, Cohort 5</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                “The CV review and job referrals from Premium opened doors I never thought possible.”
              </p>
              <div className="font-bold text-gray-900">– Daniel, Cohort 4</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                “With Premium, I joined an alumni network that still supports me today.”
              </p>
              <div className="font-bold text-gray-900">– Aisha, Cohort 3</div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="bg-gradient-to-r from-[#F1D4FF] to-[#F1D4FF] py-30 px-6 text-center text-white">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">
          Don’t Miss Out – Premium Spots Are Filling Fast!
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto text-gray-950/50">
          Applications close soon. Secure your Premium spot and get mentorship, certification, and job support.
        </p>
        <Link to={"/premium/checkout"} className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
          Get Premium Access
        </Link>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[27px] md:text-[32px] font-bold text-white mb-2">
            Ready to transform your career?
          </h2>
          <p className="md:text-[14px] text-[13px] text-gray-400 mb-10">
            Applications for TechLaunchNG Internships close in 3 weeks. Don't miss your chance.
          </p>
          <Link className="group sm:px-4 w-[fit-content] px-3 py-2 sm:py-2 bg-white hover:bg-gray-100 text-gray-900 text-[16px] font-bold rounded-lg transition-all duration-300 flex items-center gap-3 mx-auto" to={"/techlaunchng/internships"}>
            Enroll for free!
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
}