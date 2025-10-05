import React from "react";
import { CheckCircle, Star, Rocket, Crown, ArrowRight, Users, Award, Zap } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import PricingSection from "../components/pricing";

export default function Premium() {
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
          <button className="group px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition flex items-center gap-2 mx-auto">
            Upgrade Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
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
      <section className="py-24 px-6 bg-white">
       <PricingSection/>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600">
            Hear from past Premium members who took the leap — and never looked back.
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
