import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// IMPORTANT: Import 'markLessonComplete' inside the curly braces
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const WhySpectrum = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  const handleContinue = () => {
    // 1. Mark 'Why Spectrum' (ID: 1) as complete
    markLessonComplete(1);

    // 2. Navigate to the next page
    navigate("/benefits");
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar3
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
              High Level Overview / Why Spectrum?
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 rounded-full hover:bg-red-50 cursor-pointer"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-12 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Welcome
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Why Spectrum?
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Welcome Letter */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-8 mb-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all italic text-gray-600 leading-relaxed font-medium">
              <h3 className="text-xl font-batangas font-bold text-slate-900 not-italic mb-4">
                Welcome to the Spectrum Playbook!
              </h3>
              <p className="mb-6">
                Today, companies are increasingly citing communications
                technology as a competitive advantage when evaluating their
                growth opportunities. Your unique role as a preferred
                telecommunications advisor is an important one, and at Spectrum,
                our intent is to help you achieve nothing less.
              </p>
              <p className="mb-8">
                As an Authorized Selling Partner in the program, you now have
                access to sell customized, scalable and reliable solutions in
                Spectrum's Internet, Voice, Mobile, TV & Networking product
                sets. The ultimate goal is to provide you with the best services
                possible that are built to accommodate businesses of all sizes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action - Only show when bottom reached */}
        {isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
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
        .animate-bounce-slow {
          animation: bounce 3s infinite;
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

export default WhySpectrum;
