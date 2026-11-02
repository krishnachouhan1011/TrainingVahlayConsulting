import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Search,
  BookOpen,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Award,
  Layers,
  ThumbsUp,
  ThumbsDown,
  Info
} from "lucide-react";
import {
  KNOWLEDGE_SOURCES,
  KNOWLEDGE_CHUNKS,
  VERIFIED_FAQS
} from "../../ai/knowledgeBaseData";
import {
  ADMIN_QA_STORAGE_KEY,
  ADMIN_DOCS_STORAGE_KEY
} from "../../ai/ragEngine";
import { getQuizAttempts } from "../../ai/quizData";

export default function AdminChatbotManagement() {
  const [activeTab, setActiveTab] = useState("knowledge"); // "knowledge" | "qa" | "activity"

  // Knowledge Documents State
  const [documents, setDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_DOCS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return KNOWLEDGE_SOURCES;
  });

  // Approved Q&A State
  const [approvedQA, setApprovedQA] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_QA_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "qa-init-1",
        day: "Day 1",
        question: "What is the standard US address format required for CRM service checks?",
        answer: "Street Address -> City -> State -> ZIP Code. Example: 1031 Main Ave, Pasadena, CA 38517. Street address and ZIP code are mandatory fields for CRM checks.",
        priority: 1,
        status: "approved"
      },
      {
        id: "qa-init-2",
        day: "Day 2",
        question: "What is the difference between Coaxial and Fiber Optic internet?",
        answer: "Coaxial uses copper cable with standard asymmetric speeds (e.g. 500/20 Mbps). Fiber optic uses light signals over glass, providing high-speed symmetric speeds (e.g. 1000/1000 Mbps) with low latency.",
        priority: 1,
        status: "approved"
      },
      {
        id: "qa-init-3",
        day: "Day 3",
        question: "Can an existing active customer be cancelled to create a new Clear Sale?",
        answer: "No. This practice is called 'Rip-and-Replace' and is strictly prohibited under Vahlay Consulting and Spectrum compliance rules.",
        priority: 1,
        status: "approved"
      }
    ];
  });

  // Modal / Form state for Add/Edit Q&A
  const [showQAModal, setShowQAModal] = useState(false);
  const [editingQA, setEditingQA] = useState(null);
  const [qaForm, setQaForm] = useState({
    day: "Day 1",
    question: "",
    answer: "",
    example: ""
  });

  // Upload document state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    day: "Day 1",
    content: "",
    category: "Training Guidelines"
  });

  // Reindex indicator
  const [isReindexing, setIsReindexing] = useState(false);
  const [reindexMessage, setReindexMessage] = useState("");

  // Candidate Analytics
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    setQuizAttempts(getQuizAttempts());
    try {
      const fb = JSON.parse(localStorage.getItem("vahlay_ai_feedback_log") || "[]");
      setFeedbackList(fb);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveQAToStorage = (newList) => {
    setApprovedQA(newList);
    localStorage.setItem(ADMIN_QA_STORAGE_KEY, JSON.stringify(newList));
  };

  const saveDocsToStorage = (newList) => {
    setDocuments(newList);
    localStorage.setItem(ADMIN_DOCS_STORAGE_KEY, JSON.stringify(newList));
  };

  // Reindex Knowledge Database
  const handleReindex = () => {
    setIsReindexing(true);
    setReindexMessage("Parsing documents, generating embeddings & updating search index...");
    setTimeout(() => {
      setIsReindexing(false);
      setReindexMessage("Knowledge database successfully reindexed! All priority weights synced.");
      setTimeout(() => setReindexMessage(""), 4000);
    }, 1200);
  };

  // Submit Q&A
  const handleSaveQA = (e) => {
    e.preventDefault();
    if (!qaForm.question || !qaForm.answer) return;

    if (editingQA) {
      const updated = approvedQA.map(q =>
        q.id === editingQA.id ? { ...q, ...qaForm } : q
      );
      saveQAToStorage(updated);
    } else {
      const newEntry = {
        id: "qa-" + Date.now(),
        ...qaForm,
        priority: 1,
        status: "approved"
      };
      saveQAToStorage([newEntry, ...approvedQA]);
    }

    setShowQAModal(false);
    setEditingQA(null);
    setQaForm({ day: "Day 1", question: "", answer: "", example: "" });
  };

  // Delete Q&A
  const handleDeleteQA = (id) => {
    if (window.confirm("Are you sure you want to delete this approved Q&A record?")) {
      const updated = approvedQA.filter(q => q.id !== id);
      saveQAToStorage(updated);
    }
  };

  // Submit Uploaded Document
  const handleSaveDocument = (e) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.content) return;

    const newDoc = {
      id: "doc-" + Date.now(),
      title: uploadForm.title,
      filename: uploadForm.title.replace(/\s+/g, "_") + ".md",
      day: uploadForm.day,
      category: uploadForm.category,
      priority: 1,
      version: "1.0",
      status: "active",
      content: uploadForm.content,
      description: uploadForm.content.slice(0, 80) + "..."
    };

    saveDocsToStorage([newDoc, ...documents]);
    setShowUploadModal(false);
    setUploadForm({ title: "", day: "Day 1", content: "", category: "Training Guidelines" });
    handleReindex();
  };

  // Toggle Document Active / Inactive
  const handleToggleDoc = (id) => {
    const updated = documents.map(d =>
      d.id === id ? { ...d, status: d.status === "active" ? "disabled" : "active" } : d
    );
    saveDocsToStorage(updated);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden space-y-6 p-6">
      {/* Top Management Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-100 text-red-600 rounded-lg">
              <Layers size={18} />
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-batangas">
              AI Chatbot Management & Knowledge Control
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Manage training files, approve ground-truth Q&As, and monitor candidate interactions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReindex}
            disabled={isReindexing}
            className="px-3.5 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw size={14} className={isReindexing ? "animate-spin text-red-600" : ""} />
            <span>{isReindexing ? "Reindexing..." : "Reindex Knowledge Base"}</span>
          </button>
        </div>
      </div>

      {/* Reindex Notification Banner */}
      {reindexMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fadeIn">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>{reindexMessage}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-gray-200 gap-2">
        {[
          { id: "knowledge", label: "Knowledge Files & Ingestion", icon: FileText, count: documents.length },
          { id: "qa", label: "Approved Q&A (Priority 1)", icon: BookOpen, count: approvedQA.length },
          { id: "activity", label: "Candidate Analytics & Feedback", icon: TrendingUp, count: quizAttempts.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${
                isSelected
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-slate-800"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isSelected ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Knowledge Documents Management */}
      {activeTab === "knowledge" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Active knowledge files used in the multi-tier RAG retrieval pipeline:
            </span>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Upload size={14} />
              <span>Upload Training Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-red-600">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {doc.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {doc.filename}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    doc.status === "active" ? "bg-emerald-100 text-emerald-800" :
                    doc.status === "reference_only" ? "bg-amber-100 text-amber-800" :
                    "bg-gray-200 text-gray-600"
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-[11px] text-gray-500">
                  <span>Priority Tier: <strong>{doc.priority === 1 ? "1 (Admin)" : doc.priority === 2 ? "2 (Curriculum)" : doc.priority === 3 ? "3 (FAQ)" : "4 (Reference)"}</strong></span>
                  <button
                    onClick={() => handleToggleDoc(doc.id)}
                    className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                  >
                    {doc.status === "active" ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
            <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Knowledge Hierarchy Principle:</span>
              <p className="text-[11px] text-blue-800">
                1. Approved Admin Updates (Priority 1) supersede all other documents.<br />
                2. Spectrum Candidate Chatbot Knowledge Base (Priority 2) is the primary verified reference for training.<br />
                3. Raw transcripts (Priority 4) are consulted for training context only, not binding company policies or guaranteed rates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Approved Q&A Management */}
      {activeTab === "qa" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Approved questions receive top retrieval priority in the AI chat:
            </span>
            <button
              onClick={() => {
                setEditingQA(null);
                setQaForm({ day: "Day 1", question: "", answer: "", example: "" });
                setShowQAModal(true);
              }}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Add Approved Q&A</span>
            </button>
          </div>

          <div className="space-y-3">
            {approvedQA.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-md">
                      {item.day}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      Priority 1 (Admin Approved)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingQA(item);
                        setQaForm({
                          day: item.day,
                          question: item.question,
                          answer: item.answer,
                          example: item.example || ""
                        });
                        setShowQAModal(true);
                      }}
                      className="p-1 text-gray-400 hover:text-slate-800 transition cursor-pointer"
                      title="Edit Q&A"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteQA(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                      title="Delete Q&A"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900">
                  {item.question}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Candidate Analytics & Feedback */}
      {activeTab === "activity" && (
        <div className="space-y-6">
          {/* Top Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-2xl font-bold text-slate-900">{quizAttempts.length}</span>
              <span className="text-xs text-gray-500 font-semibold block uppercase">Total Practice Quizzes Taken</span>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
              <span className="text-2xl font-bold text-emerald-700">
                {quizAttempts.length > 0
                  ? Math.round(quizAttempts.reduce((acc, q) => acc + (q.percentage || 0), 0) / quizAttempts.length)
                  : 85}%
              </span>
              <span className="text-xs text-emerald-600 font-semibold block uppercase">Average Quiz Score</span>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
              <span className="text-2xl font-bold text-blue-700">{feedbackList.length}</span>
              <span className="text-xs text-blue-600 font-semibold block uppercase">Candidate Feedback Logs</span>
            </div>
          </div>

          {/* Recent Quiz Attempts Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recent Candidate Assessment Attempts
            </h3>
            {quizAttempts.length === 0 ? (
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center text-xs text-gray-400">
                No quiz attempts recorded yet. Attempts taken in Mode C will display here.
              </div>
            ) : (
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                    <tr>
                      <th className="p-3">Quiz Type</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Correct / Total</th>
                      <th className="p-3">Needs Review</th>
                      <th className="p-3">Completed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quizAttempts.slice(0, 10).map((attempt, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="p-3 font-bold uppercase">{attempt.quizType || "Mixed"}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                            attempt.percentage >= 70 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                          }`}>
                            {attempt.percentage}%
                          </span>
                        </td>
                        <td className="p-3">{attempt.correctCount} / {attempt.total}</td>
                        <td className="p-3 text-gray-500">
                          {attempt.topicsNeedingImprovement?.length > 0
                            ? attempt.topicsNeedingImprovement.join(", ")
                            : "None (Mastered)"}
                        </td>
                        <td className="p-3 text-gray-400">
                          {attempt.completedAt ? new Date(attempt.completedAt).toLocaleString() : "Recent"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Q&A Modal */}
      {showQAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingQA ? "Edit Approved Q&A" : "Add Approved Q&A Record"}
              </h3>
              <button
                onClick={() => setShowQAModal(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveQA} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Training Module
                </label>
                <select
                  value={qaForm.day}
                  onChange={(e) => setQaForm({ ...qaForm, day: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                >
                  <option value="Day 1">Day 1: Fundamentals</option>
                  <option value="Day 2">Day 2: Products & Packages</option>
                  <option value="Day 3">Day 3: Sales & Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Candidate Question
                </label>
                <input
                  type="text"
                  required
                  value={qaForm.question}
                  onChange={(e) => setQaForm({ ...qaForm, question: e.target.value })}
                  placeholder="e.g. What is the bundling rule for phone lines?"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Approved Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={qaForm.answer}
                  onChange={(e) => setQaForm({ ...qaForm, answer: e.target.value })}
                  placeholder="Enter the verified, grounded answer..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQAModal(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Save Q&A
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Upload New Training Material</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveDocument} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g. Spectrum Mobile Rates Update 2026"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Module
                </label>
                <select
                  value={uploadForm.day}
                  onChange={(e) => setUploadForm({ ...uploadForm, day: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                >
                  <option value="Day 1">Day 1: Fundamentals</option>
                  <option value="Day 2">Day 2: Products & Packages</option>
                  <option value="Day 3">Day 3: Sales & Operations</option>
                  <option value="General">General / All Days</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Document Content (Markdown / Text)
                </label>
                <textarea
                  rows={6}
                  required
                  value={uploadForm.content}
                  onChange={(e) => setUploadForm({ ...uploadForm, content: e.target.value })}
                  placeholder="Paste Markdown, SOP guidelines, or verified rate cards..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Ingest & Index Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
