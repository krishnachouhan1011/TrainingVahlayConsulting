import React, { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ðŸ'‡ 1. FIXED IMPORT (Matches the file created previously)
import Sidebar2, { markLessonComplete } from "./Sidebar2";

const ShowWhatYouKnow = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // Array to handle multiple select
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  // ==========================================
  // QUIZ DATA (All 7 Questions)
  // ==========================================
  const questions = [
    {
      id: 1,
      type: "single",
      question:
        "Can a customer create a bundle with a 2-Year Price Guarantee with Internet Premier and One Mobile Line included?",
      options: [
        {
          id: 0,
          text: "No. The One Mobile Line included does not qualify as an eligible Line of Business for bundled Price Guarantees.",
        },
        {
          id: 1,
          text: "No. The customer must bundle the One Mobile Line included with Spectrum Business Internet Ultra or higher to get a Price Guarantee.",
        },
        {
          id: 2,
          text: "Yes. The customer can bundle Internet Premier with One Mobile Line included to get a 2-Year Price Guarantee.",
        },
      ],
      correctId: [0],
      feedback:
        "That is not right. The One Mobile Line included does not qualify as an eligible Line of Business for bundled Price Guarantees.",
      correctFeedback:
        "Correct! The One Mobile Line included does not qualify as an eligible Line of Business for bundled Price Guarantees.",
    },
    {
      id: 2,
      type: "multiple",
      question:
        "Which of the following actions can cause a customer to lose their Price Guarantee? (Select all that apply)",
      options: [
        { id: 0, text: "Removing 1 of 2 paid Voice lines" },
        {
          id: 1,
          text: "Downgrading Internet service from Ultra, Gig, or 2 Gig to Premier",
        },
        {
          id: 2,
          text: "Taking advantage of the One Mobile Line included Offer",
        },
        { id: 3, text: "Removing a bundled service" },
      ],
      // ðŸ'‡ CORRECTED BASED ON IMAGE
      correctId: [1, 3],
      feedback:
        "That's incorrect. A customer must maintain all services and not downgrade their Internet to retain their Internet discount and Price Guarantee.",
      correctFeedback:
        "Correct! A customer must maintain all services and not downgrade their Internet to retain their Internet discount and Price Guarantee.",
    },
    {
      id: 3,
      type: "multiple",
      question:
        "In addition to the Price Guarantee of up to 3 years, what are some other benefits we are introducing with the updated Pricing and Packaging that may appeal to new customers? (Select all that apply)",
      options: [
        { id: 0, text: "Multi-line discounts with SMB Mobile" },
        { id: 1, text: "Higher-speed Internet Tiers" },
        { id: 2, text: "WiFi included free with Gig" },
        { id: 3, text: "Too many choices can confuse customers" },
      ],
      correctId: [0, 1, 2],
      feedback:
        "That's not right. Some additional benefits we're offering to new customers include speed lifts for our Internet, WiFi included free with Gig and 2 Gig, and Multi-line discounts with SMB Mobile.",
      correctFeedback:
        "Correct! These are excellent additional benefits to highlight to new customers.",
    },
    {
      id: 4,
      type: "single",
      question:
        "A customer purchases Internet Premier and One Mobile Line included. But they forget to activate their Mobile line within the 30-day window. Their Internet will still reflect the $15 discount after the first month.",
      options: [
        { id: 0, text: "True" },
        { id: 1, text: "False" },
      ],
      correctId: [1], // False
      feedback:
        "That's not right. Customers must activate their Mobile device within 30-days if they want to maintain the $15 discount on their Internet.",
      correctFeedback:
        "Correct! Customers must activate their Mobile device within 30-days if they want to maintain the $15 discount on their Internet.",
    },
    {
      id: 5,
      type: "multiple",
      question:
        "What are the three principles of the updated Spectrum Business Pricing and Packaging to follow? (Select all that apply)",
      options: [
        {
          id: 0,
          text: "Always sell the most expensive bundle no matter what.",
        },
        {
          id: 1,
          text: "Sell the 3-Year Price Guarantee bundles whenever possible.",
        },
        {
          id: 2,
          text: "Use Top-Down selling while highlighting the value of our products and services.",
        },
        {
          id: 3,
          text: "Always pitch based on what you learned during Conversational Discovery questions.",
        },
      ],
      correctId: [1, 2, 3],
      feedback:
        "That's not right. The three principles you want to follow are: Always pitch based on what you learned during Conversational Discovery questions, Sell the 3-Year Price Guarantee bundles whenever possible, and Use Top-Down selling while highlighting the value of our products and services.",
      correctFeedback: "Correct! Those are the three principles.",
    },
    {
      id: 6,
      type: "single",
      question:
        "You're talking to a nail salon that needs Internet to take payment, video to entertain their customers, and some type of phone service so they can make appointments. What is your lead offer for this customer?",
      options: [
        { id: 0, text: "A Double-Play with Gig and TV Stream." },
        {
          id: 1,
          text: "A Triple-Play with Ultra, WiFi, Business TV, 1 Business Voice line.",
        },
        {
          id: 2,
          text: "A Triple-Play with Gig and Free WiFi, Business TV, 1 Business Voice line, and 1 paid Unlimited+ Mobile line.",
        },
        { id: 3, text: "A Double-Play with Ultra and Business TV." },
      ],
      correctId: [2],
      feedback:
        "Sorry, that's not right. Your lead offer should be a Triple-Play with Gig and Free WiFi, Business TV, 1 Business Voice line, and 1 paid Unlimited+ Mobile line.",
      correctFeedback:
        "Correct! That is the perfect lead offer for this customer.",
    },
    {
      id: 7,
      type: "single",
      question:
        "The nail salon owner feels Gig is too much speed for them. What is your next offer?",
      options: [
        {
          id: 0,
          text: "A Triple-Play with Ultra, Business TV, 1 Business Voice line, and 1 paid Unlimited Mobile line.",
        },
        { id: 1, text: "A Double-Play with Gig and TV Stream." },
        {
          id: 2,
          text: "A Triple-Play with Premier, TV Stream, and 1 Mobile line included.",
        },
        { id: 3, text: "A Double-Play with Ultra and Business TV." },
      ],
      correctId: [0],
      feedback:
        "That's not right. Your fallback offer should be a Triple-Play with Ultra, Business TV, 1 Business Voice line, and 1 paid Unlimited Mobile line.",
      correctFeedback: "Correct! That is the appropriate fallback offer.",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Passing Criteria: Must score >= 80%
  const passingThreshold = 0.8;
  const isPassed = score / questions.length >= passingThreshold;

  // Handlers
  const handleOptionSelect = (id) => {
    if (isSubmitted) return;

    if (currentQuestion.type === "single") {
      setSelectedOptions([id]);
    } else {
      setSelectedOptions((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        } else {
          return [...prev, id];
        }
      });
    }
  };

  const isAnswerCorrect = () => {
    if (selectedOptions.length !== currentQuestion.correctId.length)
      return false;
    return currentQuestion.correctId.every((id) =>
      selectedOptions.includes(id),
    );
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isAnswerCorrect()) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
      // Mark lesson complete only if they actually pass (score is fully updated by now)
      if (score / questions.length >= passingThreshold) {
        markLessonComplete(8); // Assuming Lesson 8 for the final quiz
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptions([]);
      setIsSubmitted(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  const handleExit = () => {
    navigate("/");
  };

  const handleFinish = () => {
    navigate("/summary"); // Navigate to main menu or summary page upon finishing course
  };

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
              Quiz / Show What You Know
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
        <div className="flex-1 overflow-y-auto relative scroll-smooth flex flex-col custom-scrollbar bg-gray-50">
          <div className="max-w-4xl mx-auto w-full p-6 lg:p-12 flex-1 flex flex-col">
            {/* Title Section */}
            <div className="mb-8 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 8
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Show What You Know
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* QUIZ CONTAINER */}
            {showResults ? (
              // --- RESULTS VIEW ---
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-10 md:p-16 text-center shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow animate-fade-in flex-1 flex flex-col justify-center items-center">
                <div className="mb-8">
                  {isPassed ? (
                    <div className="bg-green-50 text-green-500 border border-green-100 p-6 rounded-full inline-block shadow-[0_4px_15px_rgba(34,197,94,0.15)] animate-bounce-short">
                      <CheckCircle size={80} strokeWidth={1.5} />
                    </div>
                  ) : (
                    <div className="bg-red-50 text-red-500 border border-red-100 p-6 rounded-full inline-block shadow-[0_4px_15px_rgba(239,68,68,0.15)]">
                      <AlertCircle size={80} strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                <h2 className="text-3xl md:text-4xl font-batangas font-bold text-slate-900 mb-4">
                  {isPassed ? "Congratulations!" : "Keep Trying!"}
                </h2>
                <p className="text-gray-600 mb-4 text-lg md:text-xl font-medium">
                  You scored{" "}
                  <span
                    className={`font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}
                  >
                    {score}
                  </span>{" "}
                  out of{" "}
                  <span className="font-bold text-slate-900">
                    {questions.length}
                  </span>
                </p>

                {/* Strict Messaging for Failing */}
                {!isPassed && (
                  <p className="text-red-600 font-medium mb-10 text-base md:text-lg bg-red-50 py-4 px-8 rounded-2xl border border-red-100 max-w-xl mx-auto shadow-sm">
                    You must score at least 80% to pass and continue to the next
                    section. Please try again.
                  </p>
                )}

                {/* Inline Actions */}
                <div className="flex gap-4 justify-center mt-6">
                  {!isPassed && (
                    <button
                      onClick={handleRetry}
                      className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-red-600 text-white hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all shadow-md cursor-pointer uppercase tracking-widest text-sm"
                    >
                      <RotateCcw size={18} /> Retry Quiz
                    </button>
                  )}
                  {isPassed && (
                    <div className="text-green-700 font-medium flex items-center justify-center gap-3 bg-green-50 border border-green-200 px-6 py-4 rounded-2xl shadow-sm">
                      <CheckCircle size={24} className="shrink-0" />
                      <span>
                        Quiz Completed! Click{" "}
                        <strong className="font-bold">Continue</strong> below.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // --- QUESTION VIEW ---
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm flex-1 flex flex-col animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                {/* Progress */}
                <div className="flex justify-between items-center mb-6 text-xs font-semibold text-gray-500 uppercase tracking-widest font-poppins">
                  <span>
                    Question {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <span className="text-slate-900">
                    {Math.round(
                      (currentQuestionIndex / questions.length) * 100,
                    )}
                    % Completed
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mb-10 overflow-hidden">
                  <div
                    className="bg-red-600 h-full transition-all duration-700 shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>

                {/* Question */}
                <h2 className="text-xl md:text-2xl font-batangas font-bold text-slate-900 mb-8 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-4 mb-10">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOptions.includes(option.id);
                    const isCorrectAnswer = currentQuestion.correctId.includes(
                      option.id,
                    );
                    const isMulti = currentQuestion.type === "multiple";

                    // Styling Logic
                    let wrapperClasses =
                      "border-gray-200 hover:border-red-200 hover:bg-gray-50";
                    let indicatorClasses = "border-gray-300 bg-white";
                    let textClasses = "text-gray-600 font-medium";
                    let icon = null;

                    if (isSelected) {
                      wrapperClasses =
                        "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]";
                      indicatorClasses = "border-red-600 bg-red-600";
                      textClasses = "text-slate-900 font-bold";
                      icon = isMulti ? (
                        <Check
                          size={16}
                          className="text-white"
                          strokeWidth={3}
                        />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      );
                    }

                    if (isSubmitted) {
                      if (isCorrectAnswer) {
                        // Highlight correct answers in green
                        wrapperClasses =
                          "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]";
                        indicatorClasses = "border-green-500 bg-green-500";
                        textClasses = "text-slate-900 font-bold";
                        icon = (
                          <Check
                            size={16}
                            className="text-white"
                            strokeWidth={3}
                          />
                        );
                      } else if (isSelected && !isCorrectAnswer) {
                        // Highlight incorrect selected answers in red
                        wrapperClasses =
                          "border-red-500 bg-red-50 shadow-[0_4px_15px_rgba(239,68,68,0.15)]";
                        indicatorClasses = "border-red-500 bg-red-500";
                        textClasses = "text-slate-900 font-bold";
                        icon = (
                          <X size={16} className="text-white" strokeWidth={3} />
                        );
                      } else {
                        // Fade out unselected incorrect answers
                        wrapperClasses =
                          "border-gray-200 opacity-50 cursor-default";
                      }
                    }

                    return (
                      <div
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${wrapperClasses} ${isSubmitted ? "cursor-default" : ""}`}
                      >
                        <div
                          className={`w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 transition-colors border-2 ${isMulti ? "rounded-md" : "rounded-full"} ${indicatorClasses}`}
                        >
                          {icon}
                        </div>
                        <p
                          className={`text-sm md:text-[15px] leading-relaxed ${textClasses}`}
                        >
                          {option.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Feedback Area */}
                {isSubmitted && (
                  <div
                    className={`mt-2 p-5 rounded-2xl flex items-start gap-3 animate-fade-in mb-8 shadow-sm ${isAnswerCorrect() ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                  >
                    {isAnswerCorrect() ? (
                      <>
                        <CheckCircle
                          size={24}
                          className="shrink-0 mt-0.5 text-green-600"
                        />
                        <div>
                          <span className="font-bold block mb-1">Correct!</span>
                          <span className="text-sm font-medium">
                            {currentQuestion.correctFeedback}
                          </span>
                        </div>
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
                          <span className="text-sm font-medium">
                            {currentQuestion.feedback}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-auto flex justify-end">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={selectedOptions.length === 0}
                      className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${selectedOptions.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 text-white cursor-pointer"}`}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="bg-red-600 hover:bg-slate-900 text-white px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 cursor-pointer uppercase tracking-widest text-sm"
                    >
                      {isLastQuestion ? "View Results" : "Next Question"}
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ðŸ'‡ 2. FLOATING CONTINUE BUTTON (Appears strictly ONLY when quiz passed) */}
        {showResults && isPassed && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleFinish}
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
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes bounce-short {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15%);
          }
        }
        .animate-bounce-short {
          animation: bounce-short 0.8s ease-in-out 1;
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

export default ShowWhatYouKnow;
