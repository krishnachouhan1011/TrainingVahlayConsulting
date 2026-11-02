import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
  Wrench,
  GraduationCap,
  Building,
  Scale,
  CalendarClock,
  Globe,
  ThumbsUp,
  ThumbsDown,
  XCircle,
  AlertCircle,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar4, { markLessonComplete } from "./Sidebar4"; // Adjust path if needed
import useScrollToBottom from "../../hooks/useScrollToBottom";

// Constants - Workplace Guidelines
const DOS_LIST = [
  "Be punctual - log in and attend training on time every day.",
  "Pay full attention during training - listen carefully, take notes, and ask questions when something is unclear.",
  "Follow instructions given by trainers, team leads, and management.",
  "Maintain professionalism in behavior, communication, and attitude.",
  "Respect your teammates and help maintain a positive learning environment.",
  "Use office systems only for work-related purposes.",
  "Maintain cleanliness and hygiene at your desk and in common areas.",
  "Communicate openly and honestly if you face any difficulty or confusion.",
  "Stay disciplined even when managers or TLs are not present.",
  "Focus on learning, not shortcuts or comparisons with others.",
];

const DONTS_LIST = [
  "Do not argue with trainers, TLs, or management.",
  "Do not use office PCs for social media, videos, or unnecessary browsing.",
  "Do not disturb others during training sessions.",
  "Do not use casual or unprofessional language.",
  "Do not ignore instructions or training guidelines.",
  "Do not misuse office resources or systems.",
  "Do not bring negative attitude or complaints without reason.",
  "Do not remain absent or take leave without approval.",
  "Do not violate company policies assuming it's just training",
  "Do not influence or distract teammates who are focused on their targets.",
];

const WelcomeAboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Scroll to top on mount and handle window resize for sidebar
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContinue = () => {
    // 1. Mark this specific lesson (ID: 1) as complete in localStorage
    markLessonComplete(1);

    // 2. Navigate to the next lesson defined in Sidebar4
    navigate("/allday-training");
  };

  const handleExit = () => {
    navigate("/");
  };

  const tools = ["Excel", "ERP", "CRM", "Teams", "Dialer Systems"];
  const evaluations = [
    "Discipline",
    "Attitude",
    "Communication Skills",
    "Learning Speed",
    "Professionalism",
    "Commitment",
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins overflow-hidden">
      {/* Sidebar */}
      <Sidebar4
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
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer "
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Getting Started / Welcome Aboard
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 rounded-full cursor-pointer hover:bg-red-50"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 1
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Welcome Aboard
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* 1. Hero / Intro Section */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Sparkles size={120} />
                </div>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-8 h-8 bg-red-50 text-red-600 flex items-center justify-center rounded-lg border border-red-100">
                    <Sparkles size={16} />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Introduction
                  </span>
                </div>
                <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-4 relative z-10">
                  Welcome to Vahlay Consulting Inc.
                </h2>
                <p className="text-gray-600 font-poppins leading-relaxed relative z-10">
                  Congratulations on beginning your journey with us. We are{" "}
                  <span className="text-red-600 font-bold mx-1 ">
                    truly excited
                  </span>{" "}
                  to have you join our team. This training book has been
                  designed to help you understand our company, our culture, our
                  expectations, and the responsibilities of your new role in a
                  clear and structured way.
                </p>
              </div>
            </div>

            {/* Split Content Sections - Re-styled to match Partner Cards */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {/* Left Column: The 8-Day Journey */}
              <div className="group relative h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 hover:border-red-200 hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.15)] hover:-translate-y-2 overflow-hidden flex flex-col">
                {/* Top Red Accent Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-red-600 rounded-b-full transition-all duration-500 group-hover:w-16 z-20" />

                {/* Decorative Background Pattern (MOVED TO TOP RIGHT) */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-50 rounded-full opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                {/* Header Row: Logo Left, Text Right */}
                <div className="flex items-center gap-5 mb-6 relative z-10">
                  {/* Logo/Icon Container */}
                  <div className="relative w-16 h-16 shrink-0">
                    <div className="absolute inset-0 bg-red-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full h-full bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:border-red-100 transition-colors duration-300">
                      <GraduationCap size={28} className="text-red-600" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h2 className="text-xl font-batangas font-bold text-slate-900 transition-colors">
                    The 8-Day Journey
                  </h2>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8 z-10">
                  Over the next <strong className="text-red-600">8 days</strong>
                  , you will undergo a complete training program that will
                  introduce you to our telecom sales process, communication
                  standards, US client interaction, and performance
                  expectations.
                </p>

                {/* Inner Box (Adjusted for white theme) */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mt-auto relative z-10">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Wrench size={14} className="text-gray-400" /> Tools You
                    Will Master
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-slate-900 text-xs font-semibold rounded-lg shadow-sm hover:border-red-200  transition-colors cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Evaluation (Converted to White/Partner Theme) */}
              <div className="group relative h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 hover:border-red-200 hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.15)] hover:-translate-y-2 overflow-hidden flex flex-col">
                {/* Top Red Accent Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-red-600 rounded-b-full transition-all duration-500 group-hover:w-16 z-20" />

                {/* Decorative Background Pattern (MOVED TO TOP RIGHT) */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gray-200 rounded-full opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                {/* Header Row: Logo Left, Text Right */}
                <div className="flex items-center gap-5 mb-6 relative z-10">
                  {/* Icon Wrapper */}
                  <div className="relative w-16 h-16 shrink-0">
                    <div className="absolute inset-0 bg-red-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full h-full bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:border-red-100 transition-colors duration-300">
                      <Target size={28} className="text-red-600" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-batangas font-bold text-slate-900 relative z-10">
                    What We Evaluate
                  </h2>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8 relative z-10">
                  This training is not only meant to teach you our process—it is
                  also meant to evaluate your core competencies and commitment
                  to building a long-term career with Vahlay Consulting.
                </p>

                {/* Inner Box (Adjusted for white theme) */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 relative z-10 mt-auto">
                  {/* Optional Heading */}
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Target size={14} className="text-gray-400" /> Key Metrics
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {evaluations.map((item, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-slate-700 text-xs font-semibold rounded-lg hover:border-red-200 hover:text-red-600 transition-colors cursor-default flex items-center gap-2 shadow-sm"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-red-500 shrink-0"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* COMPANY INTRODUCTION & POLICIES SECTION                   */}
            {/* ======================================================== */}
            <div className="pt-12 mt-12 border-t border-gray-200 mb-16">
              {/* Title Section */}
              <div className="mb-10 animate-fade-in">
                <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                  Foundation
                </span>
                <h2 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-4 leading-tight">
                  Company Introduction & Policies
                </h2>
                <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                <p className="text-base md:text-lg text-gray-600 font-medium max-w-3xl leading-relaxed">
                  Please read carefully before you start your journey. It is
                  important to understand where you are working and what kind of
                  organization you are joining.
                </p>
              </div>

              {/* 1. Understanding Vahlay Consulting */}
              <div
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                <div className="p-6 md:p-10 lg:p-12 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                      <Building size={24} />
                    </div>
                    <h3 className="text-2xl font-batangas font-bold text-slate-900">
                      Understanding Vahlay Consulting
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-base text-gray-600 mb-6 leading-relaxed">
                        <strong className="text-slate-900">
                          Welcome to Vahlay Consulting Inc.
                        </strong>{" "}
                        Before learning sales, tools, or processes, you must know
                        who we are. Founded in{" "}
                        <strong className="text-red-600">2022</strong> by Valay
                        Patel and Hansal Kava, we operate in Bharat and Canada,
                        serving primarily US and Canadian business clients.
                      </p>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        Our Domains:
                      </p>
                      <ul className="space-y-3">
                        {[
                          "US Telecom Sales (Internet, VoIP, business services)",
                          "Customer Service & After-Sales Support",
                          "HR & Recruitment Projects",
                          "Software and Website Development Sales",
                          "Digital sales initiatives like the Zenith Project",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-700 font-medium"
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
                    <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                      <p className="text-base font-bold text-slate-900 mb-6">
                        We are not a short-term or casual workplace. Vahlay
                        Consulting is built for people who want:
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          "Stable corporate experience",
                          "Skill development",
                          "Performance-based earnings",
                          "Long-term growth",
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:border-red-200 transition-colors"
                          >
                            <Target size={16} className="text-red-600" /> {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Our Culture & Work Expectations */}
              <div
                className="mb-12 animate-fade-in"
                style={{ animationDelay: "0.2s", animationFillMode: "both" }}
              >
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Briefcase size={24} className="text-red-600" /> Our Culture & Work Expectations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-100 shadow-sm border-t-4 border-t-red-600 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                    <h4 className="font-batangas font-bold text-slate-900 mb-6 text-lg">
                      We Believe:
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-600 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>Results come from consistency, not shortcuts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>Skills can be taught, but attitude cannot</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>
                          A positive environment helps people grow faster
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-100 shadow-sm border-t-4 border-t-slate-900 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                    <h4 className="font-batangas font-bold text-slate-900 mb-6 text-lg">
                      You Are Expected To:
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-600 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>Be punctual and present</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>Follow instructions from trainers & managers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>Communicate respectfully</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>Stay focused during work hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>Take responsibility for performance</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-100 shadow-sm border-t-4 border-t-red-400 flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all md:col-span-2 lg:col-span-1">
                    <h4 className="font-batangas font-bold text-slate-900 mb-6 text-lg">
                      We Provide:
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-600 font-medium mb-6 flex-1">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span>A structured work environment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span>Training and guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span>Open communication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span>A safe and professional workplace</span>
                      </li>
                    </ul>
                    <p className="text-xs font-semibold text-red-800 bg-red-50 border border-red-200 p-3 rounded-xl text-center">
                      In return, we expect seriousness toward work and learning.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 & 4. Rules & Probation / Salary Cycle */}
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-fade-in"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                {/* Rules & Probation */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-red-600">
                      <Scale size={24} />
                    </div>
                    <h3 className="text-2xl font-batangas font-bold text-slate-900">
                      Rules & Probation
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-red-800 bg-red-50 p-4 rounded-xl mb-6 border border-red-100">
                    Every new joiner starts under a{" "}
                    <strong className="text-red-700 font-bold">
                      3-month probation period
                    </strong>
                    .
                  </p>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-2">
                        Training Period
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        Includes classroom learning, system training, and call
                        observation. Days are for learning and evaluation, not
                        guaranteed confirmation. Completion requires trainer and
                        management approval.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-2">
                        Discipline
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        Arguments, misconduct, rule violations, or non-cooperation
                        are taken seriously. Ignoring instructions or disturbing
                        others is not acceptable. Probation can be extended or
                        terminated if standards are not met.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider text-center">
                      These rules exist not to control you, but to maintain
                      fairness and professionalism for everyone.
                    </p>
                  </div>
                </div>

                {/* Salary Cycle */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-red-600">
                      <CalendarClock size={24} />
                    </div>
                    <h3 className="text-2xl font-batangas font-bold text-slate-900">
                      Salary Cycle & Criteria
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Salary Cycle
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                          <span>
                            Salaries are released between the 10th and 15th of
                            every month.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                          <span>
                            Payment is for the previous month's completed and
                            approved work.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                          <span>
                            This allows proper verification of attendance,
                            performance, and compliance.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Training & Evaluation
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 font-medium">
                        Salary eligibility depends on:
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[
                          "Training completion",
                          "Attendance",
                          "Behavior & discipline",
                          "Performance readiness",
                        ].map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold uppercase tracking-widest bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-red-900 font-medium leading-relaxed bg-red-50/80 border border-red-100 p-4 rounded-xl">
                        During probation, salary may be revised based on
                        performance. Incentives are introduced after salary
                        justification and confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. US Telecom Industry */}
              <div
                className="bg-slate-900 rounded-3xl shadow-xl text-white p-8 lg:p-12 mb-12 relative overflow-hidden animate-fade-in group hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)] transition-all"
                style={{ animationDelay: "0.4s", animationFillMode: "both" }}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
                <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <Globe size={200} />
                </div>
                <div className="relative z-10 max-w-4xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm text-red-500 border border-white/10">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-batangas font-bold text-white">
                      Intro to the US Telecom Industry
                    </h3>
                  </div>

                  <p className="text-base text-gray-300 mb-6 leading-relaxed font-medium">
                    Since Vahlay Consulting works with US and Canadian clients, it
                    is important to understand the industry we serve. The US
                    telecom industry provides businesses with High-speed internet,
                    VoIP phone systems, and connectivity solutions.
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-white/20">
                    <h4 className="font-bold text-red-400 mb-4 text-base sm:text-lg">
                      Most US businesses depend heavily on:
                    </h4>
                    <ul className="space-y-3 text-sm sm:text-base text-white/90">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-red-500" />
                        Internet for daily operations
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-red-500" />
                        Phone systems for customers
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-red-500" />
                        Stable connectivity for payments, CCTV, and cloud tools
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-red-200 uppercase tracking-widest font-semibold mt-6 text-center bg-black/20 p-4 rounded-xl">
                    Today is only the foundation — technical and practical
                    learning will follow step by step.
                  </p>
                </div>
              </div>

              {/* Workplace Guidelines: DOs and DONTs */}
              <div
                className="mb-12 animate-fade-in"
                style={{ animationDelay: "0.5s", animationFillMode: "both" }}
              >
                <h3 className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900 mb-8 text-center">
                  Workplace Guidelines
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* DOs */}
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-gray-200 shadow-lg relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-emerald-200 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-4 mb-6 text-emerald-600">
                      <div className="bg-emerald-100 p-3 rounded-2xl">
                        <ThumbsUp size={28} />
                      </div>
                      <h4 className="text-2xl font-batangas font-bold text-slate-900">
                        DO's{" "}
                        <span className="text-base font-semibold text-gray-400 ml-2 font-poppins">
                          (What You Must Do)
                        </span>
                      </h4>
                    </div>
                    <ul className="space-y-4">
                      {DOS_LIST.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-700 font-medium leading-relaxed"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-emerald-500 shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DONTs */}
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-gray-200 shadow-lg relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-rose-200 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-4 mb-6 text-rose-600">
                      <div className="bg-rose-100 p-3 rounded-2xl">
                        <ThumbsDown size={28} />
                      </div>
                      <h4 className="text-2xl font-batangas font-bold text-slate-900">
                        DON'Ts{" "}
                        <span className="text-base font-semibold text-gray-400 ml-2 font-poppins">
                          (Strictly Not Allowed)
                        </span>
                      </h4>
                    </div>
                    <ul className="space-y-4">
                      {DONTS_LIST.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-700 font-medium leading-relaxed"
                        >
                          <XCircle
                            size={16}
                            className="text-rose-500 shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
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
      `}</style>
    </div>
  );
};

export default WelcomeAboard;
