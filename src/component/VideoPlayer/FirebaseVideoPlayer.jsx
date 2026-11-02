import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  AlertCircle,
  RefreshCw,
  Loader2,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
  Activity
} from "lucide-react";
import {
  savePlaybackPosition,
  getSavedPlaybackPosition,
  clearPlaybackPosition
} from "../../services/videoService";

/**
 * Format seconds into HH:MM:SS or MM:SS
 */
const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/**
 * High-Performance Firebase Video Player
 * - Uses HTTP Range requests for instant partial streaming
 * - Lazy loads video via IntersectionObserver to prevent initial page freeze
 * - Zero Blob downloading: streams directly from Firebase Storage URLs
 * - Built-in loading and buffering states
 * - Automatic playback resume from last saved timestamp
 * - Full controls: play/pause, seek, volume, speed selector (0.75x - 2x), fullscreen
 */
const FirebaseVideoPlayer = ({
  src,
  fallbackSrc,
  poster,
  title = "Training Session",
  lessonId,
  userId = "guest",
  onEnded,
  className = "",
  autoResume = true
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const hideControlsTimeoutRef = useRef(null);
  const bufferingTimeoutRef = useRef(null);

  // Playback States
  const [activeSrc, setActiveSrc] = useState(src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Network, Preloader & Buffer Health States
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [bufferRunway, setBufferRunway] = useState(0); // Forward seconds buffered ahead
  const [isPrebuffering, setIsPrebuffering] = useState(false);
  const [prebufferProgress, setPrebufferProgress] = useState(0); // 0 - 100%
  const [userWantsPlay, setUserWantsPlay] = useState(false);
  const SAFETY_BUFFER_TARGET = 5; // Target 5-second buffer runway for guaranteed smooth playback
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [resumedPosition, setResumedPosition] = useState(null);
  const [showResumeNotice, setShowResumeNotice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Lazy Loading Observer: Only mount/activate video element when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Preload when within 200px of viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Load Saved Timestamp
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const vidDuration = video.duration || 0;
    setDuration(vidDuration);
    setIsLoading(false);
    setHasError(false);

    if (autoResume && lessonId) {
      const savedPos = getSavedPlaybackPosition(lessonId, userId, vidDuration);
      if (savedPos > 5) {
        video.currentTime = savedPos;
        setCurrentTime(savedPos);
        setResumedPosition(savedPos);
        setShowResumeNotice(true);
        setTimeout(() => setShowResumeNotice(false), 5000);
      }
    }
  }, [autoResume, lessonId, userId]);

  // 3. Buffer Runway & Progress Calculation
  const updateBufferRunway = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.buffered.length) return 0;

    try {
      const cTime = video.currentTime;
      let forwardSecs = 0;
      for (let i = 0; i < video.buffered.length; i++) {
        const start = video.buffered.start(i);
        const end = video.buffered.end(i);
        if (start <= cTime + 0.5 && end >= cTime) {
          forwardSecs = Math.max(0, end - cTime);
          break;
        }
      }

      setBufferRunway(Math.round(forwardSecs * 10) / 10);
      const pct = Math.min(100, Math.round((forwardSecs / SAFETY_BUFFER_TARGET) * 100));
      setPrebufferProgress(pct);

      const end = video.buffered.end(video.buffered.length - 1);
      setBufferedEnd(end);

      return forwardSecs;
    } catch {
      return 0;
    }
  }, [SAFETY_BUFFER_TARGET]);

  const handleProgress = useCallback(() => {
    updateBufferRunway();
  }, [updateBufferRunway]);

  // 3.4 Auto-start / Resume playback once safety runway is loaded
  useEffect(() => {
    if (userWantsPlay && isPrebuffering) {
      const video = videoRef.current;
      if (video && (bufferRunway >= 3.5 || prebufferProgress >= 70 || video.readyState >= 4)) {
        video.play().then(() => {
          setIsPlaying(true);
          setIsPrebuffering(false);
          setUserWantsPlay(false);
          setIsBuffering(false);
        }).catch((err) => {
          console.warn("[FirebaseVideoPlayer] Prebuffer play interrupted:", err);
        });
      }
    }
  }, [userWantsPlay, isPrebuffering, bufferRunway, prebufferProgress]);

  // Bypass prebuffer on user request
  const handleBypassPreload = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setIsPrebuffering(false);
      setUserWantsPlay(false);
      setIsBuffering(false);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.warn(e));
    }
  }, []);

  // 3.5 Debounced Buffering Handler with Recovery Preloader
  const handleWaiting = useCallback(() => {
    clearTimeout(bufferingTimeoutRef.current);
    if (videoRef.current && videoRef.current.paused) {
      setIsBuffering(false);
      return;
    }
    bufferingTimeoutRef.current = setTimeout(() => {
      const vid = videoRef.current;
      if (vid && !vid.paused && vid.readyState < 3) {
        setIsBuffering(true);
        // Engage recovery preloader to build a 3-second safety runway
        setIsPrebuffering(true);
        setUserWantsPlay(true);
      }
    }, 600);
  }, []);

  const handlePlaying = useCallback(() => {
    clearTimeout(bufferingTimeoutRef.current);
    setIsBuffering(false);
    setIsPrebuffering(false);
    setUserWantsPlay(false);
    setIsLoading(false);
    setIsPlaying(true);
  }, []);

  const handleCanPlay = useCallback(() => {
    clearTimeout(bufferingTimeoutRef.current);
    setIsBuffering(false);
    setIsLoading(false);
    updateBufferRunway();
  }, [updateBufferRunway]);

  const handlePause = useCallback(() => {
    clearTimeout(bufferingTimeoutRef.current);
    setIsBuffering(false);
    setIsPlaying(false);
  }, []);

  // 4. Save progress periodically
  useEffect(() => {
    if (isPlaying && lessonId) {
      progressIntervalRef.current = setInterval(() => {
        if (videoRef.current) {
          const time = videoRef.current.currentTime;
          if (time > 0) {
            savePlaybackPosition(lessonId, userId, time);
          }
        }
      }, 3000); // Debounced to every 3 seconds
    } else {
      clearInterval(progressIntervalRef.current);
    }

    return () => clearInterval(progressIntervalRef.current);
  }, [isPlaying, lessonId, userId]);

  // 5. Play / Pause Toggle with Smart Safety Pre-buffering
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setIsPrebuffering(false);
      setUserWantsPlay(false);
      setIsBuffering(false);
    } else {
      const forward = updateBufferRunway();
      const nearEnd = video.duration > 0 && (video.duration - video.currentTime < 5);

      // If buffer runway is critically low (< 2.5s) on a normal video, preload first to prevent stutter
      if (forward < 2.5 && video.readyState < 4 && !nearEnd && video.duration > 10) {
        setIsPrebuffering(true);
        setUserWantsPlay(true);
      } else {
        setIsPrebuffering(false);
        setUserWantsPlay(false);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Autoplay / Play blocked:", err);
        });
      }
    }
  }, [isPlaying, updateBufferRunway]);

  // 6. Skip Forward / Backward
  const skip = useCallback((seconds) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), video.duration || Infinity);
  }, []);

  // 7. Seek to specific timestamp
  const handleSeek = useCallback((e) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const targetTime = pos * duration;

    video.currentTime = targetTime;
    setCurrentTime(targetTime);
  }, [duration]);

  // 8. Volume & Mute Controls
  const handleVolumeChange = useCallback((e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  }, [isMuted, volume]);

  // 9. Speed Control
  const handleRateChange = useCallback((rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  }, []);

  // 10. Fullscreen Toggle
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(console.error);
    }
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // 11. Error Recovery / Retry
  const handleRetry = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setIsLoading(true);
    setIsBuffering(false);

    const saved = video.currentTime;
    video.load();
    if (saved > 0) {
      video.currentTime = saved;
    }
  }, []);

  // 12. Controls Auto-Hide
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideControlsTimeoutRef.current);
    if (isPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 3000);
    }
  }, [isPlaying]);

  // 13. Keyboard Shortcuts Support
  const handleKeyDown = useCallback((e) => {
    // Avoid interfering if user is focused on an input/textarea
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        togglePlay();
        break;
      case "ArrowLeft":
      case "j":
        e.preventDefault();
        skip(-10);
        break;
      case "ArrowRight":
      case "l":
        e.preventDefault();
        skip(10);
        break;
      case "ArrowUp":
        e.preventDefault();
        setVolume((v) => {
          const nv = Math.min(1, v + 0.1);
          if (videoRef.current) videoRef.current.volume = nv;
          return nv;
        });
        break;
      case "ArrowDown":
        e.preventDefault();
        setVolume((v) => {
          const nv = Math.max(0, v - 0.1);
          if (videoRef.current) videoRef.current.volume = nv;
          return nv;
        });
        break;
      case "f":
      case "F":
        e.preventDefault();
        toggleFullscreen();
        break;
      case "m":
      case "M":
        e.preventDefault();
        toggleMute();
        break;
      default:
        break;
    }
  }, [togglePlay, skip, toggleFullscreen, toggleMute]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-video w-full select-none focus:outline-hidden group ${className}`}
    >
      {/* LAZY LOAD PLACEHOLDER */}
      {!isVisible ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
          <div className="w-14 h-14 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mb-3 animate-pulse">
            <Play size={28} className="ml-1" />
          </div>
          <p className="text-sm font-semibold text-gray-200">{title}</p>
          <p className="text-xs text-gray-400 mt-1">Scroll down or click to load video streaming</p>
          <button
            onClick={() => setIsVisible(true)}
            className="mt-4 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer"
          >
            Load Video Now
          </button>
        </div>
      ) : (
        <>
          {/* VIDEO ELEMENT */}
          <video
            ref={videoRef}
            src={activeSrc}
            poster={poster}
            preload="auto"
            playsInline
            onClick={togglePlay}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                updateBufferRunway();
              }
            }}
            onLoadedMetadata={handleLoadedMetadata}
            onProgress={handleProgress}
            onWaiting={handleWaiting}
            onPlaying={handlePlaying}
            onCanPlay={handleCanPlay}
            onSeeked={handleCanPlay}
            onPause={handlePause}
            onEnded={() => {
              setIsPlaying(false);
              if (lessonId) clearPlaybackPosition(lessonId, userId);
              onEnded?.();
            }}
            onError={(e) => {
              console.error("[FirebaseVideoPlayer] Error loading media:", e);
              if (fallbackSrc && activeSrc !== fallbackSrc) {
                console.warn("[FirebaseVideoPlayer] Failing over to fallback URL:", fallbackSrc);
                setActiveSrc(fallbackSrc);
                setIsLoading(true);
                setHasError(false);
              } else {
                setIsLoading(false);
                setIsBuffering(false);
                setIsPrebuffering(false);
                setHasError(true);
                setErrorMessage("Video stream was interrupted. Check your network connection and click retry.");
              }
            }}
            className="w-full h-full object-contain cursor-pointer"
          >
            Your browser does not support HTML5 video streaming.
          </video>

          {/* INITIAL LOADING STATE */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-xs text-white z-20 pointer-events-none">
              <Loader2 className="w-10 h-10 text-red-500 animate-spin mb-3" />
              <p className="text-xs font-semibold text-gray-200">Connecting to Firebase Stream...</p>
              <p className="text-[10px] text-gray-400 mt-1">Loading partial metadata</p>
            </div>
          )}

          {/* BUFFERING / WAITING NON-INTRUSIVE BADGE (Only when playing and actually stalled) */}
          {isBuffering && isPlaying && !isLoading && !hasError && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none transition-all animate-fade-in">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/95 border border-slate-700/80 rounded-full shadow-xl">
                <Loader2 className="w-3.5 h-3.5 text-red-500 animate-spin" />
                <span className="text-[11px] font-medium text-gray-200">Buffering...</span>
              </div>
            </div>
          )}

          {/* ERROR & RETRY OVERLAY */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 text-white p-6 text-center z-30">
              <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-3">
                <AlertCircle size={28} />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Playback Interrupted</h4>
              <p className="text-xs text-gray-400 max-w-md mb-4">{errorMessage}</p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>Retry Playback</span>
              </button>
            </div>
          )}

          {/* RESUME NOTICE BANNER */}
          {showResumeNotice && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white rounded-lg text-xs shadow-lg animate-fade-in">
              <Sparkles size={14} className="text-yellow-400" />
              <span>Resumed from <strong>{formatTime(resumedPosition)}</strong></span>
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    setCurrentTime(0);
                    setShowResumeNotice(false);
                  }
                }}
                className="ml-2 text-[10px] text-red-400 hover:underline cursor-pointer"
              >
                Start Over
              </button>
            </div>
          )}

          {/* SMART STREAM PRELOADER / BUFFER SAFETY RUNWAY OVERLAY */}
          {isPrebuffering && !hasError && (
            <div className="absolute inset-0 z-25 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-xs text-white px-4 animate-fade-in">
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-inner">
                  <Zap size={22} className="animate-pulse" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    Pre-buffering Stream
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Loading {SAFETY_BUFFER_TARGET}s safety cushion to guarantee buffer-free playback
                  </p>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Buffer: {bufferRunway.toFixed(1)}s / {SAFETY_BUFFER_TARGET}s
                    </span>
                    <span className="font-semibold text-white">{prebufferProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div
                      className="h-full bg-linear-to-r from-red-600 via-amber-500 to-emerald-500 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      style={{ width: `${Math.max(6, prebufferProgress)}%` }}
                    />
                  </div>
                </div>

                {/* Force Play / Bypass */}
                <div className="pt-1">
                  <button
                    onClick={handleBypassPreload}
                    className="text-[11px] text-gray-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Play immediately (skip pre-buffer)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BIG PLAY BUTTON (WHEN PAUSED) */}
          {!isPlaying && !isLoading && !hasError && !isPrebuffering && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 z-10 cursor-pointer"
            >
              <div className="w-16 h-16 bg-red-600/90 hover:bg-red-600 hover:scale-110 text-white rounded-full flex items-center justify-center shadow-2xl transition-all">
                <Play size={28} className="ml-1" />
              </div>
            </div>
          )}

          {/* CONTROLS OVERLAY */}
          <div
            className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent p-4 pt-10 z-20 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* TIMELINE / SEEK BAR WITH BUFFER PROGRESS */}
            <div
              onClick={handleSeek}
              className="relative h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer mb-3 transition-all"
            >
              {/* BUFFERED BAR */}
              <div
                className="absolute top-0 left-0 h-full bg-white/30 rounded-full transition-all duration-200"
                style={{ width: `${duration > 0 ? (bufferedEnd / duration) * 100 : 0}%` }}
              />

              {/* CURRENT PROGRESS BAR */}
              <div
                className="absolute top-0 left-0 h-full bg-red-600 rounded-full relative"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              >
                {/* SCRUBBER HEAD */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            {/* BUTTONS BAR */}
            <div className="flex items-center justify-between text-white text-xs">
              {/* LEFT GROUP: Play, Skip, Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 hover:text-red-400 transition-colors cursor-pointer"
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  onClick={() => skip(-10)}
                  className="p-1.5 hover:text-red-400 transition-colors cursor-pointer text-gray-300"
                  title="Rewind 10s (Left Arrow)"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  onClick={() => skip(10)}
                  className="p-1.5 hover:text-red-400 transition-colors cursor-pointer text-gray-300"
                  title="Forward 10s (Right Arrow)"
                >
                  <RotateCw size={16} />
                </button>

                {/* VOLUME CONTROLS */}
                <div className="flex items-center gap-1.5 group/volume">
                  <button
                    onClick={toggleMute}
                    className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                    title={isMuted ? "Unmute (M)" : "Mute (M)"}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/30 accent-red-600 rounded-full cursor-pointer opacity-70 group-hover/volume:opacity-100 transition-opacity"
                  />
                </div>

                {/* TIME DISPLAY */}
                <div className="font-mono text-[11px] text-gray-300 ml-1">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-gray-500 mx-1">/</span>
                  <span className="text-gray-400">{formatTime(duration)}</span>
                </div>

                {/* BUFFER RUNWAY HEALTH GAUGE */}
                <div
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[10px] text-gray-300 shadow-inner ml-2"
                  title={`Safety Buffer Runway: ${bufferRunway.toFixed(1)} seconds pre-loaded ahead`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      bufferRunway >= 5
                        ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                        : bufferRunway >= 2.5
                        ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                        : "bg-red-400"
                    }`}
                  />
                  <span className="font-mono">
                    {bufferRunway > 0 ? `${bufferRunway.toFixed(0)}s runway` : "preloading"}
                  </span>
                </div>
              </div>

              {/* RIGHT GROUP: Speed, Fullscreen */}
              <div className="flex items-center gap-3 relative">
                {/* PLAYBACK SPEED BUTTON */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu((prev) => !prev)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-gray-200 transition-colors cursor-pointer"
                    title="Playback Speed"
                  >
                    <span>{playbackRate}x</span>
                  </button>

                  {/* SPEED DROPDOWN */}
                  {showSpeedMenu && (
                    <div className="absolute right-0 bottom-full mb-2 bg-slate-900 border border-slate-700 rounded-xl py-1 shadow-2xl z-30 min-w-[70px] animate-fade-in">
                      {[0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleRateChange(rate)}
                          className={`w-full px-3 py-1 text-left text-xs hover:bg-slate-800 transition-colors flex items-center justify-between cursor-pointer ${
                            playbackRate === rate ? "text-red-400 font-bold" : "text-gray-300"
                          }`}
                        >
                          <span>{rate}x</span>
                          {playbackRate === rate && <CheckCircle size={10} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* FULLSCREEN BUTTON */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 hover:text-red-400 transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                >
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(FirebaseVideoPlayer);

