import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  FileText,
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ðŸ'‡ 1. IMPORT HELPER FUNCTION
import Sidebar2, { markLessonComplete } from "./Sidebar2";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const BusinessRules = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("new"); // 'new' or 'existing'

  // --- QUIZ 1 STATE (Multiple Response) ---
  const [quiz1Options, setQuiz1Options] = useState([]);
  const [quiz1Submitted, setQuiz1Submitted] = useState(false);
  const [isQuiz1Correct, setIsQuiz1Correct] = useState(false);

  // --- QUIZ 2 STATE (True/False - Maria) ---
  const [quiz2Option, setQuiz2Option] = useState(null); // 'true' or 'false'
  const [quiz2Submitted, setQuiz2Submitted] = useState(false);
  const [isQuiz2Correct, setIsQuiz2Correct] = useState(false);

  // --- QUIZ 3 STATE (True/False - Dave) ---
  const [quiz3Option, setQuiz3Option] = useState(null); // 'true' or 'false'
  const [quiz3Submitted, setQuiz3Submitted] = useState(false);
  const [isQuiz3Correct, setIsQuiz3Correct] = useState(false);

  const navigate = useNavigate();
  const quiz2SectionRef = useRef(null);
  const quiz3SectionRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Navigation Handler
  const handleContinue = () => {
    // ðŸ'‡ 2. MARK LESSON 5 COMPLETE
    markLessonComplete(5);

    // Navigate to the next section (Acquisition Strategy)
    navigate("/acquisition-strategy");
  };

  const handleExit = () => {
    navigate("/");
  };

  // --- QUIZ 1 HANDLERS ---
  const handleQuiz1OptionToggle = (id) => {
    if (quiz1Submitted && isQuiz1Correct) return;
    setQuiz1Submitted(false);
    setQuiz1Options((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmitQuiz1 = () => {
    setQuiz1Submitted(true);
    // Correct Answers: Internet Gig Bundle/Double Play (1) & Internet 2 Gig Triple Play (3)
    const correctIds = [1, 3];
    const selectedCorrectly =
      quiz1Options.length === 2 &&
      quiz1Options.every((id) => correctIds.includes(id));

    if (selectedCorrectly) {
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
    setQuiz1Options([]);
    setIsQuiz1Correct(false);
  };

  // --- QUIZ 2 HANDLERS ---
  const handleQuiz2OptionSelect = (val) => {
    if (quiz2Submitted && isQuiz2Correct) return;
    setQuiz2Submitted(false);
    setQuiz2Option(val);
  };

  const handleSubmitQuiz2 = () => {
    setQuiz2Submitted(true);
    // Correct Answer: False
    if (quiz2Option === "false") {
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
  const handleQuiz3OptionSelect = (val) => {
    if (quiz3Submitted && isQuiz3Correct) return;
    setQuiz3Submitted(false);
    setQuiz3Option(val);
  };

  const handleSubmitQuiz3 = () => {
    setQuiz3Submitted(true);
    // Correct Answer: False
    if (quiz3Option === "false") {
      setIsQuiz3Correct(true);
    } else {
      setIsQuiz3Correct(false);
    }
  };

  const resetQuiz3 = () => {
    setQuiz3Submitted(false);
    setQuiz3Option(null);
    setIsQuiz3Correct(false);
  };

  // Quiz 1 Data
  const quiz1Data = [
    { id: 0, text: "Internet Ultra Single Play" },
    { id: 1, text: "Internet Gig Bundle/Double Play" },
    { id: 2, text: "Internet Premier Triple Play" },
    { id: 3, text: "Internet 2 Gig Triple Play" },
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
              Business Rules / Overview
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
            <div className="mb-8 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 5
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Business Rules
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Source of Truth Alert */}
            <div className="bg-white/90 backdrop-blur-md border-l-4 border-red-600 p-6 rounded-r-2xl shadow-sm mb-10 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-red-600 shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-batangas font-bold text-slate-900 mb-2">
                    Source of Truth
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    You will use{" "}
                    <span className="font-bold text-red-600">Buyflow</span> as
                    the Source of Truth for customer eligibility on Spectrum
                    Business Pricing and Packaging. Below is a high-level
                    overview of the Business Rules you should follow for new and
                    existing customers.
                  </p>
                </div>
              </div>
            </div>

            {/* TABBED INTERFACE */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl shadow-sm overflow-hidden animate-fade-in delay-100 mb-16 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
              {/* Tabs Header */}
              <div className="flex border-b border-gray-100 bg-gray-50">
                <button
                  onClick={() => setActiveTab("new")}
                  className={`flex-1 py-5 px-6 text-sm font-semibold uppercase tracking-widest transition-all cursor-pointer
                                        ${
                                          activeTab === "new"
                                            ? "bg-white text-red-600 border-b-2 border-red-600 shadow-[inset_0_-2px_0_white]"
                                            : "text-gray-500 hover:bg-gray-100 hover:text-slate-900"
                                        }`}
                >
                  New Customers
                </button>
                <button
                  onClick={() => setActiveTab("existing")}
                  className={`flex-1 py-5 px-6 text-sm font-semibold uppercase tracking-widest transition-all cursor-pointer
                                        ${
                                          activeTab === "existing"
                                            ? "bg-white text-red-600 border-b-2 border-red-600 shadow-[inset_0_-2px_0_white]"
                                            : "text-gray-500 hover:bg-gray-100 hover:text-slate-900"
                                        }`}
                >
                  Existing Customers
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8 md:p-12 min-h-100">
                {activeTab === "new" && (
                  <div className="animate-fade-in">
                    <p className="text-slate-900 font-batangas font-bold text-lg mb-8">
                      These are a high-level overview of the business rules for
                      the updated Spectrum Business Pricing and Packaging:
                    </p>
                    <ul className="space-y-6 text-gray-600 font-medium text-[15px] leading-relaxed">
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Standard rates will apply for all Internet ancillary
                          services (i.e., Advanced Business WiFi, Static IP,
                          Wireless Internet Back-up) across all packages unless
                          otherwise noted.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Broadcast TV surcharge continues to be a separate
                          charge.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          India View Stream and India View Stream Plus will
                          continue to require TV Stream or TV Stream Latino as
                          the base video tier.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Free professional installation is available with
                          Ultra, Gig, and 2 Gig Bundles and Triple Plays
                          (includes Public, Private, and Bar Restaurant).
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Standalone Mobile customers are not eligible for
                          volume pricing.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Customers must continue to maintain Internet (any
                          tier) and 4+ SMB Mobile lines in service to retain the
                          multi-line discount.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <div className="flex flex-col gap-3">
                          <span>
                            Tablets and wearables are not eligible for the One
                            Mobile Line Included offer.
                          </span>
                          <ul className="pl-5 list-disc text-gray-500 text-sm font-medium">
                            <li>
                              Wearables do not contribute to the Mobile bundle
                              requirement.
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Any combination of paid tablets and/or phones
                          contribute to the Mobile bundle or volume offer
                          requirement.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <div className="flex flex-col gap-2">
                          <span>
                            Offers can be combined with all other available
                            Promotional Offers:
                          </span>
                          <span className="italic text-gray-500 pl-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                            Free Install Close Tactic; Free Business Voice Line
                            with Spectrum Business Connect; Included Mobile line
                            (acquisition/upgrade/retention); Bar Restaurant
                            Triple Play Free TV
                          </span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <div className="flex flex-col gap-2">
                          <span>
                            Promotions that will{" "}
                            <span className="text-red-600 font-bold">end</span>{" "}
                            upon the start of the updated Spectrum Business
                            Pricing and Packaging:
                          </span>
                          <span className="italic text-gray-500 pl-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                            Specialized Ultra/Gig; Enhanced Mobile Bundle with
                            Flagship Internet, Free WiFi and One Mobile Line
                            Included (SOFB); B&R Triple Play with $10 off
                            Flagship; Mobile Buy One Get One Next (BOGO)
                          </span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <div className="flex flex-col gap-2">
                          <span>
                            Mobile Offer(s) that will be discontinued upon the
                            start of the updated Spectrum Business Pricing and
                            Packaging:
                          </span>
                          <span className="italic text-gray-500 pl-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                            Proactive One Mobile Line Included; Add Internet;
                            Tier Upgrades; Add Voice; National Offer Upgrade
                            Path Buy One Get Next Free; Escalation - Buy One Get
                            Next Free; Escalation - Gig Internet; Escalation -
                            Ultra Internet; Escalation - Internet + Business
                            Voice
                          </span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>Core Seasonal Suspension is allowed.</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "existing" && (
                  <div className="animate-fade-in">
                    <p className="text-slate-900 font-batangas font-bold text-lg mb-8">
                      The following are general principles to help you when
                      working with existing business customers:
                    </p>
                    <ul className="space-y-6 text-gray-600 font-medium text-[15px] leading-relaxed">
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Existing Premier-only customers can upgrade to the
                          updated Ultra/Gig price guarantee offers.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Existing acquisition customers can upgrade to the
                          updated acquisition rates.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Existing customers adding new LOB(s) are eligible for
                          acquisition rates for the new LOB(s).
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Existing Business Voice and Video services retain
                          their offer when moving to the updated pricing and
                          packaging.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Legacy to updated Internet Offers are driven by
                          current Legacy rates, and if new LOBs are added.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Legacy Business Voice and Video services go to updated
                          persistent rates.
                        </span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 mt-2.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                        <span>
                          Existing SMB Mobile customers are eligible for volume
                          rates if they have 4+ lines and add at least 1 new
                          line.
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Review / Closing */}
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl text-center shadow-[0_8px_30px_rgba(15,23,42,0.3)] border-t-4 border-red-600 animate-fade-in delay-200 mb-16 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
              <h3 className="text-2xl font-batangas font-bold mb-3 relative z-10 transition-colors">
                Let's review what you know
              </h3>
              <p className="text-gray-300 font-medium relative z-10">
                Next, we will look at how to apply these rules in your
                Acquisition Strategy.
              </p>
            </div>

            {/* SHOW WHAT YOU KNOW SECTION */}
            <div className="animate-fade-in delay-200 pt-12 border-t border-gray-200 mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-4">
                  Show What You Know!
                </h2>
                <p className="text-gray-600 font-medium text-lg">
                  Check your knowledge by answering these quick questions.
                </p>
              </div>

              {/* Quiz 1: Bundle Types */}
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
                  What Bundle type would include free installation?{" "}
                  <span className="text-gray-500 font-medium text-sm font-poppins block mt-1">
                    (Select all that apply)
                  </span>
                </h3>

                <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                  {quiz1Data.map((option) => {
                    const isSelected = quiz1Options.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => handleQuiz1OptionToggle(option.id)}
                        className={`
                                                                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                        ${
                                                                          isSelected
                                                                            ? quiz1Submitted &&
                                                                              isQuiz1Correct
                                                                              ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                                              : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                                            : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                                                        }
                                                                        ${quiz1Submitted && isQuiz1Correct ? "cursor-default" : ""}
                                                                    `}
                      >
                        <div
                          className={`
                                                                        w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                                        ${
                                                                          isSelected
                                                                            ? quiz1Submitted &&
                                                                              isQuiz1Correct
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
                            Free installation is included with all Ultra, Gig,
                            and 2 Gig Bundles and Triple Plays.
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
                      disabled={quiz1Options.length === 0}
                      className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${quiz1Options.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white cursor-pointer"}`}
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

              {/* Quiz 2: Maria's Bundle - Revealed after Quiz 1 */}
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
                    Maria, a new customer, can get Gig with free WiFi, and One
                    Mobile line included with a 2-year Price Guarantee (PG).
                  </h3>

                  <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                    {["true", "false"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleQuiz2OptionSelect(option)}
                        className={`
                                                                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                        ${
                                                                          quiz2Option ===
                                                                          option
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
                                                                          option
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
                          {quiz2Option === option && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium capitalize leading-relaxed ${quiz2Option === option ? "text-slate-900 font-bold" : "text-gray-600"}`}
                        >
                          {option}
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
                              Maria would get a{" "}
                              <strong className="font-bold">one-year</strong>{" "}
                              Gig and free WiFi promotion. One Mobile Line
                              Included with Internet do not qualify as an
                              eligible Line of Business for Price Guarantee
                              bundles. To get a 2-year PG, she would have to pay
                              for the Mobile line or order an additional Paid
                              Mobile line (or other eligible line of service).
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

              {/* Quiz 3: Dave's Bundle - Revealed after Quiz 2 */}
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
                    Dave is a new customer who wants to purchase 5 Mobile
                    Unlimited lines. He does not want to purchase Internet. He
                    will still be eligible for the Mobile Multi-line discount.
                  </h3>

                  <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                    {["true", "false"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleQuiz3OptionSelect(option)}
                        className={`
                                                                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                        ${
                                                                          quiz3Option ===
                                                                          option
                                                                            ? quiz3Submitted &&
                                                                              isQuiz3Correct
                                                                              ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                                              : quiz3Submitted &&
                                                                                  !isQuiz3Correct
                                                                                ? "border-red-500 bg-red-50 shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                                                                                : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                                            : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                                                        }
                                                                        ${quiz3Submitted && isQuiz3Correct ? "cursor-default" : ""}
                                                                    `}
                      >
                        <div
                          className={`
                                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                                        ${
                                                                          quiz3Option ===
                                                                          option
                                                                            ? quiz3Submitted &&
                                                                              isQuiz3Correct
                                                                              ? "bg-green-500 border-green-500"
                                                                              : quiz3Submitted &&
                                                                                  !isQuiz3Correct
                                                                                ? "bg-red-500 border-red-500"
                                                                                : "bg-red-600 border-red-600"
                                                                            : "border-gray-300 bg-white"
                                                                        }
                                                                    `}
                        >
                          {quiz3Option === option && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium capitalize leading-relaxed ${quiz3Option === option ? "text-slate-900 font-bold" : "text-gray-600"}`}
                        >
                          {option}
                        </p>
                      </div>
                    ))}
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
                              Standalone Mobile customers are not eligible for
                              volume pricing. Dave will have to purchase
                              Internet (any Tier) to qualify for the Mobile
                              Multi-line discount.
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
                        disabled={quiz3Option === null}
                        className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${quiz3Option === null ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white"}`}
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

        {/* Footer / Continue Bar - Only Show if ALL Quizzes Passed AND Bottom Reached */}
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

export default BusinessRules;
