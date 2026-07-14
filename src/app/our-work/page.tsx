// src/app/our-work/page.tsx

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import CTASection from "@/components/sections/CTASection";
import {
  Images,
  Video,
  FileText,
  ChevronRight,
  Play,
  Pause,
  ArrowLeft,
  ExternalLink,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from "lucide-react";
import { SECTORS, type Sector } from "./data";

/* ──────────────────────────────────────────────────────
   FORMAT TIME
────────────────────────────────────────────────────── */
function fmtTime(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

/* ──────────────────────────────────────────────────────
   YOUTUBE VIDEO PLAYER
────────────────────────────────────────────────────── */
function YouTubeVideo({ video, accent }: { video: { title: string; youtubeUrl: string; thumbnail?: string }; accent: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0c12]">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-white/30 animate-spin" />
        </div>
      )}
      <iframe
        src={video.youtubeUrl}
        title={video.title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   LOCAL VIDEO PLAYER (اختياري لو عايز فيديوهات محلية)
────────────────────────────────────────────────────── */
function VideoPlayer({ src, accent }: { src: string; accent: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [ended, setEnded] = useState(false);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2800);
  }, [playing]);

  useEffect(() => {
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  const handleMouseMove = useCallback(() => resetHideTimer(), [resetHideTimer]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (ended) { v.currentTime = 0; setEnded(false); }
    playing ? v.pause() : v.play();
    setPlaying(!playing);
    resetHideTimer();
  }, [playing, ended, resetHideTimer]);

  const skip = useCallback((sec: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec));
    resetHideTimer();
  }, [resetHideTimer]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.volume = val;
    setVolume(val);
    setMuted(val === 0);
  };

  const getSeekPosition = (e: React.MouseEvent | MouseEvent): number => {
    const bar = progressRef.current;
    if (!bar || !duration) return 0;
    const rect = bar.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    return (x / rect.width) * duration;
  };

  const handleSeekMouseDown = (e: React.MouseEvent) => {
    setSeeking(true);
    const t = getSeekPosition(e);
    if (videoRef.current) videoRef.current.currentTime = t;
    setCurrentTime(t);

    const onMove = (ev: MouseEvent) => {
      const tt = getSeekPosition(ev);
      if (videoRef.current) videoRef.current.currentTime = tt;
      setCurrentTime(tt);
    };
    const onUp = () => {
      setSeeking(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || seeking) return;
    setCurrentTime(v.currentTime);
    if (v.buffered.length > 0) setBuffered(v.buffered.end(v.buffered.length - 1));
  };
  const onDurationChange = () => { if (videoRef.current) setDuration(videoRef.current.duration); };
  const onEnded = () => { setPlaying(false); setEnded(true); setShowControls(true); };
  const onPlay = () => { setPlaying(true); setEnded(false); resetHideTimer(); };
  const onPause = () => { setPlaying(false); setShowControls(true); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.code === "ArrowRight") { skip(5); }
      if (e.code === "ArrowLeft") { skip(-5); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, skip]);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const bufPct = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden select-none"
      style={{ background: "#000", aspectRatio: "16/9" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (playing) setShowControls(false); }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        playsInline
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onDurationChange={onDurationChange}
        onEnded={onEnded}
        onPlay={onPlay}
        onPause={onPause}
        onClick={togglePlay}
        style={{ cursor: showControls ? "default" : "none" }}
      />

      <div className="absolute inset-0" onClick={togglePlay} style={{ cursor: "default" }} />

      <AnimatePresence>
        {!playing && !ended && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.45)", border: "2px solid rgba(255,255,255,0.18)" }}
            >
              <Play size={32} fill="white" className="text-white ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ended && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.5)", border: "2px solid rgba(255,255,255,0.2)" }}
            >
              <RotateCcw size={30} className="text-white" />
            </div>
            <span className="text-white/60 text-xs font-mono tracking-widest uppercase">Replay</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 flex flex-col px-4 pb-3 pt-16 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
            }}
          >
            <div
              ref={progressRef}
              className="relative h-1 rounded-full mb-3 cursor-pointer group pointer-events-auto"
              style={{ background: "rgba(255,255,255,0.18)" }}
              onMouseDown={handleSeekMouseDown}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ width: `${bufPct}%`, background: "rgba(255,255,255,0.25)", transition: "width 0.3s" }}
              />
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: accent }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)`, background: "white" }}
              />
            </div>

            <div className="flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => skip(-5)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10 cursor-pointer"
                  style={{ background: "none", border: "none" }}
                  title="Back 5s"
                >
                  <SkipBack size={16} className="text-white/80" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:bg-white/10 cursor-pointer"
                  style={{ background: "none", border: "none" }}
                >
                  {playing
                    ? <Pause size={18} className="text-white" fill="white" />
                    : <Play size={18} className="text-white ml-0.5" fill="white" />
                  }
                </button>

                <button
                  onClick={() => skip(5)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10 cursor-pointer"
                  style={{ background: "none", border: "none" }}
                  title="Forward 5s"
                >
                  <SkipForward size={16} className="text-white/80" />
                </button>

                <div className="flex items-center gap-1 ml-1">
                  <button
                    onClick={toggleMute}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer"
                    style={{ background: "none", border: "none" }}
                  >
                    {muted || volume === 0
                      ? <VolumeX size={14} className="text-white/70" />
                      : <Volume2 size={14} className="text-white/70" />
                    }
                  </button>
                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={muted ? 0 : volume}
                    onChange={handleVolume}
                    className="hidden sm:block w-16 h-1 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: accent }}
                  />
                </div>

                <span className="text-white/55 text-[11px] font-mono ml-1 hidden sm:block">
                  {fmtTime(currentTime)} / {fmtTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={toggleFullscreen}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer"
                  style={{ background: "none", border: "none" }}
                  title="Fullscreen"
                >
                  <Maximize size={14} className="text-white/70" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   EMPTY STATE
────────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-3 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Images size={24} className="text-white/15" />
      </div>
      <p className="text-white/25 text-xs font-mono tracking-[0.25em] uppercase">Coming Soon</p>
      <p className="text-white/12 text-xs max-w-[180px]">Content will appear here once uploaded</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SECTOR CARD
────────────────────────────────────────────────────── */
function SectorCard({ sector, index, onClick }: { sector: Sector; index: number; onClick: () => void }) {
  const hasContent = sector.images.length + sector.videos.length + (sector.pdf ? 1 : 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.52, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative rounded-2xl p-6 sm:p-7 cursor-pointer overflow-hidden flex flex-col justify-between"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        minHeight: 210,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 25% 25%, ${sector.accent}10 0%, transparent 65%)`,
          border: `1px solid ${sector.accent}22`,
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, transparent, ${sector.accent}70, transparent)` }}
      />

      <div className="relative z-10 flex items-start justify-between mb-5">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 320 }}
          className="w-11 h-11 rounded-[14px] flex items-center justify-center"
          style={{ background: `${sector.accent}12`, border: `1px solid ${sector.accent}28` }}
        >
          <sector.Icon size={20} style={{ color: sector.accent }} strokeWidth={1.5} />
        </motion.div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-mono text-white/35 tracking-widest">OPEN</span>
          <ChevronRight size={11} className="text-white/25" />
        </div>
      </div>

      <div className="relative z-10 flex-1">
        <h3
          className="text-white leading-tight mb-2 tracking-wide"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(1.25rem,2.5vw,1.55rem)" }}
        >
          {sector.label}
        </h3>
        <p className="text-[12px] text-white/38 leading-relaxed">{sector.desc}</p>
      </div>

      <div
        className="relative z-10 flex items-center justify-between mt-5 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-3">
          {[
            { icon: Images, count: sector.images.length },
            { icon: Video, count: sector.videos.length },
            { icon: FileText, count: sector.pdf ? 1 : 0 },
          ].map(({ icon: Icon, count }, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <Icon size={11} className="text-white/22" />
              <span className="text-[10px] text-white/22 font-mono">{count}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <motion.div
            animate={hasContent ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.25 }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: hasContent ? sector.accent : "rgba(255,255,255,0.2)" }}
          />
          <span className="text-[9px] font-mono text-white/22 tracking-[0.2em] uppercase">
            {hasContent ? "Ready" : "Soon"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────
   SECTOR PAGE (Full Screen)
────────────────────────────────────────────────────── */
type Tab = "images" | "videos" | "pdf";

function SectorPage({ sector, onBack }: { sector: Sector; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("images");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const TABS: { id: Tab; label: string; icon: any; count: number | null }[] = [
    { id: "images", label: "Photos", icon: Images, count: sector.images.length || null },
    { id: "videos", label: "Videos", icon: Video, count: sector.videos.length || null },
    { id: "pdf", label: "Profile PDF", icon: FileText, count: sector.pdf ? 1 : null },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#08090e" }}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-5 sm:px-8 py-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,9,14,0.95)", backdropFilter: "blur(16px)" }}
      >
        <motion.button
          whileHover={{ x: -3 }}
          onClick={onBack}
          className="flex items-center gap-2 cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <ArrowLeft size={14} className="text-white/60" />
          </div>
          <span className="text-white/40 text-xs font-mono tracking-widest hidden sm:block">OUR WORK</span>
        </motion.button>

        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${sector.accent}15`, border: `1px solid ${sector.accent}35` }}
          >
            <sector.Icon size={15} style={{ color: sector.accent }} strokeWidth={1.5} />
          </div>
          <h2
            className="text-white m-0 leading-none"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(1.2rem,3vw,1.6rem)", letterSpacing: "0.05em" }}
          >
            {sector.label}
          </h2>
        </div>

        <div className="w-[88px] hidden sm:block" />
        <div className="w-8 block sm:hidden" />
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 px-5 sm:px-8 py-3 shrink-0 overflow-x-auto"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              animate={{
                background: isActive ? `${sector.accent}16` : "transparent",
                color: isActive ? "#ffffffdd" : "rgba(255,255,255,0.38)",
                borderColor: isActive ? `${sector.accent}40` : "rgba(255,255,255,0.06)",
              }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider cursor-pointer whitespace-nowrap"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <tab.icon size={13} />
              {tab.label}
              {tab.count !== null && (
                <span
                  className="px-1.5 py-0.5 rounded-full text-[9px]"
                  style={{
                    background: isActive ? `${sector.accent}22` : "rgba(255,255,255,0.07)",
                    color: isActive ? sector.accent : "rgba(255,255,255,0.3)",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 sm:py-8 custom-scroll">
        <AnimatePresence mode="wait">

          {/* Photos */}
          {activeTab === "images" && (
            <motion.div
              key="images"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {sector.images.length === 0 ? <EmptyState /> : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                  {sector.images.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="break-inside-avoid rounded-2xl overflow-hidden"
                      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <img src={src} alt={`${sector.label} ${i + 1}`} className="w-full h-auto block" />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Videos - YouTube */}
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {sector.videos.length === 0 ? <EmptyState /> : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {sector.videos.map((video, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <YouTubeVideo video={video} accent={sector.accent} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PDF */}
          {activeTab === "pdf" && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {!sector.pdf ? <EmptyState /> : (
                <div className="flex flex-col gap-5">
                  <div
                    className="flex items-center justify-between px-5 py-3 rounded-2xl flex-wrap gap-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${sector.accent}14`, border: `1px solid ${sector.accent}30` }}
                      >
                        <FileText size={16} style={{ color: sector.accent }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium leading-tight">{sector.label} — Company Profile</p>
                        <p className="text-white/30 text-xs font-mono">PDF Document</p>
                      </div>
                    </div>
                    <a
                      href={sector.pdf}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold tracking-wide no-underline"
                      style={{ background: sector.accent }}
                    >
                      <ExternalLink size={12} />
                      Download
                    </a>
                  </div>

                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", minHeight: "calc(100vh - 240px)" }}
                  >
                    <iframe
                      src={sector.pdf + "#toolbar=1&view=FitH"}
                      className="w-full h-full"
                      style={{ minHeight: "calc(100vh - 240px)", background: "#111" }}
                      title={`${sector.label} profile`}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(141,154,176,0.18); border-radius: 2px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: white; cursor: pointer; }
        input[type=range]::-webkit-slider-runnable-track { height: 4px; border-radius: 2px; }
      `}</style>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function OurWorkPage() {
  const [activeSector, setActiveSector] = useState<Sector | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "130px 1.5rem 70px",
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, #0d1a28 0%, #0D1117 55%, #0A0A0A 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(141,154,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(141,154,176,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)" }} />
        <div style={{ position: "absolute", top: "-5%", left: "50%", transform: "translateX(-50%)", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(141,154,176,0.1) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div className="z-[1] relative mx-auto max-w-[1280px] text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full" style={{ background: "rgba(141,154,176,0.08)", border: "1px solid rgba(141,154,176,0.22)" }}>
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.25em", color: "rgba(141,154,176,0.7)" }}>Portfolio &amp; Case Studies</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="m-0 mb-5 leading-none" style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(3.5rem,10vw,8rem)", background: "linear-gradient(135deg, #ffffff 0%, #8D9AB0 55%, #B0BDD0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              OUR WORK
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontSize: "clamp(0.95rem,1.6vw,1.1rem)", color: "rgba(255,255,255,0.42)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.8 }}>
              Real projects. Real results. Across two of the Middle East&apos;s most dynamic markets.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[{ value: "1M+", label: "Impressions" }, { value: "6+", label: "Sectors" }, { value: "2", label: "Countries" }, { value: "100%", label: "Commitment" }].map((s, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
                  <span style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1.6rem", background: "linear-gradient(135deg,#B0BDD0,#8D9AB0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>{s.value}</span>
                  <span className="font-mono uppercase" style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.15em", lineHeight: 1.3, maxWidth: 70 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-white/[0.06] bg-[#0A0C12]">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="block text-[11px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: "rgba(141,154,176,0.7)" }}>Browse by Industry</span>
                <h2 className="m-0 leading-none" style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.2rem,5vw,3.8rem)", background: "linear-gradient(135deg, #ffffff 0%, #8D9AB0 60%, #B0BDD0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  CASE STUDIES
                </h2>
              </div>
              <p className="text-white/28 text-sm max-w-xs leading-relaxed">Pick a sector to explore photos, videos, and the full client profile.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SECTORS.map((sector, i) => (
              <SectorCard key={sector.id} sector={sector} index={i} onClick={() => setActiveSector(sector)} />
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen Sector Page */}
      <AnimatePresence>
        {activeSector && (
          <SectorPage sector={activeSector} onBack={() => setActiveSector(null)} />
        )}
      </AnimatePresence>

      <CTASection />
    </>
  );
}