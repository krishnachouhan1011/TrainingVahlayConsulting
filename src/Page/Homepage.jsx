/* eslint-disable react-hooks/set-state-in-effect */
import React, { useMemo, useState, useCallback, memo, useEffect } from "react";
import {
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Filter,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../component/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderBG from "../assets/TraineesBG.png";
import Card1 from "../assets/CourseCard2.png";
import Card2 from "../assets/CourseCard20.png";
import Card3 from "../assets/Thumbnail4.png";
import Card4 from "../assets/Thumbnail3.png";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

import { allModules as PricingModules } from "../component/SpectrumBusiness/Sidebar2";
import { allModules as PlaybookModules } from "../component/Selling Partner Playbook/Sidebar3";
import { allModules as EightDayModules } from "../component/How the 8-Day Training Program Works/Sidebar4";
import { allModules as HansalModules } from "../component/TrainingModule/Sidebar5";

// ==========================================
// 1. HELPER COMPONENTS
// ==========================================

const DonutChart = memo(({ total = 0, label = "Courses", data = [] }) => {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  const center = 80;

  const isEmpty = total === 0 || !data || data.length === 0;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center font-poppins">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#F3F4F6" // Border (Gray-100)
          strokeWidth="10"
          fill="transparent"
        />

        {!isEmpty &&
          data?.map((item, i) => {
            const strokeLength = (item.value / total) * circumference;
            const offset = currentOffset;
            currentOffset += strokeLength;
            if (item.value === 0) return null;
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                stroke={item.color}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={-offset}
                className="transition-all duration-700 ease-out"
                strokeLinecap="round"
              />
            );
          })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-900">
        <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest text-center mt-1">
          Total
          <br />
          {label}
        </span>
        <span className="text-3xl font-batangas font-bold text-slate-900">
          {total}
        </span>
      </div>
    </div>
  );
});

const StatsCard = memo(
  ({
    title,
    type,
    statsData = [],
    total = 0,
    label = "Courses",
    taken = 0,
    passed = 0,
  }) => {
    // Shared Card Styles (Partner Card Theme)
    const cardClasses =
      "group relative h-full bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.15)] flex flex-col overflow-hidden";

    if (type === "certifications") {
      return (
        <div className={cardClasses}>
          <h3 className="text-sm font-poppins font-semibold text-gray-500 mb-6 uppercase tracking-widest relative z-10">
            {title}
          </h3>
          <div className="flex flex-col space-y-6 font-poppins relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm">
                  <Award size={24} />
                </div>
                <span className="text-sm text-slate-900 font-semibold">
                  Certifications Taken
                </span>
              </div>
              <span className="text-2xl font-batangas font-bold text-slate-900">
                {taken}
              </span>
            </div>
            <div className="w-full h-px bg-gray-100"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-sm text-slate-900 font-semibold">
                  Certifications Passed
                </span>
              </div>
              <span className="text-2xl font-batangas font-bold text-slate-900">
                {passed}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={cardClasses}>
        <h3 className="text-sm font-poppins font-semibold text-gray-500 mb-4 uppercase tracking-widest relative z-10">
          {title}
        </h3>
        <div className="flex items-center justify-between gap-6 flex-1 font-poppins relative z-10">
          <div className="shrink-0">
            <DonutChart total={total} label={label} data={statsData} />
          </div>
          <div className="flex-1 space-y-4 min-w-30">
            {statsData?.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shadow-sm"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-600 font-semibold text-xs uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-sm">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

// ==========================================
// 2. COURSE CARD (REAL-TIME) - Partner Card Theme
// ==========================================

const CourseCard = memo(({ course, onOpen }) => {
  const progress = course.progress || 0;
  const isCompleted = progress === 100;
  const isInProgress = progress > 0 && progress < 100;

  return (
    <div
      onClick={onOpen}
      className="group bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl transition-all duration-300 flex flex-col h-full cursor-pointer hover:shadow-[0_8px_30px_rgba(0,255,255,0.15)] hover:border-red-200 overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {course.isTrending && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-poppins font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">
            Trending
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 relative z-10 bg-white">
        <div className="flex justify-between items-center mb-3 font-poppins">
          <span className="text-[9px] font-semibold text-slate-900 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-md border border-red-100">
            {course.type}
          </span>
          {isCompleted && (
            <CheckCircle size={16} className="text-emerald-500" />
          )}
        </div>

        <h3 className="font-batangas font-bold text-slate-900 text-[16px] leading-snug mb-2 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs font-poppins font-medium text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
          {course.description}
        </p>

        <div className="mt-auto pt-3 border-t border-gray-100 font-poppins">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">
              Progress
            </span>
            <span
              className={`text-[10px] font-bold ${isCompleted ? "text-emerald-600" : "text-slate-900"}`}
            >
              {progress}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-700 ${isCompleted ? "bg-emerald-500" : isInProgress ? "bg-red-500" : "bg-gray-200"}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <button
            className="w-full bg-gray-800 text-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-red-600 rounded-full shadow-md hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            {progress > 0 ? "Continue" : "Start"}{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
});

// ==========================================
// 3. LIST VIEW ITEM - Partner Card Theme
// ==========================================
const CourseListItem = memo(({ course, onClick }) => {
  const progress = course.progress || 0;
  const isCompleted = progress === 100;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.15)] flex flex-col md:flex-row items-center gap-6 cursor-pointer overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="w-full md:w-56 aspect-video bg-slate-900 overflow-hidden relative shrink-0 rounded-xl shadow-sm">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {course.isTrending && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-poppins font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10 border border-white/10">
            Trending
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 w-full py-1 relative z-10">
        <div className="flex items-center gap-3 mb-2 font-poppins">
          <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100 group-hover:bg-white group-hover:border-red-100 group-hover:text-red-600 transition-colors">
            {course.type}
          </span>
          <span className="text-gray-200">|</span>
          <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1 uppercase tracking-widest">
            <Clock size={12} /> {course.duration}
          </span>
        </div>
        <h3 className="text-lg font-batangas font-bold text-slate-900 mb-2 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs font-poppins font-medium text-gray-500 line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Action */}
      <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 min-w-40 font-poppins relative z-10">
        {isCompleted ? (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-emerald-200 shadow-sm">
            <CheckCircle size={16} /> Completed
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-900 bg-white border border-slate-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 text-[10px] font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full shadow-sm hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] group/btn">
            {progress > 0 ? `Continue (${progress}%)` : "Start Module"}{" "}
            <ArrowRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </div>
        )}
      </div>
    </div>
  );
});

// ==========================================
// 4. MAIN PAGE
// ==========================================

function Homepage() {
  const [activeTab, setActiveTab] = useState("All Courses/Curriculum");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const navigate = useNavigate();

  const [trainingCategory, setTrainingCategory] = useState("All");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [dynamicCourses, setDynamicCourses] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.searchQuery && location.state.searchQuery !== searchQuery) {
      setSearchQuery(location.state.searchQuery);
      setCurrentPage(1);
    }
  }, [location.state, searchQuery]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const uid = user ? user.uid : "guest";

      const handleProgressUpdate = () => {
        let completedPricingLessons = [];
        try {
          completedPricingLessons =
            JSON.parse(localStorage.getItem(`spectrum_progress_${uid}`)) || [];
        } catch {
          completedPricingLessons = [];
        }
        const pricingProgress =
          Math.round(
            (completedPricingLessons.length / PricingModules.length) * 100,
          ) || 0;

        let completedPlaybookLessons = [];
        try {
          completedPlaybookLessons =
            JSON.parse(
              localStorage.getItem(`spectrum_playbook_progress_${uid}`),
            ) || [];
        } catch {
          completedPlaybookLessons = [];
        }
        const playbookProgress =
          Math.round(
            (completedPlaybookLessons.length / PlaybookModules.length) * 100,
          ) || 0;

        let completed8DayLessons = [];
        try {
          const raw8Day =
            JSON.parse(localStorage.getItem(`spectrum_8day_progress_${uid}`)) ||
            [];
          const valid8DayIds = EightDayModules.map((m) => m.id);
          completed8DayLessons = raw8Day.filter((id) =>
            valid8DayIds.includes(id),
          );
        } catch {
          completed8DayLessons = [];
        }
        const eightDayProgress =
          Math.min(
            100,
            Math.round(
              (completed8DayLessons.length / EightDayModules.length) * 100,
            ),
          ) || 0;

        let completedHansalLessons = [];
        try {
          const rawHansal =
            JSON.parse(
              localStorage.getItem(`spectrum_hansal_progress_${uid}`),
            ) || [];
          const validHansalIds = HansalModules.map((m) => m.id);
          completedHansalLessons = rawHansal.filter((id) =>
            validHansalIds.includes(id),
          );
        } catch {
          completedHansalLessons = [];
        }
        const hansalProgress =
          Math.min(
            100,
            Math.round(
              (completedHansalLessons.length / HansalModules.length) * 100,
            ),
          ) || 0;

        const coursesData = [
          {
            id: 30,
            title: "How the 8-Day Training Program Works",
            type: "SCORM Package",
            duration: "45 min",
            progress: eightDayProgress,
            thumbnail: Card3,
            description:
              "An in-depth look at the structure, goals, and expectations for the 8-Day intensive training program.",
            path: "/welcome-aboard",
            courseName: "8-Day Training Program",
          },
          {
            id: 40,
            title: "Training Module by Hansal Kava",
            type: "SCORM Package",
            duration: "50 min",
            progress: hansalProgress,
            thumbnail: Card4,
            description:
              "Exclusive training module conducted by CEO Hansal Kava covering advanced techniques and company vision.",
            path: "/day1",
            courseName: "Training Module by Hansal Kava",
          },
          {
            id: 20,
            title: "Spectrum Playbook",
            type: "SCORM Package",
            duration: "60 min",
            progress: playbookProgress,
            thumbnail: Card2,
            description:
              "Comprehensive guide and overview for selling Spectrum products and services.",
            path: "/why-spectrum",
            courseName: "Spectrum Playbook",
          },
          {
            id: 2,
            title: "Updated Spectrum Business Pricing and Packaging",
            type: "SCORM Package",
            duration: "30 min",
            progress: pricingProgress,
            thumbnail: Card1,
            description:
              "Explore the new pricing, packaging, and strategies to increase sales and retention.",
            path: "/introduction",
            courseName: "Spectrum Business",
          },
        ];

        setDynamicCourses(coursesData);
      };

      handleProgressUpdate();

      window.addEventListener("storage", handleProgressUpdate);
      window.addEventListener("lessonCompleted", handleProgressUpdate);
      window.addEventListener("lessonCompletedPlaybook", handleProgressUpdate);
      window.addEventListener("lessonCompleted8Day", handleProgressUpdate);
      window.addEventListener("lessonCompletedHansal", handleProgressUpdate);

      return () => {
        window.removeEventListener("storage", handleProgressUpdate);
        window.removeEventListener("lessonCompleted", handleProgressUpdate);
        window.removeEventListener(
          "lessonCompletedPlaybook",
          handleProgressUpdate,
        );
        window.removeEventListener("lessonCompleted8Day", handleProgressUpdate);
        window.removeEventListener(
          "lessonCompletedHansal",
          handleProgressUpdate,
        );
      };
    });

    return () => unsubscribeAuth();
  }, []);

  // Extract topic names from the static list
  const filterOptions = useMemo(
    () => [
      "Welcome Aboard",
      "8-Day Overview",
      "Training Module",
      "Why Spectrum?",
      "Playbook Pricing",
      "What's changing?",
      "Business Rules",
    ],
    [],
  );

  // Create a mapping from topic names to course names
  const topicToCourseMap = useMemo(() => {
    return {
      "Welcome Aboard": "8-Day Training Program",
      "8-Day Overview": "8-Day Training Program",
      "Training Module": "Training Module by Hansal Kava",
      "Why Spectrum?": "Spectrum Playbook",
      "Playbook Pricing": "Spectrum Playbook",
      "What's changing?": "Spectrum Business",
      "Business Rules": "Spectrum Business",
    };
  }, []);

  const toggleFilter = useCallback((filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
    setCurrentPage(1);
  }, []);

  const summaryStats = useMemo(() => {
    const totalCourses = dynamicCourses.length;
    const completedCount = dynamicCourses.filter(
      (c) => (c.progress || 0) === 100,
    ).length;
    const inProgressCount = dynamicCourses.filter(
      (c) => (c.progress || 0) > 0 && (c.progress || 0) < 100,
    ).length;
    const notStartedCount = dynamicCourses.filter(
      (c) => (c.progress || 0) === 0,
    ).length;

    return { totalCourses, completedCount, inProgressCount, notStartedCount };
  }, [dynamicCourses]);

  const myCoursesStatsData = useMemo(
    () => [
      {
        label: "In Progress",
        value: summaryStats.inProgressCount,
        color: "#EF4444",
      },
      {
        label: "Completed",
        value: summaryStats.completedCount,
        color: "#10B981",
      },
      {
        label: "Not Started",
        value: summaryStats.notStartedCount,
        color: "#F3F4F6",
      },
    ],
    [summaryStats],
  );

  const certStats = useMemo(() => {
    return {
      taken: dynamicCourses.filter((c) => (c.progress || 0) > 0).length,
      passed: dynamicCourses.filter((c) => (c.progress || 0) === 100).length,
    };
  }, [dynamicCourses]);

  const filteredCourses = useMemo(() => {
    const searchLower = searchQuery.trim().toLowerCase();
    return dynamicCourses.filter((course) => {
      const titleLower = course.title.toLowerCase();
      const descLower = course.description.toLowerCase();

      const matchesSearch =
        !searchLower ||
        titleLower.includes(searchLower) ||
        descLower.includes(searchLower);

      const progress = course.progress || 0;
      let matchesTab = true;
      if (activeTab === "In Progress")
        matchesTab = progress > 0 && progress < 100;
      else if (activeTab === "Completed") matchesTab = progress === 100;
      else if (activeTab === "My Certificates") matchesTab = progress === 100;

      let matchesCategory = true;
      if (trainingCategory !== "All" && course.courseName !== trainingCategory)
        matchesCategory = false;

      let matchesFilters = true;
      if (selectedFilters.length > 0) {
        matchesFilters = selectedFilters.some((filter) => {
          const filterCourseName = topicToCourseMap[filter];
          return course.courseName === filterCourseName;
        });
      }

      return matchesSearch && matchesTab && matchesCategory && matchesFilters;
    });
  }, [
    activeTab,
    searchQuery,
    trainingCategory,
    selectedFilters,
    dynamicCourses,
    topicToCourseMap,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / itemsPerPage),
  );
  const currentCourses = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return {
      list: filteredCourses.slice(indexOfFirstItem, indexOfLastItem),
      indexOfFirstItem,
      indexOfLastItem,
    };
  }, [currentPage, filteredCourses]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --- CRITICAL FIX FOR SEARCH ---
  // This allows it to safely handle both the string from the Navbar and the Event object from the Sidebar input.
  const handleSearchChange = useCallback((eOrValue) => {
    const val = typeof eOrValue === "string" ? eOrValue : eOrValue.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setTrainingCategory(category);
    setCurrentPage(1);
  }, []);

  const handleOpenCourse = useCallback(
    (path) => {
      if (path && path !== "#") {
        if (path === "/day1") {
          sessionStorage.setItem("last_active_sidebar", "sidebar5");
          navigate(path, { state: { source: "sidebar5" } });
        } else if (path === "/welcome-aboard") {
          sessionStorage.setItem("last_active_sidebar", "sidebar4");
          navigate(path, { state: { source: "sidebar4" } });
        } else {
          navigate(path);
        }
      }
    },
    [navigate],
  );

  return (
    <div className="min-h-screen bg-gray-50 font-poppins text-slate-900 scroll-smooth">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        onSearch={handleSearchChange}
      />

      <main className="max-w-400 w-full mx-auto px-4 md:px-8 lg:px-12 py-10">
        {/* Hero Section */}
        <div className="relative mb-10 rounded-4xl overflow-hidden bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] animate-fade-in min-h-65 flex flex-col justify-center">
          <div className="absolute inset-0">
            <img
              src={HeaderBG}
              alt="Header Background"
              className="w-full h-full object-cover opacity-15 mix-blend-multiply"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent"></div>
          </div>
          <div className="relative z-10 px-8 py-12 md:px-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-red-600 rounded-full"></div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                Welcome Back
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-batangas font-bold text-slate-900 tracking-tight mb-4 leading-tight">
              {activeTab === "All Courses/Curriculum"
                ? "Learning Library"
                : activeTab}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              {activeTab === "My Certificates"
                ? "Download and manage your earned certificates."
                : "Explore our comprehensive catalog of training modules designed to enhance your product knowledge and sales strategy."}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        {activeTab === "All Courses/Curriculum" && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="w-full h-full">
              <StatsCard
                title="My Courses"
                type="courses"
                label="Courses"
                statsData={myCoursesStatsData}
                total={summaryStats.totalCourses}
              />
            </div>

            <div className="w-full h-full">
              <StatsCard
                title="Certifications"
                type="certifications"
                taken={certStats.taken}
                passed={certStats.passed}
              />
            </div>
          </div>
        )}

        <div
          className="flex flex-col lg:flex-row gap-8 items-start animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-70 shrink-0 lg:sticky lg:top-24 self-start space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)]">

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="lg:hidden w-full flex items-center justify-between text-sm font-semibold text-slate-900 mb-4 group"
              >
                <div className="flex items-center gap-2 transition-colors">
                  <Filter size={16} />
                  <span>Filters & Categories</span>
                </div>
                {isMobileFiltersOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {/* Collapsible Area */}
              <div
                className={`${
                  isMobileFiltersOpen ? "block" : "hidden"
                } lg:block space-y-8 animate-fade-in`}
              >
                {/* Categories */}
                <div>
                  <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex items-center justify-between w-full mb-4 group"
                  >
                    <h3 className="font-poppins font-semibold text-slate-900 text-sm uppercase tracking-widest">
                      Courses
                    </h3>
                    {isCategoriesOpen ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isCategoriesOpen
                        ? "max-h-64 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-3 pb-2">
                      {["All", "8-Day Training Program", "Training Module by Hansal Kava", "Spectrum Playbook", "Spectrum Business"].map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 border rounded-md flex items-center justify-center transition-all ${
                              trainingCategory === cat
                                ? "bg-red-600 border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                                : "border-slate-200 bg-white group-hover:border-red-300"
                            }`}
                          >
                            {trainingCategory === cat && (
                              <Check
                                size={12}
                                strokeWidth={4}
                                className="text-white"
                              />
                            )}
                          </div>
                          <input
                            type="radio"
                            name="trainingCat"
                            className="hidden"
                            checked={trainingCategory === cat}
                            onChange={() => handleCategoryChange(cat)}
                          />
                          <span
                            className={`text-sm font-medium ${
                              trainingCategory === cat
                                ? "text-slate-900"
                                : "text-gray-500 group-hover:text-slate-900"
                            } transition-colors`}
                          >
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="flex items-center justify-between w-full mb-4 group"
                  >
                    <h3 className="font-poppins font-semibold text-slate-900 text-sm uppercase tracking-widest">
                      Topic Filters
                    </h3>
                    {isFiltersOpen ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isFiltersOpen
                        ? "max-h-100 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-3 pb-2 pr-2 overflow-y-auto max-h-87.5 custom-scrollbar">
                      {filterOptions.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 mt-0.5 border rounded-md flex items-center justify-center shrink-0 transition-all ${
                              selectedFilters.includes(option)
                                ? "bg-red-600 border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                                : "border-slate-200 bg-white group-hover:border-red-300"
                            }`}
                          >
                            {selectedFilters.includes(option) && (
                              <Check
                                size={12}
                                strokeWidth={4}
                                className="text-white"
                              />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.includes(option)}
                            onChange={() => toggleFilter(option)}
                          />
                          <span
                            className={`text-sm font-medium leading-snug ${
                              selectedFilters.includes(option)
                                ? "text-slate-900"
                                : "text-gray-500 group-hover:text-slate-900"
                            } transition-colors`}
                          >
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main List Area */}
          <div className="flex-1 w-full min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)]">
              <div className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2 pl-2">
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100 font-bold">
                  {filteredCourses.length}
                </span>
                Results Found
                {filteredCourses.length > itemsPerPage && (
                  <span className="text-xs text-gray-400 normal-case ml-2 font-medium border-l border-slate-200 pl-3">
                    Showing {currentCourses.indexOfFirstItem + 1}-
                    {Math.min(
                      currentCourses.indexOfLastItem,
                      filteredCourses.length,
                    )}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-50 p-1 rounded-full border border-slate-200">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-gray-400 hover:text-slate-900"
                    }`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === "list"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-gray-400 hover:text-slate-900"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Courses Grid/List */}
            {currentCourses.list.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {currentCourses.list?.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onOpen={() => handleOpenCourse(course.path)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentCourses.list?.map((course) => (
                      <CourseListItem
                        key={course.id}
                        course={course}
                        onClick={() => handleOpenCourse(course.path)}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-900 hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-900 transition-all shadow-sm"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    {[...Array(totalPages)]?.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePageChange(idx + 1)}
                        className={`w-10 h-10 text-sm font-semibold rounded-full transition-all shadow-sm ${
                          currentPage === idx + 1
                            ? "bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.3)]"
                            : "bg-white text-gray-600 border border-slate-200 hover:border-red-600 hover:text-red-600"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-900 hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-900 transition-all shadow-sm"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-20 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <Filter size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-3">
                  No matches found
                </h3>
                <p className="text-gray-500 mb-6 font-medium">
                  Try adjusting your filters or search query to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("All Courses/Curriculum");
                    setSearchQuery("");
                    setCurrentPage(1);
                    setSelectedFilters([]);
                  }}
                  className="text-sm font-semibold bg-red-600 text-white px-8 py-3 rounded-full hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(220,38,38,0.3)] transition-all shadow-md uppercase tracking-widest"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default memo(Homepage);