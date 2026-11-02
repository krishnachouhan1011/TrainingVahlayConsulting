/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Target,
  ClipboardCheck,
  BarChart3,
  DollarSign,
  Scale,
  XCircle,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar5, { markLessonComplete } from "./Sidebar5"; // Adjust path if needed
import useScrollToBottom from "../../hooks/useScrollToBottom";
import BundlingTestComponent from "./BundlingTestComponent";

const Day6 = () => {
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
    // Mark Lesson 6 as complete
    markLessonComplete(6);
    // Navigate to Day 7
    navigate("/day7");
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
              Part 2: Advanced Techniques / Day 6
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
                Expectations & Rewards
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Targets, Discipline & Performance
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              <p className="text-base md:text-lg text-gray-600 font-medium max-w-3xl leading-relaxed">
                Day 6 is about <strong className="text-red-600">clarity</strong>
                . Many employees fail not because they lack skills, but because
                they do not clearly understand expectations.
              </p>
            </div>

            {/* 1. Monthly Performance Target */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-center animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Target size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-batangas font-bold text-slate-900">
                    1. Monthly Performance Target
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-6 font-medium">
                  At Vahlay Consulting, performance is measured primarily
                  through{" "}
                  <strong className="text-slate-900">
                    installations, not just calls.
                  </strong>
                </p>
                <div className="bg-gray-50 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 mb-6">
                  <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                    An installation is counted only when:
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        size={18}
                        className="text-red-600 shrink-0 mt-0.5"
                      />{" "}
                      The order is correctly submitted
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        size={18}
                        className="text-red-600 shrink-0 mt-0.5"
                      />{" "}
                      Service is installed successfully
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        size={18}
                        className="text-red-600 shrink-0 mt-0.5"
                      />{" "}
                      No cancellation or major error occurs
                    </li>
                  </ul>
                </div>
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg sm:rounded-xl">
                  <p className="text-xs sm:text-sm font-semibold text-rose-800">
                    Partial work or cancelled orders do not count as
                    performance.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/3 shrink-0 flex flex-col gap-6">
                <div className="bg-linear-to-br from-red-600 to-rose-700 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 text-center text-white shadow-[0_8px_30px_rgba(220,38,38,0.3)]">
                  <p className="text-red-200 font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">
                    Monthly Target
                  </p>
                  <p className="text-4xl sm:text-5xl font-batangas font-bold mb-2">
                    8-10
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-red-100">
                    Successful Installations
                    <br />
                    Per Month
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-5 sm:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <p className="font-semibold text-emerald-800 text-xs sm:text-sm mb-3 uppercase tracking-widest">
                    Why Installations Matter:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-700 font-medium">
                    <li>Reflect real business revenue</li>
                    <li>Decide commissions & incentives</li>
                    <li>Show consistency, not luck</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2 & 3. Daily Tasks & Evaluation */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {/* Daily Tasks */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <ClipboardCheck size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl font-batangas font-bold text-slate-900">
                    2. Daily Tasks & Call Expectations
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-6 font-medium">
                  Performance starts with{" "}
                  <strong className="text-slate-900">daily discipline.</strong>{" "}
                  Your Daily Responsibilities Include:
                </p>

                <div className="flex flex-wrap gap-2 mb-8 flex-1">
                  {[
                    "Logging in on time",
                    "Attending team briefings/training",
                    "Making outbound/inbound calls",
                    "Following up with customers",
                    "Updating CRM after every call",
                    "Coordinating with activation teams",
                    "Learning from feedback",
                  ].map((task, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-slate-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg"
                    >
                      {task}
                    </span>
                  ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                  <h4 className="font-batangas font-bold text-slate-900 text-center border-b border-gray-200 pb-3">
                    Call Quality {">"} Call Quantity
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2">
                      <XCircle size={16} className="text-rose-500" /> Random
                      calling without focus is discouraged
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" />
                      Understanding customer needs is required
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" /> CRM
                      updates are mandatory
                    </li>
                  </ul>
                  <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-center mt-4">
                    <p className="text-xs font-semibold text-rose-700">
                      If it's not updated in CRM, it's treated as not done.
                    </p>
                  </div>
                </div>
              </div>

              {/* Evaluation System */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <BarChart3 size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl font-batangas font-bold text-slate-900">
                    3. Performance Evaluation
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-6 font-medium">
                  Performance is evaluated{" "}
                  <strong className="text-slate-900">continuously</strong>, not
                  only at month-end.
                </p>

                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="text-xs sm:text-sm font-batangas font-bold text-slate-900 mb-3">
                      Key Evaluation Factors:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Number of successful installations",
                        "Call quality and communication",
                        "CRM and ERP accuracy",
                        "Follow-up discipline",
                        "Attendance and punctuality",
                        "Willingness to learn and improve",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-medium"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-red-600 shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                      <p className="text-[8px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
                        Evaluation Periods
                      </p>
                      <ul className="text-[10px] sm:text-xs font-semibold text-slate-900 space-y-1">
                        <li>Training period</li>
                        <li>Probation (first 3 months)</li>
                        <li>Monthly reviews</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                      <p className="text-[8px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
                        Evaluations Decide
                      </p>
                      <ul className="text-[10px] sm:text-xs font-semibold text-emerald-700 space-y-1">
                        <li>Salary confirmation</li>
                        <li>Salary revision</li>
                        <li>Incentive eligibility</li>
                        <li>Growth opportunities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Salary Structure */}
            <div
              className="bg-slate-900 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl text-white relative overflow-hidden mb-10 sm:mb-12 animate-fade-in flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10 group hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)] transition-all"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>

              <div className="w-full md:w-1/2 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/10 text-red-500 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors">
                    <DollarSign size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-batangas font-bold text-white transition-colors">
                    4. Salary Structure Explained
                  </h2>
                </div>
                <p className="text-gray-300 mb-6 font-medium text-base md:text-lg leading-relaxed">
                  Salary at Vahlay Consulting is{" "}
                  <strong className="text-white">performance-linked</strong>,
                  especially during probation.
                </p>

                <div className="bg-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 mb-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <CalendarCheck
                      className="text-red-400 shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <p className="font-bold text-white mb-1 text-sm md:text-base">
                        Salary is released between the 10th and 15th
                      </p>
                      <p className="text-xs md:text-sm text-gray-300 font-medium">
                        Payment is for the previous month's approved work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 relative z-10 space-y-3 sm:space-y-4">
                <div className="bg-black/20 border border-white/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl">
                  <h4 className="text-gray-300 font-semibold uppercase tracking-widest text-xs mb-3 font-poppins">
                    Training & Probation Salary Depend On:
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="bg-white/10 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold">
                      Performance
                    </span>
                    <span className="bg-white/10 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold">
                      Discipline
                    </span>
                    <span className="bg-white/10 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold">
                      Trainer Approval
                    </span>
                  </div>
                </div>

                <div className="bg-black/20 border border-white/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl">
                  <h4 className="text-emerald-400 font-semibold uppercase tracking-widest text-xs mb-3 font-poppins">
                    Salary Justification:
                  </h4>
                  <p className="text-xs sm:text-sm text-white/90 mb-3 font-medium">
                    Employees who meet targets justify their salary naturally.
                  </p>
                  <p className="text-xs sm:text-sm text-white/90 mb-4 font-medium">
                    Employees below performance may face: Salary revision,
                    Extended probation, or a PIP.
                  </p>
                  <div className="bg-red-600 text-white text-center py-2 rounded-lg font-bold text-xs sm:text-sm shadow-[0_4px_15px_rgba(220,38,38,0.4)]">
                    Salary grows when performance grows.
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Behavior & Discipline Scoring */}
            <div
              className="mb-12 sm:mb-16 animate-fade-in"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Scale size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-batangas font-bold text-slate-900">
                    5. Behavior & Discipline Scoring
                  </h2>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Performance alone is not enough. Behavior matters equally.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm mb-8 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                <h4 className="font-batangas font-bold text-slate-900 mb-4 text-base md:text-lg">
                  Behavior Is Observed Daily:
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    "Communication style",
                    "Respect toward trainers/teammates",
                    "Attitude during feedback",
                    "Compliance with rules",
                    "Focus during work hours",
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Positive */}
                <div className="bg-emerald-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <div className="flex items-center gap-2 sm:gap-3 mb-6 text-emerald-700">
                    <ThumbsUp size={20} className="sm:w-6 sm:h-6" />
                    <h3 className="text-lg md:text-xl font-batangas font-bold">
                      Positive Discipline
                    </h3>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      "On-time attendance",
                      "Calm communication",
                      "Acceptance of feedback",
                      "Helping teammates",
                      "Honest reporting",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-xs sm:text-sm text-emerald-900 font-semibold"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Negative */}
                <div className="bg-rose-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <div className="flex items-center gap-2 sm:gap-3 mb-6 text-rose-700">
                    <ThumbsDown size={20} className="sm:w-6 sm:h-6" />
                    <h3 className="text-lg md:text-xl font-batangas font-bold">
                      Negative Discipline
                    </h3>
                  </div>
                  <ul className="space-y-3 sm:space-y-4 flex-1">
                    {[
                      "Arguments",
                      "Ignoring instructions",
                      "Misusing office systems",
                      "Creating distractions",
                      "Unprofessional language",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-xs sm:text-sm text-rose-900 font-semibold"
                      >
                        <XCircle size={16} className="text-rose-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-rose-200">
                    <p className="text-[10px] sm:text-xs font-semibold text-rose-800 uppercase tracking-widest mb-1">
                      Repeated issues lead to:
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-rose-600">
                      Warning → Salary impact → Probation extension →
                      Termination
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Mistakes & 7. Growth */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              {/* Mistakes */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                  <div className="w-12 h-12 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl flex items-center justify-center shrink-0">
                    <AlertCircle size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl font-batangas font-bold text-slate-900">
                    6. Performance Mistakes
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-widest mb-6">
                  Avoid these at all costs:
                </p>
                <div className="space-y-2 sm:space-y-3 flex-1">
                  {[
                    "Chasing calls without follow-ups",
                    "Ignoring CRM updates",
                    "Blaming systems or leads",
                    "Arguing instead of improving",
                    "Comparing with others instead of focusing on self",
                  ].map((mistake, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 border border-gray-200 p-3 rounded-lg sm:rounded-xl flex items-start gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      <XCircle
                        size={16}
                        className="text-rose-500 shrink-0 mt-0.5"
                      />{" "}
                      {mistake}
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm flex flex-col hover:border-emerald-200 transition-colors hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)]">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl font-batangas font-bold text-slate-900">
                    7. Growth & Incentives
                  </h2>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg sm:rounded-2xl border border-gray-200 mb-6">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Employees Who:
                  </p>
                  <ul className="text-xs sm:text-sm font-bold text-slate-900 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" /> Meet
                      targets consistently
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" />
                      Maintain discipline
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-red-600" />
                      Follow systems correctly
                    </li>
                  </ul>
                </div>

                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Become Eligible For:
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      "Incentives",
                      "Higher commissions",
                      "Awards & recognition",
                      "Leadership roles",
                    ].map((reward, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold"
                      >
                        {reward}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-slate-900 text-white p-4 rounded-lg sm:rounded-xl text-center shadow-md border border-slate-800">
                  <p className="text-xs sm:text-sm font-semibold">
                    Top performers can earn significantly higher than fixed
                    salary based on incentives.
                  </p>
                </div>
              </div>
            </div>

            {/* Sales Team Training Assessment: Bundling Tests */}
            <BundlingTestComponent />

            {/* Closing */}
            <div
              className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-sm animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 text-red-600 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h2 className="text-xl md:text-2xl font-batangas font-bold text-slate-900 mb-6">
                Day 6 Closing Guidance
              </h2>

              <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 text-base md:text-lg font-medium text-gray-700 mb-8">
                <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-gray-200">
                  Targets are not pressure — they are{" "}
                  <strong className="text-red-600">direction.</strong>
                </div>
                <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-gray-200">
                  Discipline is not control — it is{" "}
                  <strong className="text-red-600">professionalism.</strong>
                </div>
              </div>

              <div className="max-w-xl mx-auto space-y-4">
                <p className="text-gray-500 font-semibold uppercase tracking-widest text-xs sm:text-sm">
                  If you:
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                  <span className="bg-white border border-gray-200 text-slate-900 font-bold px-3 sm:px-4 py-2 rounded-lg shadow-sm text-xs sm:text-sm hover:border-red-200 transition-colors">
                    Stay consistent
                  </span>
                  <span className="bg-white border border-gray-200 text-slate-900 font-bold px-3 sm:px-4 py-2 rounded-lg shadow-sm text-xs sm:text-sm hover:border-red-200 transition-colors">
                    Respect the process
                  </span>
                  <span className="bg-white border border-gray-200 text-slate-900 font-bold px-3 sm:px-4 py-2 rounded-lg shadow-sm text-xs sm:text-sm hover:border-red-200 transition-colors">
                    Improve daily
                  </span>
                </div>
                <p className="text-xl md:text-2xl font-batangas font-bold text-slate-900 mb-4">
                  You will grow at Vahlay Consulting.
                </p>
                <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-lg sm:rounded-xl inline-block shadow-[0_4px_15px_rgba(15,23,42,0.3)]">
                  <p className="font-semibold text-sm md:text-base">
                    Performance brings rewards. Discipline brings stability.
                    Together, they build success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-30 animate-fade-in">
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

export default memo(Day6);
