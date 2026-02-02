import React, { useState, useEffect } from "react";
import { Rocket, ShieldCheck, Globe, Zap, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./header";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const generatedStars = Array.from({ length: 200 }, (_, i) => {
      const brightness = Math.random();
      const isTwinkling = brightness > 0.3;
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: brightness > 0.7 ? 2 : brightness > 0.4 ? 1.5 : 1,
        opacity: brightness > 0.7 ? 1 : brightness > 0.4 ? 0.8 : 0.6,
        twinkleDuration: isTwinkling ? Math.random() * 2 + 1.5 : 0,
        twinkleDelay: Math.random() * 3,
        isTwinkling,
      };
    });
    setStars(generatedStars);
  }, []);

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Fast-Track Learning",
      desc: "Zero to production-ready in 12 weeks."
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      title: "Remote First",
      desc: "Work with global teams from Nigeria."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Verified Skills",
      desc: "Portfolio projects vetted by CTOs."
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-sky-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-black to-black pointer-events-none" />
      
      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: star.isTwinkling
                ? `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`
                : "none",
            }}
          />
        ))}
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Glow Badge */}
          <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-white/5 border border-white/10 text-sm transition-all hover:bg-white/10 hover:border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-gray-300">Enrollment Open for 2026</span>
            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
          </div>

          <h1 className="text-[28px] md:text-6xl lg:text-7xl font-bold mb-3 md:mb-8 tracking-tight">
            Engineering the <br />
            <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic">
              Future of African Tech
            </span>
          </h1>

          <p className="text-[16px] md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Break the gravity of traditional education. Gain the skills, 
            mentorship, and network to build world-class software.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Button onClick={() => navigate("/knownly/internships")} className="h-14 px-8 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              Get Started for Free
            </Button>
            <Button variant="ghost" className="h-14 px-8 text-white hover:bg-white/5 hover:text-white rounded-xl border border-white/10">
              View the Roadmap
            </Button>
          </div>

          {/* Floating Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {features.map((f, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}