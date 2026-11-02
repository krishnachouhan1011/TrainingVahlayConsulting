import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Wifi,
  Phone,
  Tv,
  MonitorPlay,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Pricing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Handle the Continue button click
  const handleContinue = () => {
    // Mark this lesson (id: 7 based on sidebar data) as complete
    markLessonComplete(7);
    // Navigate to the next logical lesson (e.g., Business Rules)
    navigate("/business-rules2");
  };

  const handleExit = () => {
    navigate("/");
  };

  // --- PRICING DATA ---
  const internetBundles = [
    {
      name: "Business Internet Premier",
      speed: "500 Mbps+",
      totalPrice: 80,
      breakdown: [
        { item: "Internet Premier", cost: "$50" },
        { item: "Advanced Business WiFi", cost: "$10" },
        { item: "Spectrum Business Voice", cost: "$20" },
      ],
    },
    {
      name: "Business Internet Ultra",
      speed: "750 Mbps+",
      totalPrice: 110,
      breakdown: [
        { item: "Internet Ultra", cost: "$80" },
        { item: "Advanced Business WiFi", cost: "$10" },
        { item: "Spectrum Business Voice", cost: "$20" },
      ],
    },
    {
      name: "Business Internet GIG",
      speed: "1000 Mbps+",
      totalPrice: 120,
      breakdown: [
        { item: "Internet GIG", cost: "$100" },
        { item: "Advanced Business WiFi", cost: "Free", isFree: true },
        { item: "Spectrum Business Voice", cost: "$20" },
      ],
    },
  ];

  const tvPackages = [
    {
      name: "Spectrum Business Streaming TV",
      price: "$45",
      note: "(streaming no box)",
    },
    { name: "Spectrum Business TV (Basic Package)", price: "$40", note: "" },
    { name: "Spectrum Business TV Premier", price: "$70", note: "" },
    {
      name: "Spectrum Business TV Add-on",
      price: "$15",
      note: "Each (applies to Premier TV & Above) e.g., HBO, Starz, Sports Fan TV, etc.",
    },
  ];

  const tvEquipmentFees = [
    { name: "Spectrum Business HD Receiver", price: "$15", note: "Each" },
    { name: "Apple TV", price: "$10", note: "" },
    { name: "Spectrum Xumo Stream Box", price: "$5", note: "Each" },
    { name: "Broadcasting Fees", price: "$31", note: "" },
  ];

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
              Spectrum Offers / Pricing
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer"
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
                PAGE 7 of 14
              </span>
              <h1 className="text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Pricing
              </h1>
              <div className="w-24 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Statement Block */}
            <div className="max-w-4xl mx-auto text-center animate-fade-in delay-200 px-4 mt-16 mb-24">
              <div className="w-16 h-1 bg-red-600 mx-auto mb-10 rounded-full"></div>
              <blockquote className="mb-10">
                <p className="text-2xl md:text-3xl lg:text-[28px] font-batangas font-bold text-slate-900 leading-relaxed italic">
                  "Have you reviewed the latest pricing and promos to ensure you
                  are making the right offer to our customers? PartnerLink has
                  the latest rates, promos and competitor prices in your region.
                  Read more below to find out how you can stay ahead of the
                  competition."
                </p>
              </blockquote>
              <div className="w-16 h-1 bg-red-600 mx-auto mt-10 rounded-full"></div>
            </div>

            {/* Internet Bundles Section */}
            <div className="mb-20 animate-fade-in">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Wifi size={28} />
                </div>
                <h2 className="text-3xl font-batangas font-bold text-slate-900">
                  Business Internet Bundles
                </h2>
              </div>

              {/* Note: mt-6 is added here so the absolute badges have space to render without overlapping the header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                {internetBundles.map((bundle, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all duration-300 flex flex-col relative group"
                  >
                    {/* Card Header (Rounded top corners to replace overflow-hidden) */}
                    <div className="bg-slate-900 p-6 text-center text-white relative rounded-t-2xl border-b border-red-600 group-hover:bg-slate-800 transition-colors">
                      {/* Speed Badge */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_4px_10px_rgba(220,38,38,0.4)] whitespace-nowrap z-10">
                        {bundle.speed}
                      </div>
                      <h3 className="text-xl font-batangas font-bold mt-4 mb-2 text-red-100">
                        {bundle.name}
                      </h3>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-4xl font-batangas font-bold">
                          ${bundle.totalPrice}
                        </span>
                        <span className="text-gray-400 mb-1 font-medium">/mo</span>
                      </div>
                    </div>

                    {/* Card Body - Breakup (Rounded bottom corners) */}
                    <div className="p-6 flex-1 bg-white/50 flex flex-col rounded-b-2xl">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                        Price Breakup
                      </h4>
                      <ul className="space-y-4 flex-1">
                        {bundle.breakdown.map((item, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-start gap-4 text-gray-700 font-medium"
                          >
                            <span className="flex items-start gap-2">
                              <CheckCircle2
                                size={16}
                                className="text-red-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                              />
                              <span className="text-[14px] leading-snug">
                                {item.item}
                              </span>
                            </span>
                            <span
                              className={`font-bold shrink-0 ${item.isFree ? "text-emerald-500 uppercase text-sm" : "text-slate-900 font-batangas text-base"}`}
                            >
                              {item.cost}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standalone Voice Callout */}
            <div className="mb-20 animate-fade-in bg-slate-900 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgba(15,23,42,0.3)] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-white/10 rounded-full shrink-0 group-hover:bg-red-600 transition-colors">
                  <Phone size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-batangas font-bold mb-1 transition-colors">
                    Standalone Business Voice
                  </h3>
                  <p className="text-gray-300 text-lg font-medium">
                    Add reliable voice lines to any internet package.
                  </p>
                </div>
              </div>
              <div className="bg-white text-slate-900 px-8 py-4 rounded-2xl flex items-center gap-2 shadow-inner shrink-0 relative z-10 border border-gray-200">
                <span className="text-4xl font-batangas font-bold text-red-600">$20</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest leading-tight ml-2">
                  Each Line
                  <br />
                  w/ Internet
                </span>
              </div>
            </div>

            {/* Business TV Section */}
            <div className="mb-12 animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Tv size={28} />
                </div>
                <h2 className="text-3xl font-batangas font-bold text-slate-900">
                  Business TV Pricing
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* TV Packages */}
                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl shadow-sm p-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                  <h3 className="flex items-center gap-3 text-xl font-batangas font-bold text-slate-900 mb-6 border-b border-gray-100 pb-4 transition-colors">
                    <MonitorPlay size={24} className="text-red-600" />
                    Packages & Streaming
                  </h3>
                  <ul className="space-y-6">
                    {tvPackages.map((pkg, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 text-base md:text-lg block">
                            {pkg.name}
                          </span>
                          {pkg.note && (
                            <span className="text-xs md:text-sm text-gray-500 mt-1 block leading-snug font-medium">
                              {pkg.note}
                            </span>
                          )}
                        </div>
                        <div className="text-xl font-batangas font-bold text-red-600 shrink-0 mt-1 sm:mt-0">
                          {pkg.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Equipment & Fees */}
                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl shadow-sm p-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                  <h3 className="flex items-center gap-3 text-xl font-batangas font-bold text-slate-900 mb-6 border-b border-gray-100 pb-4 transition-colors">
                    <PlusCircle size={24} className="text-red-600" />
                    Equipment & Broadcasting Fees
                  </h3>
                  <ul className="space-y-6">
                    {tvEquipmentFees.map((fee, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 text-base md:text-lg">
                            {fee.name}
                          </span>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-3">
                          <span className="text-xl font-batangas font-bold text-red-600">
                            {fee.price}
                          </span>
                          {fee.note && (
                            <span className="text-xs text-gray-400 font-semibold w-10 text-left uppercase tracking-wider">
                              {fee.note}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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

export default Pricing;