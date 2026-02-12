import React, { useState, useEffect } from "react";
import { Rocket, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Knownly from "../assets/images/knownly-removebg-preview.png";

export default function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "internship", label: "Internship", href: "/internship" },
    { id: "talent", label: "Talent", href: "/knownly/talents" },
    { id: "premium", label: "Premium", href: "/premium" },
  ];

  useEffect(() => {
    const current = navLinks.find((link) => link.href === location.pathname);
    setActiveLink(current ? current.id : "");
  }, [location.pathname]);

  const handleNavClick = (linkId, href) => {
    setActiveLink(linkId);
    setMobileMenuOpen(false);

    // Simulate route loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* GitHub-style Loading Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-blue-600 animate-loading-bar" />
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#FAFAFA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start leading-none group cursor-pointer">
                {/* The Brand Name */}
                <span className="text-2xl brand font-bold! tracking-tighter text-gray-900 md:text-3xl">
                  KNOWNLY
                </span>

                {/* The Sub-text */}
                <span className="text-[10px] brand font-bold! tracking-[0.25em] text-indigo-600 uppercase mt-0.5 flex items-center justify-center w-[100%]">
                  Internships
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={() => {
                    handleNavClick(link.id, link.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeLink === link.id
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  {activeLink === link.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={"/knownly/internships"}
                className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.href}
                    onClick={(e) => {
                      handleNavClick(link.id, link.href);
                    }}
                    className={`px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
                      activeLink === link.id
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Link
                    to={"/internship"}
                    className="px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <style>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-loading-bar {
          animation: loading-bar 1s ease-in-out;
        }
      `}</style>
    </>
  );
}
