import React, { useState, useEffect } from "react";
import { Rocket, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Header from "./header";

export default function HeroSection() {
  const [stars, setStars] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("Thinking... 🤔");
    setModalOpen(true);
// https://p2-p48o.onrender.com
    try {
      const res = await fetch("https://p2-p48o.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

    await new Promise((r) => setTimeout(r, 2000));
    setAnswer("This is your AI-generated answer...");
        const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("⚠️ Error: Could not fetch response.");
    } finally {
      setLoading(false);
    }
  };

  const presetQuestions = [
    "How can we help you?",
    "How do I get into tech?",
    "What is React?",
    "How can I get an internship?",
    "Which tech skills are in demand?",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute inset-0">
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
              boxShadow:
                star.size > 1.5
                  ? "0 0 2px rgba(255,255,255,0.8)"
                  : "none",
            }}
          />   
        ))}
      </div>

      <Header />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="sm:inline-flex flex sm:justify-center justify-start sm:w-[220px] w-[190px] items-center gap-2 px-4 py-2 mb-6 rounded-full bg-sky-950/50 border border-sky-800/50 text-blue-300 text-sm backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Build. Learn. Earn</span>
          </div>

          {/* Headline */}
          <h1 className="lg:text-[60px] text-start sm:text-center md:text-[50px] sm:text-[40px] text-[28px] font-[600] text-white sm:mb-2 mb-4 leading-tight">
            Launch Your Tech Career
            <span className="block strats bg-gradient-to-r dark:from-gray-100 dark:via-gray-200 dark:to-sky-100 from-gray-300 font-[700] via-gray-500 to-sky-900 bg-clip-text text-transparent">
              Into The Stratosphere
            </span>
          </h1>

          <p className="text-[14px] lg:text-[18px] text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed text-start sm:text-center">
            Real-world projects. Industry mentors. Remote experience. Get paid
            to learn and build production-ready skills that Nigerian tech
            companies are hiring for.
          </p>

          {/* AI Input */}
          <div className="sm:max-w-2xl mx-auto space-y-6">
            {/* Question input form */}
            <form
              onSubmit={handleAskAI}
              className="bg-[#262626]/40 rounded-lg px-3 sm:px-4 mx-auto flex gap-3 border border-gray-700"
            >
              <Input
                type="text"
                placeholder="Ask me something..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 h-12 sm:h-14 border-0 text-white placeholder:text-gray-400 bg-transparent focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="h-12 sm:h-14 px-6 sm:px-8 bg-transparent hover:bg-transparent text-white font-medium flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Asking...
                  </>
                ) : (
                  <>
                    Ask <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Preset Questions */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuestion(q)}
                className="px-4 py-2 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition text-sm sm:text-base"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-[#262626] text-white border border-[#262626] max-w-lg w-[95%] sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">AI Response</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm sm:text-base">
              {question}
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          <div className="mt-4 p-3 sm:p-4 bg-[#262626] border border-[#ffff]/20 rounded-lg text-gray-200 whitespace-pre-line text-sm sm:text-base">
            {loading ? (
              // Skeleton loader (replaces answer while waiting)
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
              </div>
            ) : answer ? (
              <p className="text-gray-200">{answer}</p>
            ) : (
              <p className="text-gray-500 text-sm italic">
                Your AI response will appear here...
              </p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              onClick={() => setModalOpen(false)}
              className="bg-gray-50 hover:bg-gray-700 text-black hover:text-white w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Star Animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}