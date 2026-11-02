import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Check,
  CloudLightning,
  Star,
  Tv,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

import VideoImage1 from "../../assets/VideoPageImage1.png";
import VideoImage2 from "../../assets/VideoPageImage2.png";
import VideoImage3 from "../../assets/VideoPageImage3.png";
import VideoImage4 from "../../assets/VideoPageImage4.png";

// ==========================================
// CUSTOM COMPONENT: INTERACTIVE TV MARKER
// ==========================================
const TvPackageMarker = ({
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

const Video = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTvMarker, setActiveTvMarker] = useState(null);

  // Tab states
  const [activePackageTab, setActivePackageTab] = useState(0);
  const [activeBarTab, setActiveBarTab] = useState(0);

  // State for the Bar & Restaurant interactive checklist
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
  });

  const navigate = useNavigate();
  const packageTabsRef = useRef(null);
  const barTabsRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  const handleContinue = () => {
    markLessonComplete(5);
    navigate("/mobile");
  };

  const handleExit = () => {
    navigate("/");
  };

  const scrollTabs = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 200;
      if (direction === "left") {
        ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Data for TV Package Markers
  const tvPackagesData = [
    {
      id: 1,
      title: "Reliable Service",
      description:
        "TV service that's <strong class='text-slate-900'>reliable in any weather</strong>, unlike satellite TV.",
      icon: <CloudLightning size={56} strokeWidth={1.5} />,
    },
    {
      id: 2,
      title: "Unbeatable Value",
      description:
        "<strong class='text-slate-900'>Free</strong> HD and local channels included.",
      icon: <Star size={56} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: "Superior Selection",
      description:
        "Choose from <strong class='text-slate-900'>over 200</strong> news, sports, family & entertainment <strong class='text-slate-900'>channels</strong>.<br/><br/>Free local channels included in every package.",
      icon: <Tv size={56} strokeWidth={1.5} />,
    },
    {
      id: 4,
      title: "No Contracts",
      description:
        "<strong class='text-slate-900'>Never </strong>worry about hidden fees or contracts.",
      icon: <ShieldCheck size={56} strokeWidth={1.5} />,
    },
  ];

  // Data for TV Packages Tabs
  const tvPackagesTabsData = [
    {
      title: "TV Stream",
      content: (
        <div className="font-medium text-gray-600 animate-fade-in">
          <p className="text-lg mb-1">
            <strong className="text-red-600">60+</strong> Live Steaming Channels
          </p>
          <p className="text-lg mb-8">
            Perfect for businesses that want a{" "}
            <strong className="text-slate-900">
              variety of top programming
            </strong>
            .
          </p>
          <h4 className="font-batangas font-bold text-slate-900 mb-6">
            Popular Streaming Channels Include:
          </h4>
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex justify-center p-6 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
            <img
              src={VideoImage1}
              alt="Game Time TV Channels"
              className="h-48 object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Business TV",
      content: (
        <div className="font-medium text-gray-600 animate-fade-in">
          <p className="text-lg mb-1">
            <strong className="text-red-600">50+</strong> HD Channels
          </p>
          <p className="text-lg mb-8">
            For businesses that need{" "}
            <strong className="text-slate-900">local channels</strong>,{" "}
            <strong className="text-slate-900">basic news</strong> and{" "}
            <strong className="text-slate-900">entertainment</strong>.
          </p>
          <h4 className="font-batangas font-bold text-slate-900 mb-6">
            Popular Streaming Channels Include:
          </h4>
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex justify-center p-6 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
            <img
              src={VideoImage2}
              alt="Game Time TV Channels"
              className="h-48 object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Business TV Premier",
      content: (
        <div className="font-medium text-gray-600 animate-fade-in">
          <p className="text-lg mb-1">
            <strong className="text-red-600">90+</strong> HD Channels
          </p>
          <p className="text-lg mb-8">
            Perfect for businesses that need the most{" "}
            <strong className="text-slate-900">popular networks</strong>,
            including <strong className="text-slate-900">top sports</strong>.
          </p>
          <h4 className="font-batangas font-bold text-slate-900 mb-6">
            Popular Streaming Channels Include:
          </h4>

          <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex justify-center p-6 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
            <img
              src={VideoImage3}
              alt="Game Time TV Channels"
              className="h-48 object-cover"
            />
          </div>
        </div>
      ),
    },
  ];

  // Data for Bar & Restaurant TV Packages Tabs
  const barTabsData = [
    {
      title: "Spectrum Business TV",
      content: (
        <div className="font-medium text-gray-600 animate-fade-in">
          <p className="text-lg mb-1">
            <strong className="text-red-600">50+</strong> HD Channels
          </p>
          <p className="text-lg mb-8">
            For bars and restaurants that only need{" "}
            <strong className="text-slate-900">local channels</strong>,{" "}
            <strong className="text-slate-900">basic news</strong> and{" "}
            <strong className="text-slate-900">entertainment</strong>.
          </p>
          <h4 className="font-batangas font-bold text-slate-900 mb-6">
            Popular Streaming Channels Include:
          </h4>
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex justify-center p-6 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
            <img
              src={VideoImage2}
              alt="Spectrum Business TV Channels"
              className="h-48 object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Entertainment TV",
      content: (
        <div className="font-medium text-gray-600 animate-fade-in">
          <p className="text-lg mb-1">
            <strong className="text-red-600">85+</strong> HD Channels
          </p>
          <p className="text-lg mb-8">
            For bars and restaurants that need a{" "}
            <strong className="text-slate-900">broader range</strong> of the
            most <strong className="text-slate-900">popular networks</strong>.
          </p>
          <h4 className="font-batangas font-bold text-slate-900 mb-6">
            Popular Streaming Channels Include:
          </h4>
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex justify-center p-6 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
            <img
              src={VideoImage3}
              alt="Entertainment TV Channels"
              className="h-48 object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Game Time TV",
      content: (
        <div className="font-medium text-gray-600 animate-fade-in">
          <p className="text-lg mb-1">
            <strong className="text-red-600">105+</strong> HD Channels
          </p>
          <p className="text-lg mb-2">
            For bars and restaurants with clientele that demand the{" "}
            <strong className="text-slate-900">best sports</strong> and{" "}
            <strong className="text-slate-900">programming</strong>.
          </p>
          <p className="text-sm mb-8">
            <strong className="text-red-600">Note:</strong> Not available in
            Hawaii
          </p>
          <h4 className="font-batangas font-bold text-slate-900 mb-6">
            Popular Streaming Channels Include:
          </h4>
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex justify-center p-6 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
            <img
              src={VideoImage4}
              alt="Game Time TV Channels"
              className="h-48 object-cover"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      <Sidebar3
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

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
              Products / Video
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 rounded-full hover:bg-red-50 cursor-pointer"
          >
            EXIT COURSE
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Page Header */}
            <div className="mb-12 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-4">
                PAGE 5 of 14
              </span>
              <h1 className="text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Video
              </h1>
              <div className="w-24 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Hero Section */}
            <div className="relative h-100 rounded-3xl overflow-hidden mb-16 shadow-lg animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop"
                alt="Spectrum Business Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent"></div>
            </div>

            {/* Intro Statement */}
            <div className="max-w-4xl mx-auto text-center mb-24 animate-fade-in delay-200 px-4">
              <div className="w-16 h-1 bg-red-600 mx-auto mb-8 rounded-full"></div>
              <blockquote className="mb-8">
                <p className="text-2xl md:text-[28px] font-batangas text-slate-900 leading-normal italic">
                  "From waiting rooms and lobbies, to back offices and break
                  rooms, Spectrum Business Video will allow businesses to
                  entertain their customers and keep their employees informed
                  for one low price."
                </p>
              </blockquote>
              <div className="w-16 h-1 bg-red-600 mx-auto mt-8 rounded-full"></div>
            </div>

            {/* Benefits and TV Packages Section */}
            <div className="mb-24 animate-fade-in relative">
              {/* Section Banner Background */}
              <div className="absolute top-0 left-0 w-full h-40 bg-slate-900 rounded-t-3xl opacity-100 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-red-600/30 to-transparent mix-blend-overlay"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-size-[30px_30px]"></div>
              </div>

              <div className="pt-12">
                <h1 className="text-4xl m-5 font-batangas font-bold text-white mb-16 drop-shadow-md">
                  Video
                </h1>

                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 mb-12">
                  <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-4">
                    Benefits
                  </h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-12">
                    Spectrum Business Video will provide customers and employees
                    the right channel for their business needs with services
                    including:
                  </p>

                  <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                    Spectrum Business TV Packages
                  </h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-16 max-w-4xl">
                    Spectrum offers three TV packages for{" "}
                    <strong className="text-slate-900">businesses</strong> to
                    choose from. You can review each package below.
                  </p>

                  {/* Interactive Marker Row */}
                  <div className="flex flex-col md:flex-row justify-around items-start relative pb-24 md:pb-48">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-13 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10"></div>

                    {tvPackagesData.map((pkg, index) => (
                      <TvPackageMarker
                        key={pkg.id}
                        number={index + 1}
                        title={pkg.title}
                        description={pkg.description}
                        icon={pkg.icon}
                        isActive={activeTvMarker === pkg.id}
                        onClick={() =>
                          setActiveTvMarker(
                            activeTvMarker === pkg.id ? null : pkg.id,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TV Packages Tabs */}
            <div className="mt-8 mb-10">
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                {/* Tab Navigation */}
                <div className="flex items-center bg-gray-50 border-b border-gray-200 h-16 relative">
                  <button
                    onClick={() => scrollTabs(packageTabsRef, "left")}
                    className="h-full w-12 flex items-center justify-center hover:bg-slate-800 border-r border-slate-700 shrink-0 z-10 bg-slate-900 text-white lg:hidden cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div
                    ref={packageTabsRef}
                    className="flex-1 overflow-x-auto flex scrollbar-hide scroll-smooth h-full items-center"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {tvPackagesTabsData.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePackageTab(index)}
                        className={`h-full px-8 whitespace-nowrap text-xs font-semibold uppercase tracking-widest flex-1 flex items-center justify-center transition-all border-r border-gray-100 min-w-50 cursor-pointer
                                                                                                                ${
                                                                                                                  activePackageTab ===
                                                                                                                  index
                                                                                                                    ? "bg-white text-red-600 border-t-4 border-t-red-600 shadow-[inset_0_-2px_0_white]"
                                                                                                                    : "text-gray-500 hover:bg-gray-100 hover:text-slate-900"
                                                                                                                }`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollTabs(packageTabsRef, "right")}
                    className="h-full w-12 flex items-center justify-center hover:bg-slate-800 border-l border-slate-700 shrink-0 z-10 bg-slate-900 text-white lg:hidden cursor-pointer transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-8 md:p-12 min-h-87.5 animate-fade-in">
                  {tvPackagesTabsData[activePackageTab].content}
                </div>
              </div>
            </div>

            {/* Bar & Restaurant TV Packages Section */}
            <div className="mb-20 animate-fade-in">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Bar & Restaurant TV Packages
              </h2>

              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-6">
                To find out if a business qualifies as a Bar or Restaurant, use
                the checklist below.
              </p>

              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8">
                Do either of the following apply to the business?
              </p>

              {/* Interactive Checklist */}
              <div className="space-y-6 max-w-4xl mb-10 pl-4 md:pl-8">
                <label className="flex items-start gap-6 cursor-pointer group">
                  <div className="relative mt-1 shrink-0">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={checkedItems.item1}
                      onChange={() => toggleCheck("item1")}
                    />
                    <div
                      className={`w-8 h-8 flex items-center justify-center border-2 rounded transition-colors duration-200
                                                                            ${
                                                                              checkedItems.item1
                                                                                ? "bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                                                                                : "border-gray-400 bg-white group-hover:border-red-400"
                                                                            }`}
                    >
                      {checkedItems.item1 && (
                        <Check size={20} strokeWidth={3} />
                      )}
                    </div>
                  </div>
                  <span className="text-lg font-medium text-gray-800 leading-relaxed pt-1 transition-colors">
                    Does it hold a liquor license?
                  </span>
                </label>

                <label className="flex items-start gap-6 cursor-pointer group">
                  <div className="relative mt-1 shrink-0">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={checkedItems.item2}
                      onChange={() => toggleCheck("item2")}
                    />
                    <div
                      className={`w-8 h-8 flex items-center justify-center border-2 rounded transition-colors duration-200
                                                                            ${
                                                                              checkedItems.item2
                                                                                ? "bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                                                                                : "border-gray-400 bg-white group-hover:border-red-400"
                                                                            }`}
                    >
                      {checkedItems.item2 && (
                        <Check size={20} strokeWidth={3} />
                      )}
                    </div>
                  </div>
                  <span className="text-lg font-medium text-gray-800 leading-relaxed pt-1 transition-colors">
                    Is at least 80% of its gross revenue derived from entry
                    fees, and/or the sale of tickets, food, or beverages with
                    Patron Seating?
                  </span>
                </label>
              </div>

              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-6">
                If you checked at least one of the boxes above, the business
                qualifies for Bar and Restaurant TV Packages.
              </p>

              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-12">
                Spectrum offers three TV packages for{" "}
                <strong className="text-slate-900">Bars & Restaurants</strong>{" "}
                to choose from. You can review each package below.
              </p>

              {/* ðŸ'‡ NEW: Bar & Restaurant Tabs */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                {/* Tab Navigation */}
                <div className="flex items-center bg-gray-50 border-b border-gray-200 h-16 relative">
                  <button
                    onClick={() => scrollTabs(barTabsRef, "left")}
                    className="h-full w-12 flex items-center justify-center hover:bg-slate-800 border-r border-slate-700 shrink-0 z-10 bg-slate-900 text-white lg:hidden cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div
                    ref={barTabsRef}
                    className="flex-1 overflow-x-auto flex scrollbar-hide scroll-smooth h-full items-center"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {barTabsData.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveBarTab(index)}
                        className={`h-full px-8 whitespace-nowrap text-xs font-semibold uppercase tracking-widest flex-1 flex items-center justify-center transition-all border-r border-gray-100 min-w-50 cursor-pointer
                                                                                    ${
                                                                                      activeBarTab ===
                                                                                      index
                                                                                        ? "bg-white text-red-600 border-t-4 border-t-red-600 shadow-[inset_0_-2px_0_white]"
                                                                                        : "text-gray-500 hover:bg-gray-100 hover:text-slate-900"
                                                                                    }`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollTabs(barTabsRef, "right")}
                    className="h-full w-12 flex items-center justify-center hover:bg-slate-800 border-l border-slate-700 shrink-0 z-10 bg-slate-900 text-white lg:hidden cursor-pointer transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-8 md:p-12 min-h-87.5 animate-fade-in">
                  {barTabsData[activeBarTab].content}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
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

export default Video;
