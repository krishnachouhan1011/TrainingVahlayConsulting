import React, { useState, useEffect, memo } from "react";
import {
  User,
  Mail,
  MapPin,
  Award,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Camera,
  CheckCircle,
  ArrowLeft,
  Check,
  X,
  Briefcase,
  Target,
  LogOut,
} from "lucide-react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- Import Firebase Auth ---
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config"; // Make sure path is correct

// Import modules counts to calculate real-time progress for ALL courses
import { allModules as PricingModules } from "../component/SpectrumBusiness/Sidebar2";
import { allModules as PlaybookModules } from "../component/Selling Partner Playbook/Sidebar3";
import { allModules as EightDayModules } from "../component/How the 8-Day Training Program Works/Sidebar4";
import { allModules as HansalModules } from "../component/TrainingModule/Sidebar5";

const Profile = () => {
  const navigate = useNavigate();

  // --- USER DATA STATE ---
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("spectrum_username") || "Trainee User";
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [realStats, setRealStats] = useState({
    pricingPercent: 0,
    playbookPercent: 0,
    eightDayPercent: 0,
    hansalPercent: 0,
    totalPossible: 0,
    totalCompleted: 0,
    overallPercent: 0,
  });

  // Fetch specific progress for all 4 courses
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const uid = user ? user.uid : "guest";

      const calculateProgress = () => {
        // Fetch real completed IDs from LocalStorage
        const pricingCompleted =
          JSON.parse(localStorage.getItem(`spectrum_progress_${uid}`)) || [];
        const playbookCompleted =
          JSON.parse(
            localStorage.getItem(`spectrum_playbook_progress_${uid}`),
          ) || [];

        // Fetch new courses and filter ghost IDs
        const raw8Day =
          JSON.parse(localStorage.getItem(`spectrum_8day_progress_${uid}`)) ||
          [];
        const valid8DayIds = EightDayModules.map((m) => m.id);
        const eightDayCompleted = raw8Day.filter((id) =>
          valid8DayIds.includes(id),
        );

        const rawHansal =
          JSON.parse(localStorage.getItem(`spectrum_hansal_progress_${uid}`)) ||
          [];
        const validHansalIds = HansalModules.map((m) => m.id);
        const hansalCompleted = rawHansal.filter((id) =>
          validHansalIds.includes(id),
        );

        // Calculate individual percentages
        const pPercent =
          Math.min(
            100,
            Math.round((pricingCompleted.length / PricingModules.length) * 100),
          ) || 0;
        const bPercent =
          Math.min(
            100,
            Math.round(
              (playbookCompleted.length / PlaybookModules.length) * 100,
            ),
          ) || 0;
        const ePercent =
          Math.min(
            100,
            Math.round(
              (eightDayCompleted.length / EightDayModules.length) * 100,
            ),
          ) || 0;
        const hPercent =
          Math.min(
            100,
            Math.round((hansalCompleted.length / HansalModules.length) * 100),
          ) || 0;

        // Calculate Overall Progress
        const totalComp =
          pricingCompleted.length +
          playbookCompleted.length +
          eightDayCompleted.length +
          hansalCompleted.length;
        const totalSteps =
          PricingModules.length +
          PlaybookModules.length +
          EightDayModules.length +
          HansalModules.length;

        setRealStats({
          pricingPercent: pPercent,
          playbookPercent: bPercent,
          eightDayPercent: ePercent,
          hansalPercent: hPercent,
          totalPossible: totalSteps,
          totalCompleted: totalComp,
          overallPercent: Math.round((totalComp / totalSteps) * 100) || 0,
        });
      };

      calculateProgress();

      // Listen for updates from ALL sidebars
      window.addEventListener("storage", calculateProgress);
      window.addEventListener("lessonCompleted", calculateProgress);
      window.addEventListener("lessonCompletedPlaybook", calculateProgress);
      window.addEventListener("lessonCompleted8Day", calculateProgress);
      window.addEventListener("lessonCompletedHansal", calculateProgress);

      return () => {
        window.removeEventListener("storage", calculateProgress);
        window.removeEventListener("lessonCompleted", calculateProgress);
        window.removeEventListener(
          "lessonCompletedPlaybook",
          calculateProgress,
        );
        window.removeEventListener("lessonCompleted8Day", calculateProgress);
        window.removeEventListener("lessonCompletedHansal", calculateProgress);
      };
    });

    return () => unsubscribeAuth();
  }, []);

  // --- HANDLE SAVE NAME ---
  const handleSaveName = () => {
    if (tempName.trim() !== "") {
      setUserName(tempName);
      localStorage.setItem("spectrum_username", tempName);
      window.dispatchEvent(new Event("usernameUpdated"));
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setIsEditingName(false);
  };


  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("spectrum_username");
      setUserName("Trainee");
      setShowLogoutConfirm(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      <Navbar activeTab="Profile" />

      <main className="max-w-6xl mx-auto px-4 py-10 relative scroll-smooth">
        {/* --- BACK BUTTON --- */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors mb-6 group w-fit animate-fade-in cursor-pointer hover:text-red-600"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Catalog
        </button>

        {/* --- TOP PROFILE HEADER --- */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-2xl overflow-hidden mb-10 animate-fade-in">
          <div className="h-40 bg-gray-600 relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[24px_24px]"></div>
            <div className="absolute inset-0 bg-[rgba(230,173,173,0.2)] mix-blend-overlay"></div>{" "}
            {/* Subtle raindrop red overlay */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end -mt-16 mb-8 gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 bg-white p-1.5 border border-gray-100 rounded-2xl shadow-lg">
                    <div className="w-full h-full bg-red-50 flex items-center justify-center text-gray-600 rounded-xl overflow-hidden">
                      <User size={64} strokeWidth={1.5} />
                    </div>
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-slate-900 transition-all hover:scale-105 cursor-pointer hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)]">
                    <Camera size={16} />
                  </button>
                </div>

                <div className="text-center md:text-left mb-2">
                  {/* --- EDITABLE USERNAME --- */}
                  {isEditingName ? (
                    <div className="flex items-center gap-2 mb-2 bg-white rounded-lg shadow-sm border border-red-200 p-1">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="text-2xl lg:text-3xl font-batangas font-bold text-red-600 bg-transparent outline-none px-2 w-full max-w-62.5"
                        autoFocus
                        onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                      />
                      <button
                        onClick={handleSaveName}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-gray-800 tracking-tight">
                      {userName}
                    </h1>
                  )}
                </div>
              </div>

              {/* Profile Actions */}
              <div className="flex flex-wrap gap-3 mb-2 justify-center">
                <button
                  onClick={() => setIsEditingName(true)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-full font-semibold text-sm hover:border-red-600 hover:shadow-[0_4px_15px_rgba(220,38,38,0.15)] transition-all cursor-pointer bg-white"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-full font-semibold text-sm hover:bg-red-600 hover:text-white hover:shadow-[0_4px_15px_rgba(220,38,38,0.25)] transition-all cursor-pointer"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-gray-100 pt-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-gray-600 text-sm font-poppins">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                    <Mail size={18} />
                  </div>
                  <span className="font-medium">
                    {userName.toLowerCase().replace(" ", ".")}@spectrum.com
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm font-poppins">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                    <MapPin size={18} />
                  </div>
                  <span className="font-medium">Ahmedabad, India</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm transition-all hover:shadow-[0_8px_30px_rgba(220,38,38,0.05)]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest font-poppins">
                      Overall Completion
                    </span>
                    <span className="text-2xl font-batangas font-bold text-red-600">
                      {realStats.overallPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-red-600 h-full transition-all duration-1000 ease-out"
                      style={{ width: `${realStats.overallPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-4 text-[11px] font-semibold uppercase tracking-widest text-gray-500 font-poppins">
                    <p>
                      {realStats.totalCompleted} / {realStats.totalPossible}{" "}
                      Steps
                    </p>
                    <p className="text-red-600">Real-time Data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- COURSE LIST SECTION --- */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-batangas font-bold text-slate-900 flex items-center gap-2 mb-2">
              <BookOpen size={24} className="text-red-600" />
              Active Curriculums
            </h2>

            {/* Real Data Card: 8-Day Training */}
            <div
              onClick={() => navigate("/welcome-aboard")}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(220,38,38,0.08)] hover:border-red-200 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <Briefcase size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-batangas font-bold text-gray-900 text-lg leading-tight transition-colors">
                      How the 8-Day Training Program Works
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase mt-1 tracking-widest font-poppins">
                      Foundation Course
                    </p>
                  </div>
                </div>
                {realStats.eightDayPercent === 100 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200 uppercase tracking-widest shrink-0 font-poppins">
                    <CheckCircle size={14} /> Complete
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-100 uppercase tracking-widest shrink-0 font-poppins">
                    {realStats.eightDayPercent > 0 && (
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
                    )}
                    In Progress
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest font-poppins">
                  <span>Progress</span>
                  <span
                    className={`font-bold ${
                      realStats.eightDayPercent === 100
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {realStats.eightDayPercent}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${realStats.eightDayPercent === 100 ? "bg-green-500" : "bg-indigo-500"}`}
                    style={{ width: `${realStats.eightDayPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Real Data Card: Hansal Kava */}
            <div
              onClick={() => navigate("/day1")}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(220,38,38,0.08)] hover:border-red-200 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <Target size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-batangas font-bold text-gray-900 text-lg leading-tight transition-colors">
                      Training Module by Hansal Kava
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase mt-1 tracking-widest font-poppins">
                      Executive Series
                    </p>
                  </div>
                </div>
                {realStats.hansalPercent === 100 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200 uppercase tracking-widest shrink-0 font-poppins">
                    <CheckCircle size={14} /> Complete
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-100 uppercase tracking-widest shrink-0 font-poppins">
                    {realStats.hansalPercent > 0 && (
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
                    )}
                    In Progress
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest font-poppins">
                  <span>Progress</span>
                  <span
                    className={`font-bold ${
                      realStats.hansalPercent === 100
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {realStats.hansalPercent}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${realStats.hansalPercent === 100 ? "bg-green-500" : "bg-emerald-500"}`}
                    style={{ width: `${realStats.hansalPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Real Data Card: Playbook */}
            <div
              onClick={() => navigate("/why-spectrum")}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(220,38,38,0.08)] hover:border-red-200 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-batangas font-bold text-gray-900 text-lg leading-tight transition-colors">
                      Spectrum Playbook
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase mt-1 tracking-widest font-poppins">
                      Core Curriculum
                    </p>
                  </div>
                </div>
                {realStats.playbookPercent === 100 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200 uppercase tracking-widest shrink-0 font-poppins">
                    <CheckCircle size={14} /> Complete
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100 uppercase tracking-widest shrink-0 font-poppins">
                    {realStats.playbookPercent > 0 && (
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                    )}
                    In Progress
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest font-poppins">
                  <span>Progress</span>
                  <span
                    className={`font-bold ${
                      realStats.playbookPercent === 100
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {realStats.playbookPercent}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${realStats.playbookPercent === 100 ? "bg-green-500" : "bg-red-600"}`}
                    style={{ width: `${realStats.playbookPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Real Data Card: Pricing */}
            <div
              onClick={() => navigate("/introduction")}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(220,38,38,0.08)] hover:border-red-200 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <BookOpen size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-batangas font-bold text-gray-900 text-lg leading-tight transition-colors">
                      Pricing and Packaging
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase mt-1 tracking-widest font-poppins">
                      Training Module
                    </p>
                  </div>
                </div>
                {realStats.pricingPercent === 100 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200 uppercase tracking-widest shrink-0 font-poppins">
                    <CheckCircle size={14} /> Complete
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200 uppercase tracking-widest shrink-0 font-poppins">
                    {realStats.pricingPercent > 0 && (
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></span>
                    )}
                    In Progress
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest font-poppins">
                  <span>Progress</span>
                  <span
                    className={`font-bold ${
                      realStats.pricingPercent === 100
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {realStats.pricingPercent}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${realStats.pricingPercent === 100 ? "bg-green-500" : "bg-gray-400"}`}
                    style={{ width: `${realStats.pricingPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* --- ACHIEVEMENTS --- */}
          <div className="space-y-6">
            <h2 className="text-xl font-batangas font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Award size={24} className="text-red-600" />
              Achievements
            </h2>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(220,38,38,0.05)] font-poppins">
              {realStats.playbookPercent === 100 ||
              realStats.pricingPercent === 100 ||
              realStats.eightDayPercent === 100 ||
              realStats.hansalPercent === 100 ? (
                <div className="divide-y divide-gray-100">
                  {realStats.eightDayPercent === 100 && (
                    <div className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 border border-indigo-100 shadow-sm shrink-0">
                        <Briefcase size={24} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">
                          Foundation Certified
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          Earned Badge
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  )}
                  {realStats.hansalPercent === 100 && (
                    <div className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm shrink-0">
                        <Target size={24} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">
                          Executive Graduate
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          Earned Badge
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  )}
                  {realStats.playbookPercent === 100 && (
                    <div className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-500 border border-yellow-100 shadow-sm shrink-0">
                        <Award size={24} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">
                          Partner Certified
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          Earned Badge
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  )}
                  {realStats.pricingPercent === 100 && (
                    <div className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 border border-red-100 shadow-sm shrink-0">
                        <ShieldCheck size={24} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">
                          Pricing Expert
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          Earned Badge
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award
                      size={32}
                      className="text-gray-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                    No Badges Yet
                  </p>
                </div>
              )}
            </div>

            {/* Summary Card */}
            <div className="bg-linear-to-br from-red-600 to-rose-700 rounded-2xl p-8 text-white shadow-[0_8px_30px_rgba(220,38,38,0.3)] relative overflow-hidden font-poppins">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award size={120} />
              </div>
              <h4 className="text-xs font-semibold text-red-200 uppercase tracking-widest mb-6">
                Training Summary
              </h4>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div>
                  <p className="text-4xl font-batangas font-bold">
                    {realStats.totalCompleted}
                  </p>
                  <p className="text-[10px] font-semibold text-red-100 uppercase tracking-widest mt-2">
                    Steps Passed
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-batangas font-bold">
                    {(realStats.pricingPercent === 100 ? 1 : 0) +
                      (realStats.playbookPercent === 100 ? 1 : 0) +
                      (realStats.eightDayPercent === 100 ? 1 : 0) +
                      (realStats.hansalPercent === 100 ? 1 : 0)}
                  </p>
                  <p className="text-[10px] font-semibold text-red-100 uppercase tracking-widest mt-2">
                    Badges Won
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Modal */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-poppins">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] w-full max-w-md overflow-hidden border border-gray-100"
              >
                <div className="bg-linear-to-r from-red-600 to-slate-900 p-5 sm:p-6 flex justify-between items-center text-white relative overflow-hidden">
                  <h3 className="font-batangas font-bold text-lg sm:text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                      <LogOut size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    Sign Out
                  </h3>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
                  >
                    <X size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="p-6 sm:p-8 text-center">
                  <p className="text-gray-600 font-medium text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                    Are you sure you want to sign out of your learning
                    dashboard?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="flex-1 py-3 px-4 bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmLogout}
                      className="flex-1 py-3 px-4 bg-red-600 text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:bg-slate-900 shadow-lg shadow-red-600/20 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      Yes, Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
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
      `}</style>
    </div>
  );
};

export default memo(Profile);
