/**
 * Approved USPS Job Aid Data for Vahlay Training Portal
 * Sources:
 * 1. US State & Territory Abbreviations (58)
 * 2. USPS Street & Secondary Unit Abbreviations (223)
 */

export const USPS_STATES = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "America Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  FM: "Micronesia",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  VI: "Virgin Island",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};

export const USPS_STREET_ABBREVIATIONS = {
  ALY: { name: "Alley", type: "Street Suffix" },
  ANX: { name: "Annex", type: "Street Suffix" },
  APT: { name: "Apartment", type: "Secondary Unit" },
  ARC: { name: "Arcade", type: "Street Suffix" },
  AVE: { name: "Avenue", type: "Street Suffix" },
  BSMT: { name: "Basement", type: "Secondary Unit" },
  BYU: { name: "Bayou", type: "Street Suffix" },
  BCH: { name: "Beach", type: "Street Suffix" },
  BND: { name: "Bend", type: "Street Suffix" },
  BLF: { name: "Bluff", type: "Street Suffix" },
  BLFS: { name: "Bluffs", type: "Street Suffix" },
  BTM: { name: "Bottom", type: "Street Suffix" },
  BLVD: { name: "Boulevard", type: "Street Suffix" },
  BR: { name: "Branch", type: "Street Suffix" },
  BRG: { name: "Bridge", type: "Street Suffix" },
  BRK: { name: "Brook", type: "Street Suffix" },
  BRKS: { name: "Brooks", type: "Street Suffix" },
  BLDG: { name: "Building", type: "Secondary Unit" },
  BG: { name: "Burg", type: "Street Suffix" },
  BGS: { name: "Burgs", type: "Street Suffix" },
  BYP: { name: "Bypass", type: "Street Suffix" },
  CP: { name: "Camp", type: "Street Suffix" },
  CYN: { name: "Canyon", type: "Street Suffix" },
  CPE: { name: "Cape", type: "Street Suffix" },
  CSWY: { name: "Causeway", type: "Street Suffix" },
  CTR: { name: "Center", type: "Street Suffix" },
  CTRS: { name: "Centers", type: "Street Suffix" },
  CIR: { name: "Circle", type: "Street Suffix" },
  CIRS: { name: "Circles", type: "Street Suffix" },
  CLF: { name: "Cliff", type: "Street Suffix" },
  CLFS: { name: "Cliffs", type: "Street Suffix" },
  CLB: { name: "Club", type: "Street Suffix" },
  CMN: { name: "Common", type: "Street Suffix" },
  COR: { name: "Corner", type: "Street Suffix" },
  CORS: { name: "Corners", type: "Street Suffix" },
  CRSE: { name: "Course", type: "Street Suffix" },
  CT: { name: "Court", type: "Street Suffix" },
  CTS: { name: "Courts", type: "Street Suffix" },
  CV: { name: "Cove", type: "Street Suffix" },
  CVS: { name: "Coves", type: "Street Suffix" },
  CRK: { name: "Creek", type: "Street Suffix" },
  CRES: { name: "Crescent", type: "Street Suffix" },
  CRST: { name: "Crest", type: "Street Suffix" },
  XING: { name: "Crossing", type: "Street Suffix" },
  XRD: { name: "Crossroad", type: "Street Suffix" },
  CURV: { name: "Curve", type: "Street Suffix" },
  DL: { name: "Dale", type: "Street Suffix" },
  DM: { name: "Dam", type: "Street Suffix" },
  DEPT: { name: "Department", type: "Secondary Unit" },
  DV: { name: "Divide", type: "Street Suffix" },
  DR: { name: "Drive", type: "Street Suffix" },
  DRS: { name: "Drives", type: "Street Suffix" },
  EST: { name: "Estate", type: "Street Suffix" },
  ESTS: { name: "Estates", type: "Street Suffix" },
  EXPY: { name: "Expressway", type: "Street Suffix" },
  EXT: { name: "Extension", type: "Street Suffix" },
  EXTS: { name: "Extensions", type: "Street Suffix" },
  FALL: { name: "Fall", type: "Street Suffix" },
  FLS: { name: "Falls", type: "Street Suffix" },
  FRY: { name: "Ferry", type: "Street Suffix" },
  FLD: { name: "Field", type: "Street Suffix" },
  FLDS: { name: "Fields", type: "Street Suffix" },
  FLT: { name: "Flat", type: "Street Suffix" },
  FLTS: { name: "Flats", type: "Street Suffix" },
  FL: { name: "Floor", type: "Secondary Unit" },
  FRD: { name: "Ford", type: "Street Suffix" },
  FRDS: { name: "Fords", type: "Street Suffix" },
  FRST: { name: "Forest", type: "Street Suffix" },
  FRG: { name: "Forge", type: "Street Suffix" },
  FRGS: { name: "Forges", type: "Street Suffix" },
  FRK: { name: "Fork", type: "Street Suffix" },
  FRKS: { name: "Forks", type: "Street Suffix" },
  FT: { name: "Fort", type: "Street Suffix" },
  FWY: { name: "Freeway", type: "Street Suffix" },
  FRNT: { name: "Front", type: "Secondary Unit" },
  GDN: { name: "Garden", type: "Street Suffix" },
  GDNS: { name: "Gardens", type: "Street Suffix" },
  GTWY: { name: "Gateway", type: "Street Suffix" },
  GLN: { name: "Glen", type: "Street Suffix" },
  GLNS: { name: "Glens", type: "Street Suffix" },
  GRN: { name: "Green", type: "Street Suffix" },
  GRNS: { name: "Greens", type: "Street Suffix" },
  GRV: { name: "Grove", type: "Street Suffix" },
  GRVS: { name: "Groves", type: "Street Suffix" },
  HNGR: { name: "Hangar", type: "Secondary Unit / Suffix" },
  HBR: { name: "Harbor", type: "Street Suffix" },
  HBRS: { name: "Harbors", type: "Street Suffix" },
  HVN: { name: "Haven", type: "Street Suffix" },
  HTS: { name: "Heights", type: "Street Suffix" },
  HWY: { name: "Highway", type: "Street Suffix" },
  HL: { name: "Hill", type: "Street Suffix" },
  HLS: { name: "Hills", type: "Street Suffix" },
  HOLW: { name: "Hollow", type: "Street Suffix" },
  INLT: { name: "Inlet", type: "Street Suffix" },
  IS: { name: "Island", type: "Street Suffix" },
  ISS: { name: "Islands", type: "Street Suffix" },
  ISLE: { name: "Isle", type: "Street Suffix" },
  JCT: { name: "Junction", type: "Street Suffix" },
  JCTS: { name: "Junctions", type: "Street Suffix" },
  KY: { name: "Key", type: "Street Suffix" },
  KYS: { name: "Keys", type: "Street Suffix" },
  KNL: { name: "Knoll", type: "Street Suffix" },
  KNLS: { name: "Knolls", type: "Street Suffix" },
  LK: { name: "Lake", type: "Street Suffix" },
  LKS: { name: "Lakes", type: "Street Suffix" },
  LAND: { name: "Land", type: "Street Suffix" },
  LNDG: { name: "Landing", type: "Street Suffix" },
  LN: { name: "Lane", type: "Street Suffix" },
  LGT: { name: "Light", type: "Street Suffix" },
  LGTS: { name: "Lights", type: "Street Suffix" },
  LF: { name: "Loaf", type: "Street Suffix" },
  LBBY: { name: "Lobby", type: "Secondary Unit" },
  LCK: { name: "Lock", type: "Street Suffix" },
  LCKS: { name: "Locks", type: "Street Suffix" },
  LDG: { name: "Lodge", type: "Street Suffix" },
  LOOP: { name: "Loop", type: "Street Suffix" },
  LOT: { name: "Lot", type: "Secondary Unit" },
  LOWR: { name: "Lower", type: "Secondary Unit" },
  MALL: { name: "Mall", type: "Street Suffix" },
  MNR: { name: "Manor", type: "Street Suffix" },
  MNRS: { name: "Manors", type: "Street Suffix" },
  MDW: { name: "Meadow", type: "Street Suffix" },
  MDWS: { name: "Meadows", type: "Street Suffix" },
  MEWS: { name: "Mews", type: "Street Suffix" },
  ML: { name: "Mill", type: "Street Suffix" },
  MLS: { name: "Mills", type: "Street Suffix" },
  MSN: { name: "Mission", type: "Street Suffix" },
  MTWY: { name: "Motorway", type: "Street Suffix" },
  MT: { name: "Mount", type: "Street Suffix" },
  MTN: { name: "Mountain", type: "Street Suffix" },
  MTNS: { name: "Mountains", type: "Street Suffix" },
  NCK: { name: "Neck", type: "Street Suffix" },
  OFC: { name: "Office", type: "Secondary Unit" },
  ORCH: { name: "Orchard", type: "Street Suffix" },
  OVAL: { name: "Oval", type: "Street Suffix" },
  OPAS: { name: "Overpass", type: "Street Suffix" },
  PARK: { name: "Park", type: "Street Suffix" },
  PKWY: { name: "Parkway", type: "Street Suffix" },
  PASS: { name: "Pass", type: "Street Suffix" },
  PSGE: { name: "Passage", type: "Street Suffix" },
  PATH: { name: "Path", type: "Street Suffix" },
  PH: { name: "Penthouse", type: "Secondary Unit" },
  PIER: { name: "Pier", type: "Street Suffix" },
  PIKE: { name: "Pike", type: "Street Suffix" },
  PNE: { name: "Pine", type: "Street Suffix" },
  PNES: { name: "Pines", type: "Street Suffix" },
  PL: { name: "Place", type: "Street Suffix" },
  PLN: { name: "Plain", type: "Street Suffix" },
  PLNS: { name: "Plains", type: "Street Suffix" },
  PLZ: { name: "Plaza", type: "Street Suffix" },
  PT: { name: "Point", type: "Street Suffix" },
  PTS: { name: "Points", type: "Street Suffix" },
  PRT: { name: "Port", type: "Street Suffix" },
  PR: { name: "Prairie", type: "Street Suffix" },
  RADL: { name: "Radial", type: "Street Suffix" },
  RAMP: { name: "Ramp", type: "Street Suffix" },
  RNCH: { name: "Ranch", type: "Street Suffix" },
  RPD: { name: "Rapid", type: "Street Suffix" },
  RPDS: { name: "Rapids", type: "Street Suffix" },
  REAR: { name: "Rear", type: "Secondary Unit" },
  RST: { name: "Rest", type: "Street Suffix" },
  RDG: { name: "Ridge", type: "Street Suffix" },
  RDGS: { name: "Ridges", type: "Street Suffix" },
  RIV: { name: "River", type: "Street Suffix" },
  RD: { name: "Road", type: "Street Suffix" },
  RDS: { name: "Roads", type: "Street Suffix" },
  RTE: { name: "Route", type: "Street Suffix" },
  ROW: { name: "Row", type: "Street Suffix" },
  RUE: { name: "Rue", type: "Street Suffix" },
  RUN: { name: "Run", type: "Street Suffix" },
  SHL: { name: "Shoal", type: "Street Suffix" },
  SHLS: { name: "Shoals", type: "Street Suffix" },
  SHR: { name: "Shore", type: "Street Suffix" },
  SHRS: { name: "Shores", type: "Street Suffix" },
  SIDE: { name: "Side", type: "Secondary Unit" },
  SKWY: { name: "Skyway", type: "Street Suffix" },
  SLIP: { name: "Slip", type: "Secondary Unit / Suffix" },
  SPC: { name: "Space", type: "Secondary Unit" },
  SPG: { name: "Spring", type: "Street Suffix" },
  SPGS: { name: "Springs", type: "Street Suffix" },
  SPUR: { name: "Spur", type: "Street Suffix" },
  SQ: { name: "Square", type: "Street Suffix" },
  SQS: { name: "Squares", type: "Street Suffix" },
  STA: { name: "Station", type: "Street Suffix" },
  STOP: { name: "Stop", type: "Secondary Unit / Suffix" },
  STRA: { name: "Stravenue", type: "Street Suffix" },
  STRM: { name: "Stream", type: "Street Suffix" },
  ST: { name: "Street", type: "Street Suffix" },
  STS: { name: "Streets", type: "Street Suffix" },
  STE: { name: "Suite", type: "Secondary Unit" },
  SMT: { name: "Summit", type: "Street Suffix" },
  TER: { name: "Terrace", type: "Street Suffix" },
  TRWY: { name: "Throughway", type: "Street Suffix" },
  TRCE: { name: "Trace", type: "Street Suffix" },
  TRAK: { name: "Track", type: "Street Suffix" },
  TRFY: { name: "Trafficway", type: "Street Suffix" },
  TRL: { name: "Trail", type: "Street Suffix" },
  TRLR: { name: "Trailer", type: "Secondary Unit" },
  TUNL: { name: "Tunnel", type: "Street Suffix" },
  TPKE: { name: "Turnpike", type: "Street Suffix" },
  UPAS: { name: "Underpass", type: "Street Suffix" },
  UN: { name: "Union", type: "Street Suffix" },
  UNS: { name: "Unions", type: "Street Suffix" },
  UNIT: { name: "Unit", type: "Secondary Unit" },
  UPPR: { name: "Upper", type: "Secondary Unit" },
  VLY: { name: "Valley", type: "Street Suffix" },
  VLYS: { name: "Valleys", type: "Street Suffix" },
  VIA: { name: "Viaduct", type: "Street Suffix" },
  VW: { name: "View", type: "Street Suffix" },
  VWS: { name: "Views", type: "Street Suffix" },
  VLG: { name: "Village", type: "Street Suffix" },
  VLGS: { name: "Villages", type: "Street Suffix" },
  VL: { name: "Ville", type: "Street Suffix" },
  VIS: { name: "Vista", type: "Street Suffix" },
  WALK: { name: "Walk", type: "Street Suffix" },
  WALL: { name: "Wall", type: "Street Suffix" },
  WAY: { name: "Way", type: "Street Suffix" },
  WAYS: { name: "Ways", type: "Street Suffix" },
  WL: { name: "Well", type: "Street Suffix" },
  WLS: { name: "Wells", type: "Street Suffix" }
};

/**
 * Intelligent USPS lookup for abbreviations, states, and secondary units.
 */
export function lookupUSPSAbbreviation(query = "") {
  const clean = query.trim().toUpperCase().replace(/[?.,!]/g, "");
  const words = clean.split(/\s+/).filter(Boolean);

  // 1. Check if user is asking for full list of states
  if (
    clean.includes("STATE ABBREVIATION") ||
    clean.includes("ALL STATES") ||
    clean.includes("LIST OF STATES") ||
    clean.includes("58 STATES")
  ) {
    const list = Object.entries(USPS_STATES)
      .map(([code, name]) => `| **${code}** | ${name} |`)
      .join("\n");
    return {
      found: true,
      text: `### Official US State & Territory Abbreviations (58 Total)

According to our approved USPS Job Aid:

| Code | State / Territory |
| :---: | :--- |
${list}

**Trainer CRM Tip:**
Always enter the exact 2-letter state abbreviation in the CRM (e.g., \`CA\` for California, \`TX\` for Texas). Do not spell out the full state name in the State field.

*Training Reference: Day 1 — USPS Job Aid (State Codes).*`,
      source: "Day 1 — USPS State Codes"
    };
  }

  // 2. Check if user is asking for street / secondary unit abbreviation list
  if (
    (clean.includes("STREET") && clean.includes("ABBREVIAT")) ||
    (clean.includes("USPS") && clean.includes("ABBREVIAT")) ||
    clean.includes("223") ||
    clean.includes("JOB AID")
  ) {
    const commonSample = [
      "AVE", "BLVD", "ST", "RD", "DR", "CT", "LN", "PKWY", "CIR", "PL",
      "STE", "APT", "BLDG", "FL", "UNIT", "DEPT", "ALY", "EXPY", "HWY", "TER"
    ].map(code => {
      const item = USPS_STREET_ABBREVIATIONS[code];
      return `| **${code}** | ${item.name} | ${item.type} |`;
    }).join("\n");

    return {
      found: true,
      text: `### Approved USPS Street & Secondary Unit Abbreviations (223 Job Aid)

In our training program and CRM, street addresses must use standard USPS abbreviations. Here are the most frequently used abbreviations from the 223 approved list:

| Code | Full Name | Category |
| :---: | :--- | :--- |
${commonSample}

*(You can ask me about any specific abbreviation, e.g., "what is ALY", "what is STE", "what does EXPY mean", and I'll explain its usage in an address!)*

*Training Reference: Day 1 — Approved USPS Job Aid.*`,
      source: "Day 1 — USPS Job Aid"
    };
  }

  // If the query is about plans, speeds, packages, pricing, internet, or floor short forms (TN, CX, CK, SVCS), do not trigger USPS street abbreviations
  const isTelecomProductContext =
    clean.includes("PREMIER") ||
    clean.includes("ULTRA") ||
    clean.includes("GIG") ||
    clean.includes("SPEED") ||
    clean.includes("INTERNET") ||
    clean.includes("PRICE") ||
    clean.includes("PRICING") ||
    clean.includes("COST") ||
    clean.includes("BUNDLE") ||
    clean.includes("PHONE") ||
    clean.includes("TELEPHONE") ||
    clean.includes("MBPS") ||
    clean.includes("GBPS") ||
    clean.includes("ALC") ||
    clean.includes("CLEAR") ||
    clean.includes("CX") ||
    clean.includes("CK") ||
    clean.includes("SVCS") ||
    clean.includes("SHORT FORM");

  if (isTelecomProductContext && !clean.includes("TENNESSEE") && !clean.includes("SUFFIX") && !clean.includes("USPS") && !clean.includes("STREET") && !clean.includes("STATE CODE")) {
    return { found: false };
  }

  // 3. Filter stop words when searching for specific abbreviation code
  const stopWords = new Set([
    "WHAT", "IS", "A", "AN", "THE", "FOR", "MEANS", "MEAN", "STAND", "STANDS",
    "IN", "OF", "DOES", "CAN", "YOU", "TELL", "ME", "GIVE", "SOME", "EXAMPLE",
    "EXAMPLES", "ABBREVIATION", "ABBREVIATIONS", "EXPLAIN", "PLEASE", "PLZ",
    "USE", "ADDRESS", "ADDRESSES", "TO", "FULL", "NAME", "APPROVED", "JOB", "AID"
  ]);

  const candidateWords = words.filter(w => !stopWords.has(w));
  // If all words were stop words (e.g. user literally typed "IS"), fall back to original words
  const searchWords = candidateWords.length > 0 ? candidateWords : words;

  for (const word of searchWords) {
    // Check street abbreviations first
    if (USPS_STREET_ABBREVIATIONS[word]) {
      const item = USPS_STREET_ABBREVIATIONS[word];
      const isSecondary = item.type.includes("Secondary");
      const sampleAddress = isSecondary
        ? `1031 Main Ave, ${word} 200, Pasadena, CA 91101`
        : `1031 Main ${word}, Pasadena, CA 91101`;

      return {
        found: true,
        text: `**\`${word}\`** stands for **${item.name}** (${item.type}).

- **Full Name:** ${item.name}
- **Category:** ${item.type}
- **Address Example:** \`${sampleAddress}\`

*Tip: Always use the exact abbreviation \`${word}\` in CRM coverage checks.*

*Would you like more details or another abbreviation?*`,
        source: "Day 1 — Approved USPS Job Aid",
        suggestedQuestions: [
          `More details on ${word}`,
          "What is STE abbreviation?",
          "Explain US address structure"
        ]
      };
    }

    // Check state abbreviations
    if (USPS_STATES[word] && (word.length === 2 || clean.includes("STATE") || clean.includes("MEANS") || clean.includes("ABBREVIAT"))) {
      // In call center training, TN primarily means Telephone / Telephone Line unless user asks about US States
      if (word === "TN" && !clean.includes("TENNESSEE") && !clean.includes("STATE CODE") && !clean.includes("US STATE")) {
        continue;
      }
      const stateName = USPS_STATES[word];
      return {
        found: true,
        text: `**\`${word}\`** stands for **${stateName}** (US State Code).

- **State / Territory:** ${stateName}
- **Address Example:** \`1031 Main Ave, Pasadena, ${word} 91101\`

*Tip: Always use the 2-letter code \`${word}\` in the CRM State field.*

*Would you like more details or another state code?*`,
        source: "Day 1 — US State Standards",
        suggestedQuestions: [
          "Show all 58 state abbreviations",
          "Explain US address structure",
          "What is CA?"
        ]
      };
    }
  }

  // 4. Check if searching by full name (e.g. "what is the abbreviation for California" or "Alley abbreviation")
  const isAddressContext =
    clean.includes("ABBREVIAT") ||
    clean.includes("SHORT") ||
    clean.includes("CODE") ||
    clean.includes("USPS") ||
    clean.includes("STREET") ||
    clean.includes("STATE") ||
    clean.includes("SUFFIX") ||
    clean.includes("UNIT") ||
    clean.includes("ADDRESS");

  if (isAddressContext) {
    for (const [code, item] of Object.entries(USPS_STREET_ABBREVIATIONS)) {
      const regex = new RegExp(`\\b${item.name}\\b`, "i");
      if (regex.test(clean)) {
        return {
          found: true,
          text: `**\`${code}\`** is the approved abbreviation for **${item.name}** (${item.type}).

- **Full Name:** ${item.name}
- **USPS Abbreviation:** \`${code}\`
- **Address Example:** \`1031 Main ${code}, Pasadena, CA 91101\`

*Would you like me to explain this in more detail or give more examples?*`,
          source: "Day 1 — Approved USPS Job Aid",
          suggestedQuestions: [
            "Explain in more detail",
            "Give a practice example",
            "What is STE abbreviation?"
          ]
        };
      }
    }

    for (const [code, name] of Object.entries(USPS_STATES)) {
      const regex = new RegExp(`\\b${name}\\b`, "i");
      if (regex.test(clean)) {
        return {
          found: true,
          text: `**\`${code}\`** is the official 2-letter state code for **${name}**.

- **State / Territory:** ${name}
- **USPS Code:** \`${code}\`
- **Address Example:** \`1031 Main Ave, Pasadena, ${code} 91101\`

*Would you like me to explain this in more detail or show all state codes?*`,
          source: "Day 1 — US State Standards",
          suggestedQuestions: [
            "Explain in more detail",
            "Show all 58 state abbreviations",
            "Explain US address structure"
          ]
        };
      }
    }
  }

  return { found: false };
}
