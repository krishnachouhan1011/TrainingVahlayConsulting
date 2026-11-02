/**
 * Vahlay AI Training Assistant - Grounded Knowledge Base
 * Sources:
 * 1. Spectrum_Candidate_Chatbot_Knowledge_Base.md
 * 2. Spectrum_Chatbot_Candidate_FAQ.jsonl
 * 3. Full_Spectrum_Training_Transcript.md
 * 
 * Strict Knowledge Hierarchy:
 * Priority 1: Approved Admin Updates & Verified Training SOPs
 * Priority 2: Spectrum Candidate Chatbot Knowledge Base
 * Priority 3: Candidate FAQ Dataset
 * Priority 4: Full Spectrum Training Transcript (Reference Only)
 */

export const KNOWLEDGE_SOURCES = [
  {
    id: "kb-official",
    title: "Spectrum Candidate Chatbot Knowledge Base",
    filename: "Spectrum_Candidate_Chatbot_Knowledge_Base.md",
    priority: 2,
    version: "1.0",
    status: "active",
    description: "Approved curriculum summary and compliance guidelines for Days 1-3.",
  },
  {
    id: "kb-faq",
    title: "Candidate Training FAQ Dataset",
    filename: "Spectrum_Chatbot_Candidate_FAQ.jsonl",
    priority: 3,
    version: "1.0",
    status: "active",
    description: "46 verified Q&A pairs covering Days 1-3 fundamentals, pricing, and rules.",
  },
  {
    id: "kb-transcript",
    title: "Full Spectrum Training Transcript",
    filename: "Full_Spectrum_Training_Transcript.md",
    priority: 4,
    version: "1.0",
    status: "reference_only",
    description: "Raw trainer transcription. Reference source only - not official current rate card or binding policy.",
  }
];

export const KNOWLEDGE_CHUNKS = [
  // ==========================================
  // FLOOR TERMINOLOGY & SHORT FORMS (TN, CX, CK, SVCS)
  // ==========================================
  {
    id: "floor-short-forms-jargon",
    day: "Day 3",
    category: "Floor Terminology & Short Forms",
    title: "Call Center Short Forms & Floor Jargon (TN, CX, CK, SVCS)",
    sourceReference: "Floor Standards — Common Short Forms",
    priority: 1, // High Priority
    keywords: [
      "short forms", "short form", "shortforms", "floor jargon", "abbreviations", "abbreviation",
      "tn", "cx", "ck", "svcs", "telephone", "customer", "check", "services",
      "call center terms", "acronyms", "slang", "what is tn", "what is cx", "what is ck", "what is svcs"
    ],
    content: `Essential Call Center Short Forms & Floor Jargon used in daily sales operations:
• **TN**: **Telephone** (Telephone Number / Telephone Line).
• **CX**: **Customer** (Caller, Subscriber, Client).
• **CK**: **Check** (Verify address, check services in CRM, inspect qualification).
• **SVCS**: **Services** (The products active or ordered, such as Internet, Telephone, TV, Mobile).

Common Floor Shorthand Phrases:
- *"CK CX SVCS"*: Check customer services in the billing system/CRM.
- *"How many TN does CX have?"*: How many telephone lines does the customer currently have?
- *"CK TN porting eligibility"*: Check if the customer's phone numbers can be ported to Spectrum.

Other Standard Acronyms:
- **ALC**: Already Customer (Existing Spectrum account).
- **POC**: Point of Contact (Authorized account representative).
- **PSU**: Primary Service Unit (Core product line: Internet, Phone, TV).
- **MRC**: Monthly Recurring Charge (Regular monthly bill amount).`,
    keyPoints: [
      "TN = Telephone / Phone Line",
      "CX = Customer",
      "CK = Check / Verify",
      "SVCS = Services (Internet, Phone, TV, Mobile)",
      "CK CX SVCS = Check Customer Services"
    ],
    examples: "A senior coach notes: 'CK CX SVCS to see if they have 2 TN on ALC before pitching Premier Internet'."
  },

  // ==========================================
  // TELEPHONE PRICING: CLEAR SALES VS ALC
  // ==========================================
  {
    id: "telephone-pricing-clear-sales-vs-alc",
    day: "Day 3",
    category: "Telephone Pricing Rules",
    title: "Telephone Line Pricing: Clear Sales vs ALC (Already Customer)",
    sourceReference: "Day 3 — Telephone Pricing Structure",
    priority: 1, // High Priority
    keywords: [
      "telephone pricing", "telephone price", "phone price", "phone pricing", "tn pricing", "tn price",
      "clear sales telephone", "clear sale telephone", "alc telephone", "alc tn",
      "1 tn", "2 tn", "3 tn", "4 tn", "5 tn", "add on tn", "addon tn", "add-on",
      "$20", "$50", "$80", "$110", "$140", "$170", "$30", "telephone line cost", "existing telephone"
    ],
    content: `Official Telephone (TN) Line Pricing Rules:

1. **Clear Sales (New Customers / Switchers):**
   - **$20 / month** per telephone line.
   - Example 1 Line: 1 × $20 = **$20/mo**
   - Example 2 Lines: 2 × $20 = **$40/mo**
   - Example 3 Lines: 3 × $20 = **$60/mo**
   - Example 4 Lines: 4 × $20 = **$80/mo**
   - Formula: \`Total = Number of Lines × $20\`

2. **ALC (Already Customer / Existing Customer):**
   - **1st TN (Existing Line):** **$50 / month**
   - **Each Add-On TN:** Add **$30 / month** for each additional telephone line:
     - 1 TN = **$50 / month**
     - 2 TN = $50 + $30 = **$80 / month**
     - 3 TN = $50 + (2 × $30) = **$110 / month**
     - 4 TN = $50 + (3 × $30) = **$140 / month**
     - 5 TN = $50 + (4 × $30) = **$170 / month**
     - 6 TN = $50 + (5 × $30) = **$200 / month**
     - General Formula ($N \\ge 1$): \`Total = $50 + (N - 1) × $30 / month\`

Summary Quick Table:
| Scenario | 1 Line (1 TN) | 2 Lines (2 TN) | 3 Lines (3 TN) | 4 Lines (4 TN) | 5 Lines (5 TN) |
|---|---|---|---|---|---|
| **Clear Sale** | $20/mo | $40/mo | $60/mo | $80/mo | $100/mo |
| **ALC (Existing)** | $50/mo | $80/mo ($50+$30) | $110/mo ($50+2×$30) | $140/mo ($50+3×$30) | $170/mo ($50+4×$30) |`,
    keyPoints: [
      "Clear Sales Telephone: $20 / line",
      "ALC 1st TN (existing): $50/mo",
      "ALC Add-on TN: +$30 for each additional line ($50 + (N-1) × $30)",
      "ALC 2 TN = $80/mo ($50 + $30)",
      "ALC 3 TN = $110/mo ($50 + 2×$30)",
      "ALC 4 TN = $140/mo ($50 + 3×$30)",
      "ALC 5 TN = $170/mo ($50 + 4×$30)"
    ],
    examples: "If an existing customer (ALC) has 1 phone line, it is $50/mo. Adding a 2nd line costs +$30 = $80/mo. Adding a 3rd line costs +$30 = $110/mo. Adding a 4th line costs +$30 = $140/mo. For a new customer (Clear Sale), it is flat $20/line (4 lines = $80/mo)."
  },

  // ==========================================
  // PROGRAM OVERVIEW: HOW THE 8-DAY TRAINING WORKS
  // ==========================================
  {
    id: "program-8day-overview",
    day: "Overview",
    category: "Program Overview",
    title: "How the 8-Day Training Program Works",
    sourceReference: "Vahlay Consulting — 8-Day Training Program",
    priority: 1, // Top Priority
    keywords: [
      "8 days", "8-day", "8 day", "eight days", "eight day",
      "how 8 days of training works", "how training works", "training program",
      "curriculum", "all days", "roadmap", "schedule", "syllabus", "course structure"
    ],
    content: `The Vahlay Consulting 8-Day Training Program is a structured, comprehensive curriculum designed to prepare sales representatives for US ISP and Spectrum Business operations:

• Day 1: Company Introduction & Policies — Company culture, discipline, salary cycle & evaluation criteria, US telecom overview, and US address format & time zones.
• Day 2: Telecom Basics — Connection technologies (Fiber, High-Split Coax, Cable), speed tiers (Mbps vs Gbps), modems vs routers, installation process, and phone porting.
• Day 3: Sales Process Training — Professional call greeting, customer needs discovery, pitching packages, objection handling, and ALC (Already Customer) vs Clear Sale rules.
• Day 4: Buyflow & Service Qualification — Address qualification tools, facility verification (On-Net vs Near-Net), 4-step buyflow, and usage-based plan selection (Premier 500M from $65/mo, Ultra 750M from $95/mo, Gig 1G from $115/mo).
• Day 5: Communication & Accent — US customer clarity, calm 130–150 WPM pacing, vocal warmth, handling hesitant owners, and mock calls.
• Day 6: Targets & Performance — Talk time metrics, Internet + TV bundling test practice, QA criteria, and strict zero-tolerance policies (anti-slamming & anti-rip-and-replace).
• Day 7: Live Call Observation — Shadowing top-performing floor agents, listening to live customer interactions, and real-time rebuttal delivery.
• Day 8: Operations Tools & Final Assessment — CRM, ERP & Order Tracker workflows, written assessment, voice certification test, and graduation to live floor sales.`,
    keyPoints: [
      "Structured 8-Day path taking a candidate from fundamentals to live sales floor readiness",
      "Covers products, systems, address qualification, soft skills, and compliance",
      "Includes bundling tests on Day 6 and comprehensive certification on Day 8"
    ],
    examples: "A new trainee completes Day 1–4 foundational and technical modules, practices soft skills on Day 5, passes tests on Day 6, shadows live agents on Day 7, and passes the Day 8 certification exam to go live."
  },

  // ==========================================
  // DAY 1: ISP FUNDAMENTALS & US STANDARDS
  // ==========================================
  {
    id: "d1-isp-definition",
    day: "Day 1",
    category: "ISP Fundamentals",
    title: "What is an ISP and Business Context",
    sourceReference: "Day 1 — ISP Fundamentals",
    priority: 2,
    keywords: ["isp", "internet service provider", "spectrum business", "competitors", "at&t", "comcast", "t-mobile", "verizon", "wire consulting", "vahlay"],
    content: `ISP stands for Internet Service Provider. An ISP is a company that provides internet connectivity, telephone/landline, television, and mobile/cellular communications to customers.
In the training program, the team learns to support US business customers, particularly focusing on Spectrum Business.
Other US service providers mentioned in training include AT&T, Comcast, T-Mobile, Verizon, Bandwidth, and Envoy.
The primary service offerings taught are Business Internet, Business Telephone (VoIP/landline), and Business Television (Streaming/Cable).`,
    keyPoints: [
      "ISP = Internet Service Provider",
      "Core products: Internet, Telephone, Television, and Mobile",
      "Target market: US business customers (especially SMBs)",
      "Main competitors: AT&T, Comcast, T-Mobile, Verizon"
    ],
    examples: "A small clinic or accounting firm purchases internet and phone connectivity from Spectrum Business rather than residential services."
  },
  {
    id: "d1-us-address-format",
    day: "Day 1",
    category: "US Address Standards",
    title: "US Business Address Format and Structure",
    sourceReference: "Day 1 — US Address Structure",
    priority: 2,
    keywords: ["address", "us address", "street address", "city", "state", "zip code", "zip", "crm", "coverage check", "st", "ave", "blvd", "pasadena", "ca"],
    content: `A valid US address consists of four sequential components:
1. Street Address (Number and Street Name + Suffix)
2. City
3. State (2-letter USPS abbreviation)
4. ZIP Code (5 digits)

Example taught in training:
'1031 Main Ave, Pasadena, CA 38517' (illustrative teaching example).

Street suffix abbreviations:
- St = Street
- Ave = Avenue
- Blvd = Boulevard
- Rd = Road
- Dr = Drive
- Pkwy = Parkway

In the internal CRM coverage-check system, the street address and ZIP code are the essential required fields to verify serviceability and availability.`,
    keyPoints: [
      "Order: Street Address -> City -> State -> ZIP Code",
      "St = Street, Ave = Avenue, Blvd = Boulevard",
      "ZIP code and street address are used for CRM service checks",
      "Never guess or mix up address order when searching in the CRM"
    ],
    examples: "Example address: 1031 Main Ave, Pasadena, CA 38517."
  },
  {
    id: "d1-time-zones",
    day: "Day 1",
    category: "US Standards",
    title: "US Time Zones and Offsets",
    sourceReference: "Day 1 — US Time Zones",
    priority: 2,
    keywords: ["time zone", "time zones", "eastern", "central", "mountain", "pacific", "et", "ct", "mt", "pt", "offsets", "hours", "states"],
    content: `The training curriculum focuses on the four main contiguous US time zones:
1. Eastern Time (ET)
2. Central Time (CT) = ET minus 1 hour
3. Mountain Time (MT) = ET minus 2 hours
4. Pacific Time (PT) = ET minus 3 hours

Teaching example:
When Eastern Time is 5:00 PM:
- Central Time is 4:00 PM
- Mountain Time is 3:00 PM
- Pacific Time is 2:00 PM

Important factual correction: The raw recording incorrectly claimed the US has ~52 states; the United States has exactly 50 states. Do not repeat that error.`,
    keyPoints: [
      "4 primary time zones: Eastern (ET), Central (CT), Mountain (MT), Pacific (PT)",
      "Time differences from East to West: ET (0h) -> CT (-1h) -> MT (-2h) -> PT (-3h)",
      "Essential for scheduling customer callbacks and business installations across the US",
      "The US has 50 states (not 52)"
    ],
    examples: "If a candidate calls a customer in California (PT) at 9:00 AM ET, it is only 6:00 AM in California, which is too early for business calls."
  },
  {
    id: "d1-telephone-numbering",
    day: "Day 1",
    category: "US Standards",
    title: "US Telephone Numbering and Area Codes",
    sourceReference: "Day 1 — Telephone Numbering",
    priority: 2,
    keywords: ["telephone", "phone number", "area code", "digits", "10 digits", "7 digits", "central office", "exchange code", "subscriber number"],
    content: `A standard US local telephone number consists of exactly 10 digits formatted as:
AAA - BBB - CCCC
- AAA (first 3 digits): Area Code (indicates geographical region)
- BBB (next 3 digits): Central Office / Exchange Code
- CCCC (last 4 digits): Subscriber Number

If a caller provides only 7 digits (e.g. 555-0199), the 3-digit Area Code is missing.
Rule: Always ask for and verify the Area Code directly from the customer. Never guess or infer the area code solely based on the ZIP code.`,
    keyPoints: [
      "US numbers have 10 digits (AAA-BBB-CCCC)",
      "First 3 digits = Area Code",
      "If customer provides only 7 digits, ask for their Area Code directly",
      "Do not guess area codes from postal ZIP codes"
    ],
    examples: "In (626) 555-0199, '626' is the Pasadena, CA area code, '555' is the central exchange, and '0199' is the line subscriber number."
  },

  // ==========================================
  // DAY 2: SPECTRUM PRODUCTS & PACKAGES
  // ==========================================
  {
    id: "d2-business-vs-residential",
    day: "Day 2",
    category: "Service Categories",
    title: "Spectrum Business vs Residential Services",
    sourceReference: "Day 2 — Business vs Residential",
    priority: 2,
    keywords: ["business", "residential", "smb", "enterprise", "hospitality", "soho", "home office", "employees"],
    content: `Spectrum services are divided into distinct operating categories:
1. Residential: Designed for personal home usage.
2. Business (SMB): Primary focus of training, tailored for Small and Medium-sized Businesses (typically ~2 to 20+ employees as an informal trainer example).
3. Enterprise: Large corporations requiring dedicated fiber and customized SLAs.
4. Hospitality: Tailored for hotels, motels, and guest entertainment.

Business service at a residential address (SOHO - Small Office / Home Office) can be requested when a legitimate business operates from home, but eligibility is subject to internal approval and verification.`,
    keyPoints: [
      "Training focuses on Business (SMB)",
      "Residential is for home; Business is for commercial/SMB needs",
      "Enterprise & Hospitality are specialized departments",
      "SOHO allows business service at residential locations upon verification"
    ],
    examples: "A freelance graphic designer or accounting consultant running a registered LLC from a home office can qualify for Business class internet under SOHO."
  },
  {
    id: "d2-internet-packages",
    day: "Day 2",
    category: "Internet Packages",
    title: "Spectrum Business Internet Plans and Speeds",
    sourceReference: "Day 2 — Spectrum Internet Packages",
    priority: 2,
    keywords: ["internet packages", "premier", "ultra", "gig", "gigabit", "mbps", "gbps", "download", "upload", "pricing", "$50", "$80", "$100", "speed"],
    content: `According to historical training transcript examples, Spectrum Business offers three core internet packages over standard coaxial connection:

| Package Label | Download Speed | Upload Speed (Coax) | Base Monthly Price | Router Fee | Total with Router |
|---|---|---|---|---|---|
| Premier Internet | Up to 500 Mbps | Up to 20 Mbps | $50 / mo | $10 / mo | $60 / mo |
| Ultra Internet | Up to 750 Mbps | Up to 35 Mbps | $80 / mo | $10 / mo | $90 / mo |
| Gig Internet | Up to 1,000 Mbps | Up to 50 Mbps | $100 / mo | Included | $100 / mo |

Important Notes:
- 1 Gbps = 1,000 Mbps.
- Gig plan includes router fee in the training exercise.
- 2 Gig was mentioned in passing, but availability is location-dependent and no reliable pricing was given.
- These pricing figures represent historical training examples, NOT verified current live offers. Actual pricing, taxes, equipment fees, and promotional discounts must be verified in the CRM.`,
    keyPoints: [
      "Premier: up to 500/20 Mbps ($50 base + $10 router = $60/mo)",
      "Ultra: up to 750/35 Mbps ($80 base + $10 router = $90/mo)",
      "Gig: up to 1,000/50 Mbps ($100/mo, router described as included)",
      "1 Gbps = 1,000 Mbps",
      "Historical training examples - always check current CRM rate card"
    ],
    examples: "A customer wanting fast speeds for video conferencing and file sharing with 8 employees might be recommended Ultra (750 Mbps) or Gig (1,000 Mbps)."
  },
  {
    id: "d2-connection-technologies",
    day: "Day 2",
    category: "Network Technology",
    title: "Connection Types: Coaxial, Fiber Optic, HSC, and HFC",
    sourceReference: "Day 2 — Internet Connection Technologies",
    priority: 2,
    keywords: ["coax", "coaxial", "fiber", "fiber optic", "hsc", "high split coax", "hfc", "hybrid fiber coax", "symmetric", "asymmetric", "upload", "download"],
    content: `The training outlines four distinct network transport technologies:
1. Coaxial Cable: Copper-based last-mile infrastructure. Typically asymmetric speeds (e.g. 500 Mbps download vs 20 Mbps upload).
2. Fiber Optic: Transmits data pulses using light over glass strands. Delivers high-speed symmetric performance (equal download and upload speeds, e.g. 1000/1000 Mbps) with low latency.
3. High Split Coax (HSC): An upgrade to the coaxial network frequency spectrum, increasing upstream capacity to provide significantly higher or symmetric upload speeds over existing coax lines (location-dependent).
4. Hybrid Fiber-Coax (HFC): Fiber optic lines run to a neighborhood optical node, and coaxial cables distribute the signal the final distance to premises.

Key Definitions:
- Symmetric Speed: Equal advertised download and upload speeds (e.g. 500/500 Mbps).
- Asymmetric Speed: Unequal download and upload speeds (e.g. 500/20 Mbps).`,
    keyPoints: [
      "Coaxial: Copper-based, standard asymmetric speeds",
      "Fiber Optic: Light over glass, symmetric download/upload, enterprise grade",
      "HSC (High Split Coax): Coax spectrum upgrade for higher upload speeds",
      "HFC: Hybrid combining fiber backbone with coax distribution",
      "Never claim HFC is dedicated 100% fiber-to-the-premises"
    ],
    examples: "If a business uploads massive 4K video files or hosts live database backups, symmetric fiber or HSC is vastly superior to standard asymmetric coax."
  },
  {
    id: "d2-modem-router-hardware",
    day: "Day 2",
    category: "Hardware & Add-ons",
    title: "Modems, Routers, Extenders, and Static IPs",
    sourceReference: "Day 2 — Hardware & Equipment",
    priority: 2,
    keywords: ["modem", "router", "extender", "wi-fi", "wifi", "invincible wifi", "static ip", "ip address", "equipment"],
    content: `Hardware distinctions taught in Day 2:
- Modem: Demodulates signals from the service provider's physical access network (coax/fiber) into digital ethernet signals.
- Router: Routes data packets, assigns internal local IP addresses, and provides Wi-Fi wireless network distribution within the business.
- Wi-Fi Extender: Extends wireless network coverage into large spaces, dead zones, or multi-room facilities.
- Static IP Addresses: Fixed public IP addresses required for on-premise servers, VPNs, security cameras, or point-of-sale systems.
  Training Day 3 pricing examples:
  - 1 Static IP = $20 / month
  - Up to 5 Static IPs = $30 / month
  - Up to 13 Static IPs = $40 / month
- Invincible Wi-Fi: Mentioned as a backup-enabled Wi-Fi solution with battery/cellular failover; price and power-backup guarantees must be verified.`,
    keyPoints: [
      "Modem connects to provider; router distributes local Wi-Fi",
      "Static IP training example: 1 IP = $20, 5 IPs = $30, 13 IPs = $40",
      "Extenders expand wireless coverage in large facilities",
      "Hardware fees must be confirmed on approved pricing sheets"
    ],
    examples: "A restaurant with POS terminals and security cameras may need a router plus a block of 5 static IPs ($30/mo in training)."
  },
  {
    id: "d2-telephone-services",
    day: "Day 2",
    category: "Voice Services",
    title: "Spectrum Business Voice and VoIP",
    sourceReference: "Day 2 — Telephone Services",
    priority: 2,
    keywords: ["telephone", "voip", "landline", "voice", "phone lines", "voice over internet protocol", "$20"],
    content: `Spectrum Business telephone services utilize VoIP (Voice over Internet Protocol) alongside traditional landline telephony concepts.
- VoIP transmits voice calls as digital data packets over the broadband internet network.
- Training example price: $20 per telephone line per month.
- Bundling concept: In Spectrum training, all telephone lines together represent ONE single service category (PSU), regardless of whether the business purchases 1, 3, or 10 lines.`,
    keyPoints: [
      "VoIP = Voice over Internet Protocol",
      "Training example: $20/month per line",
      "Multiple phone lines count as 1 PSU (Voice category)",
      "Includes commercial calling features like call transfer, caller ID, and voicemail"
    ],
    examples: "If an office purchases 3 telephone lines, the monthly phone cost is 3 x $20 = $60/month, but it counts as 1 PSU towards bundling."
  },
  {
    id: "d2-tv-services-xumo",
    day: "Day 2",
    category: "Video Services",
    title: "Business Television and Xumo Streaming",
    sourceReference: "Day 2 — TV & Video Services",
    priority: 2,
    keywords: ["tv", "television", "xumo", "streaming", "cable", "set-top box", "hdmi"],
    content: `Training covers two primary business television formats:
1. Streaming TV (via apps and streaming media players).
2. Traditional Cable TV (via set-top boxes).

Xumo Streaming Player:
- An HDMI-connected streaming media device that delivers television programming over broadband internet without requiring traditional cable set-top box wiring.
- In the training recording, the trainer states an example rental fee of $5/month per Xumo player.
- Suitable for waiting rooms, fitness centers, and breakrooms.`,
    keyPoints: [
      "Two formats: Streaming TV and Traditional Cable TV",
      "Xumo = HDMI streaming device ($5/mo training example)",
      "Eliminates heavy coaxial set-top boxes in offices and lobbies",
      "Broadcast fees and channel tier availability must be verified in the CRM"
    ],
    examples: "A dental office lobby uses a Xumo streaming device ($5/mo) connected to an HDMI TV to display news and entertainment for waiting patients."
  },
  {
    id: "d2-psu-and-bundling",
    day: "Day 2",
    category: "Sales Architecture",
    title: "PSU (Primary Service Unit) and Bundling Rules",
    sourceReference: "Day 2 — Bundling and PSU",
    priority: 2,
    keywords: ["psu", "primary service unit", "bundling", "bundling rule", "service category", "double play", "triple play", "lines"],
    content: `PSU stands for Primary Service Unit (or Primary Selling Unit).
In Spectrum training, a PSU refers to a distinct core service category:
1. Internet = 1 PSU
2. Telephone = 1 PSU
3. Television = 1 PSU
4. Mobile = 1 PSU

Critical Bundling Rule:
- Bundling requires products from DIFFERENT service categories (e.g. Internet + Telephone = 2 PSUs, Double Play).
- Adding multiple units of the same category (e.g. 3 phone lines) still counts as only 1 PSU.
- A legitimate bundle must fulfill the customer's real business needs and receive proper consent. Never add unrequested services solely to meet a bundle quota.`,
    keyPoints: [
      "PSU = Primary Service Unit",
      "Internet (1 PSU), Phone (1 PSU), TV (1 PSU)",
      "Multiple phone lines = 1 PSU total",
      "Bundle = 2 or more distinct PSUs (e.g., Internet + Phone)",
      "Unwanted add-ons solely for commission are strictly prohibited"
    ],
    examples: "Customer buys Premier Internet + 2 Phone Lines. Total PSUs = 2 (Internet = 1 PSU, Phone lines = 1 PSU). Total price = $60 + (2 x $20) = $100/mo."
  },

  // ==========================================
  // DAY 3: SALES, BILLING & ETHICAL OPERATIONS
  // ==========================================
  {
    id: "d3-clear-sale-vs-alc",
    day: "Day 3",
    category: "Sales Terminology",
    title: "Clear Sale vs ALC (Already Customer)",
    sourceReference: "Day 3 — Types of Sales",
    priority: 2,
    keywords: ["clear sale", "alc", "already customer", "existing customer", "new customer", "switch", "porting"],
    content: `Key sales classifications defined in Day 3:
1. Clear Sale:
   - A sale to a customer or business that is NOT currently using Spectrum services at that location.
   - The customer is either opening a new location or switching from a competitor (e.g. AT&T, Comcast).
   - Considered a true new-acquisition sale.

2. ALC (Already Customer):
   - Refers to a customer who is ALREADY actively using Spectrum services.
   - They may be calling for an upgrade, adding phone lines, moving locations, or inquiring about billing.
   - ALC accounts require specific verification and handling rules. Existing accounts cannot be cancelled and re-created to disguise them as a Clear Sale.`,
    keyPoints: [
      "Clear Sale: New customer NOT currently on Spectrum (or switching from competitor)",
      "ALC: 'Already Customer' currently using Spectrum",
      "Crucial distinction for commission eligibility and order processing",
      "Never disguise an ALC customer as a Clear Sale"
    ],
    examples: "A bakery moving into a new building that previously used AT&T is a Clear Sale. A law firm adding a second phone line to their active Spectrum account is an ALC."
  },
  {
    id: "d3-alc-two-account-setup",
    day: "Day 3",
    category: "ALC Account Setup",
    title: "ALC 2-Account vs 1-Account Setup and Hierarchy Account",
    sourceReference: "Day 3 — ALC Account Structures",
    priority: 2,
    keywords: ["2 acc", "two accounts", "2 accounts", "alc 2 acc", "1 acc", "one account", "1 account", "hierarchy account", "master account", "control account", "second poc", "2nd poc", "hold"],
    content: `In Day 3 ALC (Already Customer) training, two account management structures are taught when existing customers face expiring promotional rates and high bills ($170+/mo):

1. Two-Account Setup (Why 2 Accounts are needed):
- Requirement: Used when the customer HAS existing business telephone lines that they MUST KEEP (business clients and marketing rely on that phone number).
- Old Account (~$50/mo): Retains the original landlines. Through retention, the internet is minimized and the monthly charge drops to the retention rake rate (~$50/mo).
- New Account (~$80/mo): Opened under a Second POC (different contact person, different email, different cell) to receive brand-new customer promotional pricing for high-speed internet ($80/mo bundle) with waived installation fees.
- Hierarchy Account (Merged after 3 Months): The customer pays both bills for 3 months, after which both accounts are consolidated into a Hierarchy / Master Account with one single bill (~$130/mo vs $170+ original).

2. One-Account Setup:
- Requirement: Used when the customer has ONLY internet / internet + TV, or does NOT need to keep their telephone numbers.
- A new account is opened under a Second POC, and the old account is placed on seasonal hold (for 3, 6, or 9 months) and later cancelled to avoid "rip-and-replace" violations.`,
    keyPoints: [
      "2-Account Setup: Must keep business telephone lines",
      "Old Account: Kept active for phone retention (~$50/mo)",
      "New Account: Fresh promotional internet under Second POC (~$80/mo)",
      "Hierarchy Account: Merges both accounts after 3 months into one bill (~$130/mo)",
      "1-Account Setup: Used when customer only has internet or does not need to keep phone lines"
    ],
    examples: "A liquor store paying $170/mo keeps their 10-year-old phone number on the old account ($50) and gets new 500 Mbps internet on a new account ($80) under the partner's name (2nd POC), merging them after 3 months into a hierarchy bill of $130."
  },
  {
    id: "d3-poc-point-of-contact",
    day: "Day 3",
    category: "Account Administration",
    title: "Point of Contact (POC) and Authorization",
    sourceReference: "Day 3 — Account Administration",
    priority: 2,
    keywords: ["poc", "point of contact", "authorized", "second poc", "identity", "consent", "authorization"],
    content: `POC stands for Point of Contact.
- Primary POC: The designated authorized person registered on the business account who has legal authority to modify services, order packages, approve bill changes, or cancel features.
- Second POC: An additional authorized representative added with the primary account holder's explicit consent to assist with management.
- Compliance Rule: A Second POC must never be used to falsify a customer identity, bypass credit restrictions, or create unauthorized duplicate accounts.`,
    keyPoints: [
      "POC = Point of Contact",
      "Only authorized POCs can authorize account changes or new services",
      "Second POC requires primary account holder's legitimate authorization",
      "Never impersonate a POC or use false identities"
    ],
    examples: "The business owner is the Primary POC; their office manager can be registered as the Second POC to coordinate technician visits."
  },
  {
    id: "d3-pricing-billing-calculations",
    day: "Day 3",
    category: "Billing Calculations",
    title: "Training Billing Calculation Exercises",
    sourceReference: "Day 3 — Billing Exercises",
    priority: 2,
    keywords: ["billing", "calculations", "mrc", "exercise", "premier with router", "phone line", "static ip", "$80", "$150", "$60"],
    content: `Historical training calculation exercises taught in Day 3:

Exercise 1: Premier Internet + Router + 1 Phone Line
- Premier Internet base: $50 / month
- Wi-Fi Router: $10 / month
- 1 Phone Line: $20 / month
- Total Calculation: $50 + $10 + $20 = $80 / month.

Exercise 2: Premier Internet + Router + 3 Phone Lines + 3 Static IPs
- Premier Internet with Router: $50 + $10 = $60 / month
- 3 Phone Lines: 3 x $20 = $60 / month
- Static IP tier (up to 5 IPs): $30 / month
- Total Calculation: $60 + $60 + $30 = $150 / month.

Disclaimer: These are historical training exercises. They exclude applicable local taxes, 911 fees, and regulatory surcharges. Current rates must always be verified in the CRM.`,
    keyPoints: [
      "Premier ($50) + Router ($10) + 1 Phone ($20) = $80/mo",
      "Premier ($60) + 3 Phones ($60) + 3 Static IPs ($30) = $150/mo",
      "MRC = Monthly Recurring Charge",
      "Always clarify that taxes, fees, and current rates require live CRM quote"
    ],
    examples: "When calculating a bill for a candidate exercise, always list each itemized line clearly before summing."
  },
  {
    id: "d3-operational-terms",
    day: "Day 3",
    category: "Operational Terminology",
    title: "MRC, Chargebacks, SOHO, and Account Terms",
    sourceReference: "Day 3 — Operational Terminology",
    priority: 2,
    keywords: ["mrc", "monthly recurring charge", "chargeback", "clawback", "soho", "pia", "payment in advance", "da approval", "rip-and-replace"],
    content: `Day 3 Operational and Account Terms:
- MRC: Monthly Recurring Charge — the fixed ongoing monthly subscription fee before variable usage, taxes, or one-time fees.
- Chargeback: A commission clawback or penalty imposed on a sales agent if an account cancels, defaults, or fails retention requirements within a specified period (e.g. 6 bill cycles mentioned in training recording).
- SOHO: Small Office / Home Office — approval classification allowing commercial business services at certain eligible residential properties.
- PIA: Payment in Advance — requirement where an initial payment is mandated before service activation (e.g. for specific credit profiles).
- Rip-and-Replace: The unauthorized practice of canceling an existing customer's account to open a new account under a different name purely to collect new-sale commission. This is strictly prohibited as a major compliance violation.`,
    keyPoints: [
      "MRC = Monthly Recurring Charge",
      "Chargeback = Commission clawback if customer cancels prematurely",
      "SOHO = Small Office / Home Office approval",
      "PIA = Payment in Advance",
      "Rip-and-replace is strictly forbidden"
    ],
    examples: "If a candidate cancels an active account to re-enter it as a Clear Sale, it triggers a severe audit flag for rip-and-replace."
  },
  {
    id: "d3-ethics-and-compliance",
    day: "Day 3",
    category: "Ethics & Compliance",
    title: "Ethical Selling, Customer Consent, and Compliance",
    sourceReference: "Day 3 — Compliance Guidelines",
    priority: 2,
    keywords: ["ethics", "compliance", "impersonation", "consent", "fraud", "passkey", "account number", "cancellation", "truth in selling"],
    content: `Vahlay Consulting and Spectrum compliance rules for all candidates:
1. No Customer Impersonation: Representatives must never pretend to be the customer, call other carriers claiming to be the account owner, or use synthetic identities.
2. Full Disclosure: Representatives must clearly disclose all active services, equipment charges, ongoing monthly rates, and cancellation procedures.
3. Protecting Sensitive Data: Never request, record, or store customer passkeys, full credit card numbers, or confidential passwords in training chats.
4. No Fabricated Promises: Do not guarantee promotional retention rates (such as a guaranteed $50 retention bill) unless backed by an official authorized quote.
5. Authorized Representative Channels: Only utilize official, authorized third-party verification procedures with explicit customer consent.`,
    keyPoints: [
      "Customer impersonation is illegal and strictly grounds for dismissal",
      "Full disclosure of all charges and terms is required",
      "Never collect real customer credentials in training",
      "Do not make unauthorized retention promises"
    ],
  },
  {
    id: "d2-internet-types-comparison",
    day: "Day 2",
    category: "Internet Types",
    title: "Internet Types: Fiber, Cable, and Wireless (Speeds & Stability)",
    sourceReference: "Day 2 — Internet Types: Fiber, Cable & Wireless",
    priority: 1,
    keywords: ["which internet type has high speed", "fastest internet", "internet type", "internet types", "connection types", "fiber", "cable", "coax", "wireless", "speeds", "high speed", "symmetric", "asymmetric"],
    content: `In US business telecom, three primary internet connection types are used:
1. Fiber Internet (Fastest & Most Stable):
   - Uses fiber-optic cables (thin glass strands) that transmit data via light signals.
   - Speeds: 500 Mbps, 1 Gbps, 2 Gbps and higher (offers symmetric upload and download speeds).
   - Best for high-usage businesses, multi-branch offices, continuous cloud backups, and intensive video conferencing.
   - Slightly more expensive; availability depends on fiber line deployment.
2. Cable Internet (Coaxial):
   - Uses copper coaxial cables (standard broadband cable network).
   - Speeds: 500 Mbps (Premier), 750 Mbps (Ultra), and 1,000 Mbps (Gig).
   - Widely available across the US, reliable for SMBs, and cost-effective. Asymmetric (higher download, standard upload).
3. Wireless Internet:
   - Uses cellular towers or fixed wireless antennas.
   - Ideal where physical fiber or cable infrastructure has not been deployed (rural/remote areas).`,
    keyPoints: [
      "Fiber is the fastest & most stable connection type (up to 2 Gbps+)",
      "Cable (Coaxial) is the most widely available across US businesses",
      "Wireless uses cellular towers where physical lines aren't present",
      "Fiber delivers symmetric speeds; Coaxial is typically asymmetric"
    ],
    examples: "If a candidate is asked 'Which internet type has high speed?', the correct answer is Fiber Internet because light signals through glass fiber optics offer 1 Gbps to 2 Gbps+ with symmetric uploads."
  },
  {
    id: "d2-installation-process",
    day: "Day 2",
    category: "Installation & Delivery",
    title: "Installation Process (Flow, Steps & Agent Role)",
    sourceReference: "Day 2 — 3.3 Installation Process",
    priority: 1,
    keywords: ["installation process", "installation flow", "installation", "install", "technician", "appointment", "truck roll", "schedule", "order submitted"],
    content: `3.3 Installation Process (Day 2 Training):
What installation means:
A professional technician visits the customer's business location to set up modem and router hardware, activate internet and telephone service, and verify the connection.

Typical 5-Step Installation Flow:
1. Order submitted: The sales representative enters and verifies the order in the portal.
2. Address verified: Exact street, directional, suffix, and suite/unit number are confirmed.
3. Technician assigned & Appointment scheduled: An authorized arrival date and time window are reserved.
4. Technician installs service: Field technician installs physical lines, tests modem/router, and ensures line stability.
5. Customer confirms completion: Business owner or authorized onsite contact signs off on working service.

Your Role as an Agent:
- Collect correct address (omitting suite numbers causes truck roll failures).
- Schedule correct time window with an authorized onsite contact.
- Follow up until completion to ensure customer satisfaction and protected commissions.`,
    keyPoints: [
      "5 Steps: Order submitted -> Address verified -> Technician assigned -> Technician installs -> Customer confirms",
      "Technician visits location to set up modem/router and activate service",
      "Agent must collect exact address and follow up until completion",
      "Never miss suite numbers to avoid 'customer not found' cancellation"
    ],
    examples: "If a candidate is asked 'What is the installation process?', explain the 5-step flow from order submission to technician install and customer completion sign-off."
  },
  {
    id: "d2-phone-porting",
    day: "Day 2",
    category: "Voice Services",
    title: "Phone Number Porting (Rules, LOA & Process)",
    sourceReference: "Day 2 — 4. Porting Phone Numbers",
    priority: 1,
    keywords: ["porting", "number porting", "port", "transfer number", "keep number", "loa", "letter of authorization"],
    content: `4. Porting Phone Numbers (Day 2 Training):
What porting means: Moving a customer's existing business telephone number to Spectrum without changing the number.

Why customers prefer porting:
- They don't want to change their established number.
- Their customers, marketing materials, and directories already know the number.
- Example: A restaurant in business for 10 years will almost always port their phone number.

Important Rules for Porting:
1. Never cancel the old phone service before porting finishes! Canceling early causes the carrier to release the number permanently.
2. The account number, billing address, and authorized name on the Letter of Authorization (LOA) must match the old carrier bill 100%.
3. Once the port activates on Spectrum, the old carrier automatically disconnects that line.`,
    keyPoints: [
      "Never cancel old phone service before porting completes",
      "LOA must match old carrier bill exactly",
      "Porting lets businesses keep established marketing numbers",
      "Old service disconnects automatically after port completion"
    ],
    examples: "A medical clinic switching to Spectrum keeps their 15-year-old phone number by submitting an LOA with their current AT&T billing copy."
  },
  {
    id: "d3-sales-flow-and-mistakes",
    day: "Day 3",
    category: "Sales Methodology",
    title: "Sales Flow & Critical Sales Mistakes to Avoid",
    sourceReference: "Day 3 — Sales Flow & Objection Handling",
    priority: 2,
    keywords: ["sales flow", "call flow", "sales mistakes", "greeting", "need analysis", "pitch", "close"],
    content: `Day 3 Sales Methodology:
The 6-Step Sales Flow:
1. Greeting: Calm, clear, steady tone; smile while speaking.
2. Need Analysis: Uncover business type, device count, and current speed bottlenecks.
3. Pitch: Recommend Premier, Ultra, or Gig tailored to their device count.
4. Objection Handling: Acknowledge concerns with empathy and validate business needs.
5. Close: Transparent pricing, price guarantee locks, and zero contracts.
6. Next Step: Schedule installation window and confirm authorized onsite contact.

Top Sales Mistakes to Avoid:
- Talking too much and interrupting the customer.
- Quoting price too early before diagnosing needs.
- Sounding desperate or pushing without understanding their operations.
- Ignoring objections instead of resolving them.`,
    keyPoints: [
      "6-Step Flow: Greeting -> Need Analysis -> Pitch -> Objections -> Close -> Next Step",
      "Diagnose needs and device count before quoting price",
      "Listen actively and avoid interrupting the client"
    ],
    examples: "If a customer asks 'How much is it?' in the first 10 seconds, deflect politely: 'I'll get you the exact price in just a moment; may I first check how many computers and POS machines your team is running?'"
  },
  {
    id: "d4-buyflow-qualification",
    day: "Day 4",
    category: "Order Qualification",
    title: "Buyflow & Service Qualification (Facilities & Address Validation)",
    sourceReference: "Day 4 — Buyflow & Service Qualification",
    priority: 2,
    keywords: ["buyflow", "service qualification", "address qualification", "fiber on-net", "fiber near-net", "high-split coax", "standard cable", "order flow", "day 4"],
    content: `Day 4 Buyflow & Service Qualification Principles:
1. Fundamental Rule: "Sell what is available, not what sounds good. Check first, quote second."
2. Network Facilities Qualified in the System:
   - Fiber On-Net: Building directly wired to fiber optic backbone. Instant gigabit speeds available.
   - Fiber Near-Net: Fiber runs nearby in street. Requires site survey and lateral construction.
   - High-Split Coax (HSC): Upgraded coaxial frequency delivering higher/symmetric upload bandwidth.
   - Standard Cable: Widespread coax DOCSIS network with high download and standard upload speeds.
3. Usage-Based Selling:
   - 1-3 devices (Small Retail/POS): 300 - 500 Mbps Premier.
   - 4-10 devices (Office/Clinic): 500 - 750 Mbps Ultra.
   - 10+ devices (Agency, heavy cloud, multiple POS, guest Wi-Fi): 1 Gbps+ Gig / Fiber.
4. Order Submission Workflow:
   - Address Qualification -> Plan Selection -> Customer Info & Authorized POC Verification -> Credit Check -> Equipment & Installation Scheduling -> Order Submission.`,
    keyPoints: [
      "Always qualify the exact address in the system before quoting rates",
      "Fiber On-Net is ready for instant gigabit deployment",
      "Fiber Near-Net requires survey and lateral construction",
      "Plan recommendation is based on device count and usage"
    ],
    examples: "A 10-person accounting firm running cloud backups needs at least Ultra (750 Mbps) or Gig (1,000 Mbps) with Fiber or HSC facilities."
  },
  {
    id: "d5-communication-accent",
    day: "Day 5",
    category: "Professional Communication",
    title: "Communication, Pace, Tone and Accent Neutralization",
    sourceReference: "Day 5 — Communication & Accent",
    priority: 2,
    keywords: ["communication", "accent", "tone", "pace", "active listening", "speaking", "day 5"],
    content: `Day 5 Core Principles on Communication & Accent:
1. Clarity over Speed: Representatives are not expected to sound American; they are expected to sound clear, calm, confident, and professional.
2. Pace and Tone: Speak at a moderate, steady tempo (130-150 words per minute). Smiling while speaking naturally warms the voice and establishes trust.
3. Eliminate Fillers: Avoid "umm", "like", "you know", and nervous repetition. Use brief pauses instead.
4. Active Listening: Acknowledge customer concerns before jumping into pitches ("I completely understand how important reliable internet is for your POS terminals...").`,
    keyPoints: [
      "Focus on clarity and calm confidence, not faking an accent",
      "Maintain a 130-150 WPM pacing with clear pronunciation",
      "Smiling while speaking audibly improves vocal tone",
      "Use active listening before offering solutions"
    ],
    examples: "When a customer expresses frustration with slow internet, validate their concern first before introducing Spectrum Ultra or Gig tiers."
  },
  {
    id: "d6-targets-performance",
    day: "Day 6",
    category: "Performance & QA",
    title: "Targets, Discipline, QA Metrics and Bundling Conversion",
    sourceReference: "Day 6 — Targets & Performance",
    priority: 2,
    keywords: ["targets", "discipline", "qa", "performance", "metrics", "talk time", "conversion", "bundling test", "day 6"],
    content: `Day 6 Expectations, Performance Metrics & QA:
1. Talk Time & Activity Targets: Maintain focused dialer activity, achieving daily connected talk time targets and efficient wrap-up times.
2. Conversion Metrics: Target consistent bundling conversions (Double Play and Triple Play) rather than single-product orders.
3. QA Scoring Criteria: Greeting -> Need Analysis -> Professional Pitch -> Transparent Pricing & Disclosure -> Rebuttal Handling -> Compliant Close.
4. Zero Tolerance: Slamming (adding unauthorized lines) and rip-and-replace (faking new accounts) result in immediate termination.`,
    keyPoints: [
      "Daily talk time benchmarks must be maintained consistently",
      "Bundles (2+ distinct PSUs) yield higher commissions and customer retention",
      "QA audits call recordings for full disclosure and customer authorization",
      "Zero tolerance for slamming or account manipulation"
    ],
    examples: "An order with Internet + Voice is verified by QA for clear disclosure of monthly rates and customer consent."
  },
  {
    id: "d7-live-call-observation",
    day: "Day 7",
    category: "Call Handling",
    title: "Live Call Observation and Real-World Call Handling",
    sourceReference: "Day 7 — Live Call Observation",
    priority: 2,
    keywords: ["live call", "observation", "shadowing", "objection handling", "call control", "day 7"],
    content: `Day 7 Real-World Preparation & Shadowing:
1. Live Observation: Trainees listen to top-performing agents handling actual business calls.
2. Call Control: Maintaining professional direction of the call without interrupting the customer.
3. Handling Hesitation: When a business owner says "I'm busy", offer a quick 30-second value statement: "I respect your time; we're just verifying current speed rates for businesses on [Street Name]."
4. Rebuttal Delivery: Deliver price and term objections with confidence, emphasizing 99.9% network reliability, no contracts, and 30-day money-back guarantee.`,
    keyPoints: [
      "Shadow experienced reps to learn natural transition phrases",
      "Acknowledge busy owners respectfully with concise 30-second value hooks",
      "Maintain calm control and never argue with a customer",
      "Rely on verified product benefits: 99.9% reliability, no contracts"
    ],
    examples: "When an owner says 'We're happy with AT&T', the agent asks 'What speed are they currently delivering for you on your billing cycle?' to uncover bottlenecks."
  },
  {
    id: "d8-tools-final-assessment",
    day: "Day 8",
    category: "Tools & Certification",
    title: "Operations Tools, CRM, Order Tracking and Final Assessment",
    sourceReference: "Day 8 — Operations Tools & Assessment",
    priority: 2,
    keywords: ["operations tools", "order tracker", "crm", "final assessment", "billing system", "certification", "day 8"],
    content: `Day 8 Operations Tools & Certification:
1. CRM & Lead Management: Proper dispositioning of every call (e.g., Interested, Callback, Not Serviceable, Follow-up Scheduled).
2. Order Tracking: Monitoring order status through qualification, credit approval, porting approval, and technician installation.
3. Final Assessment: Comprehensive evaluation covering Day 1 to Day 8 topics, requiring an 80%+ passing score to graduate to floor operations.`,
    keyPoints: [
      "Every call must receive an accurate CRM disposition",
      "Order tracking monitors the deal from qualification to technician install",
      "Passing score of 80%+ is required on the final certification exam"
    ],
    examples: "Following up on a porting request in the Order Tracker ensures the customer's phone numbers transfer smoothly without downtime."
  },
  {
    id: "playbook-wib-voice-mobile",
    day: "Playbook",
    category: "Product Suite",
    title: "Wireless Internet Backup (WIB), 35+ Voice Features & 5G Mobile",
    sourceReference: "Selling Partner Playbook — Core Products",
    priority: 2,
    keywords: ["wib", "wireless internet backup", "auto attendant", "hunt group", "mobile", "voice features", "playbook"],
    content: `Selling Partner Playbook Highlights:
1. WIB (Wireless Internet Backup):
   - Keeps business POS systems and critical operations online during power or fiber/coaxial cuts via automatic cellular failover.
   - Provides up to 8 hours of battery backup.
2. Business Voice (Over 35 Features):
   - Auto Attendant (virtual receptionist with automated greeting and routing).
   - Hunt Groups (rings multiple lines simultaneously or round-robin until answered).
   - Voicemail-to-email transcription and call forwarding.
3. Spectrum Business Mobile:
   - Nationwide 5G coverage + access to millions of secure Spectrum Wi-Fi hotspots.
   - Unlimited data lines starting at $29.99/line, with no contracts.`,
    keyPoints: [
      "WIB ensures POS and credit card processing survive power/internet cuts",
      "Auto Attendant and Hunt Groups are free built-in business voice features",
      "Spectrum Mobile offers flexible unlimited lines on 5G network"
    ],
    examples: "A busy retail restaurant uses WIB so that customer credit card transactions never fail during a storm or cable outage."
  },
  {
    id: "spectrum-price-guarantees",
    day: "Spectrum Business",
    category: "Pricing Guarantees",
    title: "Spectrum Price Guarantees (1-Yr, 2-Yr, 3-Yr) and Contract Buyout",
    sourceReference: "Spectrum Business — Price Guarantees & Acquisition",
    priority: 2,
    keywords: ["price guarantee", "1-year price guarantee", "2-year price guarantee", "3-year price guarantee", "contract buyout", "guarantee"],
    content: `Spectrum Business Price Guarantees & Contract Buyout:
1. Price Guarantees:
   - 1-Year Price Guarantee: Standard with Internet Premier.
   - 2-Year Price Guarantee: Internet Ultra or Gig + at least 1 Core Line of Business (e.g., Voice or Mobile).
   - 3-Year Price Guarantee: Internet Ultra or Gig + Voice + Paid Mobile Line.
   - Guarantees lock the promotional monthly rate with NO long-term contract requirement.
2. Contract Buyout:
   - Spectrum offers up to $500 to buy out early termination fees (ETFs) for businesses switching from competitors like AT&T, Comcast, or Verizon.`,
    keyPoints: [
      "Premier always has a 1-Year Price Guarantee",
      "Ultra/Gig + 1 Core Line qualifies for 2-Year Price Guarantee",
      "Ultra/Gig + Voice + Paid Mobile qualifies for 3-Year Price Guarantee",
      "Contract Buyout pays up to $500 of competitor termination fees"
    ],
    examples: "A business locked in an AT&T contract can receive up to $500 in buyout assistance to switch to Spectrum Ultra with a 2-Year Price Guarantee."
  }
];

// Pre-verified FAQ dataset from Spectrum_Chatbot_Candidate_FAQ.jsonl
export const VERIFIED_FAQS = [
  { id: "Q01", day: "Day 1", question: "What is an ISP?", answer: "Internet Service Provider, a company that provides internet access; some also provide phone, TV and mobile services. *(Day 1)*" },
  { id: "Q02", day: "Day 1", question: "What does the team mainly learn to sell?", answer: "Spectrum Business services, primarily internet, telephone and TV, according to the trainer. *(Days 1–2)*" },
  { id: "Q03", day: "Day 1", question: "What is the correct US address order?", answer: "Street address, city, state and ZIP code. *(Day 1)*" },
  { id: "Q04", day: "Day 1", question: "What do St, Ave, Blvd and CA stand for?", answer: "Street, Avenue, Boulevard and California. *(Day 1)*" },
  { id: "Q05", day: "Day 1", question: "Name the four main contiguous-US time-zone groups taught.", answer: "Eastern, Central, Mountain and Pacific. Other US time zones and daylight-saving exceptions also exist. *(Day 1)*" },
  { id: "Q06", day: "Day 1", question: "If Eastern time is 5 PM, what is Pacific time in the trainer's example?", answer: "2 PM (the example assumes the common three-hour offset). *(Day 1)*" },
  { id: "Q07", day: "Day 1", question: "How many digits are in a normal US telephone number?", answer: "Ten, including a three-digit area code. *(Day 1)*" },
  { id: "Q08", day: "Day 1", question: "What if a person gives only seven digits?", answer: "Ask for and verify the area code rather than guessing it from the ZIP code. *(Day 1)*" },
  { id: "Q09", day: "Day 2", question: "What is SMB?", answer: "Small or medium-sized business. *(Day 2)*" },
  { id: "Q10", day: "Day 2", question: "What are the three main internet plans in the recording?", answer: "Premier, Ultra and Gig. These are historical training examples; confirm current plans. *(Day 2)*" },
  { id: "Q11", day: "Day 2", question: "What are the speeds listed for Premier?", answer: "Up to 500 Mbps download and 20 Mbps upload in the recorded regular-coax example. *(Day 2)*" },
  { id: "Q12", day: "Day 2", question: "How much did the trainer list for Premier with a router?", answer: "$50 plan + $10 router = $60 monthly, excluding other charges and only as a training example. *(Day 2)*" },
  { id: "Q13", day: "Day 2", question: "What are the stated Ultra speeds and monthly example?", answer: "Up to 750/35 Mbps; $80 base plus $10 router = $90 in the recording. *(Day 2)*" },
  { id: "Q14", day: "Day 2", question: "What are the stated Gig speeds and training price?", answer: "Up to 1,000/50 Mbps, at $100 monthly in the example, with router and installation described as included. Do not promise these as current terms. *(Day 2)*" },
  { id: "Q15", day: "Day 2", question: "Is 2 Gig available everywhere?", answer: "No; the trainer says availability is location-dependent. The notes give no reliable 2 Gig price. *(Day 2)*" },
  { id: "Q16", day: "Day 2", question: "How many Mbps are in 1 Gbps?", answer: "1,000 megabits per second. *(Day 2, corrected unit notation)*" },
  { id: "Q17", day: "Day 2", question: "What is the difference between download and upload?", answer: "Download receives data from the network; upload sends data to the network. *(Day 2 concept)*" },
  { id: "Q18", day: "Day 2", question: "What is symmetric speed?", answer: "The advertised download and upload speeds are equal. *(Day 2)*" },
  { id: "Q19", day: "Day 2", question: "What is HSC?", answer: "High Split Coax, an upgrade to coax network capacity that may offer improved upload speeds; location-dependent. *(Day 2)*" },
  { id: "Q20", day: "Day 2", question: "What is HFC?", answer: "Hybrid Fiber-Coax: fiber and coax combined in the access network. *(Day 2)*" },
  { id: "Q21", day: "Day 2", question: "What is the difference between a modem and router?", answer: "The modem connects to the provider network; the router manages and distributes local network connectivity. *(Day 2)*" },
  { id: "Q22", day: "Day 2", question: "What is an extender?", answer: "Equipment intended to extend Wi-Fi coverage. *(Day 2)*" },
  { id: "Q23", day: "Day 2", question: "What is Xumo in the recording?", answer: "An HDMI-connected streaming device; the trainer says $5 monthly as an example. *(Day 2)*" },
  { id: "Q24", day: "Day 2", question: "What are the two TV formats taught?", answer: "Streaming TV and cable/set-top-box TV. *(Day 2)*" },
  { id: "Q25", day: "Day 2", question: "What is a PSU?", answer: "Primary Selling/Service Unit, referring to a main category such as internet, phone or TV in the recording. *(Day 2)*" },
  { id: "Q26", day: "Day 2", question: "Do three telephone lines count as three different PSU categories?", answer: "No. The recording counts telephone as one category regardless of line count. *(Day 2)*" },
  { id: "Q27", day: "Day 2", question: "What does the trainer's “bundling rule” mean?", answer: "The discussed program counted two different service categories for a sale. It is not verified as a general Spectrum policy and does not authorize an unwanted add-on. *(Day 2)*" },
  { id: "Q28", day: "Day 3", question: "What does POC stand for?", answer: "Point of Contact: the authorized person and approved channels for business-account communication. *(Day 3)*" },
  { id: "Q29", day: "Day 3", question: "What is a clear sale?", answer: "A sale to someone not currently using Spectrum who may switch from another provider. *(Day 3)*" },
  { id: "Q30", day: "Day 3", question: "What does ALC mean in these notes?", answer: "“Already customer,” or an existing Spectrum customer, as the trainer uses it. *(Day 3)*" },
  { id: "Q31", day: "Day 3", question: "What is triple play?", answer: "Internet, telephone and TV together. *(Day 3)*" },
  { id: "Q32", day: "Day 3", question: "What is the recorded example price for three phone lines?", answer: "3 × $20 = $60 per month before other charges, as a historical example. *(Day 3)*" },
  { id: "Q33", day: "Day 3", question: "What is the recorded price exercise for three telephone lines, Premier with router and three static IPs?", answer: "$60 + $60 + $30 = **$150/month** as a training exercise, before taxes/fees and current availability checks. *(Day 3)*" },
  { id: "Q34", day: "Day 3", question: "Why might a bill increase after a promotional period?", answer: "A promotional discount may end or change; always check the customer's actual offer and bill. *(Day 3)*" },
  { id: "Q35", day: "Day 3", question: "What does MRC stand for?", answer: "Monthly Recurring Charge. *(Day 3)*" },
  { id: "Q36", day: "Day 3", question: "What is a chargeback?", answer: "A commission clawback or penalty for a sale that fails contract conditions. The recording's six-bill/two-times-MRC details require verification. *(Day 3)*" },
  { id: "Q37", day: "Day 3", question: "What is rip-and-replace?", answer: "Improper replacement of an existing account merely to create a new sale; the training identifies it as a red flag. *(Day 3)*" },
  { id: "Q38", day: "Day 3", question: "What does SOHO mean?", answer: "Small Office / Home Office; an approval concept for business service at certain residential addresses. *(Day 3)*" },
  { id: "Q39", day: "Day 3", question: "What does PIA mean?", answer: "Payment in Advance; a potential account-processing requirement that must be verified through approved channels. *(Day 3)*" },
  { id: "Q40", day: "Day 3", question: "What is DA approval?", answer: "The transcript refers to additional account-processing approval but is inconsistent on the acronym's expansion. Exact meaning/current policy is not confirmed. *(Day 3)*" },
  { id: "Q41", day: "Day 3", question: "What is a second POC?", answer: "Another genuinely authorized person on the account. It must not be used to disguise a duplicate account or customer identity. *(Day 3)*" },
  { id: "Q42", day: "Day 3", question: "Can a seller guarantee a customer a $50 retention bill?", answer: "No. This was an example in the recording, not a verified offer. Only an approved quote or retention representative can confirm terms. *(Day 3)*" },
  { id: "Q43", day: "Day 3", question: "Should trainees tell a customer that an old internet service was cancelled if it remains active?", answer: "No. Clearly disclose every active service, ongoing charge and cancellation status. *(Day 3 compliance caution)*" },
  { id: "Q44", day: "Day 3", question: "Can a representative pretend to be the account holder to negotiate a bill?", answer: "No. Use authorized representative procedures and genuine customer consent; do not impersonate someone else. *(Day 3 compliance caution)*" },
  { id: "Q45", day: "Day 2", question: "How should a trainee verify whether Spectrum service is available?", answer: "Use the approved coverage/CRM workflow with the correctly confirmed service address; a training example is not evidence of live availability. *(Day 2)*" },
  { id: "Q46", day: "Day 1", question: "Does this document cover four days?", answer: "No. Only Day 1, Day 2 and Day 3 are included in the initial transcription. *(Source document)*" },
  { id: "Q47", day: "Day 2", question: "Which internet type has high speed?", answer: "Fiber Internet is the highest speed internet type (500 Mbps, 1 Gbps, up to 2 Gbps+), using light signals through glass optic cables with symmetrical upload and download. *(Day 2 — Internet Types)*" },
  { id: "Q48", day: "Day 2", question: "What are the three main types of internet connections?", answer: "Fiber (fastest & most stable, light over glass), Cable (coaxial copper, widely available across US), and Wireless (cellular towers for remote areas). *(Day 2 — Internet Types)*" },
  { id: "Q49", day: "Day 4", question: "What is Fiber On-Net vs Near-Net?", answer: "Fiber On-Net means the building is directly wired to the fiber backbone for instant gigabit service. Near-Net means fiber is nearby in the street and requires a site survey and lateral construction. *(Day 4 — Service Qualification)*" },
  { id: "Q50", day: "Day 4", question: "What is High-Split Coax (HSC)?", answer: "An upgraded coaxial network frequency that provides significantly higher or symmetrical upload bandwidth over existing coaxial cables. *(Day 4 — Service Qualification)*" },
  { id: "Q51", day: "Playbook", question: "What is WIB?", answer: "Wireless Internet Backup: automatic cellular failover equipment that keeps credit card machines and POS systems active during power or cable outages. *(Selling Partner Playbook)*" },
  { id: "Q52", day: "Spectrum Business", question: "What bundles qualify for a 2-Year or 3-Year Price Guarantee?", answer: "Ultra or Gig + 1 Core Line qualifies for a 2-Year PG; Ultra or Gig + Voice + Paid Mobile Line qualifies for a 3-Year PG. Premier always has a 1-Year PG. *(Spectrum Business)*" },
  { id: "Q53", day: "Spectrum Business", question: "What is the Spectrum Contract Buyout amount?", answer: "Spectrum offers up to $500 contract buyout for early termination fees when switching from qualifying competitors. *(Spectrum Business)*" },
  { id: "Q54", day: "Playbook", question: "What are Auto Attendant and Hunt Groups?", answer: "Auto Attendant is an automated virtual receptionist that routes callers via touch-tone menus. Hunt Groups ring multiple phones simultaneously or sequentially until someone answers. *(Selling Partner Playbook)*" },
  { id: "Q55", day: "Day 5", question: "What is the expected speaking pace in training?", answer: "A calm, steady pace of 130–150 words per minute with clear pronunciation, avoiding rushing or filler words. *(Day 5 — Communication)*" },
  { id: "Q56", day: "Day 6", question: "What is slamming?", answer: "Adding unauthorized lines or products to a customer's account without their explicit consent. Slamming is strictly illegal and grounds for immediate dismissal. *(Day 6 — QA & Ethics)*" },
  { id: "Q57", day: "Day 3", question: "Why do we need 2 accounts for ALC?", answer: "We need 2 accounts for ALC when an existing customer must keep their vital business landline numbers. The old account stays active to preserve the phone lines at retention rates (~$50/mo), while a new account is created under a Second POC for promotional internet (~$80/mo). After 3 months, both accounts merge into a single Hierarchy Account (~$130/mo vs $170+ original). *(Day 3 — ALC Account Setup)*" },
  { id: "Q58", day: "Day 3", question: "What are the common floor short forms (TN, CX, CK, SVCS)?", answer: "**TN** = Telephone (Telephone line / number), **CX** = Customer, **CK** = Check (verify / inspect), and **SVCS** = Services (Internet, Phone, TV, Mobile). *(Floor Standards)*" },
  { id: "Q59", day: "Day 3", question: "What is telephone pricing for Clear Sales?", answer: "For Clear Sales (new customers), telephone service is **$20/month per line** (e.g., 1 TN = $20, 2 TN = $40, 3 TN = $60). *(Day 3 — Telephone Pricing)*" },
  { id: "Q60", day: "Day 3", question: "What is telephone pricing for ALC (existing customers)?", answer: "For ALC (Already Customer): **1st TN = $50/mo**, and **each add-on TN adds $30/mo** (e.g., 1 TN = $50, 2 TN = $80, 3 TN = $110, 4 TN = $140, 5 TN = $170). Formula: **$50 + (N - 1) × $30/mo**. *(Day 3 — Telephone Pricing)*" },
  { id: "Q61", day: "Day 3", question: "What does 'CK CX SVCS' mean?", answer: "'CK CX SVCS' is call-center shorthand for **'Check Customer Services'** — reviewing the customer's current billing profile, telephone lines, and internet tier in the CRM. *(Floor Standards)*" }
];
