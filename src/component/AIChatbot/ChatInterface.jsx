import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send,
  Sparkles,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  GraduationCap,
  UserCheck,
  User,
  BookOpen,
  ArrowRight,
  Settings,
  HelpCircle,
  ExternalLink,
  Info
} from "lucide-react";
import { queryAITrainer, getAIConfig } from "../../ai/aiService.js";

const QUICK_ACTIONS = [
  "What is Spectrum Business?",
  "Explain Day 1 Training",
  "Explain Day 2 Training",
  "Explain Day 3 Training",
  "What is ALC?",
  "What is PSU?",
  "Explain Spectrum Internet Packages",
  "Explain Clear Sale vs ALC",
  "Start My Training Quiz"
];

export default function ChatInterface({
  conversation,
  onUpdateConversation,
  onOpenSettings,
  onOpenCitation,
  onSwitchToQuiz,
  selectedDay,
  onSelectDay
}) {
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackState, setFeedbackState] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const config = getAIConfig();
  const hasKey = config.apiKey && config.apiKey.trim().length > 5;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    if (text === "Start My Training Quiz") {
      if (onSwitchToQuiz) onSwitchToQuiz();
      return;
    }

    const userMsg = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString()
    };

    const newMessages = [...(conversation?.messages || []), userMsg];
    onUpdateConversation({
      ...conversation,
      messages: newMessages,
      title: conversation?.messages?.length === 0 ? text.slice(0, 32) + "..." : conversation?.title
    });

    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await queryAITrainer({
        query: text,
        selectedDay: selectedDay || "all",
        conversationHistory: newMessages,
      });

      const assistantMsg = {
        id: "msg-" + (Date.now() + 1),
        role: "assistant",
        content: response.text,
        citations: response.citations || [],
        suggestedQuestions: response.suggestedQuestions || [],
        isLocalFallback: response.isLocalFallback,
        timestamp: new Date().toISOString()
      };

      onUpdateConversation({
        ...conversation,
        messages: [...newMessages, assistantMsg]
      });
    } catch (err) {
      const errorMsg = {
        id: "msg-" + (Date.now() + 1),
        role: "assistant",
        content: "Sorry, an unexpected error occurred while processing your request. Please try again.",
        citations: [],
        timestamp: new Date().toISOString()
      };
      onUpdateConversation({
        ...conversation,
        messages: [...newMessages, errorMsg]
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (msgId, rating) => {
    setFeedbackState(prev => ({
      ...prev,
      [msgId]: rating
    }));

    // Record feedback locally and emit for admin analytics
    try {
      const key = "vahlay_ai_feedback_log";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.unshift({
        id: "fb-" + Date.now(),
        messageId: msgId,
        rating,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegenerate = async (index) => {
    if (isTyping) return;
    // Find previous user message
    const previousUserMsg = conversation?.messages?.[index - 1];
    if (previousUserMsg && previousUserMsg.role === "user") {
      setIsTyping(true);
      try {
        const response = await queryAITrainer({
          query: previousUserMsg.content,
          selectedDay: selectedDay || "all",
          conversationHistory: conversation.messages.slice(0, index - 1),
        });

        const updatedMessages = [...conversation.messages];
        updatedMessages[index] = {
          ...updatedMessages[index],
          content: response.text,
          citations: response.citations || [],
          suggestedQuestions: response.suggestedQuestions || [],
          isLocalFallback: response.isLocalFallback,
        };

        onUpdateConversation({
          ...conversation,
          messages: updatedMessages
        });
      } finally {
        setIsTyping(false);
      }
    }
  };

  const messages = conversation?.messages || [];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
      {/* Top Banner (If Key is not yet configured, clear setup state) */}
      {!hasKey && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900 shrink-0">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-amber-600 shrink-0" />
            <span>
              <strong>Offline Training Engine Active:</strong> Answering directly from pre-verified Spectrum training knowledge. You can optionally connect a Gemini or OpenAI key for live streaming.
            </span>
          </div>
          <button
            onClick={onOpenSettings}
            className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded-md font-semibold text-[11px] transition cursor-pointer"
          >
            Configure Key
          </button>
        </div>
      )}

      {/* Messages Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Welcome Empty State */}
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto py-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-red-500/20">
              <GraduationCap size={34} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-batangas">
                Hello! Welcome to your Vahlay Training Mentor.
              </h2>
              <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                I'm your senior corporate training mentor for the Spectrum Business Training Program.
                Ask me questions about Day 1, Day 2 or Day 3 lessons, practice billing exercises, or prepare for floor calls and tests.
              </p>
              <p className="text-xs font-semibold text-slate-800 pt-1">
                What would you like to review together today?
              </p>
            </div>

            {/* Quick Action Suggestions */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Quick Action Suggestions
              </span>
              <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                {QUICK_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(action)}
                    className="px-3.5 py-2 bg-white hover:bg-red-50 text-slate-800 hover:text-red-700 text-xs font-medium rounded-xl border border-gray-200 shadow-2xs hover:border-red-300 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{action}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Message List */
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id || index}
                  className={`flex gap-3 md:gap-4 ${
                    isAssistant ? "items-start" : "items-start flex-row-reverse"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      isAssistant
                        ? "bg-gradient-to-tr from-slate-900 to-red-950 text-white shadow-xs"
                        : "bg-red-600 text-white shadow-xs"
                    }`}
                  >
                    {isAssistant ? <GraduationCap size={18} /> : <User size={16} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`space-y-2 max-w-[85%] md:max-w-[80%] ${
                    isAssistant ? "text-left" : "text-left"
                  }`}>
                    <div
                      className={`p-4 md:p-5 rounded-2xl shadow-xs ${
                        isAssistant
                          ? "bg-white border border-gray-200 text-slate-900"
                          : "bg-red-600 text-white font-medium"
                      }`}
                    >
                      {/* Markdown Content */}
                      <div className={`text-xs md:text-sm leading-relaxed ${
                        isAssistant
                          ? "prose prose-sm max-w-none prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-table:border prose-th:bg-gray-100 prose-th:p-2 prose-td:p-2 prose-td:border"
                          : "text-white whitespace-pre-wrap"
                      }`}>
                        {isAssistant ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        ) : (
                          msg.content
                        )}
                      </div>

                      {/* Interactive Source Citations */}
                      {isAssistant && msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-bold text-gray-400 mr-1 flex items-center gap-1">
                            <BookOpen size={12} />
                            Sources:
                          </span>
                          {msg.citations.map((cite, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => onOpenCitation && onOpenCitation(cite)}
                              className="text-[11px] font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md border border-red-100 transition cursor-pointer flex items-center gap-1"
                            >
                              <span>{cite}</span>
                              <ExternalLink size={10} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Assistant Message Actions: Copy, Thumbs Up/Down, Regenerate */}
                    {isAssistant && (
                      <div className="flex items-center gap-3 px-1 text-gray-400">
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="hover:text-slate-700 transition flex items-center gap-1 text-[11px] cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={13} className="text-emerald-600" />
                              <span className="text-emerald-600 text-[10px]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleFeedback(msg.id, "up")}
                          className={`hover:text-slate-700 transition cursor-pointer ${
                            feedbackState[msg.id] === "up" ? "text-emerald-600 font-bold" : ""
                          }`}
                          title="Helpful response"
                        >
                          <ThumbsUp size={13} />
                        </button>

                        <button
                          onClick={() => handleFeedback(msg.id, "down")}
                          className={`hover:text-slate-700 transition cursor-pointer ${
                            feedbackState[msg.id] === "down" ? "text-red-600 font-bold" : ""
                          }`}
                          title="Unhelpful response"
                        >
                          <ThumbsDown size={13} />
                        </button>

                        <button
                          onClick={() => handleRegenerate(index)}
                          disabled={isTyping}
                          className="hover:text-slate-700 transition flex items-center gap-1 text-[11px] cursor-pointer ml-auto"
                          title="Regenerate response"
                        >
                          <RotateCcw size={13} />
                          <span className="text-[10px]">Regenerate</span>
                        </button>
                      </div>
                    )}

                    {/* Suggested Follow-up Questions */}
                    {isAssistant && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Suggested Follow-ups
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedQuestions.map((q, qIdx) => (
                            <button
                              key={qIdx}
                              onClick={() => handleSendMessage(q)}
                              className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-gray-200 transition cursor-pointer text-left"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 md:gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-900 to-red-950 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <GraduationCap size={18} />
                </div>
                <div className="bg-white border border-gray-200 p-3.5 rounded-2xl flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" />
                  <span className="text-xs text-gray-500 font-medium ml-1.5">
                    Analyzing training curriculum...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Composer */}
      <div className="p-3 md:p-4 bg-white border-t border-gray-200 shrink-0">
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Day Filter Pills in Composer */}
          <div className="flex items-center justify-between text-xs pb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-medium text-[11px]">Knowledge Filter:</span>
              {["all", "Day 1", "Day 2", "Day 3"].map(d => (
                <button
                  key={d}
                  onClick={() => onSelectDay && onSelectDay(d.toLowerCase())}
                  className={`px-2 py-0.5 rounded-md font-semibold text-[10px] transition cursor-pointer ${
                    (selectedDay || "all").toLowerCase() === d.toLowerCase()
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {d === "all" ? "All Modules" : d}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenSettings}
              className="text-gray-400 hover:text-slate-700 transition flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <Settings size={13} />
              <span>AI Provider Settings</span>
            </button>
          </div>

          {/* Text Input Box */}
          <div className="relative flex items-end bg-gray-50 border border-gray-200 rounded-2xl p-1.5 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 transition">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Day 1, Day 2, or Day 3 (e.g. 'What is PSU?', 'ALC kya hota hai?')..."
              className="w-full p-2.5 bg-transparent resize-none text-xs md:text-sm text-slate-800 placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="p-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white rounded-xl shadow-xs transition cursor-pointer shrink-0 ml-1.5"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
            <span>Press <kbd className="px-1 py-0.5 bg-gray-100 border rounded font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-gray-100 border rounded font-mono text-[10px]">Shift+Enter</kbd> for new line</span>
            <span>Supports English, Hindi, & Hinglish</span>
          </div>
        </div>
      </div>
    </div>
  );
}
