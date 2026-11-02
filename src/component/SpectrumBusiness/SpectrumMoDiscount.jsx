import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Smartphone,
  Users,
  Zap,
  Gift,
  CheckCircle,
  Info,
  TrendingUp,
  HelpCircle,
  XCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// IMPORT HELPER FUNCTION
import Sidebar2, { markLessonComplete } from "./Sidebar2";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const SpectrumMoDiscount = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- QUIZ 1 STATE (Activation Scenario) ---
  const [quiz1Option, setQuiz1Option] = useState(null);
  const [quiz1Submitted, setQuiz1Submitted] = useState(false);
  const [isQuiz1Correct, setIsQuiz1Correct] = useState(false);

  // --- QUIZ 2 STATE (Existing Customer Scenario) ---
  const [quiz2Option, setQuiz2Option] = useState(null);
  const [quiz2Submitted, setQuiz2Submitted] = useState(false);
  const [isQuiz2Correct, setIsQuiz2Correct] = useState(false);

  const navigate = useNavigate();
  const quiz2SectionRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Navigation Handler
  const handleContinue = () => {
    // MARK LESSON 4 COMPLETE
    markLessonComplete(4);

    // Navigate to the next section (Business Rules)
    navigate("/business-rules");
  };

  const handleExit = () => {
    navigate("/");
  };

  // --- QUIZ 1 HANDLERS ---
  const handleQuiz1OptionClick = (id) => {
    if (quiz1Submitted && isQuiz1Correct) return;
    setQuiz1Option(id);
    setQuiz1Submitted(false);
  };

  const handleSubmitQuiz1 = () => {
    setQuiz1Submitted(true);
    // Correct answer is Option 3 (ID: 3): "They would lose their 2-Year Price Guarantee and their $15 bundle pricing."
    if (quiz1Option === 3) {
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
    // Correct answer is Option 2 (ID: 2): "You tell them all lines will be eligible if they add a new Mobile line to their account."
    if (quiz2Option === 2) {
      setIsQuiz2Correct(true);
    } else {
      setIsQuiz2Correct(false);
    }
  };

  const resetQuiz2 = () => {
    setQuiz2Submitted(false);
    setQuiz2Option(null);
    setIsQuiz2Correct(false);
  };

  // Quiz 1 Options Data
  const quiz1Data = [
    {
      id: 0,
      text: "They will continue to keep their 2-Year Price Guarantee and $15 bundle pricing.",
    },
    {
      id: 1,
      text: "They would keep their 2-Year Price Guarantee, but revert to Internet-only rates.",
    },
    {
      id: 2,
      text: "They would keep their $15 bundle pricing, but lose their 2-Year Price Guarantee.",
    },
    {
      id: 3,
      text: "They would lose their 2-Year Price Guarantee and their $15 bundle pricing.",
    },
  ];

  // Quiz 2 Options Data
  const quiz2Data = [
    {
      id: 0,
      text: "You tell them that they are ineligible since they are an existing customer.",
    },
    {
      id: 1,
      text: "You tell them that they must cancel their account with Spectrum and sign up as a new customer.",
    },
    {
      id: 2,
      text: "You tell them all lines will be eligible if they add a new Mobile line to their account.",
    },
    {
      id: 3,
      text: "You tell them that they are eligible if they purchase 4 or more new Mobile lines.",
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
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Overview / Spectrum Mobile Multi-Line Discounts
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500 tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 rounded-full hover:bg-red-50 cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Content Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-8 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 4
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Spectrum Mobile Multi-Line Discounts
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Intro Text */}
            <div className="prose max-w-none mb-10 animate-fade-in">
              <div className="text-lg font-medium text-gray-600 leading-relaxed border-l-4 border-red-600 pl-6 py-4 bg-red-50/50 rounded-r-2xl shadow-sm">
                <p className="mb-4">
                  With the updated Spectrum Pricing and Packaging, we are
                  offering major value to business customers through Spectrum
                  Mobile. We now offer{" "}
                  <span className="font-bold text-slate-900">
                    multi-line discounted pricing
                  </span>{" "}
                  with Spectrum Mobile.
                </p>
                <p className="mb-4">
                  We are also{" "}
                  <span className="font-bold text-slate-900">
                    increasing the monthly data allowance
                  </span>{" "}
                  for our business customers.
                </p>
                <p className="mb-0">
                  In addition to offering{" "}
                  <span className="font-bold text-slate-900">
                    one Mobile line included with Internet
                  </span>
                  , this is the best value to drive Mobile sales.
                </p>
              </div>

              <div className="mt-8 bg-slate-900 text-white p-5 rounded-2xl flex gap-4 items-center border border-slate-800 shadow-[0_4px_15px_rgba(15,23,42,0.3)]">
                <Info size={24} className="shrink-0 text-red-400" />
                <span className="text-sm font-semibold tracking-wide">
                  Review the Spectrum Mobile Multi-line pricing structure below.
                </span>
              </div>
            </div>

            {/* Mobile Pricing Table - Created from your data */}
            {/* Mobile Pricing Table - Created from your data */}
            <div className="mb-12 animate-fade-in delay-100">
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all overflow-x-auto">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6">
                  Mobile Multi-Line Pricing Structure
                </h3>

                {/* Internet & 1 Mobile Line Included */}
                <div className="mb-8">
                  <h4 className="text-xl font-batangas font-bold text-red-600 mb-4 border-b border-gray-200 pb-2">
                    Internet & 1 Mobile Line Included
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* 2 Gig */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          2 Gig
                        </div>
                        <div className="text-xs text-gray-300">2G x 1G</div>
                      </div>
                      <div className="p-3 space-y-3">
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited+
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $160
                          </div>
                          <div className="text-xs text-gray-500">
                            $150 + $10 + $0
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $100
                          </div>
                          <div className="text-xs text-gray-500">
                            $80 + $0 + $10
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gig */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Gig
                        </div>
                        <div className="text-xs text-gray-300">1G x 50</div>
                      </div>
                      <div className="p-3 space-y-3">
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited+
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $100
                          </div>
                          <div className="text-xs text-gray-500">
                            $100 + $0 + $0
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $90
                          </div>
                          <div className="text-xs text-gray-500">
                            $80 + $35 + $10
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ultra */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Ultra
                        </div>
                        <div className="text-xs text-gray-300">750 x 35</div>
                      </div>
                      <div className="p-3 space-y-3">
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited+
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $90
                          </div>
                          <div className="text-xs text-gray-500">
                            $80 + $0 + $10
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $60
                          </div>
                          <div className="text-xs text-gray-500">
                            $50 + $0 + $10
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Premier */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Premier
                        </div>
                        <div className="text-xs text-gray-300">500 x 20</div>
                      </div>
                      <div className="p-3 space-y-3">
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited+
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $60
                          </div>
                          <div className="text-xs text-gray-500">
                            $50 + $0 + $10
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <div className="font-bold text-slate-900 text-sm">
                            Unlimited
                          </div>
                          <div className="text-xl font-batangas font-bold text-slate-900">
                            $90
                          </div>
                          <div className="text-xs text-gray-500">
                            $50 + $30 + $10
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Internet & 3 Paid Mobile */}
                <div className="mb-8">
                  <h4 className="text-xl font-batangas font-bold text-red-600 mb-4 border-b border-gray-200 pb-2">
                    Internet & 3 Paid Mobile
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* 2 Gig + 3 Unlimited+ */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          2 Gig
                        </div>
                        <div className="text-xs text-gray-300">
                          3 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $185
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $150 + $35 + $0
                        </div>
                      </div>
                    </div>

                    {/* 2 Gig + 3 Unlimited */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          2 Gig
                        </div>
                        <div className="text-xs text-gray-300">3 Unlimited</div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $135
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $100 + $35 + $0
                        </div>
                      </div>
                    </div>

                    {/* Gig + 3 Unlimited+ */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Gig
                        </div>
                        <div className="text-xs text-gray-300">
                          3 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $125
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $80 + $35 + $10
                        </div>
                      </div>
                    </div>

                    {/* Gig + 3 Unlimited */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Gig
                        </div>
                        <div className="text-xs text-gray-300">3 Unlimited</div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $90
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $50 + $30 + $10
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second row for 3 Paid Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {/* Ultra + 3 Unlimited+ */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Ultra
                        </div>
                        <div className="text-xs text-gray-300">
                          3 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $205
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $100 + $35 + $0
                        </div>
                      </div>
                    </div>

                    {/* Ultra + 3 Unlimited+ (second variant) */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Ultra
                        </div>
                        <div className="text-xs text-gray-300">
                          3 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $195
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $80 + $35 + $10
                        </div>
                      </div>
                    </div>

                    {/* Premier + 3 Unlimited+ */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Premier
                        </div>
                        <div className="text-xs text-gray-300">
                          3 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $140
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $50 + $20 + $0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Internet & 4 Paid Mobile */}
                <div>
                  <h4 className="text-xl font-batangas font-bold text-red-600 mb-4 border-b border-gray-200 pb-2">
                    Internet & 4 Paid Mobile
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 2 Gig + 4 Unlimited+ */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          2 Gig
                        </div>
                        <div className="text-xs text-gray-300">
                          4 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $270
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $150 + $30 + $0 + $0
                        </div>
                      </div>
                    </div>

                    {/* Gig + 4 Unlimited+ */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Gig
                        </div>
                        <div className="text-xs text-gray-300">
                          4 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $220
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $100 + $30 + $0 + $0
                        </div>
                      </div>
                    </div>

                    {/* Ultra + 4 Unlimited+ */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 text-white p-3 text-center">
                        <div className="font-batangas font-bold text-base">
                          Ultra
                        </div>
                        <div className="text-xs text-gray-300">
                          4 Unlimited+
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-2xl font-batangas font-bold text-slate-900 text-center">
                          $210
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                          $80 + $30 + $0 + $0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-8 text-center font-medium border-t border-gray-200 pt-4">
                  *Eligible for new business customers. Auto-pay required.
                </p>
              </div>
            </div>

            {/* Quick Review Section */}
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl text-center shadow-[0_8px_30px_rgba(15,23,42,0.3)] border-t-4 border-red-600 animate-fade-in delay-200 mb-16 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
              <h3 className="text-2xl font-batangas font-bold mb-4 relative z-10 transition-colors">
                Let's do a quick review
              </h3>
              <p className="text-gray-300 mb-6 text-sm md:text-base font-medium relative z-10">
                You've now covered the key changes to pricing, bundles, and
                mobile incentives. Next, we will apply these to specific
                Business Rules.
              </p>
            </div>

            {/* Show What You Know! Quiz */}
            <div className="animate-fade-in delay-200 pt-12 border-t border-gray-200 mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-4">
                  Show What You Know!
                </h2>
                <p className="text-gray-600 font-medium text-lg">
                  Check your knowledge by answering these quick questions.
                </p>
              </div>

              {/* Quiz 1: Activation */}
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
                  A customer purchases Internet Ultra and a Paid Unlimited+
                  Mobile line, but they forget to activate their Mobile line
                  within the 30-day window. What happens to their Price
                  Guarantee and $15 bundle pricing?
                </h3>

                <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                  {quiz1Data.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleQuiz1OptionClick(option.id)}
                      className={`
                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                        ${
                          quiz1Option === option.id
                            ? quiz1Submitted && isQuiz1Correct
                              ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                              : quiz1Submitted && !isQuiz1Correct
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
                            quiz1Option === option.id
                              ? quiz1Submitted && isQuiz1Correct
                                ? "bg-green-500 border-green-500"
                                : quiz1Submitted && !isQuiz1Correct
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
                            If the customer doesn't activate their Mobile line
                            within the 30-day window, the customer is at risk of
                            losing their Price Guarantee and bundle discount. Be
                            sure to discuss the{" "}
                            <span className="font-bold text-red-600">
                              importance of Mobile activation
                            </span>{" "}
                            with your customers so they can maintain the great
                            value and discounted rates.
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

              {/* Quiz 2: Existing Customer - Shown after Quiz 1 is Correct */}
              {isQuiz1Correct && (
                <div
                  ref={quiz2SectionRef}
                  className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow"
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
                    You sold Internet and 3 Unlimited/Unlimited+ Mobile lines to
                    a customer a few months ago. They hear about our new Mobile
                    Multi-line discount through an advertisement and ask you if
                    they can qualify to lower their monthly rate. What do you
                    tell them?
                  </h3>

                  <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                    {quiz2Data.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleQuiz2OptionClick(option.id)}
                        className={`
                          flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                          ${
                            quiz2Option === option.id
                              ? quiz2Submitted && isQuiz2Correct
                                ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                : quiz2Submitted && !isQuiz2Correct
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
                              quiz2Option === option.id
                                ? quiz2Submitted && isQuiz2Correct
                                  ? "bg-green-500 border-green-500"
                                  : quiz2Submitted && !isQuiz2Correct
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
                              Existing customers are eligible for Mobile
                              Multi-line discounts if they add a new
                              Unlimited/Unlimited+ line to their account.
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
            </div>
          </div>
        </div>

        {/* Footer / Continue Bar - Only Show if Quiz 2 Passed AND Bottom Reached */}
        {isQuiz2Correct && isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
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

export default SpectrumMoDiscount;
