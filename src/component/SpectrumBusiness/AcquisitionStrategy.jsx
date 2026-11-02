import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Target,
  TrendingUp,
  MessageCircle,
  Zap,
  Wifi, // Added missing Wifi icon
  Check,
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Info, // Consolidated Info icon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ðŸ'‡ 1. IMPORT HELPER FUNCTION
import Sidebar2, { markLessonComplete } from "./Sidebar2";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const AcquisitionStrategy = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // --- QUIZ 1 STATE ---
  const [quiz1Option, setQuiz1Option] = useState(null);
  const [quiz1Submitted, setQuiz1Submitted] = useState(false);
  const [isQuiz1Correct, setIsQuiz1Correct] = useState(false);

  // --- QUIZ 2 STATE ---
  const [quiz2Option, setQuiz2Option] = useState(null);
  const [quiz2Submitted, setQuiz2Submitted] = useState(false);
  const [isQuiz2Correct, setIsQuiz2Correct] = useState(false);

  // --- QUIZ 3 STATE (Multiple Response) ---
  const [quiz3Options, setQuiz3Options] = useState([]);
  const [quiz3Submitted, setQuiz3Submitted] = useState(false);
  const [isQuiz3Correct, setIsQuiz3Correct] = useState(false);

  const quiz2SectionRef = useRef(null);
  const quiz3SectionRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Navigation Handler
  const handleContinue = () => {
    // ðŸ'‡ 2. MARK LESSON 6 COMPLETE
    markLessonComplete(6);

    // Navigate to the next section (Order Entry / Quiz)
    navigate("/quiz");
  };

  const handleExit = () => {
    navigate("/");
  };

  // --- QUIZ 1 HANDLERS ---
  const handleQuiz1OptionClick = (id) => {
    if (quiz1Submitted && isQuiz1Correct) return; // Prevent changing if already correct
    setQuiz1Option(id);
    setQuiz1Submitted(false);
  };

  const handleSubmitQuiz1 = () => {
    setQuiz1Submitted(true);
    // Correct Answer: Option 1 (Triple-Play bundle of Gig...)
    if (quiz1Option === 1) {
      setIsQuiz1Correct(true);
      setTimeout(() => {
        quiz2SectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      setIsQuiz1Correct(false);
    }
  };

  const resetQuiz1 = () => {
    setQuiz1Submitted(false);
    setQuiz1Option(null);
    setIsQuiz1Correct(false);
  };

  // --- QUIZ 2 HANDLERS ---
  const handleQuiz2OptionClick = (id) => {
    if (quiz2Submitted && isQuiz2Correct) return;
    setQuiz2Option(id);
    setQuiz2Submitted(false);
  };

  const handleSubmitQuiz2 = () => {
    setQuiz2Submitted(true);
    // Correct Answer: Option 1 (A Triple-Play bundle of Gig, 4 Unlimited Mobile lines...)
    if (quiz2Option === 1) {
      setIsQuiz2Correct(true);
      setTimeout(() => {
        quiz3SectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      setIsQuiz2Correct(false);
    }
  };

  const resetQuiz2 = () => {
    setQuiz2Submitted(false);
    setQuiz2Option(null);
    setIsQuiz2Correct(false);
  };

  // --- QUIZ 3 HANDLERS ---
  const handleQuiz3OptionToggle = (id) => {
    if (quiz3Submitted && isQuiz3Correct) return;
    setQuiz3Submitted(false);
    setQuiz3Options((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmitQuiz3 = () => {
    setQuiz3Submitted(true);
    // Correct Answer: All 4 options must be selected (IDs: 0, 1, 2, 3)
    if (quiz3Options.length === 4) {
      setIsQuiz3Correct(true);
    } else {
      setIsQuiz3Correct(false);
    }
  };

  const resetQuiz3 = () => {
    setQuiz3Submitted(false);
    setQuiz3Options([]);
    setIsQuiz3Correct(false);
  };

  const quiz1Data = [
    {
      id: 0,
      text: "A Double-Play bundle of Gig with WiFi and 1 paid Unlimited Mobile line.",
    },
    {
      id: 1,
      text: "A Triple-Play bundle of Gig with Free WiFi, 4 Unlimited+ Mobile lines, and 1 Business Voice line.",
    },
    {
      id: 2,
      text: "A Single-Play with Gig Internet and 1 Mobile line included.",
    },
    {
      id: 3,
      text: "A Double-Play bundle with Ultra and 1 paid Unlimited Mobile line.",
    },
  ];

  const quiz2Data = [
    { id: 0, text: "A Double-Play bundle of Ultra, WiFi, and 3 Mobile lines." },
    {
      id: 1,
      text: "A Triple-Play bundle of Gig, 4 Unlimited Mobile lines, and 1 Business Voice line.",
    },
    {
      id: 2,
      text: "A Single-Play with Gig Internet and 1 Mobile line included.",
    },
    { id: 3, text: "A Double-Play bundle with Ultra and 1 paid Mobile line." },
  ];

  const quiz3Data = [
    {
      id: 0,
      text: "We are so confident our products will enhance your business, we stand by them with a 30-day money-back guarantee. Would you like to try our services at no risk for the first month?",
    },
    {
      id: 1,
      text: "We simplified our billing to reduce confusion and make it easier for our business customers to understand our charges.",
    },
    {
      id: 2,
      text: "We offer reliable connectivity that will increase the productivity of your business. We offer 24/7/365 U.S.-based customer support and will resolve any issues with 24 hours.",
    },
    {
      id: 3,
      text: "We stand by our products and services. If you're not satisfied with your Mobile device, we offer a 14-day money back guarantee.",
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
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500  transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Business Rules / Acquisition Strategy
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Content Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar bg-gray-50"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 6
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Acquisition Strategy
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Intro Text */}
            <div className="prose max-w-none mb-12 animate-fade-in">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                Our acquisition strategy is to leverage the existing{" "}
                <span className="font-bold text-slate-900 bg-red-50 px-2 py-1 rounded">
                  top-down selling method
                </span>{" "}
                and highlight the value of our products and services. With the
                updated Spectrum Business Pricing and Packaging, our goal is to
                provide customers with an initial offer that provides the best
                bundle.
              </p>
            </div>

            {/* Three Principles */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 animate-fade-in delay-100">
              {[
                {
                  icon: <MessageCircle size={32} />,
                  title: "Discovery",
                  text: "Always pitch based on what you learn during conversational discovery questions.",
                },
                {
                  icon: <Zap size={32} />,
                  title: "3-Year Guarantee",
                  text: "Sell the 3-Year Price Guarantee bundles whenever possible.",
                },
                {
                  icon: <TrendingUp size={32} />,
                  title: "Top-Down",
                  text: "Use Top-Down selling while highlighting the value of our products and services.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:-translate-y-1 hover:border-red-200 transition-all flex flex-col items-center text-center group"
                >
                  <div className="bg-red-50 border border-red-100 p-4 rounded-full text-red-600 mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-batangas font-bold text-slate-900 text-xl mb-3 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* OFFERS SECTION */}
            <div className="space-y-12 animate-fade-in delay-200 mb-16">
              {/* LEAD OFFERS (Emerald Theme) */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-emerald-600">
                    <Target size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-batangas font-bold text-slate-900">
                      Lead Offers
                    </h2>
                    <p className="text-sm text-gray-500 font-semibold tracking-wide uppercase mt-1">
                      Triple Play Bundles 3-Year Price Guarantee
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* 1st Lead */}
                  <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 relative shadow-md hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] transition-shadow">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">
                      1st Lead Offer
                    </div>
                    <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2 mt-2">
                      Triple Play w/ Internet Gig
                    </h3>
                    <div className="text-3xl font-batangas font-bold text-emerald-600 mb-6">
                      Starting at $90
                      <span className="text-sm text-gray-500 font-medium font-poppins">
                        /mo
                      </span>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-xl text-sm text-emerald-800 font-semibold mb-6 flex items-center justify-center gap-2 border border-emerald-100 shadow-inner">
                      <Zap size={18} className="text-emerald-600" /> Add 2
                      Products
                    </div>

                    <ul className="space-y-3 text-sm font-medium text-gray-600">
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-emerald-500 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Free Installation
                      </li>
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-emerald-500 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Free Advanced WiFi
                      </li>
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-emerald-500 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Fastest, most reliable speeds
                      </li>
                    </ul>
                  </div>

                  {/* 2nd Lead */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm hover:border-emerald-300 transition-colors relative">
                    <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest border-b border-l border-gray-300">
                      2nd Lead Offer
                    </div>
                    <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2 mt-2">
                      Triple Play w/ Internet Ultra
                    </h3>
                    <div className="text-3xl font-batangas font-bold text-gray-900 mb-6">
                      Starting at $70
                      <span className="text-sm text-gray-500 font-medium font-poppins">
                        /mo
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl text-sm text-gray-700 font-semibold mb-6 flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                      <Zap size={18} className="text-gray-400" /> Add 2 Products
                    </div>

                    <ul className="space-y-3 text-sm font-medium text-gray-600">
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-gray-400 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Free Installation
                      </li>
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-gray-400 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Reliable speeds
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 bg-emerald-50 text-emerald-900 p-5 rounded-xl flex gap-4 items-start border border-emerald-100 shadow-sm">
                  <Info size={24} className="shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium leading-relaxed">
                    <span className="font-bold">Selling the Value:</span>{" "}
                    Offering a{" "}
                    <span className="font-bold underline">
                      3-Year Price Guarantee
                    </span>{" "}
                    to help you save more when you bundle! Includes 24/7/365
                    U.S.-based support.
                  </span>
                </div>
              </div>

              {/* FALLBACK OFFERS (Red Theme) */}
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-red-600">
                    <Wifi size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-batangas font-bold text-slate-900">
                      Fallback Offers
                    </h2>
                    <p className="text-sm text-gray-500 font-semibold tracking-wide uppercase mt-1">
                      Double Play Bundles 2-Year Price Guarantee
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* 1st Fallback */}
                  <div className="bg-white border-2 border-red-400 rounded-2xl p-8 relative shadow-md hover:shadow-[0_4px_15px_rgba(220,38,38,0.15)] transition-shadow">
                    <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest border-b border-l border-red-200">
                      1st Fallback
                    </div>
                    <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2 mt-2">
                      Double Play w/ Internet Gig
                    </h3>
                    <div className="text-3xl font-batangas font-bold text-red-600 mb-6">
                      Starting at $100
                      <span className="text-sm text-gray-500 font-medium font-poppins">
                        /mo
                      </span>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl text-sm text-red-800 font-semibold mb-6 flex items-center justify-center gap-2 border border-red-100 shadow-inner">
                      <Zap size={18} className="text-red-600" /> Add 1 Product
                    </div>

                    <ul className="space-y-3 text-sm font-medium text-gray-600">
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-red-500 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Free Installation
                      </li>
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-red-500 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Free Advanced WiFi
                      </li>
                    </ul>
                  </div>

                  {/* 2nd Fallback */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm hover:border-red-300 transition-colors relative">
                    <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest border-b border-l border-gray-300">
                      2nd Fallback
                    </div>
                    <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2 mt-2">
                      Double Play w/ Internet Ultra
                    </h3>
                    <div className="text-3xl font-batangas font-bold text-gray-900 mb-6">
                      Starting at $80
                      <span className="text-sm text-gray-500 font-medium font-poppins">
                        /mo
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl text-sm text-gray-700 font-semibold mb-6 flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                      <Zap size={18} className="text-gray-400" /> Add 1 Product
                    </div>

                    <ul className="space-y-3 text-sm font-medium text-gray-600">
                      <li className="flex items-center gap-3">
                        <Check
                          size={18}
                          className="text-gray-400 shrink-0"
                          strokeWidth={3}
                        />{" "}
                        Free Installation
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 bg-red-50 text-red-900 p-5 rounded-xl flex gap-4 items-start border border-red-100 shadow-sm">
                  <Info size={24} className="shrink-0 text-red-600" />
                  <span className="text-sm font-medium leading-relaxed">
                    <span className="font-bold">Selling the Value:</span>{" "}
                    Offering a{" "}
                    <span className="font-bold underline">
                      2-Year Price Guarantee
                    </span>
                    . Great value with reliable speeds.
                  </span>
                </div>
              </div>
            </div>

            {/* SHOW WHAT YOU KNOW SECTION */}
            <div className="animate-fade-in delay-300 pt-12 border-t border-gray-200 mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-4">
                  Show What You Know!
                </h2>
                <p className="text-gray-600 font-medium text-lg">
                  Check your knowledge by answering these quick questions.
                </p>
              </div>

              {/* Quiz 1 */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                    <HelpCircle size={24} />
                  </div>
                  <h2 className="text-xl font-batangas font-bold text-slate-900">
                    Question 1
                  </h2>
                </div>

                <h3 className="text-lg font-batangas font-bold text-slate-900 mb-8 md:pl-12 leading-relaxed">
                  You're talking to a prospective customer who owns a small
                  advertising company. They regularly transfer large files, and
                  security is a primary concern. In addition to themselves, they
                  have 3 employees that are remote or travel frequently. What
                  would your lead offer be for this customer?
                </h3>

                <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                  {quiz1Data.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleQuiz1OptionClick(option.id)}
                      className={`
                                                                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                        ${
                                                                          quiz1Option ===
                                                                          option.id
                                                                            ? quiz1Submitted &&
                                                                              isQuiz1Correct
                                                                              ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                                              : quiz1Submitted &&
                                                                                  !isQuiz1Correct
                                                                                ? "border-red-500 bg-red-50 shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                                                                                : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                                            : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                                                        }
                                                                        ${quiz1Submitted && isQuiz1Correct ? "cursor-default" : ""}
                                                                    `}
                    >
                      <div
                        className={`
                                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                                        ${
                                                                          quiz1Option ===
                                                                          option.id
                                                                            ? quiz1Submitted &&
                                                                              isQuiz1Correct
                                                                              ? "bg-green-500 border-green-500"
                                                                              : quiz1Submitted &&
                                                                                  !isQuiz1Correct
                                                                                ? "bg-red-500 border-red-500"
                                                                                : "bg-red-600 border-red-600"
                                                                            : "border-gray-300 bg-white"
                                                                        }
                                                                    `}
                      >
                        {quiz1Option === option.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <p
                        className={`text-sm font-medium leading-relaxed ${quiz1Option === option.id ? "text-slate-900 font-bold" : "text-gray-600"}`}
                      >
                        {option.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Feedback Message */}
                {quiz1Submitted && (
                  <div
                    className={`mt-8 p-5 rounded-2xl flex items-start gap-3 animate-fade-in max-w-3xl mx-auto md:ml-12 font-medium ${isQuiz1Correct ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                  >
                    {isQuiz1Correct ? (
                      <>
                        <CheckCircle
                          size={24}
                          className="shrink-0 mt-0.5 text-green-600"
                        />
                        <span className="font-bold pt-0.5">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={24}
                          className="shrink-0 mt-0.5 text-red-600"
                        />
                        <div>
                          <span className="font-bold block mb-1">
                            Incorrect.
                          </span>
                          <span className="text-sm">
                            Your lead offer should be a Triple Play bundle of
                            Gig with Free WiFi, 4 Unlimited+ Mobile lines for
                            their employees, and 1 Business Voice line. You
                            should also mention the benefits of Wireless
                            Internet Backup.
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end mt-10 max-w-3xl mx-auto">
                  {!isQuiz1Correct ? (
                    <button
                      onClick={handleSubmitQuiz1}
                      disabled={quiz1Option === null}
                      className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${quiz1Option === null ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white cursor-pointer"}`}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={resetQuiz1}
                      className="text-red-600 font-semibold hover:underline flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <RotateCcw size={16} /> Retake
                    </button>
                  )}
                </div>
              </div>

              {/* Quiz 2 - Revealed after Quiz 1 is correct */}
              {isQuiz1Correct && (
                <div
                  ref={quiz2SectionRef}
                  className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow mb-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                      <HelpCircle size={24} />
                    </div>
                    <h2 className="text-xl font-batangas font-bold text-slate-900">
                      Question 2
                    </h2>
                  </div>

                  <h3 className="text-lg font-batangas font-bold text-slate-900 mb-8 md:pl-12 leading-relaxed">
                    This customer mentions they don't need the data of
                    Unlimited+ lines; Unlimited will do. They do need Gig since
                    they transfer large files. What would your next offer be for
                    this customer?
                  </h3>

                  <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                    {quiz2Data.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleQuiz2OptionClick(option.id)}
                        className={`
                                                                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                        ${
                                                                          quiz2Option ===
                                                                          option.id
                                                                            ? quiz2Submitted &&
                                                                              isQuiz2Correct
                                                                              ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                                              : quiz2Submitted &&
                                                                                  !isQuiz2Correct
                                                                                ? "border-red-500 bg-red-50 shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                                                                                : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                                            : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                                                        }
                                                                        ${quiz2Submitted && isQuiz2Correct ? "cursor-default" : ""}
                                                                    `}
                      >
                        <div
                          className={`
                                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                                        ${
                                                                          quiz2Option ===
                                                                          option.id
                                                                            ? quiz2Submitted &&
                                                                              isQuiz2Correct
                                                                              ? "bg-green-500 border-green-500"
                                                                              : quiz2Submitted &&
                                                                                  !isQuiz2Correct
                                                                                ? "bg-red-500 border-red-500"
                                                                                : "bg-red-600 border-red-600"
                                                                            : "border-gray-300 bg-white"
                                                                        }
                                                                    `}
                        >
                          {quiz2Option === option.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium leading-relaxed ${quiz2Option === option.id ? "text-slate-900 font-bold" : "text-gray-600"}`}
                        >
                          {option.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Feedback Message */}
                  {quiz2Submitted && (
                    <div
                      className={`mt-8 p-5 rounded-2xl flex items-start gap-3 animate-fade-in max-w-3xl mx-auto md:ml-12 font-medium ${isQuiz2Correct ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                    >
                      {isQuiz2Correct ? (
                        <>
                          <CheckCircle
                            size={24}
                            className="shrink-0 mt-0.5 text-green-600"
                          />
                          <span className="font-bold pt-0.5">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={24}
                            className="shrink-0 mt-0.5 text-red-600"
                          />
                          <div>
                            <span className="font-bold block mb-1">
                              Incorrect.
                            </span>
                            <span className="text-sm">
                              Your next fallback offer should be a Triple Play
                              bundle of Gig with Free WiFi, 4 Unlimited+ Mobile
                              lines for their employees, and 1 Business Voice
                              line. You should also mention the benefits of
                              Security Shield with Advanced Business WiFi.
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end mt-10 max-w-3xl mx-auto">
                    {!isQuiz2Correct ? (
                      <button
                        onClick={handleSubmitQuiz2}
                        disabled={quiz2Option === null}
                        className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${quiz2Option === null ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white cursor-pointer"}`}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={resetQuiz2}
                        className="text-red-600 font-semibold hover:underline flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <RotateCcw size={16} /> Retake
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Quiz 3 (Multiple Response) - Revealed after Quiz 2 is correct */}
              {isQuiz2Correct && (
                <div
                  ref={quiz3SectionRef}
                  className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                      <HelpCircle size={24} />
                    </div>
                    <h2 className="text-xl font-batangas font-bold text-slate-900">
                      Question 3
                    </h2>
                  </div>

                  <h3 className="text-lg font-batangas font-bold text-slate-900 mb-8 md:pl-12 leading-relaxed">
                    How can you sell the value of our products while
                    incorporating our Customer Commitment?{" "}
                    <span className="text-gray-500 font-medium text-sm font-poppins block mt-1">
                      (Select all that apply)
                    </span>
                  </h3>

                  <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                    {quiz3Data.map((option) => {
                      const isSelected = quiz3Options.includes(option.id);
                      return (
                        <div
                          key={option.id}
                          onClick={() => handleQuiz3OptionToggle(option.id)}
                          className={`
                                                                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                        ${
                                                                          isSelected
                                                                            ? quiz3Submitted &&
                                                                              isQuiz3Correct
                                                                              ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                                              : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                                            : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                                                        }
                                                                        ${quiz3Submitted && isQuiz3Correct ? "cursor-default" : ""}
                                                                    `}
                        >
                          <div
                            className={`
                                                                        w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                                        ${
                                                                          isSelected
                                                                            ? quiz3Submitted &&
                                                                              isQuiz3Correct
                                                                              ? "bg-green-500 border-green-500"
                                                                              : "bg-red-600 border-red-600"
                                                                            : "border-gray-300 bg-white"
                                                                        }
                                                                    `}
                          >
                            {isSelected && (
                              <Check
                                size={16}
                                className="text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                          <p
                            className={`text-sm font-medium leading-relaxed ${isSelected ? "text-slate-900 font-bold" : "text-gray-600"}`}
                          >
                            {option.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {quiz3Submitted && (
                    <div
                      className={`mt-8 p-5 rounded-2xl flex items-start gap-3 animate-fade-in max-w-3xl mx-auto md:ml-12 font-medium ${isQuiz3Correct ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                    >
                      {isQuiz3Correct ? (
                        <>
                          <CheckCircle
                            size={24}
                            className="shrink-0 mt-0.5 text-green-600"
                          />
                          <span className="font-bold pt-0.5">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={24}
                            className="shrink-0 mt-0.5 text-red-600"
                          />
                          <div>
                            <span className="font-bold block mb-1">
                              Incorrect.
                            </span>
                            <span className="text-sm">
                              These are all ways to sell the value and deliver
                              our Customer Commitment to the customer. Please
                              select all correct options.
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end mt-10 max-w-3xl mx-auto">
                    {!isQuiz3Correct ? (
                      <button
                        onClick={handleSubmitQuiz3}
                        disabled={quiz3Options.length === 0}
                        className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${quiz3Options.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white cursor-pointer"}`}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={resetQuiz3}
                        className="text-red-600 font-semibold hover:underline flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <RotateCcw size={16} /> Retake
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer / Continue Bar - Only Show if ALL Quizzes are passed AND Bottom Reached */}
        {isQuiz3Correct && isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] transition-all duration-300 uppercase tracking-widest text-sm"
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

export default AcquisitionStrategy;
