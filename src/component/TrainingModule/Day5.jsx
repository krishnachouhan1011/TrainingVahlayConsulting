/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  Mic,
  Gauge,
  Smile,
  ShieldAlert,
  PhoneCall,
  UserCheck,
  XCircle,
  CheckCircle2,
  Volume2,
  ThumbsDown,
  PlayCircle,
  Check,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar5, { markLessonComplete } from "./Sidebar5";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Day5 = () => {
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
    markLessonComplete(5);
    navigate("/day6");
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
              Part 2: Advanced Techniques / Day 5
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
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Advanced Techniques
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Communication & Accent
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed max-w-3xl">
                How you speak matters as much as what you speak. Good
                communication builds trust and increases conversions. You are
                not expected to sound American. You are expected to sound{" "}
                <strong className="text-red-600 font-bold">
                  clear, calm, polite, and professional.
                </strong>
              </p>
            </div>

            {/* 1. US Accent Clarity */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Mic size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  1. US Accent Clarity
                </h2>
              </div>

              <div className="bg-red-50/80 border border-red-100 p-4 sm:p-5 rounded-xl mb-8">
                <p className="font-semibold text-slate-900 text-base sm:text-lg text-center">
                  👉 You do{" "}
                  <span className="text-red-600 underline font-bold">NOT</span>{" "}
                  need a fake US accent.
                </p>
                <p className="font-semibold text-slate-900 text-lg text-center mt-2">
                  👉 You need clarity, neutral pronunciation, and confidence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">
                    What US Customers Expect
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Clear words",
                      "Easy-to-understand sentences",
                      "Calm voice",
                      "No rushing",
                      "Polite tone",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-700 font-medium"
                      >
                        <CheckCircle2 size={18} className="text-emerald-500" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">
                    What to Avoid
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Overacting an accent",
                      "Speaking too fast",
                      "Mixing local slang",
                      "Mumbling or low volume",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-700 font-medium"
                      >
                        <XCircle size={18} className="text-rose-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-batangas font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Volume2 size={20} className="text-red-600" /> Accent Clarity
                  Tips
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 font-medium mb-6">
                  <li>Open your mouth properly while speaking</li>
                  <li>Pronounce full words (not half words)</li>
                  <li>Avoid dragging or swallowing words</li>
                  <li>Pause between sentences</li>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-rose-100 shadow-sm">
                    <p className="text-xs font-bold text-rose-600 uppercase mb-1">
                      ❌ Bad Example
                    </p>
                    <p className="text-gray-500 italic line-through font-medium">
                      "Hi'mcallinfromvahlayconsulting"
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">
                      ✅ Good Example
                    </p>
                    <p className="text-slate-900 font-semibold">
                      "Hi, this is John calling from Vahlay Consulting."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Pace, Tone & Politeness */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-8">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  2. Pace, Tone & Politeness
                </h2>
              </div>

              <div className="space-y-10">
                {/* Pace */}
                <div>
                  <h3 className="text-base sm:text-lg font-batangas font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Gauge size={18} className="sm:w-5 sm:h-5 text-red-600" />{" "}
                    2.1 Pace (Speed of Speaking)
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                    <div className="flex-1 bg-rose-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-rose-100 text-center">
                      <p className="font-bold text-rose-700 text-sm">
                        Too fast
                      </p>
                      <p className="text-xs sm:text-sm text-rose-600 font-medium">
                        Customer gets confused
                      </p>
                    </div>
                    <div className="flex-1 bg-amber-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-amber-100 text-center">
                      <p className="font-bold text-amber-700 text-sm">
                        Too slow
                      </p>
                      <p className="text-xs sm:text-sm text-amber-600 font-medium">
                        Customer loses interest
                      </p>
                    </div>
                    <div className="flex-1 bg-emerald-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-emerald-100 text-center">
                      <p className="font-bold text-emerald-700 text-sm">
                        Correct Pace
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-600 font-medium">
                        Calm, confident flow
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 inline-block">
                    👉 Practice Rule: Speak at 70-75% of your normal speed.
                  </p>
                </div>

                {/* Tone */}
                <div>
                  <h3 className="text-base sm:text-lg font-batangas font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Smile size={18} className="sm:w-5 sm:h-5 text-red-600" />{" "}
                    2.2 Tone (How You Sound)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 font-medium">
                    Your tone should always be:{" "}
                    <strong className="text-slate-900">
                      Friendly, Respectful, Calm, Helpful.
                    </strong>{" "}
                    Even if the customer is rude, your tone must stay polite.
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 bg-red-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-100">
                    Golden Rule: Customers may forget your words, but they
                    remember your tone.
                  </p>
                </div>

                {/* Politeness */}
                <div>
                  <h3 className="text-base sm:text-lg font-batangas font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <UserCheck
                      size={18}
                      className="sm:w-5 sm:h-5 text-red-600"
                    />{" "}
                    2.3 Politeness (Mandatory)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gray-50 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
                      <p className="font-bold text-emerald-600 mb-2 text-sm">
                        Always use:
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700 font-medium">
                        "Please", "Thank you", "I understand", "No problem at
                        all"
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
                      <p className="font-bold text-rose-600 mb-2 text-sm">
                        Avoid:
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700 font-medium">
                        "Listen", "Actually" (in a correcting way), "You are
                        wrong"
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 bg-emerald-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-emerald-100">
                    <p className="text-xs sm:text-sm font-bold text-emerald-800 mb-1">
                      Correct Example:
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                      "I understand your concern, and I appreciate you sharing
                      that."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Handling Tough Customers */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <ShieldAlert size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  3. Handling Tough Customers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-8 font-medium">
                Tough customers are{" "}
                <strong className="text-slate-900">
                  normal, not personal.
                </strong>
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <h4 className="font-batangas font-bold text-slate-900 text-base sm:text-lg mb-2">
                    3.1 Angry Customer
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 mt-4">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-bold text-rose-600 mb-1">
                        ❌ Never Do This:
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        Arguing, raising voice, defending aggressively.
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-bold text-emerald-600 mb-1">
                        ✅ Correct Approach:
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        Let them speak, acknowledge, calm response.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs sm:text-sm text-slate-800 font-semibold italic">
                      "I understand why you're upset. Let me see how I can
                      help."
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <h4 className="font-batangas font-bold text-slate-900 text-base sm:text-lg mb-2">
                    3.2 Impatient Customer
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 font-medium">
                    <strong className="text-slate-900">Customer:</strong> "I
                    only have one minute."
                  </p>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs sm:text-sm text-slate-800 font-semibold italic">
                      <strong className="text-emerald-600 not-italic">
                        Response:
                      </strong>{" "}
                      "I appreciate that. I'll be brief and to the point."
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <h4 className="font-batangas font-bold text-slate-900 text-base sm:text-lg mb-2">
                    3.3 Distrustful Customer
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 font-medium">
                    <strong className="text-slate-900">Customer:</strong> "I
                    don't trust sales calls."
                  </p>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs sm:text-sm text-slate-800 font-semibold italic">
                      <strong className="text-emerald-600 not-italic">
                        Response:
                      </strong>{" "}
                      "I understand completely. My role is only to share
                      information — you're free to decide."
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-slate-900 p-4 sm:p-6 rounded-lg sm:rounded-xl flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center justify-center text-white shadow-md">
                <span className="font-bold uppercase tracking-widest text-red-400 text-xs font-poppins">
                  Key Rules:
                </span>
                <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                  <XCircle size={14} className="sm:w-4 sm:h-4 text-rose-500" />{" "}
                  Don't argue/interrupt
                </span>
                <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                  <CheckCircle2
                    size={14}
                    className="sm:w-4 sm:h-4 text-emerald-500"
                  />{" "}
                  Stay calm & polite
                </span>
                <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                  <CheckCircle2
                    size={14}
                    className="sm:w-4 sm:h-4 text-emerald-500"
                  />{" "}
                  Control your tone
                </span>
              </div>
            </div>

            {/* 4. Mock Calls */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <PhoneCall size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  4. Mock Calls with the Trainer
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 font-medium">
                Mock calls are{" "}
                <strong className="text-slate-900">
                  practice calls, not tests to fail you.
                </strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm sm:text-base">
                    Purpose of Mock Calls
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                    <li>Improve confidence</li>
                    <li>Correct mistakes early</li>
                    <li>Improve clarity</li>
                    <li>Prepare you for live calls</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm sm:text-base">
                    Important Mindset
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                    <li>Mistakes are allowed</li>
                    <li>Silence is okay</li>
                    <li>Learning is the goal</li>
                    <li>Confidence improves with practice</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg sm:rounded-xl text-center">
                <p className="font-semibold text-red-900 text-xs sm:text-sm">
                  👉 Mock calls are safe practice, not judgment.
                </p>
              </div>
            </div>

            {/* 5. Mistakes & 6. Practice */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <ThumbsDown
                    size={20}
                    className="sm:w-6 sm:h-6 text-rose-600"
                  />{" "}
                  5. Mistakes to Avoid
                </h3>
                <ul className="space-y-3">
                  {[
                    "Speaking too fast",
                    "Talking without listening",
                    "Sounding bored or robotic",
                    "Cutting the customer off",
                    "Using negative words",
                    "Arguing or defending",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 font-medium"
                    >
                      <XCircle
                        size={16}
                        className="text-rose-500 shrink-0 mt-0.5"
                      />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <PlayCircle
                    size={20}
                    className="sm:w-6 sm:h-6 text-red-600"
                  />{" "}
                  6. Daily Practice
                </h3>
                <ul className="space-y-3">
                  {[
                    "Read scripts aloud",
                    "Record your voice and listen",
                    "Practice slow speaking",
                    "Focus on pronunciation",
                    "Accept trainer feedback positively",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 font-medium"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-red-600 shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Day 5 Training Video */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-8 sm:mb-10 animate-fade-in hover:shadow-md transition-shadow">
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
                      How to deal with Already Cx-Traning
                    </h2>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-6 leading-relaxed">
                Watch the complete recorded session for Day 5 communication training and walkthrough.
              </p>

              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl aspect-video w-full">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-contain"
                  src="https://firebasestorage.googleapis.com/v0/b/vahlay1.appspot.com/o/training_videos%2FDay%203.mp4?alt=media&token=3498e8fc-f099-45ad-abf0-28c3bcaf7e24"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Closing */}
            <div
              className="bg-slate-900 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-xl relative overflow-hidden animate-fade-in group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>

              <h2 className="text-xl sm:text-2xl font-batangas font-bold mb-6 relative z-10 transition-colors">
                Day 5 Closing Guidance
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed font-medium relative z-10">
                Good communication is a{" "}
                <strong className="text-white">skill, not talent.</strong>{" "}
                Anyone can improve with practice and patience. You don't need
                perfection. You need{" "}
                <span className="text-red-400 font-bold">
                  clarity, politeness, and consistency.
                </span>
              </p>
              <div className="bg-white/10 border border-white/20 p-4 sm:p-5 rounded-lg sm:rounded-xl inline-block relative z-10 backdrop-blur-sm">
                <p className="font-semibold text-white text-xs sm:text-sm">
                  If customers understand you and feel respected, half the job
                  is already done.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="fixed sm:absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-2 sm:gap-3 bg-red-600 text-white px-4 sm:px-6 py-3 sm:py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-xs sm:text-sm whitespace-nowrap"
            >
              <ArrowRight
                size={16}
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

export default memo(Day5);
