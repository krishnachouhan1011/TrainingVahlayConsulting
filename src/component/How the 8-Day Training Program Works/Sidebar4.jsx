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
import { auth } from "../../firebase-config"; // Ensure correct path

// ==========================================
// 1. DATA STRUCTURE
// ==========================================
// eslint-disable-next-line react-refresh/only-export-components
export const sidebarData = [
  {
    title: "Getting Started",
    modules: [
      {
        id: 1,
        title: "Welcome Aboard",
        type: "lesson",
        path: "/welcome-aboard",
      },
      {
        id: 2,
        title: "How the 8-Day Training Program Works",
        type: "lesson",
        path: "/allday-training",
      },
    ],
  },
  {
    title: "Company Overview",
    modules: [
      {
        id: 3,
        title: "About the Company",
        type: "lesson",
        path: "/about-company",
      },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const allModules = sidebarData.flatMap((section) => section.modules);

// ==========================================
// 2. MARK PROGRESS FUNCTION
// ==========================================
// eslint-disable-next-line react-refresh/only-export-components
export const markLessonComplete = (lessonId) => {
  const uid = auth.currentUser ? auth.currentUser.uid : "guest";
  const storageKey = `spectrum_8day_progress_${uid}`;

  const saved = localStorage.getItem(storageKey);
  let progress = saved ? JSON.parse(saved) : [];

  if (!progress.includes(lessonId)) {
    progress.push(lessonId);
    localStorage.setItem(storageKey, JSON.stringify(progress));
    window.dispatchEvent(new Event("lessonCompleted8Day"));
  }
};

// ==========================================
// 3. COMPONENT
// ==========================================
const Sidebar4 = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedIds, setCompletedIds] = useState([]);
  // eslint-disable-next-line no-unused-vars
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

  // Listen for user login/logout to load correct progress
  useEffect(() => {
    const loadProgress = (uid) => {
      const saved =
        JSON.parse(localStorage.getItem(`spectrum_8day_progress_${uid}`)) || [];
      // Filter out any ghost IDs that no longer exist in our sidebarData!
      const validModuleIds = allModules.map((m) => m.id);
      const cleanedSaved = saved.filter((id) => validModuleIds.includes(id));
      setCompletedIds(cleanedSaved);
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const uid = user ? user.uid : "guest";
      setCurrentUid(uid);
      loadProgress(uid);
    });

    const handleUpdate = () => {
      const uid = auth.currentUser ? auth.currentUser.uid : "guest";
      loadProgress(uid);
    };

    window.addEventListener("lessonCompleted8Day", handleUpdate);
    return () => {
      unsubscribeAuth();
      window.removeEventListener("lessonCompleted8Day", handleUpdate);
    };
  }, []);

  const progressPercentage = Math.min(
    100,
    Math.round((completedIds.length / allModules.length) * 100) || 0,
  );

  const toggleSection = (idx) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleItemClick = (path, isLocked) => {
    if (!isLocked) {
      sessionStorage.setItem("last_active_sidebar", "sidebar4");
      navigate(path, { state: { source: "sidebar4" } });
      if (onClose) onClose();
    }
  };

  const renderIcon = (item, isCompleted, isActive, isLocked) => {
    if (isLocked) return <Lock size={16} className="text-gray-300" />;
    if (isCompleted) return <CheckCircle size={18} className="text-green-500" />;
    const iconColor = isActive ? "text-red-600" : "text-gray-400";
    if (item.type === "quiz")
      return <HelpCircle size={18} className={iconColor} />;
    return <Circle size={18} strokeWidth={2} className={iconColor} />;
  };

  return (
    <>
      <aside
        className={`${isOpen ? "w-80 translate-x-0 border-r" : "w-0 -translate-x-full overflow-hidden border-none opacity-0"} fixed lg:relative z-40 h-screen shrink-0 bg-white border-gray-100 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none font-poppins`}
      >
        <div className="w-80 h-full flex flex-col">
          <div className="h-60 relative bg-slate-900 flex flex-col justify-end p-6 shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-red-600/30 to-slate-900/90"></div>
            <div className="absolute inset-0 bg-[rgba(230,173,173,0.05)] mix-blend-overlay"></div> {/* Subtle raindrop red hint */}
            <div className="relative z-10">
              <h2 className="text-white font-batangas font-bold text-xl leading-tight mb-6">
                Vahlay Consulting: 8-Day Training
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
                  className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-semibold text-gray-500  uppercase tracking-[0.15em] transition-colors cursor-pointer"
                >
                  <span>{section.title}</span>
                  {expandedSections[idx] ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${expandedSections[idx] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="pb-2 flex flex-col">
                    {section.modules.map((item) => {
                      const isActive = location.pathname === item.path;
                      const isCompleted = completedIds.includes(item.id);
                      const index = allModules.findIndex(
                        (m) => m.id === item.id,
                      );
                      const isLocked =
                        index > 0 &&
                        !completedIds.includes(allModules[index - 1].id);
                      return (
                        <button
                          key={item.id}
                          disabled={isLocked}
                          onClick={() => handleItemClick(item.path, isLocked)}
                          className={`w-full relative flex flex-col px-6 py-4 text-left transition-all border-l-4 ${isActive ? "bg-red-50 border-red-600" : "border-transparent hover:bg-gray-50"} ${isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
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
                                className={`text-sm font-semibold leading-snug transition-colors ${isActive ? "text-slate-900" : "text-gray-600"}`}
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
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }`}</style>
    </>
  );
};

export default Sidebar4;