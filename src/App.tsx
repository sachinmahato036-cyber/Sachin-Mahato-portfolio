/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import CinematicLayer from "./components/CinematicLayer";
import AppleHeaderNav from "./components/AppleHeaderNav";
import HeroSection from "./components/HeroSection";
import VideoPlayer from "./components/VideoPlayer";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import CredentialsSection from "./components/CredentialsSection";
import ContactSection from "./components/ContactSection";
import { Mail } from "lucide-react";

export default function App() {
  // Global interactive states
  const [glowActive, setGlowActive] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleScrollToExplore = () => {
    const nextElem = document.getElementById("about-section");
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-[#020207]/30 text-[#F5F5F5] font-sans antialiased overflow-x-hidden selection:bg-[#FF8A3D]/20 selection:text-[#FFB067]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8A3D] via-[#FFB067] to-[#4DA3FF] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* APPLE FIXED HEADER NAV */}
      <AppleHeaderNav />

      {/* 1. THREE.JS OPENAI ASTRA COSMIC LIVE BACKGROUND */}
      <CinematicLayer glowColor={glowActive ? "ambient" : "subtle"} />

      {/* 2. CHOREOGRAPHED LAYOUT STAGE */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20"
      >
        
        {/* HERO SECTION STAGE (100vh height framing) */}
        <HeroSection onScrollToNext={handleScrollToExplore}>
          {/* Dual-layer interactive VideoPlayer centerpiece */}
          <VideoPlayer
            glowActive={glowActive}
            onToggleGlow={() => setGlowActive(!glowActive)}
            videoMuted={videoMuted}
            onToggleMute={(muted) => setVideoMuted(muted)}
            videoPlaying={videoPlaying}
            onTogglePlay={(playing) => setVideoPlaying(playing)}
          />
        </HeroSection>

        {/* 01 // BIO INSIGHT SECTION */}
        <AboutSection />

        {/* 02 // TIMELINE EXPERIENCES */}
        <ExperienceSection />

        {/* 03 // DECATHLON BI SIMULATOR */}
        <ProjectsSection />

        {/* 04 // INTERACTIVE BENTO SKILLS */}
        <SkillsSection />

        {/* 05 // CREDENTIALS & CERTIFICATIONS */}
        <CredentialsSection />

        {/* 06 // CONNECT PORTAL */}
        <ContactSection />
      </motion.main>

      {/* 3. CINEMATIC FOOTER PANEL */}
      <footer className="relative bg-[#020207]/70 backdrop-blur-md border-t border-white/10 py-12 px-4 sm:px-6 md:px-8 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright/Index and metadata context */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-gray-400 font-mono font-bold">
                M
              </div>
              <span className="text-sm font-display font-medium text-white uppercase tracking-wider">
                Sachin Mahato
              </span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pt-1">
              &copy; {currentYear} • MBA MARKETING ANALYTICS PORTFOLIO
            </p>
          </div>

          {/* Quick legal/status logs */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 hover:text-[#FF8A3D] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ACTIVE FOR HIRING</span>
            </span>
            <span className="text-gray-600">|</span>
            <a
              href="mailto:sachinmahato036@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#FFB067] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>sachinmahato036@gmail.com</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
