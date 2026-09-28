/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import AppleHeaderNav from "./components/AppleHeaderNav";
import HeroSection from "./components/HeroSection";
import VideoPlayer from "./components/VideoPlayer";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import CredentialsSection from "./components/CredentialsSection";
import ContactSection from "./components/ContactSection";
import CinematicLiveBackground from "./components/CinematicLiveBackground";
import { Mail } from "lucide-react";

export default function App() {
  // Global interactive states (video autoplays immediately)
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
    <div className="relative min-h-screen bg-[#030508] text-[#F5F5F5] font-sans antialiased overflow-x-hidden selection:bg-[#38bdf8]/25 selection:text-[#38bdf8]">
      {/* PREMIUM CINEMATIC LIVE INTERACTIVE WEBSITE BACKGROUND */}
      <CinematicLiveBackground />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-[#38bdf8] to-white/80 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* APPLE FIXED HEADER NAV */}
      <AppleHeaderNav />

      {/* CHOREOGRAPHED LAYOUT STAGE */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20"
      >
        
        {/* HERO SECTION STAGE */}
        <HeroSection onScrollToNext={handleScrollToExplore}>
          {/* Continuous Clean VideoPlayer centerpiece */}
          <VideoPlayer
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

      {/* CLEAN MINIMALIST FOOTER */}
      <footer className="relative bg-[#050505] border-t border-white/10 py-12 px-4 sm:px-6 md:px-8 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright/Index and metadata context */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/10 border border-white/15 flex items-center justify-center text-[10px] text-white font-mono font-bold">
                SM
              </div>
              <span className="text-sm font-display font-medium text-white uppercase tracking-wider">
                Sachin Mahato
              </span>
            </div>
            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest pt-1">
              &copy; {currentYear} • MBA MARKETING MANAGEMENT PORTFOLIO
            </p>
          </div>

          {/* Quick contact and status */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 hover:text-[#FF8A3D] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE FOR HIRING</span>
            </span>
            <span className="text-neutral-700">|</span>
            <a
              href="mailto:sachinmahato036@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
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
