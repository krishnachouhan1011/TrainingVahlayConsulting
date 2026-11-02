import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Circle,
  CheckCircle,
  Lock,
  HelpCircle,
  Award,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config"; // Ensure correct path

// ==========================================
// 1. DATA STRUCTURE
// ==========================================
// eslint-disable-next-line react-refresh/only-export-components
export const sidebarData = [
  {
    title: "Introduction",
    modules: [
      {
        id: 1,
        title: "Lesson Outcomes",
        type: "lesson",
        path: "/introduction",
      },
    ],
  },
  {
    title: "Overview",
    modules: [
      {
        id: 2,
        title: "What's changing?",
        type: "lesson",
        path: "/whats-changing",
      },
      {
        id: 3,
        title: "Price Guarantees & Bundles",
        type: "lesson",
        path: "/price-guarantees",
      },
      {
        id: 4,
        title: "Spectrum Mobile Multi-Line Discounts",
        type: "lesson",
        path: "/mobile-discounts",
      },
    ],
  },
  {
    title: "Business Rules",
    modules: [
      {
        id: 5,
        title: "Business Rules",
        type: "lesson",
        path: "/business-rules",
      },
      {
        id: 6,
        title: "Acquisition Strategy",
        type: "lesson",
        path: "/acquisition-strategy",
      },
    ],
  },
  {
    title: "Show What You Know",
    modules: [
      {
        id: 8,
        title: "Show What You Know",
        type: "quiz",
        note: "Must pass quiz before continuing",
        path: "/quiz",
      },
    ],
  },
  {
    title: "Summary",
    modules: [
      {
        id: 9,
        title: "Congratulations!",
        type: "certificate",
        note: "Unavailable until complete",
        path: "/summary",
      },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const allModules = sidebarData.flatMap((section) => section.modules);

// UPDATED: Now uses User-Specific keys
// eslint-disable-next-line react-refresh/only-export-components
export const markLessonComplete = (lessonId) => {
  const uid = auth.currentUser ? auth.currentUser.uid : "guest";
  const storageKey = `spectrum_progress_${uid}`;

  const saved = localStorage.getItem(storageKey);
  let progress = saved ? JSON.parse(saved) : [];

  if (!progress.includes(lessonId)) {
    progress.push(lessonId);
    localStorage.setItem(storageKey, JSON.stringify(progress));
    window.dispatchEvent(new Event("lessonCompleted"));
  }
};

// ==========================================
// 3. COMPONENT
// ==========================================
const Sidebar2 = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedIds, setCompletedIds] = useState([]);
  const [, setCurrentUid] = useState("guest");

  const [expandedSections, setExpandedSections] = useState(() => {
    const activeSectionIndex = sidebarData.findIndex((s) =>
      s.modules.some((m) => m.path === location.pathname),
    );
    const initialState = {};
    sidebarData.forEach((_, idx) => {
      initialState[idx] =
        idx === activeSectionIndex || (idx === 0 && activeSectionIndex === -1);
    });
    return initialState;
  });

  // UPDATED: Listen for user login/logout to load correct progress
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const uid = user ? user.uid : "guest";
      setCurrentUid(uid);
      const saved =
        JSON.parse(localStorage.getItem(`spectrum_progress_${uid}`)) || [];
      setCompletedIds(saved);
    });

    const handleUpdate = () => {
      const uid = auth.currentUser ? auth.currentUser.uid : "guest";
      setCompletedIds(
        JSON.parse(localStorage.getItem(`spectrum_progress_${uid}`)) || [],
      );
    };

    window.addEventListener("lessonCompleted", handleUpdate);
    return () => {
      unsubscribeAuth();
      window.removeEventListener("lessonCompleted", handleUpdate);
    };
  }, []);

  useEffect(() => {
    const activeSectionIndex = sidebarData.findIndex((section) =>
      section.modules.some((m) => m.path === location.pathname),
    );
    if (activeSectionIndex !== -1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedSections((prev) => ({ ...prev, [activeSectionIndex]: true }));
    }
  }, [location.pathname]);

  const progressPercentage =
    Math.round((completedIds.length / allModules.length) * 100) || 0;

  const toggleSection = (idx) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleItemClick = (path, isLocked) => {
    if (!isLocked) {
      navigate(path);
      if (onClose) onClose();
    }
  };

  const renderIcon = (item, isCompleted, isActive, isLocked) => {
    if (isLocked) return <Lock size={16} className="text-gray-300" />;
    if (isCompleted)
      return <CheckCircle size={18} className="text-green-500" />;
    const iconColor = isActive ? "text-red-600" : "text-gray-400";
    if (item.type === "quiz")
      return <HelpCircle size={18} className={iconColor} />;
    if (item.type === "certificate")
      return <Award size={18} className={iconColor} />;
    return <Circle size={18} strokeWidth={2} className={iconColor} />;
  };

  return (
    <>
      <aside
        className={`${isOpen ? "w-80 translate-x-0 border-r" : "w-0 -translate-x-full overflow-hidden border-none opacity-0"} fixed lg:relative top-0 left-0 z-40 h-screen shrink-0 bg-white border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none`}
      >
        <div className="w-80 h-full flex flex-col">
          <div className="h-56 relative bg-[#dc2626] flex flex-col justify-end p-6 shrink-0 group">
            <div className="absolute inset-0 bg-linear-to-br from-[#dc2626] to-[#001a30]"></div>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]"></div>
            <div className="relative z-10">
              <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold tracking-wider text-red-100 bg-red-800/50 rounded border border-red-700/50 uppercase">
                Course
              </span>
              <h2 className="text-white font-bold text-lg leading-tight mb-4 text-center">
                Updated Spectrum Business Pricing and Packaging
              </h2>
              <div className="flex items-center justify-between text-xs font-bold text-red-100 mb-2">
                <span>{progressPercentage}% Complete</span>
                <span>
                  {completedIds.length}/{allModules.length} Steps
                </span>
              </div>
              <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="bg-red-400 h-full transition-all duration-500 shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <button className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer">
              <Search size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
            {sidebarData.map((section, idx) => (
              <div
                key={idx}
                className="border-b border-gray-200/50 last:border-0 bg-white"
              >
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-gray-500  hover:bg-red-50 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>{section.title}</span>
                  {expandedSections[idx] ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections[idx] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="flex flex-col pb-2">
                    {section.modules.map((item) => {
                      const isActive = location.pathname === item.path;
                      const isCompleted = completedIds.includes(item.id);
                      const index = allModules.findIndex(
                        (m) => m.id === item.id,
                      );
                      let isLocked = false;
                      if (index > 0) {
                        const prevItem = allModules[index - 1];
                        if (!completedIds.includes(prevItem.id))
                          isLocked = true;
                      }
                      return (
                        <button
                          key={item.id}
                          disabled={isLocked}
                          onClick={() => handleItemClick(item.path, isLocked)}
                          className={`relative flex flex-col gap-1 px-4 py-3 text-left transition-all border-l-4 group ${isActive ? "bg-red-50 border-red-600" : "border-transparent hover:bg-gray-50"} ${isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                              {renderIcon(
                                item,
                                isCompleted,
                                isActive,
                                isLocked,
                              )}
                            </div>
                            <div className="flex-1">
                              <span
                                className={`text-sm font-medium leading-snug ${isActive ? "text-red-900" : "text-gray-700"}`}
                              >
                                {item.title}
                              </span>
                              {item.note && (
                                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-500 italic">
                                  {isLocked && <Lock size={10} />}
                                  {item.note}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        ></div>
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </>
  );
};

export default Sidebar2;
