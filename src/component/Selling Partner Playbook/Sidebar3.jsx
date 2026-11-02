/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Circle,
  CheckCircle,
  Lock,
  HelpCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

// ==========================================
// 1. DATA STRUCTURE
// ==========================================
export const sidebarData = [
  {
    title: "High level overview",
    modules: [
      { id: 1, title: "Why Spectrum?", type: "lesson", path: "/why-spectrum" },
      {
        id: 2,
        title: "Benefits of Selling Spectrum",
        type: "lesson",
        path: "/benefits",
      },
    ],
  },
  {
    title: "Products",
    modules: [
      {
        id: 3,
        title: "Internet (Opt-Out Law)",
        type: "lesson",
        path: "/internet",
      },
      { id: 4, title: "Voice", type: "lesson", path: "/voice" },
      { id: 5, title: "Video", type: "lesson", path: "/video" },
      { id: 6, title: "Mobile", type: "lesson", path: "/mobile" },
    ],
  },
  {
    title: "Spectrum Offers",
    modules: [
      { id: 7, title: "Pricing", type: "lesson", path: "/pricing" },
      {
        id: 8,
        title: "Business Rules",
        type: "lesson",
        path: "/business-rules2",
      },
    ],
  },
  {
    title: "Completion",
    modules: [
      { id: 9, title: "Thank You", type: "lesson", path: "/thank-you" },
    ],
  },
];

export const allModules = sidebarData.flatMap((section) => section.modules);

// ==========================================
// 2. SAFE STORAGE UTILS
// ==========================================
const getSafeProgress = (uid) => {
  try {
    const saved = localStorage.getItem(`spectrum_playbook_progress_${uid}`);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Corrupted progress data, resetting to empty array.");
    return [];
  }
};

export const markLessonComplete = (lessonId) => {
  const uid = auth.currentUser ? auth.currentUser.uid : "guest";
  const storageKey = `spectrum_playbook_progress_${uid}`;
  const progress = getSafeProgress(uid);

  if (!progress.includes(lessonId)) {
    progress.push(lessonId);
    localStorage.setItem(storageKey, JSON.stringify(progress));
    window.dispatchEvent(new Event("lessonCompletedPlaybook"));
  }
};

// ==========================================
// 3. COMPONENT
// ==========================================
const Sidebar3 = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedIds, setCompletedIds] = useState([]);
  const [currentUid, setCurrentUid] = useState("guest");

  const [expandedSections, setExpandedSections] = useState(() => {
    const activeIdx = sidebarData.findIndex((s) =>
      s.modules.some((m) => m.path === location.pathname),
    );
    const initialState = {};
    sidebarData.forEach((_, idx) => {
      initialState[idx] = idx === activeIdx || (idx === 0 && activeIdx === -1);
    });
    return initialState;
  });

  // Sync expanded section when the route changes
  useEffect(() => {
    const activeIdx = sidebarData.findIndex((s) =>
      s.modules.some((m) => m.path === location.pathname),
    );
    if (activeIdx !== -1) {
      setExpandedSections((prev) => ({ ...prev, [activeIdx]: true }));
    }
  }, [location.pathname]);

  // Listen for user login/logout & custom completion events
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const uid = user ? user.uid : "guest";
      setCurrentUid(uid);
      setCompletedIds(getSafeProgress(uid));
    });

    const handleUpdate = () => {
      const uid = auth.currentUser ? auth.currentUser.uid : "guest";
      setCompletedIds(getSafeProgress(uid));
    };

    window.addEventListener("lessonCompletedPlaybook", handleUpdate);

    return () => {
      unsubscribeAuth();
      window.removeEventListener("lessonCompletedPlaybook", handleUpdate);
    };
  }, []);

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

    return <Circle size={18} strokeWidth={2} className={iconColor} />;
  };

  return (
    <>
      <aside
        className={`${
          isOpen
            ? "w-80 translate-x-0 border-r"
            : "w-0 -translate-x-full overflow-hidden border-none opacity-0"
        } fixed lg:relative z-40 h-screen shrink-0 bg-white border-gray-100 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none font-poppins`}
      >
        <div className="w-80 h-full flex flex-col">
          {/* Header Theme - MATCHED TO NEW DESIGN SYSTEM */}
          <div className="h-60 relative bg-slate-900 flex flex-col justify-end p-6 shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-red-600/30 to-slate-900/90"></div>
            <div className="absolute inset-0 bg-[rgba(230,173,173,0.05)] mix-blend-overlay"></div>

            <div className="relative z-10">
              <span className="inline-block px-2 py-1 mb-2 text-[9px] font-semibold tracking-widest text-red-100 bg-red-800/50 rounded border border-red-500/30 uppercase">
                Core Curriculum
              </span>
              <h2 className="text-white font-batangas font-bold text-xl leading-tight mb-4">
                Spectrum Playbook
              </h2>
              <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest text-red-200 mb-2 uppercase">
                <span>{progressPercentage}% COMPLETE</span>
                <span>
                  {completedIds.length}/{allModules.length} STEPS
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-700 shadow-[0_0_10px_rgba(220,38,38,0.6)]"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <button className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-all cursor-pointer">
              <Search size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
            {sidebarData.map((section, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-[0.15em] transition-colors cursor-pointer"
                >
                  <span>{section.title}</span>
                  {expandedSections[idx] ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSections[idx]
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-2 flex flex-col">
                    {section.modules.map((item) => {
                      const isActive = location.pathname === item.path;
                      // Safe check against undefined/null arrays
                      const isCompleted = completedIds?.includes(item.id);
                      const index = allModules.findIndex(
                        (m) => m.id === item.id,
                      );
                      const isLocked =
                        index > 0 &&
                        !completedIds?.includes(allModules[index - 1].id);

                      return (
                        <button
                          key={item.id}
                          disabled={isLocked}
                          onClick={() => handleItemClick(item.path, isLocked)}
                          className={`w-full relative flex flex-col px-6 py-4 text-left transition-all border-l-4 ${
                            isActive
                              ? "bg-red-50 border-red-600"
                              : "border-transparent hover:bg-gray-50"
                          } ${isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 shrink-0">
                              {renderIcon(
                                item,
                                isCompleted,
                                isActive,
                                isLocked,
                              )}
                            </div>
                            <div className="flex-1">
                              <span
                                className={`text-sm font-semibold leading-snug transition-colors ${
                                  isActive ? "text-slate-900" : "text-gray-600"
                                }`}
                              >
                                {item.title}
                              </span>
                              {item.note && (
                                <p className="text-[10px] text-gray-400 mt-1 italic flex items-center gap-1 font-medium">
                                  {isLocked && <Lock size={10} />} {item.note}
                                </p>
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
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </>
  );
};

export default Sidebar3;
