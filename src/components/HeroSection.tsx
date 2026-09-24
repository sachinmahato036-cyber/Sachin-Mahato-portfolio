/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { BarChart3, Target } from "lucide-react";

interface HeroSectionProps {
  onScrollToNext: () => void;
  children?: React.ReactNode; 
}

const METRIC_TICKER_ITEMS = [
  "Customer Relationship Management (CRM)",
  "Consultative Selling",
  "Client Engagement & Retention",
  "Market Research & Sales Support",
  "Generative AI & Prompt Engineering",
  "Agile Project Management",
  "Retail Merchandising & Live Projects",
  "Sales, BD & Customer Success"
];

export default function HeroSection({ onScrollToNext, children }: HeroSectionProps) {
  // Stagger parameters for landing typography
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 md:px-8 pt-24 pb-12 sm:pb-16 bg-transparent overflow-hidden"
      id="cinematic-hero-stage"
    >
      {/* Background radial gradient mask for spotlight effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] rounded-full bg-radial-gradient from-[#ff8a3d]/5 to-transparent pointer-events-none z-10 filter blur-3xl" />

      {/* 1. Apple-style Sub-header Banner */}
      <div className="relative w-full max-w-7xl flex justify-between items-center z-20 mb-4 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-[11px] font-mono text-[#86868b]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-medium">M.B.A. - MARKETING MANAGEMENT</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex items-center gap-3 text-xs font-mono text-[#86868b]"
        >
          <span>JAMSHEDPUR, JHARKHAND, INDIA</span>
          <span>•</span>
          <span className="text-white font-semibold">SACHIN MAHATO</span>
        </motion.div>
      </div>

      {/* 2. Central Hero Layout Container */}
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center justify-center py-8 z-20 flex-grow">
        {/* Left Side: Typography & Story */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex flex-col text-left space-y-4 sm:space-y-6 lg:pr-4"
          id="hero-story-left"
        >
          {/* Animated Tagline */}
          <motion.div variants={itemFadeUp} className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-gradient-to-r from-sky-400 to-[#FF8A3D]" />
            <h2 className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] bg-gradient-to-r from-sky-400 to-[#FF8A3D] bg-clip-text text-transparent uppercase">
              Sales • CRM • Consultative Growth
            </h2>
          </motion.div>

          {/* Master Display Name */}
          <motion.h1
            variants={itemFadeUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#F5F5F5] uppercase leading-[0.9] select-none"
          >
            Sachin
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-[#FF8A3D] to-[#ff5252] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,138,61,0.45)]">
              Mahato
            </span>
          </motion.h1>

          {/* Subtitle / Focus Pitch */}
          <motion.div variants={itemFadeUp} className="flex flex-col space-y-3">
            <h3 className="text-lg sm:text-xl font-display font-medium text-white tracking-wide">
              M.B.A. - Marketing Management
            </h3>
            <p className="text-sm text-[#B3B3B3] leading-relaxed max-w-md">
              MBA (Marketing) student with experience in market research, customer engagement, CRM, and sales support. Skilled at consultative selling, understanding customer needs, and driving business growth.
            </p>
          </motion.div>

          {/* Dynamic Small Metrics Badges */}
          <motion.div
            variants={itemFadeUp}
            className="grid grid-cols-2 gap-3 max-w-md pt-2 font-mono"
            id="hero-grid-glances"
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-sky-500/20 flex items-center gap-2.5 backdrop-blur-md hover:border-sky-500/40 transition-colors">
              <BarChart3 className="w-4 h-4 text-sky-400" />
              <div className="text-[10px]">
                <div className="text-white/40 uppercase tracking-[0.1em] text-[8px]">Intelligence</div>
                <div className="text-white font-medium">CRM & Market Analytics</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-[#FF8A3D]/20 flex items-center gap-2.5 backdrop-blur-md hover:border-[#FF8A3D]/40 transition-colors">
              <Target className="w-4 h-4 text-[#FF8A3D]" />
              <div className="text-[10px]">
                <div className="text-white/40 uppercase tracking-[0.1em] text-[8px]">Commercial</div>
                <div className="text-white font-medium font-sans">Sales, BD & Growth</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: The Talking Head Video Core Frame */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center w-full relative">
          {children}
        </div>
      </div>

      {/* 3. Infinite Metrics Ticker Ribbon */}
      <div 
        className="relative w-full overflow-hidden border-y border-white/5 bg-black/40 py-3 z-20 pointer-events-none"
        id="infinite-scroller-ticker"
      >
        <div className="flex whitespace-nowrap min-w-full gap-8 animate-[marquee_25s_linear_infinite]">
          {/* Loop twice for continuous flow */}
          {[...METRIC_TICKER_ITEMS, ...METRIC_TICKER_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs font-mono font-medium tracking-[0.18em] text-[#B3B3B3] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A3D]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Luxury Scroll Indicator Footer */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        onClick={onScrollToNext}
        className="relative flex flex-col items-center gap-2.5 mt-8 group cursor-pointer z-30 pointer-events-auto"
        id="stage-downward-scroller"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] font-medium text-[#B3B3B3] group-hover:text-[#FF8A3D] transition-colors uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="relative w-5 h-10 rounded-full border border-white/20 flex justify-center items-start p-1.5 group-hover:border-[#FF8A3D]/40 transition-colors">
          <motion.div
            animate={{
              y: [0, 14, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 rounded-full bg-[#FF8A3D]"
          />
        </div>
      </motion.button>

      {/* Custom Keyframes injection for marquee scrolling style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
