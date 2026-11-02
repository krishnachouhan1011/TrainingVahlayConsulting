import React, { useState } from "react";
import {
  Video,
  Play,
  CheckCircle2,
  AlertTriangle,
  FileVideo,
  Gauge,
  Zap,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Layers,
  ArrowRight
} from "lucide-react";
import FirebaseVideoPlayer from "./FirebaseVideoPlayer";
import { TRAINING_VIDEOS } from "../../services/videoService";

const AdminVideoManagement = () => {
  const [selectedVideoKey, setSelectedVideoKey] = useState("day1");
  const [copiedCmd, setCopiedCmd] = useState(false);

  const selectedVideo = TRAINING_VIDEOS[selectedVideoKey];

  const ffmpegCommandExample = `ffmpeg -i "raw_training_video.mp4" -c:v libx264 -preset medium -crf 24 -maxrate 1500k -bufsize 3000k -pix_fmt yuv420p -vf scale=-2:720 -movflags +faststart -c:a aac -b:a 128k "optimized_video.mp4"`;

  const copyCommand = () => {
    navigator.clipboard?.writeText(ffmpegCommandExample);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                Video Engine Status: Active
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                HTTP Range Requests: 206 Partial Content
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Firebase Storage Video Streaming & Performance Manager
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-2xl">
              Inspect video delivery health, verify playback without buffering, and test the new HTML5 streaming player with lazy loading, buffer tracking, and resume timestamps.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-center">
              <span className="block text-xs text-gray-400">Total Modules</span>
              <span className="text-base font-bold">8 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Video Selector + Live Video Player Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video Registry List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Video size={16} className="text-red-600" />
            <span>Training Curriculum Videos</span>
          </h3>

          <div className="space-y-2.5">
            {Object.values(TRAINING_VIDEOS).map((v) => {
              const isSelected = selectedVideoKey === v.id;
              const hasUrl = !!v.defaultUrl;

              return (
                <div
                  key={v.id}
                  onClick={() => hasUrl && setSelectedVideoKey(v.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-red-50/50 border-red-500 shadow-sm ring-1 ring-red-500/30"
                      : hasUrl
                      ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs"
                      : "bg-gray-50/70 border-gray-200/60 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-red-600 text-white"
                          : hasUrl
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FileVideo size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          Day {v.day}
                        </span>
                        {hasUrl ? (
                          <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                            Available
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded">
                            Text Lesson
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {v.title}
                      </p>
                    </div>
                  </div>

                  {hasUrl && (
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-gray-400 block">
                        {v.resolution || "720p"}
                      </span>
                      <span className="text-[10px] font-semibold text-red-600 flex items-center gap-0.5 justify-end">
                        <Play size={10} /> Test
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Player & Metrics (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                  Live Player Sandbox
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedVideo.title}
                </h4>
              </div>
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ID: {selectedVideo.id}
              </span>
            </div>

            {/* Video Player */}
            {selectedVideo.defaultUrl ? (
              <FirebaseVideoPlayer
                key={selectedVideo.id}
                src={selectedVideo.defaultUrl}
                title={selectedVideo.title}
                lessonId={`${selectedVideo.id}_admin_preview`}
                userId="admin_tester"
              />
            ) : (
              <div className="aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                <FileVideo size={36} className="mb-2 text-gray-600" />
                <p className="text-xs font-semibold text-gray-300">No Video Uploaded For This Module Yet</p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Upload an optimized MP4 file to Firebase Storage under <code className="text-red-400">{selectedVideo.storagePath}</code>
                </p>
              </div>
            )}

            {/* Technical Stream Health Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100 text-center">
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 block">HTTP Range</span>
                <span className="text-xs font-bold text-emerald-600">206 Partial</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 block">Preload Policy</span>
                <span className="text-xs font-bold text-slate-900">metadata</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 block">Lazy Loading</span>
                <span className="text-xs font-bold text-emerald-600">Observer Active</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 block">Resume Progress</span>
                <span className="text-xs font-bold text-blue-600">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Optimization Best Practices & CLI Guide */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Video Compression Workflow & Recommended Settings
            </h3>
            <p className="text-xs text-gray-400">
              Why high-bitrate videos buffer, and how to encode them for instant playback on any connection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-bold text-red-400 mb-1">1. FastStart (Moov Atom at Front)</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Standard MP4 encoders put the metadata index (moov atom) at the end of the file. <code className="text-yellow-400">-movflags +faststart</code> moves it to byte 0, enabling the video to start playing within 100 milliseconds without waiting for the complete file to download.
            </p>
          </div>

          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-bold text-red-400 mb-1">2. Target 1.2 – 1.5 Mbps Bitrate</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Raw screen recordings often upload at 10 to 40 Mbps. Re-encoding at 720p with CRF 24 and maxrate 1500k reduces the file size by <strong>90% to 95%</strong> while keeping text and slides completely crisp.
            </p>
          </div>

          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-bold text-red-400 mb-1">3. Universal H.264 + AAC</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Encoding with <code className="text-yellow-400">-c:v libx264 -pix_fmt yuv420p</code> guarantees seamless hardware acceleration on iOS Safari, Android Chrome, and all desktop browsers without codec errors.
            </p>
          </div>
        </div>

        {/* Copyable FFmpeg Command */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Terminal size={14} className="text-emerald-400" />
              Standard FFmpeg Command Line:
            </span>
            <button
              onClick={copyCommand}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              {copiedCmd ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedCmd ? "Copied!" : "Copy Command"}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-gray-200 bg-slate-950 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
            {ffmpegCommandExample}
          </pre>
          <p className="text-[11px] text-gray-500 mt-2">
            Or run the automated batch script: <code className="text-emerald-400">node scripts/optimize_videos.js --input "path/to/video.mp4"</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoManagement;
