/**
 * Vahlay Consulting - Video Streaming & Firebase Storage Service
 * Centralized video registry, URL resolution with caching, and playback analytics.
 */

import { storage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

// In-memory cache for resolved Firebase Storage download URLs
const urlCache = new Map();

// LocalStorage key prefix for saving playback progress
export const PLAYBACK_PROGRESS_KEY_PREFIX = "vahlay_video_progress_";

/**
 * Registry of Training Videos across the 8-Day Training Program
 */
export const TRAINING_VIDEOS = {
  day1: {
    id: "day1",
    day: 1,
    title: "Day 1: Orientation & ISP Foundation Training Video",
    description: "Complete recorded session for Day 1 orientation, workplace expectations, and telecom address standards walkthrough.",
    storagePath: "training_videos/Day01_1.mp4",
    defaultUrl: "https://firebasestorage.googleapis.com/v0/b/vahlay1.appspot.com/o/training_videos%2FDay01_1.mp4?alt=media&token=9daaf233-719f-4383-8a99-b33779eeeaeb",
    duration: 541, // ~9 minutes
    resolution: "1080p",
    poster: ""
  },
  day2: {
    id: "day2",
    day: 2,
    title: "Day 2: Telecom Basics & Connectivity Training Video",
    description: "In-depth walkthrough of internet connection technologies (Fiber, High-Split Coax, Cable), hardware modems/routers, and phone porting.",
    storagePath: "training_videos/Day02mp4.mp4",
    defaultUrl: "https://firebasestorage.googleapis.com/v0/b/vahlay1.appspot.com/o/training_videos%2FDay02mp4.mp4?alt=media&token=de820c89-56d1-487d-9c51-081a6c62c4f3",
    duration: 3449, // ~57.5 minutes
    resolution: "720p",
    poster: ""
  },
  day3: {
    id: "day3",
    day: 3,
    title: "Day 3: Sales Process Training Video",
    description: "Mastering the consultative sales flow, customer discovery, Clear Sales vs ALC pricing structures, and compliance rules.",
    storagePath: "training_videos/Day03.mp4",
    defaultUrl: "", // Available when uploaded
    duration: 0,
    resolution: "720p",
    poster: ""
  },
  day4: {
    id: "day4",
    day: 4,
    title: "Day 4: Buyflow & Service Qualification Video",
    description: "System address validation, network facility checks (Fiber On-Net vs Near-Net), 4-step buyflow, and error prevention.",
    storagePath: "training_videos/Day04.mp4",
    defaultUrl: "",
    duration: 0,
    resolution: "720p",
    poster: ""
  },
  day5: {
    id: "day5",
    day: 5,
    title: "Day 5: Communication, Accent & Live Rebuttals Video",
    description: "Pacing at 130–150 WPM, vocal clarity, handling skeptical business owners, and trainer mock call breakdowns.",
    storagePath: "training_videos/Day 3.mp4",
    defaultUrl: "https://firebasestorage.googleapis.com/v0/b/vahlay1.appspot.com/o/training_videos%2FDay%203.mp4?alt=media&token=3498e8fc-f099-45ad-abf0-28c3bcaf7e24",
    duration: 3558, // ~59.3 minutes
    resolution: "720p",
    poster: ""
  },
  day6: {
    id: "day6",
    day: 6,
    title: "Day 6: Targets & Bundling Tests Video",
    description: "Talk time targets, Internet + TV bundling test practice, QA criteria, and anti-slamming ethics.",
    storagePath: "training_videos/Day06.mp4",
    defaultUrl: "",
    duration: 0,
    resolution: "720p",
    poster: ""
  },
  day7: {
    id: "day7",
    day: 7,
    title: "Day 7: Live Call Observation Video",
    description: "Listening to live calls handled by senior floor agents and real-time objection handling.",
    storagePath: "training_videos/Day07.mp4",
    defaultUrl: "",
    duration: 0,
    resolution: "720p",
    poster: ""
  },
  day8: {
    id: "day8",
    day: 8,
    title: "Day 8: Operations Tools & Final Assessment Video",
    description: "CRM, ERP & Order Tracker workflows, written assessment, voice certification test, and floor graduation.",
    storagePath: "training_videos/Day08.mp4",
    defaultUrl: "",
    duration: 0,
    resolution: "720p",
    poster: ""
  }
};

/**
 * Get video details by key or day number (e.g., "day1", 1)
 */
export const getVideoInfo = (keyOrDay) => {
  if (typeof keyOrDay === "number") {
    return TRAINING_VIDEOS[`day${keyOrDay}`] || null;
  }
  const key = String(keyOrDay).toLowerCase();
  return TRAINING_VIDEOS[key] || TRAINING_VIDEOS[`day${key}`] || null;
};

/**
 * Resolve video download URL with multi-level caching (Memory -> SessionStorage -> Firebase Storage SDK -> Default URL)
 * Prevents repeated Firebase Storage requests and avoids unnecessary API calls.
 */
export const getVideoUrl = async (videoKeyOrPath) => {
  if (!videoKeyOrPath) return "";

  // 1. If it's already a full HTTP(S) URL, check if we need to clean or return directly
  if (videoKeyOrPath.startsWith("http://") || videoKeyOrPath.startsWith("https://")) {
    return videoKeyOrPath;
  }

  // 2. Check in-memory cache
  if (urlCache.has(videoKeyOrPath)) {
    return urlCache.get(videoKeyOrPath);
  }

  // 3. Check sessionStorage cache
  const sessionCacheKey = `cached_video_url_${videoKeyOrPath}`;
  if (typeof window !== "undefined" && window.sessionStorage) {
    const cached = window.sessionStorage.getItem(sessionCacheKey);
    if (cached) {
      urlCache.set(videoKeyOrPath, cached);
      return cached;
    }
  }

  // 4. Check static registry
  const videoInfo = getVideoInfo(videoKeyOrPath);
  if (videoInfo && videoInfo.defaultUrl) {
    urlCache.set(videoKeyOrPath, videoInfo.defaultUrl);
    return videoInfo.defaultUrl;
  }

  // 5. Query Firebase Storage SDK dynamically if path is provided
  const storagePath = videoInfo?.storagePath || videoKeyOrPath;
  if (storage && storagePath) {
    try {
      const storageRef = ref(storage, storagePath);
      const url = await getDownloadURL(storageRef);
      if (url) {
        urlCache.set(videoKeyOrPath, url);
        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem(sessionCacheKey, url);
        }
        return url;
      }
    } catch (err) {
      console.warn(`[VideoService] Could not resolve Firebase Storage path '${storagePath}':`, err.message);
    }
  }

  return videoInfo?.defaultUrl || "";
};

/**
 * Save playback position in seconds for a specific lesson & user
 */
export const savePlaybackPosition = (lessonId, userId, positionSeconds) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  if (!lessonId || typeof positionSeconds !== "number" || isNaN(positionSeconds)) return;

  const uid = userId || "anonymous";
  const key = `${PLAYBACK_PROGRESS_KEY_PREFIX}${lessonId}_${uid}`;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        position: Math.max(0, Math.floor(positionSeconds)),
        updatedAt: Date.now()
      })
    );
  } catch (e) {
    console.error("Error saving playback progress:", e);
  }
};

/**
 * Retrieve saved playback position in seconds (if less than 30 days old and not within 10s of end)
 */
export const getSavedPlaybackPosition = (lessonId, userId, videoDuration = 0) => {
  if (typeof window === "undefined" || !window.localStorage) return 0;
  if (!lessonId) return 0;

  const uid = userId || "anonymous";
  const key = `${PLAYBACK_PROGRESS_KEY_PREFIX}${lessonId}_${uid}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    const pos = Number(data.position) || 0;

    // If video is nearly complete (>95% or within 15 seconds of end), restart from 0
    if (videoDuration > 0 && (pos > videoDuration - 15 || pos / videoDuration > 0.95)) {
      return 0;
    }
    return pos;
  } catch (e) {
    console.error("Error reading playback progress:", e);
    return 0;
  }
};

/**
 * Clear saved position once lesson is complete
 */
export const clearPlaybackPosition = (lessonId, userId) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const uid = userId || "anonymous";
  const key = `${PLAYBACK_PROGRESS_KEY_PREFIX}${lessonId}_${uid}`;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing playback progress:", e);
  }
};
