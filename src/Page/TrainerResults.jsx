import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Navbar from "../component/Navbar";
import {
  Search,
  CheckCircle2,
  XCircle,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  Award,
  Users,
  BarChart3,
  Check,
  X,
  FileText,
  Filter,
  HelpCircle,
} from "lucide-react";
import {
  BUNDLING_TEST_1,
  BUNDLING_TEST_2,
} from "../component/TrainingModule/BundlingTestsData";

const TrainerResults = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTest, setFilterTest] = useState("all"); // "all" | "test1" | "test2"
  const [filterStatus, setFilterStatus] = useState("all"); // "all" | "passed" | "failed"
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "highest" | "lowest"

  // Selected submission for detailed review modal
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch submissions from Firestore (plus localStorage redundancy)
  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const q = collection(db, "bundling_test_submissions");
      const querySnapshot = await getDocs(q);
      const list = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let timestamp = null;
        if (data.submittedAt && typeof data.submittedAt.toDate === "function") {
          timestamp = data.submittedAt.toDate();
        } else if (data.clientTimestamp) {
          timestamp = new Date(data.clientTimestamp);
        } else {
          timestamp = new Date();
        }

        list.push({
          id: docSnap.id,
          ...data,
          parsedDate: timestamp,
        });
      });

      // Also check localStorage for any offline submissions
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("bundling_test_submission_")) {
          try {
            const raw = localStorage.getItem(key);
            if (raw) {
              const item = JSON.parse(raw);
              if (!list.some((existing) => existing.id === item.docId)) {
                list.push({
                  id: item.docId || key,
                  ...item,
                  parsedDate: item.clientTimestamp
                    ? new Date(item.clientTimestamp)
                    : new Date(),
                  isOffline: true,
                });
              }
            }
          } catch {
            // Ignore parse errors
          }
        }
      }

      setSubmissions(list);
    } catch (error) {
      console.error("Error fetching test submissions:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSubmissions();
  };

  const handleDelete = async (submissionId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this test submission record? This action cannot be undone."
      )
    ) {
      try {
        await deleteDoc(doc(db, "bundling_test_submissions", submissionId));
        setSubmissions((prev) => prev.filter((item) => item.id !== submissionId));
        if (selectedSubmission?.id === submissionId) {
          setSelectedSubmission(null);
        }
      } catch (err) {
        console.error("Error deleting document:", err);
        setSubmissions((prev) => prev.filter((item) => item.id !== submissionId));
      }
    }
  };

  // Filtered & Sorted list
  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((item) => {
        // Search filter
        const nameMatch =
          item.traineeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
        if (searchTerm && !nameMatch) return false;

        // Test type filter
        if (filterTest !== "all") {
          if (item.testId !== filterTest) return false;
        }

        // Status filter
        if (filterStatus === "passed" && !item.isPassed) return false;
        if (filterStatus === "failed" && item.isPassed) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return (b.parsedDate || 0) - (a.parsedDate || 0);
        }
        if (sortOrder === "highest") {
          return (b.score || 0) - (a.score || 0);
        }
        if (sortOrder === "lowest") {
          return (a.score || 0) - (b.score || 0);
        }
        return 0;
      });
  }, [submissions, searchTerm, filterTest, filterStatus, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const total = submissions.length;
    if (total === 0) {
      return { total: 0, passed: 0, passRate: 0, avgScore: 0, uniqueTrainees: 0 };
    }
    const passed = submissions.filter((s) => s.isPassed).length;
    const passRate = Math.round((passed / total) * 100);
    const sumScore = submissions.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const avgScore = (sumScore / total).toFixed(1);
    const uniqueNames = new Set(
      submissions.map((s) => s.traineeName?.trim().toLowerCase()).filter(Boolean)
    ).size;

    return { total, passed, passRate, avgScore, uniqueTrainees: uniqueNames };
  }, [submissions]);

  // CSV Export
  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "Trainee Name",
      "Email",
      "Test Title",
      "Score",
      "Total Questions",
      "Percentage",
      "Passed",
      "Test Date",
      "Submission ID",
    ];

    const rows = filteredSubmissions.map((s) => [
      `"${s.traineeName || "Anonymous"}"`,
      `"${s.userEmail || "N/A"}"`,
      `"${s.testTitle || s.testId}"`,
      s.score,
      s.totalQuestions || 30,
      `${s.percentage}%`,
      s.isPassed ? "PASSED" : "FAILED",
      `"${s.parsedDate ? s.parsedDate.toLocaleString() : s.testDate}"`,
      `"${s.id}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Trainee_Bundling_Test_Results_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get question data for detail review
  const getQuestionSet = (testId) => {
    return testId === "test2" ? BUNDLING_TEST_2 : BUNDLING_TEST_1;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-red-200">
                Trainer & Management Portal
              </span>
              <span className="bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Users size={12} className="text-red-400" /> Day 6 Assessment
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-batangas font-bold text-slate-900 leading-tight">
              Trainee Assessment Results
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              Live submission reports for the Spectrum Business Internet + TV Bundling Tests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-red-200 text-gray-700 hover:text-red-600 rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              title="Refresh submissions from Firebase"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin text-red-600" : ""}
              />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-red-600 hover:bg-slate-900 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-red-200 transition-all cursor-pointer"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* KPI / Stats Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Submissions
              </span>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <FileText size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900">
              {stats.total}
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">
              All submitted test attempts
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Pass Rate (≥ 80%)
              </span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Award size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-batangas font-bold text-emerald-600">
              {stats.passRate}%
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">
              {stats.passed} of {stats.total} candidates cleared
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Average Score
              </span>
              <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                <BarChart3 size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900">
              {stats.avgScore} <span className="text-sm font-normal text-gray-400">/ 30</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">
              Across all 30 questions
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Unique Candidates
              </span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Users size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900">
              {stats.uniqueTrainees}
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">
              Active candidates evaluated
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px]">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by trainee name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-slate-900 font-medium"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setFilterTest("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterTest === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-gray-500 hover:text-slate-900"
                }`}
              >
                All Tests
              </button>
              <button
                onClick={() => setFilterTest("test1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterTest === "test1"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-gray-500 hover:text-slate-900"
                }`}
              >
                Test #1
              </button>
              <button
                onClick={() => setFilterTest("test2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterTest === "test2"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-gray-500 hover:text-slate-900"
                }`}
              >
                Test #2
              </button>
            </div>

            {/* Status Select */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-slate-900 font-semibold text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              <option value="all">All Outcomes</option>
              <option value="passed">Passed (≥ 80%)</option>
              <option value="failed">Needs Review (&lt; 80%)</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-slate-900 font-semibold text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Score</option>
              <option value="lowest">Lowest Score</option>
            </select>
          </div>
        </div>

        {/* Submissions Table / Cards */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
            <RefreshCw size={32} className="animate-spin text-red-600 mx-auto mb-4" />
            <p className="text-slate-900 font-batangas font-bold text-lg mb-1">
              Loading assessment records...
            </p>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">
              Fetching real-time results from Firebase Firestore
            </p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Filter size={28} />
            </div>
            <h3 className="font-batangas font-bold text-slate-900 text-lg mb-2">
              No Submissions Found
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-medium max-w-md mx-auto mb-6">
              {submissions.length === 0
                ? "No candidates have submitted the bundling tests yet. Once trainees take the assessment on Day 6, their results will appear here."
                : "No submissions match your active filters or search terms. Try clearing your search."}
            </p>
            {submissions.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterTest("all");
                  setFilterStatus("all");
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px] sm:text-xs">
                    <th className="py-3.5 px-4 font-bold">Candidate</th>
                    <th className="py-3.5 px-4 font-bold">Assessment</th>
                    <th className="py-3.5 px-4 font-bold">Score</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold hidden md:table-cell">Date & Time</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-slate-800">
                  {filteredSubmissions.map((sub) => {
                    const isTest1 = sub.testId === "test1";

                    return (
                      <tr
                        key={sub.id}
                        className="hover:bg-red-50/30 transition-colors"
                      >
                        {/* Candidate */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">
                            {sub.traineeName || "Anonymous Trainee"}
                          </div>
                          {sub.userEmail && (
                            <div className="text-[11px] text-gray-500 font-normal">
                              {sub.userEmail}
                            </div>
                          )}
                        </td>

                        {/* Assessment */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              isTest1
                                ? "bg-sky-50 text-sky-700 border border-sky-200"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {isTest1 ? "Bundling Test #1" : "Bundling Test #2"}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-batangas font-bold text-base text-slate-900">
                              {sub.score} <span className="text-xs text-gray-400 font-normal">/ {sub.totalQuestions || 30}</span>
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                sub.isPassed
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {sub.percentage}%
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          {sub.isPassed ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <CheckCircle2 size={13} /> Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                              <XCircle size={13} /> Needs Review
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 hidden md:table-cell text-xs text-gray-500 font-medium">
                          {sub.parsedDate
                            ? sub.parsedDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : sub.testDate || "N/A"}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                              title="Inspect complete answer sheet"
                            >
                              <Eye size={13} />
                              <span className="hidden sm:inline">Answer Sheet</span>
                            </button>

                            <button
                              onClick={() => handleDelete(sub.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DETAILED ANSWER SHEET MODAL */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
            <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      selectedSubmission.isPassed
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {selectedSubmission.score}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-batangas font-bold text-white">
                      {selectedSubmission.traineeName || "Candidate"}&rsquo;s Answer Sheet
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {selectedSubmission.testTitle || (selectedSubmission.testId === "test1" ? "Bundling Test #1" : "Bundling Test #2")} • Score: {selectedSubmission.score} / 30 ({selectedSubmission.percentage}%)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body: Scrollable Question Review */}
              <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
                {/* Candidate Overview Banner */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block text-xs">Email / Contact:</span>
                    <strong className="text-slate-900">{selectedSubmission.userEmail || "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Submitted On:</span>
                    <strong className="text-slate-900">
                      {selectedSubmission.parsedDate
                        ? selectedSubmission.parsedDate.toLocaleString()
                        : selectedSubmission.testDate || "N/A"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Evaluation Result:</span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        selectedSubmission.isPassed
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {selectedSubmission.isPassed ? "PASSED (≥ 80%)" : "NEEDS REVIEW (< 80%)"}
                    </span>
                  </div>
                </div>

                {/* 30 Questions List */}
                <div className="space-y-4">
                  {getQuestionSet(selectedSubmission.testId).map((q) => {
                    const traineeAnswer = selectedSubmission.answers?.[q.id];
                    const isCorrect = traineeAnswer === q.correct;
                    const selectedOptionObj = q.options.find((opt) => opt.key === traineeAnswer);
                    const correctOptionObj = q.options.find((opt) => opt.key === q.correct);

                    return (
                      <div
                        key={q.id}
                        className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm ${
                          isCorrect
                            ? "bg-emerald-50/20 border-emerald-200"
                            : "bg-rose-50/20 border-rose-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {q.id}
                            </span>
                            <h4 className="font-batangas font-bold text-slate-900 leading-snug">
                              {q.question}
                            </h4>
                          </div>
                          <span
                            className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                              isCorrect
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <Check size={12} /> Correct
                              </>
                            ) : (
                              <>
                                <X size={12} /> Incorrect
                              </>
                            )}
                          </span>
                        </div>

                        {/* Answers comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 bg-white p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                              Trainee&rsquo;s Selection:
                            </span>
                            <div
                              className={`font-bold mt-0.5 ${
                                isCorrect ? "text-emerald-700" : "text-rose-700"
                              }`}
                            >
                              {traineeAnswer
                                ? `${traineeAnswer}) ${selectedOptionObj?.text || ""}`
                                : "Not Answered"}
                            </div>
                          </div>

                          {!isCorrect && (
                            <div>
                              <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
                                Correct Answer:
                              </span>
                              <div className="font-bold text-emerald-800 mt-0.5">
                                {q.correct}) {correctOptionObj?.text || ""}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Calculation explanation */}
                        <div className="text-xs text-gray-600 font-medium flex items-start gap-1.5 pt-1">
                          <HelpCircle size={14} className="text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-900">Calculation: </strong>
                            {q.calculation}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TrainerResults;

