import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Banknote,
  RefreshCcw,
  FileX,
  RefreshCw,
  Plus,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

import MobileImage1 from "../../assets/MobilePageImage1.png";
import MobileImage2 from "../../assets/MobilePageImage2.png";
import MobileImage3 from "../../assets/MobilePageImage3.png";

// ==========================================
// CUSTOM COMPONENT: INTERACTIVE MOBILE MARKER
// ==========================================
const MobileMarker = ({
  number,
  title,
  description,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center relative group w-full md:w-1/4 p-4">
      {/* Top Icon & Title */}
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-">
          {Icon}
        </div>
        <h3 className="text-lg font-batangas font-bold text-slate-900 text-center h-14 transition-colors">
          {title}
        </h3>
      </div>

      {/* Interactive Number Button */}
      <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-300 z-10 cursor-pointer
                    ${
                      isActive
                        ? "bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)] scale-110"
                        : "bg-white text-slate-900 border border-gray-200 hover:border-red-400  hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)]"
                    }`}
      >
        {number}
      </button>

      {/* Expanding Description Box */}
      <div
        className={`
                absolute top-45 w-[95%] bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 z-20 transition-all duration-300 origin-top
                ${isActive ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"}
            `}
      >
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-200 rotate-45"></div>
        <h4 className="font-batangas font-bold text-slate-900 mb-2">{title}</h4>
        {/* Render description as HTML to handle <strong> tags */}
        <div
          className="text-sm font-medium text-gray-600 leading-relaxed font-poppins"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="absolute top-3 right-3 text-gray-400  transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// CUSTOM COMPONENT: FLASHCARD
// ==========================================
const Flashcard = ({ frontContent, backContent, frontImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-72 sm:w-64 sm:h-72 perspective-[1000px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-3d
                    ${isFlipped ? "transform-[rotateY(180deg)]" : ""}
                `}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 text-center rounded-2xl shadow-sm border border-gray-200 bg-white/90 backdrop-blur-md group-hover:border-red-200 group-hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all ${frontImage ? "p-0" : ""}`}
        >
          {frontImage ? (
            <div className="w-full h-full flex items-center justify-center p-6 overflow-hidden rounded-2xl">
              <img
                src={frontImage}
                alt="Card Front"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            frontContent
          )}
          <div className="absolute bottom-4 right-4 text-gray-300 transition-colors">
            <RefreshCw size={20} />
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] flex flex-col justify-center p-8 bg-slate-900 text-white rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.3)] border border-slate-800">
          {backContent}
          <div className="absolute bottom-4 right-4 text-white/30 hover:text-white transition-colors">
            <RefreshCw size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Mobile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMobileMarker, setActiveMobileMarker] = useState(null);
  const [active5GAccordion, setActive5GAccordion] = useState(null);

  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Handle the Continue button click
  const handleContinue = () => {
    // Mark this lesson as complete
    markLessonComplete(6);
    // Navigate to the next logical lesson
    navigate("/pricing");
  };

  const handleExit = () => {
    navigate("/");
  };

  const toggle5GAccordion = (index) => {
    setActive5GAccordion(active5GAccordion === index ? null : index);
  };

  // Data for Mobile Benefits Markers
  const mobileBenefitsData = [
    {
      id: 1,
      title: "No Hassle",
      description:
        "Spectrum Mobile delivers the <strong class='text-slate-900'>fastest overall speeds</strong> and is the <strong class='text-slate-900'>most reliable</strong>, coast to coast.",
      icon: <CheckCircle2 size={56} strokeWidth={1.5} />,
    },
    {
      id: 2,
      title: "Affordable",
      description:
        "Taxes and fees are included for a <strong class='text-slate-900'>low monthly payment</strong>.",
      icon: <Banknote size={56} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: "Convenient",
      description:
        "<strong class='text-slate-900'>Unlimited talk and text</strong> to the U.S., Mexico and Canada.",
      icon: <RefreshCcw size={56} strokeWidth={1.5} />,
    },
    {
      id: 4,
      title: "No Contracts",
      description:
        "Bills are easy to understand and there are <strong class='text-slate-900'>no contracts</strong>.",
      icon: <FileX size={56} strokeWidth={1.5} />,
    },
  ];

  // Data for Plans Flashcards
  const plansFlashcardsData = [
    {
      front: (
        <div className="text-slate-900 text-2xl font-batangas font-bold">
          By the Gig
          <br />
          <span className="text-red-600">Plan</span>
        </div>
      ),
      back: (
        <ul className="text-gray-200 text-sm space-y-3 text-left w-full pl-2 font-medium font-poppins">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
            <span>$19.99 a GB</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
            <span>Pay only for the data you need</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
            <span>1 GB at a time</span>
          </li>
        </ul>
      ),
    },
    {
      front: (
        <div className="text-slate-900 text-2xl font-batangas font-bold">
          Unlimited
          <br />
          <span className="text-red-600">Data Plan</span>
        </div>
      ),
      back: (
        <ul className="text-gray-200 text-sm space-y-3 text-left w-full pl-6 font-medium font-poppins">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
            <span>$29.99 a month</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
            <span>30 GB of data</span>
          </li>
        </ul>
      ),
    },
    {
      front: (
        <div className="text-slate-900 text-2xl font-batangas font-bold">
          Unlimited Plus
          <br />
          <span className="text-red-600">Plan</span>
        </div>
      ),
      back: (
        <ul className="text-gray-200 text-sm space-y-3 text-left w-full pl-6 font-medium font-poppins">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
            <span>$39.99 a month</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
            <span>50 GB of data</span>
          </li>
        </ul>
      ),
    },
  ];

  // Data for Coverage Flashcards
  const coverageFlashcardsData = [
    {
      frontImage: MobileImage2,
      back: (
        <p className="text-gray-200 text-sm leading-relaxed text-center font-medium font-poppins">
          Help businesses gain the coverage they deserve. Spectrum Mobile
          delivers the fastest overall speeds, and is the most reliable, coast
          to coast.
        </p>
      ),
    },
    {
      frontImage: MobileImage3,
      back: (
        <p className="text-gray-200 text-sm leading-relaxed text-center font-medium font-poppins">
          With Spectrum WiFi hotspots, customers can now create a secure
          Internet connection on their mobile device wherever they are and never
          worry about not having access to WiFi while on-the-go.
        </p>
      ),
    },
  ];

  // Data for 5G Benefits Accordion
  const benefits5GData = [
    {
      title: "Speeds",
      content:
        "Stay connected with upload and download speeds even faster than 4G LTE, and a network of nationwide WiFi hotspots for the best overall mobile experience.",
    },
    {
      title: "Enhanced Streaming",
      content:
        "Enhanced video transmission provides less delays and glitches, so you can seamlessly stream movies on the go or video-chat with remote clients.",
    },
    {
      title: "Navigation",
      content:
        "Uninterrupted navigation ensures you won't miss a turn while en route to a destination.",
    },
    {
      title: "Devices",
      content:
        "Maximize the capabilities with your powerful 5G phone with speeds faster than 4G LTE, perfect for early adopters who want the latest and greatest devices with fast, reliable and expansive coverage.",
    },
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
              Products / Mobile
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
                PAGE 6 of 14
              </span>
              <h1 className="text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Mobile
              </h1>
              <div className="w-24 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Hero Image */}
            <div className="relative h-100 lg:h-125 rounded-3xl overflow-hidden mb-16 shadow-lg animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
              <img
                src={MobileImage1}
                alt="Business Mobile Solutions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent"></div>
            </div>

            {/* Statement Block */}
            <div className="max-w-4xl mx-auto text-center animate-fade-in delay-200 px-4 mb-24">
              <div className="w-16 h-1 bg-red-600 mx-auto mb-8 rounded-full"></div>

              <blockquote className="mb-8">
                <p className="text-2xl md:text-3xl lg:text-[28px] font-batangas text-slate-900 leading-relaxed italic">
                  "With Spectrum Mobile's easy-to-understand plans, the focus
                  can be kept on keeping their business running in the office or
                  on-the-go.*"
                </p>
              </blockquote>

              <div className="w-16 h-1 bg-red-600 mx-auto mt-8 rounded-full mb-6"></div>

              <p className="text-sm font-medium text-gray-500">
                *Spectrum Internet is required for the sign up of Spectrum
                Mobile.
              </p>
            </div>

            {/* Mobile Benefits Section */}
            <div className="mb-24 animate-fade-in relative">
              <div className="absolute top-0 left-0 w-full h-40 bg-slate-900 rounded-t-3xl opacity-100 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-red-600/30 to-transparent mix-blend-overlay"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-size-[30px_30px]"></div>
              </div>

              <div className="pt-12 md:px-12">
                <h1 className="text-4xl px-8 font-batangas font-bold text-white mb-16 drop-shadow-md">
                  Mobile
                </h1>

                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-12 relative z-0">
                  <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                    Benefits
                  </h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-16 max-w-4xl">
                    Find out why Spectrum Mobile is the fastest growing mobile
                    provider in the U.S., with features such as:
                  </p>

                  <div className="flex flex-col md:flex-row justify-around items-start relative pb-48">
                    <div className="hidden md:block absolute top-13 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10"></div>

                    {mobileBenefitsData.map((benefit, index) => (
                      <MobileMarker
                        key={benefit.id}
                        number={index + 1}
                        title={benefit.title}
                        description={benefit.description}
                        icon={benefit.icon}
                        isActive={activeMobileMarker === benefit.id}
                        onClick={() =>
                          setActiveMobileMarker(
                            activeMobileMarker === benefit.id
                              ? null
                              : benefit.id,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Plans Section (Flashcards) */}
            <div className="mb-12 sm:mb-20 animate-fade-in bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-4xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
              {/* Header Section */}
              <div className="text-center md:text-left mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
                  Mobile Plans
                </h2>
                <p className="text-gray-600 font-medium text-base sm:text-lg leading-relaxed max-w-4xl mx-auto md:mx-0">
                  Spectrum Mobile delivers the fastest overall speeds and is the
                  most reliable, coast to coast.
                </p>
              </div>

              {/* Responsive Grid Container for Flashcards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 place-items-center">
                {plansFlashcardsData.map((card, index) => (
                  <div
                    key={index}
                    className={`w-full flex justify-center ${
                      // If there are exactly 3 cards, this perfectly centers the 3rd card
                      // on tablet views (md) before returning to a 3-column row on desktop (lg)
                      plansFlashcardsData.length === 3 && index === 2
                        ? "md:col-span-2 lg:col-span-1"
                        : ""
                    }`}
                  >
                    <div className="w-full max-w-87.5 sm:max-w-sm md:max-w-none">
                      <Flashcard
                        frontContent={card.front}
                        backContent={card.back}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Plans Include Section */}
            <div className="mb-24 animate-fade-in p-4 md:p-8">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-10">
                All Plans Include:
              </h2>

              <ul className="space-y-8">
                <li className="flex items-start gap-5">
                  <div className="mt-2 shrink-0 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                  <p className="text-gray-700 font-medium text-lg leading-relaxed">
                    <strong className="text-slate-900">
                      Unlimited free talk and text
                    </strong>{" "}
                    to the U.S., Mexico and Canada
                  </p>
                </li>
                <li className="flex items-start gap-5">
                  <div className="mt-2 shrink-0 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                  <p className="text-gray-700 font-medium text-lg leading-relaxed">
                    <strong className="text-slate-900">
                      No added taxes, fees or line charges
                    </strong>
                    ; They're already included - unlike competition
                  </p>
                </li>
                <li className="flex items-start gap-5">
                  <div className="mt-2 shrink-0 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                  <p className="text-gray-700 font-medium text-lg leading-relaxed">
                    <strong className="text-slate-900">No contracts</strong>;
                    Simply add or subtract lines as needed
                  </p>
                </li>
                <li className="flex items-start gap-5">
                  <div className="mt-2 shrink-0 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                  <p className="text-gray-700 font-medium text-lg leading-relaxed">
                    <strong className="text-slate-900">
                      Customers can bring their own phone or get a new phone
                    </strong>
                    ; Spectrum Mobile works with most popular phones from Apple,
                    Samsung, Google and LG
                  </p>
                </li>
                <li className="flex items-start gap-5">
                  <div className="mt-2 shrink-0 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                  <p className="text-gray-700 font-medium text-lg leading-relaxed">
                    <strong className="text-slate-900">5G now available</strong>
                    , with all Spectrum Mobile Plans
                  </p>
                </li>
              </ul>
            </div>

            {/* Reliable Coverage Section */}
            <div className="mb-20 animate-fade-in bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Reliable Coverage
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-12 max-w-4xl">
                Review how Spectrum Mobile allows customers to stay connected
                with our nationwide network and WiFi hotspots.
              </p>

              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {coverageFlashcardsData.map((card, index) => (
                  <Flashcard
                    key={index}
                    frontImage={card.frontImage}
                    backContent={card.back}
                  />
                ))}
              </div>
            </div>

            {/* Benefits of 5G Section */}
            <div className="mb-20 animate-fade-in p-4 md:p-8">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Benefits of 5G
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-12 max-w-4xl">
                Spectrum Mobile customers can continue to take advantage of
                Spectrum's fastest mobile service, access Spectrum home WiFi &
                thousands of nationwide hotspots, and experience 5G speeds in
                more areas where they live and work.
              </p>

              <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                {benefits5GData.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <button
                      onClick={() => toggle5GAccordion(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <h3 className="font-batangas font-bold text-slate-900 text-lg pr-8 transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-gray-400 shrink-0 transition-colors">
                        {active5GAccordion === index ? (
                          <Minus size={20} strokeWidth={1.5} />
                        ) : (
                          <Plus size={20} strokeWidth={1.5} />
                        )}
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${active5GAccordion === index ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed bg-gray-50 border-t border-gray-100">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* End Benefits of 5G Section */}
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
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
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

export default Mobile;
