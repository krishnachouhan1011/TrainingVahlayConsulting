/**
 * Vahlay AI Training Assistant - Topic Learning Curriculum (Mode B)
 * Structured curriculum for Day 1, Day 2, and Day 3.
 */

export const TOPIC_CURRICULUM = [
  // ==========================================
  // DAY 1 — SPECTRUM AND ISP FUNDAMENTALS
  // ==========================================
  {
    id: "day1-isp",
    day: "Day 1",
    dayTitle: "Day 1: Fundamentals",
    category: "ISP Fundamentals",
    title: "What is an ISP & Spectrum Context",
    shortDescription: "Understand the role of Internet Service Providers and Spectrum Business operations.",
    introduction: "In this opening module, candidates learn the foundational role of an Internet Service Provider (ISP) and the specific business environment at Vahlay Consulting supporting Spectrum Business.",
    definitions: [
      { term: "ISP", meaning: "Internet Service Provider — a company providing telecommunication, broadband internet, voice, and media services to consumers and businesses." },
      { term: "SMB", meaning: "Small and Medium-sized Business — commercial enterprises with roughly 2 to 20+ employees." },
      { term: "Spectrum Business", meaning: "The commercial enterprise and SMB telecommunications division of Charter Communications." }
    ],
    explanation: `An ISP builds and maintains physical communication infrastructure (fiber optic cables, coaxial lines, wireless hubs, and routing centers) that links customer premises to the global internet.
As a representative supporting Spectrum Business, your primary objective is helping business customers evaluate, configure, and install commercial internet, phone, and television services.
Key competitors discussed in training include AT&T, Comcast (Xfinity), T-Mobile, and Verizon. You must understand competitor differences to highlight Spectrum's strengths, such as contract-free options and reliable commercial support.`,
    trainingExample: "A local law office or dental clinic contacts Spectrum Business to replace an unreliable DSL provider with high-speed broadband and dedicated voice lines.",
    importantPoints: [
      "ISP = Internet Service Provider",
      "Focus is on Small and Medium Businesses (SMBs)",
      "Main services: Internet, Phone (VoIP), TV, and Mobile",
      "Major competitors: AT&T, Comcast, Verizon, T-Mobile"
    ],
    revisionQuestions: [
      {
        question: "What does the abbreviation ISP stand for?",
        answer: "Internet Service Provider."
      },
      {
        question: "What are the primary commercial services that the team learns to sell?",
        answer: "Business Internet, Business Telephone (VoIP), and Business Television (Streaming/Cable)."
      },
      {
        question: "Name three major competitor ISPs mentioned in the training recording.",
        answer: "AT&T, Comcast, and T-Mobile (or Verizon)."
      }
    ],
    simplifiedExplanation: "An ISP is like the water or electric utility company, but for digital data. Without an ISP, a computer or office cannot connect to websites, send emails, or process online payments. Spectrum Business is the company supplying this pipeline to companies.",
    alternateExample: "Imagine an auto repair shop with 5 mechanics. They need internet to look up car parts and a credit card terminal, plus 2 phone lines for customer appointments. Spectrum acts as their ISP providing that full connection."
  },
  {
    id: "day1-address",
    day: "Day 1",
    dayTitle: "Day 1: Fundamentals",
    category: "US Standards",
    title: "US Business Address Formats & Abbreviations",
    shortDescription: "Master the 4-part US postal address format and essential street suffix abbreviations.",
    introduction: "Accurate address capture is essential for determining serviceability in the internal CRM. An incorrectly entered address will prevent the system from returning valid quotes.",
    definitions: [
      { term: "Street Address", meaning: "The physical building number and named thoroughfare where service is to be installed." },
      { term: "Street Suffix", meaning: "Standardized postal abbreviation specifying the road type (e.g., St, Ave, Blvd)." },
      { term: "ZIP Code", meaning: "Zone Improvement Plan code — 5-digit numerical code used by USPS and telecom CRMs." }
    ],
    explanation: `US addresses follow a strict sequential hierarchy:
1. Street Address: Building number followed by street name and suffix (e.g., 1031 Main Ave).
2. City: Municipality or town name (e.g., Pasadena).
3. State: Two-letter capitalized abbreviation (e.g., CA for California).
4. ZIP Code: Five-digit postal code (e.g., 38517).

Common Street Suffixes:
- St = Street
- Ave = Avenue
- Blvd = Boulevard
- Rd = Road | Dr = Drive | Ln = Lane | Pkwy = Parkway

In the CRM, Street Address and ZIP Code are the primary query fields used to verify serviceability and determine available speeds.`,
    trainingExample: "Trainer's illustrative example: '1031 Main Ave, Pasadena, CA 38517'.",
    importantPoints: [
      "Strict sequence: Street Address -> City -> State -> ZIP Code",
      "St = Street, Ave = Avenue, Blvd = Boulevard",
      "ZIP code and street name are mandatory for CRM coverage queries",
      "Never invert city and state or omit the street suffix in official orders"
    ],
    revisionQuestions: [
      {
        question: "What are the four components of a standard US address in correct sequence?",
        answer: "Street Address -> City -> State -> ZIP Code."
      },
      {
        question: "What do the standard abbreviations 'Ave', 'Blvd', and 'CA' represent?",
        answer: "Avenue, Boulevard, and California."
      },
      {
        question: "Which two fields are primarily entered in the CRM to execute a coverage check?",
        answer: "The Street Address and the ZIP Code."
      }
    ],
    simplifiedExplanation: "Think of an address as a funnel starting from the specific door number, to the street name, then the city, state, and finally the postal ZIP code. If any part of the funnel is missing, Spectrum's technicians won't know where to install the cable.",
    alternateExample: "If a business owner says 'We are on 450 Washington in Seattle', you must ask: 'Is that Washington Street, Washington Avenue, or Washington Boulevard, and what is your 5-digit ZIP code?'"
  },
  {
    id: "day1-timezones-phone",
    day: "Day 1",
    dayTitle: "Day 1: Fundamentals",
    category: "US Standards",
    title: "US Time Zones & Telephone Numbering",
    shortDescription: "Understand contiguous US time zones, hour offsets, and 10-digit telephone structures.",
    introduction: "Coordinating with clients across the United States requires managing regional time differences and validating 10-digit phone numbers with area codes.",
    definitions: [
      { term: "Contiguous Time Zones", meaning: "The 4 main time zones covering the lower 48 states: Eastern, Central, Mountain, and Pacific." },
      { term: "Area Code", meaning: "The initial 3-digit prefix identifying the geographic telephone routing zone in the North American Numbering Plan." },
      { term: "Central Office Code", meaning: "The middle 3 digits of a 10-digit telephone number (often called exchange code)." }
    ],
    explanation: `Contiguous US Time Zones (from East to West):
1. Eastern Time (ET) — Reference baseline (e.g. 5:00 PM)
2. Central Time (CT) — 1 hour behind ET (4:00 PM)
3. Mountain Time (MT) — 2 hours behind ET (3:00 PM)
4. Pacific Time (PT) — 3 hours behind ET (2:00 PM)

Telephone Number Structure (10 Digits):
Format: AAA - BBB - CCCC
- AAA = Area Code (3 digits)
- BBB = Exchange / Provider Code (3 digits)
- CCCC = Subscriber Number (4 digits)

Important Protocol: If a customer gives a 7-digit number (e.g. 555-1234), you must explicitly request their 3-digit Area Code. Never guess the area code from their ZIP code.`,
    trainingExample: "If it is 5:00 PM in New York (Eastern), it is 4:00 PM in Chicago (Central), 3:00 PM in Denver (Mountain), and 2:00 PM in Los Angeles (Pacific).",
    importantPoints: [
      "4 main time zones: Eastern, Central, Mountain, Pacific",
      "Time offset: ET (-0h), CT (-1h), MT (-2h), PT (-3h)",
      "Standard US numbers are 10 digits with a 3-digit area code",
      "Factual correction: The US has 50 states (not 52)"
    ],
    revisionQuestions: [
      {
        question: "When it is 3:00 PM Central Time, what time is it in Pacific Time?",
        answer: "1:00 PM Pacific Time (Pacific is 2 hours behind Central)."
      },
      {
        question: "How many digits are in a standard US local telephone number?",
        answer: "10 digits, formatted as AAA-BBB-CCCC."
      },
      {
        question: "What should you do if a customer gives only seven digits for their phone number?",
        answer: "Ask for and verify the 3-digit Area Code directly rather than guessing."
      }
    ],
    simplifiedExplanation: "The United States is so wide that the sun sets 3 hours earlier on the East Coast than the West Coast. That's why time zones exist. And because millions of phones exist, every phone number needs a 3-digit neighborhood code called an Area Code.",
    alternateExample: "If you want to call a bakery in Los Angeles, California at 9:00 AM New York time, the bakery is still closed because it is only 6:00 AM over there!"
  },

  // ==========================================
  // DAY 2 — SPECTRUM PRODUCTS AND SERVICES
  // ==========================================
  {
    id: "day2-internet-packages",
    day: "Day 2",
    dayTitle: "Day 2: Products & Services",
    category: "Internet Packages",
    title: "Spectrum Internet Packages & Speeds",
    shortDescription: "Detailed study of Premier, Ultra, and Gig business tiers and speed ratings.",
    introduction: "Internet is the core anchor product (1 PSU) for Spectrum Business. Candidates must master package names, speed ratings, and training calculation figures.",
    definitions: [
      { term: "Mbps", meaning: "Megabits per second — standard unit for measuring internet data transfer rates." },
      { term: "Gbps", meaning: "Gigabits per second — equivalent to 1,000 Mbps." },
      { term: "Download Speed", meaning: "The rate at which data travels from the internet to the customer's devices." },
      { term: "Upload Speed", meaning: "The rate at which data travels from the customer's local network to the internet." }
    ],
    explanation: `Historical training packages over standard coaxial connection:
1. Premier Internet:
   - Download Speed: Up to 500 Mbps
   - Upload Speed: Up to 20 Mbps (standard coax)
   - Training Base Price: $50 / month
   - Optional Wi-Fi Router: $10 / month (Total: $60 / month)

2. Ultra Internet:
   - Download Speed: Up to 750 Mbps
   - Upload Speed: Up to 35 Mbps
   - Training Base Price: $80 / month
   - Optional Wi-Fi Router: $10 / month (Total: $90 / month)

3. Gig Internet (1 Gig):
   - Download Speed: Up to 1,000 Mbps (1 Gbps)
   - Upload Speed: Up to 50 Mbps (standard coax)
   - Training Price: $100 / month (Router included in training exercise)

Important: These figures represent historical training examples, NOT guaranteed live quotes. Current pricing, taxes, and availability must be checked in the CRM.`,
    trainingExample: "A boutique retail shop with 3 credit card terminals selects Premier (500 Mbps) with a router for $60/month in training calculations.",
    importantPoints: [
      "Premier: up to 500/20 Mbps ($50 base, $60 with router)",
      "Ultra: up to 750/35 Mbps ($80 base, $90 with router)",
      "Gig: up to 1,000/50 Mbps ($100 with router included)",
      "1 Gbps = 1,000 Mbps",
      "Historical training examples — always verify current rate cards"
    ],
    revisionQuestions: [
      {
        question: "What are the advertised download and upload speeds for the Premier plan in the training notes?",
        answer: "Up to 500 Mbps download and up to 20 Mbps upload (on standard coax)."
      },
      {
        question: "How much is the total training example price for Premier Internet including a Wi-Fi router?",
        answer: "$50 (base) + $10 (router) = $60 per month."
      },
      {
        question: "How many megabits per second (Mbps) equal one gigabit per second (1 Gbps)?",
        answer: "1,000 Mbps."
      }
    ],
    simplifiedExplanation: "Download speed is like water flowing out of a faucet into your sink — it lets you stream video and load web pages. Upload speed is how fast you pump water back out — like sending emails or security footage. Premier is 500 Mbps, Ultra is 750 Mbps, and Gig is 1,000 Mbps.",
    alternateExample: "A digital photo studio sending massive client albums will need Ultra (35 Mbps upload) or Gig (50 Mbps upload) rather than Premier, to avoid waiting hours for files to upload."
  },
  {
    id: "day2-network-tech",
    day: "Day 2",
    dayTitle: "Day 2: Products & Services",
    category: "Network Technology",
    title: "Connection Types: Coax, Fiber, HSC & Hardware",
    shortDescription: "Compare coaxial cable, optical fiber, High Split Coax, modems, and routers.",
    introduction: "Spectrum utilizes different network physical mediums depending on geography and business infrastructure requirements.",
    definitions: [
      { term: "Coaxial Cable", meaning: "Traditional copper-shielded cabling delivering high-speed asymmetric internet." },
      { term: "Fiber Optic", meaning: "Glass strands transmitting light pulses, offering ultra-fast symmetric speeds and low latency." },
      { term: "HSC (High Split Coax)", meaning: "An upgraded frequency spectrum on coax lines enabling higher or symmetric upload speeds." },
      { term: "Modem vs Router", meaning: "Modem connects to the external ISP network; router creates and manages the internal local Wi-Fi network." }
    ],
    explanation: `Network Connection Differences:
- Coax: Copper-based, standard asymmetric speeds (e.g. 500 Mbps down / 20 Mbps up).
- Fiber: Light-based, symmetric speeds (equal upload/download, e.g. 1000/1000 Mbps), premium enterprise grade.
- High Split Coax (HSC): Spectrum upgrade allowing coax infrastructure to achieve much higher upstream capacity without running new fiber lines.
- Hybrid Fiber-Coax (HFC): Fiber backbone to neighborhood node + coax to the building.

Hardware Overview:
- Modem: Translates ISP signals into ethernet data.
- Router: Assigns local IP addresses and emits Wi-Fi.
- Extender: Repeats Wi-Fi signal to eliminate dead zones in large buildings.
- Static IP: Dedicated unvarying IP address for hosting servers, VPNs, or security cameras ($20 for 1, $30 for up to 5, $40 for up to 13 in Day 3 training).`,
    trainingExample: "A software development firm hosting internal servers purchases a block of 5 static IPs ($30/mo in training) to allow secure remote employee VPN access.",
    importantPoints: [
      "Symmetric = identical download & upload speeds",
      "Asymmetric = differing download & upload speeds (typical on coax)",
      "Modem bridges to ISP; Router manages internal Wi-Fi",
      "Static IPs: 1 for $20, 5 for $30, 13 for $40 (training example)"
    ],
    revisionQuestions: [
      {
        question: "What is the technical definition of symmetric speed?",
        answer: "When advertised download and upload speeds are equal."
      },
      {
        question: "What does HSC stand for and what is its primary benefit?",
        answer: "High Split Coax — an upgrade to coax network capacity offering higher/symmetric upload speeds."
      },
      {
        question: "What is the functional difference between a modem and a router?",
        answer: "A modem connects to the external provider network, while a router manages local IP addressing and Wi-Fi distribution."
      }
    ],
    simplifiedExplanation: "The modem is like the front door to the internet. The router is like the interior hallway and doors that guide people to individual rooms (via Wi-Fi or cables). Coaxial cable is copper wire; fiber optic is pure glass light transmission.",
    alternateExample: "A warehouse with thick concrete walls might need 2 Wi-Fi extenders because the main router's radio waves cannot penetrate into the rear shipping dock."
  },
  {
    id: "day2-psu-bundling",
    day: "Day 2",
    dayTitle: "Day 2: Products & Services",
    category: "Sales Architecture",
    title: "PSU Terminology & Bundling Rules",
    shortDescription: "Learn what constitutes a Primary Service Unit and the rules for multi-product bundling.",
    introduction: "In ISP operations, sales metrics and eligibility revolve around Primary Service Units (PSUs) and multi-play bundles.",
    definitions: [
      { term: "PSU", meaning: "Primary Service Unit (or Primary Selling Unit) — a distinct core product category." },
      { term: "Double Play", meaning: "A bundle consisting of 2 distinct PSUs (e.g. Internet + Voice)." },
      { term: "Triple Play", meaning: "A bundle consisting of 3 distinct PSUs (Internet + Voice + TV)." }
    ],
    explanation: `PSU Classifications in Spectrum Training:
1. Internet = 1 PSU
2. Voice / Telephone = 1 PSU
3. Video / Television = 1 PSU
4. Mobile = 1 PSU

The Bundling Rule:
- Bundling requires products from DIFFERENT categories.
- Example: Purchasing Internet + Telephone counts as 2 PSUs (Double Play).
- Crucial Rule: Adding multiple units within the SAME category (e.g., buying 3 telephone lines) still equals ONLY 1 PSU (Voice category).
- Representatives must never add unwanted services to force a bundle quota. All bundled services must be legitimate and approved by the customer.`,
    trainingExample: "A customer purchases Ultra Internet ($80) + Router ($10) + 2 Phone Lines ($40). Total PSUs = 2 (Internet + Voice). Total monthly charge = $130.",
    importantPoints: [
      "PSU = Primary Service Unit",
      "Internet (1 PSU), Telephone (1 PSU), TV (1 PSU)",
      "Multiple phone lines still count as 1 single PSU",
      "Bundle = 2 or more distinct service categories",
      "Ethical selling: Never force unrequested add-ons"
    ],
    revisionQuestions: [
      {
        question: "If a business orders one internet line and four telephone lines, how many PSUs does that represent?",
        answer: "2 PSUs (1 for Internet, and 1 for the Telephone category regardless of line count)."
      },
      {
        question: "What is a 'Triple Play' bundle?",
        answer: "A combination of three distinct PSUs: Internet, Telephone, and Television."
      },
      {
        question: "Why does adding a second phone line not count as a second PSU?",
        answer: "Because all phone lines belong to the same single Voice category."
      }
    ],
    simplifiedExplanation: "Imagine you are ordering a value meal. A burger is 1 unit, fries is 1 unit, and soda is 1 unit. If you buy 3 sodas, you still only have 1 food category (drink). To make a combo meal (bundle), you must combine different categories like burger + soda.",
    alternateExample: "A doctor's clinic orders 1 Gig Internet, 1 Television for the waiting room, and 3 desk phones. They have purchased 3 PSUs (Internet + TV + Voice) = Triple Play."
  },

  // ==========================================
  // DAY 3 — SALES AND OPERATIONAL TRAINING
  // ==========================================
  {
    id: "day3-clear-sale-alc",
    day: "Day 3",
    dayTitle: "Day 3: Sales & Operations",
    category: "Sales Terminology",
    title: "Clear Sale vs ALC (Already Customer)",
    shortDescription: "Differentiate new-acquisition customers from existing Spectrum accounts.",
    introduction: "Correctly categorizing an inquiry as a Clear Sale or ALC determines order routing, account policies, and commission eligibility.",
    definitions: [
      { term: "Clear Sale", meaning: "A new acquisition sale to a customer or location not currently active on Spectrum services." },
      { term: "ALC", meaning: "Already Customer — an active Spectrum subscriber seeking upgrades, additions, or relocations." },
      { term: "POC", meaning: "Point of Contact — the authorized person legally permitted to direct account actions." }
    ],
    explanation: `Clear Sale vs ALC:
1. Clear Sale:
   - Target: Businesses with no active Spectrum account at that service address.
   - Scenario: Brand new business opening, or switching/porting from AT&T, Comcast, or Verizon.
   - Processing: Entered as a new customer acquisition.

2. ALC (Already Customer):
   - Target: Customer who currently has an active Spectrum account.
   - Scenario: Calling to add phone lines, increase speed from Premier to Gig, or change address.
   - Processing: Handled through existing account modification workflows.

Strict Compliance Prohibition:
Never cancel an existing customer's account to re-order under a spouse, partner, or fake name to pretend it is a Clear Sale. This illegal practice is called **Rip-and-Replace** and results in immediate termination and commission clawbacks.`,
    trainingExample: "A pharmacy opening a second branch location in a shopping mall that previously used Frontier is treated as a Clear Sale.",
    importantPoints: [
      "Clear Sale = New customer not currently on Spectrum",
      "ALC = Existing active customer ('Already Customer')",
      "Rip-and-replace (canceling active accounts to re-sell as new) is strictly illegal",
      "Always verify caller authorization before modifying ALC accounts"
    ],
    revisionQuestions: [
      {
        question: "What does the abbreviation ALC mean in the training notes?",
        answer: "Already Customer (an active existing Spectrum subscriber)."
      },
      {
        question: "How does a Clear Sale differ from an ALC transaction?",
        answer: "A Clear Sale is with a customer not currently using Spectrum (new acquisition), whereas ALC is an existing subscriber modifying services."
      },
      {
        question: "What is 'rip-and-replace' and what is the policy regarding it?",
        answer: "Improperly canceling an active customer to re-enter them as a new customer for commission; it is strictly prohibited and subject to severe penalties."
      }
    ],
    simplifiedExplanation: "Clear Sale means fresh new business — like a customer walking into a store for the first time. ALC means an existing regular customer coming back to buy more or ask questions. You can't pretend a regular customer is a brand new stranger just to get a bonus.",
    alternateExample: "If an insurance broker calls saying 'I already have Spectrum at my office, but I want to add 2 phones', that is an ALC request."
  },
  {
    id: "day3-billing-calculations",
    day: "Day 3",
    dayTitle: "Day 3: Sales & Operations",
    category: "Billing Calculations",
    title: "Billing Calculation Exercises & MRC",
    shortDescription: "Calculate training billing scenarios for internet, phone lines, static IPs, and routers.",
    introduction: "Candidates must be able to perform accurate arithmetic for package quotes and understand recurring vs one-time charges.",
    definitions: [
      { term: "MRC", meaning: "Monthly Recurring Charge — the fixed ongoing monthly bill for active services." },
      { term: "Chargeback", meaning: "A commission deduction applied when an account cancels before meeting minimum active duration." },
      { term: "Static IP Tiers", meaning: "Training tiers: 1 IP = $20, Up to 5 IPs = $30, Up to 13 IPs = $40 per month." }
    ],
    explanation: `Mastering Training Billing Calculations:

Exercise A:
- Premier Internet: $50 / month
- Wi-Fi Router: $10 / month
- 1 Phone Line: $20 / month
- Calculation: $50 + $10 + $20 = **$80 / month**.

Exercise B:
- Premier Internet + Router: $50 + $10 = $60 / month
- 3 Phone Lines: 3 x $20 = $60 / month
- 3 Static IPs (tier up to 5 IPs): $30 / month
- Calculation: $60 + $60 + $30 = **$150 / month**.

Exercise C:
- Ultra Internet: $80 / month
- Wi-Fi Router: $10 / month
- 2 Phone Lines: 2 x $20 = $40 / month
- 1 Xumo Box: $5 / month
- Calculation: $80 + $10 + $40 + $5 = **$135 / month**.

Note: All calculations are training exercises. Real customer billing includes state/local sales taxes, E911 fees, and regulatory surcharges.`,
    trainingExample: "Exercise from recording: 3 phone lines ($60) + Premier with router ($60) + 3 static IPs ($30) = $150 total monthly recurring charge.",
    importantPoints: [
      "Premier ($50) + Router ($10) + 1 Phone ($20) = $80/mo",
      "3 Phones ($60) + Premier w/ Router ($60) + 3 Static IPs ($30) = $150/mo",
      "MRC = Monthly Recurring Charge",
      "Always clarify that taxes and regulatory fees are not included in training math"
    ],
    revisionQuestions: [
      {
        question: "What is the training calculation for Premier Internet with a router and one phone line?",
        answer: "$50 (Premier) + $10 (Router) + $20 (Phone) = $80 per month."
      },
      {
        question: "What does the acronym MRC stand for?",
        answer: "Monthly Recurring Charge."
      },
      {
        question: "How much does a block of 3 static IPs cost in the Day 3 training exercise?",
        answer: "$30 per month (falls into the 'up to 5 IPs' tier)."
      }
    ],
    simplifiedExplanation: "Building a customer's bill is like adding items to a grocery cart. Start with the base internet speed, add the router if needed, add each phone line ($20 each), and add any static IP block. Add them up step-by-step to get the MRC.",
    alternateExample: "A real estate office wants Ultra Internet ($80), router ($10), and 4 phone lines (4 x $20 = $80). Their monthly recurring charge before taxes is $80 + $10 + $80 = $170/month."
  },
  {
    id: "day3-ethics-compliance",
    day: "Day 3",
    dayTitle: "Day 3: Sales & Operations",
    category: "Ethics & Compliance",
    title: "Ethical Selling, POC Authorization & Compliance",
    shortDescription: "Review strict standards for customer authorization, identity protection, and honest selling.",
    introduction: "Integrity and compliance protect both the candidate and Vahlay Consulting. Unauthorized activities lead to severe penalties.",
    definitions: [
      { term: "Point of Contact (POC)", meaning: "The verified account owner or designated authorized business representative." },
      { term: "Customer Consent", meaning: "Verifiable, explicit permission from the account holder before executing orders or modifications." },
      { term: "SOHO", meaning: "Small Office / Home Office approval allowing business service at residential locations." }
    ],
    explanation: `Vahlay Consulting Strict Compliance Rules:
1. Never Impersonate Customers:
   - Calling another carrier (like AT&T or Comcast) and pretending to be the business owner is illegal fraud. Representatives must use authorized third-party verification procedures.
2. No Unauthorized Identity Use:
   - Never add a 'Second POC' using a fictitious name or employee identity without the primary account holder's full knowledge and consent.
3. Protect Sensitive Information:
   - Never ask for, repeat, or store customer account passkeys, full credit card numbers, or passwords in training portals or unsecured notes.
4. Transparent Disclosures:
   - Disclose all recurring fees, equipment rentals, contract terms, and promotional end dates honestly. Never promise retention discounts (like a guaranteed $50 rate) without official authorization.`,
    trainingExample: "When porting numbers from an old carrier, submit the official Letter of Authorization (LOA) signed by the customer rather than calling the old carrier pretending to be them.",
    importantPoints: [
      "Customer impersonation is illegal and causes immediate termination",
      "Only authorized POCs can approve orders or changes",
      "Never store or handle real customer passkeys or passwords in training chat",
      "Do not make unverified promotional promises"
    ],
    revisionQuestions: [
      {
        question: "Can a sales representative call another carrier and pretend to be the customer to cancel old service?",
        answer: "No. Impersonating a customer is strictly prohibited; representatives must use approved LOA or customer-initiated procedures."
      },
      {
        question: "Can a representative promise a customer a guaranteed $50 retention bill forever?",
        answer: "No. Retention rates and promotions are controlled by provider authorization and cannot be fabricated."
      },
      {
        question: "What information should never be requested or stored in training chats?",
        answer: "Confidential customer passkeys, account passwords, and full payment card credentials."
      }
    ],
    simplifiedExplanation: "Always be honest and transparent. If you wouldn't want a salesperson pretending to be you or charging secret fees to your bank account, never do it to a customer. Build trust and protect customer data.",
    alternateExample: "A customer wants to transfer 4 phone numbers from AT&T. You send them the official digital LOA form to sign with their official AT&T account number, which is submitted cleanly through the CRM porting portal."
  }
];
