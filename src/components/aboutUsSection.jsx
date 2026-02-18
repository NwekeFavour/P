import React from 'react';
import { Target, Heart, Lightbulb, Users, Award, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <div className="py-10 sm:py-20 px-3 sm:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 border border-gray-500/20 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Our Story</span>
          </div>
          <h2 className="sm:text-[30px] text-[26px] md:text-6xl font-bold text-black mb-6 leading-tight">
            Building Nigeria's Next
            <span className="block devs bg-gradient-to-r dark:from-gray-50 dark:via-gray-500 dark:to-gray-800 from-gray-900 via-gray-400 to-gray-400 bg-clip-text text-transparent">
              Generation of Developers
            </span>
          </h2>
          <p className="sm:text-[20px] text-[16px] text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe every Nigerian student with passion and drive deserves the opportunity to build a thriving tech career, regardless of background or connections.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Left Column - Story */}
        <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed sm:text-[18px] text-[16px]">
                To bridge the gap between university education and industry demands by providing hands-on, paid internship experiences that transform students into job-ready software engineers.
            </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed  sm:text-[18px] text-[16px]">
                A Nigeria where talented students don't struggle to break into tech. Where learning leads directly to earning. Where your first line of code can become your path to financial freedom.
            </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
            <div className="flex items-center gap-4 mb-6">
  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
    <Lightbulb className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-2xl font-bold text-gray-900">Our Approach</h3>
</div>

<p className="text-gray-600 leading-relaxed sm:text-[18px] text-[16px]">
  We simulate real-world engineering environments where you work on meaningful products, follow agile sprints, receive senior-level code reviews, and ship production-ready features. No toy projects. No empty promises. Just practical experience that builds true product engineers.
</p>

            </div>
        </div>

        {/* Right Column - Stats & Values */}
        <div className="space-y-6">
            {/* Impact Stats */}
            {/* <div className="bg-gradient-to-br from-sky-950/50  to-gray-950 rounded-3xl p-8 shadow-lg text-white">
            <h3 className="text-2xl font-bold mb-6">Our Impact</h3>
            <div className="grid grid-cols-2 gap-6">
                <div>
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-sm opacity-90">Students Trained</div>
                </div>
                <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-90">Job Placement</div>
                </div>
                <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-90">Partner Companies</div>
                </div>
                <div>
                <div className="text-4xl font-bold mb-2">₦2.5B+</div>
                <div className="text-sm opacity-90">Paid in Stipends</div>
                </div>
            </div>
            </div> */}

            {/* Core Values */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Values</h3>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Excellence</h4>
                    <p className="text-gray-600 text-sm">We demand high standards and celebrate exceptional work</p>
                </div>
                </div>
                <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Community</h4>
                    <p className="text-gray-600 text-sm">We lift each other up and succeed together</p>
                </div>
                </div>
                <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Growth</h4>
                    <p className="text-gray-600 text-sm">We believe in continuous learning and improvement</p>
                </div>
                </div>
                <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Impact</h4>
                    <p className="text-gray-600 text-sm">We measure success by the lives we transform</p>
                </div>
                </div>
            </div>
            </div>

            {/* Testimonial Quote */}
            {/* <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
            <div className="mb-4">
                <svg className="w-10 h-10 text-blue-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>
            <p className="text-gray-600 text-lg mb-4 italic leading-relaxed">
                "knownly didn't just teach me to code, they showed me I could build a career I'm proud of. Within 2 months of graduating, I landed a role at a top fintech company."
            </p>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                AM
                </div>
                <div>
                <div className="font-semibold text-gray-900">Adebayo Michael</div>
                <div className="text-sm text-gray-500">Cohort 4, Now at Paystack</div>
                </div>
            </div>
            </div> */}
        </div>
        </div>

      </div>
    </div>
  );
}