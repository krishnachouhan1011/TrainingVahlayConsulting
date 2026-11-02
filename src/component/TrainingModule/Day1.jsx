import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Target,
  ExternalLink,
  Compass,
  Search,
  MapPin,
  Building2,
  Copy,
  Check,
  AlertTriangle,
  Star,
  Sparkles,
  Layers,
  Video,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar4, {
  markLessonComplete as markLessonComplete8Day,
} from "../How the 8-Day Training Program Works/Sidebar4";
import Sidebar5 from "./Sidebar5";
import { markLessonComplete as markLessonCompleteHansal } from "./Sidebar5Data";
import {
  US_STATES,
  USPS_ABBREVIATIONS,
  IMPORTANT_ABBREVIATIONS,
} from "./Day1AbbreviationsData";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import { auth } from "../../firebase-config";
import FirebaseVideoPlayer from "../VideoPlayer/FirebaseVideoPlayer";

const Day1 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'important', 'states', 'usps', 'secondary'
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedItem, setCopiedItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const activeSidebar =
    location.state?.source ||
    sessionStorage.getItem("last_active_sidebar") ||
    "sidebar5";

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(text);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const handleContinue = () => {
    markLessonComplete8Day(4);
    markLessonCompleteHansal(1);
    navigate("/day2");
  };

  const handleExit = () => navigate("/");

  // Filtered States
  const filteredStates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return US_STATES;
    return US_STATES.filter(
      (s) =>
        s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  // Filtered USPS Abbreviations
  const filteredUsps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return USPS_ABBREVIATIONS.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.abbrev.toLowerCase().includes(q);

      if (!matchesSearch) return false;
      if (activeTab === "important") return item.isImportant;
      if (activeTab === "secondary") return item.type === "secondary";
      return true;
    });
  }, [searchQuery, activeTab]);

  // Filtered Important Top 8
  const filteredImportant = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return IMPORTANT_ABBREVIATIONS;
    return IMPORTANT_ABBREVIATIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.abbrev.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <div className="flex h-screen bg-gray-50 font-poppins overflow-hidden">
      {activeSidebar === "sidebar4" ? (
        <Sidebar4
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      ) : (
        <Sidebar5
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col h-full relative bg-white w-full">
        {/* Header */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 lg:px-8 shrink-0 z-20">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="sm:w-6 sm:h-6" />
              )}
            </button>
            <div className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-widest hidden xs:block">
              {activeSidebar === "sidebar4"
                ? "8-Day Training Program / Day 1"
                : "Part 1: The Foundation / Day 1: Orientation & Address Job Aid"}
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider transition-all px-2 sm:px-4 py-1.5 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pb-24 sm:pb-28 lg:pb-32">
            {/* Title Section */}
            <div className="mb-6 sm:mb-8 lg:mb-10 animate-fade-in">
              <span className="text-[10px] sm:text-xs font-semibold text-red-600 uppercase tracking-widest block mb-2 sm:mb-3">
                Foundation Day
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Day 1: Orientation & Telecom Address Standards
              </h1>
              <div className="w-16 sm:w-20 h-1.5 bg-red-600 rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              <p className="text-sm sm:text-base text-gray-600 font-medium max-w-3xl leading-relaxed">
                Welcome to Day 1 of your training journey at Vahlay Consulting. 
                Our core company introduction, culture, rules, and workplace policies have been centralized in the Welcome Aboard handbook. 
                Below you will find your orientation checklist along with the official <strong>US State & USPS Address Abbreviations Job Aid</strong> essential for accurate telecom customer order entry and qualification.
              </p>
            </div>

            {/* Card 1: Company Policies Handbook Banner */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-8 animate-fade-in hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                      Handbook Reference
                    </span>
                    <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900 mt-1">
                      Company Introduction & Policies Handbook
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/welcome-aboard")}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 px-4 py-2.5 rounded-full border border-red-100 hover:border-red-600 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Review Welcome Aboard Handbook</span>
                  <ExternalLink size={15} />
                </button>
              </div>

              <div className="pt-6">
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  All foundational workplace policies are housed inside the <strong>Welcome Aboard</strong> lesson. If you have not reviewed them yet or wish to revisit company expectations, make sure to read through:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "About Vahlay Consulting",
                      desc: "Founded in 2022, operations in Bharat & Canada serving US/Canada business clients.",
                    },
                    {
                      title: "Culture & Expectations",
                      desc: "Results from consistency, positive attitude, punctuality, and mutual respect.",
                    },
                    {
                      title: "Rules & 3-Month Probation",
                      desc: "Learning, system training, call observation, and discipline requirements.",
                    },
                    {
                      title: "Workplace DOs & DON'Ts",
                      desc: "Professional conduct, system usage guidelines, and team environment standards.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 hover:border-red-100 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <CheckCircle2 size={16} />
                        <h3 className="text-xs font-bold text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* NEW: US STATES & USPS ABBREVIATIONS JOB AID SECTION     */}
            {/* ======================================================== */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 animate-fade-in">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                      Standard Job Aid
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      USPS Standards & Postal Codes
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900">
                    US State & USPS Address Abbreviations
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-2xl mt-1 leading-relaxed">
                    Accurate address formatting in telecom portals (like Spectrum Buyflow & CRM) prevents order rejection. Use this job aid to look up standard 2-letter state codes and official USPS street & secondary unit suffixes.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[280px] sm:min-w-[320px]">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search state, code, street, unit..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {[
                  { id: "all", label: "All References" },
                  { id: "important", label: `⭐ Top 8 Priority (${filteredImportant.length})` },
                  { id: "states", label: `US States (${filteredStates.length})` },
                  { id: "usps", label: `USPS Suffixes (${filteredUsps.length})` },
                  { id: "secondary", label: "Secondary Units (APT, OFC...)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-slate-900 text-white shadow-sm"
                        : tab.id === "important"
                        ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                        : "bg-gray-100 hover:bg-gray-200/80 text-gray-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Asterisk Rule Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed font-medium">
                  <strong>Important USPS Rule:</strong> Abbreviations marked with an asterisk (
                  <span className="font-bold text-amber-700">*</span>) such as{" "}
                  <strong>BSMT</strong>, <strong>FRNT</strong>, <strong>LBBY</strong>,{" "}
                  <strong>LOWR</strong>, <strong>OFC</strong>, <strong>PH</strong>,{" "}
                  <strong>REAR</strong>, <strong>SIDE</strong>, and <strong>UPPR</strong> do{" "}
                  <u>not</u> require a secondary range/number to follow. Secondary units like{" "}
                  <strong>APT</strong>, <strong>STE</strong>, <strong>FL</strong>, and{" "}
                  <strong>UNIT</strong> always require a number or letter (e.g. <em>Apartment 4B</em>).
                </div>
              </div>

              {/* ======================================================== */}
              {/* TOP 8 IMPORTANT ABBREVIATIONS SHOWCASE & STRUCTURE       */}
              {/* ======================================================== */}
              {(activeTab === "all" || activeTab === "important") && (
                <div className="mb-12">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-200 flex items-center justify-center">
                        <Star size={18} className="fill-amber-500 text-amber-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-batangas font-bold text-slate-900">
                            Most Important USPS Abbreviations (Top 8)
                          </h3>
                          <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            High Priority
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Encountered in 85%+ of US telecom service orders. Memorize their exact USPS abbreviation & structural pattern.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">
                      8 Crucial Designations
                    </span>
                  </div>

                  {/* Top 8 Cards Grid with Distinct Highlight Background Color */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {filteredImportant.map((item) => {
                      const isCopied = copiedItem === item.abbrev;
                      return (
                        <div
                          key={item.name}
                          onClick={() => handleCopy(item.abbrev)}
                          className="group relative bg-linear-to-br from-amber-50/90 via-rose-50/40 to-orange-50/90 border-2 border-amber-300/80 hover:border-red-500 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            {/* Card Top Row: Badge + Category */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-900 text-white font-mono text-base font-extrabold px-3 py-1 rounded-lg tracking-wider shadow-sm flex items-center gap-1.5">
                                  <Sparkles size={12} className="text-amber-400" />
                                  {item.abbrev}
                                </span>
                                {item.noRange && (
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-amber-200" title="No number required">
                                    No #
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/90 text-red-600 border border-red-200 rounded-full shadow-2xs">
                                {item.category}
                              </span>
                            </div>

                            {/* Full Word Name */}
                            <h4 className="text-lg font-batangas font-bold text-slate-900 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                              {item.notes}
                            </p>

                            {/* Structure of Abbreviation Box */}
                            <div className="bg-white/90 rounded-xl p-3 border border-amber-200/80 shadow-2xs mb-3 space-y-1.5">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                <Layers size={11} className="text-red-500" />
                                Structure Pattern:
                              </div>
                              <div className="text-xs font-mono font-bold text-slate-800 bg-amber-50/50 p-1.5 rounded-md border border-amber-100">
                                {item.structure}
                              </div>
                              <div className="text-[11px] text-gray-500">
                                <span className="font-semibold text-slate-700">Example:</span>{" "}
                                <span className="font-mono text-red-600 font-semibold">{item.example}</span>
                              </div>
                            </div>
                          </div>

                          {/* Copy Action Trigger */}
                          <div className="pt-2 border-t border-amber-200/50 flex items-center justify-between text-xs text-gray-400 group-hover:text-red-600 transition-colors">
                            <span className="text-[11px] font-semibold">Click to copy code</span>
                            <div className="flex items-center gap-1 font-semibold">
                              {isCopied ? (
                                <>
                                  <Check size={14} className="text-emerald-600" />
                                  <span className="text-emerald-600 text-[11px]">Copied!</span>
                                </>
                              ) : (
                                <Copy size={13} className="group-hover:translate-x-0.5 transition-transform" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Visual Anatomy of a US Address Structure */}
                  <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 mb-8 shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers size={18} className="text-red-400" />
                      <h4 className="font-batangas font-bold text-base sm:text-lg text-white">
                        Standard USPS Address Syntax & Structure
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 mb-4 max-w-3xl leading-relaxed">
                      Every telecom service address in the US follows a strict sequence. Suffixes like <strong>AVE</strong>, <strong>BLVD</strong>, and <strong>RD</strong> close the primary street line, while units like <strong>APT</strong> or <strong>OFC</strong> specify the suite/office location:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-1">
                          Line 1: Primary Street
                        </span>
                        <div className="text-sm font-mono text-white font-bold">
                          124 Elm <span className="text-red-400 underline decoration-2">AVE</span>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          [Number] + [Street Name] + [Suffix]
                        </span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                          Line 2: Secondary Unit
                        </span>
                        <div className="text-sm font-mono text-white font-bold">
                          <span className="text-amber-400 underline decoration-2">APT</span> 4B / <span className="text-amber-400 underline decoration-2">OFC</span>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          [Secondary Unit Code] + [Range # (if req.)]
                        </span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                          Line 3: City, State & Zip
                        </span>
                        <div className="text-sm font-mono text-white font-bold">
                          Austin, <span className="text-emerald-400 underline decoration-2">TX</span> 78701
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          [City Name] + [2-Letter State] + [ZIP Code]
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 1. US State Abbreviations Section */}
              {(activeTab === "all" || activeTab === "states") && (
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <MapPin size={16} />
                      </div>
                      <h3 className="text-lg font-batangas font-bold text-slate-900">
                        US State Abbreviations To Full Name ({filteredStates.length})
                      </h3>
                    </div>
                    <span className="text-[11px] text-gray-400 font-semibold">
                      Click code to copy
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                    {filteredStates.map((state) => {
                      const isCopied = copiedItem === state.code;
                      return (
                        <div
                          key={state.code}
                          onClick={() => handleCopy(state.code)}
                          className="group relative bg-white border border-gray-200 hover:border-red-500 rounded-xl p-3 flex items-center justify-between transition-all hover:shadow-sm cursor-pointer"
                        >
                          <div>
                            <div className="text-base font-bold text-red-600 font-mono tracking-wider">
                              {state.code}
                            </div>
                            <div className="text-xs font-medium text-slate-700 truncate max-w-[100px]">
                              {state.name}
                            </div>
                          </div>
                          <div className="text-gray-300 group-hover:text-red-500 transition-colors">
                            {isCopied ? (
                              <Check size={14} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. USPS Street & Secondary Units Section */}
              {(activeTab === "all" || activeTab === "usps" || activeTab === "secondary") && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <Building2 size={16} />
                      </div>
                      <h3 className="text-lg font-batangas font-bold text-slate-900">
                        All USPS Street & Secondary Unit Abbreviations ({filteredUsps.length})
                      </h3>
                    </div>
                    <span className="text-[11px] text-gray-400 font-semibold">
                      Approved USPS Job Aid
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                    {filteredUsps.map((item, idx) => {
                      const isCopied = copiedItem === item.abbrev;
                      return (
                        <div
                          key={`${item.name}-${idx}`}
                          onClick={() => handleCopy(item.abbrev)}
                          className={`group relative rounded-xl p-3 flex items-center justify-between transition-all hover:shadow-sm cursor-pointer ${
                            item.isImportant
                              ? "bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-400 shadow-xs ring-1 ring-amber-200"
                              : item.noRange
                              ? "bg-amber-50/20 border border-amber-200 hover:border-amber-400"
                              : item.type === "secondary"
                              ? "bg-white border border-blue-200 hover:border-blue-400"
                              : "bg-white border border-gray-200 hover:border-red-500"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-sm font-mono tracking-wide ${
                                  item.isImportant
                                    ? "font-extrabold text-red-700"
                                    : "font-bold text-slate-900"
                                }`}
                              >
                                {item.abbrev}
                              </span>
                              {item.isImportant && (
                                <Star size={11} className="fill-amber-500 text-amber-500 shrink-0" />
                              )}
                              {item.noRange && !item.isImportant && (
                                <span className="text-[10px] font-bold text-amber-600" title="Does not require secondary range number">
                                  *
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-medium text-gray-600 truncate">
                              {item.name}
                            </div>
                          </div>
                          <div className="text-gray-300 group-hover:text-slate-700 transition-colors shrink-0">
                            {isCopied ? (
                              <Check size={14} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Day 1 Focus & Readiness Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 animate-fade-in">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-50 text-red-600 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <Target size={20} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900">
                      Day 1 Core Objectives
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
                    Today marks the beginning of your sales career path. Complete the following setup and alignment tasks before proceeding:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Complete workstation, browser, and audio headset verification.",
                      "Verify access to the training portal, CRM systems, and company email.",
                      "Memorize the 8 Key Address Abbreviations (APT, AVE, BLVD, CTR, CIR, CT, OFC, RD).",
                      "Familiarize yourself with attendance and training check-in rules.",
                    ].map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-red-600 shrink-0 mt-0.5"
                        />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Status: Orientation Complete
                  </span>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-50 text-red-600 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <Compass size={20} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900">
                      What's Coming in Day 2
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
                    Tomorrow you transition from orientation into technical telecom product knowledge:
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Broadband Fundamentals",
                        desc: "Fiber vs Cable internet differences, Mbps vs Gbps speeds.",
                      },
                      {
                        title: "Hardware & Equipment",
                        desc: "Modems, routers, gateways, WiFi extenders, and installation.",
                      },
                      {
                        title: "Voice & Number Porting",
                        desc: "Business phone systems, VoIP technology, and transferring numbers.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <div className="text-xs font-bold text-slate-900 mb-0.5">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wider block">
                    Preparation Recommended
                  </span>
                </div>
              </div>
            </div>

            {/* Day 1 Training Video */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-8 animate-fade-in hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <Video size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                        Training Video
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Session Recording
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900 mt-1">
                      Day 1: Orientation & Training Session
                    </h2>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-6 leading-relaxed">
                Watch the complete recorded session for Day 1 orientation, workplace expectations, and telecom address standards walkthrough.
              </p>

              <div className="w-full">
                <FirebaseVideoPlayer
                  src="https://firebasestorage.googleapis.com/v0/b/vahlay1.appspot.com/o/training_videos%2FDay01_1.mp4?alt=media&token=9daaf233-719f-4383-8a99-b33779eeeaeb"
                  title="Day 1: Orientation & ISP Foundation Training Video"
                  lessonId="day1_video"
                  userId={auth.currentUser?.uid || "guest"}
                />
              </div>
            </div>

            {/* Card 3: Proceed Banner */}
            <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-xl animate-fade-in">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-widest block mb-2">
                    Ready for the Next Step
                  </span>
                  <h3 className="text-xl sm:text-2xl font-batangas font-bold text-white mb-2">
                    Continue to Day 2: Telecom Basics
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                    You have reviewed the foundation orientation and address standard job aids. Proceed to Day 2 to learn internet types, speed calculations, and telecom hardware.
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="flex items-center gap-3 bg-red-600 hover:bg-white text-white hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg shadow-red-600/30 transition-all cursor-pointer uppercase tracking-wider text-xs whitespace-nowrap shrink-0"
                >
                  <span>Proceed to Day 2</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="fixed sm:absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-2 sm:gap-3 bg-red-600 text-white px-4 sm:px-6 lg:px-6 py-3 sm:py-3 lg:py-3 rounded-full font-semibold shadow-lg sm:shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm whitespace-nowrap"
            >
              <span>Day 2</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5"
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
          animation: fade-in 0.7s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
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

        /* Extra small devices */
        @media (max-width: 480px) {
          .xs\\:block {
            display: block;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(Day1);
