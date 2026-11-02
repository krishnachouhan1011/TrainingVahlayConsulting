import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Layers,
  TrendingUp,
  ZoomIn,
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import Sidebar2 and helper
import Sidebar2, { markLessonComplete } from "./Sidebar2";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import {
  FullTableVisual,
  SimpleTableVisual,
} from "./PriceGuaranteesTableVisuals";

// MANUALLY SET YOUR ASSET PATHS HERE
import promoImage2 from "../../assets/promoimage2.png";

const PriceGuarantees = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDuration, setActiveDuration] = useState("1yr");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("full");

  // --- KNOWLEDGE CHECK 1: QUIZ STATE ---
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);

  // --- SHOW WHAT YOU KNOW: QUESTION 1 STATE ---
  const [swyk1Option, setSwyk1Option] = useState(null);
  const [swyk1Submitted, setSwyk1Submitted] = useState(false);
  const [swyk1Correct, setSwyk1Correct] = useState(false);

  // --- SHOW WHAT YOU KNOW: QUESTION 2 STATE (Multiple Response) ---
  const [swyk2Options, setSwyk2Options] = useState([]);
  const [swyk2Submitted, setSwyk2Submitted] = useState(false);
  const [swyk2Correct, setSwyk2Correct] = useState(false);

  // --- SHOW WHAT YOU KNOW: QUESTION 3 STATE ---
  const [swyk3Option, setSwyk3Option] = useState(null);
  const [swyk3Submitted, setSwyk3Submitted] = useState(false);
  const [swyk3Correct, setSwyk3Correct] = useState(false);

  const navigate = useNavigate();
  const swyk2SectionRef = useRef(null);
  const swyk3SectionRef = useRef(null);

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  // Data for KC1 Quiz
  const quizQuestion =
    "Which of these bundles qualifies for a 3-Year Price Guarantee?";
  const quizOptions = [
    { id: 0, text: "Internet + Free Voice Line", isCorrect: false },
    { id: 1, text: "Internet + Voice + Paid Mobile Line", isCorrect: true },
    { id: 2, text: "Internet + TV Stream Latino", isCorrect: false },
  ];

  // SWYK 1 Data
  const swyk1Options = [
    {
      id: 0,
      text: "They will get a 1-Year PG because Business Voice isn't an eligible Line of Business.",
      isCorrect: false,
    },
    {
      id: 1,
      text: "They will get a 1-Year PG because Internet Premier always has a 1-Year Price Guarantee.",
      isCorrect: true,
    },
    {
      id: 2,
      text: "They will get a 2-Year PG because they purchased Internet and a paid core Line of Business.",
      isCorrect: false,
    },
    {
      id: 3,
      text: "They will get a 2-Year PG because two services were purchased.",
      isCorrect: false,
    },
  ];

  // SWYK 2 Data
  const swyk2OptionsData = [
    {
      id: 0,
      text: "With Gig and free Advanced Business WiFi, you'll get the fastest speeds to all your devices, keeping your team productive and connected.",
    },
    {
      id: 1,
      text: "Our free Advanced WiFi offers Business Guest WiFi, which provides a separate network connection for your customers to protect both your business and your customers.",
    },
    {
      id: 2,
      text: "We are now offering free Advanced Business WiFi with Gig Internet purchases. Security Shield protects your business by encrypting everything your business sends or shares.",
    },
    {
      id: 3,
      text: "With Gig internet you will enjoy faster speeds, lower latency, and seamless connectivity. We are now including free WiFi to help you manage all your devices through My Spectrum App.",
    },
  ];

  // SWYK 3 Data
  const swyk3Options = [
    {
      id: 0,
      text: "They are the same thing, 3-Years since they bought a Triple Play.",
      isCorrect: false,
    },
    {
      id: 1,
      text: "Their Price Guarantee is 3-Years, and their Promotional Duration is 1-Year.",
      isCorrect: false,
    },
    {
      id: 2,
      text: "Their Price Guarantee is 2-Years, and their Promotional Duration is 4-Years.",
      isCorrect: false,
    },
    {
      id: 3,
      text: "Their Price Guarantee is 3-Years, and their Promotional Duration is 6-Years.",
      isCorrect: true,
    },
  ];

  const handleContinue = () => {
    markLessonComplete(3);
    navigate("/mobile-discounts");
  };

  const handleExit = () => {
    navigate("/");
  };

  const openModal = (type) => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  // Quiz Handler (KC1)
  const handleQuizOptionClick = (id, isCorrect) => {
    if (quizSubmitted && isQuizCorrect) return;
    setSelectedQuizOption(id);
    setQuizSubmitted(true);
    setIsQuizCorrect(isCorrect);
  };

  const resetQuiz = () => {
    setQuizSubmitted(false);
    setSelectedQuizOption(null);
    setIsQuizCorrect(false);
  };

  // SWYK 1 Handlers
  const handleSwyk1OptionClick = (id) => {
    if (swyk1Submitted && swyk1Correct) return;
    setSwyk1Option(id);
    setSwyk1Submitted(false);
  };

  const handleSubmitSwyk1 = () => {
    setSwyk1Submitted(true);
    const selected = swyk1Options.find((opt) => opt.id === swyk1Option);
    if (selected && selected.isCorrect) {
      setSwyk1Correct(true);
      setTimeout(() => {
        swyk2SectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      setSwyk1Correct(false);
    }
  };

  const resetSwyk1 = () => {
    setSwyk1Submitted(false);
    setSwyk1Option(null);
    setSwyk1Correct(false);
  };

  // SWYK 2 Handlers
  const handleSwyk2OptionToggle = (id) => {
    if (swyk2Submitted && swyk2Correct) return;
    setSwyk2Submitted(false);
    setSwyk2Options((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmitSwyk2 = () => {
    setSwyk2Submitted(true);
    if (swyk2Options.length === 4) {
      setSwyk2Correct(true);
      setTimeout(() => {
        swyk3SectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      setSwyk2Correct(false);
    }
  };

  const resetSwyk2 = () => {
    setSwyk2Submitted(false);
    setSwyk2Options([]);
    setSwyk2Correct(false);
  };

  // SWYK 3 Handlers
  const handleSwyk3OptionClick = (id) => {
    if (swyk3Submitted && swyk3Correct) return;
    setSwyk3Option(id);
    setSwyk3Submitted(false);
  };

  const handleSubmitSwyk3 = () => {
    setSwyk3Submitted(true);
    const selected = swyk3Options.find((opt) => opt.id === swyk3Option);
    if (selected && selected.isCorrect) {
      setSwyk3Correct(true);
    } else {
      setSwyk3Correct(false);
    }
  };

  const resetSwyk3 = () => {
    setSwyk3Submitted(false);
    setSwyk3Option(null);
    setSwyk3Correct(false);
  };

  // Data for the Interactive Matrix
  const promoData = {
    "1yr": {
      label: "1-Year Price Guarantee",
      color: "red",
      content: (
        <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
          <div className="flex-1 space-y-6 text-left">
            <ul className="space-y-4 font-medium text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-lg leading-none"></span>
                <span>
                  Any Internet Premier package (Single/Only, Bundle/Double,
                  Triple Play)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-lg leading-none"></span>
                <span>Internet (any Tier) & One Mobile Line Included*</span>
              </li>
            </ul>
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
              <h4 className="font-batangas font-bold text-red-600 mb-2">
                Note:
              </h4>
              <ul className="space-y-2 font-medium text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-lg leading-none"></span>
                  <span>
                    *Unlimited Line at no cost or Unlimited+ at $10/month
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-lg leading-none"></span>
                  <span>
                    Any Single Play sale; all Internet Tiers and Lines of
                    Business
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                Any{" "}
                <strong className="text-slate-900">
                  Internet Premier Package (Single/Only, Bundle/Double, Triple
                  Play)
                </strong>{" "}
                have a 1-Year Price Guarantee.
              </p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                <strong className="text-slate-900">
                  Internet (any Tier) bundled with one Mobile line included (at
                  no cost)
                </strong>{" "}
                have a 1-Year Price Guarantee. Customers can upgrade to an
                Unlimited+ Line for $10/month with a 1-Year Price Guarantee.
              </p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                <strong className="text-slate-900">
                  Any Single Play sale;
                </strong>{" "}
                all Internet Tiers and Lines of Business have a 1-Year Price
                Guarantee.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    "2yr": {
      label: "2-Year Price Guarantee",
      color: "red",
      content: (
        <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
          <div className="flex-1 space-y-6 text-left">
            <ul className="space-y-4 font-medium text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-lg leading-none"></span>
                <span>
                  Internet Ultra, Gig, or 2 Gig &{" "}
                  <span className="underline font-bold text-slate-900">
                    one
                  </span>{" "}
                  of the following:
                </span>
              </li>
              <ul className="pl-8 space-y-2 font-medium text-gray-700 list-disc">
                <li>Voice (1 paid line)</li>
                <li>SBC (2 paid lines)</li>
                <li>Mobile (1 paid line)</li>
                <li>Video*</li>
              </ul>
            </ul>
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
              <h4 className="font-batangas font-bold text-red-600 mb-2">
                Note:
              </h4>
              <p className="font-medium text-gray-700 mb-4">
                One Mobile line included (at no cost) and Free Voice lines are
                not eligible for Bundles with 2-Year PG
              </p>
              <p className="font-semibold text-gray-500 text-sm italic">
                *TV Stream Latino is not eligible as a LOB
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                <strong className="text-slate-900">Bundles/Double Play</strong>{" "}
                are eligible for a 2-Year Price Guarantee with the purchase of{" "}
                <strong className="text-slate-900">
                  Internet Ultra, Gig, or 2 Gig,
                </strong>{" "}
                and{" "}
                <span className="underline">
                  <strong className="text-slate-900">
                    one paid core Line of Business.
                  </strong>
                </span>
              </p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                One Mobile line included (at no cost) and Free Voice lines{" "}
                <strong className="text-slate-900">do not qualify</strong> as
                eligible Lines of Business for 2-Year Price Guarantees.
              </p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                TV Stream Latino{" "}
                <strong className="text-slate-900">does not qualify</strong> as
                an eligible Line of Business for 2-Year Price Guarantee.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    "3yr": {
      label: "3-Year Price Guarantee",
      color: "red",
      content: (
        <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
          <div className="flex-1 space-y-6 text-left">
            <ul className="space-y-4 font-medium text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-lg leading-none"></span>
                <span>
                  Internet Ultra, Gig, or 2 Gig &{" "}
                  <span className="underline font-bold text-slate-900">
                    two
                  </span>{" "}
                  of the following:
                </span>
              </li>
              <ul className="pl-8 space-y-2 font-medium text-gray-700 list-disc">
                <li>Voice (1 paid line)</li>
                <li>SBC (2 paid lines)</li>
                <li>Mobile (1 paid line)</li>
                <li>Video*</li>
              </ul>
            </ul>
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
              <h4 className="font-batangas font-bold text-red-600 mb-2">
                Note:
              </h4>
              <p className="font-medium text-gray-700 mb-4">
                One Mobile line included (at no cost) and Free Voice lines are
                not eligible for Triple Play with 3-Year PG
              </p>
              <p className="font-semibold text-gray-500 text-sm italic">
                *TV Stream Latino is not eligible as a LOB
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                <strong className="text-slate-900">Triple Plays</strong> are
                eligible for a 3-Year Price Guarantee with the purchase of{" "}
                <strong className="text-slate-900">
                  Internet Ultra, Gig, or 2 Gig,
                </strong>{" "}
                and{" "}
                <span className="underline">
                  <strong className="text-slate-900">
                    two paid core Lines of Business.
                  </strong>
                </span>
              </p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                One Mobile line included (at no cost) and Free Voice lines{" "}
                <strong className="text-slate-900">do not qualify</strong> as
                eligible Lines of Business for 3-Year Price Guarantees.
              </p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-700 font-medium">
                TV Stream Latino{" "}
                <strong className="text-slate-900">does not qualify</strong> as
                an eligible Line of Business for 3-Year Price Guarantee.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      <Sidebar2
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col h-full relative bg-white w-full">
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors cursor-pointer"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block">
              Overview / Price Guarantees
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-xs font-semibold text-gray-500 tracking-wider transition-all px-4 py-2 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-32">
            {/* Title & Intro (Abbreviated) */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-3">
                Lesson 3
              </span>
              <h1 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-6 leading-tight">
                Price Guarantees & Bundles
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>
            <div className="prose max-w-none mb-10 animate-fade-in">
              <p className="text-gray-600 font-medium leading-relaxed text-lg mb-8">
                The updated Spectrum Pricing and Packaging makes it easy to
                discuss Price Guarantees and bundles with customers.
              </p>
              <div className="bg-slate-900 flex-col md:flex-row text-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.3)] border border-slate-800 flex items-center gap-6 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-30 transition-opacity"></div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm shrink-0 border border-white/10 group-hover:bg-red-600 transition-colors duration-500">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-batangas font-bold text-xl mb-2 text-red-400">
                    Partner Benefit
                  </h3>
                  <p className="text-xl font-medium text-gray-200 leading-snug">
                    Price Guarantees{" "}
                    <span className="font-bold text-white">
                      get partners paid
                    </span>{" "}
                    and{" "}
                    <span className="font-bold text-white">
                      keep partners paid longer!
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Matrix & Terms */}
            <div className="animate-fade-in delay-100 mb-12">
              <h3 className="text-2xl font-batangas font-bold text-slate-900 mb-6">
                Promotional Durations Matrix
              </h3>
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                  {Object.keys(promoData).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveDuration(key)}
                      className={`py-3 px-6 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-2 cursor-pointer ${activeDuration === key ? "bg-red-600 border-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)] transform scale-105" : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-slate-900"}`}
                    >
                      {promoData[key].label}
                    </button>
                  ))}
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                  {promoData[activeDuration].content}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm font-semibold text-gray-600">
                    Customers{" "}
                    <span className="text-red-600 font-bold">must</span>{" "}
                    activate their Mobile line within 30-days.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12 animate-fade-in delay-200 pt-8 border-t border-gray-200">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Updated Terms
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-50 border border-red-100 p-2.5 rounded-xl text-red-600 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-batangas font-bold text-slate-900 transition-colors">
                      Price Guarantee:
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                    A Price Guarantee (PG) is the length of time a promotional
                    rate is guaranteed, or 'price protected', for the customer.
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-50 border border-red-100 p-2.5 rounded-xl text-red-600 group-hover:scale-110 transition-transform">
                      <Layers size={24} />
                    </div>
                    <h3 className="text-xl font-batangas font-bold text-slate-900 transition-colors">
                      Bundles:
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                    A bundle is Internet and any other{" "}
                    <span className="font-bold text-red-600">
                      paid Line of Business
                    </span>{" "}
                    (LOB).
                  </p>
                </div>
              </div>
            </div>

            {/* Promotional Durations (1Y Table) */}
            <div className="mb-12 animate-fade-in delay-300">
              <h2 className="text-3xl font-batangas font-bold text-slate-900 mb-6">
                Promotional Durations
              </h2>
              <p className="text-gray-600 font-medium mb-8 max-w-4xl leading-relaxed">
                Once the Price Guarantee ends, campaign roll-offs (CROs) will
                increase until the customer reaches Persistent Rates.
              </p>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div
                  className="flex-1 w-full bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 shadow-sm relative group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={() => openModal("simple")}
                >
                  <div className="rounded-2xl border border-gray-100 overflow-hidden relative pointer-events-none">
                    <SimpleTableVisual isModal={false} />
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                        <ZoomIn className="text-red-600" size={24} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-red-600 italic mt-4 text-center font-semibold tracking-wider">
                    Click on the image to enlarge the view
                  </p>
                </div>
                <div className="flex-1 space-y-6">
                  <ul className="space-y-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                    <li className="flex gap-3 items-start">
                      <p className="text-gray-700 font-medium text-sm leading-relaxed">
                        A{" "}
                        <span className="font-bold text-slate-900">
                          Price Guarantee
                        </span>{" "}
                        is the length of time the customer is 'locked in' to the
                        price.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* KNOWLEDGE CHECK 1: QUIZ */}
            <div className="mt-16 animate-fade-in border-t pt-12 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-2xl font-batangas font-bold text-slate-900">
                  Knowledge Check 1
                </h2>
              </div>

              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                <h3 className="text-xl font-batangas font-bold text-slate-900 mb-8 text-center max-w-2xl mx-auto">
                  {quizQuestion}
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {quizOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() =>
                        handleQuizOptionClick(option.id, option.isCorrect)
                      }
                      className={`relative p-8 bg-white shadow-sm rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-35 border border-gray-100 overflow-hidden group 
                                                  ${
                                                    quizSubmitted
                                                      ? option.isCorrect
                                                        ? "ring-4 ring-green-400 bg-green-50 border-transparent shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                        : selectedQuizOption ===
                                                            option.id
                                                          ? "ring-4 ring-red-400 bg-red-50 border-transparent shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                                                          : "opacity-60 bg-gray-50"
                                                      : "hover:scale-105 hover:shadow-lg hover:border-red-200"
                                                  }`}
                    >
                      <div
                        className={`h-1.5 w-full absolute top-0 rounded-t-2xl transition-colors duration-300 ${quizSubmitted && option.isCorrect ? "bg-green-500" : "bg-red-600 group-hover:bg-red-500"}`}
                      ></div>
                      <p className="font-semibold text-slate-900 text-center mt-2 leading-relaxed">
                        {option.text}
                      </p>

                      {quizSubmitted && option.isCorrect && (
                        <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1.5 shadow-md">
                          <CheckCircle size={20} strokeWidth={3} />
                        </div>
                      )}

                      {quizSubmitted &&
                        !option.isCorrect &&
                        selectedQuizOption === option.id && (
                          <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-md">
                            <XCircle size={20} strokeWidth={3} />
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                {/* RETRY BUTTON (Only if submitted and incorrect) */}
                {quizSubmitted && !isQuizCorrect && (
                  <div className="flex justify-center mt-10 animate-fade-in">
                    <button
                      onClick={resetQuiz}
                      className="flex items-center gap-2 text-red-600 font-semibold hover:bg-red-50 px-8 py-3.5 rounded-full transition-colors border border-red-200 shadow-sm uppercase tracking-widest text-sm"
                    >
                      <RotateCcw size={16} />
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SHOW WHAT YOU KNOW SECTION (Final Quiz) */}
            {isQuizCorrect && (
              <div className="mb-20 animate-fade-in pt-16 border-t border-gray-200 mt-16">
                {/* Intro Title */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-batangas font-bold text-slate-900 mb-4">
                    Show What You Know!
                  </h2>
                  <p className="text-gray-600 font-medium text-lg">
                    Check your knowledge by answering these quick questions.
                  </p>
                </div>

                {/* SWYK - Question 1 */}
                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                      <HelpCircle size={24} />
                    </div>
                    <h2 className="text-xl font-batangas font-bold text-slate-900">
                      Question 1
                    </h2>
                  </div>

                  <h3 className="text-lg font-batangas font-bold text-slate-900 mb-8 md:pl-12 leading-relaxed">
                    A customer wants to purchase Internet Premier and Business
                    Voice. What's their Price Guarantee?
                  </h3>

                  <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                    {swyk1Options.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleSwyk1OptionClick(option.id)}
                        className={`
                                                                    flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                    ${
                                                                      swyk1Option ===
                                                                      option.id
                                                                        ? swyk1Submitted &&
                                                                          swyk1Correct
                                                                          ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                                          : swyk1Submitted &&
                                                                              !swyk1Correct
                                                                            ? "border-red-500 bg-red-50 shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                                                                            : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                                        : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                                                    }
                                                                    ${swyk1Submitted && swyk1Correct ? "cursor-default" : ""}
                                                                `}
                      >
                        <div
                          className={`
                                                                    w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                                    ${
                                                                      swyk1Option ===
                                                                      option.id
                                                                        ? swyk1Submitted &&
                                                                          swyk1Correct
                                                                          ? "bg-green-500 border-green-500"
                                                                          : swyk1Submitted &&
                                                                              !swyk1Correct
                                                                            ? "bg-red-500 border-red-500"
                                                                            : "bg-red-600 border-red-600"
                                                                        : "border-gray-300 bg-white"
                                                                    }
                                                                `}
                        >
                          {swyk1Option === option.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium leading-relaxed ${swyk1Option === option.id ? "text-slate-900 font-bold" : "text-gray-600"}`}
                        >
                          {option.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Feedback Message */}
                  {swyk1Submitted && (
                    <div
                      className={`mt-8 p-5 rounded-2xl flex items-center gap-3 animate-fade-in max-w-3xl mx-auto md:ml-12 font-medium ${swyk1Correct ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                    >
                      {swyk1Correct ? (
                        <>
                          <CheckCircle
                            size={24}
                            className="text-green-600 shrink-0"
                          />
                          <span className="font-bold">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={24}
                            className="text-red-600 shrink-0"
                          />
                          <span>
                            <strong className="font-bold">Incorrect.</strong>{" "}
                            Internet Premier always carries a 1-Year Price
                            Guarantee, regardless of bundle.
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end mt-10 max-w-3xl mx-auto">
                    {!swyk1Correct ? (
                      <button
                        onClick={handleSubmitSwyk1}
                        disabled={swyk1Option === null}
                        className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${swyk1Option === null ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 text-white"}`}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={resetSwyk1}
                        className="text-red-600 font-semibold hover:underline flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <RotateCcw size={16} /> Retake
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SWYK 2 - WiFi */}
            {/* SWYK 2 - WiFi */}
            {swyk1Correct && (
              <div
                ref={swyk2SectionRef}
                className="mb-12 sm:mb-20 animate-fade-in pt-8 sm:pt-12 border-t border-gray-200"
              >
                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 sm:mb-8">
                    <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600 inline-flex w-fit">
                      <HelpCircle size={24} />
                    </div>
                    <h2 className="text-lg sm:text-xl font-batangas font-bold text-slate-900">
                      Question 2
                    </h2>
                  </div>

                  <h3 className="text-base sm:text-lg font-batangas font-bold text-slate-900 mb-6 sm:mb-8 md:pl-12 leading-relaxed">
                    WiFi is included for free with Gig and 2 Gig. What are some
                    value statements to help you sell Gig with WiFi to business
                    customers?{" "}
                    <span className="text-gray-500 font-medium text-xs sm:text-sm font-poppins block mt-1 sm:mt-2">
                      (Select all that apply)
                    </span>
                  </h3>

                  {/* Options List */}
                  <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto md:pl-12">
                    {swyk2OptionsData.map((option) => {
                      const isSelected = swyk2Options.includes(option.id);
                      return (
                        <div
                          key={option.id}
                          onClick={() => handleSwyk2OptionToggle(option.id)}
                          className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? swyk2Submitted && swyk2Correct
                                ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                              : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                          } ${swyk2Submitted && swyk2Correct ? "cursor-default" : ""}`}
                        >
                          {/* Checkbox Square */}
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? swyk2Submitted && swyk2Correct
                                  ? "bg-green-500 border-green-500"
                                  : "bg-red-600 border-red-600"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-white sm:w-4 sm:h-4"
                                strokeWidth={3}
                              />
                            )}
                          </div>

                          {/* Option Text */}
                          <p
                            className={`text-sm sm:text-base font-medium leading-relaxed ${isSelected ? "text-slate-900 font-bold" : "text-gray-600"}`}
                          >
                            {option.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {swyk2Submitted && (
                    <div
                      className={`mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-in max-w-3xl mx-auto md:ml-12 font-medium text-sm sm:text-base ${swyk2Correct ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                    >
                      {swyk2Correct ? (
                        <>
                          <CheckCircle
                            size={24}
                            className="text-green-600 shrink-0"
                          />
                          <span>
                            <strong className="font-bold">Correct!</strong> All
                            of these are excellent value statements for selling
                            Gig + WiFi.
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={24}
                            className="text-red-600 shrink-0"
                          />
                          <span>
                            <strong className="font-bold">Incorrect.</strong>{" "}
                            All options are valid value statements. Please
                            select all to proceed.
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-center sm:justify-end mt-8 sm:mt-10 max-w-3xl mx-auto">
                    {!swyk2Correct ? (
                      <button
                        onClick={handleSubmitSwyk2}
                        disabled={swyk2Options.length === 0}
                        className={`w-full sm:w-auto font-semibold py-3 sm:py-3.5 px-8 sm:px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${swyk2Options.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white"}`}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={resetSwyk2}
                        className="w-full sm:w-auto text-red-600 font-semibold hover:underline flex justify-center items-center gap-2 cursor-pointer px-6 py-3 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <RotateCcw size={16} /> Retake
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SWYK 3 - Promo Duration */}
            {swyk2Correct && (
              <div
                ref={swyk3SectionRef}
                className="mb-20 animate-fade-in pt-12 border-t border-gray-200"
              >
                <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-red-600">
                      <HelpCircle size={24} />
                    </div>
                    <h2 className="text-xl font-batangas font-bold text-slate-900">
                      Question 3
                    </h2>
                  </div>

                  <h3 className="text-lg font-batangas font-bold text-slate-900 mb-8 md:pl-12 leading-relaxed">
                    A customer purchases Internet Ultra, TV Stream, and an
                    Unlimited+ Line. What's their Price Guarantee and their
                    Promotional Duration?
                  </h3>

                  <div className="space-y-4 max-w-3xl mx-auto md:pl-12">
                    {swyk3Options.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleSwyk3OptionClick(option.id)}
                        className={`
                                                                        flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                                        ${
                                                                          swyk3Option ===
                                                                          option.id
                                                                            ? swyk3Submitted &&
                                                                              swyk3Correct
                                                                              ? "border-green-500 bg-green-50 shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                                                                              : swyk3Submitted &&
                                                                                  !swyk3Correct
                                                                                ? "border-red-500 bg-red-50 shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                                                                                : "border-red-600 bg-red-50 shadow-[0_4px_15px_rgba(220,38,38,0.15)]"
                                                                            : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                                                                        }
                                                                        ${swyk3Submitted && swyk3Correct ? "cursor-default" : ""}
                                                                    `}
                      >
                        <div
                          className={`
                                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                                        ${
                                                                          swyk3Option ===
                                                                          option.id
                                                                            ? swyk3Submitted &&
                                                                              swyk3Correct
                                                                              ? "bg-green-500 border-green-500"
                                                                              : swyk3Submitted &&
                                                                                  !swyk3Correct
                                                                                ? "bg-red-500 border-red-500"
                                                                                : "bg-red-600 border-red-600"
                                                                            : "border-gray-300 bg-white"
                                                                        }
                                                                    `}
                        >
                          {swyk3Option === option.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium leading-relaxed ${swyk3Option === option.id ? "text-slate-900 font-bold" : "text-gray-600"}`}
                        >
                          {option.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Feedback Message */}
                  {swyk3Submitted && (
                    <div
                      className={`mt-8 p-5 rounded-2xl flex items-center gap-3 animate-fade-in max-w-3xl mx-auto md:ml-12 font-medium ${swyk3Correct ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                    >
                      {swyk3Correct ? (
                        <>
                          <CheckCircle
                            size={24}
                            className="text-green-600 shrink-0"
                          />
                          <span>
                            <strong className="font-bold">Correct!</strong> They
                            bought a Triple Play. Price Guarantee is 3-Years,
                            Promotional Duration is 6-Years.
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={24}
                            className="text-red-600 shrink-0"
                          />
                          <span>
                            <strong className="font-bold">Incorrect.</strong>{" "}
                            Internet Ultra + 2 Core LOBs (Voice/TV/Mobile) =
                            Triple Play.
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end mt-10 max-w-3xl mx-auto">
                    {!swyk3Correct ? (
                      <button
                        onClick={handleSubmitSwyk3}
                        disabled={swyk3Option === null}
                        className={`font-semibold py-3 px-10 rounded-full shadow-md transition-all uppercase tracking-widest text-sm ${swyk3Option === null ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] text-white"}`}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={resetSwyk3}
                        className="text-red-600 font-semibold hover:underline flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <RotateCcw size={16} /> Retake
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-poppins">
            <div
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white rounded-3xl shadow-2xl relative w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-fade-in custom-scrollbar border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/90 backdrop-blur-md sticky top-0 z-10">
                <h3 className="font-batangas font-bold text-slate-900 text-lg">
                  {modalContent === "full"
                    ? "Full Promotional Pricing Matrix"
                    : "Promotional Durations Detail"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-red-50 rounded-full text-gray-500 transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 bg-white flex justify-center">
                {modalContent === "full" ? (
                  <img
                    src={promoImage2}
                    alt="Full Promotional Pricing Matrix"
                    className="max-w-full h-auto rounded-2xl shadow-md border border-gray-100"
                  />
                ) : (
                  <SimpleTableVisual isModal={true} />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-8 right-8 z-30">
          {/* Only show CONTINUE if final quiz is correct AND Bottom Reached */}
          {swyk3Correct && isBottomReached && (
            <button
              onClick={handleContinue}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl shadow-red-200 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] transition-all uppercase tracking-widest text-sm animate-fade-in"
            >
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          )}
        </div>
      </main>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
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

export default PriceGuarantees;
