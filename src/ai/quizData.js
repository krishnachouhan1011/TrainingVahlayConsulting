/**
 * Vahlay AI Training Assistant - Practice Quiz Data & Engine (Mode C)
 * Built strictly from the 46 verified FAQs and Knowledge Base.
 */

export const QUIZ_QUESTION_BANK = [
  // ==========================================
  // DAY 1 QUESTIONS
  // ==========================================
  {
    id: "q-d1-01",
    day: "Day 1",
    type: "multiple_choice",
    category: "ISP Fundamentals",
    question: "What does the abbreviation ISP stand for?",
    options: [
      "Internet Service Provider",
      "Internal System Protocol",
      "Integrated Selling Platform",
      "Information Speed Package"
    ],
    correctAnswer: "Internet Service Provider",
    explanation: "ISP stands for Internet Service Provider, a company that provides internet connectivity, phone, and TV services.",
    source: "Day 1 — ISP Fundamentals"
  },
  {
    id: "q-d1-02",
    day: "Day 1",
    type: "multiple_choice",
    category: "US Address Standards",
    question: "What is the correct sequential order of a standard US business address?",
    options: [
      "Street Address, City, State, ZIP Code",
      "City, Street Address, State, ZIP Code",
      "Street Address, State, City, ZIP Code",
      "ZIP Code, Street Address, City, State"
    ],
    correctAnswer: "Street Address, City, State, ZIP Code",
    explanation: "The standard US address order is Street Address, followed by City, State (2-letter abbreviation), and 5-digit ZIP Code.",
    source: "Day 1 — US Address Structure"
  },
  {
    id: "q-d1-03",
    day: "Day 1",
    type: "true_false",
    category: "US Standards",
    question: "True or False: The United States has 52 states according to verified geographical facts.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "False. The recording incorrectly claimed ~52 states, but the US officially has exactly 50 states.",
    source: "Day 1 — US Time Zones & States"
  },
  {
    id: "q-d1-04",
    day: "Day 1",
    type: "multiple_choice",
    category: "US Standards",
    question: "If Eastern Time (ET) is 5:00 PM, what is the corresponding time in Pacific Time (PT) in the trainer's example?",
    options: [
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "6:00 PM"
    ],
    correctAnswer: "2:00 PM",
    explanation: "Pacific Time is 3 hours behind Eastern Time. When Eastern is 5:00 PM, Pacific is 2:00 PM.",
    source: "Day 1 — US Time Zones"
  },
  {
    id: "q-d1-05",
    day: "Day 1",
    type: "multiple_choice",
    category: "US Standards",
    question: "How many total digits are in a standard US local telephone number including the area code?",
    options: ["10 digits", "7 digits", "11 digits", "8 digits"],
    correctAnswer: "10 digits",
    explanation: "A standard US telephone number contains exactly 10 digits: a 3-digit Area Code, 3-digit exchange code, and 4-digit subscriber number.",
    source: "Day 1 — Telephone Numbering"
  },
  {
    id: "q-d1-06",
    day: "Day 1",
    type: "short_answer",
    category: "US Standards",
    question: "What should you do if a customer provides only seven digits for their telephone number?",
    options: [
      "Ask for and verify their 3-digit Area Code directly",
      "Guess the area code from their postal ZIP code",
      "Add 000 in front of the number",
      "Reject the call immediately"
    ],
    correctAnswer: "Ask for and verify their 3-digit Area Code directly",
    explanation: "Always request the missing area code directly from the customer. Never guess it based on ZIP code alone.",
    source: "Day 1 — Telephone Numbering"
  },
  {
    id: "q-d1-07",
    day: "Day 1",
    type: "multiple_choice",
    category: "US Address Standards",
    question: "What do the standard street suffixes 'St', 'Ave', and 'Blvd' stand for?",
    options: [
      "Street, Avenue, and Boulevard",
      "Station, Avenue, and Block",
      "Street, Alley, and Boulevard",
      "Strip, Avenue, and Boulevard"
    ],
    correctAnswer: "Street, Avenue, and Boulevard",
    explanation: "St stands for Street, Ave stands for Avenue, and Blvd stands for Boulevard.",
    source: "Day 1 — US Address Structure"
  },
  {
    id: "q-d1-08",
    day: "Day 1",
    type: "multiple_choice",
    category: "ISP Fundamentals",
    question: "Which of the following was NOT mentioned in training as a competitor to Spectrum?",
    options: [
      "Netflix Broadband",
      "AT&T",
      "Comcast",
      "T-Mobile"
    ],
    correctAnswer: "Netflix Broadband",
    explanation: "Netflix is a streaming content provider, not an ISP competitor. AT&T, Comcast, and T-Mobile are competitor ISPs.",
    source: "Day 1 — ISP Fundamentals"
  },

  // ==========================================
  // DAY 2 QUESTIONS
  // ==========================================
  {
    id: "q-d2-01",
    day: "Day 2",
    type: "multiple_choice",
    category: "Internet Packages",
    question: "What are the three core internet plans taught in the training recording?",
    options: [
      "Premier, Ultra, and Gig",
      "Basic, Advanced, and Pro",
      "Starter, Plus, and Enterprise",
      "Bronze, Silver, and Gold"
    ],
    correctAnswer: "Premier, Ultra, and Gig",
    explanation: "The three primary packages described in Day 2 are Premier (500 Mbps), Ultra (750 Mbps), and Gig (1,000 Mbps).",
    source: "Day 2 — Spectrum Internet Packages"
  },
  {
    id: "q-d2-02",
    day: "Day 2",
    type: "calculation",
    category: "Internet Packages",
    question: "In the training exercises, how much does Premier Internet cost per month when adding the optional Wi-Fi router?",
    options: [
      "$60 / month",
      "$50 / month",
      "$70 / month",
      "$80 / month"
    ],
    correctAnswer: "$60 / month",
    explanation: "Premier Internet base is $50/month + $10/month router fee = $60/month total training example.",
    source: "Day 2 — Spectrum Internet Packages"
  },
  {
    id: "q-d2-03",
    day: "Day 2",
    type: "multiple_choice",
    category: "Internet Packages",
    question: "How many megabits per second (Mbps) are in 1 Gig (1 Gbps)?",
    options: [
      "1,000 Mbps",
      "100 Mbps",
      "10,000 Mbps",
      "500 Mbps"
    ],
    correctAnswer: "1,000 Mbps",
    explanation: "1 Gbps (gigabit per second) equals exactly 1,000 Mbps (megabits per second).",
    source: "Day 2 — Speed Metrics"
  },
  {
    id: "q-d2-04",
    day: "Day 2",
    type: "multiple_choice",
    category: "Sales Architecture",
    question: "What does PSU stand for in Spectrum sales training?",
    options: [
      "Primary Service Unit (or Primary Selling Unit)",
      "Power Supply Unit",
      "Public Service Utility",
      "Product Sales Upgrade"
    ],
    correctAnswer: "Primary Service Unit (or Primary Selling Unit)",
    explanation: "PSU stands for Primary Service Unit, designating a major product category such as Internet, Telephone, or TV.",
    source: "Day 2 — Bundling and PSU"
  },
  {
    id: "q-d2-05",
    day: "Day 2",
    type: "true_false",
    category: "Sales Architecture",
    question: "True or False: If a customer orders 4 telephone lines and no internet, that counts as 4 distinct PSUs.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "False. All telephone lines belong to the single Telephone category and count as only 1 PSU regardless of line quantity.",
    source: "Day 2 — Bundling and PSU"
  },
  {
    id: "q-d2-06",
    day: "Day 2",
    type: "multiple_choice",
    category: "Network Technology",
    question: "What does HSC stand for in network terminology?",
    options: [
      "High Split Coax",
      "High Speed Connection",
      "Hybrid System Cable",
      "Hardware Switch Controller"
    ],
    correctAnswer: "High Split Coax",
    explanation: "HSC stands for High Split Coax, an upgrade to coaxial network spectrum enabling higher and potentially symmetric upload speeds.",
    source: "Day 2 — Internet Connection Technologies"
  },
  {
    id: "q-d2-07",
    day: "Day 2",
    type: "multiple_choice",
    category: "Hardware",
    question: "What is the primary difference between a modem and a router?",
    options: [
      "Modem connects to the provider network; router distributes local Wi-Fi and IP addresses",
      "Router connects to outside fiber; modem creates Wi-Fi",
      "Modem is for telephone; router is for TV",
      "There is no difference between them"
    ],
    correctAnswer: "Modem connects to the provider network; router distributes local Wi-Fi and IP addresses",
    explanation: "The modem bridges the external provider network, while the router manages internal local routing and wireless distribution.",
    source: "Day 2 — Hardware & Equipment"
  },
  {
    id: "q-d2-08",
    day: "Day 2",
    type: "multiple_choice",
    category: "Video Services",
    question: "What is Xumo in the training recording?",
    options: [
      "An HDMI streaming media device ($5/month training example)",
      "A satellite dish receiver",
      "A fiber optic optical terminal",
      "A type of coax cable splitter"
    ],
    correctAnswer: "An HDMI streaming media device ($5/month training example)",
    explanation: "Xumo is an HDMI-connected streaming player enabling business TV over internet, cited at $5/month in training exercises.",
    source: "Day 2 — TV & Video Services"
  },

  // ==========================================
  // DAY 3 QUESTIONS
  // ==========================================
  {
    id: "q-d3-01",
    day: "Day 3",
    type: "multiple_choice",
    category: "Sales Terminology",
    question: "What is the fundamental difference between a Clear Sale and ALC?",
    options: [
      "Clear Sale is a new customer not currently using Spectrum; ALC is an existing Spectrum subscriber",
      "Clear Sale is for residential only; ALC is for business only",
      "Clear Sale requires credit check; ALC does not",
      "Clear Sale is internet only; ALC is phone only"
    ],
    correctAnswer: "Clear Sale is a new customer not currently using Spectrum; ALC is an existing Spectrum subscriber",
    explanation: "Clear Sale refers to a non-active customer acquiring new service. ALC means 'Already Customer' currently active on Spectrum.",
    source: "Day 3 — Types of Sales"
  },
  {
    id: "q-d3-02",
    day: "Day 3",
    type: "calculation",
    category: "Billing Calculations",
    question: "Calculate the total training example price for: Premier Internet ($50) + Router ($10) + One Phone Line ($20).",
    options: [
      "$80 / month",
      "$70 / month",
      "$90 / month",
      "$100 / month"
    ],
    correctAnswer: "$80 / month",
    explanation: "$50 base + $10 router + $20 phone line = $80 monthly recurring charge (before taxes/fees).",
    source: "Day 3 — Billing Calculations"
  },
  {
    id: "q-d3-03",
    day: "Day 3",
    type: "calculation",
    category: "Billing Calculations",
    question: "Calculate the training exercise total: 3 Phone Lines ($20 each) + Premier with Router ($60) + 3 Static IPs ($30).",
    options: [
      "$150 / month",
      "$140 / month",
      "$160 / month",
      "$130 / month"
    ],
    correctAnswer: "$150 / month",
    explanation: "3 phone lines = $60, Premier with router = $60, static IPs = $30. Total = $60 + $60 + $30 = $150/month.",
    source: "Day 3 — Billing Calculations"
  },
  {
    id: "q-d3-04",
    day: "Day 3",
    type: "multiple_choice",
    category: "Account Administration",
    question: "What does POC stand for in account management?",
    options: [
      "Point of Contact",
      "Proof of Concept",
      "Payment on Completion",
      "Primary Order Center"
    ],
    correctAnswer: "Point of Contact",
    explanation: "POC stands for Point of Contact, denoting the authorized individual permitted to execute account decisions.",
    source: "Day 3 — Account Administration"
  },
  {
    id: "q-d3-05",
    day: "Day 3",
    type: "multiple_choice",
    category: "Operational Terminology",
    question: "What does MRC stand for?",
    options: [
      "Monthly Recurring Charge",
      "Maximum Rate Cap",
      "Managed Router Connection",
      "Minimum Revenue Commitment"
    ],
    correctAnswer: "Monthly Recurring Charge",
    explanation: "MRC stands for Monthly Recurring Charge, the predictable monthly subscription cost of active telecommunications services.",
    source: "Day 3 — Operational Terminology"
  },
  {
    id: "q-d3-06",
    day: "Day 3",
    type: "multiple_choice",
    category: "Ethics & Compliance",
    question: "What is 'rip-and-replace' and what is the compliance policy regarding it?",
    options: [
      "Canceling an existing account to re-order under a new name for commission; it is strictly prohibited",
      "Replacing copper coax with fiber optic; it is encouraged",
      "Replacing broken routers with new models; it is standard maintenance",
      "Upgrading download speeds from Premier to Gig; it is permitted"
    ],
    correctAnswer: "Canceling an existing account to re-order under a new name for commission; it is strictly prohibited",
    explanation: "Rip-and-replace is the deceptive cancellation of active accounts to re-enter them as new sales, which constitutes a severe compliance violation.",
    source: "Day 3 — Compliance Guidelines"
  },
  {
    id: "q-d3-07",
    day: "Day 3",
    type: "true_false",
    category: "Ethics & Compliance",
    question: "True or False: A sales representative can legally call another carrier and impersonate the business owner to negotiate a bill.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "False. Customer impersonation is illegal and strictly prohibited. Representatives must use authorized third-party consent procedures.",
    source: "Day 3 — Ethics & Compliance"
  },
  {
    id: "q-d3-08",
    day: "Day 3",
    type: "multiple_choice",
    category: "Operational Terminology",
    question: "What is a 'chargeback' in sales operations?",
    options: [
      "A commission clawback or penalty when a sold account cancels prematurely",
      "A discount given to customers on their first invoice",
      "A fee charged to customers for paying late",
      "The cost of shipping replacement equipment"
    ],
    correctAnswer: "A commission clawback or penalty when a sold account cancels prematurely",
    explanation: "A chargeback is a commission reversal applied to an agent when an account fails retention or cancellation policies.",
    source: "Day 3 — Operational Terminology"
  }
];

export const QUIZ_ATTEMPTS_STORAGE_KEY = "vahlay_ai_quiz_attempts";

/**
 * Filter questions by quiz type and target count
 */
export const generateQuizQuestions = (type = "mixed", count = 5) => {
  let filtered = [...QUIZ_QUESTION_BANK];

  if (type === "day1") {
    filtered = filtered.filter(q => q.day === "Day 1");
  } else if (type === "day2") {
    filtered = filtered.filter(q => q.day === "Day 2");
  } else if (type === "day3") {
    filtered = filtered.filter(q => q.day === "Day 3");
  }

  // Shuffle questions randomly
  const shuffled = filtered.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Calculate quiz result analytics
 */
export const calculateQuizResults = (answers = [], questions = []) => {
  let correctCount = 0;
  const breakdown = [];
  const missedCategories = {};

  questions.forEach((q, idx) => {
    const candidateAnswer = answers[idx];
    const isCorrect = candidateAnswer && candidateAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

    if (isCorrect) {
      correctCount++;
    } else {
      missedCategories[q.category] = (missedCategories[q.category] || 0) + 1;
    }

    breakdown.push({
      question: q.question,
      candidateAnswer: candidateAnswer || "Not answered",
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
      source: q.source,
      category: q.category,
      day: q.day,
    });
  });

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  // Determine topics needing improvement
  const topicsNeedingImprovement = Object.keys(missedCategories);

  // Recommendations
  const recommendations = [];
  if (topicsNeedingImprovement.includes("ISP Fundamentals") || topicsNeedingImprovement.includes("US Standards")) {
    recommendations.push("Review Day 1: US Address formats, time zones, and 10-digit telephone structures.");
  }
  if (topicsNeedingImprovement.includes("Internet Packages") || topicsNeedingImprovement.includes("Sales Architecture")) {
    recommendations.push("Review Day 2: Premier/Ultra/Gig packages, PSU rules, and bundling definitions.");
  }
  if (topicsNeedingImprovement.includes("Sales Terminology") || topicsNeedingImprovement.includes("Billing Calculations") || topicsNeedingImprovement.includes("Ethics & Compliance")) {
    recommendations.push("Review Day 3: Clear Sale vs ALC, MRC calculations, and anti-impersonation compliance.");
  }
  if (recommendations.length === 0) {
    recommendations.push("Outstanding performance! You have mastered these Spectrum Business training concepts.");
  }

  return {
    total,
    correctCount,
    incorrectCount: total - correctCount,
    percentage,
    passed: percentage >= 70,
    breakdown,
    topicsNeedingImprovement,
    recommendations,
    completedAt: new Date().toISOString(),
  };
};

/**
 * Save quiz attempt locally and emit event for syncing
 */
export const saveQuizAttempt = (attempt) => {
  try {
    const existing = JSON.parse(localStorage.getItem(QUIZ_ATTEMPTS_STORAGE_KEY) || "[]");
    existing.unshift({
      id: "attempt-" + Date.now(),
      ...attempt,
    });
    localStorage.setItem(QUIZ_ATTEMPTS_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
    window.dispatchEvent(new Event("vahlay_quiz_attempt_saved"));
  } catch (e) {
    console.error("Error saving quiz attempt:", e);
  }
};

export const getQuizAttempts = () => {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_ATTEMPTS_STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
};
