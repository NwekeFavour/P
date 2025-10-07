import React, { useState } from "react";
import { Star, Crown, ArrowRight, Users, Award, Zap, GraduationCap, ChevronDown, ArrowUpCircle, Wallet, UserCheck, Sparkles, Check, X } from "lucide-react";
import Header from "../components/header";

import Footer from "../components/footer";
import { Link } from "react-router-dom";

export default function Premium() {
    const [openIndex, setOpenIndex] = useState();

    const plans = [
        {
        name: 'Free',
        tagline: 'Try Before You Commit',
        icon: Sparkles,
        price: '₦0',
        description: 'Get started and explore our learning materials.',
        features: [
            { text: 'Access to learning materials', included: true },
            { text: 'Community forum access', included: true },
            { text: 'Weekly group webinars', included: true },
            { text: 'Work on small projects', included: true },
            { text: 'Real-world projects', included: false },
            { text: '1-on-1 mentorship', included: false },
            { text: 'Resume & portfolio support', included: false },
            { text: 'Job placement assistance', included: false },
            { text: 'Industry certificate', included: false }
        ],
        highlighted: false,
        color: 'gray',
        cta: 'Start Free',
        link: "/techlaunchng/internships"
        },
        {
        name: 'Premium',
        tagline: 'Unlock Everything',
        icon: Crown,
        price: '₦5,000',
        period: 'one-time payment',
        description: 'Full access to program, projects, mentorship, and career support.',
        features: [
            { text: 'Everything in Free, plus:', included: true, bold: true },
            { text: 'Full 12-week intensive program', included: true },
            { text: '3–5 real-world projects', included: true },
            { text: 'Weekly 1-on-1 mentorship', included: true },
            { text: 'Priority code reviews', included: true },
            { text: 'Resume & portfolio workshops', included: true },
            { text: 'Mock interview preparation', included: true },
            { text: 'Direct company introductions', included: true },
            { text: 'Industry-recognized certificate', included: true },
            { text: 'Lifetime alumni network access', included: true },
            { text: 'Job placement support', included: true, highlight: true },
            { text: 'Certificate of completion', included: true, highlight: true }
        ],
        highlighted: true,
        color: 'gray',
        cta: 'Go Premium',
        link: "/premium/checkout",
        badge: 'BEST VALUE'
        }
    ];

    const accordionData = [
      {
        icon: GraduationCap,
        color: 'blue',
        title: 'What is TechLaunch NG Premium?',
        content: 'TechLaunch NG Premium is an advanced membership that gives you access to exclusive mentorship, networking sessions, and job opportunities. It’s designed to help you go beyond the basics and fast-track your tech career.'
      },
      {
        icon: ArrowUpCircle,
        color: 'red',
        title: 'Can I upgrade later after joining the free track?',
        content: 'Yes, you can start free and upgrade to Premium at any time before your cohort ends.'
      },
      {
        icon: Wallet,
        color: 'green',
        title: 'Do I need to pay to join the internship?',
        content: 'No, joining the main TechLaunch Internship is free. The Premium plan is optional and provides extra benefits like certificates, mentorship, and networking access.'
      },
      {
        icon: UserCheck,
        color: 'purple',
        title: 'Is Premium worth it if I’m still a beginner?',
        content: 'Absolutely! Premium is designed to support learners at all levels. Beginners gain structured guidance and mentorship, while experienced learners benefit from job prep, networking, and advanced challenges.'
      },
    ];
    
    
      const colorClasses = {
        blue: {
          gradient: 'from-blue-500 to-cyan-500',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          iconBg: 'bg-blue-100',
          hoverBorder: 'hover:border-blue-400'
        },
        gray: {
            gradient: 'from-gray-500 to-sky-600',
            bg: 'bg-gray-50',
            text: 'text-gray-600',
            border: 'border-gray-300',
            iconBg: 'bg-gray-100',
            button: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
        },
        purple: {
          gradient: 'from-purple-500 to-pink-500',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-600',
          iconBg: 'bg-purple-100',
          hoverBorder: 'hover:border-purple-400'
        },
        green: {
          gradient: 'from-green-500 to-emerald-500',
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          iconBg: 'bg-green-100',
          hoverBorder: 'hover:border-green-400'
        },
        red: {
          gradient: 'from-red-500 to-orange-500',
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-600',
          iconBg: 'bg-red-100',
          hoverBorder: 'hover:border-red-400'
        }
      };
  return (
    <div className="bg-white text-gray-900">
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Crown className="mx-auto w-10 h-10 text-yellow-400 mb-6" />
          <h1 className="text-[30px] md:text-[32px] lg:text-[50px] font-bold leading-tight mb-4">
            Unlock <span className="text-yellow-400">Premium Access</span>, Level Up Your Tech Career
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Go beyond the basics. Premium members get mentorship, certificates, job referrals,
            and exclusive access to real-world challenges designed by industry experts.
          </p>
          <Link to={"/premium/checkout"} className="group px-8 py-3 w-fit bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition flex items-center gap-2 mx-auto">
            Upgrade Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* WHY PREMIUM SECTION */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Premium?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            You’ve learned the fundamentals — now it’s time to accelerate. Premium is for
            those ready to take their tech journey to the next level.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: Users,
              title: "1-on-1 Mentorship",
              desc: "Get matched with senior developers who’ll guide your career and help you grow faster.",
            },
            {
              icon: Award,
              title: "Certificate of Excellence",
              desc: "Earn verified certificates to showcase your skills and credibility to employers.",
            },
            {
              icon: Zap,
              title: "Career Growth Tools",
              desc: "Gain access to job referrals, resume reviews, mock interviews, and growth communities.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition"
              >
                <Icon className="w-12 h-12 text-gray-900 mb-6" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="bg-white">
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
                    <Star className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Simple Pricing</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    One Payment,
                    <span className="block bg-gradient-to-r from-sky-600 access via-gray-600 to-sky-600 bg-clip-text text-transparent">
                    Lifetime Access
                    </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Try for free or unlock everything with a single payment. No subscriptions. No hidden fees.
                </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                {plans.map((plan, index) => {
                    const colors = colorClasses[plan.color];
                    const Icon = plan.icon;

                    return (
                    <div
                        key={index}
                        className={`relative rounded-3xl transition-all duration-300 ${
                        plan.highlighted
                            ? 'transform md:-translate-y-4 shadow-2xl'
                            : 'shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {plan.badge && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                            <div className={`bg-gradient-to-r ${colors.gradient} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                            {plan.badge}
                            </div>
                        </div>
                        )}

                        <div
                        className={`h-full rounded-3xl border-2 ${
                            plan.highlighted ? colors.border : 'border-gray-200'
                        } bg-white overflow-hidden`}
                        >
                        {/* Header */}
                        <div className={`${plan.highlighted ? colors.bg : 'bg-gray-50'} p-8 border-b ${plan.highlighted ? colors.border : 'border-gray-200'}`}>
                            <div className="flex items-center justify-between mb-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <Icon className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-sm text-gray-500 font-medium">{plan.tagline}</span>
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                            <div className="flex items-end gap-2 mb-1">
                            <span className="text-6xl font-bold text-gray-900">{plan.price}</span>
                            </div>
                            {plan.period && (
                            <p className="text-sm text-gray-500">{plan.period}</p>
                            )}
                        </div>

                        {/* Features */}
                        <div className="p-8">
                            <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                {feature.included ? (
                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    <Check className="w-4 h-4 text-white" />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <X className="w-4 h-4 text-gray-400" />
                                    </div>
                                )}
                                <span className={`${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'} ${feature.bold ? 'font-semibold' : ''} ${feature.highlight ? 'font-semibold text-green-600' : ''}`}>
                                    {feature.text}
                                </span>
                                </li>
                            ))}
                            </ul>

                            <Link to={plan.link}
                            className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${colors.button} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                            >
                            {plan.cta}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        </div>
                    </div>
                    );
                })}
                </div>

                {/* Guarantee Section */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 border-2 border-purple-200">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-500/10 to-sky-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Our Promise to You
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Complete the program, put in the work, and you’ll have the skills, portfolio, 
                    and connections to land a tech job. We’ll support you until you get interview opportunities.
                    </p>
                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                    <Check className="w-6 h-6" />
                    <span>95% of graduates secure jobs within 6 months</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600">
            Hear from past Premium members who took the leap, and never looked back.
          </p>
        </div>

        <div className="grid md:grid-cols-3 md:gap-5 sm:gap-4 gap-3 lg:gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Amina Yusuf",
              role: "Frontend Developer at Kuda",
              quote: "The mentorship I got through Premium changed how I code and collaborate. Totally worth it!",
            },
            {
              name: "David Nwankwo",
              role: "Backend Engineer at Flutterwave",
              quote: "I landed a remote job after completing Premium. It was a total game changer.",
            },
            {
              name: "Faith Chinedu",
              role: "Product Designer at Paystack",
              quote: "Premium made me believe in my skills — the growth and community support are unmatched.",
            },
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition">
              <Star className="text-yellow-400 w-6 h-6 mb-4" />
              <p className="italic text-gray-700 mb-6">“{t.quote}”</p>
              <div>
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* faq */}
      <section>
        <div>
            <div className="sm:flex items-center justify-between md:m-10 sm:m-5 lg:m-12 xl:m-20">
                <div className="xl:w-[40%] md:w-[50%] sm:w-[50%] lg:w-[45%] p-6" id="faq">
                    <p className="m-0 font-bold lg:text-[40px] md:text-[34px] sm:text-[26px] text-[25px]">Frequently asked Questions!</p>
                    <p className="m-0 text-gray-600 mt-3">Didn’t find what you’re looking for? Get in touch, our team is happy to assist you.</p>
                    <div className=" sm:mt-5 lg:mt-5 md:mt-4 mt-7">
                        <Link to={"/contact-us"} className="bg-cyan-900 rounded-xl sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 px-7 py-3  lg:py-3 text-white">Contact Us</Link>
                    </div>
                </div>
                <div className="xl:w-[60%] md:w-[50%] sm:w-[60%] lg:w-[50%] p-6">
                            <div className="space-y-4">
          {accordionData.map((item, index) => {
            const isOpen = openIndex === index;
            const colors = colorClasses[item.color];
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isOpen ? colors.border : 'border-gray-200'
                } ${colors.hoverBorder} shadow-sm hover:shadow-lg`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full md:px-6 px-6 py-2 sm:py-3 sm:px-4 md:py-2 flex items-center justify-between gap-4 text-left group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`sm:w-12 w-10 h-10 lg:p-0 p-2 sm:h-12 rounded-xl flex items-center justify-center ${colors.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-[14px] md:text-[16px] text-gray-900 group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-6 h-6 ${isOpen ? colors.text : 'text-gray-400'}`} />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`px-6 pb-6 pt-2 ${colors.bg} border-t ${colors.border}`}>
                    <div className="sm:pl-16">
                      <p className="text-gray-700 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-900 text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to invest in your growth?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of Nigerian tech talents who went Premium and accelerated their journey.
          </p>
          <button className="group px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition flex items-center gap-2 mx-auto">
            Get Premium Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
