/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

export default function ModernBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = 280;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty("--mouse-x", `${targetX}px`);
            containerRef.current.style.setProperty("--mouse-y", `${targetY}px`);
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "280px",
        } as React.CSSProperties
      }
    >
      {/* 1. Base Multi-Stop Dark Obsidian Foundation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080d] via-[#050507] to-[#020204]" />

      {/* 2. Interactive Spotlight Glow (Reacts gently to mouse position) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 opacity-90"
        style={{
          background:
            "radial-gradient(750px circle at var(--mouse-x) var(--mouse-y), rgba(255, 138, 61, 0.05), rgba(56, 189, 248, 0.02) 40%, transparent 80%)",
        }}
      />

      {/* 3. Deep Slate/Cyan Executive Studio Ambient Horizon Light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[650px] bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(30,58,95,0.28),rgba(15,23,42,0.08)_45%,transparent_75%)] animate-pulse-slow" />

      {/* 4. Warm Executive Core Accent Horizon Glow */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,138,61,0.06),transparent_70%)] blur-3xl animate-pulse-slow" />

      {/* 5. Modern Precision Micro-Dot Matrix Layer */}
      <div className="absolute inset-0 bg-dot-matrix [mask-image:radial-gradient(ellipse_80%_65%_at_50%_35%,black_25%,transparent_85%)] opacity-60" />

      {/* 6. Precision Architectural Grid Lines Layer */}
      <div className="absolute inset-0 bg-grid-mesh [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,black_20%,transparent_90%)] opacity-40" />

      {/* 7. Modern Top Laser Hairline Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/25 via-[#FF8A3D]/30 to-transparent" />

      {/* 8. Architectural Structural Framing with Precision Crosshairs */}
      <div className="absolute inset-0 max-w-7xl mx-auto border-x border-white/[0.04] pointer-events-none">
        {/* Left vertical gradient line */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent" />
        {/* Right vertical gradient line */}
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent" />

        {/* Structural precision corner crosshairs (+) */}
        <span className="absolute top-16 -left-1.5 text-neutral-600/50 font-mono text-[9px] select-none leading-none">
          +
        </span>
        <span className="absolute top-16 -right-1.5 text-neutral-600/50 font-mono text-[9px] select-none leading-none">
          +
        </span>
        <span className="absolute top-80 -left-1.5 text-neutral-600/40 font-mono text-[9px] select-none leading-none">
          +
        </span>
        <span className="absolute top-80 -right-1.5 text-neutral-600/40 font-mono text-[9px] select-none leading-none">
          +
        </span>
        <span className="absolute top-[640px] -left-1.5 text-neutral-600/30 font-mono text-[9px] select-none leading-none">
          +
        </span>
        <span className="absolute top-[640px] -right-1.5 text-neutral-600/30 font-mono text-[9px] select-none leading-none">
          +
        </span>
      </div>

      {/* 9. Micro-Grain Texture Overlay (Luxury Velvet Carbon Finish, eliminates banding) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" h="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
