import React, { useState, useRef } from "react";
import { Menu, X, ArrowRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const BusinessRules2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Handle the Continue button click
  const handleContinue = () => {
    // Mark this lesson (id: 8 based on sidebar data) as complete
    markLessonComplete(8);
    // Navigate to the next logical lesson (e.g., Buyflow)
    navigate("/thank-you");
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
              Spectrum Offers / Business Rules
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
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Page Header */}
            <div className="mb-12 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-4">
                PAGE 8 of 14
              </span>
              <h1 className="text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Business Rules
              </h1>
              <div className="w-24 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Statement Block */}
            <div className="max-w-6xl mx-auto text-center animate-fade-in delay-200 px-4 mt-16 mb-24">
              {/* Top Divider */}
              <div className="w-16 h-1 bg-red-600 mx-auto mb-10 rounded-full"></div>

              <blockquote className="mb-10">
                <p className="text-2xl md:text-3xl lg:text-[28px] font-batangas font-bold text-slate-900 leading-relaxed italic">
                  "As a Selling Partner, you can sell Spectrum coax services and
                  products to a wide variety of businesses. However, there are a
                  few rules that you must follow when you are out on the road.
                  Please refer to the list below when engaging customers."
                </p>
              </blockquote>

              {/* Bottom Divider */}
              <div className="w-16 h-1 bg-red-600 mx-auto mt-10 rounded-full"></div>
            </div>

            {/* Rules of Engagement by Vertical Section */}
            <div className="max-w-6xl mx-auto animate-fade-in  delay-200">
              <h2 className="text-3xl md:text-4xl font-batangas font-bold text-slate-900 mb-10">
                Rules of Engagement by Vertical
              </h2>

              {/* MDU Section */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-4 transition-colors">
                  Multi Dwelling Units (MDU)
                </h3>
                <p className="text-lg text-gray-700 font-medium leading-relaxed mb-6">
                  SMB cannot sell any services to those properties identified as
                  MDU properties, such as but not limited to:
                </p>

                <ul className="space-y-4 text-gray-700 font-medium text-lg leading-relaxed mb-10">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>Apartment complexes (including the offices)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      Corporate housing and senior / assisted living facilities
                      (including the offices)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      All sales for MDU properties must be referred to the
                      Community Solutions / MDU team
                    </span>
                  </li>
                </ul>

                {/* Info Note Card */}
                <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col items-start gap-4 shadow-[0_8px_30px_rgba(15,23,42,0.3)]">
                  <div className="shrink-0 mt-0.5">
                    <Info className="text-red-500" size={24} />
                  </div>
                  <p className="text-lg font-medium text-gray-300 leading-relaxed">
                    <strong className="text-white font-bold">
                      Exceptions:
                    </strong>{" "}
                    All requests should be referred to the Spectrum Community
                    Solutions Channel Partner program.
                  </p>
                </div>
              </div>

              {/* Hospitality Section */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6 transition-colors">
                  Hospitality
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium text-lg leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB Channel Partners are unable to sell to Hospitality
                      customers. Generally includes hotels, motels, casinos with
                      hotels, major sports franchises, special events
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB may sell Hospitality customers with less than 10 units
                    </span>
                  </li>
                </ul>
              </div>

              {/* Healthcare Section */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6 transition-colors">
                  Healthcare
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium text-lg leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB Channel Partners are unable to sell to Healthcare
                      customers. Generally, includes hospitals, affiliated
                      branch locations & labs (protected vertical)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB may sell privately owned healthcare offices requesting
                      coax services (no approval needed)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB Channel Partners and VARs may sell coax services to
                      MDU Healthcare facilities following the ICB process
                      defined under Spectrum Community Solutions (Senior
                      retirement homes, nursing homes, assisted living
                      apartments, rehabilitation centers)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Franchises Section */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-4 transition-colors">
                  Franchises
                </h3>
                <p className="text-lg text-gray-700 font-medium leading-relaxed flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                  <span>
                    SMB may sell coax services into locally owned franchises
                  </span>
                </p>
              </div>

              {/* Education Section */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6 transition-colors">
                  Education
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium text-lg leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB Channel Partners are unable to sell to Education
                      customers. Generally includes K-12 schools
                      (funded/non-funded), colleges / universities including
                      offices, classrooms, campus housing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB may sell coax to for profit institutions (technical,
                      beauty, tutoring centers, daycare)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Government Section */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6 transition-colors">
                  Government
                </h3>
                <ul className="space-y-4 text-gray-700 font-medium text-lg leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB Channel Partners are unable to sell to Government
                      customers. Generally includes State and Local entities and
                      other public entities such as public libraries, municipal
                      water treatment facilities, prison, etc.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      SMB may not sell services to any Government entity
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>
                      All Federal Government includes Native American tribes,
                      foreign embassies / consulates, the American Red Cross and
                      the National Center for Missing & Exploited Children and
                      services purchased from the GSA Federal Supply Schedule
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* End Rules of Engagement Section */}
          </div>
        </div>

        {/* Continue Button Floating Footer */}
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

      {/* Simple Fade In Animation Style */}
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

export default BusinessRules2;
