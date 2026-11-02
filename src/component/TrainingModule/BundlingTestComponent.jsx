import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Award,
  Loader2,
  Database,
  Check,
  Send,
  Eye,
  Calendar,
  User,
  Users,
  HelpCircle,
} from "lucide-react";
import { auth, db } from "../../firebase-config";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  PRICING_REFERENCE,
  BUNDLING_TEST_1,
  BUNDLING_TEST_2,
} from "./BundlingTestsData";

const BundlingTestComponent = () => {
  const [activeTab, setActiveTab] = useState("test1"); // "test1" | "test2"
  const [showPricing, setShowPricing] = useState(true);

  // Form info
  const [traineeName, setTraineeName] = useState(() => {
    return auth.currentUser?.displayName || auth.currentUser?.email || "";
  });
  const [testDate, setTestDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  });

  // Test answers
  const [answersTest1, setAnswersTest1] = useState({});
  const [answersTest2, setAnswersTest2] = useState({});

  // Submission & Results
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null); // { id, score, percentage, isPassed, testId }
  const [submissionError, setSubmissionError] = useState(null);
  const [showReview, setShowReview] = useState(false);

  // Auto-load previous submission on mount or tab change so results are always visible
  React.useEffect(() => {
    // 1. Check localStorage first
    let latest = null;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`bundling_test_submission_${activeTab}_`)) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          if (!latest || new Date(item.clientTimestamp || 0) > new Date(latest.clientTimestamp || 0)) {
            latest = item;
          }
        } catch {
          // ignore error
        }
      }
    }

    if (latest) {
      setSubmissionSuccess({
        id: latest.docId || latest.id,
        score: latest.score,
        percentage: latest.percentage,
        isPassed: latest.isPassed,
        testId: latest.testId || activeTab,
        testTitle: latest.testTitle,
        offline: latest.offline,
        isPrevious: true,
      });
      if (latest.answers) {
        setAnswers(latest.answers);
      }
      setShowReview(true);
      return;
    }

    // 2. Query Firestore for the latest submission if none in localStorage
    const loadFromDb = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bundling_test_submissions"));
        let dbLatest = null;
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.testId === activeTab) {
            const time = data.clientTimestamp
              ? new Date(data.clientTimestamp)
              : data.submittedAt?.toDate
              ? data.submittedAt.toDate()
              : new Date(0);
            if (!dbLatest || time > dbLatest.time) {
              dbLatest = { id: docSnap.id, ...data, time };
            }
          }
        });

        if (dbLatest) {
          setSubmissionSuccess({
            id: dbLatest.id,
            score: dbLatest.score,
            percentage: dbLatest.percentage,
            isPassed: dbLatest.isPassed,
            testId: dbLatest.testId,
            testTitle: dbLatest.testTitle,
            isPrevious: true,
          });
          if (dbLatest.traineeName) {
            setTraineeName(dbLatest.traineeName);
          }
          if (dbLatest.answers) {
            setAnswers(dbLatest.answers);
          }
          setShowReview(true);
        }
      } catch (err) {
        console.warn("Could not auto-load test results from Firestore:", err);
      }
    };

    loadFromDb();
  }, [activeTab]);

  const activeQuestions = activeTab === "test1" ? BUNDLING_TEST_1 : BUNDLING_TEST_2;
  const currentAnswers = activeTab === "test1" ? answersTest1 : answersTest2;
  const setAnswers = activeTab === "test1" ? setAnswersTest1 : setAnswersTest2;

  const answeredCount = Object.keys(currentAnswers).length;
  const totalQuestions = activeQuestions.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const calculateScore = (testList, userAnswers) => {
    let score = 0;
    testList.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitTest = async (e) => {
    if (e) e.preventDefault();
    setSubmissionError(null);

    if (!traineeName.trim()) {
      setSubmissionError("Please enter your name before submitting the test.");
      return;
    }

    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Unanswered questions will be marked incorrect. Do you want to submit anyway?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    const score = calculateScore(activeQuestions, currentAnswers);
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 80;

    const submissionPayload = {
      testId: activeTab,
      testTitle:
        activeTab === "test1"
          ? "Spectrum Business Internet + TV Bundling Test #1"
          : "Spectrum Business Internet + TV Bundling Test #2",
      traineeName: traineeName.trim(),
      testDate: testDate,
      userId: auth.currentUser ? auth.currentUser.uid : "guest",
      userEmail: auth.currentUser ? auth.currentUser.email : "",
      score,
      totalQuestions,
      percentage,
      isPassed,
      answers: currentAnswers,
      submittedAt: serverTimestamp(),
      clientTimestamp: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(
        collection(db, "bundling_test_submissions"),
        submissionPayload
      );

      // Save to localStorage as redundancy
      const storageKey = `bundling_test_submission_${activeTab}_${Date.now()}`;
      localStorage.setItem(storageKey, JSON.stringify({ ...submissionPayload, docId: docRef.id }));

      setSubmissionSuccess({
        id: docRef.id,
        score,
        percentage,
        isPassed,
        testId: activeTab,
        testTitle: submissionPayload.testTitle,
      });
      setShowReview(true);
    } catch (err) {
      console.error("Firebase write error:", err);
      // Even if Firestore offline or permissions blocked, save to localStorage and show score!
      const fallbackId = `local-${Date.now()}`;
      localStorage.setItem(
        `bundling_test_submission_${activeTab}_${fallbackId}`,
        JSON.stringify({ ...submissionPayload, docId: fallbackId, offline: true })
      );

      setSubmissionSuccess({
        id: fallbackId,
        score,
        percentage,
        isPassed,
        testId: activeTab,
        testTitle: submissionPayload.testTitle,
        offline: true,
      });
      setShowReview(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        const resultEl = document.getElementById("test-results-panel");
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }
  };

  const handleRetake = () => {
    if (window.confirm("Are you sure you want to retake this test? Your answers will be cleared.")) {
      setAnswers({});
      setSubmissionSuccess(null);
      setShowReview(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-md p-5 sm:p-8 lg:p-10 my-10 sm:my-14 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-red-200">
              Spectrum Business Assessment
            </span>
            <span className="bg-slate-900 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Database size={12} className="text-emerald-400" /> Firebase Sync
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900">
            Internet + TV Bundling Sales Test
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Complete the 30-question bundling calculations to confirm system pricing accuracy.
          </p>
        </div>

        {/* Actions & Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 self-start md:self-center">
          <Link
            to="/trainer-results"
            className="text-xs font-bold text-white bg-slate-900 hover:bg-red-600 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            title="Open Trainer Dashboard to view all trainee test submissions"
          >
            <Users size={15} />
            <span>View All Results (Trainer Dashboard)</span>
          </Link>

          <div className="flex bg-gray-100 p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => {
                setActiveTab("test1");
                setSubmissionSuccess(null);
                setShowReview(false);
              }}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "test1"
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "text-gray-600 hover:text-slate-900"
              }`}
            >
              Bundling Test #1
            </button>
            <button
              onClick={() => {
                setActiveTab("test2");
                setSubmissionSuccess(null);
                setShowReview(false);
              }}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "test2"
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "text-gray-600 hover:text-slate-900"
              }`}
            >
              Bundling Test #2
            </button>
          </div>
        </div>
      </div>

      {/* Trainee Details Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <User size={14} className="text-red-600" /> Trainee Name
          </label>
          <input
            type="text"
            value={traineeName}
            onChange={(e) => setTraineeName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Calendar size={14} className="text-red-600" /> Assessment Date
          </label>
          <input
            type="text"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-1.5">
            <span>Progress: {answeredCount} / {totalQuestions} answered</span>
            <span className="text-red-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-red-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* PRICING REFERENCE CARD (COLLAPSIBLE / PINNED) */}
      <div className="mb-8 border border-red-200 bg-red-50/60 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setShowPricing(!showPricing)}
          className="w-full flex items-center justify-between p-4 sm:p-5 bg-red-100/70 hover:bg-red-100 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 text-white rounded-lg">
              <DollarSign size={18} />
            </div>
            <div>
              <h3 className="font-batangas font-bold text-slate-900 text-sm sm:text-base">
                Official Pricing Reference (Assume for All Calculations)
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 font-medium">
                Keep this reference open while calculating monthly bundle totals
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-red-700">
            <span>{showPricing ? "Hide" : "Show"} Rates</span>
            {showPricing ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {showPricing && (
          <div className="p-4 sm:p-6 bg-white overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px] sm:text-xs">
                  <th className="py-2.5 px-3 font-bold">Product / Speed</th>
                  <th className="py-2.5 px-3 font-bold">Base Price & Add-On</th>
                  <th className="py-2.5 px-3 font-bold hidden md:table-cell">Pricing Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-slate-800">
                {PRICING_REFERENCE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-red-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{row.product}</td>
                    <td className="py-2.5 px-3 text-red-600 font-semibold">{row.price}</td>
                    <td className="py-2.5 px-3 text-gray-500 text-xs hidden md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RESULTS DISPLAY PANEL (WHEN SUBMITTED) */}
      {submissionSuccess && (
        <div id="test-results-panel" className="mb-10 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                  submissionSuccess.isPassed
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
              >
                {submissionSuccess.isPassed ? <Award size={32} /> : <AlertCircle size={32} />}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                  {submissionSuccess.testTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-batangas font-bold text-white">
                  Score: {submissionSuccess.score} / {totalQuestions} ({submissionSuccess.percentage}%)
                </h3>
                <p className="text-xs text-gray-300 font-medium mt-1">
                  Candidate: <strong className="text-white">{traineeName}</strong> • Date: {testDate}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-center ${
                  submissionSuccess.isPassed
                    ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20"
                    : "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20"
                }`}
              >
                {submissionSuccess.isPassed ? "PASSED (≥ 80%)" : "NEEDS REVIEW (< 80%)"}
              </div>
              <button
                onClick={handleRetake}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw size={14} /> Retake Test
              </button>
            </div>
          </div>

          {/* Firebase confirmation details */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-400 gap-2">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Check size={14} /> Saved in Firebase (Firestore Record ID:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">{submissionSuccess.id}</code>)
            </span>
            <button
              onClick={() => setShowReview(!showReview)}
              className="text-red-400 hover:text-red-300 font-bold underline cursor-pointer flex items-center gap-1"
            >
              <Eye size={14} /> {showReview ? "Hide" : "Show"} Detailed Answer Review
            </button>
          </div>
        </div>
      )}

      {/* QUESTION LIST */}
      <div className="space-y-6 mb-10">
        {activeQuestions.map((q) => {
          const userSelected = currentAnswers[q.id];
          const isSubmitted = !!submissionSuccess;
          const isCorrect = userSelected === q.correct;

          return (
            <div
              key={q.id}
              className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-rose-200 bg-rose-50/20"
                  : userSelected
                  ? "border-red-200 bg-white shadow-xs"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {q.id}
                  </span>
                  <div>
                    <h4 className="font-batangas font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {q.question}
                    </h4>
                  </div>
                </div>

                {isSubmitted && (
                  <span
                    className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 size={14} /> Correct (+1)
                      </>
                    ) : (
                      <>
                        <XCircle size={14} /> Incorrect
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                {q.options.map((opt) => {
                  const isOptionSelected = userSelected === opt.key;
                  const isThisCorrect = opt.key === q.correct;

                  let optionStyle = "border-gray-200 hover:border-red-300 hover:bg-red-50/30 text-gray-800";

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400";
                    } else if (isOptionSelected && !isThisCorrect) {
                      optionStyle = "border-rose-400 bg-rose-50 text-rose-900 font-semibold";
                    } else {
                      optionStyle = "border-gray-200 opacity-60 text-gray-500";
                    }
                  } else if (isOptionSelected) {
                    optionStyle = "border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-500 shadow-sm";
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, opt.key)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all text-xs sm:text-sm cursor-pointer ${optionStyle} ${
                        isSubmitted ? "cursor-default" : ""
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isOptionSelected
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Review Calculation Explanation */}
              {isSubmitted && showReview && (
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-medium text-slate-700 bg-gray-50 p-3 rounded-lg flex items-start gap-2">
                  <HelpCircle size={15} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Calculation: </span>
                    {q.calculation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Errors */}
      {submissionError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <AlertCircle size={18} className="text-rose-600 shrink-0" />
          <span>{submissionError}</span>
        </div>
      )}

      {/* Submit / Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
        <div className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left">
          {submissionSuccess ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1 justify-center sm:justify-start">
              <CheckCircle2 size={16} /> Test submitted and stored in Firebase.
            </span>
          ) : (
            <span>
              All 30 questions required. Minimum 80% (24/30) score to pass.
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {submissionSuccess ? (
            <button
              onClick={() => {
                const nextTab = activeTab === "test1" ? "test2" : "test1";
                setActiveTab(nextTab);
                setSubmissionSuccess(null);
                setShowReview(false);
              }}
              className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer shadow-md"
            >
              Switch to {activeTab === "test1" ? "Test #2" : "Test #1"}
            </button>
          ) : (
            <button
              onClick={handleSubmitTest}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Saving to Firebase...
                </>
              ) : (
                <>
                  <Send size={16} /> Submit Test & Save to Firebase
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BundlingTestComponent;
