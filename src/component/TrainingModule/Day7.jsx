/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Headphones,
  Users,
  MessageSquare,
  ShieldAlert,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Ear,
  BrainCircuit,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar5, { markLessonComplete } from "./Sidebar5"; // Adjust path if needed
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Day7 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContinue = () => {
    // Mark Lesson 7 as complete
    markLessonComplete(7);
    // Navigate to Day 8
    navigate("/day8");
  };

  const handleExit = () => navigate("/");

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      <Sidebar5
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

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
              Part 2: Advanced Techniques / Day 7
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 pb-28 lg:pb-32">
            {/* Title Section */}
            <div className="mb-8 sm:mb-12 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-2 sm:mb-3">
                Real-World Preparation
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Live Call Observation
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed max-w-3xl">
                Day 7 is about{" "}
                <strong className="text-red-600">
                  learning from real situations, not theory.
                </strong>{" "}
                Before you start handling live customers on your own, it is
                important to observe how experienced agents actually speak,
                listen, and respond in real conversations.
              </p>
            </div>

            {/* Intro Banner */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-100 shadow-sm mb-10 animate-fade-in flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="bg-red-50 text-red-600 border border-red-100 p-3 sm:p-4 rounded-full shrink-0">
                <BrainCircuit size={20} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <p className="text-slate-900 font-batangas font-bold text-base md:text-lg mb-2">
                  This day helps bridge the gap between:
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-colors">
                    Training knowledge
                  </span>
                  <span className="bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-colors">
                    Real customer behavior
                  </span>
                  <span className="bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-colors">
                    Practical sales execution
                  </span>
                </div>
              </div>
            </div>

            {/* 1. Listening to Senior Agents */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl">
                  <Headphones size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                  1. Listening to Senior Agents' Real Calls
                </h2>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-8 font-medium">
                On Day 7, trainees will listen to live or recorded calls handled
                by senior agents. This is not passive listening — it is{" "}
                <strong className="text-slate-900">active learning.</strong>
              </p>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div className="bg-gray-50 p-5 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200">
                  <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-200 pb-2 text-sm md:text-base">
                    Purpose of Listening
                  </h4>
                  <ul className="space-y-3 text-gray-600 font-medium text-xs sm:text-sm">
                    {[
                      "Understand real call flow",
                      "Observe how greetings are delivered",
                      "Learn how needs are identified",
                      "Hear how objections are handled",
                      "Understand how closings happen naturally",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200">
                  <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-200 pb-2 text-sm md:text-base">
                    What Trainees Should Listen For
                  </h4>
                  <ul className="space-y-3 text-gray-600 font-medium text-xs sm:text-sm">
                    {[
                      "Opening greeting and confidence",
                      "Tone and pace of speaking",
                      "Type of questions asked",
                      "How the agent listens and responds",
                      "How objections are handled calmly",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <Ear
                          size={16}
                          className="text-red-600 shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 p-4 rounded-lg sm:rounded-xl text-center shadow-sm">
                <p className="font-semibold text-red-900 text-sm md:text-base">
                  Do not focus only on results. Focus on the process.
                </p>
              </div>
            </div>

            {/* 2. Understanding Real Customers */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Users size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                  2. Understanding Real Customer Situations
                </h2>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-6 font-medium">
                Real customers behave very differently from practice scenarios.
                This is normal.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
                {[
                  "Some are polite",
                  "Some are busy",
                  "Some are confused",
                  "Some ask unexpected questions",
                  "Some sound uninterested",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-50 text-slate-700 font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-gray-200 hover:border-red-200 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-emerald-50 border border-emerald-100 p-5 sm:p-6 rounded-lg sm:rounded-xl">
                  <h4 className="font-batangas font-bold text-emerald-900 mb-3 flex items-center gap-2 text-sm md:text-base">
                    <Target size={18} className="text-emerald-600" /> Key
                    Learnings
                  </h4>
                  <ul className="space-y-2 text-emerald-800 font-medium text-xs sm:text-sm">
                    <li>Not every call leads to a sale</li>
                    <li>Not every "no" is rejection</li>
                    <li>Patience and clarity matter</li>
                    <li>Listening {">"} Talking</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 p-5 sm:p-6 rounded-lg sm:rounded-xl flex flex-col justify-center">
                  <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                    By observing real calls, trainees understand:
                  </h4>
                  <ul className="space-y-2 text-slate-900 font-medium text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" /> How to
                      stay calm
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" /> How to
                      adapt communication
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" /> How to
                      respond professionally
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Practicing Pitch & Improvements */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <MessageSquare size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                  3. Practicing Pitch & Improvements
                </h2>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-8 font-medium">
                After observing calls, trainees will discuss what they heard,
                identify what worked well, and identify what could be improved.
              </p>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2 text-sm md:text-base">
                    Trainer-Led Discussion
                  </h4>
                  <ul className="space-y-3 text-gray-600 font-medium text-xs sm:text-sm">
                    <li>The trainer will pause the call (if recorded)</li>
                    <li>Explain why the agent said something</li>
                    <li>Clarify decision-making</li>
                    <li>Answer trainee questions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2 text-sm md:text-base">
                    Practice Session
                  </h4>
                  <ul className="space-y-3 text-gray-600 font-medium text-xs sm:text-sm">
                    <li>Repeat the pitch in their own words</li>
                    <li>Practice handling a similar situation</li>
                    <li>Try different responses to objections</li>
                  </ul>
                  <p className="mt-4 text-xs sm:text-sm font-semibold text-red-800 bg-red-50 p-3 rounded-lg border border-red-100 inline-block">
                    Mistakes are allowed. Learning is the goal.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 & 5. Expectations & Rules */}
            <div
              className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <h3 className="text-lg md:text-xl font-batangas font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldAlert className="text-amber-500" size={20} /> 4. What
                  Trainees Are NOT Expected to Do
                </h3>
                <ul className="space-y-3 text-gray-600 font-medium mb-6 text-xs sm:text-sm">
                  <li className="flex items-center gap-2 sm:gap-3">
                    <XCircle size={16} className="text-rose-500 shrink-0" /> You
                    are not expected to close sales
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <XCircle size={16} className="text-rose-500 shrink-0" /> You
                    are not judged on performance
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <XCircle size={16} className="text-rose-500 shrink-0" /> You
                    are not compared with seniors
                  </li>
                </ul>
                <div className="bg-gray-50 p-4 rounded-lg sm:rounded-xl border border-gray-200 text-center mt-auto">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    This day is strictly for learning and preparation.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <h3 className="text-lg md:text-xl font-batangas font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <AlertCircle className="text-red-600" size={20} /> 5.
                  Observation Discipline Rules
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-widest mb-4">
                  While observing calls:
                </p>
                <ul className="space-y-3 text-gray-600 font-medium text-xs sm:text-sm">
                  {[
                    "Stay silent and attentive",
                    "Do not interrupt the senior agent",
                    "Take notes if needed",
                    "Ask questions after the call",
                    "Maintain professionalism",
                  ].map((rule, idx) => (
                    <li key={idx} className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-red-600 shrink-0"
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Mistakes */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-rose-200 transition-all group"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <XCircle size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                  6. Common Mistakes to Avoid
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                {[
                  "Judging the agent",
                  "Assuming every call is perfect",
                  "Copying tone without understanding context",
                  "Getting nervous by listening to seniors",
                  "Overthinking mistakes",
                ].map((mistake, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-gray-200 flex items-center gap-2 sm:gap-3 text-gray-700 font-medium shadow-sm text-xs sm:text-sm hover:border-rose-200 transition-colors"
                  >
                    <span className="text-rose-500 font-bold text-lg">✗</span>{" "}
                    {mistake}
                  </div>
                ))}
              </div>
              <p className="text-center font-semibold text-rose-800 bg-rose-50 border border-rose-100 py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                Every senior agent was once a beginner.
              </p>
            </div>

            {/* 7. Why it's critical & Closing */}
            <div
              className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.3)] relative overflow-hidden animate-fade-in group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-10 relative z-10">
                <div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold mb-6 text-white flex items-center gap-2 sm:gap-3 transition-colors">
                    <Target className="text-red-500" size={20} /> 7. Why Day 7
                    Is Critical
                  </h2>
                  <p className="text-red-200 mb-4 font-semibold uppercase tracking-widest text-xs sm:text-sm font-poppins">
                    Live call observation:
                  </p>
                  <ul className="space-y-3 text-white/90 font-medium mb-6 text-xs sm:text-sm">
                    {[
                      "Builds confidence",
                      "Reduces fear of live calls",
                      "Improves listening skills",
                      "Prepares you mentally",
                      "Makes Day 8 smoother",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 inline-block text-xs sm:text-sm">
                    <p className="font-semibold italic">
                      "This is how it really works."
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0 md:pl-6 lg:pl-10">
                  <h3 className="text-base md:text-lg lg:text-xl font-batangas font-bold text-red-400 uppercase tracking-widest mb-4 sm:mb-6">
                    Day 7 Closing Guidance
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed font-medium mb-4 sm:mb-6 text-gray-300">
                    Today is about{" "}
                    <strong className="text-white">
                      learning by observing, not performing.
                    </strong>
                  </p>
                  <div className="space-y-2 text-white font-batangas font-bold text-lg md:text-xl mb-6 sm:mb-8">
                    <p>Pay attention.</p>
                    <p>Stay curious.</p>
                    <p>Ask questions.</p>
                  </div>
                  <p className="text-xs sm:text-sm text-red-200 italic font-medium">
                    Tomorrow, you will start stepping into real responsibility —
                    and Day 7 prepares you for that.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-2 sm:gap-3 bg-red-600 text-white px-4 sm:px-6 lg:px-6 py-2.5 sm:py-3 lg:py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm whitespace-nowrap"
            >
              <ArrowRight
                size={18}
                className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
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

export default memo(Day7);
