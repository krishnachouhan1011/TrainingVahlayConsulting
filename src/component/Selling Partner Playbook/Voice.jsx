import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Phone,
  Shield,
  Handshake,
  Layers,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

// ==========================================
// CUSTOM COMPONENT: INTERACTIVE VOICE MARKER
// ==========================================
const VoiceMarker = ({
  number,
  title,
  description,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center relative group w-full md:w-1/4 p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-">
          {Icon}
        </div>
        <h3 className="text-lg font-batangas font-bold text-slate-900 text-center h-14 transition-colors">
          {title}
        </h3>
      </div>

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

      <div
        className={`
                absolute top-45 w-[95%] bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 z-20 transition-all duration-300 origin-top
                ${isActive ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"}
            `}
      >
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-200 rotate-45"></div>
        <h4 className="font-batangas font-bold text-slate-900 mb-2">{title}</h4>
        <div
          className="text-sm font-medium text-gray-600 leading-relaxed font-poppins"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
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

const Voice = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeVoiceMarker, setActiveVoiceMarker] = useState(null);
  const [activeAddOnTab, setActiveAddOnTab] = useState(0);

  const navigate = useNavigate();
  const tabsContainerRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  const handleContinue = () => {
    markLessonComplete(4);
    navigate("/video");
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

  const voiceBenefitsData = [
    {
      id: 1,
      title: "Reliable Service",
      description:
        "Reliable, crystal-clear service with <strong>24/7/365 U.S. based customer support</strong>.",
      icon: <Phone size={56} strokeWidth={1.5} />,
    },
    {
      id: 2,
      title: "More Features",
      description:
        "Unlimited local and long distance calling with more than <strong>35 free features</strong> included.",
      icon: <Layers size={56} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: "Highly Compatible",
      description:
        "Compatible with most <strong>security systems</strong> and <strong>point-of-sale</strong> (POS) systems.",
      icon: <Shield size={56} strokeWidth={1.5} />,
    },
    {
      id: 4,
      title: "No Contracts",
      description:
        "<strong>No</strong> added taxes, hidden fees, contracts or surprises.",
      icon: <Handshake size={56} strokeWidth={1.5} />,
    },
  ];

  const addOnsTabsData = [
    {
      title: "Voicemail",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-lg mb-4 text-slate-900">
            Retrieve voice messages anywhere, anytime with our easy-to-use
            Voicemail service.
          </h4>
          <ul className="space-y-3 font-medium text-gray-600 list-disc pl-5">
            <li>
              Single Voicemail and Group Voicemail boxes have a unique email
              address and a unique PIN per box.
            </li>
            <li>
              Shared Voicemail boxes have a shared email address and a shared
              PIN across all phone lines that access the shared mailbox.
            </li>
            <li>
              Our free web portal, Voice Manager, enables customers to change
              voicemail settings and listen to, forward, delete and save
              voicemail to file.
            </li>
            <li>
              Access voicemail messages online through the free Voice Manager
              web portal.
            </li>
            <li>
              Receive voicemail notifications by email with or without an audio
              file attachment.
            </li>
            <li>
              Choose from several greeting options: all calls, no answer, busy,
              out-of-hours, extended absence (listen only) and recorded name
              only.
            </li>
            <li>
              Set the number of rings callers hear before voicemail picks up.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Toll Free Service",
      content: (
        <div>
          <h4 className="font-batangas font-bold text-lg mb-4 text-slate-900">
            Growing a business is important. With our Toll-Free Service we make
            it easy for business contacts and customers to stay connected, with
            no extra charge.
          </h4>
          <ul className="space-y-3 font-medium text-gray-600 list-disc pl-5">
            <li>
              Customers can keep their existing toll-free number or select a new
              one at no extra charge.
            </li>
            <li>
              Customize the routing options based on call origination and
              termination.
            </li>
            <li>
              Accessible to 50 U.S. states, Canada, Puerto Rico, Guam and
              Saipan.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Spectrum Business Connect",
      content: (
        <div className="space-y-4 font-medium text-gray-600">
          <p className="text-lg leading-relaxed text-slate-900">
            A business communications system with enterprise-grade voice, fax,
            text, online meetings, conferencing, and collaboration.
          </p>
          <p className="leading-relaxed">
            Customers can easily connect their office, remote and mobile
            employees under one phone system, regardless of their location.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      <Sidebar3
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
              Products / Voice
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
            <div className="mb-10 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-red-600 uppercase tracking-widest">
                  PAGE 4 of 14
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Voice
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            <div className="relative h-100 lg:h-125 rounded-3xl overflow-hidden mb-16 shadow-lg animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1520923642038-b4259acecbd7?q=80&w=2070&auto=format&fit=crop"
                alt="Business Voice Solutions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center animate-fade-in delay-200 px-4 mb-24">
              <div className="w-16 h-1 bg-red-600 mx-auto mb-8 rounded-full"></div>
              <blockquote className="mb-8">
                <p className="text-2xl md:text-3xl lg:text-[32px] font-batangas text-slate-900 leading-normal">
                  "Businesses can stay connected with our crystal-clear business
                  phone service. We offer a variety of calling plans with
                  customizable options to fit all business needs, with advanced
                  business phone features at low or no extra cost."
                </p>
              </blockquote>
              <div className="w-16 h-1 bg-red-600 mx-auto mt-8 rounded-full"></div>
            </div>

            {/* Voice Benefits Section */}
            <div className="mb-24 animate-fade-in relative">
              <div className="absolute top-0 left-0 w-full h-40 bg-slate-900 rounded-t-3xl opacity-100 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-red-600/30 to-transparent mix-blend-overlay"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-size-[30px_30px]"></div>
              </div>
              <div className="pt-12 ">
                <h1 className="text-4xl font-batangas px-8 font-bold text-white mb-16 drop-shadow-md">
                  Voice
                </h1>
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-12 relative z-0">
                  <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                    Benefits
                  </h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-16 max-w-4xl">
                    Spectrum Business makes it easy to keep employees connected
                    with Voice service that includes:
                  </p>
                  <div className="flex flex-col md:flex-row justify-around items-start relative pb-48">
                    <div className="hidden md:block absolute top-13 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10"></div>
                    {voiceBenefitsData.map((benefit, index) => (
                      <VoiceMarker
                        key={benefit.id}
                        number={index + 1}
                        title={benefit.title}
                        description={benefit.description}
                        icon={benefit.icon}
                        isActive={activeVoiceMarker === benefit.id}
                        onClick={() =>
                          setActiveVoiceMarker(
                            activeVoiceMarker === benefit.id
                              ? null
                              : benefit.id,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Spectrum Business Connect Section */}
            <div className="mb-20 animate-fade-in bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Spectrum Business Connect
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8">
                Spectrum Business Connect is Spectrum's enhanced SMB solution
                which keeps customers connected to their business from anywhere,
                with reliable connectivity and the fastest overall speeds1.
                Spectrum Business Connect with RingCentral, also known as
                Spectrum Business Connect, is our most advanced SMB voice
                offering, perfect for companies who need more than just phone &
                email. Businesses will get a broad range of messaging, video and
                phone features "" all in one simple, unified platform. Plus,
                customers can optimize their Spectrum bundle and mobility
                features when they have both Spectrum Business Connect and
                Spectrum Business Mobile.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8 gap-6">
                <div className="flex-1">
                  <h4 className="font-batangas font-bold text-slate-900 text-lg mb-2">
                    Spectrum Business Connect training
                  </h4>
                  <p className="text-gray-600 font-medium">
                    For more information on Spectrum Business Connect, view this
                    training.
                  </p>
                </div>
                <a
                  href="https://core-charter.bravais.com/s/GRS9ifhaSoQst6dlnenA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all shadow-md w-full sm:w-auto text-center cursor-pointer"
                >
                  Training <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Business Voice Features Section */}
            <div className="mb-24 animate-fade-in">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Business Voice Features
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10 max-w-4xl">
                Only Spectrum Business Voice offers{" "}
                <strong className="text-slate-900">over 35+ free</strong>{" "}
                advanced calling features included with{" "}
                <strong className="text-slate-900">every phone package</strong>.
              </p>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-175">
                    <thead>
                      <tr>
                        <th className="w-1/3 bg-slate-900 text-white font-batangas font-bold p-5 text-center border-r border-slate-800">
                          Seamless accessibility
                        </th>
                        <th className="w-1/3 bg-slate-900 text-white font-batangas font-bold p-5 text-center border-r border-slate-800">
                          Privacy
                        </th>
                        <th className="w-1/3 bg-slate-900 text-white font-batangas font-bold p-5 text-center">
                          Identification/Record keeping
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-poppins font-medium">
                      <tr>
                        <td className="bg-gray-50 p-6 align-top border-r border-white">
                          <ul className="space-y-1.5 text-gray-700 text-sm">
                            <li> Call Return</li>
                            <li> Forwarding No Answer/Busy</li>
                            <li> Call Forwarding Always</li>
                            <li> Call Pickup*</li>
                            <li> Call Waiting</li>
                            <li> Call Transfer</li>
                            <li> Directed Call Pickup*</li>
                            <li> Voicemail</li>
                            <li> Speed Dial</li>
                            <li> Call Waiting Cancel</li>
                            <li> Hunt Groups</li>
                            <li> Simultaneous Ring*</li>
                            <li> 3-Way Calling</li>
                            <li> 3-Way Call Transfer</li>
                          </ul>
                        </td>
                        <td className="bg-gray-100 p-6 align-top border-r border-white">
                          <ul className="space-y-1.5 text-gray-700 text-sm">
                            <li> Selective Call Rejection</li>
                            <li> Caller ID Blocking</li>
                            <li> Caller ID Unblocking per Call</li>
                            <li> Do Not Disturb*</li>
                            <li> Selective Call Acceptance*</li>
                          </ul>
                        </td>
                        <td className="bg-gray-50 p-6 align-top">
                          <ul className="space-y-1.5 text-gray-700 text-sm">
                            <li> Caller ID</li>
                            <li> Call Waiting ID</li>
                            <li> Call Forwarding Ring Splash</li>
                            <li> Call Logs</li>
                            <li> Fax Mailbox*</li>
                            <li> Fax to Email*</li>
                            <li> Voicemail to Email</li>
                            <li> Voicemail to Text</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/3 bg-slate-900 text-white font-batangas font-bold p-5 text-left pl-6 border-r border-slate-800">
                          Professional presence
                        </th>
                        <th className="w-1/3 bg-slate-900 text-white font-batangas font-bold p-5 text-center border-r border-slate-800">
                          Business continuity
                        </th>
                        <th className="w-1/3 bg-slate-900 text-white font-batangas font-bold p-5 text-center">
                          Customization
                        </th>
                      </tr>
                      <tr>
                        <td className="bg-gray-50 p-6 align-top border-r border-white">
                          <ul className="space-y-1.5 text-gray-700 text-sm">
                            <li> Auto Attendant*</li>
                            <li> Hold Music*</li>
                            <li> Caller ID Custom*</li>
                            <li> Extension Dialing*</li>
                            <li> Call Hold*</li>
                          </ul>
                        </td>
                        <td className="bg-gray-100 p-6 align-top border-r border-white">
                          <ul className="space-y-1.5 text-gray-700 text-sm">
                            <li> Battery Backup</li>
                            <li> Call Forwarding Unavailable*</li>
                            <li> Call Forwarding Selective*</li>
                            <li> Intercept Message*</li>
                            <li> Automatic Callback*</li>
                          </ul>
                        </td>
                        <td className="bg-gray-50 p-6 align-top">
                          <ul className="space-y-1.5 text-gray-700 text-sm">
                            <li> PIN Resets/Changes</li>
                            <li> PIN Skip</li>
                            <li> Voicemail Setup</li>
                            <li>Call Forwarding (Remote Access via Portal)</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white p-4 text-sm text-gray-500 font-medium">
                  *Not available in all markets
                </div>
              </div>
            </div>

            {/* ðŸ'‡ NEW: Business Voice Add-Ons Section */}
            <div className="mb-20 animate-fade-in">
              {/* Section Banner Image */}
              <div className="w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-12 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
                  alt="Additional Voice Features"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Business Voice Add-Ons
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10">
                Review the information below to learn more about the great
                benefits Spectrum Business Voice can provide.
              </p>

              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                {/* Tab Navigation */}
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
                    {addOnsTabsData.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveAddOnTab(index)}
                        className={`h-full px-8 whitespace-nowrap text-xs font-semibold uppercase tracking-widest flex items-center justify-center transition-all border-r border-gray-100 min-w-50 cursor-pointer
                                                                                    ${
                                                                                      activeAddOnTab ===
                                                                                      index
                                                                                        ? "bg-white text-red-600 border-t-4 border-t-red-600"
                                                                                        : "text-gray-500 hover:bg-gray-100 hover:text-slate-900"
                                                                                    }`}
                      >
                        {tab.title}
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
                <div className="p-10 md:p-14 min-h-80 animate-fade-in">
                  {addOnsTabsData[activeAddOnTab].content}
                </div>
              </div>
            </div>
          </div>
        </div>

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

export default Voice;
