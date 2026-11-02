import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Plus,
  Minus,
  FileText,
  HelpCircle,
  CheckCircle,
  XCircle,
  GripHorizontal,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// â¬‡ï¸ MANUALLY SET YOUR ASSET PATHS HERE
import internetChart from "../../assets/internetChart.png";
import voiceChart from "../../assets/voiceChart.png";
import videoChart from "../../assets/videoChart.png";
import mobileChart from "../../assets/mobileChart.png";

import Sidebar2, { markLessonComplete } from "./Sidebar2";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const WhatsChanging = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeHeader, setActiveHeader] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState("internet");

  // --- QUIZ 1 STATE (What's Changing Highlights) ---
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuizOptions, setSelectedQuizOptions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);

  // --- KNOWLEDGE CHECK 1: SORTING ACTIVITY STATE ---
  const [sortingCards] = useState([
    { id: 1, text: "750 Mbps x 35 Mbps", tier: "Ultra" },
    { id: 2, text: "Only: $95 (+$30)", tier: "Ultra" },
    { id: 3, text: "1G x 50 Mbps", tier: "Gig" },
    { id: 4, text: "500 Mbps x 20 Mbps", tier: "Premier" },
    { id: 5, text: "2G x 1G", tier: "2 Gig" },
    { id: 6, text: "Only: $65", tier: "Premier" },
  ]);
  const [currentSortCardIndex, setCurrentSortCardIndex] = useState(0);
  const [sortFeedback, setSortFeedback] = useState({
    status: "idle",
    index: null,
  });
  const [isSortingComplete, setIsSortingComplete] = useState(false);
  const [sortedCount, setSortedCount] = useState(0);

  // --- KNOWLEDGE CHECK 2: WIFI QUIZ STATE ---
  const [wifiQuizOptions, setWifiQuizOptions] = useState([]);
  const [wifiQuizSubmitted, setWifiQuizSubmitted] = useState(false);
  const [isWifiQuizCorrect, setIsWifiQuizCorrect] = useState(false);

  // --- KNOWLEDGE CHECK 3: MOBILE QUIZ STATE ---
  const [mobileQuizOption, setMobileQuizOption] = useState(null);
  const [mobileQuizSubmitted, setMobileQuizSubmitted] = useState(false);
  const [isMobileQuizCorrect, setIsMobileQuizCorrect] = useState(false);

  const navigate = useNavigate();
  const sortSectionRef = useRef(null);
  const wifiSectionRef = useRef(null);
  const mobileSectionRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  const handlePageComplete = () => {
    markLessonComplete(2);
    navigate("/price-guarantees");
  };

  const handleExit = () => {
    navigate("/");
  };

  const handleHeaderClick = (headerKey) => {
    setActiveHeader(activeHeader === headerKey ? null : headerKey);
  };

  const toggleAccordion = (key) => {
    setExpandedAccordion(expandedAccordion === key ? null : key);
  };

  // --- QUIZ 1 HANDLERS ---
  const handleOptionToggle = (index) => {
    if (quizSubmitted && isQuizCorrect) return;
    setQuizSubmitted(false);
    setSelectedQuizOptions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Add this inside your component
  const tableScrollRef = useRef(null);

  const scrollTable = (direction) => {
    if (tableScrollRef.current) {
      const scrollAmount = 250; // Adjust how far it scrolls per click
      tableScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    if (selectedQuizOptions.length === 4) {
      setIsQuizCorrect(true);
    } else {
      setIsQuizCorrect(false);
    }
  };

  const handleQuizSuccessContinue = () => {
    setIsQuizOpen(false);
    setTimeout(() => {
      sortSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // --- SORTING HANDLERS ---
  const handleSortDragStart = (e, card) => {
    e.dataTransfer.setData("cardTier", card.tier);
  };

  const handleSortDragOver = (e) => {
    e.preventDefault();
  };

  const handleSortDrop = (e, dropZoneTier) => {
    e.preventDefault();
    const currentCard = sortingCards[currentSortCardIndex];

    if (currentCard.tier === dropZoneTier) {
      setSortFeedback({ status: "correct", index: dropZoneTier });
      setTimeout(() => {
        setSortFeedback({ status: "idle", index: null });
        setSortedCount((prev) => prev + 1);

        if (currentSortCardIndex < sortingCards.length - 1) {
          setCurrentSortCardIndex((prev) => prev + 1);
        } else {
          setIsSortingComplete(true);
          setTimeout(() => {
            wifiSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 500);
        }
      }, 800);
    } else {
      setSortFeedback({ status: "wrong", index: dropZoneTier });
      setTimeout(() => {
        setSortFeedback({ status: "idle", index: null });
      }, 800);
    }
  };

  const resetSortingActivity = () => {
    setCurrentSortCardIndex(0);
    setSortedCount(0);
    setIsSortingComplete(false);
    setSortFeedback({ status: "idle", index: null });
  };

  // --- WIFI QUIZ HANDLERS ---
  const handleWifiOptionToggle = (optionId) => {
    if (wifiQuizSubmitted && isWifiQuizCorrect) return;
    setWifiQuizSubmitted(false);
    setWifiQuizOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const handleSubmitWifiQuiz = () => {
    setWifiQuizSubmitted(true);
    const correctIds = [2, 3];
    const isCorrect =
      wifiQuizOptions.length === 2 &&
      wifiQuizOptions.every((id) => correctIds.includes(id));

    setIsWifiQuizCorrect(isCorrect);

    if (isCorrect) {
      setTimeout(() => {
        mobileSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  // --- MOBILE QUIZ HANDLERS ---
  const handleMobileOptionSelect = (optionLabel) => {
    if (mobileQuizSubmitted && isMobileQuizCorrect) return;
    setMobileQuizSubmitted(false);
    setMobileQuizOption(optionLabel);
  };

  const handleSubmitMobileQuiz = () => {
    setMobileQuizSubmitted(true);
    if (mobileQuizOption === "4+") {
      setIsMobileQuizCorrect(true);
    } else {
      setIsMobileQuizCorrect(false);
    }
  };

  // Data
  const accordionData = [
    { id: "internet", title: "Internet", chart: internetChart },
    { id: "voice", title: "Voice", chart: voiceChart },
    { id: "video", title: "Video", chart: videoChart },
    { id: "mobile", title: "Mobile", chart: mobileChart },
  ];

  const tableRows = [
    {
      id: "2gig",
      name: "2 Gig",
      bg: "bg-slate-50",
      speed: { async: "2G x 1G", sync: "N/A" },
      price: { stand: "$165", bundle: "$150", triple: "$140" },
      wifi: "Free WiFi",
      mobile13: { uld: "$30", uldPlus: "$35" },
      mobile4: { uld: "$20", uldPlus: "$30" },
      speedContent: null,
      priceContent: (
        <span>
          2 Gig is stacked on top of Premier;{" "}
          <strong className="text-red-600">+$100.</strong>
        </span>
      ),
      wifiContent: (
        <span>
          <strong className="text-red-600">Free Advanced Business WiFi</strong>{" "}
          with Gig and 2 Gig.
        </span>
      ),
      mobileContent: (
        <span>
          Customers can still{" "}
          <strong className="text-red-600">
            include one Unlimited Mobile line at no cost
          </strong>
          .
        </span>
      ),
      mobile4Content: (
        <span>
          Multi-line discount customers{" "}
          <strong className="text-red-600">
            must have all paid Mobile lines.
          </strong>
        </span>
      ),
    },
    {
      id: "gig",
      name: "Gig",
      bg: "bg-white",
      speed: { async: "1G x 50", sync: "1G x 1G" },
      price: { stand: "$155", bundle: "$100", triple: "$90" },
      wifi: "Free WiFi",
      mobile13: { uld: "$30", uldPlus: "$35" },
      mobile4: { uld: "$20", uldPlus: "$30" },
      speedContent: (
        <span>
          <strong className="text-red-600">Internet Gig</strong> is getting a
          speed lift to <strong className="text-red-600">1G x 50 Mbps.</strong>
        </span>
      ),
      priceContent: (
        <span>
          Gig is stacked on top of Premier;{" "}
          <strong className="text-red-600">+$50.</strong>
        </span>
      ),
      wifiContent: (
        <span>
          <strong className="text-red-600">Free Advanced Business WiFi</strong>{" "}
          with Gig and 2 Gig.
        </span>
      ),
      mobileContent: null,
      mobile4Content: (
        <span>
          Volume pricing can be a{" "}
          <strong className="text-red-600">
            combination of Unlimited and Unlimited+.
          </strong>
        </span>
      ),
    },
    {
      id: "ultra",
      name: "Ultra",
      bg: "bg-slate-50",
      speed: { async: "750 x 35", sync: "750 x 750" },
      price: { stand: "$95", bundle: "$80", triple: "$70" },
      wifi: "WiFi +$10",
      mobile13: { uld: "$30", uldPlus: "$35" },
      mobile4: { uld: "$20", uldPlus: "$30" },
      speedContent: (
        <span>
          <strong className="text-red-600">Internet Ultra</strong> is getting a
          speed lift to <strong className="text-red-600">750 x 35 Mbps.</strong>
        </span>
      ),
      priceContent: (
        <span>
          Ultra is stacked on top of Premier;{" "}
          <strong className="text-red-600">+$30.</strong>
        </span>
      ),
      wifiContent: (
        <span>
          Ultra/Premier Tiers{" "}
          <strong className="text-red-600">do not qualify for free WiFi</strong>
          .
        </span>
      ),
      mobileContent: (
        <span>
          Unlimited+ lines are{" "}
          <strong className="text-red-600">discounted ($35)</strong> with Ultra,
          Gig, 2 Gig.
        </span>
      ),
      mobile4Content: (
        <span>
          SMB Mobile Multi-line discounts for{" "}
          <strong className="text-red-600">4+ paid lines.</strong>
        </span>
      ),
    },
    {
      id: "premier",
      name: "Premier",
      sub: "(Business Internet)",
      bg: "bg-white",
      speed: { async: "500 x 20", sync: "500 x 500" },
      price: { stand: "$65", bundle: "$50", triple: "$40" },
      wifi: "WiFi +$10",
      mobile13: { uld: "$30", uldPlus: "$40" },
      mobile4: { uld: "$20", uldPlus: "$30" },
      speedContent: (
        <span>
          <strong className="text-red-600">Internet Premier</strong> is getting
          a speed lift to{" "}
          <strong className="text-red-600">500 x 20 Mbps.</strong>
        </span>
      ),
      priceContent: (
        <span>
          Premier prices are{" "}
          <strong className="text-red-600">rounded up by one cent</strong> to
          whole dollars.
        </span>
      ),
      wifiContent: (
        <span>
          Ultra/Premier Tiers{" "}
          <strong className="text-red-600">do not qualify for free WiFi</strong>
          .
        </span>
      ),
      mobileContent: (
        <span>
          Paid Spectrum Mobile lines are considered a{" "}
          <strong className="text-red-600">true line of business</strong>.
        </span>
      ),
      mobile4Content: null,
    },
  ];

  const quiz1Options = [
    "Free WiFi with Gig and 2 Gig provides added value and selling points when talking to customers.",
    "SMB Mobile Multi-line discounts makes it easier to sell multiple lines of Mobile.",
    "More value for the customer with higher Internet speeds and lower costs, makes it easier to drive sales and earn more commission.",
    "Simplified pricing makes it easier to remember price points and sell the value to customers.",
  ];

  const wifiOptions = [
    { id: 0, text: "Internet Premier" },
    { id: 1, text: "Internet Ultra" },
    { id: 2, text: "Internet Gig" },
    { id: 3, text: "Internet 2 Gig" },
  ];

  const mobileOptions = ["2+", "3+", "4+", "5+"];

  const sortTiers = ["Premier", "Ultra", "Gig", "2 Gig"];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      <Sidebar2
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full relative bg-white w-full">
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500  transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Overview / What's changing?
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 2
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                What's changing?
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Pricing Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-4">
                Pricing
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed mb-4">
                For a comprehensive list of all our updated pricing, review the
                charts for each Line of Business.
              </p>
              <p className="text-red-600 font-bold mb-8 text-sm">
                Please note:{" "}
                <span className="font-medium text-gray-600">
                  These prices are subject to change. For the latest pricing,
                  refer to Buyflow or PartnerLink.
                </span>
              </p>
              <div className="border-t border-gray-200">
                {accordionData.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors focus:outline-none relative cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        {expandedAccordion === item.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600"></div>
                        )}
                        <span className="text-xl font-batangas font-bold text-slate-900 ml-2 transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <div className="text-gray-400 transition-colors">
                        {expandedAccordion === item.id ? (
                          <Minus size={20} />
                        ) : (
                          <Plus size={20} />
                        )}
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out ${expandedAccordion === item.id ? "max-h-250 opacity-100 pb-8" : "max-h-0 opacity-0"}`}
                    >
                      <div className="px-4 md:px-8 flex justify-center w-full">
                        {item.chart ? (
                          <div className="w-full max-w-3xl border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                            <img
                              src={item.chart}
                              alt={`${item.title} Pricing Chart`}
                              className="w-full h-auto object-contain block"
                            />
                          </div>
                        ) : (
                          <div className="w-full max-w-3xl border border-gray-200 shadow-sm bg-gray-50 h-64 flex flex-col items-center justify-center text-gray-400 rounded-xl">
                            <p className="mb-2 italic font-medium">
                              Image not found for {item.title}
                            </p>
                            <FileText size={48} className="opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Section */}
            <div className="relative mb-16 animate-fade-in delay-200 px-2 sm:px-0">
              <p className="text-center italic text-red-600 mb-4 text-sm font-semibold animate-pulse">
                Click on the headers below to see detailed updates!
                <span className="block md:hidden text-gray-500 mt-1 text-xs not-italic font-normal">
                  (Swipe or use arrows to see more columns)
                </span>
              </p>

              {/* Mobile Scroll Indicator - Left */}
              <button
                onClick={() => scrollTable("left")}
                className="md:hidden absolute left-0 top-[60%] -translate-y-1/2 -ml-2 z-20 bg-white border border-gray-200 text-red-600 p-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:bg-red-50 focus:outline-none transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>

              {/* Mobile Scroll Indicator - Right */}
              <button
                onClick={() => scrollTable("right")}
                className="md:hidden absolute right-0 top-[60%] -translate-y-1/2 -mr-2 z-20 bg-white border border-gray-200 text-red-600 p-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:bg-red-50 focus:outline-none transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>

              {/* Scrollable Container */}
              <div
                ref={tableScrollRef}
                className="overflow-x-auto hide-scrollbar rounded-2xl border border-gray-200 shadow-sm bg-white hover:shadow-[0_8px_30px_rgba(220,38,38,0.05)] transition-shadow scroll-smooth relative"
              >
                <div className="min-w-[850px] w-full">
                  {/* Headers */}
                  <div className="grid grid-cols-6 bg-slate-900 p-4 items-center border-b border-gray-200 text-sm font-semibold text-white text-center sticky top-0 z-10">
                    <div className="col-span-1"></div>
                    {["speed", "price", "wifi", "mobile", "mobile4"].map(
                      (key) => (
                        <div
                          key={key}
                          className={`col-span-1 cursor-pointer p-3 rounded-xl transition-all border-2 mx-1 ${
                            activeHeader === key
                              ? "ring-2 ring-red-400 border-red-600 bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)]"
                              : "border-transparent hover:bg-slate-800"
                          }`}
                          onClick={() => handleHeaderClick(key)}
                        >
                          {key === "wifi"
                            ? "WiFi Price"
                            : key === "mobile"
                              ? "Mobile Price (1-3)"
                              : key === "mobile4"
                                ? "Mobile Price (4+)"
                                : key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                      ),
                    )}
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-gray-100">
                    {tableRows.map((row) => (
                      <div
                        key={row.id}
                        className={`grid grid-cols-6 items-center p-4 sm:p-6 text-sm text-center relative transition-colors ${row.bg} hover:bg-gray-50/50`}
                      >
                        <div className="col-span-1 font-batangas font-bold text-slate-900 flex flex-col items-center">
                          <span className="text-base sm:text-lg">
                            {row.name}
                          </span>
                          {row.sub && (
                            <span className="text-[10px] text-gray-500 uppercase font-poppins font-semibold mt-0.5 tracking-wider">
                              {row.sub}
                            </span>
                          )}
                        </div>

                        {[
                          {
                            key: "speed",
                            content: row.speedContent,
                            default: row.speed?.async,
                          },
                          {
                            key: "price",
                            content: row.priceContent,
                            default: row.price?.stand,
                          },
                          {
                            key: "wifi",
                            content: row.wifiContent,
                            default: row.wifi,
                          },
                          {
                            key: "mobile",
                            content: row.mobileContent,
                            default: row.mobile13?.uld,
                          },
                          {
                            key: "mobile4",
                            content: row.mobile4Content,
                            default: row.mobile4?.uld,
                          },
                        ].map((col) => (
                          <div
                            key={col.key}
                            className="col-span-1 relative h-full flex flex-col justify-center min-h-[60px]"
                          >
                            {activeHeader === col.key && col.content ? (
                              <div className="absolute inset-0 -m-2 z-10 flex items-center justify-center animate-fade-in">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3 shadow-lg text-xs text-gray-800 font-medium w-full mx-2 leading-snug">
                                  {col.content}
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm font-semibold text-gray-700">
                                {col.default || "-"}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SHOW WHAT YOU KNOW BUTTON */}
            {!isQuizCorrect && (
              <div className="flex justify-center mt-12 mb-16">
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="bg-red-600 hover:bg-slate-900 text-white text-l font-bold py-5 px-12 rounded-full shadow-lg shadow-red-600/30 hover:shadow-[0_8px_30px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 animate-pulse cursor-pointer"
                >
                  <HelpCircle size={28} />
                  Show What You Know!
                </button>
              </div>
            )}

            {/* KNOWLEDGE CHECK 1: SORTING ACTIVITY - REVEALED AFTER QUIZ */}
            {isQuizCorrect && (
              <div
                ref={sortSectionRef}
                className="mt-16 animate-fade-in border-t pt-12 border-gray-200"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-batangas font-bold text-slate-900 flex items-center gap-3">
                    <HelpCircle className="text-red-600" />
                    Knowledge Check 1: Internet Tiers & Pricing
                  </h3>
                  <div className="text-sm font-semibold text-slate-900 bg-white border border-gray-200 shadow-sm px-4 py-1.5 rounded-full">
                    {sortedCount}/{sortingCards.length} Cards Correct
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 relative min-h-100 flex flex-col items-center shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                  <p className="text-center text-gray-600 font-medium italic mb-8">
                    hold card and Drag and drop the correct speed and pricing to
                    the corresponding Internet Tier.
                  </p>

                  <div className="flex justify-center items-center h-48 mb-12 w-full relative">
                    {!isSortingComplete ? (
                      <div
                        draggable
                        onDragStart={(e) =>
                          handleSortDragStart(
                            e,
                            sortingCards[currentSortCardIndex],
                          )
                        }
                        className="bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-2xl w-80 h-40 border border-gray-100 flex flex-col cursor-grab active:cursor-grabbing hover:scale-105 hover:border-red-200 transition-all duration-300 z-10"
                      >
                        <div className="h-2 bg-red-600 rounded-t-2xl w-full"></div>
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                          <span className="text-2xl font-batangas font-bold text-slate-900">
                            {sortingCards[currentSortCardIndex].text}
                          </span>
                        </div>
                        <div className="pb-3 text-gray-300 flex justify-center">
                          <GripHorizontal />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center animate-fade-in">
                        <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-full mb-4">
                          <CheckCircle size={48} />
                        </div>
                        <h4 className="text-2xl font-batangas font-bold text-slate-900 mb-4">
                          Activity Complete!
                        </h4>
                        <button
                          onClick={resetSortingActivity}
                          className="flex items-center gap-2 text-red-600 font-semibold hover:bg-red-50 px-5 py-2.5 rounded-full transition-colors cursor-pointer border border-transparent hover:border-red-100"
                        >
                          <RotateCcw size={18} /> Replay
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {sortTiers.map((tier) => (
                      <div
                        key={tier}
                        onDragOver={handleSortDragOver}
                        onDrop={(e) => handleSortDrop(e, tier)}
                        className={`
                          h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 bg-gray-50
                          ${
                            sortFeedback.index === tier &&
                            sortFeedback.status === "correct"
                              ? "border-green-500 bg-green-50 scale-105 shadow-[0_4px_15px_rgba(34,197,94,0.3)]"
                              : sortFeedback.index === tier &&
                                  sortFeedback.status === "wrong"
                                ? "border-red-500 bg-red-50 animate-pulse shadow-[0_4px_15px_rgba(239,68,68,0.3)]"
                                : "border-gray-300 hover:border-red-400"
                          }
                        `}
                      >
                        <span
                          className={`font-batangas font-bold text-lg ${sortFeedback.index === tier && sortFeedback.status === "correct" ? "text-green-600" : "text-slate-900"}`}
                        >
                          {tier}
                        </span>
                        {sortFeedback.index === tier && (
                          <div className="mt-2">
                            {sortFeedback.status === "correct" ? (
                              <CheckCircle className="text-green-500" />
                            ) : (
                              <XCircle className="text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KNOWLEDGE CHECK 2: WIFI QUIZ */}
            {isSortingComplete && (
              <div
                ref={wifiSectionRef}
                className="mt-16 animate-fade-in border-t pt-12 border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                    <HelpCircle size={24} />
                  </div>
                  <h2 className="text-2xl font-batangas font-bold text-slate-900">
                    Knowledge Check 2
                  </h2>
                </div>

                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <h3 className="text-lg font-batangas font-bold text-slate-900 mb-6 text-center">
                    WiFi is included for free with which Internet Tiers?{" "}
                    <span className="text-gray-500 font-medium text-sm font-poppins">
                      (Select all that apply)
                    </span>
                  </h3>

                  <div className="space-y-4 max-w-2xl mx-auto">
                    {wifiOptions.map((option) => {
                      const isSelected = wifiQuizOptions.includes(option.id);
                      return (
                        <div
                          key={option.id}
                          onClick={() => handleWifiOptionToggle(option.id)}
                          className={`
                                            flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                            ${
                                              isSelected
                                                ? wifiQuizSubmitted &&
                                                  isWifiQuizCorrect
                                                  ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                  : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                            }
                                            ${wifiQuizSubmitted && isWifiQuizCorrect ? "cursor-default" : ""}
                                        `}
                        >
                          <div
                            className={`
                                            w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                                            ${
                                              isSelected
                                                ? wifiQuizSubmitted &&
                                                  isWifiQuizCorrect
                                                  ? "bg-green-500 border-green-500"
                                                  : "bg-red-600 border-red-600"
                                                : "border-gray-300 bg-white"
                                            }
                                        `}
                          >
                            {isSelected && (
                              <Check size={16} className="text-white" />
                            )}
                          </div>
                          <p
                            className={`text-sm font-medium ${isSelected ? "text-slate-900 font-bold" : "text-gray-600"}`}
                          >
                            {option.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {wifiQuizSubmitted && (
                    <div
                      className={`mt-8 p-5 rounded-2xl flex items-center gap-3 animate-fade-in max-w-2xl mx-auto font-medium ${isWifiQuizCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                    >
                      {isWifiQuizCorrect ? (
                        <>
                          <CheckCircle size={24} className="text-green-600" />
                          <span className="font-bold">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={24} className="text-red-600" />
                          <span>
                            <strong className="font-bold">Incorrect.</strong>{" "}
                            WiFi is included for free with Internet Gig and 2
                            Gig.
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end mt-8 max-w-2xl mx-auto">
                    {!isWifiQuizCorrect ? (
                      <button
                        onClick={handleSubmitWifiQuiz}
                        disabled={wifiQuizOptions.length === 0}
                        className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all ${wifiQuizOptions.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white cursor-pointer"}`}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setWifiQuizSubmitted(false);
                          setWifiQuizOptions([]);
                          setIsWifiQuizCorrect(false);
                        }}
                        className="text-red-600 font-semibold hover:underline flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <RotateCcw size={16} /> Retake
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* NEW: KNOWLEDGE CHECK 3: MOBILE QUIZ - REVEALED AFTER WIFI QUIZ */}
            {isWifiQuizCorrect && (
              <div
                ref={mobileSectionRef}
                className="mt-16 animate-fade-in border-t pt-12 border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                    <HelpCircle size={24} />
                  </div>
                  <h2 className="text-2xl font-batangas font-bold text-slate-900">
                    Knowledge Check 3
                  </h2>
                </div>

                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <h3 className="text-lg font-batangas font-bold text-slate-900 mb-6 text-center">
                    How many Mobile lines does a customer need to have to
                    qualify for a Multi-line discount?
                  </h3>

                  <div className="space-y-4 max-w-2xl mx-auto">
                    {mobileOptions.map((option) => {
                      const isSelected = mobileQuizOption === option;
                      return (
                        <div
                          key={option}
                          onClick={() => handleMobileOptionSelect(option)}
                          className={`
                                            flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                            ${
                                              isSelected
                                                ? mobileQuizSubmitted &&
                                                  isMobileQuizCorrect
                                                  ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                  : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                            }
                                            ${mobileQuizSubmitted && isMobileQuizCorrect ? "cursor-default" : ""}
                                        `}
                        >
                          <div
                            className={`
                                            w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                            ${
                                              isSelected
                                                ? mobileQuizSubmitted &&
                                                  isMobileQuizCorrect
                                                  ? "bg-green-500 border-green-500"
                                                  : "bg-red-600 border-red-600"
                                                : "border-gray-300 bg-white"
                                            }
                                        `}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            )}
                          </div>
                          <p
                            className={`text-sm font-medium ${isSelected ? "text-slate-900 font-bold" : "text-gray-600"}`}
                          >
                            {option}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {mobileQuizSubmitted && (
                    <div
                      className={`mt-8 p-5 rounded-2xl flex items-center gap-3 animate-fade-in max-w-2xl mx-auto font-medium ${isMobileQuizCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                    >
                      {isMobileQuizCorrect ? (
                        <>
                          <CheckCircle size={24} className="text-green-600" />
                          <span className="font-bold">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={24} className="text-red-600" />
                          <span>
                            <strong className="font-bold">Incorrect.</strong> A
                            customer needs to have 4 or more Mobile lines to
                            qualify for the Multi-line discount.
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end mt-8 max-w-2xl mx-auto">
                    {!isMobileQuizCorrect ? (
                      <button
                        onClick={handleSubmitMobileQuiz}
                        disabled={!mobileQuizOption}
                        className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all ${!mobileQuizOption ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white"}`}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileQuizSubmitted(false);
                          setMobileQuizOption(null);
                          setIsMobileQuizCorrect(false);
                        }}
                        className="text-red-600 font-semibold hover:underline flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <RotateCcw size={16} /> Retake
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DEFAULT FOOTER (Visible only after ALL activities passed) */}
        {isMobileQuizCorrect && isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handlePageComplete}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] transition-all uppercase tracking-widest text-sm"
            >
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}

        {/* QUIZ MODAL (Quiz 1) */}
        {isQuizOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-poppins">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
              onClick={() => {
                if (!isQuizCorrect) setIsQuizOpen(false);
              }}
            ></div>
            <div className="bg-white rounded-3xl shadow-2xl relative w-full max-w-3xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
              <div className="bg-slate-900 p-6 md:p-8 text-white flex justify-between items-start border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-batangas font-bold flex items-center gap-3">
                    <HelpCircle className="text-red-500" /> Show What You Know!
                  </h2>
                  <p className="text-gray-400 text-sm mt-2 font-medium">
                    Check your knowledge by answering these quick questions.
                  </p>
                </div>
                {!isQuizCorrect && (
                  <button
                    onClick={() => setIsQuizOpen(false)}
                    className="text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-red-600 p-2 rounded-full"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <h3 className="text-lg font-batangas font-bold text-slate-900 mb-6 leading-relaxed">
                  How does the updated Spectrum Pricing and Packaging make it
                  easier to sell Spectrum products and services?{" "}
                  <span className="text-gray-500 font-medium text-sm font-poppins">
                    (Select all that apply)
                  </span>
                </h3>
                <div className="space-y-4">
                  {quiz1Options.map((option, idx) => {
                    const isSelected = selectedQuizOptions.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleOptionToggle(idx)}
                        className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${isSelected ? (quizSubmitted && isQuizCorrect ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]" : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]") : "border-gray-200 hover:border-red-200 hover:bg-gray-50"} ${quizSubmitted && isQuizCorrect ? "cursor-default" : ""}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isSelected ? (quizSubmitted && isQuizCorrect ? "bg-green-500 border-green-500" : "bg-red-600 border-red-600") : "border-gray-300 bg-white"}`}
                        >
                          {isSelected && (
                            <Check size={16} className="text-white" />
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium ${isSelected ? "text-slate-900 font-bold" : "text-gray-600"}`}
                        >
                          {option}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div
                    className={`mt-8 p-5 rounded-2xl flex items-center gap-3 animate-fade-in font-medium ${isQuizCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                  >
                    {isQuizCorrect ? (
                      <>
                        <CheckCircle size={24} className="text-green-600" />
                        <span className="font-bold">
                          Correct! That's right.
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle size={24} className="text-red-600" />
                        <span>
                          <strong className="font-bold">Incorrect.</strong>{" "}
                          Please select all correct options to proceed.
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                {isQuizCorrect ? (
                  <button
                    onClick={handleQuizSuccessContinue}
                    className="bg-red-600 hover:bg-slate-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all flex items-center gap-2 uppercase tracking-widest text-sm"
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedQuizOptions.length === 0}
                    className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${selectedQuizOptions.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white"}`}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
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
          animation: fade-in 0.5s ease-out forwards;
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

export default WhatsChanging;
