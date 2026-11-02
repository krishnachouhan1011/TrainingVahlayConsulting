import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Briefcase,
  MessageSquare,
  Target,
  HeartHandshake,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar2, { markLessonComplete } from "./Sidebar2";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Introduction = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  const handleContinue = () => {
    // 1. Mark this lesson as complete
    // Note: Ensure ID matches your Sidebar2 data.
    markLessonComplete(1);

    // 2. Navigate to the next page
    navigate("/whats-changing");
  };

  const handleExit = () => {
    navigate("/");
  };

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
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500  transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Introduction / Lesson Outcomes
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-5xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-8 lg:mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 1
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Lesson Outcomes
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Intro Text */}
            <div className="prose max-w-none mb-10 animate-fade-in delay-100">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                At the end of this course, you will be able to:
              </p>
            </div>

            {/* Outcomes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in delay-200">
              {/* Card 1 */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all duration-300 hover:border-red-200 group flex flex-col items-start gap-4">
                <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 group-hover:scale-110 duration-300">
                  <Briefcase size={28} />
                </div>
                <div>
                  <h3 className="font-batangas font-bold text-slate-900 text-xl mb-3 transition-colors">
                    Adhere to Business Rules
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base font-medium">
                    Adhere to business rules for the updated{" "}
                    <span className="font-bold text-slate-900">
                      Spectrum Business Pricing and Packaging
                    </span>{" "}
                    when making sales.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all duration-300 hover:border-red-200 group flex flex-col items-start gap-4">
                <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 group-hover:scale-110 duration-300">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h3 className="font-batangas font-bold text-slate-900 text-xl mb-3 transition-colors">
                    Communicate Effectively
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base font-medium">
                    Communicate the updated Spectrum Business Pricing and
                    Packaging to customers clearly and accurately.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all duration-300 hover:border-red-200 group flex flex-col items-start gap-4">
                <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 group-hover:scale-110 duration-300">
                  <Target size={28} />
                </div>
                <div>
                  <h3 className="font-batangas font-bold text-slate-900 text-xl mb-3 transition-colors">
                    Incorporate Value
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base font-medium">
                    Incorporate updated Spectrum Business Pricing and Packaging
                    bundles and the resulting{" "}
                    <span className="font-bold text-slate-900">
                      added value
                    </span>{" "}
                    in customer conversations.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all duration-300 hover:border-red-200 group flex flex-col items-start gap-4">
                <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 group-hover:scale-110 duration-300">
                  <HeartHandshake size={28} />
                </div>
                <div>
                  <h3 className="font-batangas font-bold text-slate-900 text-xl mb-3 transition-colors">
                    Demonstrate Commitment
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base font-medium">
                    Demonstrate fulfillment of{" "}
                    <span className="font-bold text-slate-900">
                      Customer Commitment
                    </span>{" "}
                    in all customer interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Bar */}
        {isBottomReached && (
          <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer text-sm lg:text-base tracking-widest uppercase"
            >
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
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

export default Introduction;
