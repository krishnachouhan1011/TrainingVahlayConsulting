/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Tag,
  ExternalLink,
  X,
  FileText,
  ShieldCheck,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  Wifi,
  Smartphone,
  Tv,
  PhoneCall,
  DollarSign,
  AlertCircle,
} from "lucide-react";

// Clean category map
const categoryMap = {
  Internet: "INTERNET",
  Mobile: "MOBILE",
  TV: "TV",
  Phone: "COMMUNICATIONS",
  "Business Connect": "COMMUNICATIONS",
};

// Selection limits per category
const selectionLimits = {
  INTERNET: 3,
  MOBILE: 1,
  TV: 3,
  COMMUNICATIONS: 3,
};

// Standard human-friendly options configuration
const defaultOptionsConfig = {
  INTERNET: [
    {
      value: "INTERNET_100",
      label: "Spectrum Business Internet 100",
      detail: "Up to 100 Mbps",
      badge: "Value",
    },
    {
      value: "INTERNET_500",
      label: "Spectrum Business Internet 500",
      detail: "Up to 500 Mbps (Ultra)",
      badge: "Popular",
    },
    {
      value: "INTERNET_750",
      label: "Spectrum Business Internet 750",
      detail: "Up to 750 Mbps (Premier)",
    },
    {
      value: "INTERNET_GIG",
      label: "Spectrum Business Internet 1 Gig",
      detail: "Up to 1 Gbps (Gigabit)",
      badge: "Fastest",
    },
  ],
  MOBILE: [
    {
      value: "MOBILE",
      label: "Spectrum Mobile Unlimited",
      detail: "Nationwide 5G Talk, Text & Unlimited Data",
      badge: "1 Line Free",
    },
  ],
  TV: [
    {
      value: "TV_ENTERTAINMENT",
      label: "Business TV Entertainment",
      detail: "60+ popular news, sports & essentials",
    },
    {
      value: "TV_LOCAL",
      label: "Business TV Local+",
      detail: "Local HD broadcast channels",
    },
    {
      value: "TV_VIP",
      label: "Business TV VIP / Premier",
      detail: "Extensive premium business channels",
    },
    {
      value: "TV_LATINO",
      label: "Spectrum Business TV Latino",
      detail: "50+ Spanish-language channels",
    },
  ],
  COMMUNICATIONS: [
    {
      value: "VOICE",
      label: "Spectrum Business Voice",
      detail: "35+ advanced calling features & unlimited nationwide",
      badge: "$20/mo",
    },
    {
      value: "BUSINESS_CONNECT",
      label: "Spectrum Business Connect",
      detail: "Cloud softphone & unified team collaboration",
    },
  ],
};

// Map raw product to internal key
function getProductKey(product) {
  const lob = product.lineOfBusiness;
  const desc = (product.description || product.name || "").toLowerCase();

  if (lob === "Internet") {
    if (desc.includes("100")) return "INTERNET_100";
    if (desc.includes("500")) return "INTERNET_500";
    if (desc.includes("750")) return "INTERNET_750";
    if (desc.includes("gig") || desc.includes("1000")) return "INTERNET_GIG";
    return "INTERNET_500";
  }
  if (lob === "Mobile") return "MOBILE";
  if (lob === "Phone") return "VOICE";
  if (lob === "Business Connect") return "BUSINESS_CONNECT";
  if (lob === "TV") {
    if (desc.includes("latino")) return "TV_LATINO";
    if (desc.includes("vip") || desc.includes("premier")) return "TV_VIP";
    if (desc.includes("local")) return "TV_LOCAL";
    return "TV_ENTERTAINMENT";
  }
  return "OTHER";
}

function getCategory(key) {
  if (key.startsWith("INTERNET")) return "INTERNET";
  if (key === "MOBILE") return "MOBILE";
  if (key.startsWith("TV")) return "TV";
  if (key === "VOICE" || key === "BUSINESS_CONNECT") return "COMMUNICATIONS";
  return "OTHER";
}

// Fallback Benchmark Plans (offline or fallback mode)
const FALLBACK_PLANS = [
  {
    id: "fb-gig-3yr",
    name: "Business Internet 1 Gig + Paid Mobile(UNL) + Voice",
    subhead: "1 Gbps x 50 Mbps | Unlimited (Paid) | 35+ Calling Features (Paid)",
    downloadSpeed: "1,000 Mbps",
    uploadSpeed: "50 Mbps",
    bullets: [
      "Ideal for connected office spaces and high performance users with speeds up to 1 Gbps x 50 Mbps",
      "Seamless connectivity with nationwide 5G unlimited talk, text and customizable data plans",
      "Business phone with unlimited local and long distance calling, Call Guard and 35+ advanced features",
    ],
    tag: "One of our best available offers!",
    price: 150,
    priceNote: "/mo for 36 mos with Auto Pay",
    guaranteeBanner: "3-Year Price Guarantee",
    guaranteeColor: "yellow",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_GIG", "MOBILE", "VOICE"],
    products: [
      { name: "Spectrum Business Internet 1 Gig", netPrice: 100, listPrice: 180, note: "for 36 mos" },
      { name: "Spectrum Mobile Unlimited Line", netPrice: 30, listPrice: 40, note: "for 36 mos" },
      { name: "Spectrum Business Voice Line", netPrice: 20, listPrice: 40, note: "for 36 mos" },
    ],
  },
  {
    id: "fb-gig-2yr",
    name: "Business Internet 1 Gig + Free Mobile(UNL) + Voice",
    subhead: "1 Gbps x 50 Mbps | Unlimited (Included) | 35+ Calling Features (Paid)",
    downloadSpeed: "1,000 Mbps",
    uploadSpeed: "50 Mbps",
    bullets: [
      "Ideal for connected office spaces and high performance users with speeds up to 1 Gbps x 50 Mbps",
      "Seamless connectivity with nationwide 5G unlimited talk, text and customizable data plans",
      "Business phone with unlimited local and long distance calling, Call Guard and 35+ advanced features",
    ],
    tag: "One of our best available offers!",
    price: 120,
    priceNote: "/mo for 24 mos with Auto Pay",
    guaranteeBanner: "2-Year Price Guarantee",
    guaranteeColor: "blue",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_GIG", "MOBILE", "VOICE"],
    products: [
      { name: "Spectrum Business Internet 1 Gig", netPrice: 100, listPrice: 180, note: "for 24 mos" },
      { name: "Spectrum Mobile Unlimited Line (Free for 12 mos)", netPrice: 0, listPrice: 40, note: "12 mos included" },
      { name: "Spectrum Business Voice Line", netPrice: 20, listPrice: 40, note: "for 24 mos" },
    ],
  },
  {
    id: "fb-gig-4lines",
    name: "Business Internet 1 Gig + 4 Lines + Voice",
    subhead: "1 Gbps x 50 Mbps | 4 Unlimited Lines | 35+ Calling Features (Paid)",
    downloadSpeed: "1,000 Mbps",
    uploadSpeed: "50 Mbps",
    bullets: [
      "Ideal for connected office spaces and high performance users with speeds up to 1 Gbps x 50 Mbps",
      "Seamless connectivity with 4 nationwide 5G unlimited talk, text and data lines",
      "Business phone with unlimited local and long distance calling, Call Guard and more",
    ],
    tag: "Special Multi-Line Offer",
    price: 190,
    priceNote: "/mo with Auto Pay",
    guaranteeBanner: null,
    guaranteeColor: "blue",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_GIG", "MOBILE", "VOICE"],
    products: [
      { name: "Spectrum Business Internet 1 Gig", netPrice: 70, listPrice: 180, note: "Promotional rate" },
      { name: "4 Spectrum Mobile Unlimited Lines", netPrice: 100, listPrice: 160, note: "$25/line promo" },
      { name: "Spectrum Business Voice Line", netPrice: 20, listPrice: 40, note: "Included promo" },
    ],
  },
  {
    id: "fb-500-triple",
    name: "Internet 500 + Free Mobile(UNL) + Voice",
    subhead: "500 Mbps x 20 Mbps | Unlimited Line (Included) | 35+ Calling Features (Paid)",
    downloadSpeed: "500 Mbps",
    uploadSpeed: "20 Mbps",
    bullets: [
      "Perfect for small to mid-sized offices with ultra-reliable 500 Mbps download speeds",
      "Includes 1 free year of Spectrum Mobile Unlimited nationwide 5G",
      "Professional business voice line with 35+ calling features and no dropped calls",
    ],
    tag: "Top Value Bundle",
    price: 70,
    priceNote: "/mo for 12 mos with Auto Pay",
    guaranteeBanner: "1-Year Price Guarantee",
    guaranteeColor: "blue",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_500", "MOBILE", "VOICE"],
    products: [
      { name: "Spectrum Business Internet 500", netPrice: 50, listPrice: 110, note: "for 12 mos" },
      { name: "Spectrum Mobile Unlimited Line (Included)", netPrice: 0, listPrice: 40, note: "Free for 12 mos" },
      { name: "Spectrum Business Voice Line", netPrice: 20, listPrice: 35, note: "for 12 mos" },
    ],
  },
  {
    id: "fb-500-double",
    name: "Internet 500 + Spectrum Business Voice",
    subhead: "500 Mbps x 20 Mbps | 35+ Calling Features (Paid)",
    downloadSpeed: "500 Mbps",
    uploadSpeed: "20 Mbps",
    bullets: [
      "Ultra-fast 500 Mbps high-split connection with zero data caps",
      "Crystal clear digital voice line with call forwarding, hunting and caller ID",
      "24/7 dedicated business support and 99.9% network reliability",
    ],
    tag: "Popular Double Play",
    price: 70,
    priceNote: "/mo for 24 mos with Auto Pay",
    guaranteeBanner: "2-Year Price Guarantee",
    guaranteeColor: "blue",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_500", "VOICE"],
    products: [
      { name: "Spectrum Business Internet 500", netPrice: 50, listPrice: 110, note: "for 24 mos" },
      { name: "Spectrum Business Voice Line", netPrice: 20, listPrice: 35, note: "for 24 mos" },
    ],
  },
  {
    id: "fb-gig-double-mobile",
    name: "Business Internet 1 Gig + Mobile Unlimited",
    subhead: "1 Gbps x 50 Mbps | Unlimited Mobile Line (Included)",
    downloadSpeed: "1,000 Mbps",
    uploadSpeed: "50 Mbps",
    bullets: [
      "Lightning-fast 1 Gbps download speed for high-bandwidth work and video streaming",
      "Includes 12 months of free Spectrum Mobile Unlimited nationwide 5G",
      "Free Advanced Business Wi-Fi with separate guest and staff networks",
    ],
    tag: "High-Speed Mobile Bundle",
    price: 100,
    priceNote: "/mo for 24 mos with Auto Pay",
    guaranteeBanner: "2-Year Price Guarantee",
    guaranteeColor: "blue",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_GIG", "MOBILE"],
    products: [
      { name: "Spectrum Business Internet 1 Gig", netPrice: 100, listPrice: 180, note: "for 24 mos" },
      { name: "Spectrum Mobile Unlimited Line", netPrice: 0, listPrice: 40, note: "Free for 12 mos" },
    ],
  },
  {
    id: "fb-gig-tv",
    name: "Internet 1 Gig + Business TV Entertainment",
    subhead: "1 Gbps x 50 Mbps | Business TV Entertainment",
    downloadSpeed: "1,000 Mbps",
    uploadSpeed: "50 Mbps",
    bullets: [
      "Gigabit connection with 1,000 Mbps download speed",
      "60+ live business television channels for waiting rooms, bars and office lounges",
      "No contracts or unexpected broadcast surcharges",
    ],
    tag: "Hospitality & Office Bundle",
    price: 145,
    priceNote: "/mo for 24 mos with Auto Pay",
    guaranteeBanner: "2-Year Price Guarantee",
    guaranteeColor: "blue",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_GIG", "TV_ENTERTAINMENT"],
    products: [
      { name: "Spectrum Business Internet 1 Gig", netPrice: 100, listPrice: 180, note: "for 24 mos" },
      { name: "Business TV Entertainment", netPrice: 45, listPrice: 45, note: "for 24 mos" },
    ],
  },
  {
    id: "fb-gig-standalone",
    name: "Spectrum Business Internet 1 Gig (Standalone)",
    subhead: "1 Gbps x 50 Mbps | Dedicated Business Broadband",
    downloadSpeed: "1,000 Mbps",
    uploadSpeed: "50 Mbps",
    bullets: [
      "Blazing-fast 1 Gbps business internet connection",
      "No data caps, free modem included and 24/7 dedicated business support",
      "Advanced Business WiFi included at no extra charge",
    ],
    tag: "Standalone Internet",
    price: 100,
    priceNote: "/mo for 24 mos with Auto Pay",
    guaranteeBanner: "2-Year Price Guarantee",
    guaranteeColor: "blue",
    broadbandLabelUrl: "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html",
    productKeys: ["INTERNET_GIG"],
    products: [
      { name: "Spectrum Business Internet 1 Gig", netPrice: 100, listPrice: 180, note: "for 24 mos" },
    ],
  },
];

// Presets for quick exploration
const BUNDLE_PRESETS = [
  {
    label: "Gig Triple Play (Standard)",
    badge: "$120/mo",
    keys: ["INTERNET_GIG", "MOBILE", "VOICE"],
  },
  {
    label: "Ultra 500 Triple Play",
    badge: "$70/mo",
    keys: ["INTERNET_500", "MOBILE", "VOICE"],
  },
  {
    label: "Internet + Voice",
    badge: "$70/mo",
    keys: ["INTERNET_500", "VOICE"],
  },
  {
    label: "Internet + Mobile",
    badge: "$100/mo",
    keys: ["INTERNET_GIG", "MOBILE"],
  },
  {
    label: "Quad Play (All 4)",
    badge: "Full Suite",
    keys: ["INTERNET_GIG", "MOBILE", "VOICE", "TV_VIP"],
  },
];

export default function SpectrumPricingLookup() {
  // Default selected: 1 Gig + Mobile + Voice
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([
    "INTERNET_GIG",
    "MOBILE",
    "VOICE",
  ]);

  const [rawOffers, setRawOffers] = useState([]);
  const [enrichmentData, setEnrichmentData] = useState({});
  const [displayedPlans, setDisplayedPlans] = useState(FALLBACK_PLANS.slice(0, 3));
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [filterMessage, setFilterMessage] = useState(null);

  // Modals
  const [activeModal, setActiveModal] = useState(null); // 'info' | 'broadband'
  const [modalContent, setModalContent] = useState(null);

  // Convert raw API offer to standardized card plan
  const transformOfferToPlan = useCallback((offer, enrich = {}) => {
    const offerEnrichment = enrich[offer.masterProductId] || {};
    const months =
      offer.pricing?.discountTerm ||
      Math.max(0, ...(offer.product || []).map((p) => p.pricing?.discountTerm || 0)) ||
      null;
    const years = months && months % 12 === 0 ? months / 12 : null;

    const price = offer.pricing?.displayPrice ?? offer.pricing?.netPrice ?? 120;
    const priceNote = months ? `/mo for ${months} mos with Auto Pay` : "/mo with Auto Pay";

    let guaranteeBanner = null;
    let guaranteeColor = "blue";
    if (years === 3 || months === 36) {
      guaranteeBanner = "3-Year Price Guarantee";
      guaranteeColor = "yellow";
    } else if (years === 2 || months === 24) {
      guaranteeBanner = "2-Year Price Guarantee";
      guaranteeColor = "blue";
    } else if (years === 1 || months === 12) {
      guaranteeBanner = "1-Year Price Guarantee";
      guaranteeColor = "blue";
    }

    const download = offer.internetSpeedText?.replace(/^Up to /i, "") || "1 Gbps";
    const upload = offer.internetUploadSpeedText?.replace(/^Up to /i, "") || "50 Mbps";

    // Format subhead cleanly from products
    const subheadParts = [];
    (offer.product || []).forEach((p) => {
      const lob = p.lineOfBusiness;
      const desc = p.description || p.name || "";
      if (lob === "Internet") {
        subheadParts.push(`${download} x ${upload}`);
      } else if (lob === "Mobile") {
        if (desc.includes("4 Lines")) subheadParts.push("4 Unlimited Lines");
        else if (desc.includes("Free")) subheadParts.push("Unlimited (Included)");
        else subheadParts.push("Unlimited (Paid)");
      } else if (lob === "Phone") {
        subheadParts.push("35+ Calling Features (Paid)");
      } else if (lob === "Business Connect") {
        subheadParts.push("Business Connect Cloud Phone");
      } else if (lob === "TV") {
        subheadParts.push(desc);
      }
    });

    const subhead = subheadParts.length > 0 ? subheadParts.join(" | ") : offer.name;

    const bullets = [
      offer.internetSpeedText
        ? `Ideal for connected offices with speeds up to ${offer.internetSpeedText} x ${upload}`
        : "Ideal for connected office spaces with speeds up to 1 Gbps x 50 Mbps",
      (offer.lineOfBusiness || []).includes("Mobile")
        ? "Seamless connectivity with nationwide 5G unlimited talk, text and high-speed data"
        : "Fast and reliable high-speed connection with zero data caps or throttles",
      (offer.lineOfBusiness || []).some((l) => /phone|voice|connect/i.test(l))
        ? "Business voice with unlimited local and long distance calling, Call Guard and 35+ features"
        : "24/7 dedicated business technical support and free security suite included",
    ];

    if ((offer.lineOfBusiness || []).includes("TV")) {
      bullets.push("High-definition business video programming with no broadcast surcharges");
    }

    let tag = "One of our best available offers!";
    if (offer.group === "SMB Free Internet") tag = "Special Multi-Line Offer";
    else if (years === 3 || months === 36) tag = "Best Value 3-Year Lock";
    else if (offerEnrichment?.offerTags) {
      try {
        tag = JSON.parse(offerEnrichment.offerTags).tagCopy || tag;
      } catch {
        // fallback
      }
    }

    const broadbandLabelUrl =
      (offer.product || []).find((p) => p.broadbandLabel?.length)?.broadbandLabel?.[0]?.link ||
      "https://labels.bcl.spectrum.com/SMB-SBAD4-A-NAT-EN.html";

    // Itemized products for breakdown modal
    const products = (offer.product || []).map((p) => ({
      name: p.description || p.name || p.lineOfBusiness,
      netPrice: p.pricing?.netPrice ?? 0,
      listPrice: p.pricing?.listPrice ?? p.pricing?.netPrice ?? 0,
      note: p.pricing?.discountTermText || (p.pricing?.netPrice === 0 ? "Included" : ""),
    }));

    return {
      id: offer.id,
      name: offer.name,
      subhead,
      downloadSpeed: download,
      uploadSpeed: upload,
      bullets,
      tag,
      price: typeof price === "number" ? price : parseFloat(price) || 120,
      priceNote,
      guaranteeBanner,
      guaranteeColor,
      broadbandLabelUrl,
      products,
      rawOffer: offer,
    };
  }, []);

  // Smart Filtering Engine
  const filterAndDisplayOffers = useCallback(
    (offersList, selectedKeys, enrich = enrichmentData) => {
      // 1. If no options selected, show featured top bundles
      if (!selectedKeys || selectedKeys.length === 0) {
        setFilterMessage(null);
        if (offersList.length > 0) {
          const featured = offersList
            .filter((o) => {
              const months = o.pricing?.discountTerm;
              return months === 36 || months === 24 || months === 12;
            })
            .slice(0, 6)
            .map((o) => transformOfferToPlan(o, enrich));
          setDisplayedPlans(featured.length > 0 ? featured : offersList.slice(0, 6).map((o) => transformOfferToPlan(o, enrich)));
        } else {
          setDisplayedPlans(FALLBACK_PLANS.slice(0, 3));
        }
        return;
      }

      const selectedCats = new Set(selectedKeys.map(getCategory));

      // 2. Working with LIVE API Offers
      if (offersList && offersList.length > 0) {
        // Step A: Exact category match + product option match
        let matched = offersList.filter((offer) => {
          const offerProductKeys = (offer.product || []).map(getProductKey);
          const offerCats = new Set(offerProductKeys.map(getCategory));

          // Must have exactly the selected categories
          if (offerCats.size !== selectedCats.size) return false;
          for (const c of selectedCats) {
            if (!offerCats.has(c)) return false;
          }

          // In each category, offer must contain user's selected product
          for (const c of selectedCats) {
            const userChoices = selectedKeys.filter((k) => getCategory(k) === c);
            const offerChoices = offerProductKeys.filter((k) => getCategory(k) === c);
            const hasMatch = offerChoices.some((k) => userChoices.includes(k));
            if (!hasMatch) return false;
          }
          return true;
        });

        // Step B: Soft match if no exact subset exists (e.g. Mobile standalone -> show bundles with Mobile)
        let isSoftMatch = false;
        if (matched.length === 0) {
          matched = offersList.filter((offer) => {
            const offerProductKeys = (offer.product || []).map(getProductKey);
            for (const c of selectedCats) {
              const userChoices = selectedKeys.filter((k) => getCategory(k) === c);
              const hasMatch = offerProductKeys.some((k) => userChoices.includes(k));
              if (!hasMatch) return false;
            }
            return true;
          });
          isSoftMatch = true;
        }

        if (matched.length > 0) {
          if (isSoftMatch) {
            setFilterMessage(
              "Note: Standalone service was matched to available bundles containing your selection."
            );
          } else {
            setFilterMessage(null);
          }
          // Sort matched offers: 3-Year locks first, then 2-Year, then by price
          const sorted = matched
            .slice(0, 9)
            .sort((a, b) => {
              const termA = a.pricing?.discountTerm || 0;
              const termB = b.pricing?.discountTerm || 0;
              if (termB !== termA) return termB - termA;
              return (a.pricing?.netPrice || 0) - (b.pricing?.netPrice || 0);
            })
            .map((o) => transformOfferToPlan(o, enrich));

          setDisplayedPlans(sorted);
        } else {
          setFilterMessage(null);
          setDisplayedPlans([]);
        }
      } else {
        // 3. Working with FALLBACK / OFFLINE Plans
        let matched = FALLBACK_PLANS.filter((plan) => {
          const planKeys = plan.productKeys || [];
          const planCats = new Set(planKeys.map(getCategory));

          // Check categories
          if (planCats.size !== selectedCats.size) return false;
          for (const c of selectedCats) {
            if (!planCats.has(c)) return false;
          }

          for (const c of selectedCats) {
            const userChoices = selectedKeys.filter((k) => getCategory(k) === c);
            const hasMatch = planKeys.some((k) => userChoices.includes(k));
            if (!hasMatch) return false;
          }
          return true;
        });

        if (matched.length === 0) {
          matched = FALLBACK_PLANS.filter((plan) => {
            const planKeys = plan.productKeys || [];
            for (const c of selectedCats) {
              const userChoices = selectedKeys.filter((k) => getCategory(k) === c);
              const hasMatch = planKeys.some((k) => userChoices.includes(k));
              if (!hasMatch) return false;
            }
            return true;
          });
        }

        setFilterMessage(null);
        setDisplayedPlans(matched);
      }
    },
    [enrichmentData, transformOfferToPlan]
  );

  // Background Live CRM Spectrum API fetch
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setIsLoadingApi(true);
      try {
        const authRes = await fetch("/crm-api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "spectrum@vahlayconsulting.com",
            password: "spectrum@vahlayconsulting.com",
          }),
        });

        const token = authRes.headers.get("x-crm-token");
        if (!token) {
          if (isMounted) setIsLoadingApi(false);
          return;
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const payload = {
          addressInformation: {
            line1: "120 Broadway",
            line2: "# 10-1",
            postalCode: "10271",
            locationKey: "10271019800023",
          },
          channelInformation: {
            affiliateId: "218739",
            channel: "SMB-CP",
            customerPresent: "false",
            barRestaurant: false,
            evo: "",
            originatingFlowId: "SBCHPTNRC",
            salesAgentId: "60542%2FIBS01162",
            salesAgentEmail: "admin@vahlayconsulting.com",
          },
          fetchOffers: true,
          offerType: "C",
        };

        const [lookupRes, enrichRes] = await Promise.all([
          fetch("/crm-api/spectrum/lookup", {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
          }),
          fetch("/crm-api/spectrum/enrichment", { headers }).catch(() => ({
            json: () => ({}),
          })),
        ]);

        const lookupData = await lookupRes.json();
        const enrich = await enrichRes.json();

        if (isMounted) {
          setEnrichmentData(enrich || {});
          if (lookupData.offers && lookupData.offers.length > 0) {
            setRawOffers(lookupData.offers);
            filterAndDisplayOffers(lookupData.offers, selectedCheckboxes, enrich);
          }
        }
      } catch (err) {
        // Fallback already preloaded safely
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Checkbox toggle with instant real-time filtering
  const handleToggleCheckbox = (categoryKey, value) => {
    const limit = selectionLimits[categoryKey] || 3;
    const isSelected = selectedCheckboxes.includes(value);

    let nextSelection = [];
    if (isSelected) {
      nextSelection = selectedCheckboxes.filter((v) => v !== value);
    } else {
      const currentInGroup = selectedCheckboxes.filter(
        (val) => getCategory(val) === categoryKey
      );
      if (currentInGroup.length >= limit) {
        const otherGroupItems = selectedCheckboxes.filter(
          (val) => getCategory(val) !== categoryKey
        );
        const updatedGroup = [...currentInGroup.slice(1), value];
        nextSelection = [...otherGroupItems, ...updatedGroup];
      } else {
        nextSelection = [...selectedCheckboxes, value];
      }
    }

    setSelectedCheckboxes(nextSelection);
    filterAndDisplayOffers(rawOffers, nextSelection);
  };

  // Reset button
  const handleReset = () => {
    setSelectedCheckboxes([]);
    filterAndDisplayOffers(rawOffers, []);
  };

  // Manual Apply button
  const handleApply = () => {
    filterAndDisplayOffers(rawOffers, selectedCheckboxes);
  };

  // Preset button clicker
  const handleSelectPreset = (presetKeys) => {
    setSelectedCheckboxes(presetKeys);
    filterAndDisplayOffers(rawOffers, presetKeys);
  };

  // Selected count per category
  const getSelectedCount = (catKey) =>
    selectedCheckboxes.filter((val) => getCategory(val) === catKey).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-5 sm:p-8 lg:p-10 my-10 font-sans text-slate-900 transition-all">
      {/* 1. TOP HEADER & BUNDLE BUILDER TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-6 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded border border-red-100 flex items-center gap-1">
              <Sparkles size={12} /> Interactive Pricing Lab
            </span>
            {isLoadingApi && (
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded animate-pulse">
                Syncing Live Spectrum Data...
              </span>
            )}
            {!isLoadingApi && rawOffers.length > 0 && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                <Check size={11} /> Live Spectrum API Connected
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-batangas font-bold text-slate-900 tracking-tight">
            Build a Bundle
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure broadband speed and add-ons to calculate monthly customer rates and promotional guarantees.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 mr-1 hidden lg:inline">
            Presets:
          </span>
          {BUNDLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset.keys)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-gray-50 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-gray-200 hover:border-red-200 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 shadow-2xs"
            >
              <span>{preset.label}</span>
              <span className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.2 rounded font-bold text-gray-500">
                {preset.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. FOUR FILTER COLUMNS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 mb-6">
        {/* INTERNET */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase flex items-center gap-1.5">
              <Wifi size={14} className="text-red-600" /> INTERNET
            </h3>
            {getSelectedCount("INTERNET") > 0 ? (
              <span className="text-[10px] font-semibold text-[#1376cd] bg-blue-100/70 px-1.5 py-0.5 rounded">
                {getSelectedCount("INTERNET")}/3
              </span>
            ) : (
              <span className="text-[10px] text-gray-400 font-medium">None</span>
            )}
          </div>
          <span className="text-[11px] text-gray-500 font-normal block mb-3">
            [Select up to 3 speeds]
          </span>

          <div className="space-y-1.5">
            {defaultOptionsConfig.INTERNET.map((item) => {
              const isChecked = selectedCheckboxes.includes(item.value);
              return (
                <div
                  key={item.value}
                  onClick={() => handleToggleCheckbox("INTERNET", item.value)}
                  className={`flex items-start gap-2.5 p-2 rounded-lg transition-all cursor-pointer select-none border ${
                    isChecked
                      ? "bg-blue-50/80 border-[#1376cd]/40 shadow-2xs"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`opt-${item.value}`}
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1376cd] focus:ring-[#1376cd] cursor-pointer"
                  />
                  <label htmlFor={`opt-${item.value}`} className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[12px] font-bold leading-tight block ${
                          isChecked ? "text-[#1376cd]" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] bg-red-100 text-red-700 px-1 rounded font-bold ml-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.detail && (
                      <span className="text-[10px] text-gray-500 block mt-0.5 font-medium">
                        {item.detail}
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase flex items-center gap-1.5">
              <Smartphone size={14} className="text-emerald-600" /> MOBILE
            </h3>
            {getSelectedCount("MOBILE") > 0 ? (
              <span className="text-[10px] font-semibold text-[#1376cd] bg-blue-100/70 px-1.5 py-0.5 rounded">
                {getSelectedCount("MOBILE")}/1
              </span>
            ) : (
              <span className="text-[10px] text-gray-400 font-medium">None</span>
            )}
          </div>
          <span className="text-[11px] text-gray-500 font-normal block mb-3">
            [Limited to 1 line type]
          </span>

          <div className="space-y-1.5">
            {defaultOptionsConfig.MOBILE.map((item) => {
              const isChecked = selectedCheckboxes.includes(item.value);
              return (
                <div
                  key={item.value}
                  onClick={() => handleToggleCheckbox("MOBILE", item.value)}
                  className={`flex items-start gap-2.5 p-2 rounded-lg transition-all cursor-pointer select-none border ${
                    isChecked
                      ? "bg-blue-50/80 border-[#1376cd]/40 shadow-2xs"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`opt-${item.value}`}
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1376cd] focus:ring-[#1376cd] cursor-pointer"
                  />
                  <label htmlFor={`opt-${item.value}`} className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[12px] font-bold leading-tight block ${
                          isChecked ? "text-[#1376cd]" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold ml-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.detail && (
                      <span className="text-[10px] text-gray-500 block mt-0.5 font-medium">
                        {item.detail}
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* TV */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase flex items-center gap-1.5">
              <Tv size={14} className="text-indigo-600" /> TV (VIDEO)
            </h3>
            {getSelectedCount("TV") > 0 ? (
              <span className="text-[10px] font-semibold text-[#1376cd] bg-blue-100/70 px-1.5 py-0.5 rounded">
                {getSelectedCount("TV")}/3
              </span>
            ) : (
              <span className="text-[10px] text-gray-400 font-medium">None</span>
            )}
          </div>
          <span className="text-[11px] text-gray-500 font-normal block mb-3">
            [Select up to 3 tiers]
          </span>

          <div className="space-y-1.5">
            {defaultOptionsConfig.TV.map((item) => {
              const isChecked = selectedCheckboxes.includes(item.value);
              return (
                <div
                  key={item.value}
                  onClick={() => handleToggleCheckbox("TV", item.value)}
                  className={`flex items-start gap-2.5 p-2 rounded-lg transition-all cursor-pointer select-none border ${
                    isChecked
                      ? "bg-blue-50/80 border-[#1376cd]/40 shadow-2xs"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`opt-${item.value}`}
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1376cd] focus:ring-[#1376cd] cursor-pointer"
                  />
                  <label htmlFor={`opt-${item.value}`} className="cursor-pointer flex-1">
                    <span
                      className={`text-[12px] font-bold leading-tight block ${
                        isChecked ? "text-[#1376cd]" : "text-slate-800"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.detail && (
                      <span className="text-[10px] text-gray-500 block mt-0.5 font-medium">
                        {item.detail}
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMMUNICATIONS */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase flex items-center gap-1.5">
              <PhoneCall size={14} className="text-purple-600" /> COMMUNICATIONS
            </h3>
            {getSelectedCount("COMMUNICATIONS") > 0 ? (
              <span className="text-[10px] font-semibold text-[#1376cd] bg-blue-100/70 px-1.5 py-0.5 rounded">
                {getSelectedCount("COMMUNICATIONS")}/3
              </span>
            ) : (
              <span className="text-[10px] text-gray-400 font-medium">None</span>
            )}
          </div>
          <span className="text-[11px] text-gray-500 font-normal block mb-3">
            [Voice & Connect options]
          </span>

          <div className="space-y-1.5">
            {defaultOptionsConfig.COMMUNICATIONS.map((item) => {
              const isChecked = selectedCheckboxes.includes(item.value);
              return (
                <div
                  key={item.value}
                  onClick={() => handleToggleCheckbox("COMMUNICATIONS", item.value)}
                  className={`flex items-start gap-2.5 p-2 rounded-lg transition-all cursor-pointer select-none border ${
                    isChecked
                      ? "bg-blue-50/80 border-[#1376cd]/40 shadow-2xs"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`opt-${item.value}`}
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1376cd] focus:ring-[#1376cd] cursor-pointer"
                  />
                  <label htmlFor={`opt-${item.value}`} className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[12px] font-bold leading-tight block ${
                          isChecked ? "text-[#1376cd]" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] bg-purple-100 text-purple-800 px-1 rounded font-bold ml-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.detail && (
                      <span className="text-[10px] text-gray-500 block mt-0.5 font-medium">
                        {item.detail}
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. ACTION BAR & STATUS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-600 hover:text-slate-900 border border-gray-200 hover:border-gray-400 rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw size={13} /> RESET FILTERS
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-[#1376cd] hover:bg-[#1062ab] active:scale-98 text-white text-xs font-bold rounded-lg shadow-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check size={14} /> APPLY SELECTION
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {displayedPlans.length} {displayedPlans.length === 1 ? "PLAN FOUND" : "PLANS MATCHED"}
          </span>
          {selectedCheckboxes.length > 0 && (
            <span className="text-[11px] text-gray-500 font-medium">
              ({selectedCheckboxes.length} active filter{selectedCheckboxes.length > 1 ? "s" : ""})
            </span>
          )}
        </div>
      </div>

      {filterMessage && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2 animate-fade-in">
          <Info size={16} className="text-amber-600 shrink-0" />
          <span>{filterMessage}</span>
        </div>
      )}

      {/* 4. PLANS CARDS GRID */}
      {displayedPlans.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 sm:p-12 text-center animate-fade-in">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
            <AlertCircle size={24} />
          </div>
          <h4 className="text-base font-bold text-slate-800 mb-1">
            No Exact Plan Match Found
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-6">
            Spectrum packages typically require an Internet base to bundle with Mobile or Voice. Try selecting an Internet speed, or click below to restore the standard 3-plan bundle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleSelectPreset(["INTERNET_GIG", "MOBILE", "VOICE"])}
              className="px-5 py-2.5 bg-[#1376cd] hover:bg-[#1062ab] text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-xs active:scale-95"
            >
              Load Standard 3-Plan Bundle
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-slate-700 text-xs font-bold rounded-lg cursor-pointer transition-all"
            >
              Show All Recommended Offers
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {displayedPlans.map((plan, idx) => (
            <div
              key={plan.id || idx}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between relative group"
            >
              {/* Price Guarantee Banner */}
              {plan.guaranteeBanner && (
                <div
                  className={`w-full py-1.5 px-4 text-xs font-bold tracking-wide flex items-center justify-between ${
                    plan.guaranteeColor === "yellow"
                      ? "bg-[#f59e0b] text-slate-950"
                      : "bg-[#1376cd] text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} /> {plan.guaranteeBanner}
                  </span>
                  <span className="text-[10px] font-semibold opacity-90 uppercase tracking-wider">
                    Price Lock
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                {/* Speed & Features Heading */}
                <h5 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-3 line-clamp-2">
                  {plan.subhead}
                </h5>

                {/* Bullets */}
                <ul className="text-xs text-gray-600 space-y-2 mb-4 leading-relaxed flex-1">
                  {plan.bullets?.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-[#1376cd] font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tag Badge */}
                {plan.tag && (
                  <div className="mt-auto mb-4 flex items-center gap-1.5 text-xs font-bold text-[#1376cd]">
                    <Tag size={13} className="fill-[#1376cd] text-[#1376cd]" />
                    <span>{plan.tag}</span>
                  </div>
                )}

                {/* Bottom Pricing Row */}
                <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      ${typeof plan.price === "number" ? plan.price : parseFloat(plan.price) || 120}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium ml-1">
                      {plan.priceNote || "/mo with Auto Pay"}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setModalContent(plan);
                      setActiveModal("info");
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 underline cursor-pointer whitespace-nowrap font-medium"
                  >
                    Pricing & breakdown
                  </button>
                </div>

                {/* Broadband Facts Label Link */}
                <div className="mt-2 text-left">
                  <button
                    onClick={() => {
                      setModalContent(plan);
                      setActiveModal("broadband");
                    }}
                    className="text-xs text-gray-500 hover:text-slate-800 underline cursor-pointer flex items-center gap-1"
                  >
                    <FileText size={12} /> Show Broadband Label
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: PRICING BREAKDOWN */}
      {activeModal === "info" && modalContent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-[#1376cd] rounded-lg">
                  <Layers size={18} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Plan Pricing Breakdown</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-slate-800 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                  Package Title
                </span>
                <span className="font-bold text-slate-900 text-sm">{modalContent.subhead}</span>
              </div>

              {/* Itemized Services if available */}
              {modalContent.products && modalContent.products.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Included Services & Pricing
                  </h4>
                  <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
                    {modalContent.products.map((prod, pIdx) => (
                      <div key={pIdx} className="p-2.5 flex items-center justify-between bg-white text-xs">
                        <div>
                          <span className="font-semibold text-slate-900 block">{prod.name}</span>
                          {prod.note && (
                            <span className="text-[10px] text-gray-400 block">{prod.note}</span>
                          )}
                        </div>
                        <span className="font-bold text-slate-800">
                          {prod.netPrice === 0 ? (
                            <span className="text-emerald-600 uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-extrabold">
                              Included
                            </span>
                          ) : (
                            `$${prod.netPrice}/mo`
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary Rate Lines */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between font-bold text-sm text-slate-900">
                  <span>Net Monthly Rate:</span>
                  <span className="text-[#1376cd] text-base">${modalContent.price}/month</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Auto Pay & Paperless Discount:</span>
                  <span>-$5.00/mo included</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Contract Terms:</span>
                  <span>No Annual Contract Required</span>
                </div>
                {modalContent.guaranteeBanner && (
                  <div className="flex justify-between font-bold text-amber-600">
                    <span>Price Guarantee Lock:</span>
                    <span>{modalContent.guaranteeBanner}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-gray-100 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-[#1376cd] hover:bg-[#1062ab] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BROADBAND FACTS LABEL */}
      {activeModal === "broadband" && modalContent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-fade-in text-slate-900">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileText size={18} className="text-[#1376cd]" /> Broadband Facts Label
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-slate-800 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Official FCC Style Broadband Nutrition Facts Box */}
            <div className="border-2 border-slate-900 p-4 rounded-xl text-xs space-y-2 bg-white">
              <h4 className="font-extrabold text-base border-b-2 border-slate-900 pb-1">
                Broadband Facts
              </h4>
              <p className="font-bold text-sm">Spectrum Business</p>
              <p className="text-[11px] text-gray-600 font-medium">{modalContent.subhead}</p>

              <div className="border-t-2 border-slate-900 pt-2 flex justify-between font-bold text-sm">
                <span>Monthly Price:</span>
                <span>${modalContent.price}/mo</span>
              </div>
              <p className="text-[10px] text-gray-500">
                This monthly price includes paperless billing and Auto Pay discounts.
              </p>

              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span>Typical Download Speed:</span>
                <span className="font-bold">{modalContent.downloadSpeed || "1,000 Mbps"}</span>
              </div>
              <div className="flex justify-between">
                <span>Typical Upload Speed:</span>
                <span className="font-bold">{modalContent.uploadSpeed || "50 Mbps"}</span>
              </div>
              <div className="flex justify-between">
                <span>Data Included with Monthly Price:</span>
                <span className="font-bold">Unlimited (No Data Cap)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Charges for Additional Data:</span>
                <span>$0 (None)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Network Management:</span>
                <span>Standard Management</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <a
                href={modalContent.broadbandLabelUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#1376cd] hover:underline flex items-center gap-1 font-semibold"
              >
                Open Official FCC Label <ExternalLink size={12} />
              </a>

              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
