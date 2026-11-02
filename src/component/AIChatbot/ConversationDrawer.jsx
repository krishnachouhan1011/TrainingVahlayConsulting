import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Search,
  Trash2,
  BookOpen,
  HelpCircle,
  TrendingUp,
  X,
  GraduationCap,
  Calendar,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function ConversationDrawer({
  isOpen,
  onClose,
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  activeMode,
  onSwitchMode,
  selectedDay,
  onSelectDay
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(c =>
    !searchQuery ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Drawer Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full transform transition-transform duration-300 ease-in-out shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap size={18} />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 font-batangas">
                Vahlay Training Mentor
              </h2>
              <span className="text-[10px] text-gray-500 block">
                Spectrum Training Portal
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-slate-700 md:hidden cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onNewConversation();
              if (onClose) onClose();
            }}
            className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            <span>New Training Chat</span>
          </button>
        </div>

        {/* Primary Navigation Modes */}
        <div className="px-3 pb-2 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-1">
            Learning Modes
          </span>
          {[
            { id: "chat", label: "Ask AI Trainer", icon: MessageSquare },
            { id: "learn", label: "Learn a Topic", icon: BookOpen },
            { id: "quiz", label: "Practice Quiz", icon: HelpCircle },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSwitchMode(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={15} className={isActive ? "text-red-400" : "text-gray-400"} />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
              </button>
            );
          })}
        </div>

        {/* Training Modules Filter */}
        <div className="px-3 py-2 border-t border-gray-100 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-1">
            Curriculum Focus
          </span>
          {[
            { id: "all", label: "All Training Modules" },
            { id: "day 1", label: "Day 1: Fundamentals" },
            { id: "day 2", label: "Day 2: Services & Packages" },
            { id: "day 3", label: "Day 3: Sales & Operations" },
          ].map(m => {
            const isSelected = (selectedDay || "all").toLowerCase() === m.id.toLowerCase();
            return (
              <button
                key={m.id}
                onClick={() => onSelectDay && onSelectDay(m.id.toLowerCase())}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-red-50 text-red-700 font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{m.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
              </button>
            );
          })}
        </div>

        {/* Previous Conversations Section */}
        <div className="flex-1 flex flex-col min-h-0 border-t border-gray-100 pt-3">
          <div className="px-3 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
              My Conversations
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              {filteredConversations.length}
            </span>
          </div>

          {/* Search Box */}
          <div className="px-3 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <Search size={12} className="absolute left-2.5 top-2 text-gray-400" />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">
                No conversations found.
              </div>
            ) : (
              filteredConversations.map(conv => {
                const isSelected = conv.id === activeConversationId;
                return (
                  <div
                    key={conv.id}
                    className={`group relative flex items-center justify-between p-2 rounded-xl text-xs transition cursor-pointer ${
                      isSelected
                        ? "bg-red-50 text-red-900 font-bold border border-red-200"
                        : "text-slate-700 hover:bg-gray-100"
                    }`}
                  >
                    <button
                      onClick={() => {
                        onSelectConversation(conv.id);
                        if (onClose) onClose();
                      }}
                      className="flex items-center gap-2 min-w-0 flex-1 text-left"
                    >
                      <MessageSquare size={14} className={isSelected ? "text-red-600" : "text-gray-400"} />
                      <span className="truncate flex-1">{conv.title || "Untitled Training Chat"}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                      title="Delete conversation"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Brand Note */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/70 text-[11px] text-gray-500 flex items-center justify-between">
          <span className="truncate">Vahlay Consulting Inc.</span>
          <span className="font-semibold text-red-600">v1.0</span>
        </div>
      </aside>
    </>
  );
}
