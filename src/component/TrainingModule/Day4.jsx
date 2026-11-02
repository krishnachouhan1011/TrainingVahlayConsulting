import React, { useState, useEffect, useRef, memo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  MapPin,
  Target,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Building,
  Check,
  Clock,
  Layers,
  FileCheck,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar5, { markLessonComplete } from "./Sidebar5"; // Fixed path if necessary
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Day4 = () => {
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
    markLessonComplete(4);
    navigate("/day5");
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
              Part 1: The Foundation / Day 4
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
                Order Flow & Service Qualification
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Buyflow & Service Qualification
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              <p className="text-base md:text-lg text-gray-600 font-medium max-w-3xl leading-relaxed">
                Day 4 is dedicated to the{" "}
                <strong className="text-slate-900">Buyflow process</strong> and{" "}
                <strong className="text-slate-900">service qualification</strong>.
                Before any order can ever be processed, you must accurately check address
                serviceability, determine available network facilities, and match the customer's
                actual requirements to the right speed plan. Speed is meaningless if the order fails qualification.
              </p>
            </div>

            {/* 1. Checking Availability & Address Qualification */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <MapPin size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  1. Checking Availability (Service Qualification)
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
                Before discussing speeds, packages, or pricing with a customer,{" "}
                <strong className="text-slate-900">
                  availability must be checked in the qualification tool.
                </strong>{" "}
                Telecom infrastructure varies street-by-street and building-by-building across the US.
              </p>

              {/* Golden Rule Callout */}
              <div className="bg-slate-900 text-white p-5 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <p className="text-[11px] font-semibold text-red-400 uppercase tracking-widest font-poppins mb-1">
                    Fundamental Sales Rule
                  </p>
                  <p className="font-batangas font-bold text-base sm:text-lg">
                    Sell what is available, not what sounds good.
                  </p>
                </div>
                <div className="bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg whitespace-nowrap">
                  Check First, Quote Second
                </div>
              </div>

              {/* Infrastructure Types Checked in Tool */}
              <h4 className="font-batangas font-bold text-slate-900 mb-4 text-sm sm:text-base">
                Facilities Qualified in the System:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-xs mb-2">
                    ON
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">Fiber On-Net</h5>
                  <p className="text-xs text-gray-600 font-medium">
                    Building directly wired to fiber optic backbone. Instant gigabit speeds available.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center font-bold text-xs mb-2">
                    NEAR
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">Fiber Near-Net</h5>
                  <p className="text-xs text-gray-600 font-medium">
                    Fiber runs nearby in the street. Requires site survey and lateral construction.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center font-bold text-xs mb-2">
                    HSC
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">High-Split Coax</h5>
                  <p className="text-xs text-gray-600 font-medium">
                    Upgraded coaxial network delivering higher/symmetric upload bandwidth.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold text-xs mb-2">
                    COAX
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">Standard Cable</h5>
                  <p className="text-xs text-gray-600 font-medium">
                    Widespread coax DOCSIS network with high download and standard upload speeds.
                  </p>
                </div>
              </div>

              {/* Address Validation Process */}
              <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-xl">
                <h4 className="font-batangas font-bold text-slate-900 mb-3 text-sm sm:text-base">
                  Correct Address Qualification Workflow:
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                  <li>
                    <strong>Input the exact USPS standardized address:</strong> Include street number, directional (N/S/E/W), suffix (AVE/BLVD/RD/ST), and city, state, zip.
                  </li>
                  <li>
                    <strong>Never omit secondary unit designators:</strong> Always include Suite (STE), Unit (UNIT), Building (BLDG), or Floor (FL).
                  </li>
                  <li>
                    <strong>Verify service status:</strong> Ensure the address returns "Serviceable" and is marked active for commercial/business accounts.
                  </li>
                  <li>
                    <strong>Identify available tiers:</strong> Present only the speeds and packages verified by the portal. Never guess or promise unlisted tiers.
                  </li>
                </ol>
              </div>
            </div>

            {/* 2. Selecting the Correct Plan (Usage-Based Selling) */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Target size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  2. Selecting the Correct Plan (Usage-Based Selling)
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium leading-relaxed">
                Spectrum Business offers three main contract‑free internet plans in 2026:{" "}
                <strong className="text-slate-900">Premier (500 Mbps) from $65/mo</strong>,{" "}
                <strong className="text-slate-900">Ultra (750 Mbps) from $95/mo</strong>, and{" "}
                <strong className="text-slate-900">Gig (1 Gbps) from $115/mo</strong>.
                Plan selection is based on three critical factors:{" "}
                <strong className="text-slate-900">
                  Customer usage, Number of active devices, and Business type.
                </strong>{" "}
                Never guess bandwidth — diagnose the client's day-to-day operations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {/* Premier Plan */}
                <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:border-red-200 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Small Retail / Shop
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        Contract-Free
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mb-1">
                      1 - 5 Devices
                    </div>
                    <h3 className="font-batangas font-bold text-slate-900 text-xl">
                      Premier
                    </h3>
                    <div className="text-2xl sm:text-3xl font-batangas font-bold text-red-600 my-1.5">
                      500 Mbps
                    </div>
                    <div className="text-sm font-bold text-slate-800 mb-4 pb-3 border-b border-gray-100 flex items-baseline gap-1">
                      <span>from</span>
                      <span className="text-xl text-red-600 font-extrabold">$65</span>
                      <span className="text-xs text-gray-500 font-medium">/mo</span>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600 font-medium">
                      <li>• Credit card / POS terminals</li>
                      <li>• Basic email and web browsing</li>
                      <li>• Single business phone line</li>
                      <li>• Minimal video streaming</li>
                    </ul>
                  </div>
                </div>

                {/* Ultra Plan (Most Popular) */}
                <div className="bg-white border-2 border-red-500 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all relative flex flex-col justify-between">
                  <span className="absolute -top-3 right-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Most Popular
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                        Restaurant / Clinic
                      </span>
                      <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        Contract-Free
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mb-1">
                      5 - 15 Devices
                    </div>
                    <h3 className="font-batangas font-bold text-slate-900 text-xl">
                      Ultra
                    </h3>
                    <div className="text-2xl sm:text-3xl font-batangas font-bold text-red-600 my-1.5">
                      750 Mbps
                    </div>
                    <div className="text-sm font-bold text-slate-800 mb-4 pb-3 border-b border-gray-100 flex items-baseline gap-1">
                      <span>from</span>
                      <span className="text-xl text-red-600 font-extrabold">$95</span>
                      <span className="text-xs text-gray-500 font-medium">/mo</span>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600 font-medium">
                      <li>• Multiple POS terminals</li>
                      <li>• Guest Wi-Fi access</li>
                      <li>• 4-8 HD CCTV cloud cameras</li>

                    </ul>
                  </div>
                </div>

                {/* Gig Plan */}
                <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:border-red-200 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Office / Tech Firm
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        Contract-Free
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mb-1">
                      20+ Users / Heavy Data
                    </div>
                    <h3 className="font-batangas font-bold text-slate-900 text-xl">
                      Gig
                    </h3>
                    <div className="text-2xl sm:text-3xl font-batangas font-bold text-red-600 my-1.5">
                      1 Gbps
                    </div>
                    <div className="text-sm font-bold text-slate-800 mb-4 pb-3 border-b border-gray-100 flex items-baseline gap-1">
                      <span>from</span>
                      <span className="text-xl text-red-600 font-extrabold">$115</span>
                      <span className="text-xs text-gray-500 font-medium">/mo</span>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600 font-medium">
                      <li>• Multi-line VoIP telephony</li>
                      <li>• Constant Zoom / Teams video calls</li>
                      <li>• Heavy cloud backup & file sync</li>

                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-4 sm:p-5 rounded-xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <p className="font-semibold text-emerald-900 text-xs sm:text-sm">
                  Do not oversell or undersell. An undersold plan causes customer complaints and service lag; an oversold plan causes cancellations. Right plan = happy customer + successful installation.
                </p>
              </div>
            </div>

            {/* 3. The 4-Step Buyflow Process */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Layers size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  3. The 4-Step Buyflow Process
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-8 font-medium">
                The buyflow is the standardized multi-step path followed to configure and submit any telecom order without errors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Step 1 */}
                <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-xl relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                      Step 1
                    </span>
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                  </div>
                  <h4 className="font-batangas font-bold text-slate-900 text-base mb-2">
                    Address Qualification
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Enter the complete standardized address. Check if the building has existing service or requires a new drop. Confirm commercial zoning status.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-xl relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                      Step 2
                    </span>
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                  </div>
                  <h4 className="font-batangas font-bold text-slate-900 text-base mb-2">
                    Plan & Bundle Selection
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Choose the verified internet speed tier based on business needs. Add business voice lines, TV packages, or cybersecurity features as required.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-xl relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                      Step 3
                    </span>
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                  </div>
                  <h4 className="font-batangas font-bold text-slate-900 text-base mb-2">
                    Hardware & Network Add-Ons
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Select commercial modems, business Wi-Fi routers, and Wi-Fi extenders. Determine if the business requires Static IPs for alarm systems or server hosting.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-xl relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                      Step 4
                    </span>
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                      4
                    </span>
                  </div>
                  <h4 className="font-batangas font-bold text-slate-900 text-base mb-2">
                    Scheduling & Order Review
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Pick an authorized installation date window. Verify primary decision maker contact details vs local onsite technician contact. Review pricing breakdown with the customer.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Commercial Address Precision */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl">
                  <Building size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  4. Commercial Address Precision & Error Prevention
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
                In US telecom, the single most common cause of cancelled orders is an inaccurate or incomplete address. Commercial buildings house dozens of tenants; precision is non-negotiable.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-rose-50 border border-rose-200 p-5 rounded-xl">
                  <h4 className="font-batangas font-bold text-rose-900 mb-3 text-sm sm:text-base flex items-center gap-2">
                    <XCircle size={18} className="text-rose-600" />
                    Truck Roll Failures
                  </h4>
                  <p className="text-xs sm:text-sm text-rose-800 font-medium leading-relaxed">
                    If an agent enters <code>100 Main St</code> without specifying <code>Suite 204</code>, the dispatch technician arrives at a multi-tenant shopping plaza, cannot locate the business, and marks the job as <strong>"Unable to locate / Customer not found."</strong> The order is cancelled, and commission is lost.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
                  <h4 className="font-batangas font-bold text-emerald-900 mb-3 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    Essential Information Checklist
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-800 font-medium">
                    <li>• Legal Business Name vs DBA Name</li>
                    <li>• Complete Street Address with Suite/Unit #</li>
                    <li>• Authorized Signer (Decision Maker)</li>
                    <li>• Onsite Contact Name & Direct Mobile</li>
                    <li>• Billing Email Address</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Critical Buyflow Mistakes to Avoid */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm mb-10 sm:mb-12 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl">
                  <AlertCircle size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-rose-800">
                  5. Critical Buyflow Mistakes to Avoid
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                {[
                  "Pitching speeds before checking address qualification in the portal",
                  "Omitting suite, unit, or building numbers in multi-tenant commercial centers",
                  "Quoting promotional prices without explaining equipment or activation fees",
                  "Failing to ask if the customer needs a Static IP for alarms, cameras, or servers",
                  "Promising an unconfirmed installation date without checking portal calendar",
                  "Selecting residential packages for registered commercial businesses",
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
                Preventing these buyflow errors guarantees seamless installation, prevents customer disputes, and protects your commissions.
              </p>
            </div>

            {/* Closing */}
            <div
              className="bg-slate-900 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-xl relative overflow-hidden animate-fade-in group hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)] transition-all"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-batangas font-bold mb-6 flex items-center justify-center gap-3 relative z-10 transition-colors">
                <ShieldCheck className="text-red-500 sm:w-8 sm:h-8" size={24} />
                Quality Over Speed
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 text-sm sm:text-base lg:text-lg font-medium relative z-10">
                <p className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                  Address Check = <span className="font-bold text-red-400">100% Verified</span>
                </p>
                <p className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                  Plan Matching = <span className="font-bold text-red-400">Usage-Based</span>
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md text-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl inline-block mb-6 shadow-md border border-white/20 relative z-10">
                <p className="text-base sm:text-lg lg:text-xl font-batangas font-bold">
                  A sale is only complete when the service is installed and working.
                </p>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium relative z-10">
                Take your time to qualify the address and choose the right speed tier.
                Precision creates satisfied customers and long-term earnings.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="fixed sm:absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-2 sm:gap-3 bg-red-600 text-white px-4 sm:px-6 lg:px-6 py-3 sm:py-3 rounded-full font-semibold shadow-lg sm:shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm whitespace-nowrap"
            >
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5"
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
          width: 4px;
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

export default memo(Day4);
