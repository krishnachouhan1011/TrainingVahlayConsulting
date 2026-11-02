// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Wifi,
  Zap,
  Cable,
  Gauge,
  Router,
  HardDrive,
  Wrench,
  PhoneForwarded,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  ArrowDown,
  BookOpen,
  Globe,
  Clock,
  ArrowUpDown,
  MapPin,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar5, { markLessonComplete } from "./Sidebar5"; // Fixed import path
import useScrollToBottom from "../../hooks/useScrollToBottom";
import SpectrumPricingLookup from "./SpectrumPricingLookup";

const Day2 = () => {
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
    markLessonComplete(2);
    navigate("/day3");
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
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500  transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="sm:w-6 sm:h-6" />
              )}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Part 1: The Foundation / Day 2
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-[10px] sm:text-xs font-semibold text-gray-500  tracking-wider transition-all px-2 sm:px-4 py-1.5 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
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
                Foundation Day
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Telecom Basics
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 font-medium max-w-3xl leading-relaxed">
                Day 2 is one of the{" "}
                <strong className="text-red-600">
                  most important training days
                </strong>
                . Before you learn sales scripts or systems, you must clearly
                understand what telecom services are, how they work, and why
                customers need them.
              </p>
            </div>

            {/* Importance Banner */}
            <div
              className="bg-white/90 backdrop-blur-md border-l-4 border-red-600 rounded-xl p-6 mb-12 flex flex-col sm:flex-row gap-6 items-center shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow animate-fade-in"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center shrink-0 text-red-600 border border-red-100">
                <Lightbulb size={28} />
              </div>
              <div>
                <h3 className="font-batangas font-bold text-slate-900 mb-3 text-lg">
                  This knowledge will help you:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Speak confidently with US customers",
                    "Understand customer problems",
                    "Recommend the correct solution",
                    "Avoid mistakes during order submission",
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-50 text-xs font-semibold text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1.5 hover:border-red-200 transition-colors"
                    >
                      <CheckCircle2 size={14} className="text-emerald-500" />{" "}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 1. Internet Types */}
            <div
              className="mb-12 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 text-red-600 rounded-xl border border-red-100">
                  <Globe size={24} />
                </div>
                <h2 className="text-2xl font-batangas font-bold text-slate-900">
                  1. Internet Types: Fiber, Cable & Wireless
                </h2>
              </div>
              <p className="text-base text-gray-600 mb-8 font-medium">
                In the US, businesses mainly use three types of internet
                connections.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Fiber */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-5 border border-red-100">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2">
                    Fiber Internet
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-1 font-medium">
                    Uses fiber-optic cables (glass cables) to transmit data
                    using light signals.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium mb-6">
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      Very fast speeds & very stable
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      Best for high usage
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      Slightly more expensive
                    </li>
                    <li className="flex gap-2">
                      <X size={16} className="text-rose-500 shrink-0 mt-0.5" />{" "}
                      Not available at all addresses
                    </li>
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-auto">
                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-widest">
                      Common Speeds:
                    </p>
                    <p className="text-sm text-slate-900 font-bold">
                      500 Mbps | 1 Gbps | 2 Gbps+
                    </p>
                    <p className="text-xs text-gray-500 mt-2 italic font-medium">
                      Ex: Used by businesses with many employees, CCTV, cloud
                      software, & video calls.
                    </p>
                  </div>
                </div>

                {/* Cable */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-5 border border-red-100">
                    <Cable size={24} />
                  </div>
                  <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2">
                    Cable Internet
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-1 font-medium">
                    Uses coaxial cables (similar to TV cables).
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium mb-6">
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      Widely available across the US
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      Reliable for SMBs
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      More affordable
                    </li>
                    <li className="flex gap-2">
                      <AlertCircle
                        size={16}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />{" "}
                      Slightly slower than fiber
                    </li>
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-auto">
                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-widest">
                      Common Speeds:
                    </p>
                    <p className="text-sm text-slate-900 font-bold">
                      500 Mbps | 750 Mbps | 1 Gbps
                    </p>
                    <p className="text-xs text-gray-500 mt-2 italic font-medium">
                      Ex: Small offices, retail stores, restaurants, and salons.
                    </p>
                  </div>
                </div>

                {/* Wireless */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:col-span-2 lg:col-span-1 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-5 border border-red-100">
                    <Wifi size={24} />
                  </div>
                  <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2">
                    Wireless Internet
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-1 font-medium">
                    Uses cellular towers or fixed wireless antennas.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium mb-6">
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      Used where fiber/cable isn't available
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />{" "}
                      Mostly used as backup/temporary
                    </li>
                    <li className="flex gap-2">
                      <AlertCircle
                        size={16}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />{" "}
                      Speeds depend on signal strength
                    </li>
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-auto">
                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-widest">
                      Common Speeds:
                    </p>
                    <p className="text-sm text-slate-900 font-bold">
                      Varies by signal
                    </p>
                    <p className="text-xs text-gray-500 mt-2 italic font-medium">
                      Ex: Remote locations, food trucks, or temporary
                      construction sites.
                    </p>
                  </div>
                </div>
                {/* High-Split Coax (HSC) */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:col-span-2 lg:col-span-1 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-5 border border-red-100">
                    <Cable size={24} />
                  </div>

                  <h3 className="text-xl font-batangas font-bold text-slate-900 mb-2">
                    High-Split Coax (HSC)
                  </h3>

                  <p className="text-sm text-gray-600 mb-6 flex-1 font-medium">
                    Uses upgraded coaxial cables to provide higher upload speeds.
                  </p>

                  <ul className="space-y-3 text-sm text-gray-700 font-medium mb-6">
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      Higher upload speeds than traditional cable
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      Near-symmetric upload and download speeds
                    </li>

                    <li className="flex gap-2">
                      <AlertCircle
                        size={16}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />
                      Limited availability by location
                    </li>
                  </ul>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-auto">
                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-widest">
                      Common Speeds:
                    </p>

                    <p className="text-sm text-slate-900 font-bold">
                      Varies by signal
                    </p>

                    <p className="text-xs text-gray-500 mt-2 italic font-medium">
                      Ex: Businesses needing higher upload capacity for cloud apps,
                      video calls, file sharing, & remote work.
                    </p>
                  </div>
                </div>


              </div>

              {/* QUICK COMPARISON TABLE */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
                  <h4 className="font-batangas font-bold text-slate-900 text-lg">
                    Quick Comparison Table
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white text-gray-500 font-semibold uppercase tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Speed</th>
                        <th className="px-6 py-4">Stability</th>
                        <th className="px-6 py-4">Cost</th>
                        <th className="px-6 py-4">Availability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          Fiber
                        </td>
                        <td className="px-6 py-4 text-emerald-600 font-bold">
                          Very High
                        </td>
                        <td className="px-6 py-4 text-emerald-600 font-bold">
                          Very Stable
                        </td>
                        <td className="px-6 py-4 text-rose-500 font-bold">
                          Higher
                        </td>
                        <td className="px-6 py-4">Limited areas</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          Cable
                        </td>
                        <td className="px-6 py-4 text-blue-600 font-bold">
                          High
                        </td>
                        <td className="px-6 py-4 text-blue-600 font-bold">
                          Stable
                        </td>
                        <td className="px-6 py-4 text-amber-500 font-bold">
                          Medium
                        </td>
                        <td className="px-6 py-4">Widely available</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          Wireless
                        </td>
                        <td className="px-6 py-4 text-amber-500 font-bold">
                          Medium
                        </td>
                        <td className="px-6 py-4 text-rose-500 font-bold">
                          Variable
                        </td>
                        <td className="px-6 py-4 text-amber-500 font-bold">
                          Medium
                        </td>
                        <td className="px-6 py-4 text-purple-600 font-bold">
                          Location-based
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          High-Split Coax (HSC)
                        </td>
                        <td className="px-6 py-4 text-emerald-500 font-bold">
                          High
                        </td>
                        <td className="px-6 py-4 text-emerald-500 font-bold">
                          High
                        </td>
                        <td className="px-6 py-4 text-amber-500 font-bold">
                          Medium
                        </td>
                        <td className="px-6 py-4 text-purple-600 font-bold">
                          Location-based
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 2. Mbps vs Gbps */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-10">
                <div className="flex-1">
                  <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-3 flex items-center gap-3">
                    <Gauge size={24} className="text-red-600" /> 2. Mbps vs Gbps
                    (Speed Basics)
                  </h2>
                  <p className="text-base text-gray-500 mb-6 italic font-medium">
                    Customers often ask: "How fast is this internet?"
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h4 className="font-batangas font-bold text-xl text-red-600 mb-1">
                        Mbps
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">
                        Megabits per second
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        Used to measure standard internet speed. Common for
                        small to medium plans.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h4 className="font-batangas font-bold text-xl text-emerald-600 mb-1">
                        Gbps
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">
                        Gigabits per second
                      </p>
                      <p className="text-sm text-gray-700 font-medium mb-3">
                        Faster speed measurement for enterprise connections.
                      </p>
                      <div className="inline-block bg-white border border-gray-200 px-3 py-1 rounded-lg text-sm font-bold text-slate-900 shadow-sm">
                        1 Gbps = 1000 Mbps
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3 bg-red-50 p-6 rounded-xl border border-red-100 text-center shrink-0">
                  <h4 className="font-bold text-red-600 uppercase tracking-widest text-xs mb-3">
                    Important Tip
                  </h4>
                  <p className="text-lg font-bold text-slate-900 leading-snug">
                    Higher speed = smoother work, faster uploads, fewer
                    complaints.
                  </p>
                </div>
              </div>

              {/* SPEED UNDERSTANDING CHEAT SHEET */}
              <div className="bg-white text-gray-900 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
                  <h4 className="font-batangas font-bold text-slate-900 text-lg">
                    Speed Understanding Cheat Sheet
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white text-gray-500 font-semibold uppercase tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 w-1/3">Speed</th>
                        <th className="px-6 py-4">Suitable For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-amber-600">
                          100-300 Mbps
                        </td>
                        <td className="px-6 py-4">
                          Small business, light usage
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-amber-500">
                          500-600 Mbps
                        </td>
                        <td className="px-6 py-4">Medium business</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-emerald-500">
                          1 Gbps
                        </td>
                        <td className="px-6 py-4">
                          Heavy usage, multiple users
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-purple-600">
                          2 Gbps+
                        </td>
                        <td className="px-6 py-4">Very high usage, servers</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 3. Hardware & Install */}
            <div
              className="mb-12 animate-fade-in"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 text-red-600 rounded-xl border border-red-100">
                  <Wrench size={24} />
                </div>
                <h2 className="text-2xl font-batangas font-bold text-slate-900">
                  3. Modem, Router & Installation
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Hardware Cards */}
                <div className="space-y-6">
                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                    <div className="bg-gray-50 p-3 rounded-xl text-gray-600 border border-gray-200">
                      <HardDrive size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-batangas font-bold text-slate-900 mb-2">
                        3.1 Modem
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed font-medium">
                        Brings internet{" "}
                        <strong className="text-slate-900">
                          into the building
                        </strong>{" "}
                        from the service provider.
                      </p>
                      <p className="text-xs font-semibold text-gray-700 bg-gray-50 inline-block px-3 py-1.5 rounded-lg border border-gray-200">
                        Think of it as: "The door through which internet
                        enters."
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                    <div className="bg-gray-50 p-3 rounded-xl text-gray-600 border border-gray-200">
                      <Router size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-batangas font-bold text-slate-900 mb-2">
                        3.2 Router
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed font-medium">
                        <strong className="text-slate-900">
                          Distributes internet
                        </strong>{" "}
                        to devices (Computers, Mobiles, POS systems, Cameras).
                      </p>
                      <p className="text-xs font-semibold text-gray-700 bg-gray-50 inline-block px-3 py-1.5 rounded-lg border border-gray-200">
                        It creates Wi-Fi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flowchart */}
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                  <h4 className="font-batangas font-bold text-slate-900 text-lg mb-6 w-full text-left">
                    Simple Hardware Diagram
                  </h4>

                  <div className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-sm w-full max-w-55">
                    Internet Line
                  </div>
                  <ArrowDown size={20} className="text-gray-400 my-2" />

                  <div className="bg-white border-2 border-gray-300 text-slate-900 px-6 py-3 rounded-xl font-bold shadow-sm w-full max-w-55 flex items-center justify-center gap-2">
                    <HardDrive size={16} className="text-gray-400" /> Modem
                  </div>
                  <ArrowDown size={20} className="text-gray-400 my-2" />

                  <div className="bg-white border-2 border-red-600 text-red-600 px-6 py-3 rounded-xl font-bold shadow-sm w-full max-w-55 flex items-center justify-center gap-2">
                    <Router size={16} /> Router
                  </div>
                  <ArrowDown size={20} className="text-gray-400 my-2" />

                  <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold shadow-sm w-full max-w-65 text-sm">
                    Devices (PC, Phone, CCTV, POS)
                  </div>
                </div>
              </div>

              {/* Install Process */}
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <h4 className="text-xl font-batangas font-bold text-slate-900 mb-4">
                  3.3 Installation Process
                </h4>
                <p className="text-sm text-gray-600 mb-8 font-medium">
                  <strong className="text-slate-900">
                    What installation means:
                  </strong>{" "}
                  A technician visits the customer's location to set up
                  modem/router, activate internet/phone service, and test the
                  connection.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                      Typical Installation Flow:
                    </h5>
                    <div className="relative border-l-2 border-red-200 ml-3 space-y-4">
                      {[
                        "Order submitted",
                        "Address verified",
                        "Technician assigned & Appointment scheduled",
                        "Technician installs service",
                        "Customer confirms completion",
                      ].map((step, i) => (
                        <div key={i} className="relative pl-6">
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
                          <p className="text-sm font-semibold text-gray-700">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
                    <h5 className="text-sm font-bold text-slate-900 mb-4">
                      Your Role:
                    </h5>
                    <ul className="space-y-3 text-sm text-gray-700 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Collect correct address
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Schedule correct time
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-red-600" />{" "}
                        Follow up until completion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Porting */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center justify-center">
                  <PhoneForwarded size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-batangas font-bold text-slate-900">
                    4. Porting Phone Numbers
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    Moving a customer's existing number to a new provider.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3 text-base">
                    Why Customers Prefer Porting:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" />{" "}
                      They don't want to change their number
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" />{" "}
                      Their customers already know the number
                    </li>
                  </ul>
                  <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-700 italic font-medium">
                      <strong className="text-slate-900">Example:</strong> If a
                      restaurant has used the same number for 10 years, they
                      will almost always request porting.
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3 text-base">
                    Important Rules for Porting:
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600 font-medium">
                    <li className="flex items-start gap-2">
                      <AlertCircle
                        size={16}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />
                      <span>
                        Old service{" "}
                        <strong className="text-slate-900">
                          must remain active
                        </strong>{" "}
                        during the transfer.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle
                        size={16}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />
                      <span>
                        Correct{" "}
                        <strong className="text-slate-900">
                          account number and PIN
                        </strong>{" "}
                        are required.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle
                        size={16}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />
                      <span>
                        Wrong details can delay or cancel porting entirely.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock
                        size={16}
                        className="text-red-600 shrink-0 mt-0.5"
                      />
                      <span>
                        Porting usually takes{" "}
                        <strong className="text-slate-900">24-48 hours</strong>.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Common Technical Terms */}
            <div
              className="mb-12 animate-fade-in"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-batangas font-bold text-slate-900">
                  5. Common Technical Terms
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-6 font-medium">
                Below are basic terms every trainee must understand.
              </p>

              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
                  <h4 className="font-batangas font-bold text-slate-900 text-lg">
                    Quick Telecom Terms Cheat Sheet
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white text-gray-500 font-semibold uppercase tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 w-1/3">Term</th>
                        <th className="px-6 py-4">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Mbps
                        </td>
                        <td className="px-6 py-3">
                          Internet speed measurement
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Gbps
                        </td>
                        <td className="px-6 py-3">Faster speed (1000 Mbps)</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Fiber
                        </td>
                        <td className="px-6 py-3 text-emerald-600 font-semibold">
                          Fastest internet type
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Cable
                        </td>
                        <td className="px-6 py-3 text-blue-600 font-semibold">
                          Standard internet type
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Wireless
                        </td>
                        <td className="px-6 py-3 text-amber-600 font-semibold">
                          Signal-based internet
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Modem
                        </td>
                        <td className="px-6 py-3">Brings internet inside</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Router
                        </td>
                        <td className="px-6 py-3">Spreads Wi-Fi</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Static IP
                        </td>
                        <td className="px-6 py-3">Fixed internet address</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          VoIP
                        </td>
                        <td className="px-6 py-3">Phone via internet</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Porting
                        </td>
                        <td className="px-6 py-3">
                          Moving{" "}
                          <span className="text-amber-500 font-bold">old</span>{" "}
                          phone number
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Installation
                        </td>
                        <td className="px-6 py-3">Technician setup</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Latency
                        </td>
                        <td className="px-6 py-3 text-rose-500 font-semibold">
                          Delay in connection
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">
                          Bandwidth
                        </td>
                        <td className="px-6 py-3">Data capacity</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Day 2 Training Video */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 animate-fade-in hover:shadow-md transition-shadow">
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
                      Day 2: Telecom Products & Bundling Walkthrough
                    </h2>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-6 leading-relaxed">
                Watch the complete recorded session for Day 2 covering broadband fundamentals, telecom equipment, voice porting, and package bundling before experimenting with the bundle builder below.
              </p>

              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl aspect-video w-full">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-contain"
                  src="https://firebasestorage.googleapis.com/v0/b/vahlay1.appspot.com/o/training_videos%2FDay02mp4.mp4?alt=media&token=de820c89-56d1-487d-9c51-081a6c62c4f3"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Interactive Spectrum Serviceability & Pricing Lookup Lab */}
            <SpectrumPricingLookup />

            {/* Closing Message */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 text-center animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="w-16 h-16 bg-red-50 border border-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-batangas font-bold text-slate-900 mb-6">
                Why Day 2 Knowledge Is Important
              </h2>

              <div className="max-w-3xl mx-auto space-y-6 text-gray-600 font-medium text-lg leading-relaxed">
                <p>
                  Understanding telecom basics helps you sound confident,
                  recommend correct plans, reduce order mistakes, and gain
                  customer trust.{" "}
                  <strong className="text-slate-900">
                    Customers trust agents who understand what they are selling.
                  </strong>
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 text-left">
                  <p className="text-sm text-slate-900 font-bold mb-2">
                    Day 2 Closing Guidance:
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    You do not need to become an engineer, but you{" "}
                    <strong className="text-slate-900">
                      must understand the basics clearly.
                    </strong>{" "}
                    Learn these terms, understand the differences, and ask
                    questions when confused. You will perform better in sales,
                    support, and training!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 md:px-6 py-3 md:py-3 rounded-full font-semibold shadow-lg shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-xs md:text-sm whitespace-nowrap"
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

export default memo(Day2);
