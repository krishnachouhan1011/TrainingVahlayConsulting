/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Ear,
  MessageSquareText,
  ShieldAlert,
  Target,
  XCircle,
  CheckCircle2,
  AlertCircle,
  User,
  Headset,
  BookOpenCheck,
  Zap,
  ArrowDown,
  Flame,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar5, { markLessonComplete } from "./Sidebar5";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Day3 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [objectionTab, setObjectionTab] = useState("all");
  const navigate = useNavigate();

  // ScrollRef logic
  const scrollRef = useRef(null);
  const isBottomReached = useScrollToBottom(scrollRef);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContinue = () => {
    markLessonComplete(3);
    navigate("/day4");
  };

  const handleExit = () => navigate("/");

  const greetingTips = [
    "Speak slowly and clearly",
    "Do not sound rushed",
    "Do not oversell in the first line",
    "Smile while speaking (it changes your tone)",
  ];

  const salesMistakes = [
    "Talking too much",
    "Interrupting the customer",
    "Quoting price too early",
    "Sounding desperate",
    "Ignoring objections",
    "Pushing without understanding needs",
  ];

  const salesFlow = [
    "Greeting",
    "Need Analysis",
    "Pitch",
    "Objection Handling",
    "Close",
    "Next Step",
  ];

  const rolePlays = [
    {
      title: "1: Basic Business Internet Inquiry",
      customer: "Yeah, what is this call about?",
      agent:
        "Thank you for asking. This is John calling from Vahlay Consulting. We help businesses check better internet options at their location. I just wanted to see what speed you're currently using.",
      notes: [
        "Calm tone",
        "Clear purpose",
        "No pressure",
        "Open-ended question",
      ],
    },
    {
      title: "2: Customer Facing Slow Internet",
      customer: "Our internet is very slow.",
      agent:
        "I understand. Slow internet can really affect daily work. May I ask how many devices or systems are connected at your location? ... [Customer answers] ... That explains it. With multiple devices, upgrading your speed can make a big difference. I can check what higher-speed options are available.",
      notes: [
        "Identifies problem",
        "Explains reason",
        "Offers solution",
        "Moves to next step",
      ],
    },
    {
      title: "3: Customer Is Busy",
      customer: "I'm busy right now.",
      agent:
        "No problem at all, I understand. When would be a better time for a quick 2-minute call? ... [Customer answers] ... Perfect. I'll call you back later today. Thank you for your time.",
      notes: ["Respectful", "No pushing", "Secures follow-up"],
    },
    {
      title: "4: Price-Sensitive Customer",
      customer: "That sounds expensive.",
      agent:
        "I understand your concern. Most businesses look at value rather than just price. Faster speed usually means fewer issues and smoother daily operations.",
      notes: ["Acknowledges concern", "Explains value", "Does not argue"],
    },
  ];

  const mostCommonObjections = [
    {
      obj: "You are with spectrum you should have my details",
      res: "I would have your complete details if I was with sales activation or retention, but since I'm in the sales and promos dept, I'm unable to access your complete details (acc num/bill etc.).",
      why: ["Department boundaries", "Customer data security", "Removes suspicion"],
      tag: "Account Verification",
    },
    {
      obj: "Why is your number showing as spam?",
      res: "So I'm calling from a system generated number which makes hundreds of calls a day. If you want, I can call you from my direct Spectrum number.",
      why: ["Transparent explanation", "System dialer context", "Offers verified callback"],
      tag: "Caller ID & Spam",
    },
    {
      obj: "Why would spectrum/you want to lower my bill?",
      res: "Since we care about our customers, we would hate for them to switch to a different provider for just a better deal, so we're running a retention campaign so we can help our customers.",
      why: ["Customer retention focus", "Proactive appreciation", "Win-win relationship"],
      tag: "Retention Campaign",
    },
    {
      obj: "I already have a local spectrum rep (representative)",
      res: "That's great! But does your Spectrum rep offer you better prices every year, and do they solve your problems as soon as you tell them?",
      followUp: [
        {
          condition: "If YES",
          action: "Say that's great and let the customer go politely.",
          variant: "success",
        },
        {
          condition: "If NO",
          action: "Well, in that case, I can be a better rep than they are!",
          variant: "primary",
        },
      ],
      why: ["Challenges rep value", "Polite qualification", "Positions as superior alternative"],
      tag: "Existing Representative",
    },
    {
      obj: "Where are you calling from?",
      res: "I'm calling from Delaware (EST).",
      why: ["Direct & confident", "US timezone reference", "Builds geographic trust"],
      tag: "Rep Location",
    },
    {
      obj: "Why do I need to get a new acc? / Why can't you make the changes in the current spectrum acc?",
      res: "Since you've lost the price lock guarantee, the promos in your current acc will deplete every month. And since promos are active in your current acc, I can't add the same promos in your current acc—hence we would have to give you a new acc for the promos.",
      why: ["Price lock loss explained", "Promo eligibility rules", "Logical account upgrade"],
      tag: "New Account vs Current",
    },
    {
      obj: "Why do I need to get new equipments?",
      res: "So every equipment is linked to an account. Since we're giving a new account, we have to give a new set of equipments, but there is no extra fees for it.",
      why: ["Serial linked to account", "Reassures zero extra fees", "Smooth equipment exchange"],
      tag: "Equipment & Hardware",
    },
    {
      obj: "Why can't you use the same details for new acc?",
      res: "Since your details are already taken in by the current Spectrum account you have, the system wouldn't let me use the exact same set of details for a new acc at the same location.",
      why: ["System database limitation", "Prevents duplicate conflicts", "Clear procedural rule"],
      tag: "Account Information",
    },
    {
      obj: "I don't want 2 accounts / bills",
      res: "Okay, that's fair! I can merge the 2 bills into 1, but it has to be done after 3 months because the system won't let us do it earlier.",
      why: ["Validates customer concern", "Offers bill merging solution", "Sets 3-month expectation"],
      tag: "Billing & Consolidation",
    },
    {
      obj: "Let me talk to my wife / business partner",
      res: "Well yeah, you are definitely going to have a word with them! It's just that you're either going to them with a problem or a solution—and I have what you guys need. Does that make sense?",
      why: ["Validates partner discussion", "Problem vs Solution framing", "Secures immediate alignment"],
      tag: "Decision Makers",
    },
  ];

  const telecomObjections = [
    {
      obj: "My internet works fine.",
      res: "That's good to hear. Many customers said the same before checking options. Sometimes better speed or pricing is available at the same address.",
      why: ["Non-challenging", "Curious tone", "Keeps conversation open"],
    },
    {
      obj: "I already have a provider.",
      res: "Absolutely, most businesses do. I'm just checking if there's a better option or upgrade available when your contract is up.",
      why: ["Acknowledges reality", "No negative comparison", "Future-focused"],
    },
    {
      obj: "I'm under contract.",
      res: "No worries at all. We can note your contract end date and plan accordingly when it's closer.",
      why: ["No pressure", "Keeps lead warm", "Professional"],
    },
    {
      obj: "Send me an email.",
      res: "Sure, I can do that. Just so I send the right details, can I confirm what speed you're currently using?",
      why: ["Follows request", "Keeps engagement", "Collects information"],
    },
    {
      obj: "Call me later.",
      res: "Of course. What time works best for you?",
      why: ["Polite", "Secures callback", "Avoids guessing"],
    },
    {
      obj: "I don't trust sales calls.",
      res: "I understand completely. That's why we focus on providing clear information, not pressure. You're free to decide.",
      why: ["Builds trust", "Removes pressure", "Calms customer"],
    },
    {
      obj: "I don't want to change anything.",
      res: "That's totally fine. I'm just sharing options so you have information when you need it.",
      why: ["Respectful", "Non-aggressive", "Keeps door open"],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-poppins text-gray-900 overflow-hidden">
      <Sidebar5
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full relative bg-white w-full">
        {/* Header */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 lg:px-8 shrink-0 z-20">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg text-gray-500 transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="sm:w-6 sm:h-6" />
              )}
            </button>
            <div className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-widest hidden xs:block">
              Part 1: The Foundation / Day 3
            </div>
          </div>
          <button
            onClick={handleExit}
            className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider transition-all px-2 sm:px-4 py-1.5 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-full cursor-pointer whitespace-nowrap"
          >
            EXIT COURSE
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50 custom-scrollbar"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 pb-28 lg:pb-32">
            {/* Title Section */}
            <div className="mb-8 sm:mb-12 animate-fade-in">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-widest block mb-2 sm:mb-3">
                Core Skills
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-batangas font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Sales Process Training
              </h1>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              <p className="text-base md:text-lg text-gray-600 font-medium max-w-3xl leading-relaxed">
                Day 3 focuses on{" "}
                <strong className="text-slate-900">
                  how to sell professionally
                </strong>
                . Selling is not about forcing customers or talking too much —
                it is about understanding the customer, offering the right
                solution, and guiding them confidently.
              </p>
            </div>

            {/* Why a good process matters */}
            <div
              className="bg-white/90 backdrop-blur-md border-l-4 border-red-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-10 sm:mb-12 flex flex-col sm:flex-row flex-wrap items-start sm:flex-nowrap sm:items-center justify-between gap-4 sm:gap-6 animate-fade-in shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-shadow"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 border border-red-100">
                  <Target size={20} />
                </div>
                <h3 className="font-batangas font-bold text-slate-900 text-base md:text-lg">
                  A good sales process builds:
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                {[
                  "Trust",
                  "Confidence",
                  "Long-term customers",
                  "Better performance",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-200 flex items-center gap-1.5 sm:gap-2 hover:border-red-200 transition-colors"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-emerald-500 sm:w-4 sm:h-4"
                    />{" "}
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 1 & 2: Greeting & Needs */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {/* Greeting */}
              <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                    1. Greeting & Intro
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 font-medium mb-6">
                  The first 10-15 seconds of a call are very important. This is
                  where the customer decides whether to listen.
                </p>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-3">
                    Example Greetings:
                  </h4>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 italic bg-white p-3 rounded-lg border border-gray-200 shadow-sm leading-relaxed">
                      "Hi, this is John calling from Vahlay Consulting. Am I
                      speaking with the owner or manager?"
                    </p>
                    <p className="text-sm text-gray-700 italic bg-white p-3 rounded-lg border border-gray-200 shadow-sm leading-relaxed">
                      "Good afternoon, this is John from Vahlay Consulting. I'm
                      calling regarding business internet options for your
                      location."
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Important Tips:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {greetingTips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm font-medium text-gray-700"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Needs */}
              <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <Ear size={24} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                    2. Understanding Needs
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
                  Selling starts with{" "}
                  <strong className="text-slate-900">
                    listening, not talking.
                  </strong>
                </p>

                <div className="space-y-4 flex-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Good Questions to Ask:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "What internet speed are you currently using?",
                      "How many devices or employees use the internet?",
                      "Are you facing any speed or connectivity issues?",
                      "Do you use phone lines or VoIP services?",
                    ].map((q, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-700 font-medium bg-gray-50 p-3 rounded-xl border border-gray-200"
                      >
                        <span className="text-red-600 font-bold">Q:</span> {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-slate-900 p-4 rounded-xl text-center shadow-md">
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1 font-poppins">
                    Golden Rule
                  </p>
                  <p className="text-sm sm:text-base text-white font-batangas font-bold">
                    Never pitch before understanding the need.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 & 4 & 5: Pitch, Objections, Closing */}
            <div
              className="mb-12 sm:mb-16 animate-fade-in"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pitching */}
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-red-200 transition-all">
                  <div className="flex items-center gap-3 mb-4 text-slate-900">
                    <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                      <MessageSquareText size={20} className="text-red-600" />
                    </div>
                    <h2 className="text-lg font-batangas font-bold">
                      3. Pitching
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-5 flex-1 font-medium">
                    Presenting the solution in a way that makes sense. It
                    matches needs, explains benefits (not just price), and
                    sounds helpful.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl relative mt-auto">
                    <span className="absolute -top-3 left-4 bg-white text-[10px] font-semibold text-red-600 px-2 py-0.5 border border-red-100 rounded-full uppercase tracking-wider">
                      Example
                    </span>
                    <p className="text-sm text-gray-700 italic font-medium mt-1">
                      "Based on what you shared, I'd recommend a 600 Mbps plan.
                      It will handle your POS system and cameras smoothly."
                    </p>
                  </div>
                </div>

                {/* Objections */}
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-amber-200 transition-all">
                  <div className="flex items-center gap-3 mb-4 text-slate-900">
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                      <ShieldAlert size={20} className="text-amber-500" />
                    </div>
                    <h2 className="text-lg font-batangas font-bold">
                      4. Objections
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-5 flex-1 font-medium">
                    Objections are normal. It does not mean they aren't
                    interested — it means they need clarity.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl mt-auto">
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      Golden Rules:
                    </p>
                    <ul className="text-sm text-slate-900 font-medium space-y-1">
                      <li> Never argue or sound frustrated</li>
                      <li> Listen fully</li>
                      <li> Respond calmly</li>
                    </ul>
                  </div>
                </div>

                {/* Closing */}
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:col-span-2 lg:col-span-1 hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-3 mb-4 text-slate-900">
                    <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    </div>
                    <h2 className="text-lg font-batangas font-bold">
                      5. Closing
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-5 flex-1 font-medium">
                    Asking for the next step, not forcing the customer. Reduces
                    pressure and increases trust.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl relative mt-auto">
                    <span className="absolute -top-3 left-4 bg-white text-[10px] font-semibold text-emerald-600 px-2 py-0.5 border border-emerald-100 rounded-full uppercase tracking-wider">
                      Soft Close
                    </span>
                    <p className="text-sm text-gray-700 italic font-medium mt-1">
                      "Would you like me to check availability at your address?"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Mistakes to Avoid */}
            <div
              className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 sm:p-8 mb-12 animate-fade-in flex flex-col md:flex-row gap-6 lg:gap-10 items-center shadow-sm hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="shrink-0 text-center md:text-left">
                <div className="w-14 h-14 bg-rose-50 text-rose-500 border border-rose-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <XCircle size={28} />
                </div>
                <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                  6. Common Mistakes
                </h2>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  Avoid these at all costs.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {salesMistakes.map((mistake, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 flex items-center gap-3 text-sm font-semibold text-gray-700 hover:border-rose-200 transition-colors"
                  >
                    <span className="text-rose-500 text-base leading-none">
                      ❌
                    </span>{" "}
                    {mistake}
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Sales Call Flow */}
            <div
              className="mb-14 sm:mb-16 animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900 mb-8 text-center">
                7. What a Good Sales Call Looks Like
              </h2>
              <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
                {salesFlow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="bg-white/90 backdrop-blur-sm border-2 border-red-600 text-slate-900 font-bold text-sm sm:text-base px-4 sm:px-6 py-3 rounded-xl shadow-sm text-center w-full sm:w-auto hover:bg-red-50 transition-colors cursor-default">
                      {step}
                    </div>
                    {idx < salesFlow.length - 1 && (
                      <ArrowRight
                        className="text-gray-400 hidden md:block"
                        size={20}
                      />
                    )}
                    {idx < salesFlow.length - 1 && (
                      <div className="w-full flex justify-center md:hidden my-1">
                        <ArrowDown className="text-gray-400" size={20} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* SECTION A: Role Plays */}
            <div
              className="mb-14 sm:mb-16 animate-fade-in"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl">
                  <Headset size={24} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                    SECTION A: Real Call Role-Plays
                  </h2>
                  <p className="text-sm font-medium text-gray-500">
                    Practice real conversations you will face on calls.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rolePlays.map((rp, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all"
                  >
                    <div className="bg-slate-50 px-5 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                      <h3 className="font-batangas font-bold text-slate-900 text-sm sm:text-base">
                        Role-Play {rp.title}
                      </h3>
                    </div>
                    <div className="p-5 sm:p-6 flex-1 space-y-5 sm:space-y-6">
                      {/* Customer Chat */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border border-gray-300">
                          <User size={14} className="text-gray-600" />
                        </div>
                        <div className="bg-gray-100 text-gray-800 p-4 rounded-xl rounded-tl-sm text-sm font-medium border border-gray-200">
                          {rp.customer}
                        </div>
                      </div>
                      {/* Agent Chat */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-sm">
                          <Headset size={14} className="text-white" />
                        </div>
                        <div className="bg-red-50 border border-red-100 text-red-900 p-4 rounded-xl rounded-tr-sm text-sm font-medium shadow-sm">
                          {rp.agent}
                        </div>
                      </div>
                    </div>
                    {/* Notes */}
                    <div className="bg-white px-5 sm:px-6 py-4 border-t border-gray-100">
                      <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Trainer Notes:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {rp.notes.map((note, nIdx) => (
                          <span
                            key={nIdx}
                            className="text-[10px] sm:text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-2 py-1 rounded"
                          >
                            ✓ {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION B: Objections Cheat Sheet */}
            <div
              className="mb-14 sm:mb-16 animate-fade-in"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-amber-50 border border-amber-100 text-amber-500 rounded-xl">
                    <BookOpenCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                      SECTION B: Objections & Responses
                    </h2>
                    <p className="text-sm font-medium text-gray-500">
                      Memorize the approach, not the exact words.
                    </p>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start md:self-auto border border-gray-200">
                  <button
                    onClick={() => setObjectionTab("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${objectionTab === "all"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-gray-600 hover:text-slate-900"
                      }`}
                  >
                    All ({mostCommonObjections.length + telecomObjections.length})
                  </button>
                  <button
                    onClick={() => setObjectionTab("common")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${objectionTab === "common"
                        ? "bg-white text-red-600 shadow-sm"
                        : "text-gray-600 hover:text-red-600"
                      }`}
                  >
                    <Flame size={13} className="text-red-500 fill-red-500" />
                    Most Common ({mostCommonObjections.length})
                  </button>
                  <button
                    onClick={() => setObjectionTab("general")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${objectionTab === "general"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-gray-600 hover:text-slate-900"
                      }`}
                  >
                    General ({telecomObjections.length})
                  </button>
                </div>
              </div>

              {/* B.1: Most Common Objections */}
              {(objectionTab === "all" || objectionTab === "common") && (
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <Flame size={13} className="text-red-500 fill-red-500" />
                        Most Common Objections
                      </span>
                      <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                        High frequency campaign & retention rebuttals
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">
                      {mostCommonObjections.length} Scenarios
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mostCommonObjections.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col hover:shadow-[0_8px_30px_rgba(220,38,38,0.08)] hover:border-red-200 transition-all group"
                      >
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {item.tag}
                          </span>
                          <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
                            <Flame size={11} className="text-red-500 fill-red-500" /> Most Common
                          </span>
                        </div>

                        {/* Objection */}
                        <h4 className="font-batangas font-bold text-slate-900 mb-3.5 flex items-start gap-2.5 text-sm sm:text-base leading-snug">
                          <span className="text-rose-500 mt-0.5 shrink-0">
                            <XCircle size={16} />
                          </span>
                          <span>"{item.obj}"</span>
                        </h4>

                        {/* Rebuttal */}
                        <div className="bg-red-50/40 border-l-4 border-red-600 p-3.5 sm:p-4 rounded-r-xl mb-4 flex-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-600 mb-1.5">
                            <MessageSquareText size={12} />
                            <span>Rebuttal:</span>
                          </div>
                          <p className="text-sm text-gray-800 font-medium italic leading-relaxed">
                            "{item.res}"
                          </p>

                          {/* Branching actions if any */}
                          {item.followUp && (
                            <div className="mt-3 pt-3 border-t border-red-100 space-y-2">
                              {item.followUp.map((branch, bIdx) => (
                                <div
                                  key={bIdx}
                                  className={`p-2 rounded-lg text-xs font-medium border ${branch.variant === "success"
                                      ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                                      : "bg-blue-50/80 border-blue-200 text-blue-900"
                                    }`}
                                >
                                  <strong className="font-bold mr-1">{branch.condition}:</strong>
                                  <span>{branch.action}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Why this works */}
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                            Why This Works:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.why.map((reason, wIdx) => (
                              <span
                                key={wIdx}
                                className="bg-white border border-gray-200 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* B.2: General Telecom Objections */}
              {(objectionTab === "all" || objectionTab === "general") && (
                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        General Telecom Objections
                      </span>
                      <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                        Standard telecom scenarios and non-challenging rebuttals
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">
                      {telecomObjections.length} Scenarios
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {telecomObjections.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all"
                      >
                        <h4 className="font-batangas font-bold text-slate-900 mb-3 flex items-start gap-2 text-sm sm:text-base">
                          <span className="text-rose-500 mt-0.5 shrink-0">
                            <XCircle size={16} />
                          </span>{" "}
                          <span>"{item.obj}"</span>
                        </h4>
                        <div className="bg-gray-50 border-l-4 border-slate-700 p-3 sm:p-4 rounded-r-xl mb-4 flex-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            <MessageSquareText size={12} />
                            <span>Rebuttal:</span>
                          </div>
                          <p className="text-sm text-gray-700 font-medium italic leading-relaxed">
                            "{item.res}"
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
                            Why This Works:
                          </p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.why.map((reason, wIdx) => (
                              <span
                                key={wIdx}
                                className="bg-white border border-gray-200 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Closing & Trainer Guidance */}
            <div
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-gray-100 relative animate-fade-in hover:shadow-[0_8px_30px_rgba(0,255,255,0.05)] transition-all"
              style={{ animationDelay: "0.8s", animationFillMode: "both" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center justify-center">
                      <Zap size={24} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-batangas font-bold text-slate-900">
                      Day 3 Guidance
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium mb-6 leading-relaxed">
                    Sales is a skill — not a talent you are born with. With
                    practice, patience, and discipline, anyone can become a good
                    sales professional.
                  </p>
                  <ul className="space-y-3 font-medium text-gray-700 text-sm sm:text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-500" size={18} />{" "}
                      Listen more than you talk
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-500" size={18} /> Be
                      honest & stay calm
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-500" size={18} />{" "}
                      Focus on helping, not pushing
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg font-batangas font-bold text-slate-900 mt-6 pt-6 border-t border-gray-100">
                    Your confidence will grow with each call.
                  </p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <h3 className="text-base sm:text-lg font-batangas font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-500" /> Trainer
                    Notes
                  </h3>
                  <ul className="space-y-4 text-sm sm:text-base text-gray-300 font-medium">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
                      <span>
                        Objections are{" "}
                        <strong className="text-white">not rejection.</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
                      <span>
                        Calm responses convert more than aggressive sales.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
                      <span>Tone matters more than words.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
                      <span className="text-red-400 font-bold">
                        Never argue or force a close.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Continue Button */}
        {isBottomReached && (
          <div className="fixed sm:absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 animate-fade-in">
            <button
              onClick={handleContinue}
              className="group flex items-center gap-2 sm:gap-3 bg-red-600 text-white px-4 sm:px-6 lg:px-6 py-3 sm:py-3 rounded-full font-semibold shadow-lg sm:shadow-xl shadow-red-200 hover:bg-slate-900 hover:shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm whitespace-nowrap"
            >
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5"
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
          width: 4px;
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

        /* Extra small devices */
        @media (max-width: 480px) {
          .xs\\:block {
            display: block;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(Day3);
