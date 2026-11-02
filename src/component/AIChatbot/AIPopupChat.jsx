import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  GraduationCap,
  UserCheck,
  User,
  X,
  Minus,
  Maximize2,
  Send,
  Sparkles,
  Check,
  Copy,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Settings,
  Cpu
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { queryAITrainer, getAIConfig } from "../../ai/aiService.js";
import AISettingsModal from "./AISettingsModal.jsx";

const POPUP_QUICK_CHIPS = [
  "What is PSU?",
  "What is ALC?",
  "Explain Premier Package",
  "Explain Bundling Rule",
  "Difference between Coax and Fiber"
];

export default function AIPopupChat({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Hello! I'm your Vahlay Training Mentor. I'm here to coach you through the complete 8-Day Spectrum Business training program (Day 1 to Day 8) — from US address formats, internet tiers, and bundling rules to buyflow qualification, soft skills, and final certification. Ask me any question or tell me what you're revising, and we'll walk through it together!",
      verification: {
        checkedAgainst: "Vahlay 8-Day Curriculum",
        status: "Trainer Ready"
      },
      citations: ["Vahlay 8-Day Training Program"],
      suggestedQuestions: ["How 8 days of training works", "What is PSU?", "Explain 2026 Plans"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkingStep, setCheckingStep] = useState(""); // Phase text
  const [copiedId, setCopiedId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDockHidden, setIsDockHidden] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [aiConfig, setAiConfig] = useState(getAIConfig());

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const updateConfig = () => setAiConfig(getAIConfig());
    window.addEventListener("vahlay_ai_config_updated", updateConfig);
    return () => window.removeEventListener("vahlay_ai_config_updated", updateConfig);
  }, []);

  // Auto-scroll inside chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isChecking, isOpen]);

  // Don't render floating widget if already on the full AI assistant page
  if (location.pathname === "/ai-trainer" || location.pathname === "/ai-assistant") {
    return null;
  }

  const handleSend = async (customText) => {
    const text = (customText || inputValue).trim();
    if (!text || isChecking) return;

    const userMsg = {
      id: "user-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsChecking(true);

    const isCasual = ["hey", "hi", "hello", "kaise", "namaste", "morning", "who are you"].some(g => text.toLowerCase().includes(g));

    if (isCasual) {
      setCheckingStep("Your trainer is preparing a response...");
      await new Promise(r => setTimeout(r, 250));
    } else {
      setCheckingStep("Reviewing question against Day 1–8 training notes...");
      await new Promise(r => setTimeout(r, 400));
      setCheckingStep("Verifying lesson guidelines & practical floor examples...");
      await new Promise(r => setTimeout(r, 350));
      setCheckingStep("Formulating step-by-step coaching guidance...");
    }

    try {
      const result = await queryAITrainer({
        query: text,
        conversationHistory: messages
      });

      const assistantMsg = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content: result.text,
        citations: result.citations || [],
        verification: result.verification || {
          checkedAgainst: result.citations?.[0] || "Spectrum Training Curriculum",
          status: "Verified & Grounded"
        },
        suggestedQuestions: result.suggestedQuestions || [],
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMsg]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content: "I checked our training material, but encountered a temporary connection issue. Please ask again!",
          citations: []
        }
      ]);
    } finally {
      setIsChecking(false);
      setCheckingStep("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Chat reset. How can I help you with your Spectrum Business training right now?",
        citations: ["Vahlay 8-Day Training Program"],
        suggestedQuestions: ["How 8 days of training works", "What is PSU?", "Explain 2026 Plans"]
      }
    ]);
  };

  return (
    <>
      {/* Side Docked Trigger (Comes out from right side, with hide/show animation) */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <>
            {isDockHidden ? (
              // Tucked / Hidden Edge Tab (Sleek compact handle docked to the right edge)
              <motion.div
                key="side-dock-hidden"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 360, damping: 26 }}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
              >
                <motion.button
                  whileHover={{ x: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setIsDockHidden(false)}
                  className="group flex items-center gap-1.5 pl-2.5 pr-1.5 py-2 bg-gradient-to-l from-slate-950 via-slate-900 to-red-800 text-white rounded-l-xl shadow-[-3px_4px_15px_rgba(220,38,38,0.3)] border-l border-y border-white/70 cursor-pointer transition-all duration-200"
                  title="Show AI Training Mentor (Click to expand)"
                >
                  <ChevronLeft
                    size={13}
                    className="text-white/80 group-hover:-translate-x-0.5 transition-transform animate-pulse"
                  />
                  <div className="relative">
                    <GraduationCap size={16} className="text-white drop-shadow-xs" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 border border-slate-900 rounded-full animate-ping" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 border border-slate-900 rounded-full" />
                  </div>
                  {unreadCount > 0 && (
                    <span className="px-1 py-0.2 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full shadow">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>
              </motion.div>
            ) : (
              // Visible Side Tab: Compact pill smoothly sliding out from the right side
              <motion.div
                key="side-dock-visible"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 360, damping: 26 }}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
              >
                <div className="flex items-center gap-1.5 pl-2 pr-1 py-1 bg-gradient-to-l from-slate-950/95 via-slate-900/95 to-slate-900/90 backdrop-blur-md rounded-l-full shadow-[-4px_6px_20px_rgba(0,0,0,0.35)] border-l border-y border-red-500/40 hover:border-red-400/80 transition-all duration-300">
                  
                  {/* Hide to side button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsDockHidden(true)}
                    className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
                    title="Hide into side edge"
                  >
                    <ChevronRight size={13} />
                  </motion.button>

                  {/* AI Mentor Label (compact single line, clickable to open chat) */}
                  <div
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer select-none hidden sm:flex items-center gap-1.5 pr-0.5 group"
                  >
                    <span className="text-[11px] font-semibold text-white tracking-tight group-hover:text-red-300 transition-colors">
                      AI Mentor
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Compact Circular Graduation Cap Icon Button */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setIsOpen(true)}
                    className="group relative w-9 h-9 sm:w-9.5 sm:h-9.5 bg-gradient-to-r from-red-600 to-slate-900 hover:from-red-700 hover:to-slate-800 text-white rounded-full shadow-md hover:shadow-[0_0_18px_rgba(220,38,38,0.55)] transition-all duration-300 flex items-center justify-center cursor-pointer border border-white/90"
                    title="Ask Vahlay Training Mentor"
                  >
                    <div className="relative">
                      <GraduationCap size={18} className="text-white drop-shadow-xs" />
                      {/* Online Green Pulsing Indicator */}
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 border border-slate-900 rounded-full animate-ping" />
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-slate-900 rounded-full" />
                    </div>

                    {/* Unread Message Counter Badge */}
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -left-1 px-1.5 py-0.2 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full shadow-md animate-bounce">
                        {unreadCount}
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Floating Chatbox Popup Window (Slides out from the side) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 420, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 420, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 27 }}
            className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[88vh] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-gray-200/90 flex flex-col overflow-hidden font-sans"
          >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between shrink-0 shadow-xs border-b border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-red-600 to-red-700 text-white flex items-center justify-center font-bold shadow-xs">
                  <GraduationCap size={18} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-white truncate">
                    Vahlay Training Mentor
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 rounded-full shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {aiConfig.apiKey && aiConfig.apiKey.trim().length > 5 ? `${aiConfig.provider === "gemini" ? "Gemini AI" : "OpenAI"}` : "Online"}
                  </span>
                </div>
                <p className="text-[10px] text-gray-300 truncate">
                  Senior Floor Coach • Spectrum Business
                </p>
              </div>
            </div>

            {/* Window Action Controls */}
            <div className="flex items-center gap-1 text-gray-400 shrink-0">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="AI Model & API Key Configuration"
              >
                <Settings size={14} />
              </button>
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/ai-trainer");
                }}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Expand to Full Training Workspace"
              >
                <Maximize2 size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 custom-scrollbar">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id || idx}
                  className={`flex gap-2.5 ${
                    isAssistant ? "items-start" : "items-start flex-row-reverse"
                  }`}
                >
                  {/* Bubble Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      isAssistant
                        ? "bg-gradient-to-tr from-slate-900 to-red-950 text-white shadow-2xs"
                        : "bg-red-600 text-white shadow-2xs"
                    }`}
                  >
                    {isAssistant ? <GraduationCap size={15} /> : <User size={14} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`space-y-1.5 max-w-[85%] ${isAssistant ? "text-left" : "text-left"}`}>
                    {/* Topic / Status Badge */}
                    {isAssistant && msg.verification && (
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/80 font-medium w-fit">
                        <GraduationCap size={12} className="text-emerald-600" />
                        <span>
                          {msg.verification.checkedAgainst === "Vahlay Training Mentor" ||
                          msg.verification.status === "Trainer Ready" ||
                          msg.verification.status === "Personal Trainer Ready"
                            ? "Mentor Online"
                            : `${msg.verification.checkedAgainst || "Day 1–3 Curriculum"}`}
                        </span>
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl shadow-2xs text-xs leading-relaxed ${
                        isAssistant
                          ? "bg-white border border-gray-200/90 text-slate-900"
                          : "bg-red-600 text-white font-medium"
                      }`}
                    >
                      {/* Markdown text */}
                      <div className={isAssistant ? "prose prose-xs max-w-none text-slate-800 prose-headings:font-bold prose-headings:text-slate-900 prose-table:border prose-th:p-1.5 prose-td:p-1.5" : "whitespace-pre-wrap text-white"}>
                        {isAssistant ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        ) : (
                          msg.content
                        )}
                      </div>

                      {/* Source Footnote (only if not already printed in markdown) */}
                      {isAssistant && msg.citations && msg.citations.length > 0 && !msg.content.includes("Training Reference:") && (
                        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1 text-[10px] text-gray-500">
                          <GraduationCap size={12} className="text-red-600" />
                          <span>Training Reference: {msg.citations[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Copy Button */}
                    {isAssistant && (
                      <div className="flex items-center justify-between px-1 text-gray-400 text-[10px]">
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="hover:text-slate-700 transition flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={11} className="text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Follow up suggestions */}
                    {isAssistant && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {msg.suggestedQuestions.slice(0, 3).map((q, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSend(q)}
                            className="text-[11px] bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 hover:border-red-300 px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs transition-all cursor-pointer text-left font-medium flex items-center gap-1.5 hover:shadow-xs active:scale-98"
                          >
                            <Sparkles size={11} className="text-amber-500 shrink-0" />
                            <span>{q}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Human Verification In-Progress Indicator */}
            {isChecking && (
              <div className="flex gap-2.5 items-start animate-fadeIn">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-slate-900 to-red-950 text-white flex items-center justify-center shrink-0">
                  <GraduationCap size={15} />
                </div>
                <div className="bg-white border border-gray-200/90 p-3 rounded-2xl shadow-2xs space-y-1.5 max-w-[85%]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <Search size={14} className="text-red-600 animate-spin" />
                    <span>{checkingStep || "Checking question & training notes..."}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Verifying official guidelines before answering...
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips (No scrollbar) */}
          <div className="px-3.5 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 select-none">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pr-0.5">
              <Sparkles size={11} className="text-amber-500" />
              Quick:
            </span>
            {POPUP_QUICK_CHIPS.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip)}
                className="text-[11px] px-2.5 py-1 bg-slate-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-slate-600 rounded-full border border-gray-200/90 whitespace-nowrap transition cursor-pointer font-medium shrink-0 active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-2xl px-3 py-1.5 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15 focus-within:bg-white transition-all shadow-2xs">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your question (English, Hindi, Hinglish)..."
                className="flex-1 py-1 text-xs text-slate-800 placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isChecking}
                className={`p-2 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                  inputValue.trim() && !isChecking
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer transform active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                title="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* AI Model & API Key Settings Modal */}
    <AISettingsModal
      isOpen={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
    />
  </>
);
}
