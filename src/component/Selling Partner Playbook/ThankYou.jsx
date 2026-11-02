import React, { useState, useRef } from "react";
import { Menu, X, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

import thankYouBG from "../../assets/ThankYouPage.png";

const ThankYou = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Handle the Finish button click
  const handleFinish = () => {
    // Mark the final lesson as complete (Assuming ID 11 for the final Compensation Plan/Summary)
    markLessonComplete(11);
    // Navigate back to the homepage/dashboard
    navigate("/");
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar3
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative bg-white w-full">
        {/* Standard Header */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500  transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Playbook / Complete
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-5xl mx-auto p-6 lg:p-12 pb-32">
            {/* Page Header */}
            <div className="mb-12 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-4">
                PAGE 14 of 14
              </span>
              <h1 className="text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Thank you!
              </h1>
              <div className="w-24 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Hero Image with Overlay */}
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-xl animate-fade-in group hover:shadow-[0_8px_30px_rgba(0,255,255,0.1)] transition-all duration-500">
              {/* Grayscale Handshake Image */}
              <img
                src={thankYouBG}
                alt="Business Handshake"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Vahlay Red Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

              {/* Subtle Raindrop Red Accent */}
              <div className="absolute inset-0 bg-[rgba(230,173,173,0.1)] pointer-events-none mix-blend-overlay"></div>
            </div>

            {/* Copyright / Confidentiality Footer */}
            <div className="max-w-4xl mx-auto text-center animate-fade-in delay-200 px-4 mt-16">
              <p className="text-[15px] md:text-base font-bold text-slate-900 leading-relaxed tracking-wide font-poppins opacity-80">
                © 2026 Vahlay Consulting. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Finish Button Floating Footer */}
        {isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleFinish}
              className="group flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-emerald-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
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

export default ThankYou;