import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Search,
  Check
} from "lucide-react";
import { TOPIC_CURRICULUM } from "../../ai/topicLearningData";

export default function TopicLearnMode({ onAskInChat }) {
  const [selectedDayFilter, setSelectedDayFilter] = useState("all");
  const [selectedTopicId, setSelectedTopicId] = useState(TOPIC_CURRICULUM[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [showSimplified, setShowSimplified] = useState(false);
  const [showAlternateExample, setShowAlternateExample] = useState(false);

  // Filter topics
  const filteredTopics = TOPIC_CURRICULUM.filter(topic => {
    const matchesDay = selectedDayFilter === "all" || topic.day.toLowerCase() === selectedDayFilter.toLowerCase();
    const matchesSearch = !searchQuery ||
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSearch;
  });

  const activeTopic = TOPIC_CURRICULUM.find(t => t.id === selectedTopicId) || TOPIC_CURRICULUM[0];

  const toggleAnswer = (idx) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleTopicSelect = (id) => {
    setSelectedTopicId(id);
    setShowSimplified(false);
    setShowAlternateExample(false);
    setRevealedAnswers({});
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-slate-50">
      {/* Left Topic Syllabus Picker */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
        {/* Header & Filters */}
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen size={16} className="text-red-600" />
              <span>Training Curriculum</span>
            </h3>
            <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {filteredTopics.length} Topics
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics, definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
          </div>

          {/* Day Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "all", label: "All Days" },
              { id: "day 1", label: "Day 1" },
              { id: "day 2", label: "Day 2" },
              { id: "day 3", label: "Day 3" },
            ].map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedDayFilter(day.id)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedDayFilter === day.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Syllabus Topic List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 divide-y divide-gray-50">
          {filteredTopics.map(topic => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className={`w-full text-left p-3 rounded-xl transition cursor-pointer flex items-start justify-between gap-2 ${
                  isSelected
                    ? "bg-red-50/80 border border-red-200 text-slate-900 shadow-xs"
                    : "hover:bg-gray-50 text-slate-700"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      topic.day === "Day 1" ? "bg-blue-100 text-blue-700" :
                      topic.day === "Day 2" ? "bg-amber-100 text-amber-800" :
                      "bg-emerald-100 text-emerald-800"
                    }`}>
                      {topic.day}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium truncate">
                      {topic.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {topic.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {topic.shortDescription}
                  </p>
                </div>
                <ChevronRight size={16} className={`shrink-0 mt-2 ${isSelected ? "text-red-600" : "text-gray-300"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Topic Detail Viewer */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
        <div className="max-w-3xl w-full space-y-6">
          {/* Header Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-red-100 text-red-700 rounded-md">
                {activeTopic.day}
              </span>
              <span className="text-xs font-semibold text-gray-500">
                {activeTopic.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-batangas">
              {activeTopic.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {activeTopic.introduction}
            </p>

            {/* Quick Actions: Explain More Simply & Give Another Example */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowSimplified(prev => !prev)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  showSimplified
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <Lightbulb size={15} />
                <span>{showSimplified ? "Hide Simplified View" : "Explain More Simply"}</span>
              </button>

              <button
                onClick={() => setShowAlternateExample(prev => !prev)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  showAlternateExample
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200"
                }`}
              >
                <Sparkles size={15} />
                <span>{showAlternateExample ? "Hide Extra Example" : "Give Another Example"}</span>
              </button>

              <button
                onClick={() => onAskInChat && onAskInChat(`Explain ${activeTopic.title} in more detail`)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5 ml-auto"
              >
                <span>Ask AI Trainer</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Dynamic Simplified Explanation Card */}
          {showSimplified && (
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl shadow-sm space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Lightbulb size={16} className="text-amber-600" />
                <span>Simplified Trainer Breakdown</span>
              </div>
              <p className="text-sm text-amber-950 leading-relaxed font-normal">
                {activeTopic.simplifiedExplanation}
              </p>
            </div>
          )}

          {/* Dynamic Extra Example Card */}
          {showAlternateExample && (
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl shadow-sm space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles size={16} className="text-blue-600" />
                <span>Practical Workplace Example</span>
              </div>
              <p className="text-sm text-blue-950 leading-relaxed font-normal">
                {activeTopic.alternateExample}
              </p>
            </div>
          )}

          {/* Section 1: Key Definitions */}
          {activeTopic.definitions && activeTopic.definitions.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Key Definitions & Terminology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {activeTopic.definitions.map((def, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-gray-200/80">
                    <span className="font-bold text-slate-900 text-sm block mb-1">
                      {def.term}
                    </span>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      {def.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Comprehensive Explanation */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Core Training Explanation
            </h3>
            <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-line space-y-3">
              {activeTopic.explanation}
            </div>
          </div>

          {/* Section 3: Training Material Example */}
          {activeTopic.trainingExample && (
            <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                3. Recorded Training Example
              </h3>
              <p className="text-sm text-emerald-950 leading-relaxed font-normal">
                {activeTopic.trainingExample}
              </p>
            </div>
          )}

          {/* Section 4: Important Points to Remember */}
          {activeTopic.importantPoints && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                4. Important Points to Remember
              </h3>
              <ul className="space-y-2 pt-1">
                {activeTopic.importantPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 5: Revision Questions */}
          {activeTopic.revisionQuestions && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  5. Revision & Self-Check Questions
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">Click to reveal answer</span>
              </div>

              <div className="space-y-3">
                {activeTopic.revisionQuestions.map((item, idx) => {
                  const isOpen = revealedAnswers[idx];
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => toggleAnswer(idx)}
                        className="w-full text-left p-3.5 bg-gray-50/70 hover:bg-gray-100/70 flex items-center justify-between gap-3 transition cursor-pointer"
                      >
                        <span className="text-xs font-bold text-slate-800">
                          Q{idx + 1}: {item.question}
                        </span>
                        <span className="text-xs font-semibold text-red-600 shrink-0">
                          {isOpen ? "Hide" : "Show Answer"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-3.5 bg-white border-t border-gray-100 text-xs text-slate-700 leading-relaxed font-medium">
                          <span className="font-bold text-emerald-700 mr-1.5">Answer:</span>
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
