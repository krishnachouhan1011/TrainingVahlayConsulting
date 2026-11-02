import React, { useState, useEffect } from "react";
import {
  Menu,
  Sparkles,
  Settings,
  MessageSquare,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ChevronLeft,
  GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import ConversationDrawer from "./ConversationDrawer";
import ChatInterface from "./ChatInterface";
import TopicLearnMode from "./TopicLearnMode";
import PracticeQuizMode from "./PracticeQuizMode";
import SourceCitationModal from "./SourceCitationModal";
import AISettingsModal from "./AISettingsModal";

const CONVERSATIONS_STORAGE_KEY = "vahlay_ai_conversations";

export default function AITrainingAssistant() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState("chat"); // "chat" | "learn" | "quiz"
  const [selectedDay, setSelectedDay] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modals state
  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState("");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Conversations state
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "default-chat",
        title: "New Training Chat",
        selectedModule: "all",
        createdAt: new Date().toISOString(),
        messages: []
      }
    ];
  });

  const [activeConversationId, setActiveConversationId] = useState(
    conversations[0]?.id || "default-chat"
  );

  // Save conversations whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.error(e);
    }
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const handleUpdateConversation = (updated) => {
    setConversations(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    );
  };

  const handleNewConversation = () => {
    const newConv = {
      id: "conv-" + Date.now(),
      title: "New Training Chat",
      selectedModule: selectedDay,
      createdAt: new Date().toISOString(),
      messages: []
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setActiveMode("chat");
  };

  const handleDeleteConversation = (id) => {
    if (conversations.length <= 1) {
      // Clear messages of only one remaining
      handleUpdateConversation({
        ...conversations[0],
        title: "New Training Chat",
        messages: []
      });
      return;
    }
    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    if (activeConversationId === id) {
      setActiveConversationId(filtered[0].id);
    }
  };

  const handleOpenCitation = (citationTitle) => {
    setActiveCitation(citationTitle);
    setCitationModalOpen(true);
  };

  const handleAskInChat = (promptText) => {
    setActiveMode("chat");
    // Switch to active chat and prepare message
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-gray-900 overflow-hidden">
      {/* Left Navigation Drawer */}
      <ConversationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          setActiveMode("chat");
        }}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        activeMode={activeMode}
        onSwitchMode={(mode) => setActiveMode(mode)}
        selectedDay={selectedDay}
        onSelectDay={(day) => setSelectedDay(day)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between shrink-0 z-10 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-xl text-gray-500 hover:text-slate-800 hover:bg-gray-100 md:hidden transition cursor-pointer"
            >
              <Menu size={20} />
            </button>

            <button
              onClick={() => navigate(-1)}
              className="p-1.5 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition cursor-pointer hidden sm:flex items-center gap-1 text-xs font-semibold"
              title="Return to Portal"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center font-bold">
                <GraduationCap size={18} />
              </div>
              <div>
                <h1 className="font-bold text-sm sm:text-base text-slate-900 font-batangas leading-tight">
                  Vahlay Training Mentor
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Personal Mentor • Days 1–3
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            {[
              { id: "chat", label: "Ask Training Mentor", icon: MessageSquare },
              { id: "learn", label: "Learn a Topic", icon: BookOpen },
              { id: "quiz", label: "Practice Quiz", icon: HelpCircle },
            ].map(m => {
              const Icon = m.icon;
              const isSelected = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-gray-600 hover:text-slate-900"
                  }`}
                >
                  <Icon size={14} className={isSelected ? "text-red-600" : "text-gray-400"} />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings & User Badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSettingsModalOpen(true)}
              className="p-2 text-gray-500 hover:text-slate-900 hover:bg-gray-100 rounded-xl transition cursor-pointer"
              title="Configure AI Provider & Key"
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Mobile Segmented Mode Bar */}
        <div className="sm:hidden bg-white border-b border-gray-200 p-2 flex gap-1">
          {[
            { id: "chat", label: "Ask Trainer", icon: MessageSquare },
            { id: "learn", label: "Learn", icon: BookOpen },
            { id: "quiz", label: "Quiz", icon: HelpCircle },
          ].map(m => {
            const Icon = m.icon;
            const isSelected = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                  isSelected
                    ? "bg-red-600 text-white font-bold shadow-xs"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Icon size={12} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Mode Content Body */}
        <div className="flex-1 overflow-hidden relative">
          {activeMode === "chat" && (
            <ChatInterface
              conversation={activeConversation}
              onUpdateConversation={handleUpdateConversation}
              onOpenSettings={() => setSettingsModalOpen(true)}
              onOpenCitation={handleOpenCitation}
              onSwitchToQuiz={() => setActiveMode("quiz")}
              selectedDay={selectedDay}
              onSelectDay={(day) => setSelectedDay(day)}
            />
          )}

          {activeMode === "learn" && (
            <TopicLearnMode
              onAskInChat={handleAskInChat}
            />
          )}

          {activeMode === "quiz" && (
            <PracticeQuizMode
              onSwitchToTopic={() => setActiveMode("learn")}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <SourceCitationModal
        isOpen={citationModalOpen}
        onClose={() => setCitationModalOpen(false)}
        citationTitle={activeCitation}
      />

      <AISettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </div>
  );
}
