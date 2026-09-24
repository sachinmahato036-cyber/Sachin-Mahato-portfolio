/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  glowActive?: boolean;
  onToggleGlow?: () => void;
  videoMuted?: boolean;
  onToggleMute?: (muted: boolean) => void;
  videoPlaying?: boolean;
  onTogglePlay?: (playing: boolean) => void;
}

// Seamless Continuous YouTube Embed URL:
// - youtube-nocookie.com: Privacy-enhanced mode with minimal branding
// - autoplay=1 & mute=1: Instant continuous autoplay without permission blocking
// - loop=1 & playlist=rpmYtMyw6gQ: Infinitely loops video
// - controls=0: Disables player bar
// - cc_load_policy=0 & cc_lang_pref=none: Disables captions/subtitles
// - showinfo=0 & rel=0 & iv_load_policy=3: Prevents titles, annotations & related video popups
// - modestbranding=1: Minimizes YouTube branding
// - playsinline=1: Plays directly inline across all mobile & desktop browsers
// - enablejsapi=1: Allows programmatic playback and audio commands
const YOUTUBE_EMBED_URL =
  "https://www.youtube-nocookie.com/embed/rpmYtMyw6gQ?autoplay=1&mute=1&loop=1&playlist=rpmYtMyw6gQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&cc_load_policy=0&cc_lang_pref=none&disablekb=1&fs=0&autohide=1";

export default function VideoPlayer({ glowActive = true }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Send commands to YouTube iframe
  const sendCommand = useCallback((func: string, args: unknown[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args,
        }),
        "*"
      );
    } catch {
      // Ignore cross-origin warnings
    }
  }, []);

  const handleIframeLoad = () => {
    // Ensure video is playing continuously and captions module is unloaded
    sendCommand("playVideo");
    sendCommand("unloadModule", ["captions"]);
    sendCommand("unloadModule", ["cc"]);
  };

  // Heartbeat to guarantee the video never stalls or gets paused
  useEffect(() => {
    const interval = setInterval(() => {
      sendCommand("playVideo");
    }, 3000);
    return () => clearInterval(interval);
  }, [sendCommand]);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sendCommand(nextMuted ? "mute" : "unMute");
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* 1. LAYER ONE: Cinematic Ambient Halo Glow */}
      <AnimatePresence>
        {glowActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute -inset-1 sm:-inset-2 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-[#FF8A3D]/25 via-[#4DA3FF]/20 to-[#FF8A3D]/25 blur-2xl filter saturate-150 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,138,61,0.22) 0%, rgba(77,163,255,0.18) 50%, rgba(0,0,0,0) 80%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. LAYER TWO: Clean Cinematic Responsive Continuous Video Frame */}
      <div
        className="group relative w-full aspect-video rounded-2xl md:rounded-3xl border border-white/15 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10"
        id="cinematic-video-player"
      >
        {/* Transparent Shield Layer: Intercepts all clicks and touches so user interactions never trigger YouTube's native play/pause overlay, logos, or links */}
        <div
          onClick={() => toggleSound()}
          className="absolute inset-0 z-20 cursor-pointer select-none"
          title={isMuted ? "Click video to unmute" : "Click video to mute"}
        />

        {/* 
          Iframe scaled and offset to crop 17.5% from top, bottom, and sides.
          This physically pushes the bottom-right YouTube logo, bottom captions,
          and top channel title completely outside the visible viewport.
        */}
        <iframe
          ref={iframeRef}
          onLoad={handleIframeLoad}
          src={YOUTUBE_EMBED_URL}
          title="Executive Presentation"
          className="absolute w-[135%] h-[135%] -top-[17.5%] -left-[17.5%] pointer-events-none border-0 bg-black select-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          tabIndex={-1}
        />

        {/* Subtle, luxury sound control toggle positioned on the bottom-left */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white/80 hover:text-white backdrop-blur-md transition-all text-xs font-mono shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/60" />
                <span className="text-[10px] tracking-wider uppercase font-medium">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] tracking-wider uppercase font-medium text-emerald-400">Audio On</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
