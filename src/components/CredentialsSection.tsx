/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  BookOpen, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Users, 
  Presentation,
  BookMarked
} from "lucide-react";

interface CredentialItem {
  id: string;
  type: "certification" | "seminar";
  title: string;
  provider: string;
  date?: string;
  location?: string;
  skills: string[];
  description: string;
  highlights: string[];
  color: string; // Tailwind border/text accent color
  badgeIcon: React.ReactNode;
}

const CREDENTIALS_DATA: CredentialItem[] = [
  {
    id: "cert-pm-microsoft",
    type: "certification",
    title: "Microsoft Project Management Build Job-Ready Skills",
    provider: "Coursera in collaboration with Microsoft",
    date: "Job-Ready Professional Certification",
    skills: ["Project Planning", "Agile Project Management", "Stakeholder Management", "Team Leadership", "Risk and Performance Management"],
    description: "Professional certification co-developed with Microsoft. Covers end-to-end project planning, agile sprints, stakeholder alignment, risk analysis, and team performance tracking.",
    highlights: [
      "Mastered corporate work breakdown structures (WBS), sprint planning, and timeline forecasting",
      "Drafted comprehensive risk registers and stakeholder engagement matrices",
      "Applied structured agile KPIs to manage project deliverables on schedule and within scope"
    ],
    color: "from-[#FF8A3D] to-[#FFB067]",
    badgeIcon: <Award className="w-5 h-5 text-[#FF8A3D]" />
  },
  {
    id: "cert-genai-microsoft-linkedin",
    type: "certification",
    title: "Career Essentials in Generative AI",
    provider: "Microsoft and LinkedIn Learning",
    date: "Learning Path Certification",
    skills: ["Generative AI", "Responsible AI", "Microsoft", "Prompt Engineering", "Ethical AI"],
    description: "Certified by Microsoft & LinkedIn Learning, focusing on foundational generative AI capabilities, Microsoft Copilot, and responsible AI governance frameworks.",
    highlights: [
      "Completed intensive Learning Path curriculum co-certified by Microsoft & LinkedIn Learning",
      "Mastered generative AI prompt techniques and productivity acceleration using Copilot",
      "Acquired depth in Responsible AI governance, fairness, safety guardrails, and compliance"
    ],
    color: "from-sky-400 to-blue-600",
    badgeIcon: <Sparkles className="w-5 h-5 text-sky-400" />
  },
  {
    id: "cert-ai-chatgpt",
    type: "certification",
    title: "AI Tools and ChatGPT Workshop",
    provider: "Be10x",
    date: "Hands-on Applied Workshop",
    skills: ["Generative AI Tools", "ChatGPT and Prompt Engineering", "AI Powered Data Analysis", "AI Based Presentation Creation", "AI Assisted Coding & Debugging"],
    description: "Practical certification focusing on blending LLMs, prompt engineering, and automated AI tools into day-to-day business diagnostics and data analysis.",
    highlights: [
      "Leveraged prompt topologies for market research synthesis and competitive reports",
      "Used AI-powered data analysis to inspect and visualize multifaceted consumer datasets",
      "Accelerated presentation creation and automated workflows with AI-assisted scripting"
    ],
    color: "from-cyan-400 to-[#4DA3FF]",
    badgeIcon: <Sparkles className="w-5 h-5 text-sky-400" />
  },
  {
    id: "cert-icssr-conference",
    type: "certification",
    title: "ICSSR-ERC Sponsored National Conference",
    provider: "XITE College, Gamharia",
    date: "National Academic Conference",
    skills: ["Communication Skills", "Problem Solving", "Critical Thinking", "Professional Networking"],
    description: "Credentials awarded for participation at the ICSSR-ERC sponsored national academic conference, exploring economic challenges, business strategy, and regional growth.",
    highlights: [
      "Gained peer-reviewed insights into regional rural consumer distribution models",
      "Participated in discussions addressing cross-functional operational friction",
      "Built professional networking contacts across academic and industry delegates"
    ],
    color: "from-emerald-400 to-teal-500",
    badgeIcon: <Users className="w-5 h-5 text-emerald-400" />
  },
  {
    id: "sem-innovation-mgmt",
    type: "seminar",
    title: "Workshop on Innovation In Management",
    provider: "MIT Art, Design and Technology, Pune",
    date: "06 Feb, 2025 - 08 Feb, 2025",
    location: "Pune, Maharashtra",
    skills: ["Innovation Management", "Creative Problem Solving", "Decision Making"],
    description: "3-day management workshop focused on disruptive innovation frameworks, strategic decision-making matrices, and creative corporate problem solving.",
    highlights: [
      "Applied structured decision-making methodologies to competitive marketing challenges",
      "Participated in creative problem-solving sprints addressing business bottlenecks",
      "Collaborated with cross-functional MBA cohorts on innovation case studies"
    ],
    color: "from-purple-400 to-indigo-500",
    badgeIcon: <GraduationCap className="w-5 h-5 text-purple-400" />
  },
  {
    id: "sem-icssr-symposium",
    type: "seminar",
    title: "ICSSR-ERC Sponsored National Conference",
    provider: "XITE",
    date: "12 Nov, 2022 - 12 Nov, 2022",
    location: "XITE Institutional Campus",
    skills: ["Research & Analytical Thinking", "Presentation & Communication Skills", "Problem-Solving Ability"],
    description: "Scholastic conference presentations evaluating business challenges, operational research, and analytical methodologies.",
    highlights: [
      "Demonstrated research and analytical thinking on business strategy",
      "Refined presentation and communication skills in front of academic evaluation panels",
      "Applied structured problem-solving techniques to contemporary management dilemmas"
    ],
    color: "from-rose-400 to-red-500",
    badgeIcon: <Presentation className="w-5 h-5 text-rose-400" />
  },
  {
    id: "sem-marketing-lscm",
    type: "seminar",
    title: "Marketing And LSCM Conference",
    provider: "MIT Art, Design and Technology, Pune",
    date: "University Management Conference",
    location: "Pune, Maharashtra",
    skills: ["Marketing Strategy", "Logistics & Supply Chain Management", "Distribution Channels"],
    description: "Academic conference examining the convergence of modern marketing strategies with logistics and supply chain management (LSCM).",
    highlights: [
      "Analyzed the critical relationship between consumer marketing and supply chain agility",
      "Audited case studies on distribution channels, inventory pipelines, and fulfillment",
      "Explored modern trends in retail logistics and customer satisfaction drivers"
    ],
    color: "from-[#FF8A3D] to-red-400",
    badgeIcon: <BookMarked className="w-5 h-5 text-[#FF8A3D]" />
  }
];

export default function CredentialsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "certification" | "seminar">("all");
  const [selectedId, setSelectedId] = useState<string | null>("cert-genai-microsoft-linkedin");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const filteredItems = CREDENTIALS_DATA.filter(
    item => activeTab === "all" || item.type === activeTab
  );

  const currentDetailedItem = CREDENTIALS_DATA.find(item => item.id === selectedId) || CREDENTIALS_DATA[0];

  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32 border-t border-white/5 bg-transparent"
      id="credentials-section"
    >
      {/* Header section with sequence indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-16 md:mb-24 flex flex-col items-start text-left z-10"
        id="credentials-header-text"
      >
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF8A3D] uppercase mb-2">
          [ 06 // CREDENTIALS & EDUCATION ]
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
          Assessments & <span className="text-[#FFB067] text-glow-orange">Milestones</span>
        </h2>
        <div className="h-1 w-20 bg-[#FF8A3D] mt-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10"
        id="credentials-grid"
      >
        {/* Left column: List and Controls */}
        <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col space-y-6" id="credentials-left-frame">
          
          {/* Glassmorphic Segment Control / Tabs */}
          <div className="p-1.5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-2" id="credentials-filter-tabs">
            {(["all", "certification", "seminar"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Auto-select first item of the new category
                  const firstOfTab = CREDENTIALS_DATA.find(item => tab === "all" || item.type === tab);
                  if (firstOfTab) setSelectedId(firstOfTab.id);
                }}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white/[0.08] text-white border border-white/10 shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                }`}
                id={`cred-tab-btn-${tab}`}
              >
                {tab === "all" ? `Show All (${CREDENTIALS_DATA.length})` : tab === "certification" ? "Certifications" : "Seminars & Workshops"}
              </button>
            ))}
          </div>

          {/* List display scrollbox container */}
          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 custom-scroll" id="credentials-scroll-container">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <button
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? "bg-white/[0.04] border-white/15 shadow-[0_0_35px_rgba(255,138,61,0.08)]"
                          : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                      }`}
                      id={`cred-item-card-${item.id}`}
                    >
                      {/* Hover Cinematic Bloom Ambient Light Wells */}
                      <div className={`absolute -right-16 -top-16 w-36 h-36 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500 rounded-full pointer-events-none group-hover:scale-110`} />
                      <div className={`absolute -left-16 -bottom-16 w-36 h-36 bg-gradient-to-tr ${item.color} opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500 rounded-full pointer-events-none group-hover:scale-110`} />
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-[0.03] transition-all duration-500 pointer-events-none rounded-2xl`} />

                      {/* Left gradient visual indicator ring */}
                      <span className={`absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b ${item.color} opacity-80 z-10`} />

                      <div className="flex items-start gap-4 pr-1">
                        <div className={`p-3 bg-white/[0.03] rounded-xl border border-white/5 group-hover:scale-105 transition-transform ${isSelected ? 'border-[#FF8A3D]/20 bg-[#FF8A3D]/5' : ''}`}>
                          {item.badgeIcon}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[10px] font-mono tracking-widest text-[#FFB067] uppercase font-bold bg-[#FF8A3D]/10 px-2 py-0.5 rounded-md">
                              {item.type === "certification" ? "Verification Cert" : "Academic Event"}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500 whitespace-nowrap">
                              {item.date ? item.date.split(" - ")[0] : ""}
                            </span>
                          </div>
                          
                          <h4 className="text-base font-sans font-bold text-white tracking-wide group-hover:text-[#FF8A3D] transition-colors leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-400 font-mono line-clamp-1">
                            {item.provider}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 self-center text-gray-600 transition-transform ${isSelected ? 'translate-x-1 text-[#FF8A3D]' : 'group-hover:translate-x-0.5'}`} />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right column: Dynamic Deep Detail Inspection Stage */}
        <motion.div variants={itemVariants} className="lg:col-span-6 text-left" id="credentials-detail-panel">
          <div className="p-6 md:p-8 rounded-2xl bg-[#0B0B0B] border border-white/5 shadow-2.5xl relative overflow-hidden h-full flex flex-col justify-between">
            {/* Ambient detail background texture */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${currentDetailedItem.color} opacity-[0.03] filter blur-2xl rounded-full`} />

            <div>
              {/* Detailed Header metadata */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
                  Audited Portfolio Evidence
                </span>
                <span className="text-xs font-mono text-[#FF8A3D] font-bold tracking-widest flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Verified Candidate</span>
                </span>
              </div>

              {/* Core Content */}
              <div className="py-6 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#FFB067] font-semibold bg-[#FF8A3D]/10 py-1 px-2.5 rounded-full uppercase mb-3">
                    {currentDetailedItem.type === "certification" ? "Assessment Badge" : "Professional Event Log"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-wide leading-tight">
                    {currentDetailedItem.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans mt-2 italic">
                    Issued by: {currentDetailedItem.provider}
                  </p>
                </div>

                {/* Sub-directories labels */}
                {currentDetailedItem.location && (
                  <div className="flex gap-4 text-xs font-mono text-gray-500 py-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FFB067]" />
                      {currentDetailedItem.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {currentDetailedItem.location}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="text-xs font-mono tracking-widest text-gray-400 uppercase font-bold">
                    Acquired Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentDetailedItem.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-mono font-bold py-1 px-3 bg-white/[0.03] border border-white/5 rounded-full text-[#F5F5F5] hover:bg-[#FF8A3D]/10 hover:border-[#FF8A3D]/20 hover:text-[#FFB067] transition-all cursor-default"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono tracking-widest text-gray-400 uppercase font-bold">
                    Key Achievements & Synergies
                  </h4>
                  <ul className="space-y-3">
                    {currentDetailedItem.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A3D] mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom metadata banner */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[10px] text-gray-500 font-mono leading-relaxed max-w-sm">
                * Transcripts, physical certificates, and event portfolios are available directly upon corporate recruitment audit.
              </p>
              <div className="p-1 px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 font-mono text-[9px] uppercase font-bold tracking-widest">
                Class A Credential
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
