import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Laptop,
  Wifi,
  ClipboardList,
  Monitor,
  Banknote,
  FileX,
  ChevronRight,
  ChevronLeft,
  Check,
  BatteryCharging,
  Network,
  SmartphoneNfc,
  Plus,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

// ==========================================
// CUSTOM COMPONENT: WIB INTERACTIVE MARKER
// ==========================================
const WibMarker = ({
  number,
  title,
  description,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center relative group w-full md:w-1/3 p-4">
      {/* Top Icon & Title */}
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-">
          {Icon}
        </div>
        <h3 className="text-xl font-batangas font-bold text-slate-900 text-center h-14 transition-colors">
          {title}
        </h3>
      </div>

      {/* Interactive Number Button */}
      <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-300 z-10 cursor-pointer
                    ${
                      isActive
                        ? "bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)] scale-110"
                        : "bg-white text-slate-900 border border-gray-200 hover:border-red-400  hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)]"
                    }`}
      >
        {number}
      </button>

      {/* Expanding Description Box */}
      <div
        className={`
                absolute top-45 w-[90%] bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 z-20 transition-all duration-300 origin-top
                ${isActive ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"}
            `}
      >
        {/* Arrow pointing up to the button */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-200 rotate-45"></div>
        <h4 className="font-batangas font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-sm font-medium text-gray-600 leading-relaxed font-poppins">
          {description}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="absolute top-3 right-3 text-gray-400  transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const Internet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeBenefit, setActiveBenefit] = useState(1);
  const [activeAddOn, setActiveAddOn] = useState(0);
  const [activeWibMarker, setActiveWibMarker] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null); // State for FAQ Accordion

  const navigate = useNavigate();
  const tabsContainerRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  const handleContinue = () => {
    markLessonComplete(3);
    navigate("/voice");
  };

  const handleExit = () => {
    navigate("/");
  };

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      if (direction === "left") {
        tabsContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        tabsContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // --- DATA SECTIONS ---

  // 1. Benefits Data
  const benefitsData = [
    {
      id: 1,
      title: "Get More Done",
      icon: <ClipboardList size={40} className="text-slate-900" />,
      contentTitle: "Get More Done",
      content: (
        <ul className="space-y-3 font-medium text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1.5 text-xs">●</span>
            <span>
              Speeds starting at{" "}
              <span className="font-bold text-slate-900">500 Mbps</span> and up
              to <span className="font-bold text-slate-900">1 Gig</span> - 18x
              faster than DSL
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1.5 text-xs">●</span>
            <span>
              Over <span className="font-bold text-slate-900">99.9%</span>{" "}
              network reliability
            </span>
          </li>
        </ul>
      ),
    },
    {
      id: 2,
      title: "Free Internet Value Added Services",
      icon: <Monitor size={40} className="text-red-600" />,
      contentTitle: "Free Internet Value Added Services",
      content: (
        <div className="font-medium text-gray-600">
          <p className="font-bold text-slate-900 mb-3">
            Free services included with every package:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center gap-2">
              <span className="text-red-600 text-xs">●</span> custom email
              address
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600 text-xs">●</span> domain name
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600 text-xs">●</span> security suite
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600 text-xs">●</span> modem
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Unbeatable Value",
      icon: <Banknote size={40} className="text-slate-900" />,
      contentTitle: "Unbeatable Value",
      content: (
        <ul className="space-y-3 font-medium text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1.5 text-xs">●</span>
            <span>
              <span className="font-bold text-slate-900">Fastest</span> internet
              for the price
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1.5 text-xs">●</span>
            <span>
              <span className="font-bold text-slate-900">500 Mbps</span> for
              only <span className="font-bold text-slate-900">$49.99/mo</span>{" "}
              when bundled with voice
            </span>
          </li>
        </ul>
      ),
    },
    {
      id: 4,
      title: "No Contracts",
      icon: <FileX size={40} className="text-red-600" />,
      contentTitle: "No Contracts",
      content: (
        <ul className="space-y-3 font-medium text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1.5 text-xs">●</span>
            <span>
              We'll <span className="font-bold text-slate-900">earn</span> our
              customers business everyday
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1.5 text-xs">●</span>
            <span>
              We'll <span className="font-bold text-slate-900">buyout</span>{" "}
              their current{" "}
              <span className="font-bold text-slate-900">contract</span> with
              other providers
            </span>
          </li>
        </ul>
      ),
    },
  ];

  // 2. Internet Speeds Data
  const speedTiers = [
    {
      title: "500 Mbps INTERNET",
      subtitle: "20 Mbps upload speed",
      speedValue: 500,
      description: "Web browsing, checking emails and point-of-sale systems",
      employees: "Fewer than 5 employees",
    },
    {
      title: "750 Mbps INTERNET ULTRA",
      subtitle: "35 Mbps upload speed",
      speedValue: 750,
      description: "Running e-commerce and cloud-based applications",
      employees: "Fewer than 20 employees",
    },
    {
      title: "1 Gbps (1000 Mbps) Internet Gig",
      subtitle: "35 Mbps upload speed",
      speedValue: 1000,
      description: "Web hosting, data backups and large file transfers",
      employees: "20+ employees",
    },
  ];

  // 3. Gig Benefits Data
  const gigBenefits = [
    "Download large files, videos, images, reports, invoices and records with incredible speeds",
    "Connect more customers and employees in real-time",
    "Free WiFi for employees and customers",
    "Back up all data simultaneously",
    "Run more cloud-based apps, services and backups - all at the same time",
    "Process multiple credit card transactions faster",
  ];

  // 4. Add-Ons Data
  const addOnsData = [
    {
      title: "WIRELESS INTERNET BACKUP",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-slate-900 text-lg mb-4">
            Customers get constant connectivity and total peace of mind and make
            sure their business is always running, even in a power outage!
          </h4>
          <ul className="space-y-4 font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Businesses will
              get complete Internet reliability with this solution
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Automatic
              activation in the event of a disruption
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Customers get a
              notification when the backup service is used and when normal
              connection is restored
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> All equipment
              included and professionally installed
            </li>
          </ul>
          <p className="mt-6 text-red-600 italic hover:underline cursor-pointer">
            To learn more about Wireless Internet Backup, please see below
          </p>
        </div>
      ),
    },
    {
      title: "WIFI",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-slate-900 text-lg mb-4">
            Spectrum Business WiFi for Employees
          </h4>
          <ul className="space-y-4 font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Only $10 a month
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> A private WiFi
              network for business operations
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Keeps customers
              separate from systems and information
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "STATIC IP",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-slate-900 text-lg mb-4">
            Why do businesses need a static IP:
          </h4>
          <ul className="space-y-4 font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Have a constant
              IP address that won't change, offering more reliability
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Remote network
              access, so owners can manage their business on-the-go
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Enhanced security
              systems, to keep data out of harm's way
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-900 font-bold"></span>{" "}
              <span className="text-slate-900 font-bold">Note:</span> Single
              Static IP option doesn't work if ordering Apple TV or other
              streaming options
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-900 font-bold"></span>{" "}
              <span className="text-slate-900 font-bold">Note:</span> WIB does
              not support Static IP when in failover mode (engaged/active).
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "WEB HOSTING",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-slate-900 text-lg mb-4">
            Every business, regardless of size, needs a website.
          </h4>
          <ul className="space-y-4 font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Market their
              business to reach wider audiences
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Cost-effectively
              host their company's web presence
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> No experience
              necessary
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "SECURITY SUITE",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-slate-900 text-lg mb-2">
            Virus and Spy Protection
          </h4>
          <ul className="space-y-2 font-medium text-gray-600 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Provides
              real-time protection against viruses and other attacks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Detects and
              removes spyware and rootkits secretly installed on devices
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Includes 25
              desktop security licenses{" "}
              <span className="font-bold text-slate-900">free</span>
            </li>
          </ul>

          <h4 className="font-batangas font-bold text-slate-900 text-lg mb-2">
            Internet Shield
          </h4>
          <ul className="space-y-2 font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Helps prevent
              intrusion from hackers and other Internet-based threats to ensure
              their security while online
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "EMAIL ADDRESSES",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-slate-900 text-lg mb-4">
            Email accounts that project a professional presence with every
            communication.
          </h4>
          <ul className="space-y-4 font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Spectrum Business
              offers up to 25 free email accounts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold"></span> Email accounts
              can pair to custom domain name
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // 5. FAQ Data
  const faqData = [
    {
      question: "How will my business benefit from Wireless Internet Backup?",
      answer:
        "Wireless Internet Backup allows your business to continue operating in the event of an unexpected outage. You'll be able to manage transactions through your point-of-sale system, send or receive critical files, use cloud-based applications, run an e-commerce website, and more.",
    },
    {
      question: "How does Wireless Internet Backup work?",
      answer: (
        <>
          <p className="mb-4">
            When a network disruption occurs, your backup connection will kick
            in automatically, provide unlimited data usage for hours or more,
            and run up to 4 mission-critical business devices, like a
            point-of-sale or security system, laptop and printer.
          </p>
          <p>
            <strong className="text-red-600">Note:</strong> Static IPs are
            unavailable when the backup modem is using LTE.
          </p>
        </>
      ),
    },
    {
      question: "What equipment do I need to buy?",
      answer: (
        <>
          <p className="mb-4">
            When you sign up for Wireless Internet Backup, a Spectrum technician
            will install an LTE modem with 2 SIM cards, an external LTE antenna,
            and a battery backup device to sit behind your current modem and
            router. These devices are included when you sign up for the service.
          </p>
          <p>
            <strong className="text-red-600">Note:</strong> The battery backup
            provides power to your LTE modem. You'll need to provide a power
            source for your business critical devices.
          </p>
        </>
      ),
    },
    {
      question: "What do I need to do if the power goes out?",
      answer: (
        <p>
          <strong className="text-slate-900 font-bold">Nothing!</strong> Your
          Wireless Internet Backup activates automatically, so there is no
          downtime. You'll receive a text notification when your backup system
          is in use and again once your normal service is restored. After your
          network connection resumes, your critical devices will immediately
          revert back to the primary network and power source.
        </p>
      ),
    },
    {
      question: "Can I install the equipment myself?",
      answer:
        "Wireless Internet Backup can only be installed by a Spectrum technician. All you need to do is be sure to connect your critical devices to the LTE modem via Ethernet cable once the technician has installed your backup system.",
    },
  ];

  // Helper: Speed Tier Card with CORRECTED DYNAMIC Math Calculation
  const SpeedCard = ({ tier }) => {
    // 0% Full = -225deg, 100% Full = -45deg
    const maxSpeed = 1000;
    const percentage = Math.min(tier.speedValue / maxSpeed, 1);
    const rotationDegree = -225 + (percentage * 180);

    return (
      <div className="flex flex-col border border-gray-100 bg-white shadow-sm font-poppins transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:-translate-y-1">
        <div className="bg-slate-900 text-white p-4 text-center h-28 flex flex-col justify-center border-b border-red-600">
          <h3 className="font-batangas font-bold text-lg uppercase leading-tight">
            {tier.title}
          </h3>
          <p className="text-xs mt-1 font-medium text-red-200">
            {tier.subtitle}
          </p>
        </div>
        <div className="p-6 flex justify-center items-center border-b border-gray-100 h-32 relative">
          <div className="relative w-32 h-16 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-12 border-gray-100 box-border"></div>
            <div
              className={`absolute top-0 left-0 w-32 h-32 rounded-full border-12 border-transparent border-t-red-600 border-r-red-600 box-border transition-transform duration-1000 ease-out`}
              style={{
                transform: `rotate(${rotationDegree}deg)`,
              }}
            ></div>
          </div>
          <div className="absolute bottom-6 font-batangas font-bold text-xl text-slate-900">
            {tier.speedValue === 1000 ? "1 Gbps" : `${tier.speedValue} Mbps`}
          </div>
        </div>
        <div className="p-4 text-center text-sm font-medium text-gray-600 border-b border-gray-100 h-24 flex items-center justify-center bg-white">
          {tier.description}
        </div>
        <div className="p-4 text-center text-sm font-semibold text-gray-500 h-16 flex items-center justify-center bg-gray-50">
          {tier.employees}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-poppins overflow-hidden">
      <Sidebar3
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
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
              Products / Internet
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500  tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 rounded-full hover:bg-red-50 cursor-pointer"
          >
            EXIT COURSE
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 3
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Internet
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Hero */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-90 mb-16 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
              <div className="p-10 md:p-14 flex-1 flex flex-col justify-center">
                <div className="prose prose-lg text-gray-600 font-medium leading-relaxed">
                  <p className="text-xl md:text-2xl font-batangas font-bold text-slate-900">
                    Spectrum knows how much businesses rely on their Internet
                    access.
                  </p>
                  <p className="mt-6 text-lg text-gray-600">
                    That is why we offer a fast and reliable connection to
                    increase productivity and give businesses an edge.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900 md:w-5/12 relative overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-linear-to-br from-red-600/20 to-transparent mix-blend-overlay"></div>
                <div className="relative z-10 text-white opacity-90 animate-pulse">
                  <Laptop size={120} strokeWidth={1} />
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 rounded-full p-2 shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                    <Wifi size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-20">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-4">
                Benefits
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed max-w-4xl mb-8">
                Help customers work faster and smarter with the speed,
                reliability and savings that only Spectrum Business Internet can
                deliver. Click on the numbered markers below to learn more about
                the benefits.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {benefitsData.map((benefit, index) => (
                  <div
                    key={benefit.id}
                    className="flex flex-col items-center relative group"
                  >
                    {index < benefitsData.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/2 w-px h-24 bg-gray-200 translate-x-[50%]"></div>
                    )}
                    <div
                      className={`mb-4 transition-transform duration-300 ${activeBenefit === benefit.id ? "scale-110 text-red-600" : "group-hover:scale-105 group-"}`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-center font-semibold text-slate-900 text-sm mb-4 h-10 flex items-center justify-center px-2 transition-colors">
                      {benefit.title}
                    </h3>
                    <button
                      onClick={() => setActiveBenefit(benefit.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-all cursor-pointer ${activeBenefit === benefit.id ? "bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)] scale-110" : "bg-white text-gray-500 border border-gray-200 hover:border-red-400 "}`}
                    >
                      {benefit.id}
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-red-600 to-rose-700"></div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 animate-fade-in">
                  <div className="flex-1">
                    <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="text-red-600">
                        {benefitsData[activeBenefit - 1].icon}
                      </span>
                      {benefitsData[activeBenefit - 1].contentTitle}
                    </h3>
                    <div className="text-lg">
                      {benefitsData[activeBenefit - 1].content}
                    </div>
                  </div>
                  {activeBenefit < benefitsData.length && (
                    <button
                      onClick={() => setActiveBenefit(activeBenefit + 1)}
                      className="mt-6 md:mt-0 self-end md:self-center flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-full font-semibold border border-red-100 hover:bg-red-600 hover:text-white transition-all group cursor-pointer"
                    >
                      Next Benefit{" "}
                      <ChevronRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Speeds */}
            <div className="mb-20">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-8">
                Internet Speeds
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 w-full shadow-sm rounded-2xl overflow-hidden gap-1">
                  {speedTiers.map((tier, index) => (
                    <SpeedCard key={index} tier={tier} />
                  ))}
                </div>
                <div className="lg:w-72 shrink-0 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                  <h4 className="text-lg font-batangas font-bold text-slate-900 mb-6 border-b border-gray-100 pb-4">
                    Included in all speed tiers:
                  </h4>
                  <ul className="space-y-4 text-sm font-medium text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 text-lg leading-none"></span>
                      <span className="font-bold text-slate-900">
                        Free{" "}
                        <span className="font-medium text-gray-600">
                          email addresses
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 text-lg leading-none"></span>
                      <span className="font-bold text-slate-900">
                        Free{" "}
                        <span className="font-medium text-gray-600">
                          WiFi for their customers
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 text-lg leading-none"></span>
                      <span className="font-bold text-slate-900">
                        Free{" "}
                        <span className="font-medium text-gray-600">modem</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 text-lg leading-none"></span>
                      <span className="font-bold text-slate-900">
                        Free{" "}
                        <span className="font-medium text-gray-600">
                          desktop security
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 text-lg leading-none"></span>
                      <span>Trusted service...</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gig */}
            <div className="mb-20">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-8 border-b border-gray-200 pb-4">
                Business Internet Gig
              </h2>
              <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.3)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {gigBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="bg-red-600 p-1.5 rounded-full mt-1 shrink-0">
                        <Check
                          size={14}
                          className="text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-lg leading-relaxed font-medium text-gray-200 group-hover:text-white transition-colors">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BUSINESS INTERNET ADD-ONS SECTION */}
            <div className="mb-24">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-4">
                Business Internet Add-Ons
              </h2>
              <p className="text-gray-600 font-medium mb-8 max-w-4xl">
                Review the information below to learn more about the great
                benefits Spectrum Internet can provide.
              </p>

              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all">
                {/* Tab Navigation Strip */}
                <div className="flex items-center bg-gray-50 border-b border-gray-200 h-16 relative">
                  <button
                    onClick={() => scrollTabs("left")}
                    className="h-full w-12 flex items-center justify-center hover:bg-slate-800 border-r border-slate-700 shrink-0 z-10 bg-slate-900 text-white cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div
                    ref={tabsContainerRef}
                    className="flex-1 overflow-x-auto flex scrollbar-hide scroll-smooth h-full items-center"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {addOnsData.map((addon, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveAddOn(index)}
                        className={`h-full w-full px-6 whitespace-nowrap text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-all border-r border-gray-200 cursor-pointer 
                                                                                                        ${
                                                                                                          activeAddOn ===
                                                                                                          index
                                                                                                            ? "bg-white text-red-600 border-t-4 border-t-red-600"
                                                                                                            : "text-gray-500 hover:bg-gray-100 hover:text-slate-900"
                                                                                                        }`}
                      >
                        {addon.title}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollTabs("right")}
                    className="h-full w-12 flex items-center justify-center hover:bg-slate-800 border-l border-slate-700 shrink-0 z-10 bg-slate-900 text-white cursor-pointer transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-8 md:p-10 min-h-75 animate-fade-in">
                  {addOnsData[activeAddOn].content}
                </div>
              </div>
            </div>

            {/* WIRELESS INTERNET BACKUP (WIB) SECTION */}
            <div className="mb-20 animate-fade-in relative">
              {/* Decorative Banner Background */}
              <div className="absolute top-0 left-0 w-full h-40 bg-slate-900 rounded-t-3xl opacity-100 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-red-600/30 to-transparent mix-blend-overlay"></div>
                {/* Network pattern overlay simulation */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-size-[30px_30px]"></div>
              </div>

              <div className="">
                <h1 className="text-3xl md:text-4xl px-10 pt-5 font-batangas font-bold text-white mb-16 drop-shadow-md">
                  Wireless Internet Backup
                </h1>

                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-12 relative z-0">
                  <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                    Benefits
                  </h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-16 max-w-4xl">
                    Spectrum Business Internet comes with over 99.9%
                    reliability. Now customers can add Wireless Internet Backup
                    and get constant connectivity, even if the power goes out.
                    Click on the numbered markers below to learn about the
                    amazing benefits Wireless Internet Backup can offer our
                    customers.
                  </p>

                  {/* Interactive Marker Row */}
                  <div className="flex flex-col md:flex-row justify-around items-start relative pb-32">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-13 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

                    <WibMarker
                      number="1"
                      title="Battery Backup"
                      description="Uses a separate battery pack to provide 8 hours or more of battery backup to power the LTE modem during an outage."
                      icon={<BatteryCharging size={64} strokeWidth={1.5} />}
                      isActive={activeWibMarker === 1}
                      onClick={() =>
                        setActiveWibMarker(activeWibMarker === 1 ? null : 1)
                      }
                    />

                    <WibMarker
                      number="2"
                      title="Connect Multiple Devices"
                      description="Connect up to 4 mission-critical devices with unlimited data usage."
                      icon={<Network size={64} strokeWidth={1.5} />}
                      isActive={activeWibMarker === 2}
                      onClick={() =>
                        setActiveWibMarker(activeWibMarker === 2 ? null : 2)
                      }
                    />

                    <WibMarker
                      number="3"
                      title="Activates Automatically"
                      description="Activates automatically and sends a text notification when the backup system is in use and once again when normal service is restored."
                      icon={<SmartphoneNfc size={64} strokeWidth={1.5} />}
                      isActive={activeWibMarker === 3}
                      onClick={() =>
                        setActiveWibMarker(activeWibMarker === 3 ? null : 3)
                      }
                    />
                  </div>
                </div>

                {/* Discovery Questions */}
                <div className="mb-20">
                  <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                    Discovery Questions
                  </h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8 max-w-4xl">
                    Below are some questions you can ask to introduce Wireless
                    Internet Backup to the customer and position it as a
                    solution they can't miss out on for their business.
                  </p>

                  <ul className="space-y-6 text-gray-800 text-lg bg-white/80 backdrop-blur-sm border-l-4 border-red-600 p-8 rounded-r-2xl shadow-sm">
                    <li className="flex items-start gap-4">
                      <div className="bg-slate-900 p-1.5 rounded-full mt-1.5 shrink-0"></div>
                      <span className="font-semibold italic leading-relaxed text-slate-700">
                        "How important is constant Internet connectivity to your
                        business?"
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-slate-900 p-1.5 rounded-full mt-1.5 shrink-0"></div>
                      <span className="font-semibold italic leading-relaxed text-slate-700">
                        "Which devices and applications are critical to your
                        business operations?"
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-slate-900 p-1.5 rounded-full mt-1.5 shrink-0"></div>
                      <span className="font-semibold italic leading-relaxed text-slate-700">
                        "Did you know your business can now stay connected to
                        the Internet even in a power outage?"
                      </span>
                    </li>
                  </ul>

                  <p className="mt-8 text-gray-600 font-medium">
                    <strong className="text-red-600">Note:</strong> Static IP is
                    not supported when the WIB product is engaged and must be
                    explained clearly to the customer.
                  </p>
                </div>

                {/* 👇 NEW: FAQ Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8 max-w-4xl">
                    Below are some common questions customers may ask about
                    Wireless Internet Backup. Click through the questions to
                    learn how to best respond.
                  </p>

                  <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                    {faqData.map((faq, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                          <h3 className="font-batangas font-bold text-slate-900 text-lg pr-8 transition-colors">
                            {faq.question}
                          </h3>
                          <div className="text-gray-400 shrink-0 transition-colors">
                            {activeFaq === index ? (
                              <Minus size={20} />
                            ) : (
                              <Plus size={20} />
                            )}
                          </div>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                          <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed bg-gray-50 border-t border-gray-100">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* End FAQ Section */}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
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
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
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

export default Internet;