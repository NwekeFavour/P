import React from "react";
import Header from "../components/header";
import { ArrowRight } from "lucide-react";
import ManTwo from "../assets/images/man2.webp";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

function JoinWorkspace() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center bg-[#F9FAFB] px-6 py-24 overflow-hidden">
        {/* Background Image Accent */}
        <div className="absolute inset-0 opacity-10">
          <img
            src={ManTwo}
            alt="TechLaunchNG-Internship-Man-Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Join the <span className="text-gray-700">TechLaunch NG</span>{" "}
            Workspace
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Step into a collaborative environment built for developers,
            designers, and tech enthusiasts. Our workspace connects talent,
            mentors, and recruiters, empowering everyone to build, learn, and
            grow together.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="https://join.slack.com/example-link"
              className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-gray-800 transition-transform duration-300"
            >
              Join Workspace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Support Text */}
          <div className="mt-12 text-gray-700 text-sm leading-relaxed">
            <p className="font-semibold text-base mb-1">
              Having trouble joining?
            </p>
            <p>
              If both links fail, please try again later or contact{" "}
              <a
                href="mailto:support@techlaunch.ng"
                className="text-blue-600 hover:underline"
              >
                support@techlaunch.ng
              </a>{" "}
              for assistance.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default JoinWorkspace;
