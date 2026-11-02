import React, { useState, useEffect, useRef, memo } from "react";
import {
  Menu,
  X,
  FileText,
  Mic,
  Monitor,
  UserCheck,
  DollarSign,
  Split,
  Lightbulb,
  Award,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Cloud,
  Database,
  Users,
  Server,
  ThumbsUp,
  ThumbsDown,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar5, { markLessonComplete } from "./Sidebar5"; // Adjust path if needed
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Day8 = () => {
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

  const handleFinish = () => {
    // Mark the final lesson as complete
    markLessonComplete(8);
    // Navigate back to the homepage/dashboard
    navigate("/");
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
            >
              {isSidebarOpen ? (
                <X size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="sm:w-6 sm:h-6" />
              )}
            </button>
            <div className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-widest hidden xs:block">
              Part 2: Advanced Techniques / Day 8
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
            <div className="mb-12 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                The Final Step
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Operation Tools & Final Assessment
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 font-medium leading-relaxed max-w-3xl mb-6">
                Day 8 is the{" "}
                <strong className="text-red-600">most important day</strong> of
                the training program. You will master our essential{" "}
                <strong className="text-slate-900">Operation Tools</strong> (OneDrive, ERP & CRM)
                and complete the final evaluation to confirm your live work readiness.
              </p>

              <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-center hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="w-12 h-12 bg-red-50 border border-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-batangas font-bold text-slate-900 mb-2 text-sm md:text-base">
                    The final assessment helps clearly understand:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-700 font-semibold">
                    <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                      What has been learned
                    </span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                      Operation tools proficiency
                    </span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                      Read readiness for live work
                    </span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                      Eligibility for payment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* OPERATION TOOLS SECTION */}
            <div
              className="mb-16 animate-fade-in"
              style={{ animationDelay: "0.05s", animationFillMode: "both" }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl">
                  <Wrench size={22} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block">
                    Core Work Systems
                  </span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-batangas font-bold text-slate-900">
                    Operation Tools: OneDrive, ERP & CRM
                  </h2>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-3xl mb-8">
                Before stepping onto the live floor, every consultant must master our three primary{" "}
                <strong className="text-slate-900">Operation Tools</strong>.
                No matter how good a pitch sounds, if the system entry is flawed, the order fails.
                Sales bring the customer to the door, but operation tools secure the deal and guarantee your commission.
              </p>

              {/* 3 Core Tools Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-sky-50 text-sky-600 border border-sky-100 rounded-xl flex items-center justify-center mb-4">
                    <Cloud size={22} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-batangas font-bold text-slate-900 text-base sm:text-lg mb-2">
                    1. OneDrive
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
                    Company official cloud repository for documents, reports, rate sheets, and team trackers.
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                    Cloud File Storage
                  </span>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl flex items-center justify-center mb-4">
                    <Database size={22} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-batangas font-bold text-slate-900 text-base sm:text-lg mb-2">
                    2. ERP System
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
                    Where all customer orders are formally keyed in, validated, processed, and tracked.
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    Order Entry & Tracking
                  </span>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <Users size={22} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-batangas font-bold text-slate-900 text-base sm:text-lg mb-2">
                    3. CRM Platform
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
                    System where every lead, touchpoint, call note, callback schedule, and disposition is logged.
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Interaction & Notes Mgmt
                  </span>
                </div>
              </div>

              {/* Tool Detail 1: OneDrive */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-6 hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="p-2 sm:p-3 bg-sky-50 text-sky-600 border border-sky-100 rounded-xl">
                    <Cloud size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900">
                    1. OneDrive - File Storage
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
                  OneDrive is the{" "}
                  <strong className="text-slate-900">
                    company's official cloud storage system
                  </strong>{" "}
                  where documents, reports, and shared data are stored.
                </p>

                <div className="bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200 mb-6">
                  <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-200 pb-2 text-sm sm:text-base">
                    Rules for OneDrive Usage
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Use only for company-related files",
                      "Upload files in the correct folder",
                      "Do not rename or delete shared files without permission",
                      "Do not upload personal content",
                      "Keep file names clear and professional",
                    ].map((rule, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 font-medium"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-red-600 shrink-0 mt-0.5"
                        />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-sky-50 border border-sky-100 p-4 sm:p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-3 sm:gap-4">
                  <p className="text-xs sm:text-sm font-semibold text-sky-900 whitespace-nowrap">
                    Example Name:
                  </p>
                  <div className="bg-white px-3 sm:px-4 py-2 rounded-lg border border-sky-200 text-slate-900 font-mono text-[10px] sm:text-xs w-full md:w-auto text-center overflow-hidden text-ellipsis shadow-sm">
                    Customer_Order_Report_15Jan2026.xlsx
                  </div>
                </div>
              </div>

              {/* Tool Detail 2: ERP */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-6 hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="p-2 sm:p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl">
                    <Database size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900">
                    2. ERP - Order Entry
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
                  ERP (Enterprise Resource Planning) is where all customer orders
                  are entered, processed, and tracked.
                </p>

                <div className="bg-rose-50 border border-rose-100 p-4 sm:p-5 rounded-xl mb-6 text-center shadow-sm">
                  <p className="font-semibold text-rose-800 text-sm sm:text-base">
                    👉 If it's not in ERP, it doesn't exist.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2 text-sm sm:text-base">
                      Required Info
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Business Name (Legal)",
                        "Contact Person",
                        "Complete Address",
                        "Phone Number",
                        "Email Address",
                        "Selected Plan/Speed",
                        "Add-ons (Lines/Static IP)",
                      ].map((tag, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium"
                        >
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600"></div>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-5 sm:p-6 rounded-xl border border-amber-100">
                    <h4 className="font-batangas font-bold text-amber-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <AlertCircle size={16} className="sm:w-5 sm:h-5" />{" "}
                      Important Guidance
                    </h4>
                    <div className="text-xs sm:text-sm text-amber-800 font-medium space-y-2">
                      <p> Never guess details.</p>
                      <p> Never assume spelling.</p>
                      <p> Always confirm with the customer.</p>
                      <p className="text-rose-600 font-bold mt-4 pt-4 border-t border-amber-200">
                        Wrong details = delayed or cancelled orders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Detail 3: CRM */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-6 hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="p-2 sm:p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl">
                    <Users size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900">
                    3. CRM - Customer Relationship Management
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
                  The system where every customer interaction is recorded.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
                  <div>
                    <h4 className="font-batangas font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2 text-sm sm:text-base">
                      CRM helps us:
                    </h4>
                    <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />{" "}
                        Track follow-ups & performance
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />{" "}
                        Protect commissions
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />{" "}
                        Maintain compliance
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200">
                    <h4 className="font-batangas font-bold text-slate-900 mb-4 text-sm sm:text-base">
                      After every call, update:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <li>• Call status (connected / not)</li>
                      <li>• Customer response</li>
                      <li>• Interest level</li>
                      <li>• Clear Notes</li>
                      <li>• Next follow-up date</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-center mb-6">
                  <p className="font-semibold text-rose-800 text-xs sm:text-sm">
                    👉 Every call must be updated in CRM — no exceptions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-emerald-100 p-4 sm:p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold mb-3 text-sm sm:text-base">
                      <ThumbsUp size={16} className="sm:w-5 sm:h-5" /> Good Note
                      Example
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 italic font-medium">
                      "Spoke with owner. Currently using 300 Mbps cable.
                      Interested in upgrade. Asked for callback tomorrow at 3 PM."
                    </p>
                  </div>
                  <div className="bg-white border-2 border-rose-100 p-4 sm:p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 text-rose-700 font-bold mb-3 text-sm sm:text-base">
                      <ThumbsDown size={16} className="sm:w-5 sm:h-5" /> Bad Note
                      Example
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 italic font-medium">
                      "Talked. Call later."
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Numbers & Operational Mistakes */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-6 hover:border-red-200 transition-all">
                <div className="space-y-8 sm:space-y-10">
                  {/* Orders */}
                  <div>
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                        <Server size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-batangas font-bold text-slate-900">
                        Order Numbers
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-5 font-medium">
                      Unique IDs generated once an order is submitted to track
                      installations and resolve disputes.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-xl">
                      <p className="font-batangas font-bold text-slate-900 mb-4 text-sm sm:text-base">
                        If a customer asks for status, you MUST have:
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-700 font-semibold">
                        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                          <CheckCircle2 size={16} className="text-red-600" />
                          Order Number
                        </span>
                        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                          <CheckCircle2 size={16} className="text-red-600" />
                          Account Number
                        </span>
                        <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                          <CheckCircle2 size={16} className="text-red-600" />
                          Installation Date
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  {/* Mistakes */}
                  <div>
                    <div className="flex items-center gap-3 sm:gap-4 mb-6">
                      <div className="p-2 sm:p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl">
                        <XCircle size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-batangas font-bold text-rose-800">
                        Mistakes to Avoid
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                      {[
                        "Skipping CRM updates",
                        "Entering incomplete addresses",
                        "Selecting unavailable plans",
                        "Writing unclear notes",
                        "Forgetting follow-up dates",
                        "Assuming someone else will update",
                      ].map((mistake, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-rose-100 p-3 sm:p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-semibold shadow-sm hover:border-rose-300 transition-colors"
                        >
                          <span className="text-rose-500">❌</span>
                          {mistake}
                        </div>
                      ))}
                    </div>
                    <p className="text-center font-semibold text-rose-700 text-xs sm:text-sm bg-rose-50 py-3 rounded-lg border border-rose-100">
                      These mistakes cause: Order cancellation, Commission loss, &
                      Customer dissatisfaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Practical Discipline */}
              <div className="bg-slate-900 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 text-center shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-batangas font-bold mb-6 flex items-center justify-center gap-3 relative z-10 transition-colors">
                  <ShieldCheck className="text-red-500 sm:w-8 sm:h-8" size={24} />
                  Practical Operational Discipline
                </h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 text-sm sm:text-base lg:text-lg font-medium relative z-10">
                  <p className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    CRM update ={" "}
                    <span className="font-bold text-red-400">Mandatory</span>
                  </p>
                  <p className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    ERP entry ={" "}
                    <span className="font-bold text-red-400">Accurate</span>
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md text-white p-4 sm:p-5 rounded-xl sm:rounded-2xl inline-block mb-4 shadow-md border border-white/20 relative z-10">
                  <p className="text-base sm:text-lg font-batangas font-bold">
                    Sales close the deal. Systems secure the deal.
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 font-medium relative z-10 max-w-2xl mx-auto">
                  You don't need to be fast. You need to be{" "}
                  <strong className="text-white">accurate</strong>. If unsure: Ask
                  your trainer, recheck details, and never assume.
                </p>
              </div>
            </div>

            {/* Section Divider: Transition to Final Tests */}
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                Evaluation Phase
              </span>
              <h2 className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900">
                Final Assessments & Evaluations
              </h2>
              <div className="w-16 h-1 bg-red-600 rounded-full mx-auto mt-4"></div>
            </div>

            {/* 1, 2, 3: The Tests */}
            <div
              className="space-y-6 sm:space-y-8 mb-12 animate-fade-in"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              {/* Written Test */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl">
                    <FileText size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                    1. Written Process Test
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-6 font-medium">
                  <strong className="text-slate-900">Purpose:</strong> Checks
                  whether you understand the basics of the process, not whether
                  you can memorize answers.
                </p>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                      What the Test Covers:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Company policies & discipline
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Telecom basics (internet, speeds)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Sales process steps
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" /> CRM
                        and ERP basics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Compliance & professionalism
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200">
                    <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                      How You Should Prepare:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-700 font-medium">
                      <li>Review training notes</li>
                      <li>Understand concepts, not definitions</li>
                      <li>Ask doubts before the test</li>
                    </ul>
                    <p className="mt-4 text-xs font-semibold text-red-800 uppercase tracking-widest">
                      👉 Meant to ensure clarity, not perfection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Voice Test */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl">
                    <Mic size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                    2. Voice / Call Test
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-6 font-medium">
                  <strong className="text-slate-900">Purpose:</strong> Checks
                  your communication readiness.
                </p>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                      You may be asked to:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Deliver a greeting
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Explain a service
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Handle a basic objection
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Close a call politely
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200">
                    <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                      What Is Evaluated:
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        "Clarity of speech",
                        "Pace and tone",
                        "Confidence",
                        "Politeness",
                        "Listening ability",
                      ].map((tag, i) => (
                        <span
                          key={i}
                          className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-red-800">
                      👉 You are not expected to sound perfect. You are expected
                      to sound clear, calm, and professional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Test */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl">
                    <Monitor size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                    3. Order/Sale Practice Test
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-6 font-medium">
                  <strong className="text-slate-900">Purpose:</strong> Checks
                  your system understanding, not speed.
                </p>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                      What You Will Be Asked to Do:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Check service availability
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Select the correct plan
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Enter sample customer details
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Understand order flow
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Identify confirmation numbers
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200">
                    <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm md:text-base">
                      Important Guidance:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-700 font-medium mb-4">
                      <li>Accuracy matters more than speed</li>
                      <li>Asking questions is allowed</li>
                      <li>Mistakes are corrected during review</li>
                    </ul>
                    <p className="text-xs font-semibold text-red-800 uppercase tracking-widest">
                      👉 Ensures you don't make costly errors during real
                      orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 & 5. Approval & Payment */}
            <div
              className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {/* Trainer Approval */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.3)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <UserCheck size={100} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold mb-4 transition-colors">
                    4. Trainer's Approval
                  </h2>
                  <p className="text-gray-300 mb-6 text-xs sm:text-sm font-medium">
                    After all tests, the trainer evaluates overall performance,
                    not just one activity.
                  </p>
                  <ul className="space-y-3 text-white/90 text-xs sm:text-sm font-medium mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>{" "}
                      Attendance during training
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>{" "}
                      Discipline and behavior
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>{" "}
                      Willingness to learn
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>{" "}
                      Participation in mock calls
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>{" "}
                      System understanding
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>{" "}
                      Improvement over 8 days
                    </li>
                  </ul>
                  <div className="bg-white/10 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 text-center backdrop-blur-sm">
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      👉 Attitude and seriousness matter as much as skills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Eligibility */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <div className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg">
                    <DollarSign size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900">
                    5. Training Payment
                  </h2>
                </div>
                <p className="text-gray-600 mb-4 text-xs sm:text-sm font-medium">
                  Eligibility depends on:
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Completion of all 8 days",
                    "Participation in assessments",
                    "Trainer & management approval",
                    "Compliance with rules",
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-slate-700 bg-gray-50 border border-gray-200 px-2 sm:px-3 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-gray-200 flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Important Clarification
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700 mb-4 font-medium">
                    <li>Training is an evaluation period</li>
                    <li>
                      Payment is released{" "}
                      <strong className="text-slate-900">
                        only after successful completion and approval
                      </strong>
                    </li>
                    <li>
                      Incomplete training or serious violations may result in
                      non-eligibility
                    </li>
                  </ul>
                  <p className="text-xs font-bold text-red-600">
                    This ensures Fairness, Transparency, and Commitment.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Possible Outcomes */}
            <div
              className="mb-12 animate-fade-in"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900 mb-6 flex items-center gap-2 sm:gap-3">
                <Split size={20} className="sm:w-6 sm:h-6 text-red-600" /> 6.
                Possible Outcomes After Day 8
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-8 font-medium">
                After the final assessment, one of the following decisions is
                made. All decisions are taken professionally and transparently.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Cleared */}
                <div className="bg-emerald-50 border-2 border-emerald-100 rounded-lg sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-emerald-700 font-batangas font-bold text-base sm:text-lg mb-4">
                    1️⃣ Cleared & Approved
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-900 font-semibold relative z-10">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />{" "}
                      Trainee moves to live calls
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />{" "}
                      Eligible for training payment
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />{" "}
                      Enters probation period
                    </li>
                  </ul>
                </div>

                {/* Improvement */}
                <div className="bg-amber-50 border-2 border-amber-100 rounded-lg sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-amber-700 font-batangas font-bold text-base sm:text-lg mb-4">
                    2️⃣ Improvement Required
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-amber-900 font-semibold relative z-10">
                    <li className="flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />{" "}
                      Additional practice or observation
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />{" "}
                      Limited live exposure
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />{" "}
                      Re-evaluation
                    </li>
                  </ul>
                </div>

                {/* Not Cleared */}
                <div className="bg-rose-50 border-2 border-rose-100 rounded-lg sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-rose-700 font-batangas font-bold text-base sm:text-lg mb-4">
                    3️⃣ Not Cleared
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-rose-900 font-semibold relative z-10">
                    <li className="flex items-start gap-2">
                      <XCircle size={16} className="shrink-0 mt-0.5" /> Training
                      discontinued
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={16} className="shrink-0 mt-0.5" /> Feedback
                      shared clearly
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={16} className="shrink-0 mt-0.5" /> No
                      further obligation on either side
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7 & Closing */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg text-center animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-50 text-red-600 border border-red-100 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb size={24} className="sm:w-8 sm:h-8" />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-batangas font-bold text-slate-900 mb-4">
                7. Important Mindset
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 font-medium mb-8">
                Day 8 is{" "}
                <strong className="text-rose-600">not about fear.</strong> It is
                about{" "}
                <strong className="text-slate-900">honest evaluation.</strong>
              </p>

              <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-lg sm:rounded-2xl inline-block text-left mb-8 sm:mb-10 max-w-xl w-full">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  If you:
                </p>
                <ul className="space-y-3 text-slate-900 font-semibold text-sm md:text-base">
                  <li className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 size={18} className="text-red-600 shrink-0" />{" "}
                    Attended training sincerely
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 size={18} className="text-red-600 shrink-0" />{" "}
                    Followed discipline
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 size={18} className="text-red-600 shrink-0" />{" "}
                    Made effort to learn
                  </li>
                </ul>
                <p className="mt-4 pt-4 border-t border-gray-200 text-red-600 font-batangas font-bold text-center text-sm md:text-base">
                  You will be guided forward.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-8 sm:pt-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-4 flex items-center justify-center gap-2 sm:gap-3">
                  <Award className="text-red-600 sm:w-8 sm:h-8" size={24} />{" "}
                  Course Closing Message
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-800 font-medium mb-6">
                  Training does not end here —{" "}
                  <strong className="text-red-600">
                    real learning starts with real work.
                  </strong>
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-6 font-medium">
                  This assessment ensures you are prepared, customers are
                  handled professionally, and you grow with confidence.
                </p>
                <div className="bg-slate-900 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl inline-block shadow-[0_4px_15px_rgba(15,23,42,0.3)] border border-slate-800">
                  <p className="font-semibold text-xs sm:text-sm md:text-base">
                    Take Day 8 seriously, stay calm, and give your best.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Finish Button */}
        {isBottomReached && (
          <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-30 animate-fade-in">
            <button
              onClick={handleFinish}
              className="group flex items-center gap-2 sm:gap-3 bg-red-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-xs sm:text-sm whitespace-nowrap"
            >
              <span>FINISH</span>
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

export default memo(Day8);
