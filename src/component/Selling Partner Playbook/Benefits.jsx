 
import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Users,
  Wrench,
  TrendingUp,
  Laptop,
  Phone,
  Server,
  Tv,
  Smartphone,
  RefreshCw,
  Star,
  Video,
  Gift,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the sidebar and progress helper
import Sidebar3, { markLessonComplete } from "./Sidebar3";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Benefits = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [flippedCards, setFlippedCards] = useState({}); // Tracks Product Cards
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  const handleContinue = () => {
    markLessonComplete(2);
    navigate("/internet"); // Navigate to the next lesson (Internet)
  };

  const handleExit = () => {
    navigate("/");
  };

  // Toggle Flip Card
  const handleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  // Data for Product Flip Cards (Fixed Networking Content)
  const productCards = [
    {
      title: "Internet",
      icon: <Laptop size={56} strokeWidth={1.5} />,
      color: "text-slate-900",
      backTitle: "Deliver more speed and reliability to your clients",
      points: [
        "Speeds starting at 300Mbps over coax and up to 1 Gig with Spectrum Business Internet Gig",
        "Dedicated, high performance Fiber Internet",
        "Fully managed solutions for increased efficiencies",
        "Wireless Internet Backup so businesses are always up and running",
      ],
    },
    {
      title: "Voice",
      icon: <Phone size={56} strokeWidth={1.5} />,
      color: "text-red-600",
      backTitle: "Clearer, more reliable business calling",
      points: [
        "Advanced business features and unlimited calling",
        "Unified communications streamlines calling across devices",
      ],
    },
    {
      title: "Networking",
      icon: <Server size={56} strokeWidth={1.5} />,
      color: "text-slate-700",
      backTitle: "Added connectivity across town, nationwide and in the Cloud",
      points: [
        "Ethernet services that are fast, private, and scalable",
        "Managed Security, Managed WiFi and Managed Router",
        "Cloud services that securely connect end users and applications",
      ],
    },
    {
      title: "TV",
      icon: <Tv size={56} strokeWidth={1.5} />,
      color: "text-slate-900",
      backTitle: "Improve how clients entertain and engage their customers",
      points: [
        "More HD and more free local channels",
        "Ideal for waiting rooms or breakrooms",
        "Reliable in any weather, unlike satellite",
      ],
    },
    {
      title: "Mobile",
      icon: <Smartphone size={56} strokeWidth={1.5} />,
      color: "text-slate-900",
      backTitle: "Provide a reliable wireless connection for less",
      points: [
        "The fastest overall speeds, and the most reliable - coast to coast",
        "Savings of up to 60% over current providers",
        "Mix and match Unlimited and By The Gig plans to meet client's needs",
      ],
    },
  ];

  // Data for Product Navigation List
  const productNavLinks = [
    {
      title: "Internet",
      description:
        "This section of the playbook goes into detail about our Internet features and products",
      path: "/internet",
      btnText: "INTERNET",
    },
    {
      title: "Voice",
      description:
        "This section of the playbook goes into detail about our Voice features and products",
      path: "/voice",
      btnText: "VOICE",
    },
    {
      title: "Video",
      description:
        "This section of the playbook goes into detail about our Video features and products",
      path: "/video",
      btnText: "VIDEO",
    },
    {
      title: "Mobile",
      description:
        "This section of the playbook goes into detail about our Mobile features and products",
      path: "/mobile",
      btnText: "MOBILE",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar3
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
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              High Level Overview / Benefits
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500 tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 rounded-full hover:bg-red-50 cursor-pointer"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 2
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Benefits of Selling Spectrum
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* 1. Spectrum is Simply Better */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row mb-16 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Partner Success
                  </span>
                </div>
                <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-4">
                  Spectrum is Simply Better
                </h2>
                <p className="text-gray-600 font-medium leading-relaxed mb-4">
                  Enjoy the benefits of working with an experienced partner that
                  is dedicated to your success. Spectrum is here to help you
                  maximize every sale, meet your needs and offer you advanced
                  solutions you can rely on!
                </p>
              </div>
            </div>

            {/* 3. FLIP CARD SECTION */}
            <div className="mb-12 border-t pt-16 border-gray-200">
              <div className="mb-12">
                <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-2">
                  All the Services Your Clients Demand
                </h2>
                <h3 className="text-xl font-batangas font-bold text-red-600 mb-4">
                  All From One Partner!
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed max-w-3xl">
                  From small business start-ups to large businesses, Spectrum
                  helps you offer solutions that do not just meet customer
                  expectations — they exceed them. Flip the cards below to learn
                  more about each product and service Spectrum offers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center md:place-items-stretch">
                {productCards.map((card, index) => (
                  <div
                    key={index}
                    className={`relative w-full h-85 cursor-pointer group perspective 
                                            ${index >= 3 ? "md:col-span-1 md:col-start-auto" : ""} 
                                            ${index === 3 ? "md:col-start-1 md:ml-auto lg:ml-0" : ""} 
                                            ${index === 4 ? "md:col-start-2 md:mr-auto lg:mr-0" : ""}
                                        `}
                    onClick={() => handleFlip(index)}
                  >
                    <div
                      className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${
                        flippedCards[index] ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* Front */}
                      <div className="absolute inset-0 backface-hidden bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] group-hover:border-red-200 transition-all flex flex-col items-center justify-center p-6">
                        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden rounded-tl-2xl">
                          <div className="absolute top-0 left-0 w-8 h-8 bg-red-600 -translate-x-1/2 -translate-y-1/2 rotate-45 transform origin-center scale-[3]"></div>
                        </div>
                        <div
                          className={`mb-6 ${card.color} group-hover:scale-110 transition-transform duration-500`}
                        >
                          {card.icon}
                        </div>
                        <h3 className="text-xl font-batangas font-bold text-slate-900 tracking-tight transition-colors">
                          {card.title}
                        </h3>
                        <div className="absolute bottom-4 right-4 text-gray-300 transition-colors">
                          <RefreshCw size={18} />
                        </div>
                      </div>
                      {/* Back */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 text-white rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.3)] p-8 flex flex-col justify-center border border-slate-800">
                        <h4 className="font-batangas font-bold text-lg mb-4 text-red-400 leading-tight">
                          {card.backTitle}
                        </h4>
                        <ul className="space-y-3 font-poppins">
                          {card.points.map((point, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs md:text-sm font-medium leading-relaxed opacity-90 text-gray-200"
                            >
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="absolute bottom-4 right-4 text-white/30">
                          <RefreshCw size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. PRODUCT NAVIGATION LINKS */}
            <div className="mb-16 mt-16 pt-10 border-t border-gray-200">
              <h2 className="text-2xl font-batangas font-bold text-slate-900 mb-6">
                Detailed Product Information
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed max-w-4xl mb-8">
                To learn more about our great products and services, refer to
                the Products section within this playbook by clicking on the
                links below. You can navigate back to this section by using the
                menu on the left-hand side of the screen.
              </p>
              <div className="space-y-6">
                {productNavLinks.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-center bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group"
                  >
                    <div className="mb-4 md:mb-0 md:mr-8 text-center md:text-left">
                      <h3 className="text-lg font-batangas font-bold text-slate-900 mb-2 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(item.path)}
                      className="bg-red-600 text-white font-semibold py-3 px-10 rounded-full shadow-lg shadow-red-600/20 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all uppercase tracking-widest text-sm min-w-40 cursor-pointer"
                    >
                      {item.btnText}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. EVENTS AND MARKETING SECTION */}
            <div className="mb-8 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-8 text-center">
                Events and Marketing
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Card 1: Briefing Sessions */}
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                  <div className="bg-red-50 border border-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-red-600 group-hover:scale-110 transition-transform">
                    <Users size={28} />
                  </div>
                  <h3 className="text-xl font-batangas font-bold text-slate-900 mb-3 transition-colors">
                    Partner Briefing Sessions
                  </h3>
                  <p className="text-gray-600 font-medium text-sm leading-relaxed">
                    Spectrum's Authorized Selling Partners have regular
                    opportunities to learn, network, and socialize with Spectrum
                    leadership and partner peers. Learn about new product
                    launches, promotional offers, and lots more, directly from
                    the experts. Previous sessions have been held at golf
                    courses, hotels, and other fun venues across our footprint.
                  </p>
                </div>

                {/* Card 2: Webinars */}
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                  <div className="bg-red-50 border border-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-red-600 group-hover:scale-110 transition-transform">
                    <Video size={28} />
                  </div>
                  <h3 className="text-xl font-batangas font-bold text-slate-900 mb-3 transition-colors">
                    Monthly Program Webinars
                  </h3>
                  <p className="text-gray-600 font-medium text-sm leading-relaxed">
                    Authorized Selling Partners are encouraged to attend a
                    monthly program webinar to learn about the latest process
                    and policy updates. As well as the latest sales tools and
                    selling tips to help make the most out of every opportunity.
                  </p>
                </div>

                {/* Card 3: Appreciation */}
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                  <div className="bg-red-50 border border-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-red-600 group-hover:scale-110 transition-transform">
                    <Gift size={28} />
                  </div>
                  <h3 className="text-xl font-batangas font-bold text-slate-900 mb-3 transition-colors">
                    Partner Appreciation
                  </h3>
                  <p className="text-gray-600 font-medium text-sm leading-relaxed">
                    We like to show our appreciation for our partners with
                    special event opportunities throughout the year. Past
                    partner appreciation events have included holiday parties at
                    exclusive venues, sporting events and concerts, golf
                    outings, and lots more.
                  </p>
                </div>
              </div>

              {/* Closing Statement */}
              <div className="bg-slate-900 text-white p-8 rounded-3xl text-center shadow-xl relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
                <h3 className="text-2xl font-batangas font-bold mb-4 relative z-10 transition-colors">
                  We look forward to hosting you!
                </h3>
                <p className="text-gray-300 font-medium max-w-2xl mx-auto mb-6 relative z-10 leading-relaxed">
                  Your partnership means so much to us and we look forward to
                  hosting you at an event in the future! For more information
                  about these events, reach out to your Channel Manager.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action - Only show when bottom reached */}
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
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
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

export default Benefits;
