import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Award,
  CheckCircle,
  Target,
  TrendingUp,
  Users,
  Zap,
  Gift,
  Shield,
  Star,
  BookOpen,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// IMPORT HELPER FUNCTION
import Sidebar2, { markLessonComplete } from "./Sidebar2";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Summary = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Navigation Handler
  const handleContinue = () => {
    // Mark the final summary lesson complete (assuming Lesson 9)
    markLessonComplete(9);

    // Navigate to a final landing page, certificate, or root dashboard
    navigate("/");
  };

  const handleExit = () => {
    navigate("/");
  };

  // Learning Objectives Data
  const learningObjectives = [
    "What the business rules are for the updated Spectrum Business Pricing and Packaging when making sales.",
    "How to communicate the updated Spectrum Business Pricing and Packaging to customers.",
    "How to incorporate the updated bundles, Life Unlimited, and the resulting added value in customer conversations.",
    "The importance of demonstrating our Customer Commitment in all customer interactions.",
  ];

  // Key takeaways data
  const keyTakeaways = [
    {
      icon: <Target size={24} />,
      title: "Price Guarantees",
      description:
        "1-Year, 2-Year, and 3-Year Price Guarantees based on bundles and paid Lines of Business.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Internet Tiers",
      description:
        "Premier, Ultra, Gig, and 2 Gig with increasing speeds and capabilities for businesses.",
    },
    {
      icon: <Users size={24} />,
      title: "Multi-Line Mobile Discounts",
      description:
        "Tiered savings structure with 1 line included, plus discounted rates for 2+ lines.",
    },
    {
      icon: <Zap size={24} />,
      title: "Increased Data Allowance",
      description:
        "30GB on Unlimited plans and 50GB on Unlimited Plus plans for business customers.",
    },
    {
      icon: <Gift size={24} />,
      title: "Free Line Offer",
      description:
        "One Mobile line included when bundled with Spectrum Business Internet.",
    },
    {
      icon: <Shield size={24} />,
      title: "Business Rules",
      description:
        "30-day activation window, bundle requirements, and eligibility criteria.",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar2
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative bg-white w-full">
        {/* Header */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Course Summary
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500 tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Content Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth flex flex-col custom-scrollbar bg-gray-50"
        >
          <div className="max-w-6xl mx-auto w-full p-6 lg:p-12 pb-32">
            {/* Title Section - Consistent with other pages */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Course Completion
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Congratulations!
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Hero Banner - Redesigned to match course theme */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm mb-12 animate-fade-in delay-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-30"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="bg-red-50 border border-red-100 p-6 rounded-3xl text-red-600 shrink-0">
                  <Award size={64} strokeWidth={1.5} />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-batangas font-bold text-slate-900 mb-4">
                    You've Completed the Course!
                  </h2>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">
                    You now have the tools to discuss the benefits and value of
                    the updated Spectrum Business Pricing and Packaging to your
                    customers.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Takeaways Section - Grid layout like other pages */}
            <div className="mb-12 animate-fade-in delay-200">
              <h2 className="text-2xl lg:text-3xl font-batangas font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Star className="text-red-600" size={28} />
                Key Takeaways
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyTakeaways.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h3 className="font-batangas font-bold text-slate-900 text-lg">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 font-medium text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* You've Learned Section */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm animate-fade-in delay-300 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
              <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                <div className="bg-red-50 border border-red-100 p-2.5 rounded-xl text-red-600">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-batangas font-bold text-slate-900">
                  What You've Learned
                </h2>
              </div>

              <ul className="space-y-5">
                {learningObjectives.map((item, index) => (
                  <li key={index} className="flex gap-4 items-start group">
                    <div className="shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed font-medium">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Completion badge */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-5 bg-emerald-50/50 p-6 rounded-2xl">
                <div className="bg-emerald-100 p-3 rounded-full shrink-0 border border-emerald-200">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-batangas font-bold text-emerald-800 text-lg mb-1">
                    Course Completed Successfully
                  </h4>
                  <p className="text-emerald-700 font-medium text-sm">
                    You are now ready to apply these strategies in the field and
                    help business customers get the most value from Spectrum
                    services.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps - Optional section */}
            <div className="mt-10 text-center animate-fade-in delay-400">
              <p className="text-gray-500 font-medium text-sm">
                Click the button below to finish button and return to the
                dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Continue Button - Only show when bottom reached */}
        {isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
            >
              <span>FINISH</span>
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Summary;
