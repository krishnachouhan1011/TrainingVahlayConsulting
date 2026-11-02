/**
 * Vahlay AI Training Assistant - AI Service
 * Grounded LLM Client with Gemini, OpenAI, Groq support,
 * secure key handling, and local RAG synthesis fallback.
 */

import { retrieveKnowledge, detectLanguage, checkGuardrails, getSuggestedFollowUps, normalizeQuery } from "./ragEngine.js";

export const AI_SETTINGS_STORAGE_KEY = "vahlay_ai_config";

export const DEFAULT_AI_CONFIG = {
  provider: (typeof import.meta !== "undefined" && import.meta.env?.VITE_AI_PROVIDER) || "gemini",
  apiKey: (typeof import.meta !== "undefined" && (import.meta.env?.VITE_AI_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY)) || "",
  model: (typeof import.meta !== "undefined" && import.meta.env?.VITE_AI_MODEL) || "gemini-1.5-flash",
  temperature: 0.2,
};

export function getAIConfig() {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const saved = localStorage.getItem(AI_SETTINGS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_AI_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Error reading AI config:", e);
    }
  }
  return DEFAULT_AI_CONFIG;
}

export function saveAIConfig(config) {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(config));
      window.dispatchEvent(new Event("vahlay_ai_config_updated"));
    } catch (e) {
      console.error("Error saving AI config:", e);
    }
  }
}

const SYSTEM_INSTRUCTION = `You are the Vahlay AI Training Mentor & Executive Coach at Vahlay Consulting Inc.

Your capabilities:
1. WEBSITE & TRAINING CURRICULUM MASTERY:
   - You know the entire Vahlay Consulting 8-Day Training Program (Days 1 to 8), Spectrum Business product portfolio, 2026 contract-free plans (Premier 500M from $65/mo, Ultra 750M from $95/mo, Gig 1G from $115/mo), US address qualification, time zones, ALC vs Clear Sale, buyflow qualification, soft skills, QA compliance, and order tracking.
   - CALL CENTER SHORT FORMS & JARGON:
     • TN: Telephone (Telephone Line / Telephone Number)
     • CX: Customer (Client / Caller / Subscriber)
     • CK: Check (Verify account, check address, inspect CRM services)
     • SVCS: Services (Active products: Internet, Phone, TV, Mobile)
     • "CK CX SVCS": Check Customer Services in CRM
   - TELEPHONE (TN) PRICING RULES:
     • Clear Sales (new customers): $20 / month per telephone line (e.g. 1 TN = $20, 2 TN = $40, 3 TN = $60, 4 TN = $80).
     • ALC (Already Customer / existing customers):
       - 1st TN (existing line): $50 / month
       - Each Add-On TN: +$30 / month for each additional line ($50 + (N - 1) × $30)
         • 1 TN = $50/mo
         • 2 TN = $80/mo ($50 + $30)
         • 3 TN = $110/mo ($50 + 2×$30)
         • 4 TN = $140/mo ($50 + 3×$30)
         • 5 TN = $170/mo ($50 + 4×$30)
   - Ground any curriculum questions accurately in the verified website materials and notes.

2. BROAD GENERAL AI KNOWLEDGE:
   - When a user asks general questions (e.g., networking fundamentals, DNS, DHCP, symmetric vs asymmetric bandwidth, Wi-Fi 6, telecommunication history, English communication tips, customer psychology, sales closing methodologies, or everyday inquiries), answer with top-tier AI intelligence, clarity, and warmth.
   - Do NOT reject general questions or say "notes do not confirm" when asked standard telecom, technical, soft skills, or conversational questions.

3. COACHING STYLE:
   - Keep answers clear, structured, engaging, and easy to read with bullet points and bold highlights.
   - Converse naturally in English, Hindi, or Hinglish depending on what language the user uses.
   - When asked for a specific tier/price, focus on that requested item clearly before offering broader options.
   - Conclude answers with an encouraging follow-up prompt.`;

/**
 * Local Grounded Synthesis Engine (RAG Fallback when API key is not yet set)
 * Synthesizes grounded, accurate, structured answers from the knowledge base chunks.
 */
const synthesizeLocalResponse = (query, retrievedChunks, language) => {
  const normQuery = normalizeQuery(query || "");
  const qLower = normQuery.toLowerCase();
  const wantsDetail = qLower.includes("detail") || qLower.includes("deep dive") || qLower.includes("explain more") || qLower.includes("elaborate") || qLower.includes("more example") || qLower.includes("bistar");

  const primary = retrievedChunks && retrievedChunks.length > 0 ? retrievedChunks[0] : null;

  const specificDayMatch = qLower.match(/\bday\s*([1-8])\b/i);
  const requestedSpecificDay = specificDayMatch ? parseInt(specificDayMatch[1], 10) : null;

  // 0. Global 8-Day Training Program Overview check
  const isEightDayQuery =
    !requestedSpecificDay && (
      qLower.includes("8 day") ||
      qLower.includes("8-day") ||
      qLower.includes("eight day") ||
      qLower.includes("all 8 days") ||
      qLower.includes("all days") ||
      qLower.includes("8 days of training") ||
      (primary && primary.id === "program-8day-overview") ||
      (qLower.includes("how") && qLower.includes("training") && qLower.includes("work")) ||
      (qLower.includes("how") && qLower.includes("8") && qLower.includes("work")) ||
      (qLower.includes("training") && (qLower.includes("program") || qLower.includes("curriculum") || qLower.includes("overview") || qLower.includes("roadmap") || qLower.includes("syllabus")))
    );

  if (isEightDayQuery) {
    if (language === "hindi" || language === "hinglish") {
      return {
        text: `**Vahlay Consulting 8-Day Training Program Ka Poora Roadmap:**

• **Day 1: Company Introduction & Policies** — Vahlay culture, policies, salary & incentives, US address format aur 4 time zones.
• **Day 2: Telecom Basics** — Fiber, High-Split Coax aur Cable internet, speeds (Mbps vs Gbps), modem vs router, installation aur phone porting.
• **Day 3: Sales Process Training** — Call greeting, needs discovery, package pitch, objection handling, aur ALC (Already Customer) vs Clear Sale rules.
• **Day 4: Buyflow & Service Qualification** — Address qualification tools, facility check (On-Net vs Near-Net), 4-step buyflow, aur usage-based 2026 plans (Premier $65, Ultra $95, Gig $115).
• **Day 5: Communication & Accent** — US clarity, calm 130–150 WPM pacing, polite tone, aur mock calls.
• **Day 6: Targets & Performance** — Talk time targets, Internet + TV bundling test practice, QA criteria, aur anti-slamming ethics.
• **Day 7: Live Call Observation** — Top agents ki live calls sunna, shadowing aur real-time objection handling.
• **Day 8: Operations Tools & Final Assessment** — CRM, ERP & Order Tracker workflows, written assessment, voice certification test, aur final graduation.

*Kya aap kisi specific Day (jaise Day 1 ya Day 4) ke baare mein detail mein jaanna chahte hain?*`,
        citations: ["Vahlay Consulting — 8-Day Training Program"],
        suggestedQuestions: ["What is taught in Day 1?", "What is taught in Day 2?", "What is Day 4 Buyflow?", "What is Day 8 Assessment?"],
        verification: {
          checkedAgainst: "Vahlay Consulting — 8-Day Training Program",
          status: "Curriculum Verified",
          day: "All Days",
        }
      };
    }

    return {
      text: `**How the Vahlay Consulting 8-Day Training Program Works:**

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
      citations: ["Vahlay Consulting — 8-Day Training Program"],
      suggestedQuestions: ["What is taught in Day 1?", "What is taught in Day 2?", "What is Day 4 Buyflow?", "What is Day 8 Assessment?"],
      verification: {
        checkedAgainst: "Vahlay Consulting — 8-Day Training Program",
        status: "Curriculum Verified",
        day: "All Days",
      }
    };
  }

  // 0.5 Specific Day Handler (Day 1 through Day 8)
  if (requestedSpecificDay) {
    const dayData = {
      1: {
        title: "Day 1: Company Introduction & Policies",
        ref: "Day 1 — Company Introduction & Policies",
        content: `**Day 1 — Company Introduction & Policies Overview:**

Day 1 establishes foundational company standards, professional expectations, and the US business landscape:

• **Understanding Vahlay Consulting:**
  - Company background, vision, and role in supporting US ISP sales operations.
• **Culture, Discipline & Policies:**
  - Professional workplace decorum, zero unauthorized absenteeism, shift adherence, and respect for lead management.
• **Salary Cycle & Evaluation Criteria:**
  - Fixed pay cycle, milestone targets, and key evaluation metrics required to maintain active floor status.
• **Introduction to US Telecom Industry:**
  - Top US carriers: Spectrum Business (Charter), AT&T, Comcast Business, Verizon, T-Mobile.
• **US Business Address Standard:**
  - Standard sequence: \`Recipient / Company -> Street Address -> Secondary Unit -> City -> State (2-letter) -> ZIP (5-digit)\`.
• **4 Main US Time Zones:**
  - Eastern (ET), Central (CT = ET - 1h), Mountain (MT = ET - 2h), Pacific (PT = ET - 3h).

*Trainer Tip: Accurate address qualification on Day 1 prevents failed orders and delivery errors on the sales floor!*`,
        suggested: ["What is the US address format?", "What are the 4 time zones?", "What is taught in Day 2?", "Take Day 1 Practice Quiz"]
      },
      2: {
        title: "Day 2: Telecom Basics & Connectivity",
        ref: "Day 2 — Telecom Basics",
        content: `**Day 2 — Telecom Basics Overview:**

Day 2 covers internet infrastructure, speeds, equipment, and telephone provisioning:

• **Connection Technologies:**
  - **Fiber:** Highest reliability, dedicated symmetrical speeds (e.g. 1 Gbps download / 1 Gbps upload).
  - **High-Split Coax (HSC):** Modernized hybrid coax delivering multi-gigabit speeds and enhanced upload performance.
  - **Standard Cable / Coax:** Asymmetrical speeds (high download, moderate upload) for everyday business operations.
• **Bandwidth Terminology:**
  - **Mbps vs Gbps:** 1 Gbps = 1,000 Mbps. Speed requirements depend on device count and cloud usage.
• **Equipment Hardware:**
  - **Modem:** Translates ISP signal from the wall into digital data.
  - **Router:** Creates the local network (LAN) and broadcasts Wi-Fi.
  - **Extenders:** Eliminate Wi-Fi dead spots in large retail or warehouse layouts.
  - **Static IP:** Dedicated unchanging IP address for servers, POS, VPN, and security cameras.
• **Phone Porting & Numbers:**
  - Keeping existing business numbers via Letter of Authorization (LOA) without disruption.
• **Spectrum Business Packages (2026):**
  - **Premier (500 Mbps):** From $65/mo (small office/retail).
  - **Ultra (750 Mbps):** From $95/mo (medium teams, POS + streaming).
  - **Gig (1 Gbps):** From $115/mo (heavy data transfers, cloud backups).

*Trainer Tip: Always qualify speed needs based on customer device counts, POS systems, and cloud applications.*`,
        suggested: ["Explain modem vs router", "What is phone porting?", "What is PSU?", "What is taught in Day 3?"]
      },
      3: {
        title: "Day 3: Sales Process Training",
        ref: "Day 3 — Sales Process Training",
        content: `**Day 3 — Sales Process Training Overview:**

Day 3 teaches the complete consultative sales flow, customer classification, and pricing structures:

• **5-Step Sales Flow:**
  1. **Greeting & Introduction:** Confident, polite professional opening.
  2. **Needs Discovery:** Asking open-ended questions about current speeds, pain points, and device count.
  3. **Pitching Solutions:** Recommending the ideal package based on identified needs rather than just lowest price.
  4. **Objection Handling:** Addressing contract hesitancy, price concerns, or loyalty to current ISP.
  5. **Closing Strategies:** Securing decision-maker commitment and scheduling installation.
• **Clear Sale vs ALC (Already Customer):**
  - **Clear Sale:** Brand-new customer with no active Spectrum account at the address.
  - **ALC:** Existing customer adding new lines/services.
• **Telephone (TN) Line Pricing Rules:**
  - **Clear Sales:** $20 / month per telephone line.
  - **ALC Existing Customer:** 1st TN = $50/mo; each add-on line = +$30/mo ($50 + (N - 1) × $30).
• **Hierarchy Accounts:** 2-account structure required when adding lines for an ALC business.
• **Point of Contact (POC) & Compliance:**
  - Must speak only with authorized decision-makers. Strictly zero tolerance for slamming or unauthorized service changes.

*Trainer Tip: Master the telephone pricing formula before going to live calls!*`,
        suggested: ["Explain ALC telephone pricing", "What is Clear Sale?", "What is 2-account setup?", "What is taught in Day 4?"]
      },
      4: {
        title: "Day 4: Buyflow & Service Qualification",
        ref: "Day 4 — Buyflow & Service Qualification",
        content: `**Day 4 — Buyflow & Service Qualification Overview:**

Day 4 teaches system navigation, facility checks, and accurate order qualification:

• **Core Golden Rule:**
  - *"Sell what is available, not what sounds good. Check first, quote second."*
• **Service Qualification in Buyflow:**
  - Validating exact customer street address, suite/unit number, and zip code in the qualification tool.
• **Network Facilities & Infrastructure Check:**
  - **Fiber On-Net:** Building is already directly connected to fiber; fast provisioning.
  - **Near-Net:** Fiber is nearby in the street but requires a buildout.
  - **High-Split Coaxial / Coax:** Readily available cable footprint with fast standard self-install or professional truck roll.
• **4-Step Buyflow Process:**
  1. Address Qualification & Serviceability Check.
  2. Speed Tier & Package Selection (Premier $65/mo, Ultra $95/mo, Gig $115/mo).
  3. Value-Add Addons (Wi-Fi router, Static IPs, Voice lines, Mobile lines).
  4. Review, Taxes/Fees Disclosure, and Scheduling Installation.
• **Preventing Order Fallout:**
  - Never guess suite/unit numbers or modify street spelling to force a buyflow match.

*Trainer Tip: Address errors in buyflow are the #1 cause of order cancellations and installer rollbacks.*`,
        suggested: ["What is Fiber On-Net vs Near-Net?", "Explain 4-step buyflow", "What is taught in Day 5?", "What are 2026 Internet Plans?"]
      },
      5: {
        title: "Day 5: Communication & Accent Neutralization",
        ref: "Day 5 — Communication & Accent",
        content: `**Day 5 — Communication & Accent Overview:**

Day 5 focuses on spoken English clarity, vocal control, active listening, and objection rebuttals:

• **Clarity Over Accent:**
  - Agents are not expected to sound artificially American; they must sound calm, clear, confident, and professional.
• **Pacing & Vocal Tone:**
  - Ideal conversational tempo is **130 to 150 words per minute**.
  - Avoiding rushing, mumbling, or monotone robotic delivery.
• **Active Listening & Empathy:**
  - Repeating key details back to the customer: *"I completely understand how important reliable internet is for your POS terminals during lunch rush..."*
• **Handling Difficult & Skeptical Customers:**
  - Staying calm under pressure, acknowledging frustrations without getting defensive, and redirecting with solution-focused language.
• **Trainer Mock Calls:**
  - One-on-one simulated calls with floor trainers focusing on greeting, pitch transitions, and handling sudden objections.

*Trainer Tip: Smiling while speaking naturally warms your vocal tone over telephone audio!*`,
        suggested: ["What is the ideal speaking pace?", "How to handle angry customers?", "What is taught in Day 6?", "Give a mock call example"]
      },
      6: {
        title: "Day 6: Floor Targets, Performance & Bundling Tests",
        ref: "Day 6 — Targets & Performance",
        content: `**Day 6 — Targets & Performance Overview:**

Day 6 bridges classroom theory to sales floor performance benchmarks and testing:

• **Key Performance Indicators (KPIs):**
  - **Daily Connected Talk Time:** Target hours spent actively conversing with business prospects.
  - **Dialer Velocity & Wrap-Up Time:** Maintaining focus between calls and keeping wrap-up times under standard thresholds.
  - **Conversion Metrics:** Percentage of qualified leads converted into verified orders.
• **Bundling Tests (Day 6 Core Milestone):**
  - **Test #1 (30 Questions):** Internet + TV Bundling, package matching, and product requirements.
  - **Test #2 (30 Questions):** Voice add-ons, Static IP calculations, and promotion verification.
• **Quality Assurance (QA) Scorecard:**
  - Mandatory disclosure compliance, accurate product descriptions, customer consent verification, and professional tone.
• **Zero-Tolerance Compliance Rules:**
  - Anti-slamming policy: Never add services the customer did not explicitly request.
  - Anti-rip-and-replace: Never cancel an existing account to re-order under another name to capture promotional rates.

*Trainer Tip: Passing both bundling tests on Day 6 is required before moving to live call shadowing.*`,
        suggested: ["What are Day 6 bundling tests?", "What is anti-slamming rule?", "What is taught in Day 7?", "Take Bundling Practice Test"]
      },
      7: {
        title: "Day 7: Live Call Observation (Shadowing)",
        ref: "Day 7 — Live Call Observation",
        content: `**Day 7 — Live Call Observation (Shadowing) Overview:**

Day 7 transitions trainees onto the live floor to observe senior agents in action:

• **Live Call Shadowing:**
  - Trainees sit with top-performing senior sales agents listening via split headsets.
  - Experiencing real customer dynamics, varying accents, and authentic business scenarios.
• **Real-Time Objection Handling:**
  - Hearing how veteran reps overcome common objections (*"I'm happy with AT&T"*, *"Send me an email"*, *"I'm in a contract"*).
• **CRM Navigation Under Pressure:**
  - Observing how top reps simultaneously navigate CRM screens, qualify addresses, and maintain engaging conversation.
• **Pitch Practice & Floor Debriefs:**
  - Debriefing after difficult calls with mentors to analyze why a pitch succeeded or where the customer hesitated.
• **Preparing for Certification:**
  - Refining personal pitches, timing, and order verification habits.

*Trainer Tip: Take notes on senior agents' transition phrases and closing techniques during shadowing.*`,
        suggested: ["What happens during floor shadowing?", "Common customer objections", "What is taught in Day 8?", "Tips for live call confidence"]
      },
      8: {
        title: "Day 8: Operations Tools & Final Assessment",
        ref: "Day 8 — Operation Tools & Final Assessment",
        content: `**Day 8 — Operations Tools & Final Assessment Overview:**

Day 8 is the final graduation milestone before trainees are certified to take live sales calls:

• **Operations & Lead Tools:**
  - **OneDrive & Shared Spreadsheets:** Daily tracker logging, documentation integrity, and lead handover.
  - **ERP & CRM Systems:** Order dispositioning (e.g. Sale Closed, Callback Scheduled, Not Serviceable, Follow-up Required).
• **Order Number & Tracking Discipline:**
  - Accurate recording of 10-digit order numbers, installation dates, and equipment shipping tracking.
• **Final Written Process Test:**
  - Comprehensive examination testing product knowledge, address validation, pricing calculations, and compliance rules.
• **Voice / Live Call Certification Test:**
  - A rigorous mock call with senior floor leadership simulating tough objections, buyflow qualification, and closing.
• **Graduation & Floor Clearance:**
  - Trainees who pass receive floor clearance, their CRM sales IDs, and officially begin live sales calling!

*Congratulations on reaching Day 8! You are fully prepared to succeed on the Vahlay sales floor.*`,
        suggested: ["What is on the Day 8 written test?", "How does the voice test work?", "Review 8-day roadmap", "Start Live Practice"]
      }
    };

    const specificDayInfo = dayData[requestedSpecificDay];
    if (specificDayInfo) {
      return {
        text: specificDayInfo.content,
        citations: [specificDayInfo.ref],
        suggestedQuestions: specificDayInfo.suggested,
        verification: {
          checkedAgainst: specificDayInfo.ref,
          status: "Curriculum Verified",
          day: `Day ${requestedSpecificDay}`
        }
      };
    }
  }

  if (!retrievedChunks || retrievedChunks.length === 0) {
    if (language === "hindi" || language === "hinglish") {
      return {
        text: `Maine aapke training notes check kiye, lekin is sawal ka specific record hamare Day 1–3 curriculum mein nahi mila. Please floor supervisor se confirm karein.\n\n*Kya aap Day 1 US Standards, Day 2 Internet & Bundling, ya Day 3 Sales Rules ke baare mein seekhna chahte hain?*`,
        citations: [],
        suggestedQuestions: [
          "Explain Day 1 Training",
          "What is PSU?",
          "What is ALC?",
          "Explain Bundling Rule"
        ],
        verification: {
          checkedAgainst: "Spectrum Training Curriculum",
          status: "Curriculum Checked",
          day: "General",
        }
      };
    }
    return {
      text: `I checked through your Day 1–3 training material, but this specific detail isn't confirmed in the provided notes. Make sure to double-check with your floor supervisor or lead trainer.\n\n*Would you like me to help you review Day 1 Address Standards, Day 2 Internet Bundles, or Day 3 Sales Rules?*`,
      citations: [],
      suggestedQuestions: [
        "What is Spectrum Business?",
        "Explain Spectrum Internet Packages",
        "What is ALC?",
        "Explain Bundling Rule"
      ],
      verification: {
        checkedAgainst: "Spectrum Training Curriculum",
        status: "Curriculum Checked",
        day: "General",
      }
    };
  }

  const citations = Array.from(new Set(retrievedChunks.map(c => c.sourceReference)));

  let responseText = "";
  let customFollowUps = null;

  // Helper for Telephone (TN) Line Pricing calculations
  const getTelephonePricingDetails = () => {
    let lineCount = null;
    const countMatch = qLower.match(/\b(\d+)\s*(?:tn|telephone|phone|line)/i);
    if (countMatch) {
      lineCount = parseInt(countMatch[1], 10);
    } else if (qLower.includes("1 tn") || qLower.includes("1tn") || qLower.includes("single tn") || qLower.includes("one tn")) {
      lineCount = 1;
    } else if (qLower.includes("2 tn") || qLower.includes("2tn") || qLower.includes("two tn")) {
      lineCount = 2;
    } else if (qLower.includes("3 tn") || qLower.includes("3tn") || qLower.includes("three tn")) {
      lineCount = 3;
    } else if (qLower.includes("4 tn") || qLower.includes("4tn") || qLower.includes("four tn") || qLower.includes("4th tn")) {
      lineCount = 4;
    } else if (qLower.includes("5 tn") || qLower.includes("5tn") || qLower.includes("five tn") || qLower.includes("5th tn")) {
      lineCount = 5;
    }

    let alcCost = null;
    let clearSaleCost = null;
    if (lineCount !== null && lineCount > 0) {
      clearSaleCost = lineCount * 20;
      // ALC: 1st TN = $50, then +$30 for each add-on TN ($50 + (N - 1) * $30)
      if (lineCount === 1) {
        alcCost = 50;
      } else {
        alcCost = 50 + (lineCount - 1) * 30;
      }
    }

    return { lineCount, alcCost, clearSaleCost };
  };

  const hasTnWord =
    /\b\d+\s*tn\b/i.test(qLower) ||
    /\btn\b/i.test(qLower) ||
    qLower.includes("telephone") ||
    qLower.includes("phone line") ||
    qLower.includes("phone lines");

  const isTelephonePricingQuery =
    (hasTnWord && (
      qLower.includes("price") ||
      qLower.includes("pricing") ||
      qLower.includes("cost") ||
      qLower.includes("rate") ||
      qLower.includes("how much") ||
      qLower.includes("kitna") ||
      qLower.includes("charge") ||
      qLower.includes("clear sale") ||
      qLower.includes("clear sales") ||
      qLower.includes("alc") ||
      qLower.includes("$20") ||
      qLower.includes("$50") ||
      qLower.includes("$80") ||
      qLower.includes("$90") ||
      qLower.includes("$30") ||
      qLower.includes("4th tn") ||
      qLower.includes("onward")
    )) ||
    (primary && primary.id === "telephone-pricing-clear-sales-vs-alc") ||
    (qLower.includes("telephone") && (qLower.includes("clear") || qLower.includes("alc")));

  const isShortFormsQuery =
    !isTelephonePricingQuery &&
    (qLower.includes("short form") ||
      qLower.includes("short forms") ||
      qLower.includes("floor jargon") ||
      qLower.includes("call center term") ||
      qLower.includes("call center short") ||
      qLower.includes("ck cx svcs") ||
      qLower.includes("ck cx") ||
      qLower.includes("cx svcs") ||
      (primary && primary.id === "floor-short-forms-jargon") ||
      (/\b(tn|cx|ck|svcs)\b/i.test(qLower) && (
        qLower.includes("what is") ||
        qLower.includes("what does") ||
        qLower.includes("meaning") ||
        qLower.includes("stand for") ||
        qLower.includes("stands for") ||
        qLower.includes("full form") ||
        qLower.includes("ka matlab") ||
        qLower.includes("kya hai") ||
        qLower.includes("kya hota") ||
        qLower.includes("matlab") ||
        qLower.includes("abbreviation") ||
        qLower.includes("abbreviations")
      )) ||
      qLower === "tn" || qLower === "cx" || qLower === "ck" || qLower === "svcs");

  const isAlcTwoAccountQuery =
    (qLower.includes("2 acc") ||
      qLower.includes("two acc") ||
      qLower.includes("2nd acc") ||
      qLower.includes("second acc") ||
      qLower.includes("2 account") ||
      qLower.includes("two account") ||
      qLower.includes("2-account") ||
      qLower.includes("1 acc") ||
      qLower.includes("one acc") ||
      qLower.includes("1 account") ||
      qLower.includes("one account") ||
      qLower.includes("1-account") ||
      qLower.includes("hierarchy") ||
      qLower.includes("master account") ||
      qLower.includes("control account") ||
      qLower.includes("second poc") ||
      qLower.includes("2nd poc") ||
      /\b(2|two)\s*(acc|account|accounts|a\/c)\b/i.test(qLower) ||
      /\b(1|one)\s*(acc|account|accounts|a\/c)\b/i.test(qLower)) &&
    (qLower.includes("alc") || qLower.includes("acc") || qLower.includes("setup") || qLower.includes("why") || qLower.includes("need") || qLower.includes("spectrum") || qLower.includes("rule") || qLower.includes("poc"));

  // -------------------------------------------------------------------------
  // 1. Hindi / Hinglish Human Trainer Responses
  // -------------------------------------------------------------------------
  if (language === "hindi" || language === "hinglish") {
    if (isTelephonePricingQuery) {
      const { lineCount, alcCost, clearSaleCost } = getTelephonePricingDetails();
      const isClearSaleOnly = (qLower.includes("clear sale") || qLower.includes("clear sales")) && !qLower.includes("alc");
      const isAlcOnly = qLower.includes("alc") && !qLower.includes("clear sale") && !qLower.includes("clear sales");

      if (lineCount !== null && lineCount > 0) {
        if (isClearSaleOnly) {
          responseText = `**Clear Sales Telephone (${lineCount} TN) Pricing:**
- **Line Count:** ${lineCount} Telephone Line(s)
- **Rate:** $20/month per line
- **Calculation:** ${lineCount} × $20 = **$${clearSaleCost} / month**

*(Compare: Existing customer / ALC rate for ${lineCount} TN is $${alcCost}/mo).*

*Training Reference: Day 3 — Telephone Pricing Structure.*`;
        } else if (isAlcOnly) {
          const ruleNote = lineCount > 1
            ? `(Rule: 1st TN = $50, aur har add-on line ke liye +$30: $50 + (${lineCount - 1} × $30) = $${alcCost})`
            : `(Base rate: 1st TN = $50)`;
          responseText = `**ALC (Existing Customer) Telephone (${lineCount} TN) Pricing:**
- **Line Count:** ${lineCount} Existing Telephone Line(s)
- **ALC Monthly Charge:** **$${alcCost} / month**
- **Applied Rule:** ${ruleNote}

*(Compare: Naye customer ke liye Clear Sales rate ${lineCount} × $20 = $${clearSaleCost}/mo hota hai).*

*Training Reference: Day 3 — Telephone Pricing Structure.*`;
        } else {
          const alcRuleNote = lineCount > 1 ? `$50 + (${lineCount - 1} × $30) = $${alcCost}/mo` : `$50/mo`;
          responseText = `**${lineCount} Telephone Lines (${lineCount} TN) Pricing Comparison:**

1. **Clear Sales (New Customers):**
   - **$${clearSaleCost} / month** (${lineCount} × $20/line)

2. **ALC (Already Customer / Existing):**
   - **$${alcCost} / month** [${alcRuleNote}]

*Pricing Rules Summary:*
- Clear Sales: $20 / line
- ALC: 1st TN = $50, har add-on TN = +$30 (2 TN = $80, 3 TN = $110, 4 TN = $140, 5 TN = $170)

*Training Reference: Day 3 — Telephone Pricing Structure.*`;
        }
        customFollowUps = ["Calculate another line count", "What is ALC 2-account setup?", "What is Clear Sale?"];
      } else if (isClearSaleOnly) {
        responseText = `**Clear Sales Telephone Pricing:**
- **Rate:** **$20 / month** per telephone line (TN)
- **Formula:** \`Total = Number of Lines × $20\`

**Examples:**
- 1 Phone Line (1 TN): **$20/mo**
- 2 Phone Lines (2 TN): **$40/mo**
- 3 Phone Lines (3 TN): **$60/mo**
- 4 Phone Lines (4 TN): **$80/mo**

*(Note: ALC existing customers pay $50 for 1st TN, aur har add-on line par +$30: 2 TN = $80, 3 TN = $110, 4 TN = $140).*

*Training Reference: Day 3 — Telephone Pricing Structure.*`;
        customFollowUps = ["What is ALC telephone pricing?", "Calculate 4 TN in ALC", "What is Clear Sale?"];
      } else {
        responseText = `**Official Telephone (TN) Line Pricing Rules:**

1. **Clear Sales (New Customers / Switchers):**
   - **$20 / month** per telephone line.
   - Formula: \`Total = Lines × $20\` (1 TN = $20, 2 TN = $40, 3 TN = $60, 4 TN = $80).

2. **ALC (Already Customer / Existing Customer):**
   - **1st TN (existing line):** **$50 / month**
   - **Each Add-On TN:** Har additional line ke liye **+$30 / month**:
     - 1 TN = **$50 / month**
     - 2 TN = $50 + $30 = **$80 / month**
     - 3 TN = $50 + (2 × $30) = **$110 / month**
     - 4 TN = $50 + (3 × $30) = **$140 / month**
     - 5 TN = $50 + (4 × $30) = **$170 / month**
     - Formula ($N \\ge 1$): \`Total = $50 + (N - 1) × $30 / month\`

*Training Reference: Day 3 — Telephone Pricing Structure.*`;
        customFollowUps = ["Calculate 1 TN in ALC", "Calculate 2 TN in ALC", "Calculate 4 TN in ALC", "Clear Sales telephone pricing"];
      }
    } else if (isShortFormsQuery) {
      const isSpecificCx = /\bcx\b/i.test(qLower) && !qLower.includes("tn") && !qLower.includes("ck") && !qLower.includes("svcs");
      const isSpecificCk = /\bck\b/i.test(qLower) && !qLower.includes("tn") && !qLower.includes("cx") && !qLower.includes("svcs");
      const isSpecificSvcs = /\bsvcs\b/i.test(qLower) && !qLower.includes("tn") && !qLower.includes("cx") && !qLower.includes("ck");
      const isSpecificTn = /\btn\b/i.test(qLower) && !qLower.includes("cx") && !qLower.includes("ck") && !qLower.includes("svcs");

      if (isSpecificCx) {
        responseText = `**CX Short Form:**
- **Full Form:** **Customer** (Client / Caller / Subscriber)
- **Floor Meaning:** Jisse agent call par baat kar raha hota hai.
- *Example:* "CX wants to upgrade their internet speed."

*Training Reference: Floor Standards — Common Short Forms.*`;
        customFollowUps = ["What is TN?", "What is CK?", "What is SVCS?", "What does CK CX SVCS mean?"];
      } else if (isSpecificCk) {
        responseText = `**CK Short Form:**
- **Full Form:** **Check** (Verify / Inspect)
- **Floor Meaning:** CRM billing system ya coverage portal mein address aur services verify karna.
- *Example:* "CK address in CRM to qualify On-Net facility."

*Training Reference: Floor Standards — Common Short Forms.*`;
        customFollowUps = ["What is CX?", "What is TN?", "What is SVCS?", "What does CK CX SVCS mean?"];
      } else if (isSpecificSvcs) {
        responseText = `**SVCS Short Form:**
- **Full Form:** **Services**
- **Floor Meaning:** Customer ke active ya ordered telecom products (Internet, Telephone/Voice, Television, Mobile).
- *Example:* "CK CX SVCS to see all active products."

*Training Reference: Floor Standards — Common Short Forms.*`;
        customFollowUps = ["What is CX?", "What is TN?", "What is CK?", "What does CK CX SVCS mean?"];
      } else if (isSpecificTn) {
        responseText = `**TN Short Form:**
- **Full Form:** **Telephone** (Telephone Line / Telephone Number)
- **Floor Meaning:** Business phone line.
- **Pricing Snapshot:**
  • **Clear Sales:** **$20/month** per line
  • **ALC (Existing):** 1st TN = **$50/mo**, Har add-on TN = **+$30/mo** (2 TN = $80, 3 TN = $110, 4 TN = $140, 5 TN = $170)
*(Note: US postal codes mein TN Tennessee state ko bhi represent karta hai).*

*Training Reference: Floor Standards — Common Short Forms & Pricing.*`;
        customFollowUps = ["What is Clear Sales telephone pricing?", "What is ALC telephone pricing?", "What is CX?", "What does CK CX SVCS mean?"];
      } else {
        responseText = `**Essential Call Center Floor Short Forms:**

• **TN**: **Telephone** (Telephone Number / Phone Line)
• **CX**: **Customer** (Caller, Subscriber, Client)
• **CK**: **Check** (Verify address, inspect CRM account)
• **SVCS**: **Services** (Internet, Telephone, TV, Mobile)

**Common Floor Example:**
- *"CK CX SVCS"*: Customer ki active services CRM billing system mein check karna.

---

**Telephone (TN) Pricing Rules:**
1. **Clear Sales (New Customers):**
   - **$20 / month** per telephone line.
2. **ALC (Already Customer / Existing):**
   - **1st TN (existing):** **$50 / month**
   - **Each Add-On TN:** Har additional line ke liye **+$30 / month**:
     - 1 TN = **$50/mo**
     - 2 TN = $50 + $30 = **$80/mo**
     - 3 TN = $50 + (2 × $30) = **$110/mo**
     - 4 TN = $50 + (3 × $30) = **$140/mo**
     - 5 TN = $50 + (4 × $30) = **$170/mo**

*Training Reference: Floor Standards & Day 3 Pricing Structure.*`;
        customFollowUps = ["Explain Clear Sales telephone pricing", "Explain ALC telephone pricing", "Calculate 4 TN in ALC", "What is PSU?"];
      }
    } else {
      const isGigHindi = (qLower.includes("gig") || qLower.includes("1000")) && !qLower.includes("ultra") && !qLower.includes("premier");
      const isUltraHindi = (qLower.includes("ultra") || qLower.includes("750")) && !qLower.includes("gig") && !qLower.includes("premier");
      const isPremierHindi = (qLower.includes("premier") || qLower.includes("500")) && !qLower.includes("gig") && !qLower.includes("ultra");

      if (isGigHindi) {
        responseText = `**Spectrum Gig Internet Pricing:**
- **Monthly Rate:** **$100/month** (training reference rate)
- **Speed:** 1,000 Mbps (1 Gbps) download / 50 Mbps upload
- **Router:** Included hai ($0 extra charge)
- **Modem:** Free provide hota hai

*Training Reference: Day 2 — Spectrum Packages.*

*Kya aap isko detail mein samjhna chahte hain ya doosre plans ka price check karein?*`;
        customFollowUps = ["Explain in more detail", "What is Ultra pricing?", "What is Premier pricing?"];

      } else if (isUltraHindi) {
        responseText = `**Spectrum Ultra Internet Pricing:**
- **Base Rate:** **$80/month**
- **Wi-Fi Router:** **$10/month** (optional)
- **Total:** **$90/month** (router ke sath)
- **Speed:** 750 Mbps download / 35 Mbps upload

*Training Reference: Day 2 — Spectrum Packages.*

*Kya aap isko detail mein samjhna chahte hain ya Gig ka price check karein?*`;
        customFollowUps = ["Explain in more detail", "What is Gig pricing?", "What is Premier pricing?"];

      } else if (isPremierHindi) {
        responseText = `**Spectrum Premier Internet Pricing:**
- **Base Rate:** **$50/month**
- **Wi-Fi Router:** **$10/month** (optional)
- **Total:** **$60/month** (router ke sath)
- **Speed:** 500 Mbps download / 20 Mbps upload

*Training Reference: Day 2 — Spectrum Packages.*

*Kya aap isko detail mein samjhna chahte hain ya Ultra/Gig ka price check karein?*`;
        customFollowUps = ["Explain in more detail", "What is Ultra pricing?", "What is Gig pricing?"];

      } else if (
        qLower.includes("internet type") ||
        qLower.includes("connection type") ||
        qLower.includes("high speed") ||
        qLower.includes("fastest") ||
        qLower.includes("fiber") ||
        (qLower.includes("speed") && (qLower.includes("kiska") || qLower.includes("kaun") || qLower.includes("jyada")))
      ) {
        responseText = `**Fiber Internet** sabse fast aur stable internet connection type hota hai.

### Quick Breakdown (Day 2 Training):
- **1. Fiber Internet (Sabse Fast):** Glass cables ke through light signals use karta hai. Speeds: **500 Mbps, 1 Gbps, 2 Gbps+** (symmetrical upload aur download).
- **2. Cable Internet (Coaxial):** Copper cables use karta hai; standard SMB businesses ke liye best hai. Speeds: **500 Mbps se 1 Gbps**.
- **3. Wireless Internet:** Cellular towers use karta hai; rural areas ke liye jahan physical cables available nahi hain.

*Kya aap Fiber aur Coax ka farq detail mein samjhna chahte hain?*`;
        customFollowUps = ["Explain in more detail", "Give a practice example", "What is High Split Coax (HSC)?"];

      } else if (
        qLower.includes("installation") ||
        qLower.includes("install process") ||
        qLower.includes("technician")
      ) {
        responseText = `**Installation Process (Day 2 Training — Section 3.3):**

**Installation ka matlab:** Field technician customer ki location par ja kar modem/router set up karta hai, internet/phone activate karta hai, aur speed test karta hai.

### 5-Step Installation Flow:
1. **Order submitted** (portal mein order enter hota hai)
2. **Address verified** (exact street aur suite number confirm hota hai)
3. **Technician assigned & Appointment scheduled** (time slot book hota hai)
4. **Technician installs service** (hardware wiring aur connection test)
5. **Customer confirms completion** (owner sign-off karta hai)

**Aapka Role (Agent):** Sahi address lena, sahi appointment time schedule karna, aur completion tak follow up karna.

*Kya aap isko detail mein samjhna chahte hain?*`;
        customFollowUps = ["Explain in more detail", "What is number porting?", "What is truck roll failure?"];

      } else if (isAlcTwoAccountQuery) {
        if (wantsDetail) {
          responseText = `**ALC mein 2 Accounts Kyun Chahiye Hote Hain (Detailed Trainer Guide):**

### 1. Asli Problem:
- Customer already Spectrum user hai (**ALC**) jiska 2-year promotional discount expire ho chuka hai.
- Unka monthly bill badhkar **$170+/month** ho gaya hai (internet + phone ke liye).
- **Sabse Badi Majboori:** Business apna **purana business phone number kisi bhi haal mein lose nahi kar sakta**, kyunki unke sabhi regular clients, suppliers aur Google listing par wahi number registered hai.

### 2. 2-Account Setup Kaise Kaam Karta Hai:
1. **Old Account (Phone Number Bachane Ke Liye):**
   - Purana account active rakha jata hai taaki business ka phone number safe rahe.
   - Retention department internet speed ko minimize karke bill ko retention rake rate (**~$50/month**) par le aata hai.
2. **New Account (Nayi Internet Promotions Ke Liye):**
   - Ek naye **Second POC** (Point of Contact — partner/manager ka naam, alag email, alag cell) ke naam par banaya jata hai.
   - Isse naye customer wali promotional pricing (**$80/month** 500 Mbps bundle) aur new equipment mil jata hai (technician fee waive karwake).
3. **Hierarchy Account (3 Months Baad Merge):**
   - Customer 3 mahine tak dono bills pay karta hai (~$50 old + ~$80 new = ~$130/month).
   - **3 months baad**, dono accounts ek **Hierarchy / Master Account** mein merge kar diye jate hain. Single consolidated bill (~$130/mo vs $170+ original) ban jata hai.

### 3. Golden Rule (2-Account vs 1-Account):
- **2-Account Setup:** Tab use hota hai jab customer ko apna **landline phone number retain/keep karna zaroori ho**.
- **1-Account Setup:** Tab use hota hai jab customer ke paas **sirf internet / internet + TV ho, ya use phone number rakhne ki zaroorat na ho** (naya account banakar purane ko 3/6/9 months ke seasonal hold par daala jata hai).

*Training Reference: Day 3 — ALC Account Structures & Retention Strategy.*`;
        } else {
          responseText = `**ALC mein 2 Accounts Kyun Chahiye (Quick Summary):**
- **Business Phone Number Protect Karna:** Customer apna purana landline number kho nahi sakta kyunki clients aur market mein wahi number chalta hai.
- **Old Account (~$50/mo):** Phone lines ko retain karne ke liye active rakha jata hai retention discount par.
- **New Account (~$80/mo):** **Second POC** (alag details) ke naam par naya high-speed internet promotional price par lene ke liye open hota hai.
- **Hierarchy Account (3 Months Baad):** 3 mahine baad dono accounts ek master bill mein merge ho jate hain (~$130/mo bill ho jata hai $170+ ke muqable).

*Trainer Rule: Agar customer ko telephone number nahi rakhna hai, toh 1-Account setup use hota hai.*

*Kya aap Second POC ya 1-Account setup ke baare mein detail mein jaanna chahte hain?*`;
        }
        customFollowUps = [
          "Explain in more detail",
          "What is Second POC?",
          "What is 1-Account Setup?",
          "What is a Hierarchy Account?"
        ];

      } else if (primary.title.toLowerCase().includes("alc") || qLower.includes("alc")) {
        if (wantsDetail) {
          responseText = `Chalo **ALC aur Clear Sale** ka detailed farq samajhte hain:

1. **ALC (Already Customer):**
   - Yeh wo customer hota hai jo already Spectrum ki services use kar raha hai.
   - Yeh speed upgrade, new telephone line, ya billing inquiry ke liye call kar sakta hai.
2. **Clear Sale:**
   - Yeh wo customer hota hai jiske paas currently koi active Spectrum service nahi hai (naya business ya competitor se switch).

**Trainer Compliance Tip:**
Existing account ko cancel karke fake naya account create karna (**rip-and-replace**) strictly prohibited hai!

*Training Reference: Day 3 — Sales Terminology & Ethics.*`;
        } else {
          responseText = `**ALC vs. Clear Sale (Quick Summary):**
- **ALC (Already Customer):** Current customer jo already Spectrum services use kar raha hai (upgrade/expansion).
- **Clear Sale:** Naya customer jiske paas currently active Spectrum service nahi hai.

*Trainer Tip: Account cancel karke naya sale dikhana ("rip-and-replace") strictly prohibited hai.*

*Kya aap isko detail mein samjhna chahte hain ya koi call scenario practice karein?*`;
        }
      } else if (primary.title.toLowerCase().includes("psu") || qLower.includes("psu") || qLower.includes("bundl")) {
        if (wantsDetail) {
          responseText = `**PSU aur Bundling Rule (Detailed Breakdown):**

### PSU (Primary Service Unit):
- **Internet** = 1 PSU
- **Telephone (VoIP)** = 1 PSU
- **Television** = 1 PSU
- **Mobile** = 1 PSU

### Bundling Rule:
Bundle banane ke liye kam se kam **2 alag-alag service categories** leni hoti hain (jaise Internet + Phone).
- Agar customer **3 telephone lines** purchase karta hai, to wo sirf **1 PSU** count hota hai (bundle nahi banta).

*Training Reference: Day 2 — Spectrum Packages & Bundling.*`;
        } else {
          responseText = `**PSU aur Bundling (Quick Summary):**
- **PSU (Primary Service Unit):** Ek service category (Internet = 1, Phone = 1, TV = 1, Mobile = 1).
- **Bundling Rule:** Bundle ke liye kam se kam **2 alag-alag categories** leni hoti hain (e.g., Internet + Phone).
- *Dhyan rakhein:* 3 phone lines bhi sirf **1 PSU** count hota hai, bundle nahi!

*Kya aap isko detail mein samjhna chahte hain ya koi billing calculation try karein?*`;
        }
      } else {
        const cleanAnswer = primary.content.replace(/\*\(Day[^\)]+\)\*/gi, "").trim();
        responseText = `${cleanAnswer}

*Kya aap is topic ko detail mein samjhna chahte hain ya koi example chahiye?*`;
      }
    }
  } else {
    // -------------------------------------------------------------------------
    // 2. English Human Trainer Responses (Short & Broken Down by Default)
    // -------------------------------------------------------------------------
    const isPricingQuery =
      qLower.includes("price") ||
      qLower.includes("cost") ||
      qLower.includes("how much") ||
      qLower.includes("calculation") ||
      qLower.includes("rate") ||
      qLower.includes("fee") ||
      qLower.includes("charge");

    const isGigSpecific =
      (qLower.includes("gig") || qLower.includes("1000") || qLower.includes("1 gb")) &&
      !qLower.includes("ultra") &&
      !qLower.includes("premier") &&
      !qLower.includes("all plan") &&
      !qLower.includes("all package") &&
      !qLower.includes("compare");

    const isUltraSpecific =
      (qLower.includes("ultra") || qLower.includes("750")) &&
      !qLower.includes("gig") &&
      !qLower.includes("premier") &&
      !qLower.includes("all plan") &&
      !qLower.includes("all package") &&
      !qLower.includes("compare");

    const isPremierBundleCalc =
      qLower.includes("premier") &&
      (qLower.includes("phone") || qLower.includes("bundle") || qLower.includes("calculation") || qLower.includes("total"));

    const isPremierSpecific =
      (qLower.includes("premier") || qLower.includes("500")) &&
      !isPremierBundleCalc &&
      !qLower.includes("gig") &&
      !qLower.includes("ultra") &&
      !qLower.includes("all plan") &&
      !qLower.includes("all package") &&
      !qLower.includes("compare");

    const isRouterSpecific =
      (qLower.includes("router") || qLower.includes("wifi") || qLower.includes("wi-fi")) &&
      (isPricingQuery || qLower.includes("fee") || qLower.includes("charge")) &&
      !qLower.includes("modem") &&
      !qLower.includes("gig") &&
      !qLower.includes("ultra") &&
      !qLower.includes("premier");

    const isVoiceSpecific =
      (qLower.includes("phone") || qLower.includes("voice") || qLower.includes("telephone") || qLower.includes("voip")) &&
      (isPricingQuery || qLower.includes("line")) &&
      !qLower.includes("premier") &&
      !qLower.includes("bundl");

    const isInternetTypeQuery =
      (qLower.includes("internet type") ||
        qLower.includes("connection type") ||
        qLower.includes("type of internet") ||
        qLower.includes("types of internet") ||
        (qLower.includes("high") && qLower.includes("speed")) ||
        (qLower.includes("fastest") && (qLower.includes("internet") || qLower.includes("type") || qLower.includes("connection"))) ||
        (qLower.includes("fiber") && (qLower.includes("cable") || qLower.includes("coax") || qLower.includes("speed") || qLower.includes("compare")))) &&
      !isPricingQuery && !isGigSpecific && !isUltraSpecific && !isPremierSpecific;

    const isPriceGuaranteeQuery =
      qLower.includes("price guarantee") ||
      qLower.includes("price lock") ||
      qLower.includes("contract buyout") ||
      (qLower.includes("guarantee") && (qLower.includes("year") || qLower.includes("1 yr") || qLower.includes("2 yr") || qLower.includes("3 yr")));

    const isWibQuery =
      qLower.includes("wib") ||
      qLower.includes("wireless internet backup") ||
      qLower.includes("cellular backup") ||
      (qLower.includes("backup") && qLower.includes("internet"));

    const isBuyflowQuery =
      qLower.includes("buyflow") ||
      qLower.includes("service qualification") ||
      qLower.includes("on-net") ||
      qLower.includes("near-net") ||
      qLower.includes("high-split") ||
      qLower.includes("hsc");

    const isVoiceFeaturesQuery =
      qLower.includes("auto attendant") ||
      qLower.includes("hunt group") ||
      qLower.includes("voice feature") ||
      qLower.includes("phone feature");

    const isInstallationQuery =
      qLower.includes("installation process") ||
      qLower.includes("install process") ||
      qLower.includes("installation flow") ||
      qLower.includes("install flow") ||
      (qLower.includes("installation") && (qLower.includes("step") || qLower.includes("mean") || qLower.includes("what") || qLower.includes("role") || qLower.includes("how"))) ||
      (qLower.trim() === "installation") ||
      (qLower.trim() === "installation process");

    const isPortingQuery =
      qLower.includes("porting") ||
      qLower.includes("port number") ||
      qLower.includes("number port") ||
      qLower.includes("transfer number") ||
      qLower.includes("keep number") ||
      (qLower.includes("phone number") && qLower.includes("keep"));

    const isSalesFlowQuery =
      qLower.includes("sales flow") ||
      qLower.includes("call flow") ||
      qLower.includes("sales mistake") ||
      qLower.includes("steps in sales");

    const isDay4Query =
      qLower.includes("day 4") ||
      qLower.includes("day4") ||
      qLower.includes("buyflow") ||
      qLower.includes("service qualification") ||
      qLower.includes("address qualification") ||
      qLower.includes("on-net") ||
      qLower.includes("near-net") ||
      qLower.includes("high split") ||
      qLower.includes("high-split") ||
      (qLower.includes("2026") && (qLower.includes("plan") || qLower.includes("internet") || qLower.includes("rate")));

    const isDay5Query =
      qLower.includes("day 5") ||
      qLower.includes("day5") ||
      qLower.includes("accent") ||
      (qLower.includes("communication") && !qLower.includes("voip")) ||
      qLower.includes("130-150") ||
      qLower.includes("wpm");

    const isDay6Query =
      qLower.includes("day 6") ||
      qLower.includes("day6") ||
      (qLower.includes("target") && !qLower.includes("plan")) ||
      qLower.includes("bundling test") ||
      qLower.includes("slamming");

    const isDay7Query =
      qLower.includes("day 7") ||
      qLower.includes("day7") ||
      qLower.includes("live call") ||
      qLower.includes("shadowing");

    const isDay8Query =
      qLower.includes("day 8") ||
      qLower.includes("day8") ||
      qLower.includes("onedrive") ||
      qLower.includes("final assessment") ||
      qLower.includes("operation tool");

    // A00. Telephone Line Pricing (Clear Sales vs ALC) & Short Forms
    if (isTelephonePricingQuery) {
      const { lineCount, alcCost, clearSaleCost } = getTelephonePricingDetails();
      const isClearSaleOnly = (qLower.includes("clear sale") || qLower.includes("clear sales")) && !qLower.includes("alc");
      const isAlcOnly = qLower.includes("alc") && !qLower.includes("clear sale") && !qLower.includes("clear sales");

      if (lineCount !== null && lineCount > 0) {
        if (isClearSaleOnly) {
          responseText = `**Clear Sales Telephone (${lineCount} TN) Pricing:**
- **Number of Lines:** ${lineCount} Telephone Line(s)
- **Monthly Rate:** **$20/month** per line
- **Calculation:** ${lineCount} × $20 = **$${clearSaleCost} / month**

*(Comparison: For an existing customer / ALC, ${lineCount} TN is $${alcCost}/month).*

*Training Reference: Day 3 — Telephone Pricing Structure.*

*Would you like me to explain ALC telephone pricing or calculate a bundle?*`;
        } else if (isAlcOnly) {
          const ruleNote = lineCount > 1
            ? `(Rule: 1st TN = $50, then +$30 for each add-on line: $50 + (${lineCount - 1} × $30) = $${alcCost})`
            : `(Base rate: 1st TN = $50)`;
          responseText = `**ALC (Existing Customer) Telephone (${lineCount} TN) Pricing:**
- **Existing Lines:** ${lineCount} Telephone Line(s)
- **ALC Monthly Charge:** **$${alcCost} / month**
- **Applied Pricing Rule:** ${ruleNote}

*(Comparison: For a brand-new Clear Sale customer, ${lineCount} lines would be ${lineCount} × $20 = $${clearSaleCost}/mo).*

*Training Reference: Day 3 — Telephone Pricing Structure.*

*Would you like me to explain how this fits into an ALC 2-account setup?*`;
        } else {
          const alcRuleNote = lineCount > 1 ? `$50 + (${lineCount - 1} × $30) = $${alcCost}/mo` : `$${alcCost}/mo`;
          responseText = `**${lineCount} Telephone Lines (${lineCount} TN) Pricing Comparison:**

1. **Clear Sales (New Customers / Switchers):**
   - **$${clearSaleCost} / month** (${lineCount} × $20/line)

2. **ALC (Already Customer / Existing Customer):**
   - **$${alcCost} / month** [${alcRuleNote}]

*Pricing Rules Summary:*
- **Clear Sales:** Flat $20 / line
- **ALC:** 1st TN = $50, each add-on TN = +$30 (2 TN = $80, 3 TN = $110, 4 TN = $140, 5 TN = $170)

*Training Reference: Day 3 — Telephone Pricing Structure.*

*Would you like me to explain any other line count or ALC account setup?*`;
        }
        customFollowUps = ["Calculate another line count", "What is ALC 2-account setup?", "What is Clear Sale?"];
      } else if (isClearSaleOnly) {
        responseText = `**Clear Sales Telephone Pricing:**
- **Monthly Rate:** **$20 / month** per telephone line (TN)
- **Calculation Formula:** \`Total = Number of Lines × $20\`

**Itemized Line Examples:**
- 1 Line (1 TN): **$20 / month**
- 2 Lines (2 TN): **$40 / month**
- 3 Lines (3 TN): **$60 / month**
- 4 Lines (4 TN): **$80 / month**

*(Comparison: ALC existing customers pay $50 for 1st TN, and +$30 for each add-on line: 2 TN = $80, 3 TN = $110, 4 TN = $140).*

*Training Reference: Day 3 — Telephone Pricing Structure.*

*Would you like me to explain ALC telephone pricing or calculate a custom bundle?*`;
        customFollowUps = ["What is ALC telephone pricing?", "Calculate 4 TN in ALC", "What is Clear Sale?"];
      } else {
        responseText = `**Official Telephone (TN) Line Pricing Rules:**

1. **Clear Sales (New Customers / Switchers):**
   - **$20 / month** per telephone line.
   - Formula: \`Total = Lines × $20\` (1 TN = $20, 2 TN = $40, 3 TN = $60, 4 TN = $80).

2. **ALC (Already Customer / Existing Customer):**
   - **1st TN (existing line):** **$50 / month**
   - **Each Add-On TN:** Add **$30 / month** for each additional telephone line:
     - 1 TN = **$50 / month**
     - 2 TN = $50 + $30 = **$80 / month**
     - 3 TN = $50 + (2 × $30) = **$110 / month**
     - 4 TN = $50 + (3 × $30) = **$140 / month**
     - 5 TN = $50 + (4 × $30) = **$170 / month**
     - Formula ($N \\ge 1$): \`Total = $50 + (N - 1) × $30 / month\`

*Training Reference: Day 3 — Telephone Pricing Structure.*

*Would you like me to calculate pricing for a specific number of phone lines?*`;
        customFollowUps = ["Calculate 1 TN in ALC", "Calculate 2 TN in ALC", "Calculate 4 TN in ALC", "Clear Sales telephone pricing"];
      }
    } else if (isShortFormsQuery) {
      const isSpecificCx = /\bcx\b/i.test(qLower) && !qLower.includes("tn") && !qLower.includes("ck") && !qLower.includes("svcs");
      const isSpecificCk = /\bck\b/i.test(qLower) && !qLower.includes("tn") && !qLower.includes("cx") && !qLower.includes("svcs");
      const isSpecificSvcs = /\bsvcs\b/i.test(qLower) && !qLower.includes("tn") && !qLower.includes("cx") && !qLower.includes("ck");
      const isSpecificTn = /\btn\b/i.test(qLower) && !qLower.includes("cx") && !qLower.includes("ck") && !qLower.includes("svcs");

      if (isSpecificCx) {
        responseText = `**CX (Call Center Short Form):**
- **Definition:** **Customer** (Subscriber / Client / Caller)
- **Floor Usage:** Refers to the customer you are speaking with or managing on the account.
- *Example:* "Verify if CX is authorized as the primary POC before ordering services."

*Training Reference: Floor Standards — Common Short Forms.*

*Would you like me to explain TN, CK, SVCS, or what 'CK CX SVCS' means?*`;
        customFollowUps = ["What is TN?", "What is CK?", "What is SVCS?", "What does CK CX SVCS mean?"];
      } else if (isSpecificCk) {
        responseText = `**CK (Call Center Short Form):**
- **Definition:** **Check** (Verify / Inspect / Qualify)
- **Floor Usage:** Used when checking account status, service availability, or customer address qualification in CRM.
- *Example:* "CK address in CRM to confirm On-Net vs Near-Net facility."

*Training Reference: Floor Standards — Common Short Forms.*

*Would you like me to explain CX, TN, SVCS, or what 'CK CX SVCS' means?*`;
        customFollowUps = ["What is CX?", "What is TN?", "What is SVCS?", "What does CK CX SVCS mean?"];
      } else if (isSpecificSvcs) {
        responseText = `**SVCS (Call Center Short Form):**
- **Definition:** **Services**
- **Floor Usage:** The active or ordered telecom product lines (Internet, Voice/Telephone, Television, Mobile).
- *Example:* "CK CX SVCS to view current packages and billing lines."

*Training Reference: Floor Standards — Common Short Forms.*

*Would you like me to explain CX, TN, CK, or what 'CK CX SVCS' means?*`;
        customFollowUps = ["What is CX?", "What is TN?", "What is CK?", "What does CK CX SVCS mean?"];
      } else if (isSpecificTn) {
        responseText = `**TN (Call Center Short Form):**
- **Definition:** **Telephone** (Telephone Line / Telephone Number)
- **Floor Usage:** Refers to business phone lines and numbers.
- **Pricing Snapshot:**
  • **Clear Sales:** **$20/month** per line
  • **ALC (Existing Customers):** 1st TN = **$50/mo**, Each add-on TN = **+$30/mo** (2 TN = $80, 3 TN = $110, 4 TN = $140, 5 TN = $170)

*(Note: In US Postal state abbreviations, TN also represents Tennessee).*

*Training Reference: Floor Standards — Common Short Forms & Pricing.*

*Would you like me to calculate telephone pricing for a specific number of lines?*`;
        customFollowUps = ["Clear Sales telephone pricing", "ALC telephone pricing", "What is CX?", "What does CK CX SVCS mean?"];
      } else {
        responseText = `**Essential Call Center Floor Short Forms:**

• **TN**: **Telephone** (Telephone Number / Phone Line)
• **CX**: **Customer** (Caller, Subscriber, Client)
• **CK**: **Check** (Verify address, inspect CRM account)
• **SVCS**: **Services** (Internet, Telephone, TV, Mobile)

**Common Floor Example:**
- *"CK CX SVCS"*: Check customer services in the CRM billing system.

---

**Telephone (TN) Pricing Rules:**
1. **Clear Sales (New Customers):**
   - **$20 / month** per telephone line.
2. **ALC (Already Customer / Existing Customer):**
   - **1st TN (existing line):** **$50 / month**
   - **Each Add-On TN:** Add **$30 / month** for each additional line (2 TN = $80, 3 TN = $110, 4 TN = $140, 5 TN = $170).

*Training Reference: Floor Standards & Day 3 Pricing Structure.*

*Would you like me to calculate telephone pricing for a specific number of lines?*`;
        customFollowUps = ["Clear Sales telephone pricing", "ALC telephone pricing", "Calculate 4 TN in ALC", "What is PSU?"];
      }
      // A000. Day 4: Buyflow & 2026 Speed Plans
    } else if (isDay4Query) {
      responseText = `**Day 4: Buyflow & Service Qualification (2026 Program):**

### 1. Fundamental Rule:
*"Sell what is available, not what sounds good. Check first, quote second."* Precision address qualification in the portal is mandatory before quoting any speeds or pricing.

### 2. Spectrum Business 2026 Plans (Contract-Free):
- **Premier (500 Mbps):** from **$65/mo** — Best for Small Retail / Shops (1–5 devices, POS terminals, email).
- **Ultra (750 Mbps):** from **$95/mo** *(Most Popular)* — Best for Restaurants / Clinics (5–15 devices, guest Wi-Fi, 4–8 HD cloud CCTV).
- **Gig (1 Gbps):** from **$115/mo** — Best for Offices / Tech Firms (20+ users, heavy cloud backups, multi-line VoIP).

### 3. Network Facilities Qualified:
- **Fiber On-Net:** Building is directly connected to the fiber backbone for instant gigabit deployment.
- **Fiber Near-Net:** Fiber runs nearby in the street; requires a site survey and lateral construction.
- **High-Split Coax (HSC):** Upgraded coaxial frequency providing higher/symmetric upload bandwidth.
- **Standard Cable:** Traditional coax DOCSIS network with high download speeds.

### 4. 4-Step Buyflow:
1. **Address Qualification** ➔ 2. **Plan & Bundle Selection** ➔ 3. **Hardware & Static IPs** ➔ 4. **Scheduling & Review**.

*Training Reference: Day 4 — Buyflow & Service Qualification.*

*Would you like me to explain any specific step or facility type in more detail?*`;
      customFollowUps = ["Explain 2026 Plans", "What is Fiber On-Net vs Near-Net?", "Explain 4-Step Buyflow"];

      // A001. Day 5: Communication & Accent
    } else if (isDay5Query) {
      responseText = `**Day 5: Communication & Accent Mastery:**
1. **Clarity over Accent:** You don't need an artificial American accent. Focus on speaking clearly, calmly, and professionally.
2. **Pacing:** Maintain a steady **130–150 words per minute (WPM)** tempo.
3. **Smiling Tone:** Smiling while speaking naturally warms your vocal cords and builds trust.
4. **Active Listening:** Validate customer concerns before jumping into package solutions.

*Training Reference: Day 5 — Communication & Accent.*

*Would you like me to explain pacing or practice a mock call scenario?*`;
      customFollowUps = ["Explain WPM pacing", "Handling difficult customers", "Mock call practice"];

      // A002. Day 6: Targets & QA Ethics
    } else if (isDay6Query) {
      responseText = `**Day 6: Targets, Performance & QA Compliance:**
1. **Daily Benchmarks:** Maintain consistent dialer activity, talk-time targets, and Double/Triple Play bundling rates.
2. **Bundling Tests:** Trainees practice 30-question Bundling Test #1 and #2.
3. **Zero Tolerance:** **Slamming** (adding unauthorized lines) and **rip-and-replace** (faking new accounts) lead to immediate termination.

*Training Reference: Day 6 — Targets & Performance.*

*Would you like me to explain slamming or bundling test questions?*`;
      customFollowUps = ["What is slamming?", "Explain Internet + TV bundling test", "What is talk time target?"];

      // A003. Day 7: Live Call Observation
    } else if (isDay7Query) {
      responseText = `**Day 7: Live Call Observation & Shadowing:**
1. **Floor Shadowing:** Listen to senior sales agents handling actual Spectrum Business inbound and outbound calls.
2. **Call Control:** Steer the conversation calmly without interrupting busy business owners.
3. **30-Second Value Hook:** Respect the owner's time while pitching 99.9% network reliability and zero contracts.

*Training Reference: Day 7 — Live Call Observation.*

*Would you like me to review live rebuttal techniques?*`;
      customFollowUps = ["Explain 30-second value hook", "Objection handling examples", "Explain Day 8"];

      // A004. Day 8: Operations Tools & Certification
    } else if (isDay8Query) {
      responseText = `**Day 8: Operations Tools & Final Assessment:**
1. **Systems:** Navigation in OneDrive, ERP, and CRM lead dispositioning.
2. **Order Tracker:** Monitoring order flow from credit check to technician installation.
3. **Final Exam:** Written process test and voice assessment. An **80%+ score** is required to graduate to the live sales floor!

*Training Reference: Day 8 — Operations Tools & Final Assessment.*

*Would you like me to explain order tracking or practice final exam questions?*`;
      customFollowUps = ["Explain Order Tracker", "Practice exam questions", "Explain Day 1"];

      // A00. Installation Process (Day 2 Section 3.3)
    } else if (isInstallationQuery) {
      if (wantsDetail) {
        responseText = `**3.3 Installation Process (Detailed Breakdown — Day 2):**

### What Installation Means:
A professional field technician visits the customer's business location to set up modem and router hardware, activate internet and phone service, and test line stability.

### The 5-Step Installation Flow:
1. **Order Submitted:** The sales representative enters and verifies the complete order in the portal.
2. **Address Verified:** The exact USPS commercial address and suite/unit number are confirmed.
3. **Technician Assigned & Appointment Scheduled:** An arrival date and time window are reserved.
4. **Technician Installs Service:** Field technician runs physical lines, connects hardware, and verifies connection speeds.
5. **Customer Confirms Completion:** The business owner signs off on the working installation.

### Your Role as an Agent:
- Collect the correct and complete address (prevents truck roll failures).
- Schedule the correct appointment window with an authorized onsite contact.
- Follow up until completion to ensure customer satisfaction and protected commissions.

*Training Reference: Day 2 — Section 3.3 Installation Process.*`;
      } else {
        responseText = `**Installation Process (Day 2 Training — Section 3.3):**

**What it means:** A technician visits the customer's location to set up modem/router, activate internet/phone service, and test the connection.

### Typical 5-Step Installation Flow:
1. **Order submitted**
2. **Address verified**
3. **Technician assigned & Appointment scheduled**
4. **Technician installs service**
5. **Customer confirms completion**

**Your Role as an Agent:**
- Collect correct address (including suite/unit #)
- Schedule correct appointment time
- Follow up until completion

*Would you like me to explain any step in more detail or review common installation mistakes?*`;
      }
      customFollowUps = ["Explain in more detail", "What is number porting?", "What are truck roll failures?"];

      // A01. Phone Number Porting (Day 2 Section 4)
    } else if (isPortingQuery) {
      if (wantsDetail) {
        responseText = `**Phone Number Porting (Day 2 Training — Section 4):**

### What Porting Means:
Moving a customer's established business telephone number from their current provider (e.g. AT&T, Verizon) to Spectrum without changing the number.

### Why Customers Prefer Porting:
- They do not want to lose or change their established phone numbers.
- Their clients, marketing materials, and Google business listing already use that number.
- *Example:* A restaurant in business for 10 years will almost always port their phone number.

### Critical Rules for Porting:
1. **Never cancel the old phone service before porting completes!** Canceling early releases the number back to the pool, and it is permanently lost.
2. **Exact Bill Match:** The account number, billing address, and authorized name on the Letter of Authorization (LOA) must match the old carrier bill 100%.
3. **Automatic Cutover:** Once the port activates on Spectrum, the old carrier automatically disconnects that line.

*Training Reference: Day 2 — Section 4 Porting Phone Numbers.*`;
      } else {
        responseText = `**Phone Number Porting (Quick Summary — Day 2 Section 4):**
- **Definition:** Moving an existing business telephone number to Spectrum without changing the number.
- **Golden Rule:** **Never cancel old phone service before porting finishes!** (Canceling early causes the number to be lost).
- **LOA Match:** The account number and authorized name must match the current carrier bill exactly.

*Would you like me to explain this in more detail or review porting timeframes?*`;
      }
      customFollowUps = ["Explain in more detail", "How much is a phone line?", "What is PSU?"];

      // A02. Sales Flow & Mistakes (Day 3)
    } else if (isSalesFlowQuery) {
      responseText = `**The 6-Step Sales Flow (Day 3 Training):**
1. **Greeting:** Speak slowly, smile, and establish calm authority.
2. **Need Analysis:** Ask open-ended questions about current speeds and device count.
3. **Pitch:** Tailor the package (Premier, Ultra, Gig) directly to their operations.
4. **Objection Handling:** Acknowledge concerns with empathy and validate business needs.
5. **Close:** Secure commitment with clear pricing and price guarantees.
6. **Next Step:** Confirm installation window and onsite contact.

**Top Sales Mistakes to Avoid:**
- Talking too much / Interrupting the customer
- Quoting price too early before building value
- Sounding desperate or pushing without understanding needs

*Would you like me to explain this in more detail or practice a role play?*`;
      customFollowUps = ["Explain in more detail", "Practice role play", "What is ALC vs Clear Sale?"];

      // A0. Internet Types & High Speed (Fiber, Cable, Wireless)
    } else if (isInternetTypeQuery) {
      if (wantsDetail) {
        responseText = `**Internet Connection Types & Speed Hierarchy (Day 2 Training):**

1. **Fiber Internet (Fastest & Most Reliable):**
   - **Technology:** Transmits data using light pulses through glass fiber-optic cables.
   - **Speeds:** **500 Mbps, 1 Gbps, up to 2 Gbps+** (delivers symmetrical download & upload).
   - **Strengths:** Lowest latency, impervious to electrical interference, best for 15+ devices and heavy cloud operations.

2. **Cable Internet (Coaxial):**
   - **Technology:** Transmits data over copper coaxial cables (standard DOCSIS network).
   - **Speeds:** **500 Mbps, 750 Mbps, up to 1 Gbps** (asymmetric speeds with standard uploads).
   - **Strengths:** Most widely available across US businesses, highly cost-effective for standard retail and offices.

3. **Wireless Internet:**
   - **Technology:** Transmits data via cellular towers or fixed wireless antennas.
   - **Strengths:** Essential backup or primary connectivity for rural/remote areas where physical lines haven't been laid.

*Training Reference: Day 2 — Internet Types: Fiber, Cable & Wireless.*`;
      } else {
        responseText = `**Fiber Internet** has the highest speed and stability among all internet connection types.

### Quick Breakdown of Internet Types (from Day 2 Training):
- **1. Fiber Internet (Fastest):**
  - Uses glass fiber-optic cables with light pulses.
  - Speeds: **500 Mbps, 1 Gbps, up to 2 Gbps+** (symmetrical upload & download).
- **2. Cable Internet (Coaxial):**
  - Uses copper coaxial cables; widely available across the US.
  - Speeds: **500 Mbps, 750 Mbps, up to 1 Gbps** (asymmetric).
- **3. Wireless Internet:**
  - Uses cellular towers; best for rural areas where physical cables aren't laid.

*Would you like me to explain the difference between Coaxial and Fiber in more detail?*`;
      }
      customFollowUps = ["Explain in more detail", "Give a practice example", "What is High Split Coax (HSC)?"];

      // A1. Price Guarantees & Contract Buyout
    } else if (isPriceGuaranteeQuery) {
      if (wantsDetail) {
        responseText = `**Spectrum Business Price Guarantees & Contract Buyout:**

1. **1-Year Price Guarantee:**
   - Standard with **Internet Premier** ($60/mo historical rate).
2. **2-Year Price Guarantee:**
   - Requires **Internet Ultra or Gig** + at least **1 Core Line of Business** (e.g., Voice or Mobile).
3. **3-Year Price Guarantee:**
   - Requires **Internet Ultra or Gig** + **Voice** + **Paid Mobile Line**.
4. **Contract Buyout:**
   - Spectrum offers up to **$500** to buy out early termination fees (ETFs) when switching from competitors like AT&T, Comcast, or Verizon.
   - **No Contracts:** All price guarantees lock promotional rates without long-term service agreements!

*Training Reference: Spectrum Business — Price Guarantees & Acquisition.*`;
      } else {
        responseText = `**Spectrum Business Price Guarantee Summary:**
- **1-Year Guarantee:** Standard with Internet Premier.
- **2-Year Guarantee:** Internet Ultra or Gig + at least 1 Core Line of Business (e.g., Voice or Mobile).
- **3-Year Guarantee:** Internet Ultra or Gig + Voice + Paid Mobile Line.
- **Contract Buyout:** Up to **$500** to buy out early termination fees from competitors.

*Trainer Tip: All price guarantees lock in your savings with zero long-term contract requirement.*

*Would you like me to explain this in more detail or review qualification requirements?*`;
      }
      customFollowUps = ["Explain in more detail", "What is Contract Buyout?", "What is PSU?"];

      // A2. WIB (Wireless Internet Backup)
    } else if (isWibQuery) {
      responseText = `**WIB (Wireless Internet Backup) Breakdown:**
- **What it does:** Provides automatic cellular failover so business POS terminals, credit card processing, and computers stay online if there is a power or cable outage.
- **Battery Backup:** Includes up to **8 hours of battery backup** during electrical blackouts.
- **Ideal for:** Restaurants, retail shops, medical clinics, and businesses that cannot afford a single minute of downtime.

*Training Reference: Selling Partner Playbook — Wireless Internet Backup.*

*Would you like me to explain this in more detail or check hardware installation?*`;
      customFollowUps = ["Explain in more detail", "What is modem vs router?", "What is Static IP?"];

      // A3. Buyflow & Service Qualification (Day 4)
    } else if (isBuyflowQuery) {
      responseText = `**Buyflow & Service Qualification (Quick Summary):**
- **Floor Golden Rule:** *"Sell what is available, not what sounds good. Check first, quote second."*
- **Network Facilities Qualified:**
  - **Fiber On-Net:** Building directly wired to fiber optic backbone (instant gigabit speeds).
  - **Fiber Near-Net:** Fiber runs nearby in the street; requires site survey and lateral construction.
  - **High-Split Coax (HSC):** Upgraded coaxial network delivering higher/symmetric upload bandwidth.
  - **Standard Cable:** Widespread coaxial DOCSIS network.
- **Usage-Based Plan Sizing:**
  - 1–3 devices (POS / Retail): 300–500 Mbps (Premier)
  - 4–10 devices (Office / Clinic): 500–750 Mbps (Ultra)
  - 10+ devices (High usage / Cloud): 1,000 Mbps+ (Gig / Fiber)

*Training Reference: Day 4 — Buyflow & Service Qualification.*

*Would you like me to explain this in more detail or walk through an address check?*`;
      customFollowUps = ["Explain in more detail", "What is Fiber On-Net?", "Explain Day 1 Training"];

      // A4. Voice Features (Auto Attendant, Hunt Groups)
    } else if (isVoiceFeaturesQuery) {
      responseText = `**Spectrum Business Voice Features (Over 35 Included Free):**
- **Auto Attendant:** An automated virtual receptionist that plays greeting menus (*"Press 1 for Sales, 2 for Billing"*) and routes callers.
- **Hunt Groups:** Rings multiple office desk phones simultaneously or sequentially until an employee answers.
- **Voicemail-to-Email:** Transcribes and delivers voice messages directly to employee inboxes.
- **Call Forwarding & Caller ID:** Included standard with no hidden surcharge.

*Training Reference: Selling Partner Playbook — Voice Solutions.*

*Would you like me to explain how adding phone lines affects bundling?*`;
      customFollowUps = ["Explain in more detail", "What is phone pricing?", "What is PSU?"];

      // A5. Bundling Rule
    } else if (qLower.includes("bundl") || (primary.isFaq && primary.id === "Q27")) {
      if (wantsDetail) {
        responseText = `Let's break down the **Bundling Rule** in detail:

### What is a Bundle?
A **Bundle** (Double Play or Triple Play) requires purchasing at least **two distinct service categories** (e.g., Internet + Telephone).

**Floor Call & Assessment Breakdown:**
- **Category Rule:** 3 telephone lines = **1 PSU** (same category), so that alone is NOT a bundle.
- **Double Play:** Internet + Phone = 2 PSUs (Qualifies as a bundle).
- **Compliance:** Never add an unwanted line item just to create a bundle. All services must be customer-authorized.

*Training Reference: Day 2 — Spectrum Packages & Bundling.*`;
      } else {
        responseText = `**The Bundling Rule (Quick Breakdown):**
- A **Bundle** requires at least **2 distinct service categories** (e.g., Internet + Telephone).
- **Key Assessment Rule:** 3 telephone lines still equal only **1 PSU** (same category), so that alone does NOT make a bundle.
- **Compliance:** Never add an unrequested service just to create a bundle.

*Would you like me to explain this in more detail or test this with a billing scenario?*`;
      }

      // B. PSU (Primary Service Unit)
    } else if (qLower.includes("psu") || (primary.isFaq && (primary.id === "Q25" || primary.id === "Q26"))) {
      if (wantsDetail) {
        responseText = `Here is the full breakdown of **PSU (Primary Service Unit)**:

### 1. The Core Categories:
- **Internet** = 1 PSU
- **Telephone (VoIP)** = 1 PSU
- **Television (Streaming or Cable)** = 1 PSU
- **Mobile** = 1 PSU

### 2. How Line Counts Work:
Multiple lines of the same service (e.g., 2, 3, or 5 telephone lines) still count as **1 PSU** for category tracking. To achieve 2 PSUs or qualify for a bundle, the customer must select across different categories (e.g. Internet + Phone).

*Training Reference: Day 2 — Spectrum Packages & Bundling.*`;
      } else {
        responseText = `**PSU (Primary Service Unit) Breakdown:**
- Represents an independent service category:
  - **Internet** = 1 PSU
  - **Telephone (VoIP)** = 1 PSU
  - **Television** = 1 PSU
  - **Mobile** = 1 PSU
- **Important:** Multiple lines in the same category (e.g., 3 phone lines) still equal **1 PSU**.

*Would you like me to explain this in more detail or test this with a quiz question?*`;
      }

      // C0. ALC 2-Account & 1-Account Setup / Hierarchy Account
    } else if (isAlcTwoAccountQuery) {
      if (wantsDetail) {
        responseText = `**Why 2 Accounts are Needed for ALC (Detailed Trainer Guide):**

### 1. The Core Problem:
- The customer is an existing Spectrum client (**ALC**) whose 2-year promotional discount expired.
- Their bill has climbed up to **$170+/month** for basic internet and phone.
- **The Critical Constraint:** The business **CANNOT afford to lose their existing business landline phone numbers** (clients, partners, advertising, and Google listings depend on that number).

### 2. How the 2-Account Setup Solves This:
1. **Old Account (Protects Phone Lines):**
   - We keep the old account active so the business keeps their existing phone numbers.
   - Retention minimizes the internet and lowers the phone rate to the retention rake rate (**~$50/month**).
2. **New Account (New Promotional Internet):**
   - Created under a **Second POC** (Point of Contact — partner or manager's name, different email, and different cell phone).
   - Secures fresh promotional pricing (**$80/month** for 500 Mbps bundle) with equipment fees and tech installation fees waived.
3. **Hierarchy Account (Merged after 3 Months):**
   - The customer pays both bills for 3 months (~$50 old + ~$80 new = ~$130/month).
   - After **3 months**, both accounts are legally merged under a **Hierarchy / Master Control Account** into a single consolidated bill, saving them $40+/month while preserving their telephone number!

### 3. Golden Rule: 2-Account vs. 1-Account:
- **2-Account Setup:** Used when the customer **has telephone lines they MUST keep**.
- **1-Account Setup:** Used when the customer has **only internet / internet + TV, or does NOT need to keep their phone number** (new account created, old account placed on seasonal hold for 3/6/9 months to prevent rip-and-replace).

*Training Reference: Day 3 — ALC Account Structures & Retention Strategy.*`;
      } else {
        responseText = `**Why 2 Accounts are Needed for ALC (Quick Summary):**
- **Protects Business Phone Numbers:** The customer cannot afford to lose their established business landline number (clients and marketing rely on it).
- **Old Account (~$50/mo):** Stays active purely to keep their original landline numbers at a lower retention rate.
- **New Account (~$80/mo):** Opened under a **Second POC** (different contact details) to get fresh new-customer promotional rates for internet.
- **Hierarchy Account (After 3 Months):** Both accounts merge into one single master bill (~$130/mo vs $170+ originally), saving them money without losing their phone number.

*Trainer Rule: If the customer does not need to keep their phone line, use a 1-Account setup instead.*

*Would you like me to explain how the Second POC or the 1-Account setup works in more detail?*`;
      }
      customFollowUps = [
        "Explain in more detail",
        "What is Second POC?",
        "What is 1-Account Setup?",
        "What is a Hierarchy Account?"
      ];

      // C. ALC vs Clear Sale
    } else if (qLower.includes("alc") || qLower.includes("clear sale") || (primary.isFaq && (primary.id === "Q29" || primary.id === "Q30"))) {
      if (wantsDetail) {
        responseText = `Here is the detailed breakdown of **ALC vs. Clear Sale**:

1. **ALC (Already Customer):**
   - An existing customer currently using active Spectrum services.
   - Handled as an account upgrade, speed boost, or retention.
2. **Clear Sale:**
   - A brand-new customer with no active Spectrum services at that business location (new company or switching from AT&T/Comcast).

**Trainer Compliance Tip:**
Attempting to cancel an existing account to re-create a fake new sale is called **rip-and-replace** and is strictly prohibited!

*Training Reference: Day 3 — Sales Terminology & Ethics.*`;
      } else {
        responseText = `**ALC vs. Clear Sale (Quick Breakdown):**
- **ALC (Already Customer):** An existing customer currently using Spectrum services (calling for upgrades or new lines).
- **Clear Sale:** A brand-new customer with no active Spectrum service at that address (new setup or switching from competitors).

*Trainer Tip: Never cancel and recreate an account to fake a Clear Sale — that's prohibited "rip-and-replace".*

*Would you like me to explain this in more detail or walk through a call scenario?*`;
      }

      // D1. Gig Internet Specifically (ONLY price what the candidate asked for!)
    } else if (isGigSpecific) {
      if (wantsDetail) {
        responseText = `**Spectrum Gig Internet (Detailed Breakdown):**
- **Monthly Cost:** **$100/month** (training reference rate)
- **Download Speed:** Up to **1,000 Mbps** (1 Gbps)
- **Upload Speed:** Up to **50 Mbps**
- **Wi-Fi Router:** Included at no extra charge ($0)
- **Modem:** Standalone DOCSIS modem provided free ($0)
- **Best Suited For:** Offices with 15+ concurrent users, large cloud backups, and intensive video conferencing.

*Training Reference: Day 2 — Spectrum Packages (Historical Example).*`;
      } else {
        responseText = `**Spectrum Gig Internet Pricing:**
- **Monthly Cost:** **$100/mo** (training reference rate)
- **Download Speed:** Up to **1,000 Mbps** (1 Gbps)
- **Upload Speed:** Up to **50 Mbps**
- **Router:** Included at no extra charge ($0)
- **Modem:** Included free ($0)

*Training Reference: Day 2 — Spectrum Packages (Historical Example).*

*Would you like me to explain what's included or check another speed tier?*`;
      }
      customFollowUps = ["Explain in more detail", "What is Ultra pricing?", "What is Premier pricing?"];

      // D2. Ultra Internet Specifically (ONLY price what the candidate asked for!)
    } else if (isUltraSpecific) {
      if (wantsDetail) {
        responseText = `**Spectrum Ultra Internet (Detailed Breakdown):**
- **Base Rate:** **$80/month**
- **Wi-Fi Router:** **$10/month** (optional)
- **Total Monthly Cost:** **$90/month** (with router)
- **Download Speed:** Up to **750 Mbps**
- **Upload Speed:** Up to **35 Mbps**
- **Modem:** Standalone DOCSIS modem provided free ($0)
- **Best Suited For:** Busy offices with 5–15 employees uploading large graphics, media, or data files.

*Training Reference: Day 2 — Spectrum Packages (Historical Example).*`;
      } else {
        responseText = `**Spectrum Ultra Internet Pricing:**
- **Base Rate:** **$80/mo**
- **Wi-Fi Router:** **$10/mo** (optional)
- **Total Monthly Cost:** **$90/mo** (with router)
- **Download Speed:** Up to **750 Mbps**
- **Upload Speed:** Up to **35 Mbps**
- **Modem:** Included free ($0)

*Training Reference: Day 2 — Spectrum Packages (Historical Example).*

*Would you like me to explain this in more detail or check Gig pricing?*`;
      }
      customFollowUps = ["Explain in more detail", "What is Gig pricing?", "What is Premier pricing?"];

      // D3. Premier Internet Specifically (ONLY price what the candidate asked for!)
    } else if (isPremierSpecific) {
      if (wantsDetail) {
        responseText = `**Spectrum Premier Internet (Detailed Breakdown):**
- **Base Rate:** **$50/month**
- **Wi-Fi Router:** **$10/month** (optional)
- **Total Monthly Cost:** **$60/month** (with router)
- **Download Speed:** Up to **500 Mbps**
- **Upload Speed:** Up to **20 Mbps**
- **Modem:** Standalone DOCSIS modem provided free ($0)
- **Best Suited For:** Small businesses, retail shops, or boutique offices with 1–5 employees doing everyday browsing and POS operations.

*Training Reference: Day 2 — Spectrum Packages (Historical Example).*`;
      } else {
        responseText = `**Spectrum Premier Internet Pricing:**
- **Base Rate:** **$50/mo**
- **Wi-Fi Router:** **$10/mo** (optional)
- **Total Monthly Cost:** **$60/mo** (with router)
- **Download Speed:** Up to **500 Mbps**
- **Upload Speed:** Up to **20 Mbps**
- **Modem:** Included free ($0)

*Training Reference: Day 2 — Spectrum Packages (Historical Example).*

*Would you like me to explain this in more detail or check Ultra/Gig pricing?*`;
      }
      customFollowUps = ["Explain in more detail", "What is Ultra pricing?", "What is Gig pricing?"];

      // D4. Premier + Phone Bundle Calculation Practice
    } else if (isPremierBundleCalc) {
      responseText = `**Billing Calculation Practice (Historical Example):**
- **Premier Internet:** $50/mo (up to 500/20 Mbps)
- **Wi-Fi Router:** $10/mo
- **Phone Line (VoIP):** $20/mo
- **Estimated Total:** **$80/month**

*(Historical training exercise — live promotions and taxes must be verified in the CRM).*

*Would you like me to explain this in more detail or calculate a custom package?*`;

      // D5. Router Fee Specifically
    } else if (isRouterSpecific) {
      responseText = `**Spectrum Wi-Fi Router Pricing:**
- **Monthly Router Fee:** **$10/month** (for Premier and Ultra tiers)
- **Gig Tier:** Router is **included at no extra charge ($0)**
- **Modem:** The standalone DOCSIS modem is **always free ($0)** on all tiers

*Training Reference: Day 2 — Spectrum Packages & Hardware.*

*Would you like me to explain the difference between a modem and a router?*`;
      customFollowUps = ["Explain in more detail", "Difference between modem and router", "What is Gig pricing?"];

      // D6. Voice / Phone Line Pricing Specifically
    } else if (isVoiceSpecific) {
      responseText = `**Spectrum Business Voice Pricing:**
- **Monthly Rate:** **$20/month** per line (standard bundle training rate)
- **PSU Count:** Multiple phone lines still equal **1 PSU**
- **Features:** Unlimited local and nationwide calling, voicemail, and call forwarding

*Training Reference: Day 2 — Spectrum Packages & PSU Rules.*

*Would you like me to explain how adding phone lines affects bundling?*`;
      customFollowUps = ["Explain in more detail", "How does PSU work for phone lines?", "What is bundling?"];

      // E. General Internet Packages (Premier, Ultra, Gig comparison)
    } else if (qLower.includes("package") || qLower.includes("plans") || qLower.includes("tiers") || qLower.includes("options") || qLower.includes("compare")) {
      if (wantsDetail) {
        responseText = `**Spectrum Business Internet Tiers (Detailed Breakdown):**

1. **Premier Internet (Entry Tier):**
   - Speeds: Up to 500 Mbps download / 20 Mbps upload
   - Training Rate: $50/mo base + $10 router = **$60/month**
2. **Ultra Internet (Mid Tier):**
   - Speeds: Up to 750 Mbps download / 35 Mbps upload
   - Training Rate: $80/mo base + $10 router = **$90/month**
3. **Gig Internet (Top Tier):**
   - Speeds: Up to 1,000 Mbps (1 Gbps) download / 50 Mbps upload
   - Training Rate: **$100/month** (router & installation typically included)

*(Historical training figures — live rates must be checked in the CRM).*

*Training Reference: Day 2 — Spectrum Packages & Bundling.*`;
      } else {
        responseText = `**Spectrum Internet Tiers (Quick Breakdown):**
- **Premier:** Up to 500/20 Mbps ($50 base + $10 router = **$60/mo**)
- **Ultra:** Up to 750/35 Mbps ($80 base + $10 router = **$90/mo**)
- **Gig:** Up to 1,000/50 Mbps (**$100/mo**, router included)

*Trainer Tip: 2 Gig and High Split Coax (HSC) speeds are location-dependent.*

*Would you like me to explain this in more detail or check hardware differences?*`;
      }

      // F. Modem vs Router
    } else if (qLower.includes("modem") || qLower.includes("router")) {
      responseText = `**Modem vs. Router (Quick Breakdown):**
- **Modem:** Connects the business to Spectrum's external network (brings internet into the building).
- **Router:** Creates the local Wi-Fi and distributes internet to computers, phones, and printers inside the office.

*Would you like me to explain this in more detail or cover Wi-Fi extenders?*`;

      // G. US Address Format
    } else if (qLower.includes("address") || qLower.includes("street") || qLower.includes("zip") || qLower.includes("structure") || primary.id === "d1-us-address-format") {
      if (wantsDetail) {
        responseText = `Let's break down the **US Business Address Format & Structure** in detail:

### 1. The 4 Sequential Components:
1. **Street Address:** Building Number + Street Name + Street Suffix (+ optional Suite/Unit)
2. **City:** Municipality or city name
3. **State:** Standard 2-letter postal abbreviation (e.g. \`CA\`, \`TX\`, \`NY\`, \`FL\`)
4. **ZIP Code:** 5-digit postal code

---

### 2. Training Examples:
- **Standard Example:** \`1031 Main Ave, Pasadena, CA 38517\`
  - Building: \`1031\`, Street: \`Main\`, Suffix: \`Ave\`, City: \`Pasadena\`, State: \`CA\`, ZIP: \`38517\`
- **Commercial Suite Example:** \`450 North Brand Blvd, Suite 600, Glendale, CA 91203\`
  *(Always include Suite numbers for business plazas!)*

---

### 3. Common Street Suffixes:
\`St\` = Street | \`Ave\` = Avenue | \`Blvd\` = Boulevard | \`Rd\` = Road | \`Dr\` = Drive | \`Pkwy\` = Parkway

*Trainer Tip: Searching \`1031 Main St\` instead of \`1031 Main Ave\` can cause CRM coverage checks to fail!*

*Training Reference: Day 1 — US Address Structure.*`;
      } else {
        responseText = `**US Business Address Structure (Quick Breakdown):**
A valid address follows **4 sequential components**:
1. **Street Address:** Number + Street Name + Suffix (e.g. \`1031 Main Ave\`)
2. **City:** Municipality (e.g. \`Pasadena\`)
3. **State:** 2-letter postal code (e.g. \`CA\`)
4. **ZIP Code:** 5 digits (e.g. \`38517\`)

*Example:* \`1031 Main Ave, Pasadena, CA 38517\`

*Trainer Tip: Always use the exact suffix (Ave, Blvd, St) for accurate CRM coverage checks.*

*Would you like me to explain this in more detail or give commercial suite examples?*`;
      }

      // H. Time Zones
    } else if (qLower.includes("time zone") || qLower.includes("eastern") || qLower.includes("pacific") || primary.id === "d1-time-zones") {
      responseText = `**The 4 Contiguous US Time Zones:**
- **Eastern (ET):** Base reference
- **Central (CT):** 1 hr behind ET
- **Mountain (MT):** 2 hrs behind ET
- **Pacific (PT):** 3 hrs behind ET

*Example:* 5:00 PM Eastern = 2:00 PM Pacific. Always check time zones before scheduling technician visits!

*Would you like me to explain this in more detail?*`;

      // I. Phone Standards
    } else if (qLower.includes("phone number") || qLower.includes("area code") || qLower.includes("telephone") || primary.id === "d1-phone-standards") {
      responseText = `**US Telephone Standards (10 Digits):**
\`(AAA) BBB-CCCC\`
- **AAA:** 3-digit Area Code
- **BBB:** 3-digit Exchange Code
- **CCCC:** 4-digit Line Number

*Trainer Tip: If a customer gives only 7 digits, never guess their area code from their ZIP — always ask to confirm!*

*Would you like me to explain this in more detail?*`;

      // J. FAQ or Generic Knowledge Chunk
    } else if (primary.isFaq) {
      const cleanAnswer = primary.content.replace(/\*\(Day[^\)]+\)\*/gi, "").trim();
      responseText = `${cleanAnswer}

${isPricingQuery ? "*Note: Training numbers are practice exercises. Live pricing must be confirmed in CRM.*" : ""}

*Would you like me to explain this in more detail or give an example?*`;
    } else {
      responseText = `**${primary.title} (Summary):**
${primary.content.split("\n").slice(0, 4).join("\n")}

${primary.examples ? `*Example:* ${primary.examples}\n` : ""}
*Would you like me to explain this in more detail?*`;
    }
  }

  const defaultFollowUps = wantsDetail
    ? getSuggestedFollowUps(retrievedChunks, query)
    : [
      "Explain in more detail",
      "Give a practice example",
      ...getSuggestedFollowUps(retrievedChunks, query).slice(0, 2)
    ];

  const finalCitations = isShortFormsQuery
    ? Array.from(new Set(["Floor Standards — Common Short Forms", ...citations]))
    : isTelephonePricingQuery
      ? Array.from(new Set(["Day 3 — Telephone Pricing Structure", ...citations]))
      : citations;

  return {
    text: responseText,
    citations: finalCitations,
    suggestedQuestions: customFollowUps || defaultFollowUps,
    verification: {
      checkedAgainst: isShortFormsQuery
        ? "Floor Standards — Common Short Forms"
        : isTelephonePricingQuery
          ? "Day 3 — Telephone Pricing Structure"
          : (primary ? primary.sourceReference : "Spectrum Training Curriculum"),
      status: "Verified Training SOP",
      day: isShortFormsQuery || isTelephonePricingQuery ? "Day 3" : (primary ? primary.day || "Curriculum" : "General"),
    },
    isLocalFallback: true,
  };
};

/**
 * Call Gemini API directly with grounded prompt
 */
const callGeminiAPI = async (apiKey, model, systemPrompt, userPrompt) => {
  const modelName = model || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1200,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API Error: ${response.status}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text || "No response received from AI model.";
  return text;
};

/**
 * Call OpenAI API directly with grounded prompt
 */
const callOpenAIAPI = async (apiKey, model, systemPrompt, userPrompt) => {
  const modelName = model || "gpt-4o-mini";
  const url = "https://api.openai.com/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2,
      max_tokens: 1200,
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response received from AI model.";
};

/**
 * Main AI Query Executor
 * Coordinates Guardrails -> RAG Retrieval -> LLM Call -> Citation Extraction
 */
export const queryAITrainer = async ({
  query,
  selectedDay = "all",
  conversationHistory = [],
  onToken = null
}) => {
  // 1. Check Guardrails
  const guardrailResult = checkGuardrails(query);
  if (guardrailResult.triggered) {
    return {
      text: guardrailResult.message,
      citations: guardrailResult.source ? [guardrailResult.source] : [],
      suggestedQuestions: guardrailResult.suggestedQuestions || [
        "What is taught in Day 1?",
        "What is taught in Day 2?",
        "What is Day 4 Buyflow?",
        "What is Day 8 Assessment?"
      ],
      verification: {
        checkedAgainst: guardrailResult.source || "Vahlay Consulting — 8-Day Training Program",
        status: guardrailResult.status || (guardrailResult.isConversational ? "Program Verified" : "Compliance Guardrail"),
        day: "Assistant",
      },
      isLocalFallback: false,
    };
  }

  // 2. Detect Candidate Language (English, Hindi, Hinglish)
  const language = detectLanguage(query);

  // 3. Retrieve Grounded Knowledge Chunks
  const retrievedChunks = retrieveKnowledge(query, selectedDay, 4);
  const citations = Array.from(new Set(retrievedChunks.map(c => c.sourceReference)));
  const followUps = getSuggestedFollowUps(retrievedChunks, query);

  // 4. Check Configured AI Key
  const config = getAIConfig();
  const hasKey = config.apiKey && config.apiKey.trim().length > 5;

  // If no API Key configured, use the Local Grounded Synthesis Engine
  if (!hasKey) {
    const localResult = synthesizeLocalResponse(query, retrievedChunks, language);
    return localResult;
  }

  // 5. Build Grounded LLM Context
  const contextPassages = retrievedChunks.map((chunk, i) => {
    return `[Evidence Passage ${i + 1}] (Source: ${chunk.sourceReference}, Priority: ${chunk.priority})
Title: ${chunk.title}
Content: ${chunk.content}
${chunk.examples ? `Example: ${chunk.examples}` : ""}`;
  }).join("\n\n");

  const userPrompt = `CANDIDATE QUESTION: "${query}"

DETECTED LANGUAGE: ${language.toUpperCase()}
IMPORTANT: If the question is in Hindi or Hinglish, respond naturally in matching Hindi or Hinglish. If in English, respond in English.

RETRIEVED TRAINING EVIDENCE:
${contextPassages || "No specific matching evidence found in notes."}

RECENT CONVERSATION CONTEXT:
${conversationHistory.slice(-4).map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}

INSTRUCTIONS:
1. PRIMARY DATA SOURCE: Base your answers on the provided training evidence, curriculum guidelines, and website details whenever relevant.
2. GENERAL KNOWLEDGE: If the candidate asks a general question (e.g. general telecom concepts, networking definitions like DNS/ping/latency, soft skills, conversational sales advice, customer psychology, or general tech queries), use your broad AI general knowledge to provide a smart, professional, accurate answer.
3. If discussing historical training rates vs live offers, clarify that live promotional offers and rates should be verified in the CRM tool.
4. Keep answers crisp, clear, well-formatted with markdown and bullet points.
5. Conclude warmly like an expert corporate mentor with an encouraging follow-up prompt.`;

  try {
    let responseText = "";

    if (config.provider === "gemini") {
      responseText = await callGeminiAPI(config.apiKey, config.model || "gemini-1.5-flash", SYSTEM_INSTRUCTION, userPrompt);
    } else if (config.provider === "openai" || config.provider === "groq") {
      responseText = await callOpenAIAPI(config.apiKey, config.model || "gpt-4o-mini", SYSTEM_INSTRUCTION, userPrompt);
    } else {
      // Default to Gemini
      responseText = await callGeminiAPI(config.apiKey, "gemini-1.5-flash", SYSTEM_INSTRUCTION, userPrompt);
    }

    return {
      text: responseText,
      citations: citations.length > 0 ? citations : ["Spectrum Training Knowledge Base"],
      suggestedQuestions: followUps,
      isLocalFallback: false,
    };
  } catch (err) {
    console.warn("LLM API Call failed, falling back to local grounded synthesis:", err.message);
    const fallbackResult = synthesizeLocalResponse(query, retrievedChunks, language);
    return {
      ...fallbackResult,
      apiError: err.message,
    };
  }
};

export default {
  getAIConfig,
  saveAIConfig,
  queryAITrainer,
  DEFAULT_AI_CONFIG,
  AI_SETTINGS_STORAGE_KEY
};
