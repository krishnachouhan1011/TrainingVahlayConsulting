import React, { useState, useEffect, memo } from "react";
import {
  Menu,
  User,
  Bell,
  LogOut,
  X,
  GraduationCap,
  Bot,
  Sparkles,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// --- Firebase Imports ---
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase-config";

import logo1 from "../assets/logo1.png";
import logoRing from "../assets/logorings.png";

const Navbar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  // --- Auth State ---
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("Trainee");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // 1. Sync Username from LocalStorage
  useEffect(() => {
    const fetchName = () => {
      const storedName = localStorage.getItem("spectrum_username");
      if (storedName) {
        setUserName(storedName);
      }
    };

    fetchName();
    window.addEventListener("usernameUpdated", fetchName);
    return () => window.removeEventListener("usernameUpdated", fetchName);
  }, []);

  // 2. Handle Auth State, Fetch Role, and AUTO-LOGOUT Listener
  useEffect(() => {
    let unsubscribeDoc = null; // Holds the real-time Firestore listener

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // --- REAL-TIME LISTENER ---
        const userDocRef = doc(db, "users", currentUser.uid);

        unsubscribeDoc = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

            // Check Admin Role
            setIsAdmin(userData.role === "admin");

            // 🚨 AUTO-LOGOUT LOGIC 🚨
            if (userData.isApproved === false && userData.role !== "admin") {
              console.log("Access revoked by admin. Logging out.");
              await signOut(auth);
              localStorage.removeItem("spectrum_username");
              setUser(null);
              setUserName("Trainee");
              navigate("/login", { replace: true });
              alert("Your access has been revoked by an administrator.");
            }
          } else {
            setIsAdmin(false);
          }
        });

        // Sync Name
        const storedName = localStorage.getItem("spectrum_username");
        if (!storedName) {
          const fallback =
            currentUser.displayName || currentUser.email.split("@")[0];
          localStorage.setItem("spectrum_username", fallback);
          setUserName(fallback);
        }
      } else {
        setIsAdmin(false);
        // Clean up the real-time listener if user logs out manually
        if (unsubscribeDoc) unsubscribeDoc();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, [navigate]);

  const tabs = [
    { id: "All Courses/Curriculum", label: "All Courses" },
    { id: "In Progress", label: "In Progress" },
    { id: "Completed", label: "Completed" },
    { id: "My Certificates", label: "Certificates" },
  ];

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("spectrum_username");
      setUser(null);
      setUserName("Trainee");
      setShowLogoutConfirm(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] font-poppins text-slate-900 w-full overflow-hidden">
        <div className="mx-auto px-3 sm:px-6 lg:px-8 max-w-full">
          <div className="flex items-center justify-between h-16 sm:h-20 relative">
            
            {/* Left: Branding (Logo & Vahlay Consulting) */}
            <div className="flex-1 flex items-center justify-start min-w-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-4 md:gap-6 group shrink-0">
                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                  <img
                    src={logo1}
                    alt="Logo"
                    className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto object-contain relative z-10"
                  />
                  {/* Spinning Ring */}
                  <motion.img
                    src={logoRing}
                    className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto absolute top-0 left-0 object-contain z-0"
                    alt="Rings"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 12,
                    }}
                  />
                </motion.div>
                
                {/* Vahlay Consulting moved to Left Side */}
                <div className="flex flex-col justify-center border-l border-slate-200 pl-2 sm:pl-4 md:pl-6 truncate">
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-batangas font-semibold uppercase tracking-widest group-hover:text-slate-600 transition-colors truncate">
                    Vahlay Consulting
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Training Dashboard Title with BIG fonts */}
            <div className="flex-1 flex flex-col justify-center items-center text-center truncate px-2 sm:px-4">
              <Link to="/" className="group block truncate">
                <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-batangas font-bold text-slate-900 tracking-tight leading-none uppercase flex flex-col sm:flex-row sm:items-center sm:gap-2 truncate transition-colors group-hover:text-red-600">
                  <span>Training</span>
                  <span className="text-red-600 group-hover:text-slate-900 transition-colors">
                    Dashboard
                  </span>
                </h1>
              </Link>
            </div>

            {/* Right: Profile / Actions */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 md:gap-4 shrink-0">
              <div className="relative flex items-center gap-2 sm:gap-3">
                {/* AI Training Assistant Button */}
                <button
                  onClick={() => navigate("/ai-trainer")}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-slate-900 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full hover:from-red-700 hover:to-slate-800 transition-all shadow-sm hover:shadow-[0_4px_15px_rgba(220,38,38,0.3)] cursor-pointer flex items-center gap-1.5 whitespace-nowrap hover:-translate-y-0.5"
                  title="Vahlay AI Training Assistant"
                >
                  <Bot size={15} className="text-white" />
                  <span className="hidden sm:inline">AI Trainer</span>
                  <Sparkles size={12} className="text-amber-300 animate-pulse" />
                </button>

                {user ? (
                  <>
                    {isAdmin && (
                      <button
                        onClick={() => navigate("/admin")}
                        className="px-3 sm:px-5 py-1.5 sm:py-2 bg-slate-900 text-white text-[10px] sm:text-xs font-batangas font-bold uppercase tracking-widest rounded-full hover:bg-red-600 transition-all shadow-sm hover:shadow-[0_4px_15px_rgba(220,38,38,0.3)] cursor-pointer whitespace-nowrap hover:-translate-y-0.5"
                      >
                        <span className="hidden sm:inline">Admin Panel</span>
                        <span className="sm:hidden">Admin</span>
                      </button>
                    )}

                    {/* Profile Icon */}
                    <button
                      onClick={handleProfileClick}
                      className="p-2 text-slate-600 bg-white border border-slate-200 rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] hover:border-red-200 hover:text-red-600 flex items-center justify-center group"
                      title={`Profile (${userName})`}
                    >
                      <User
                        size={20}
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
                        strokeWidth={2}
                      />
                    </button>

                    {/* Logout Icon */}
                    <button
                      onClick={handleLogoutClick}
                      className="p-2 text-slate-400 bg-white border border-transparent rounded-full transition-all duration-300 cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-100 flex items-center justify-center group"
                      title="Logout"
                    >
                      <LogOut
                        size={20}
                        strokeWidth={2}
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="px-4 sm:px-6 py-2 bg-white text-slate-900 border border-slate-200 hover:border-red-200 hover:text-red-600 text-[10px] sm:text-sm font-batangas font-bold transition-all cursor-pointer whitespace-nowrap rounded-full shadow-sm hover:shadow-md"
                    >
                      Log In
                    </button>
                  </>
                )}
              </div>
            </div>
            
          </div>

          {/* Sub Navigation Tabs (Moved to Left Side) */}
          {activeTab && (
            <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar pt-1 pb-1 justify-end px-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === "All Courses/Curriculum") {
                      navigate("/");
                    }
                    setActiveTab(tab.id);
                  }}
                  className={`pb-3 px-1 border-b-[3px] text-[10px] sm:text-[11px] md:text-xs font-batangas font-extrabold uppercase tracking-widest transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-slate-400 hover:text-slate-900 hover:border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Logout Modal - Partner Card Theme */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-poppins">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-4xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden border border-slate-100"
            >
              <div className="bg-slate-900 p-6 sm:p-8 flex justify-between items-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:20px_20px]"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full blur-2xl"></div>

                <h3 className="font-batangas font-bold text-lg sm:text-xl flex items-center gap-3 relative z-10">
                  <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10">
                    <LogOut size={20} className="w-5 h-5" />
                  </div>
                  Sign Out
                </h3>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer relative z-10"
                >
                  <X size={20} className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 text-center">
                <p className="text-slate-600 font-medium text-sm sm:text-base mb-8 leading-relaxed">
                  Are you sure you want to sign out of your learning dashboard?
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3.5 px-4 bg-white text-slate-700 font-batangas font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="flex-1 py-3.5 px-4 bg-red-600 text-white font-batangas font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:bg-slate-900 shadow-lg shadow-red-600/20 hover:shadow-[0_8px_25px_-5px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    Yes, Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Navbar);