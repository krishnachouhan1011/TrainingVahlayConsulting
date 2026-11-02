/**
 * Vahlay AI Training Assistant - RAG Engine
 * Multi-tier retrieval, language detection (English/Hindi/Hinglish),
 * and compliance guardrails.
 */

import { KNOWLEDGE_CHUNKS, VERIFIED_FAQS } from "./knowledgeBaseData.js";
import { lookupUSPSAbbreviation } from "./uspsData.js";

// Local storage key for admin additions
export const ADMIN_QA_STORAGE_KEY = "vahlay_ai_admin_approved_qa";
export const ADMIN_DOCS_STORAGE_KEY = "vahlay_ai_admin_documents";

/**
 * Get all available knowledge including Admin Approved Q&A (Priority 1)
 */
export const getAllKnowledge = () => {
  let adminQA = [];
  let adminDocs = [];

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const savedQA = localStorage.getItem(ADMIN_QA_STORAGE_KEY);
      if (savedQA) {
        adminQA = JSON.parse(savedQA);
      }
      const savedDocs = localStorage.getItem(ADMIN_DOCS_STORAGE_KEY);
      if (savedDocs) {
        adminDocs = JSON.parse(savedDocs);
      }
    } catch (e) {
      console.error("Error reading admin knowledge:", e);
    }
  }

  // Priority 1: Admin Approved QA & Documents
  const formattedAdminQA = adminQA.map((qa, index) => ({
    id: `admin-qa-${index}`,
    day: qa.day || "Day 1",
    category: "Admin Verified",
    title: qa.question,
    sourceReference: `Admin Verified — ${qa.day || "General"}`,
    priority: 1, // Highest
    keywords: (qa.question + " " + (qa.keywords || "")).toLowerCase().split(/[\s,]+/),
    content: qa.answer,
    keyPoints: [qa.answer.slice(0, 100) + "..."],
    examples: qa.example || "",
    isApproved: true,
  }));

  const formattedAdminDocs = adminDocs.map((doc, index) => ({
    id: `admin-doc-${index}`,
    day: doc.day || "General",
    category: doc.category || "Uploaded Document",
    title: doc.title,
    sourceReference: `Admin Document — ${doc.title}`,
    priority: 1,
    keywords: (doc.title + " " + (doc.keywords || "")).toLowerCase().split(/[\s,]+/),
    content: doc.content,
    keyPoints: [doc.summary || doc.title],
    examples: "",
    isApproved: doc.status === "active",
  })).filter(d => d.isApproved);

  return [
    ...formattedAdminQA,
    ...formattedAdminDocs,
    ...KNOWLEDGE_CHUNKS,
  ];
};

/**
 * Language detector: checks for Hindi script or common Hinglish patterns
 */
export const detectLanguage = (text = "") => {
  // Check Devanagari script range
  const devanagariRegex = /[\u0900-\u097F]/;
  if (devanagariRegex.test(text)) {
    return "hindi";
  }

  // Common Hinglish markers (require genuine Hindi words, not English 'me')
  const hinglishMarkers = [
    /\bkya\b/i, /\bhai\b/i, /\bhain\b/i, /\bko\b/i, /\bka\b/i, /\bki\b/i, /\bke\b/i,
    /\bmein\b/i, /\bse\b/i, /\bpar\b/i, /\baur\b/i, /\bkar\b/i, /\bkarein\b/i,
    /\bkaise\b/i, /\bkyun\b/i, /\bkitna\b/i, /\bkitne\b/i, /\bbatao\b/i, /\bsamjhao\b/i,
    /\byeh\b/i, /\bwoh\b/i, /\bhota\b/i, /\bhoti\b/i, /\bhote\b/i, /\bhumein\b/i, /\bhamein\b/i,
    /\bkaro\b/i, /\bbolo\b/i, /\bhindi\b/i, /\bme\s+(batao|samjhao|karo|dekho)\b/i
  ];

  let matches = 0;
  for (const marker of hinglishMarkers) {
    if (marker.test(text)) matches++;
  }

  // Require at least 2 markers or 1 strong marker (batao, samjhao, kya hota hai)
  const strongMarker = /\b(batao|samjhao|kaise|kitna|kya hota|kyun|hindi mein|hindi me)\b/i;
  if (strongMarker.test(text) || matches >= 2) {
    return "hinglish";
  }

  return "english";
};

// Common typo normalizer
export const normalizeQuery = (text = "") => {
  let cleaned = (text || "").toLowerCase().trim();
  const typos = [
    [/\bhbow\b/g, "how"],
    [/\bhwo\b/g, "how"],
    [/\bhoww\b/g, "how"],
    [/\bwat\b/g, "what"],
    [/\bwht\b/g, "what"],
    [/\bwhta\b/g, "what"],
    [/\bteh\b/g, "the"],
    [/\btrainingg\b/g, "training"],
    [/\btraing\b/g, "training"],
    [/\btrainig\b/g, "training"],
    [/\bpln\b/g, "plan"],
    [/\bplns\b/g, "plans"],
    [/\bpkg\b/g, "package"],
    [/\bpkgs\b/g, "packages"],
    [/\bpacage\b/g, "package"],
    [/\bpacages\b/g, "packages"],
    [/\bspead\b/g, "speed"],
    [/\bwrks\b/g, "works"],
    [/\bwrk\b/g, "work"],
    [/\b8day\b/g, "8 day"],
    [/\b8days\b/g, "8 days"],
    [/\beightday\b/g, "8 day"],
    [/\beightdays\b/g, "8 days"],
    [/\b(\d+)\s*tn\b/g, "$1 tn"],
    [/\b4th\s*tn\b/g, "4 tn"],
    [/\b3rd\s*tn\b/g, "3 tn"],
    [/\b2nd\s*tn\b/g, "2 tn"],
    [/\b1st\s*tn\b/g, "1 tn"],
    [/\btelephne\b/g, "telephone"],
    [/\btellephone\b/g, "telephone"],
    [/\bbyh\b/g, "by"],
  ];
  for (const [pattern, replacement] of typos) {
    cleaned = cleaned.replace(pattern, replacement);
  }
  return cleaned;
};

/**
 * Detect casual conversational greetings, politeness, asking for help, and identity questions
 */
export const checkConversational = (query = "") => {
  const norm = normalizeQuery(query);
  const q = norm.replace(/[?!.,]/g, " ");
  const words = q.split(/\s+/).filter(Boolean);

  const isHindi = /\b(kaise|kya|madad|batao|samjhao|shukriya|namaste|theek|badhiya|aap|hoon|haan|ek|kuch|samajh|nahi|karo|bhai|sir|ji|hai|mein)\b/i.test(q);

  // 1. Comprehensive 8-Day Training Program Overview / Roadmap
  const specificDayMatch = q.match(/\bday\s*([1-8])\b/i);
  const isEightDayQuery =
    !specificDayMatch && (
      q.includes("8 day") ||
      q.includes("8-day") ||
      q.includes("eight day") ||
      q.includes("all 8 days") ||
      q.includes("all days") ||
      q.includes("8 days of training") ||
      (q.includes("how") && q.includes("training") && q.includes("work")) ||
      (q.includes("how") && q.includes("8") && q.includes("work")) ||
      (q.includes("training") && (q.includes("program") || q.includes("curriculum") || q.includes("overview") || q.includes("roadmap") || q.includes("syllabus")))
    );

  if (isEightDayQuery) {
    return {
      isConversational: true,
      message: isHindi
        ? `**Vahlay Consulting 8-Day Training Program Ka Poora Roadmap:**

• **Day 1: Company Introduction & Policies** — Vahlay culture, policies, salary & incentives, US address format aur 4 time zones.
• **Day 2: Telecom Basics** — Fiber, High-Split Coax aur Cable internet, speeds (Mbps vs Gbps), modem vs router, installation aur phone porting.
• **Day 3: Sales Process Training** — Call greeting, needs discovery, package pitch, objection handling, aur ALC (Already Customer) vs Clear Sale rules.
• **Day 4: Buyflow & Service Qualification** — Address qualification tools, facility check (On-Net vs Near-Net), 4-step buyflow, aur usage-based 2026 plans (Premier $65, Ultra $95, Gig $115).
• **Day 5: Communication & Accent** — US clarity, calm 130–150 WPM pacing, polite tone, aur mock calls.
• **Day 6: Targets & Performance** — Talk time targets, Internet + TV bundling test practice, QA criteria, aur anti-slamming ethics.
• **Day 7: Live Call Observation** — Top agents ki live calls sunna, shadowing aur real-time objection handling.
• **Day 8: Operations Tools & Final Assessment** — CRM, ERP & Order Tracker workflows, written assessment, voice certification test, aur final graduation.

*Kya aap kisi specific Day (jaise Day 1 ya Day 4) ke baare mein detail mein jaanna chahte hain?*`
        : `**How the Vahlay Consulting 8-Day Training Program Works:**

Our 8-day curriculum is designed to take you step-by-step from foundational telecom basics to full sales floor certification:

• **Day 1: Company Introduction & Policies**
  Vahlay culture, discipline, salary cycle, US telecom overview, US address format, and the 4 time zones.
• **Day 2: Telecom Basics**
  Internet connection technologies (Fiber, High-Split Coax, Cable), Mbps vs Gbps, modems vs routers, installation process, and phone porting.
• **Day 3: Sales Process Training**
  Opening call greeting, customer needs discovery, package pitching, objection handling, and ALC (Already Customer) vs Clear Sale.
• **Day 4: Buyflow & Service Qualification**
  System address validation, network facility checks (Fiber On-Net vs Near-Net), 4-step buyflow, and 2026 contract-free plans (Premier $65/mo, Ultra $95/mo, Gig $115/mo).
• **Day 5: Communication & Accent**
  US customer clarity, steady 130–150 WPM pacing, vocal warmth, handling tough objections, and mock calls.
• **Day 6: Targets & Performance**
  Daily/monthly talk time benchmarks, Internet + TV bundling test practice, QA scoring, and zero-tolerance compliance rules.
• **Day 7: Live Call Observation**
  Shadowing senior floor agents, listening to real customer conversations, and learning live rebuttal delivery.
• **Day 8: Operations Tools & Final Assessment**
  CRM, ERP & Order Tracker navigation, comprehensive written and voice certification exams to graduate to live sales calls.

*Would you like me to explain any specific day in more detail?*`,
      source: "Vahlay Consulting — 8-Day Training Program",
      status: "Program Verified",
      suggestedQuestions: [
        "What is taught in Day 1?",
        "What is taught in Day 2?",
        "What is Day 4 Buyflow?",
        "What is Day 8 Assessment?"
      ]
    };
  }

  // Check if query contains an actual training curriculum topic keyword
  // If it does, let RAG retrieve the specific curriculum answer (e.g. "Can you help me understand PSU?")
  const trainingTopicKeywords = [
    "tn", "cx", "ck", "svcs", "short form", "short forms", "floor jargon",
    "clear sale", "clear sales", "psu", "alc", "premier", "ultra", "gig", "gigabit",
    "pricing", "price", "speed", "mbps", "gbps", "download", "upload", "symmetric", "asymmetric",
    "isp", "at&t", "comcast", "charter", "spectrum business", "competitor",
    "address", "street", "suffix", "zip code", "pasadena", "crm", "coverage",
    "time zone", "eastern", "central", "mountain", "pacific",
    "telephone", "area code", "voip", "landline", "phone line",
    "modem", "router", "extender", "invincible wifi", "static ip",
    "tv", "xumo", "cable", "streaming", "bundling", "bundle",
    "double play", "triple play", "poc", "point of contact",
    "mrc", "chargeback", "soho", "pia", "rip and replace",
    "day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7", "day 8", "quiz", "test", "mcq"
  ];

  const hasSpecificTrainingTopic = trainingTopicKeywords.some(kw => q.includes(kw));

  // If the user does NOT mention any specific training concept, handle it conversationally like a real human trainer:
  if (!hasSpecificTrainingTopic) {

    // 1. Where should I start? / Getting started / Roadmap
    if (
      q.includes("where should i start") || q.includes("where to start") ||
      q.includes("where do i start") || q.includes("where do i begin") ||
      q.includes("how should i start") || q.includes("how to start") ||
      q.includes("how do i start") || q.includes("what should i start") ||
      q.includes("what should i learn first") || q.includes("start with") ||
      q.includes("roadmap") || q.includes("new here") || q.includes("shuru kahan se") ||
      q.includes("kahan se shuru") || q.includes("kaha se start")
    ) {
      return {
        isConversational: true,
        message: isHindi
          ? "Welcome! Yeh raha aapka quick 3-day roadmap:\n\n1. **Day 1:** US Address Format aur 4 Time Zones\n2. **Day 2:** Spectrum Internet Packages aur Bundling Rules\n3. **Day 3:** Sales Terms (ALC vs Clear Sale) aur Compliance\n\n*Kya hum Day 1 ko detail mein samjhein?*"
          : "Welcome! Here is your quick 3-day learning roadmap:\n\n1. **Day 1:** US Address Format (`Street -> City -> State -> ZIP`) & 4 Time Zones\n2. **Day 2:** Spectrum Internet Tiers (Premier, Ultra, Gig) & Bundling Rules\n3. **Day 3:** Sales Terms (ALC vs Clear Sale) & Compliance\n\n*Would you like me to explain Day 1 in more detail?*",
        source: "Vahlay Training Mentor",
        status: "Trainer Guidance"
      };
    }

    // 2. Asking how the trainer is (e.g. "how are you", "kaise ho")
    if (
      q.includes("how are you") || q.includes("how r u") || q.includes("how are u") ||
      q.includes("how do you do") || q.includes("kaise ho") || q.includes("kya haal") ||
      q.includes("sab theek")
    ) {
      return {
        isConversational: true,
        message: isHindi
          ? "Main bilkul theek hoon, poochne ke liye shukriya! Aur main yahan aapki poori madad ke liye available hoon. Aap batayein aaj training mein kis topic par baat karni hai — Day 1, Day 2 ya Day 3?"
          : "I'm doing great, thank you for asking! I'm right here with you to help you succeed in your training. What would you like to review today — Day 1 address formats, Day 2 internet plans & bundling, or Day 3 sales terms like ALC?",
        source: "Vahlay Training Mentor",
        status: "Trainer Ready"
      };
    }

    // 3. General Help / Doubts / Confusion (e.g. "can you help", "i need help", "i have a doubt", "confused")
    if (
      q.includes("help") || q.includes("madad") || q.includes("doubt") ||
      q.includes("question") || q.includes("confus") || q.includes("samajh nahi") ||
      q.includes("stuck") || q.includes("problem")
    ) {
      return {
        isConversational: true,
        message: isHindi
          ? "Haan bilkul, main aapka mentor hoon aur aapki madad ke liye hi yahan hoon! Bilkul tension mat lijiye — shuru mein telecom aur CRM terms thode naye lagte hain. Batayein kis topic mein doubt hai, hum milkar step-by-step clear karenge!"
          : "Absolutely! I'm right here to coach you through whatever you need. Don't worry if any concepts feel tricky at first — telecom training has plenty of new terminology, but we'll break it down together. What topic or doubt can I help you with?",
        source: "Vahlay Training Mentor",
        status: "Trainer Support"
      };
    }

    // 4. Greetings
    const greetingWords = ["hey", "hi", "hello", "heya", "howdy", "sup", "yo", "morning", "afternoon", "evening", "namaste", "pranam", "salaam"];
    if (words.some(w => greetingWords.includes(w)) || q.includes("good morning") || q.includes("good afternoon") || q.includes("good evening")) {
      return {
        isConversational: true,
        message: isHindi
          ? "Namaste! Kaise hain aap? Main aapka Vahlay Training Mentor hoon. Aaj aap Spectrum Business training (Day 1, Day 2 ya Day 3) mein kya seekhna chahte hain?"
          : "Hey there! Hello! I'm your Vahlay Training Mentor for the Spectrum Business program. What would you like to learn or revise today? You can ask me about Day 1 Fundamentals, Day 2 Internet Packages, Day 3 Sales Terminology, or we can start a practice quiz!",
        source: "Vahlay Training Mentor",
        status: "Trainer Ready"
      };
    }

    // 5. Who are you / Identity
    if (q.includes("who are you") || q.includes("what is your name") || q.includes("what can you do") || q.includes("aap kaun ho") || q.includes("tum kaun ho")) {
      return {
        isConversational: true,
        message: "I am your **Vahlay Training Mentor**, your dedicated coach for the Spectrum Business / ISP Operations training program. I'm here to explain lessons clearly, break down tricky terminology like PSU and ALC, calculate billing exercises, and help you get 100% prepared for your assessments!",
        source: "Vahlay Training Mentor",
        status: "Trainer Introduction"
      };
    }

    // 6. Thanks / Gratitude
    if (q.includes("thanks") || q.includes("thank you") || q.includes("thx") || q.includes("dhanyawad") || q.includes("shukriya")) {
      return {
        isConversational: true,
        message: "You're very welcome! You're doing great. Keep up the dedication, and let me know whenever you'd like to review another topic or take a quiz!",
        source: "Vahlay Training Mentor",
        status: "Trainer Support"
      };
    }

    // 7. Acknowledgment
    if (["ok", "okay", "cool", "got it", "understood", "sahi hai", "theek hai"].some(a => words.includes(a))) {
      return {
        isConversational: true,
        message: "Awesome! What would you like to review next? You can pick any topic from Day 1, Day 2, or Day 3, or test your skills with a quick quiz.",
        source: "Vahlay Training Mentor",
        status: "Trainer Support"
      };
    }
  }

  return { isConversational: false };
};

/**
 * Guardrail checks for prompt injection, sensitive data, deceptive practices, or unsupported topics
 */
export const checkGuardrails = (query = "") => {
  const q = query.toLowerCase().trim();

  // 0. Check casual conversational greetings & requests for help first!
  const conv = checkConversational(query);
  if (conv.isConversational) {
    return {
      triggered: true,
      isConversational: true,
      message: conv.message,
      source: conv.source,
      status: conv.status
    };
  }

  // 0.5. Check approved USPS Job Aid (58 States & 223 Street / Unit Abbreviations)
  const normQ = normalizeQuery(query);
  const uspsResult = lookupUSPSAbbreviation(normQ);
  if (uspsResult.found) {
    return {
      triggered: true,
      isConversational: false,
      message: uspsResult.text,
      source: uspsResult.source || "Day 1 — Approved USPS Job Aid",
      status: "USPS Job Aid Verified"
    };
  }

  // 3. Deceptive or unauthorized account handling practices (Customer impersonation, hiding active services, rip-and-replace)
  if (
    (q.includes("impersonat") || q.includes("pretend to be") || q.includes("fake identity") || q.includes("bypass check")) ||
    (q.includes("hide") && q.includes("service")) ||
    q.includes("rip and replace") ||
    q.includes("rip-and-replace")
  ) {
    return {
      triggered: true,
      message: `**Compliance & Safety Alert:**
Under Vahlay Consulting and Spectrum compliance rules:
1. **No Customer Impersonation:** Representatives must never pretend to be the customer, call other carriers claiming to be the account owner, or use fake identities.
2. **No Hiding Active Services:** You must clearly disclose every active service, ongoing monthly charge, and true cancellation status.
3. **Rip-and-Replace:** The practice of improperly canceling an existing customer's account to open a new account for commission is strictly prohibited.

Always use authorized representative channels and obtain genuine customer consent.`,
      source: "Day 3 — Compliance & Ethics Guidelines"
    };
  }

  // 4. Requesting or sharing confidential customer information
  if (
    q.includes("passkey") || q.includes("credit card") || q.includes("cvv") ||
    q.includes("social security") || q.includes("ssn") || q.includes("account password")
  ) {
    return {
      triggered: true,
      message: "**Privacy Protection Alert:**\nNever request, record, or submit confidential customer passkeys, full payment details, or personal credentials in training chats. Refer candidates to approved, secure verification workflows.",
      source: "Vahlay Security & Compliance Policy"
    };
  }

  return { triggered: false };
};

/**
 * Retrieve relevant chunks and FAQ items based on the query and day filter
 */
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "of", "with",
  "is", "are", "was", "were", "be", "been", "it", "this", "that", "me", "my",
  "tell", "give", "show", "can", "you", "please", "plz", "i", "we", "do", "how",
  "what", "why", "when", "where", "about"
]);

export const retrieveKnowledge = (query = "", selectedDay = "all", topK = 4) => {
  const cleanQuery = normalizeQuery(query);
  const queryTokens = cleanQuery
    .split(/[\s,?.!-]+/)
    .filter(t => t.length >= 2 && !STOP_WORDS.has(t));
  const allChunks = getAllKnowledge();

  // Also search FAQ items
  const faqMatches = VERIFIED_FAQS.map(faq => {
    let score = 0;
    let hasMatch = false;
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();

    // Exact phrase match
    if (qLower.includes(cleanQuery) || (cleanQuery.length > 3 && cleanQuery.includes(qLower))) {
      score += 20;
      hasMatch = true;
    }

    // Token matching
    queryTokens.forEach(token => {
      if (token.length >= 2 && qLower.includes(token)) {
        score += 5;
        hasMatch = true;
      } else if (token.length >= 2 && aLower.includes(token)) {
        score += 2;
        hasMatch = true;
      }
    });

    if (!hasMatch) return null;

    // Day filtering bonus/penalty
    if (selectedDay !== "all" && faq.day.toLowerCase() === selectedDay.toLowerCase()) {
      score += 3;
    }

    const dayModuleMap = {
      "Day 1": "Day 1 — ISP & US Standards",
      "Day 2": "Day 2 — Spectrum Packages & Bundling",
      "Day 3": "Day 3 — Sales Terminology & Ethics",
    };
    const topicRef = dayModuleMap[faq.day] || `${faq.day} — Training Curriculum`;

    return {
      ...faq,
      title: faq.question,
      content: faq.answer,
      sourceReference: topicRef,
      score,
      priority: 3,
      isFaq: true,
    };
  }).filter(Boolean);

  // Score knowledge chunks
  const scoredChunks = allChunks.map(chunk => {
    let score = 0;
    let hasMatch = false;
    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();
    const categoryLower = chunk.category.toLowerCase();

    // Exact phrase in title or content
    if (titleLower.includes(cleanQuery)) {
      score += 25;
      hasMatch = true;
    }
    if (contentLower.includes(cleanQuery) && cleanQuery.length > 2) {
      score += 12;
      hasMatch = true;
    }

    // Acronym and keyword matching
    chunk.keywords.forEach(kw => {
      const kwLower = kw.toLowerCase();
      if (cleanQuery === kwLower || cleanQuery.split(/[\s,?.!-]+/).includes(kwLower)) {
        score += 15;
        hasMatch = true;
      } else if (cleanQuery.includes(kwLower) && kwLower.length > 2) {
        score += 8;
        hasMatch = true;
      }
    });

    // Token scoring
    queryTokens.forEach(token => {
      if (token.length <= 1) return;
      if (chunk.keywords.some(k => k.toLowerCase() === token)) {
        score += 8;
        hasMatch = true;
      }
      if (titleLower.includes(token)) {
        score += 6;
        hasMatch = true;
      }
      if (categoryLower.includes(token)) {
        score += 4;
        hasMatch = true;
      }
      if (contentLower.includes(token)) {
        score += 2;
        hasMatch = true;
      }
    });

    // If no words matched, discard
    if (!hasMatch) return null;

    // Check if query targets a specific training day (Day 1 - Day 8)
    const dayTargetMatch = cleanQuery.match(/\bday\s*([1-8])\b/i);
    if (dayTargetMatch) {
      const targetDayStr = `day ${dayTargetMatch[1]}`;
      if (chunk.day && chunk.day.toLowerCase() === targetDayStr) {
        score += 35; // Major boost for chunks matching the requested day
      } else if (chunk.id === "program-8day-overview") {
        score -= 25; // Suppress overview when a specific day is targeted
      }
    }

    // Day filter bonus
    if (selectedDay !== "all" && chunk.day.toLowerCase() === selectedDay.toLowerCase()) {
      score += 5;
    }

    // Priority weighting only for valid matches
    if (chunk.priority === 1) score += 8;
    else if (chunk.priority === 2) score += 4;
    else if (chunk.priority === 3) score += 2;

    return {
      ...chunk,
      score,
      isFaq: false,
    };
  }).filter(Boolean);

  // Combine and sort by score
  const combined = [...faqMatches, ...scoredChunks].sort((a, b) => b.score - a.score);

  return combined.slice(0, topK);
};

/**
 * Generate suggested follow-up questions tailored to the matched topic
 */
export const getSuggestedFollowUps = (chunks = [], query = "") => {
  const q = query.toLowerCase();

  if (q.includes("isp") || q.includes("day 1") || q.includes("address") || q.includes("time zone")) {
    return [
      "What are the four main US time zones?",
      "What is the US business address format?",
      "How do US telephone numbers and area codes work?",
      "Take a 5-question Day 1 Quiz"
    ];
  }

  if (q.includes("premier") || q.includes("ultra") || q.includes("gig") || q.includes("package") || q.includes("psu") || q.includes("bundl") || q.includes("day 2")) {
    return [
      "What is PSU and how does bundling work?",
      "What is the difference between Coax, Fiber, and High Split Coax (HSC)?",
      "What is the training price for Premier with router and phone line?",
      "Explain the difference between a modem and a router"
    ];
  }

  if (q.includes("alc") || q.includes("clear sale") || q.includes("poc") || q.includes("mrc") || q.includes("chargeback") || q.includes("day 3")) {
    if (q.includes("2") || q.includes("two") || q.includes("acc") || q.includes("hierarchy") || q.includes("second poc")) {
      return [
        "Explain in more detail",
        "What is Second POC?",
        "What is 1-Account Setup?",
        "What is a Hierarchy Account?"
      ];
    }
    return [
      "What is the difference between Clear Sale and ALC?",
      "Why do we need 2 accounts for ALC?",
      "What does POC mean and who can authorize changes?",
      "What is rip-and-replace and why is it prohibited?"
    ];
  }

  return [
    "Explain Day 1 Training",
    "Explain Spectrum Internet Packages",
    "What is the bundling rule?",
    "Start My Training Quiz"
  ];
};
