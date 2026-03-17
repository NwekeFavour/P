import React, { useState } from "react";
import {
  ArrowRight,
  Users,
  Zap,
  Target,
  Sparkles,
  Megaphone,
  MessageCircle,
  X,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

function AmbassadorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    platform: "",
    socialHandle: "",
    whyAmbassador: "",
    experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace this with your actual API endpoint
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/ambassador-application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus(null);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            platform: "",
            socialHandle: "",
            whyAmbassador: "",
            experience: "",
          });
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      title: "Campus Advocate",
      description:
        "Represent Knownly at your university, spreading awareness about internships, mentorship, and skill-building programs.",
      icon: Megaphone,
    },
    {
      title: "Community Builder",
      description:
        "Organize workshops, info sessions, and events that inspire students to take control of their career journeys.",
      icon: Users,
    },
    {
      title: "Thought Leader",
      description:
        "Share insights, create content, and become a trusted voice for career development in your network.",
      icon: MessageCircle,
    },
  ];

  const responsibilities = [
    {
      text: "Host Events:",
      detail:
        "Organize at least 2 community events per semester (workshops, webinars, or meetups), online or in-person.",
    },
    {
      text: "Create Content:",
      detail:
        "Share Knownly updates on social media and relevant communities weekly.",
    },
    {
      text: "Recruit Participants:",
      detail:
        "Drive sign-ups for Knownly internships and programs through your network.",
    },
    {
      text: "Provide Feedback:",
      detail:
        "Share insights from your community to help us improve our programs.",
    },
    {
      text: "Be a Brand Voice:",
      detail:
        "Embody Knownly values of accessibility, excellence, and community in everything you do.",
    },
    {
      text: "Monthly Check-ins:",
      detail:
        "Attend ambassador sync calls and submit monthly activity reports.",
    },
  ];

  const perks = [
    {
      icon: Users,
      title: "Work with the Team",
      description:
        "Collaborate directly with Knownly team members and get insider access to company operations.",
    },
    {
      icon: Zap,
      title: "Free Premium Access",
      description:
        "Full access to all Knownly internships and mentorship programs at no cost.",
    },
    {
      icon: Target,
      title: "Performance Bonuses",
      description:
        "Earn rewards based on events hosted, students recruited, and overall impact.",
    },
    {
      icon: Sparkles,
      title: "Leadership Experience",
      description:
        "Build event management, marketing, and community leadership skills that employers value.",
    },
    {
      icon: Users,
      title: "Global Network",
      description:
        "Connect with ambassadors across Africa and beyond, building lasting professional relationships.",
    },
    {
      icon: Megaphone,
      title: "Exclusive Merch",
      description:
        "Knownly-branded swag, hoodies, and ambassador kits to represent the brand on campus.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Apply",
      description:
        "Fill out our application form. Share your platform (campus, social media, tech community) and how you plan to grow KnownlyHQ reach.",
    },
    {
      number: "2",
      title: "Interview",
      description:
        "We will have a casual chat to understand your goals, audience, and how we can support your ambassador journey.",
    },
    {
      number: "3",
      title: "Get Your Kit",
      description:
        "Receive your ambassador resources: brand guidelines, content templates, swag, and access to our private Slack community.",
    },
    {
      number: "4",
      title: "Go Live",
      description:
        "Start creating! Host events, share content, recruit interns, and earn rewards based on your impact.",
    },
  ];

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 left-0 end-0 opacity-5">
          <div className="absolute top-[100px] left-[500px] w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 pt-13 sm:pt-20">
          <div className="mx-auto text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="sm:text-sm text-[12px] font-semibold text-orange-700">
                  Applications Now Open
                </span>
              </div>
            </div>

            <h1 className="text-[32px] md:text-[40px] lg:text-[60px] lg:mb-4 mb-3 font-bold text-gray-900 leading-tight">
              Become a Knownly <br />
              <span className="text-gray-400">Ambassador</span>
            </h1>

            <p className="text-[15px] md:text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Join a community of passionate advocates who are building the
              future of work. Open to students, young professionals, and
              community leaders across Africa.
            </p>

            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group lg:text-center md:text-start text-start px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white text-[14px] font-semibold rounded-lg transition-all duration-300 flex items-center gap-3"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Images Section */}
      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-widest mb-2">
              Our Community
            </p>
            <h2 className="text-[27px] md:text-[35px] font-bold text-gray-900">
              Built by People, <span className="text-gray-400">For People</span>
            </h2>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Large left image */}
            <div
              className="col-span-2 row-span-2 rounded-2xl overflow-hidden h-[260px] md:h-[420px]"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=80"
                alt="Community gathering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Top right */}
            <div
              className="col-span-1 rounded-2xl overflow-hidden h-[125px] md:h-[200px]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                alt="Students collaborating"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Top far right */}
            <div
              className="col-span-1 rounded-2xl overflow-hidden h-[125px] md:h-[200px]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="150"
            >
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80"
                alt="Workshop session"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom right */}
            <div
              className="col-span-1 rounded-2xl overflow-hidden h-[125px] md:h-[200px]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80"
                alt="Team discussion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom far right */}
            <div
              className="col-span-1 rounded-2xl overflow-hidden h-[125px] md:h-[200px]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="250"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                alt="Networking event"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Caption strip */}
          {/* Bottom strip */}
          <div className="mt-10 bg-orange-50 border border-orange-100 rounded-2xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <p className="text-sm font-semibold text-orange-700">
                Applications Now Open — Be Among the First
              </p>
            </div>
            <p className="text-sm text-gray-500 text-center md:text-right max-w-md">
              We're building our founding cohort of ambassadors. The first wave
              sets the culture, and gets the most visibility.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 group"
            >
              Claim Your Spot
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* What is Ambassador Section */}
      <section className="md:py-18 py-13 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[27px] md:text-[35px] lg:text-[40px] font-bold text-gray-900 mb-4 leading-tight">
              What is a Knownly Ambassador?
            </h2>
            <p className="md:text-[18px] text-[15px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You're not just a promoter, you're a changemaker. Ambassadors gain
              leadership experience, build their personal brand, and unlock
              career opportunities while bringing Knownly's mission to life in
              their communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={index * 200}
                >
                  <Icon className="w-8 h-8 text-gray-900 mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="bg-gray-50 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[27px] md:text-[35px] lg:text-[40px] font-bold text-gray-900 mb-4">
              What You'll Do
            </h2>
            <p className="md:text-[18px] text-[15px] text-gray-600 max-w-3xl mx-auto">
              Your role is flexible, impactful, and designed to fit your
              schedule. Here's what we expect from our ambassadors:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-l-4 border-gray-900 hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                // {/* ✅ changed from fade-left */}
                data-aos-duration="1000"
                data-aos-delay={index * 100}
                //  {/* ✅ reduced delay */}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl text-gray-900 font-bold">✓</span>
                  <div>
                    <strong className="text-gray-900">{item.text}</strong>
                    <span className="text-gray-600"> {item.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="bg-gray-900 md:py-18 py-13 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[27px] md:text-[35px] lg:text-[40px] font-bold mb-4">
              What You Get
            </h2>
            <p className="md:text-[18px] text-[15px] text-gray-400 max-w-3xl mx-auto">
              Being a Knownly Ambassador isn't just about giving back, it's
              about leveling up your own career game.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay={index * 150}
                >
                  <Icon className="w-8 h-8 mb-4" />
                  <h4 className="text-xl font-bold mb-3">{perk.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section
        className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50"
        id="apply"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[27px] md:text-[35px] lg:text-[40px] font-bold text-gray-900 mb-4">
              How to Apply
            </h2>
            <p className="md:text-[18px] text-[15px] text-gray-600 max-w-3xl mx-auto">
              Ready to lead? The application process is simple, but we're
              looking for people who are serious about making an impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={index * 200}
              >
                <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[27px] md:text-[32px] font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="md:text-[14px] text-[13px] text-gray-400 mb-10">
            Applications are open now. Don't miss your chance to be part of
            something bigger.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group sm:px-4 w-[fit-content] px-3 py-2 sm:py-3 bg-white hover:bg-gray-100 text-gray-900 text-[16px] font-bold rounded-lg transition-all duration-300 flex items-center gap-1 mx-auto"
          >
            Apply
            <span className="md:block hidden">to Become an Ambassador</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Ambassador Application
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Join the KnownlyHQ community
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Primary Platform *
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select your platform</option>
                  <option value="campus">Campus/University</option>
                  <option value="twitter">Twitter/X</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube/TikTok</option>
                  <option value="community">Tech Community/Meetup</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Social Handle */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Social Media Handle (Optional)
                </label>
                <input
                  type="text"
                  name="socialHandle"
                  value={formData.socialHandle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  placeholder="@yourusername or your profile link"
                />
              </div>

              {/* Why Ambassador */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Why do you want to be a Knownly
                  <br /> Ambassador? *
                </label>
                <textarea
                  name="whyAmbassador"
                  value={formData.whyAmbassador}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us what motivates you and how you plan to grow Knownly's reach..."
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Relevant Experience (Optional)
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Have you organized events, managed communities, or created content before? Tell us about it."
                />
              </div>

              {/* Submit Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-green-800">
                    Application submitted successfully! We'll be in touch soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-800">
                    Something went wrong. Please try again or contact support.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-3 sm:px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 md:px-6 px-2 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit{" "}
                      <span className="md:block hidden">Application</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AmbassadorsPage;
