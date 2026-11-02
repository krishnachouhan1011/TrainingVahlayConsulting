import React, { useState } from "react";
import {
  HelpCircle,
  Award,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Clock,
  Sparkles
} from "lucide-react";
import { generateQuizQuestions, calculateQuizResults, saveQuizAttempt } from "../../ai/quizData";

export default function PracticeQuizMode({ onSwitchToTopic }) {
  // Quiz setup state
  const [selectedDay, setSelectedDay] = useState("mixed"); // "day1" | "day2" | "day3" | "mixed"
  const [questionCount, setQuestionCount] = useState(5); // 5 | 10 | 15 | 20
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Active quiz session state
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmittedForCurrent, setIsSubmittedForCurrent] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  // Start Quiz
  const handleStartQuiz = () => {
    const questions = generateQuizQuestions(selectedDay, questionCount);
    setCurrentQuestions(questions);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedOption("");
    setIsSubmittedForCurrent(false);
    setIsQuizActive(true);
    setIsQuizCompleted(false);
    setQuizResults(null);
  };

  // Submit Answer for Current Question
  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: selectedOption
    }));
    setIsSubmittedForCurrent(true);
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(userAnswers[currentIndex + 1] || "");
      setIsSubmittedForCurrent(!!userAnswers[currentIndex + 1]);
    } else {
      // Complete Quiz
      const results = calculateQuizResults(
        Object.values(userAnswers),
        currentQuestions
      );
      setQuizResults(results);
      saveQuizAttempt({
        ...results,
        quizType: selectedDay,
        questionCount: currentQuestions.length,
      });
      setIsQuizCompleted(true);
      setIsQuizActive(false);
    }
  };

  const currentQ = currentQuestions[currentIndex];
  const isAnswerCorrect = isSubmittedForCurrent &&
    selectedOption.trim().toLowerCase() === currentQ?.correctAnswer.trim().toLowerCase();

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-50 p-4 md:p-8 items-center">
      <div className="max-w-2xl w-full">
        {/* State 1: Quiz Configuration Screen */}
        {!isQuizActive && !isQuizCompleted && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <Award size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-batangas">
                  Spectrum Training Practice Quiz
                </h2>
                <p className="text-xs text-gray-500">
                  Test your mastery of Day 1, Day 2, and Day 3 concepts with grounded assessment questions.
                </p>
              </div>
            </div>

            {/* Select Training Module / Day */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Training Module
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "mixed", label: "Mixed Quiz", sub: "All Days 1-3" },
                  { id: "day1", label: "Day 1 Quiz", sub: "Fundamentals" },
                  { id: "day2", label: "Day 2 Quiz", sub: "Packages & Tech" },
                  { id: "day3", label: "Day 3 Quiz", sub: "Sales & Ethics" },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDay(item.id)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      selectedDay === item.id
                        ? "bg-red-50 border-red-500 text-slate-900 shadow-xs"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Number of Questions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                      questionCount === count
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Assessment Highlights Banner */}
            <div className="bg-slate-50 border border-gray-200 p-4 rounded-xl space-y-2 text-xs text-slate-600">
              <span className="font-bold text-slate-900 block">Assessment Rules:</span>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li>Questions include Multiple Choice, True/False, and Step-by-Step Calculations.</li>
                <li>Immediate feedback, explanations, and exact training source citations after every question.</li>
                <li>Results and improvement areas are saved directly to your training progress profile.</li>
              </ul>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartQuiz}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start My Training Quiz</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* State 2: Active Quiz Question Screen */}
        {isQuizActive && currentQ && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
            {/* Progress & Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-md text-[10px]">
                    {currentQ.day}
                  </span>
                  <span>{currentQ.category}</span>
                </span>
                <span>Question {currentIndex + 1} of {currentQuestions.length}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let optionStyle = "bg-gray-50 hover:bg-gray-100 border-gray-200 text-slate-800";

                if (isSubmittedForCurrent) {
                  if (opt === currentQ.correctAnswer) {
                    optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
                  } else if (isSelected && opt !== currentQ.correctAnswer) {
                    optionStyle = "bg-red-50 border-red-500 text-red-900 line-through";
                  } else {
                    optionStyle = "bg-gray-50 border-gray-200 text-gray-400";
                  }
                } else if (isSelected) {
                  optionStyle = "bg-red-50 border-red-500 text-red-950 font-semibold shadow-xs";
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmittedForCurrent}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmittedForCurrent && opt === currentQ.correctAnswer && (
                      <CheckCircle size={18} className="text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isSubmittedForCurrent && isSelected && opt !== currentQ.correctAnswer && (
                      <XCircle size={18} className="text-red-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation Box (After Submit) */}
            {isSubmittedForCurrent && (
              <div className={`p-4 rounded-xl border space-y-2 animate-fadeIn ${
                isAnswerCorrect
                  ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                  : "bg-red-50/80 border-red-200 text-red-950"
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle size={16} className="text-emerald-600" />
                      <span className="text-emerald-800">Correct Answer!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-red-600" />
                      <span className="text-red-800">Incorrect</span>
                    </>
                  )}
                </div>
                {!isAnswerCorrect && (
                  <p className="text-xs font-semibold">
                    Correct Answer: <span className="underline">{currentQ.correctAnswer}</span>
                  </p>
                )}
                <p className="text-xs leading-relaxed text-slate-800 font-normal">
                  {currentQ.explanation}
                </p>
                <div className="text-[11px] text-gray-500 pt-1 flex items-center gap-1">
                  <BookOpen size={12} className="text-gray-400" />
                  <span>Source: {currentQ.source}</span>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Type: {currentQ.type.replace("_", " ").toUpperCase()}
              </span>

              {!isSubmittedForCurrent ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>{currentIndex + 1 === currentQuestions.length ? "Finish Quiz & View Results" : "Next Question"}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* State 3: Quiz Scorecard Screen */}
        {isQuizCompleted && quizResults && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                quizResults.passed ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
              }`}>
                <Award size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-batangas">
                Quiz Completed!
              </h2>
              <p className="text-xs text-gray-500">
                Here is your performance breakdown for the {selectedDay.toUpperCase()} assessment.
              </p>
            </div>

            {/* Scorecard Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-2xl font-bold text-slate-900">{quizResults.percentage}%</span>
                <span className="text-[11px] text-gray-500 block uppercase font-semibold mt-1">Score</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-2xl font-bold text-slate-900">{quizResults.total}</span>
                <span className="text-[11px] text-gray-500 block uppercase font-semibold mt-1">Total Questions</span>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-2xl font-bold text-emerald-700">{quizResults.correctCount}</span>
                <span className="text-[11px] text-emerald-600 block uppercase font-semibold mt-1">Correct</span>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-2xl font-bold text-red-700">{quizResults.incorrectCount}</span>
                <span className="text-[11px] text-red-600 block uppercase font-semibold mt-1">Incorrect</span>
              </div>
            </div>

            {/* Topics Needing Improvement */}
            {quizResults.topicsNeedingImprovement.length > 0 && (
              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 uppercase tracking-wider">
                  <AlertTriangle size={15} className="text-amber-600" />
                  <span>Topics Needing Improvement</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {quizResults.topicsNeedingImprovement.map((topic, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-amber-900 font-medium text-xs rounded-lg border border-amber-200">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Training Topics */}
            {quizResults.recommendations.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recommended Study Steps
                </span>
                <ul className="space-y-2">
                  {quizResults.recommendations.map((rec, i) => (
                    <li key={i} className="p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-slate-700 flex items-start gap-2">
                      <Sparkles size={14} className="text-red-500 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="w-full sm:flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw size={15} />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={() => {
                  setIsQuizCompleted(false);
                  setIsQuizActive(false);
                }}
                className="w-full sm:flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Choose Another Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
