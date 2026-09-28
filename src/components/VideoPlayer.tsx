/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from "react";
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
// - autoplay=1 & mute=1: Guarantees browser autoplay permission on page load without blocking
// - loop=1 & playlist=rpmYtMyw6gQ: Infinitely loops video continuously
// - controls=0: Disables player bar
// - cc_load_policy=0 & cc_lang_pref=none: Disables captions/subtitles
// - showinfo=0 & rel=0 & iv_load_policy=3: Prevents titles, annotations & related video popups
// - modestbranding=1: Minimizes YouTube branding
// - playsinline=1: Plays directly inline across all mobile & desktop browsers
// - enablejsapi=1: Allows programmatic playback and audio commands
const YOUTUBE_EMBED_URL =
  "https://www.youtube-nocookie.com/embed/rpmYtMyw6gQ?autoplay=1&mute=1&loop=1&playlist=rpmYtMyw6gQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&cc_load_policy=0&cc_lang_pref=none&disablekb=1&fs=0&autohide=1";

export default function VideoPlayer({
  videoMuted = true,
  onToggleMute,
}: VideoPlayerProps) {
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
    // Send listening handshake to activate JS API
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "listening" }),
        "*"
      );
    }
    // Command autoplay immediately upon load
    sendCommand("playVideo");
    sendCommand("unloadModule", ["captions"]);
    sendCommand("unloadModule", ["cc"]);
  };

  // Aggressive initial autoplay verification to bypass any browser race conditions
  useEffect(() => {
    const t1 = setTimeout(() => sendCommand("playVideo"), 300);
    const t2 = setTimeout(() => sendCommand("playVideo"), 1000);
    const t3 = setTimeout(() => sendCommand("playVideo"), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [sendCommand]);

  // Turn on audio on first user gesture (pointerdown, click, scroll) without pausing the video
  useEffect(() => {
    const handleFirstUserGesture = () => {
      setIsMuted(false);
      if (onToggleMute) onToggleMute(false);
      sendCommand("playVideo");
      sendCommand("unMute");
      sendCommand("setVolume", [100]);
    };

    window.addEventListener("pointerdown", handleFirstUserGesture, { once: true });
    window.addEventListener("keydown", handleFirstUserGesture, { once: true });
    window.addEventListener("scroll", handleFirstUserGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserGesture);
      window.removeEventListener("keydown", handleFirstUserGesture);
      window.removeEventListener("scroll", handleFirstUserGesture);
    };
  }, [sendCommand, onToggleMute]);

  // Continuous playback heartbeat to guarantee video stays playing
  useEffect(() => {
    const interval = setInterval(() => {
      sendCommand("playVideo");
    }, 4000);
    return () => clearInterval(interval);
  }, [sendCommand]);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (onToggleMute) onToggleMute(nextMuted);
    sendCommand("playVideo");
    if (nextMuted) {
      sendCommand("mute");
    } else {
      sendCommand("unMute");
      sendCommand("setVolume", [100]);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Clean Cinematic Responsive Continuous Video Frame */}
      <div
        className="group relative w-full aspect-video rounded-2xl md:rounded-3xl border border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden z-10"
        id="cinematic-video-player"
      >
        {/* Transparent Shield Layer: Intercepts all clicks and touches so user interactions never trigger YouTube's native play/pause overlay, logos, or links */}
        <div
          onClick={() => toggleSound()}
          className="absolute inset-0 z-20 cursor-pointer select-none"
          title={isMuted ? "Click to enable sound" : "Click to mute"}
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

        {/* Subtle, minimalist sound control toggle positioned on the bottom-left */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white/80 hover:text-white backdrop-blur-md transition-all text-xs font-mono shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/60" />
                <span className="text-[10px] tracking-wider uppercase font-medium">Audio Off</span>
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
