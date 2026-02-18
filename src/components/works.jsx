import React from "react";
import {
  FileText,
  Users,
  Code,
  Rocket,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Apply Online",
      description:
        "Submit your application with your university details and tell us why you want to join. No prior coding experience required, just passion and commitment.",
      duration: "10 minutes",
      color: "blue",
    },
    {
      number: "02",
      icon: Users,
      title: "Application Review & Confirmation",
      description:
        "Our team reviews your application carefully. Within 1–3 days, you’ll receive an email confirming whether you’ve been accepted into the cohort, along with next steps.",
      duration: "1–3 days",
      color: "purple",
    },
    {
      number: "03",
      icon: Code,
      title: "Start Learning & Building",
      description:
        "Join your cohort of 200 incubees. Week 1-2: intensive training bootcamp. Week 3-8: work on real projects with daily standups, code reviews, and mentorship.",
      duration: "8 weeks",
      color: "green",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Launch Your Career",
      description:
        "Graduate with a portfolio of production projects, industry certificate, and direct introductions to hiring companies. Start earning ₦200k-₦500k monthly.",
      duration: "Lifetime",
      color: "orange",
    },
  ];

  const colorClasses = {
    blue: {
      gradient: "from-indigo-500 to-cyan-500",
      bg: "bg-indigo-500",
      lightBg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200",
      iconBg: "bg-indigo-100",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-500",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      iconBg: "bg-purple-100",
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      iconBg: "bg-green-100",
    },
    orange: {
      gradient: "from-orange-500 to-red-500",
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      iconBg: "bg-orange-100",
    },
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-100 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              The Process
            </span>
          </div>
          <h2 className="xl:text-4xl md:text-[30px] text-[26px] md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            From Application To
            <span className="block  job bg-gradient-to-r dark:from-sky-100/90 dark:via-sky-200/70 dark:to-gray-200 from-sky-600/10 via-sky-600/40 to-gray-600 bg-clip-text text-transparent">
              Your Dream Job
            </span>
          </h2>
          <p className="sm:text-[20px] text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A clear, proven path from where you are now to landing your first
            tech role
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-orange-200" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color];
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Desktop Layout */}
                  <div
                    className={`hidden lg:grid grid-cols-2 gap-12 items-center ${isEven ? "" : "direction-rtl"}`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={index * 200}>
                    {/* Content Side */}
                    <div
                      className={`${isEven ? "text-right pr-12" : "text-left pl-12 col-start-2"}`}>
                      <div
                        className={`inline-block ${isEven ? "" : "text-left"}`}>
                        <div className="flex items-center gap-3 mb-4">
                          {isEven && (
                            <>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-500 font-medium">
                                  {step.duration}
                                </span>
                              </div>
                              <div
                                className={`text-5xl font-bold ${colors.text} opacity-20`}>
                                {step.number}
                              </div>
                            </>
                          )}
                          {!isEven && (
                            <>
                              <div
                                className={`text-5xl font-bold ${colors.text} opacity-20`}>
                                {step.number}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-500 font-medium">
                                  {step.duration}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg max-w-md">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Icon Side */}
                    <div
                      className={`${isEven ? "col-start-2" : "col-start-1"} flex ${isEven ? "justify-start pl-12" : "justify-end pr-12"}`}>
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-3xl blur-xl opacity-30`}
                        />
                        <div
                          className={`relative w-24 h-24 bg-gradient-to-br ${colors.gradient} rounded-3xl flex items-center justify-center shadow-2xl`}>
                          <Icon className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl blur-lg opacity-30`}
                          />
                          <div
                            className={`relative w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        {index !== steps.length - 1 && (
                          <div
                            className="w-1 h-full bg-gradient-to-b from-blue-200 to-purple-200 mx-auto mt-4"
                            style={{ minHeight: "60px" }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`text-3xl font-bold ${colors.text} opacity-20`}>
                            {step.number}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-500 font-medium">
                              {step.duration}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Circle Indicator - Desktop Only */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`w-4 h-4 ${colors.bg} rounded-full border-4 border-white shadow-lg`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What You'll Get Section */}
        <div className="mt-20 bg-gradient-to-br from-gray-900/50 dark:from-gray-50/90 dark:to-gray-400 to-gray-900 rounded-3xl p-5 md:p-12 shadow-2xl">
          <h3 className="sm:text-[28px] text-[26px] md:text-4xl font-bold text-white text-center mb-10">
            What You'll Get Along The Way
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Earnings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
              <CheckCircle className="w-10 h-10 text-green-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">
                Earning Opportunities
              </h4>
              <p className="text-gray-400 text-sm">
                Connect with internships, projects & jobs, many earn
                ₦150k–₦500k within months.
              </p>
            </div>

            {/* Certificate */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
              <Award className="w-10 h-10 text-blue-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Certificate</h4>
              <p className="text-gray-400 text-sm">
                Industry-recognized certificate to boost your credibility with
                employers.
              </p>
            </div>

            {/* Portfolio */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
              <Code className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Portfolio</h4>
              <p className="text-gray-400 text-sm">
                Graduate with 3–5 production-ready projects to showcase your
                skills.
              </p>
            </div>

            {/* Network */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
              <Users className="w-10 h-10 text-orange-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Network</h4>
              <p className="text-gray-400 text-sm">
                Join 5,000+ peers, alumni & mentors opening doors to
                opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-600 sm:text-[20px] text-[16px] mb-8 max-w-2xl mx-auto">
            Applications for knownly internships close in 3 weeks. Don't miss
            your chance.
          </p>
          <Link
            to={"/internships"}
            className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-indigo-900 hover:from-sky-700 hover:to-gray-700 text-white text-lg font-bold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
            Apply Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            500 spots remaining • Starting February 2025
          </p>
        </div>
      </div>
    </div>
  );
}
