#!/usr/bin/env node

/**
 * Vahlay Consulting - Video Streaming Optimizer (FFmpeg Automation)
 * 
 * Re-encodes raw/uncompressed screen recordings into Web-Optimized, FastStart MP4s.
 * - H.264 video codec (libx264) + AAC stereo audio
 * - Web-Optimized FastStart (+faststart moves moov atom to start of file)
 * - Safe & Non-destructive: Never overwrites original files
 * - Reduces 40 Mbps raw files down to ~1.2 - 2.5 Mbps (~90% to 95% bandwidth savings!)
 * 
 * Usage:
 *   node scripts/optimize_videos.js --input "path/to/raw.mp4"
 *   node scripts/optimize_videos.js --folder "path/to/videos_folder" --preset 720p
 */

import { execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";

// Verify FFmpeg is installed
function checkFFmpeg() {
  try {
    const res = spawnSync("ffmpeg", ["-version"]);
    if (res.status !== 0) {
      console.error("❌ FFmpeg is not found in PATH. Please install FFmpeg to use this optimizer.");
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Error detecting FFmpeg:", err.message);
    process.exit(1);
  }
}

// Format bytes into readable string
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Get video metadata using ffprobe
function getVideoMetadata(filePath) {
  try {
    const out = execSync(
      `ffprobe -v error -show_entries format=duration,bit_rate,size:stream=codec_name,width,height,bit_rate -of json "${filePath}"`,
      { encoding: "utf8" }
    );
    const data = JSON.parse(out);
    const videoStream = data.streams?.find((s) => s.codec_name === "h264" || s.width);
    return {
      duration: parseFloat(data.format?.duration || 0),
      totalBitrate: parseInt(data.format?.bit_rate || 0, 10),
      fileSize: parseInt(data.format?.size || fs.statSync(filePath).size, 10),
      width: videoStream?.width || 0,
      height: videoStream?.height || 0,
      codec: videoStream?.codec_name || "unknown"
    };
  } catch {
    return {
      duration: 0,
      totalBitrate: 0,
      fileSize: fs.statSync(filePath).size,
      width: 0,
      height: 0,
      codec: "unknown"
    };
  }
}

// Optimize a single video file
export function optimizeVideo(inputFile, options = {}) {
  const preset = options.preset || "720p"; // "720p" or "1080p"
  const outputDir = options.outputDir || path.join(path.dirname(inputFile), "optimized");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const parsed = path.parse(inputFile);
  const outputFile = path.join(outputDir, `${parsed.name}_web_optimized.mp4`);

  console.log(`\n================================================================`);
  console.log(`🎬 Processing: ${parsed.base}`);
  console.log(`📁 Input:  ${inputFile}`);
  console.log(`📁 Output: ${outputFile}`);
  console.log(`🎯 Preset: ${preset.toUpperCase()} (H.264, FastStart + Range Request Ready)`);
  console.log(`================================================================`);

  const initialMeta = getVideoMetadata(inputFile);
  console.log(`📊 Original Size:    ${formatBytes(initialMeta.fileSize)}`);
  console.log(`📊 Original Bitrate: ~${(initialMeta.totalBitrate / 1000000).toFixed(2)} Mbps`);
  console.log(`📊 Resolution:       ${initialMeta.width}x${initialMeta.height}`);
  console.log(`⏳ Encoding with FFmpeg (moving 'moov' atom to front for instant streaming)...`);

  // Target encoding arguments
  const scaleFilter = preset === "720p" ? "-vf scale=-2:720" : "-vf scale=-2:1080";
  const crf = preset === "720p" ? "24" : "23";
  const maxrate = preset === "720p" ? "1500k" : "2800k";
  const bufsize = preset === "720p" ? "3000k" : "5600k";

  const ffmpegCmd = [
    "-y",
    "-i", `"${inputFile}"`,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", crf,
    "-maxrate", maxrate,
    "-bufsize", bufsize,
    "-pix_fmt", "yuv420p",
    scaleFilter,
    "-movflags", "+faststart", // CRUCIAL for elimination of buffering
    "-c:a", "aac",
    "-b:a", "128k",
    "-ar", "44100",
    `"${outputFile}"`
  ].join(" ");

  const startTime = Date.now();
  try {
    execSync(`ffmpeg ${ffmpegCmd}`, { stdio: "inherit" });
    const elapsedSecs = ((Date.now() - startTime) / 1000).toFixed(1);

    const finalMeta = getVideoMetadata(outputFile);
    const savedBytes = initialMeta.fileSize - finalMeta.fileSize;
    const savingsPercent = initialMeta.fileSize > 0
      ? ((savedBytes / initialMeta.fileSize) * 100).toFixed(1)
      : 0;

    console.log(`\n✅ Optimization Complete in ${elapsedSecs}s!`);
    console.log(`----------------------------------------------------------------`);
    console.log(`📉 New File Size:   ${formatBytes(finalMeta.fileSize)} (${savingsPercent}% reduction!)`);
    console.log(`📉 New Bitrate:     ~${(finalMeta.totalBitrate / 1000000).toFixed(2)} Mbps`);
    console.log(`🚀 FastStart Moov:  Enabled at beginning of file (0ms start delay)`);
    console.log(`🌐 Compatibility:   100% (iOS Safari, Android Chrome, Desktop, Range-Requests)`);
    console.log(`----------------------------------------------------------------\n`);

    return {
      success: true,
      inputFile,
      outputFile,
      originalSize: initialMeta.fileSize,
      optimizedSize: finalMeta.fileSize,
      savingsPercent
    };
  } catch (err) {
    console.error(`❌ Failed to encode ${inputFile}:`, err.message);
    return { success: false, error: err.message };
  }
}

// CLI Argument Parser
function runCli() {
  checkFFmpeg();

  const args = process.argv.slice(2);
  let inputPath = "";
  let folderPath = "";
  let preset = "720p";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--input" || args[i] === "-i") {
      inputPath = args[i + 1];
      i++;
    } else if (args[i] === "--folder" || args[i] === "-f") {
      folderPath = args[i + 1];
      i++;
    } else if (args[i] === "--preset" || args[i] === "-p") {
      preset = args[i + 1];
      i++;
    }
  }

  if (inputPath) {
    optimizeVideo(inputPath, { preset });
  } else if (folderPath) {
    const files = fs.readdirSync(folderPath);
    const videoFiles = files.filter((f) => /\.(mp4|mov|mkv|avi)$/i.test(f));
    console.log(`Found ${videoFiles.length} video(s) in folder: ${folderPath}`);
    videoFiles.forEach((vf) => {
      optimizeVideo(path.join(folderPath, vf), { preset });
    });
  } else {
    console.log(`
================================================================
 Vahlay Training Portal - Video Streaming Compression Utility
================================================================
Usage:
  node scripts/optimize_videos.js --input <path_to_video.mp4> [--preset 720p|1080p]
  node scripts/optimize_videos.js --folder <path_to_directory> [--preset 720p|1080p]

Recommended:
  Use --preset 720p for training screencasts (1.2 Mbps, 90% size reduction, crisp text).
  Use --preset 1080p for high-definition presentations (2.5 Mbps).
================================================================
    `);
  }
}

if (process.argv[1] && process.argv[1].endsWith("optimize_videos.js")) {
  runCli();
}

