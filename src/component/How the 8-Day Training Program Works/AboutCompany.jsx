import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Target,
  Eye,
  Shield,
  CheckSquare,
  TrendingUp,
  HeartHandshake,
  UserCheck,
  Users,
  MapPin,
  Briefcase,
  Quote,
  CheckCircle2,
  Globe,
  MonitorSmartphone,
  PhoneCall,
  HeadphonesIcon,
  Code,
  Rocket,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar4, { markLessonComplete } from "./Sidebar4";
import useScrollToBottom from "../../hooks/useScrollToBottom";

// --- SVG Flags ---
const UsFlag = () => (
  <svg
    viewBox="0 0 60 40"
    className="w-12 h-auto rounded shadow-sm border border-gray-100"
  >
    <rect width="60" height="40" fill="#fff" />
    <g fill="#bf0a30">
      <rect width="60" height="3.08" />
      <rect y="6.15" width="60" height="3.08" />
      <rect y="12.31" width="60" height="3.08" />
      <rect y="18.46" width="60" height="3.08" />
      <rect y="24.62" width="60" height="3.08" />
      <rect y="30.77" width="60" height="3.08" />
      <rect y="36.92" width="60" height="3.08" />
    </g>
    <rect width="24" height="21.54" fill="#002868" />
    <g fill="#fff" transform="scale(0.8)">
      <g id="s18">
        <g id="s9">
          <g id="s5">
            <g id="s4">
              <path id="s" d="M1.5 1.5l1.1 3.4L0 2.6h3.6L1 4.9z" />
              <use href="#s" x="4" />
              <use href="#s" x="8" />
              <use href="#s" x="12" />
            </g>
            <use href="#s" x="16" />
          </g>
          <use href="#s4" x="2" y="3" />
        </g>
        <use href="#s9" y="6" />
      </g>
      <use href="#s9" y="12" />
      <use href="#s5" y="18" />
    </g>
  </svg>
);

const IndiaFlag = () => (
  <svg
    viewBox="0 0 60 40"
    className="w-12 h-auto rounded shadow-sm border border-gray-100"
  >
    <rect width="60" height="13.33" fill="#f93" />
    <rect y="13.33" width="60" height="13.33" fill="#fff" />
    <rect y="26.67" width="60" height="13.33" fill="#128807" />
    <circle cx="30" cy="20" r="5" fill="#000080" />
    <circle cx="30" cy="20" r="4.3" fill="#fff" />
    <g transform="translate(30,20)">
      {[...Array(24)].map((_, i) => (
        <path
          key={i}
          d="M0,0 L0.4,-4.3 L-0.4,-4.3 Z"
          fill="#000080"
          transform={`rotate(${i * 15})`}
        />
      ))}
    </g>
  </svg>
);

const CanadaFlag = () => (
  <svg
    viewBox="0 0 60 40"
    className="w-12 h-auto rounded shadow-sm border border-gray-100"
  >
    <rect width="60" height="40" fill="#d80621" />
    <rect x="15" width="30" height="40" fill="#fff" />
    <path
      fill="#d80621"
      d="M30 6.6l1.8 5.6 3.8-1.5-1.5 4.5 5.5 1.4-4.5 3.3 3.6 4.6-5.4-2.8-1.5 5.7h-3.6l-1.5-5.7-5.4 2.8 3.6-4.6-4.5-3.3 5.5-1.4-1.5-4.5 3.8 1.5z"
    />
  </svg>
);

const AboutCompany = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

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
    markLessonComplete(3);
    navigate("/");
  };

  const handleExit = () => {
    navigate("/");
  };

  // --- Data Structures ---
  const coreValues = [
    {
      title: "Integrity",
      desc: "We believe in honest communication, transparent processes, and doing what is right even when no one is watching.",
      icon: <Shield size={24} />,
    },
    {
      title: "Discipline",
      desc: "Success is built on consistency, punctuality, and respect for company rules. Discipline is at the heart of our culture.",
      icon: <CheckSquare size={24} />,
    },
    {
      title: "Growth Mindset",
      desc: "We encourage continuous learning, self-improvement, and ambition. Growth is for everyone.",
      icon: <TrendingUp size={24} />,
    },
    {
      title: "Customer Commitment",
      desc: "We put customers first every call, every interaction, every order, every follow-up.",
      icon: <HeartHandshake size={24} />,
    },
    {
      title: "Responsibility",
      desc: "Each individual takes responsibility for performance, behavior, and the trust given to them by the company.",
      icon: <UserCheck size={24} />,
    },
    {
      title: "Team Spirit",
      desc: "We believe in supporting each other, sharing knowledge, and working as one united team.",
      icon: <Users size={24} />,
    },
  ];

  const milestones = [
    {
      year: "2022",
      points: [
        "Vahlay Consulting Inc. was founded in the United States, Canada, and Bharat.",
        "Partnered with major telecom service providers for B2B sales.",
      ],
    },
    {
      year: "2024",
      points: [
        "Expansion of operations to Bharat with full-scale night operations.",
        "Built internal divisions for after-sales support and software sales.",
      ],
    },
    {
      year: "2025",
      points: [
        "Team strength crossed 40+ employees.",
        "Launch of new software/website development verticals.",
        "Increasing outsourcing opportunities with US and Canadian partners.",
        "Growing internal training and leadership programs.",
      ],
    },
    {
      year: "2026",
      sub: "(Ongoing)",
      points: [
        "Adding Comcast and AT&T to ongoing Telecom Projects.",
        "Introducing new projects such as Business Management.",
        "Introducing IT/Software/Developer Project.",
        "Zenith: Digital Telecom Projects.",
        "Entry Level Hiring and Bulk Hiring Projects.",
      ],
    },
  ];

  const locations = [
    {
      country: "United States",
      flag: <UsFlag />,
      type: "Head Office",
      desc: "For client partnerships, account management, compliance, and revenue operations.",
    },
    {
      country: "India - Bharat",
      flag: <IndiaFlag />,
      type: "Operations Office",
      desc: "Night operations including: Sales, Customer service/support, Lead management, After-sales support, IT & software development sales, HR Consulting.",
    },
    {
      country: "Canada",
      flag: <CanadaFlag />,
      type: "Partner Support",
      desc: "Affiliate support for client relationships and business expansions.",
    },
  ];

  const services = [
    {
      title: "Business Internet Sales",
      desc: "We help businesses upgrade to high-speed internet services that support their daily operations. Our job is to identify customer needs, compare available providers, and assist them with the best connectivity solution.",
      icon: <Globe size={24} />,
    },
    {
      title: "VoIP Phone Services",
      desc: "We help businesses switch to modern, cost-effective digital phone systems with better call quality and flexibility.",
      icon: <PhoneCall size={24} />,
    },
    {
      title: "Customer Support",
      desc: "Our support team ensures customers receive assistance with billing, troubleshooting, and service upgrades by operating 24/7-360.",
      icon: <HeadphonesIcon size={24} />,
    },
    {
      title: "After-Sales Support",
      desc: "Even after installation, we continue to guide customers on maintenance, changes, upgrades, and renewals.",
      icon: <MonitorSmartphone size={24} />,
    },
    {
      title: "Software/Website Dev Sales",
      desc: "We connect businesses with digital solutions like ERP systems, websites, Logo, and custom software built by our development team.",
      icon: <Code size={24} />,
    },
    {
      title: "Zenith Project",
      desc: "Vahlay Consulting's new growth-focused initiative designed to boost our sales through digital marketing and online lead generation, instead of relying only on traditional calling methods.",
      icon: <Rocket size={24} />,
    },
    {
      title: "HR Project (Entry/Bulk Hiring)",
      desc: "A structured initiative focused on recruitment, screening, and workforce management for both internal needs and external client requirements. It plays a critical role in building strong teams.",
      icon: <UserPlus size={24} />,
    },
  ];

  const roleExpectations = [
    "Show discipline",
    "Take responsibility",
    "Stay committed long term",
    "Want to earn and grow",
    "Embrace learning",
    "Maintain a positive attitude",
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins overflow-hidden">
      <Sidebar4
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full relative bg-white w-full">
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500  transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Company Overview / About the Company
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
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 3
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                About the Company
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            <div
              className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden mb-12 animate-fade-in group hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)] transition-all"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-batangas font-bold transition-colors">
                    Vahlay Consulting Inc.
                  </h2>
                  <p className="text-gray-300 leading-relaxed font-medium">
                    Founded in 2022, we are a US-based corporation with a
                    rapidly growing operations center in Bharat. From the
                    beginning, our goal has been simple yet powerful to provide
                    world-class telecom and technology services while creating a
                    workplace where motivated individuals can build stable,
                    long-term careers.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-medium">
                    Operating primarily in the US and Canada markets, what sets
                    Vahlay apart is our commitment to authenticity,
                    professionalism, and service excellence. For every customer
                    we serve, we focus on solving real problems, reducing costs,
                    and delivering value-driven solutions.
                  </p>
                </div>
                <div className="w-full md:w-1/3 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 text-center shrink-0 hover:bg-white/10 transition-colors">
                  <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">
                    Our Tagline
                  </p>
                  <p className="text-2xl font-batangas font-bold italic text-white leading-tight">
                    "Bespoke Solution? You bet..."
                  </p>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed font-medium">
                    Because at Vahlay, every client receives a solution tailored
                    to their needs, and every employee receives the guidance
                    needed to succeed.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 border border-red-100">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-batangas font-bold text-slate-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  To empower businesses across the US and Canada with reliable
                  telecom and digital solutions through developer and Business
                  management projects while fostering a growth-oriented,
                  disciplined, and opportunity-rich workplace for our employees
                  in Bharat.
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 border border-red-100">
                  <Eye size={32} />
                </div>
                <h3 className="text-xl font-batangas font-bold text-slate-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  To become one of the most trusted and performance-driven
                  outsourcing and consulting companies globally, known for
                  quality service, strong client relationships, and a team that
                  grows together with the organization.
                </p>
              </div>
            </div>

            <div
              className="mb-16 animate-fade-in"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
                <span className="w-10 h-1 bg-red-600 rounded-full hidden sm:block"></span>
                Our Core Values
                <span className="w-10 h-1 bg-red-600 rounded-full hidden sm:block"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.1)] hover:border-red-200 transition-all group"
                  >
                    <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform origin-left">
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-batangas font-bold text-slate-900 mb-2 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mb-16 animate-fade-in"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-8 flex items-center gap-3">
                <MapPin className="text-red-600" /> Office Locations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {locations.map((loc, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-100 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                      {/* Using the SVG Flag component here */}
                      <div className="shrink-0">{loc.flag}</div>
                      <div>
                        <h4 className="font-batangas font-bold text-slate-900 leading-tight">
                          {loc.country}
                        </h4>
                        <p className="text-[10px] font-semibold text-red-600 uppercase tracking-widest mt-0.5">
                          {loc.type}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {loc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mb-16 animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Briefcase className="text-red-600" /> What We Do - Service
                Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-red-300 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all group"
                  >
                    <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-batangas font-bold text-slate-900 mb-1 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mb-16 animate-fade-in"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-10 text-center">
                Company Milestones
              </h2>
              <div className="max-w-3xl mx-auto relative border-l-2 border-red-200 ml-4 md:ml-auto md:mr-auto">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="mb-10 ml-8 relative group">
                    <div className="absolute -left-10.25 top-1 w-5 h-5 bg-white border-4 border-red-600 rounded-full group-hover:scale-125 group-hover:bg-red-600 transition-all"></div>

                    <h3 className="text-xl font-batangas font-bold text-slate-900 flex items-baseline gap-2 mb-3">
                      {milestone.year}
                      {milestone.sub && (
                        <span className="text-xs font-semibold text-red-500 uppercase tracking-widest font-poppins">
                          {milestone.sub}
                        </span>
                      )}
                    </h3>

                    <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                      <ul className="space-y-2">
                        {milestone.points.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2 text-sm text-gray-600 font-medium"
                          >
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 animate-fade-in"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="bg-slate-900 p-8 md:p-10 rounded-3xl text-white shadow-[0_8px_30px_rgba(220,38,38,0.3)] relative overflow-hidden group">
                <Quote
                  size={80}
                  className="absolute -top-4 -left-4 text-white/10 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-lg font-semibold text-red-100 uppercase tracking-widest mb-6 relative z-10 font-poppins">
                  A Welcome Message
                </h3>
                <p className="text-lg md:text-xl font-medium leading-relaxed italic relative z-10 mb-8 text-white/90">
                  Welcome to Vahlay Consulting. You are not here by accident-
                  you are here because you carry potential, ambition, and the
                  ability to grow. At Vahlay, we believe in giving opportunities
                  to those who are willing to learn, work hard, and dream
                  bigger. You will receive guidance, training, and support from
                  us-but your success will depend on your discipline, attitude,
                  and consistency. Together, we will achieve great things.
                  Welcome to the Vahlay family.
                </p>
                <div className="relative z-10 flex items-center gap-4 border-t border-white/20 pt-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl backdrop-blur-sm">
                    HK
                  </div>
                  <div>
                    <p className="font-batangas font-bold text-lg">
                      Hansal Kava
                    </p>
                    <p className="text-sm text-red-200 font-medium">
                      CEO, Vahlay Consulting
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center hover:shadow-[0_8px_30px_rgba(0,255,255,0.1)] transition-all">
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-4">
                  Your Role in Vahlay Consulting Future
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  As part of this organization, you represent professionalism,
                  communication quality, and trust. Your dedication contributes
                  directly to our company's growth and reputation in the US and
                  Canadian markets.
                </p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  We value individuals who:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {roleExpectations.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-800 bg-gray-50 p-2.5 rounded-xl border border-gray-100 hover:border-red-200 transition-colors"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-red-600 shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
                  <p className="text-red-900 font-semibold text-sm">
                    You are not just joining a company you are becoming part of
                    a growing institution with endless opportunities for the
                    right performer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isBottomReached && (
          <div className="absolute bottom-8 right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
            >
              Finish Course
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

export default AboutCompany;
