import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  CalendarDays,
  Building2,
  Wifi,
  PhoneCall,
  MonitorSmartphone,
  MessageSquare,
  Target,
  Headphones,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar4, { markLessonComplete } from "./Sidebar4";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const AlldayTraining = () => {
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
    markLessonComplete(2);
    navigate("/about-company");
  };

  const handleExit = () => {
    navigate("/");
  };

  const trainingDays = [
    {
      day: 1,
      title: "Company Introduction & Policies",
      icon: <Building2 />,
      items: [
        "Understanding Vahlay Consulting",
        "Culture & expectations",
        "Rules, discipline, and policies",
        "Salary cycle & evaluation criteria",
        "Intro to US telecom industry",
      ],
    },
    {
      day: 2,
      title: "Telecom Basics",
      icon: <Wifi />,
      items: [
        "Internet types: Fiber, High-Split, Cable",
        "Mbps vs Gbps speeds",
        "Modem, router, installation",
        "Porting phone numbers",
        "Technical terms you must know",
      ],
    },
    {
      day: 3,
      title: "Sales Process Training",
      icon: <PhoneCall />,
      items: [
        "Greeting & introduction",
        "Understanding customer needs",
        "Pitching techniques",
        "Handling objections",
        "Closing strategies",
      ],
    },
    {
      day: 4,
      title: "Buyflow & Service Qualification",
      icon: <MonitorSmartphone />,
      items: [
        "Checking service availability",
        "Infrastructure qualification (Fiber/Coax)",
        "Usage-based plan & speed selection",
        "4-step buyflow process",
        "Address precision & error prevention",
      ],
    },
    {
      day: 5,
      title: "Communication & Accent",
      icon: <MessageSquare />,
      items: [
        "US accent clarity",
        "Pace, tone, politeness",
        "Handling tough customers",
        "Mock calls with the trainer",
      ],
    },
    {
      day: 6,
      title: "Targets & Performance",
      icon: <Target />,
      items: [
        "Monthly target goals & daily tasks",
        "Internet + TV Bundling Test #1 (30 Qs)",
        "Internet + TV Bundling Test #2 (30 Qs)",
        "Performance evaluation & salary criteria",
        "Discipline & incentive scoring",
      ],
    },
    {
      day: 7,
      title: "Live Call Observation",
      icon: <Headphones />,
      items: [
        "Listening to senior agents",
        "Real customer situations",
        "Practicing pitch",
        "Shadowing live processes",
      ],
    },
    {
      day: 8,
      title: "Operation Tools & Final Assessment",
      icon: <Award />,
      items: [
        "Operation Tools: OneDrive, ERP & CRM",
        "Order numbers & tracking discipline",
        "Written process test",
        "Voice / call test",
        "Buyflow & order practice test",
      ],
    },
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
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Getting Started / 8-Day Training Program
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500 tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50"
        >
          <div className="max-w-7xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title Section */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 2
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                How the 8-Day Training Program Works
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            {/* Intro Block */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-gray-100 p-8 mb-12 flex flex-col md:flex-row items-start md:items-center gap-6 animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 border border-red-100 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <CalendarDays size={32} />
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-medium">
                  Your training program is structured to build your skills
                  step-by-step, ensuring you gain complete confidence before
                  moving to the live performance phase. Below is an overview of
                  how your 8 days will progress.
                </p>
              </div>
            </div>

            {/* 8 Days Grid - Icon Top Right */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {trainingDays.map((day) => (
                <div
                  key={day.day}
                  onClick={() => {
                    sessionStorage.setItem("last_active_sidebar", "sidebar4");
                    navigate(`/day${day.day}`, { state: { source: "sidebar4" } });
                  }}
                  className="group relative h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.15)] hover:border-red-200 flex flex-col overflow-hidden cursor-pointer"
                >
                  {/* Header Container - Fixed Min-Height for Alignment */}
                  <div className="relative z-10 flex flex-col mb-4 pb-2 border-b border-slate-50 min-h-[120px]">
                    {/* Top Row: Badge (Left) & Icon (Right) */}
                    <div className="flex justify-between items-start w-full mb-3">
                      {/* Day Badge */}
                      <span className="w-fit px-2 py-0.5 bg-red-50 border border-red-100 rounded text-[10px] font-bold uppercase tracking-widest text-red-600 mt-1">
                        Day {day.day}
                      </span>

                      {/* Icon Circle (Top Right) */}
                      <div className="relative w-12 h-12 shrink-0">
                        <div className="absolute inset-0 bg-red-600/10 rounded-full blur-md opacity-100" />
                        <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border border-red-100 text-red-600 shadow-sm transition-transform group-hover:scale-110 duration-300">
                          {React.cloneElement(day.icon, { size: 20 })}
                        </div>
                      </div>
                    </div>

                    {/* Title (Bottom of Header Section) */}
                    <h3 className="text-[15px] font-batangas font-bold text-slate-900 leading-tight">
                      {day.title}
                    </h3>
                  </div>

                  {/* List Items - Starts at exact same vertical position */}
                  <div className="relative z-10 flex-1 pt-2">
                    <ul className="space-y-3">
                      {day.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-slate-500 font-medium leading-relaxed"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-red-500 shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Note Section */}
            <div
              className="bg-slate-900 rounded-4xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in group hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,0.2)] transition-all"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="space-y-6 relative z-10 text-gray-300 font-medium leading-relaxed max-w-4xl mx-auto text-center">
                <p className="text-lg">
                  These 8 days are{" "}
                  <strong className="text-white border-b-2 border-red-600 pb-0.5">
                    crucial
                  </strong>{" "}
                  for your future at Vahlay Consulting.
                </p>
                <p>
                  Your{" "}
                  <span className="text-white font-bold">
                    behavior, learning speed, communication, and discipline
                  </span>{" "}
                  during training will form the foundation of your career here.
                  Training is not just about learning the process—it is about
                  proving your dedication to your role.
                </p>
                <div className="pt-6 mt-6 border-t border-white/10">
                  <p className="text-xl md:text-2xl text-white font-batangas font-bold">
                    We believe that with the right attitude and consistency, you
                    can build a successful, long-term career with us.
                  </p>
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

export default AlldayTraining;
