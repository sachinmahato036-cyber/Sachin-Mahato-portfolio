/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Laptop,
  BookOpen,
  PenTool,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  Users,
  Target,
  FileText,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Coffee,
  Sparkles,
  Search
} from "lucide-react";

type WorkstationTab = "computer" | "notebook" | "pen" | "office";

export default function ExecutiveWorkstationSection() {
  const [activeTab, setActiveTab] = useState<WorkstationTab>("computer");
  const [activeComputerSubTab, setActiveComputerSubTab] = useState<"crm" | "bi" | "leads">("crm");
  const [activeDiaryDate, setActiveDiaryDate] = useState<number>(0);

  const diaryEntries = [
    {
      time: "09:00 AM",
      category: "Account Strategy",
      title: "Key Account Pipeline Review",
      description: "Review deal stages in CRM, score warm enterprise leads, and calibrate weekly revenue forecast.",
      status: "Completed",
      priority: "High"
    },
    {
      time: "11:30 AM",
      category: "Consultative Sales",
      title: "Client Discovery & Solution Pitch",
      description: "Present tailored product packages, address objections, and align on timeline and budget milestones.",
      status: "Completed",
      priority: "Critical"
    },
    {
      time: "02:15 PM",
      category: "Field Operations",
      title: "In-Store Experience Audit (Decathlon Insights)",
      description: "Analyze floor plan conversion rate, SKU velocity, and seasonal customer traffic trends.",
      status: "In Progress",
      priority: "Medium"
    },
    {
      time: "04:45 PM",
      category: "Executive Reporting",
      title: "Stakeholder Briefing & Relationship Notes",
      description: "Log meeting minutes into CRM, dispatch formal follow-up dossiers, and prepare contract sign-off drafts.",
      status: "Scheduled",
      priority: "High"
    }
  ];

  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-20 md:py-28 border-t border-neutral-800/80 bg-black text-neutral-100"
      id="workstation-section"
    >
      {/* Subtle executive desk ambient light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-[#FF8A3D]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="relative mb-12 md:mb-16 flex flex-col items-start text-left z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF8A3D] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF8A3D] uppercase">
            [ 01 // EXECUTIVE WORKSPACE & TOOLS OF TRADE ]
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
          The Professional <span className="bg-gradient-to-r from-white via-neutral-200 to-[#FF8A3D] bg-clip-text text-transparent">Desk & Operations</span>
        </h2>
        
        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
          High-performance business development blends rigorous digital intelligence with structured tactile execution. Explore the computers, executive diaries, precision pens, and office environments that drive daily commercial results.
        </p>

        {/* 4 Interactive Desk Navigation Tabs */}
        <div className="mt-8 w-full flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-800/90 max-w-3xl">
          <button
            type="button"
            onClick={() => setActiveTab("computer")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "computer"
                ? "bg-neutral-800 text-white shadow-lg border border-neutral-700"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <Laptop className={`w-4 h-4 ${activeTab === "computer" ? "text-sky-400" : "text-neutral-500"}`} />
            <span>Computers & CRM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notebook")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "notebook"
                ? "bg-neutral-800 text-white shadow-lg border border-neutral-700"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === "notebook" ? "text-[#FF8A3D]" : "text-neutral-500"}`} />
            <span>Executive Diaries</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pen")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "pen"
                ? "bg-neutral-800 text-white shadow-lg border border-neutral-700"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <PenTool className={`w-4 h-4 ${activeTab === "pen" ? "text-emerald-400" : "text-neutral-500"}`} />
            <span>Precision Pens</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("office")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "office"
                ? "bg-neutral-800 text-white shadow-lg border border-neutral-700"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeTab === "office" ? "text-purple-400" : "text-neutral-500"}`} />
            <span>Corporate Office</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Box */}
      <div className="relative w-full rounded-3xl bg-neutral-950 border border-neutral-800/90 shadow-2xl p-6 sm:p-8 md:p-10 overflow-hidden">
        
        {/* Leather desk pad texture accent along the top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neutral-800 via-[#FF8A3D]/40 to-neutral-800" />
        
        <AnimatePresence mode="wait">
          {/* TAB 1: COMPUTERS & CRM TERMINAL */}
          {activeTab === "computer" && (
            <motion.div
              key="computer-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Computer Mockup & Live CRM View */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* Computer Frame / Titanium Laptop Mockup */}
                <div className="relative rounded-2xl bg-neutral-900 border-2 border-neutral-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                  
                  {/* Laptop Top Bezel & Camera */}
                  <div className="bg-neutral-950 px-4 py-2.5 flex items-center justify-between border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
                      <Search className="w-3 h-3 text-neutral-500" />
                      <span>crm.enterprise.salesforce.cloud/sachin-pipeline</span>
                    </div>

                    <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Screen Content: Subtabs */}
                  <div className="bg-neutral-900/90 p-4 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveComputerSubTab("crm")}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                          activeComputerSubTab === "crm"
                            ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Pipeline Velocity
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveComputerSubTab("bi")}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                          activeComputerSubTab === "bi"
                            ? "bg-[#FF8A3D]/20 text-[#FF8A3D] border border-[#FF8A3D]/40"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Market Analytics
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveComputerSubTab("leads")}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                          activeComputerSubTab === "leads"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Lead Engagement
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                      MacBook Pro 16" • Dual 4K Studio Displays
                    </span>
                  </div>

                  {/* Screen Body */}
                  <div className="p-5 sm:p-6 bg-neutral-950 min-h-[300px] flex flex-col justify-between">
                    {activeComputerSubTab === "crm" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                            <span className="text-[10px] font-mono text-neutral-400 block uppercase">Weighted Pipeline</span>
                            <span className="text-lg sm:text-xl font-display font-bold text-white">₹4.85 Cr</span>
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                              <TrendingUp className="w-3 h-3" /> +28% MoM
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                            <span className="text-[10px] font-mono text-neutral-400 block uppercase">Deal Win Rate</span>
                            <span className="text-lg sm:text-xl font-display font-bold text-sky-400">41.8%</span>
                            <span className="text-[10px] text-neutral-400 block mt-1 font-mono">Consultative pitch</span>
                          </div>
                          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                            <span className="text-[10px] font-mono text-neutral-400 block uppercase">Active Accounts</span>
                            <span className="text-lg sm:text-xl font-display font-bold text-[#FF8A3D]">128</span>
                            <span className="text-[10px] text-neutral-400 block mt-1 font-mono">96% retention</span>
                          </div>
                        </div>

                        {/* Visual Funnel Representation */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                            Sales Stage Conversion Funnel
                          </span>
                          <div className="space-y-1.5 font-mono text-xs">
                            <div className="flex items-center justify-between text-[11px] text-neutral-300">
                              <span>Prospecting & Market Intelligence</span>
                              <span className="text-neutral-400">100% (240 Leads)</span>
                            </div>
                            <div className="w-full bg-neutral-900 rounded-full h-2">
                              <div className="bg-sky-500 h-2 rounded-full w-full" />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-neutral-300 pt-1">
                              <span>Consultative Discovery & Needs Mapping</span>
                              <span className="text-neutral-400">68% (164 Leads)</span>
                            </div>
                            <div className="w-full bg-neutral-900 rounded-full h-2">
                              <div className="bg-[#FF8A3D] h-2 rounded-full w-[68%]" />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-neutral-300 pt-1">
                              <span>Solution Proposal & Stakeholder Demo</span>
                              <span className="text-neutral-400">45% (108 Leads)</span>
                            </div>
                            <div className="w-full bg-neutral-900 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full w-[45%]" />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-neutral-300 pt-1">
                              <span>Executive Contract Closing</span>
                              <span className="text-emerald-400">32% (77 Deals Signed)</span>
                            </div>
                            <div className="w-full bg-neutral-900 rounded-full h-2">
                              <div className="bg-emerald-400 h-2 rounded-full w-[32%]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeComputerSubTab === "bi" && (
                      <div className="space-y-3 font-mono">
                        <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">Decathlon In-Store Performance Matrix</span>
                            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">Live Study</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-1 font-sans">
                            Conducted in-store customer journey analysis across fitness & apparel categories. Correlated footfall dwell-time with basket size.
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-neutral-800 text-[10px]">
                            <div>
                              <span className="text-neutral-500 block">Peak Conversion Window:</span>
                              <span className="text-white font-medium">Saturday 17:00 - 20:30 IST</span>
                            </div>
                            <div>
                              <span className="text-neutral-500 block">Cross-Sell Uplift:</span>
                              <span className="text-emerald-400 font-medium">+19.4% through visual bundle merchandising</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">Market Competitor Benchmark</span>
                            <span className="text-[10px] text-[#FF8A3D] bg-orange-950/60 px-2 py-0.5 rounded border border-[#FF8A3D]/40">Q3 Update</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-1 font-sans">
                            Tracked pricing elasticity, customer retention factors, and digital touchpoint friction across Tier-1/Tier-2 urban clusters.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeComputerSubTab === "leads" && (
                      <div className="space-y-2.5 font-mono text-xs">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                              NX
                            </div>
                            <div>
                              <div className="text-white font-semibold font-sans">Nexora Retail Logistics</div>
                              <div className="text-[10px] text-neutral-400">Lead Score: 94/100 • Contract Review</div>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Closing Stage
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FF8A3D]/20 text-[#FF8A3D] flex items-center justify-center font-bold">
                              TP
                            </div>
                            <div>
                              <div className="text-white font-semibold font-sans">Tata Power Regional Division</div>
                              <div className="text-[10px] text-neutral-400">Lead Score: 88/100 • Pilot Presentation</div>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-1 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                            Demo Scheduled
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                              AD
                            </div>
                            <div>
                              <div className="text-white font-semibold font-sans">Apex Distribution Network</div>
                              <div className="text-[10px] text-neutral-400">Lead Score: 82/100 • Needs Assessment</div>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            Discovery
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Status bar */}
                    <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>SYNC: CRM Cloud Engine v4.2</span>
                      <span>SECURE SSL 256-BIT • ENTERPRISE READY</span>
                    </div>
                  </div>

                  {/* Laptop Base / Keyboard Deck Styling */}
                  <div className="bg-neutral-950 px-6 py-2 border-t border-neutral-800 flex justify-center items-center">
                    <div className="w-20 h-1 rounded-full bg-neutral-700/60" />
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Technical Capabilities */}
              <div className="lg:col-span-5 flex flex-col space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>HIGH-COMPUTE DIGITAL WORKSTATION</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  Data-Driven Sales & Analytical Intelligence
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  Modern sales excellence is built on technology. Sachin leverages enterprise CRM software, data-analytics dashboards, and generative AI prompt engineering to manage lead lifecycles, eliminate pipeline blind spots, and forecast revenue with surgical accuracy.
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">CRM Systems & Pipeline Management:</span>
                      <p className="text-neutral-400 mt-0.5">End-to-end deal tracking, lead qualification scoring, automated follow-up cadences, and client interaction histories.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Market Research & Quantitative BI:</span>
                      <p className="text-neutral-400 mt-0.5">Translating customer footfall, pricing sensitivity, and retail telemetry into actionable merchandising strategies.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">AI Productivity & Prompt Engineering:</span>
                      <p className="text-neutral-400 mt-0.5">Automating customer persona synthesis, personalized outreach messaging, and executive summary generation.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    💻 Hardware: M-Series Silicon + Dual Monitors
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    ⚡ Speed: Real-Time Sync
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: EXECUTIVE DIARIES & STRATEGIC NOTEBOOKS */}
          {activeTab === "notebook" && (
            <motion.div
              key="notebook-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Realistic Leather-Bound Executive Diary Mockup */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="relative rounded-2xl bg-[#141210] border-2 border-[#3d2a1c] shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-5 sm:p-7 overflow-hidden text-left">
                  
                  {/* Leather Bookmark Ribbon & Gold Corner Accents */}
                  <div className="absolute top-0 right-10 w-4 h-16 bg-[#FF8A3D] rounded-b-md shadow-md z-20 flex flex-col items-center justify-end pb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                  </div>
                  
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFB067]/40 rounded-tl-xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFB067]/40 rounded-br-xl pointer-events-none" />

                  {/* Diary Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#3d2a1c] relative z-10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#FFB067] tracking-widest uppercase">
                          EXECUTIVE DAILY PLANNER & STRATEGY DIARY
                        </span>
                      </div>
                      <h4 className="text-lg font-serif font-bold text-neutral-100 tracking-wide mt-0.5">
                        Sachin Mahato • Daily Operational Blueprint
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#1f1a16] border border-[#4d3522] px-3 py-1 rounded-lg text-[11px] font-mono text-[#FFB067]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Q3 FISCAL CYCLE</span>
                    </div>
                  </div>

                  {/* Diary Entry Cards */}
                  <div className="py-4 space-y-3 relative z-10">
                    {diaryEntries.map((entry, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveDiaryDate(idx)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          activeDiaryDate === idx
                            ? "bg-[#251e18] border-[#FF8A3D]/60 shadow-md"
                            : "bg-[#181410] border-[#312419] hover:border-[#4d3827]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <Clock className="w-3.5 h-3.5 text-[#FF8A3D]" />
                            <span className="text-neutral-300 font-semibold">{entry.time}</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-[#FFB067]">{entry.category}</span>
                          </div>

                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            entry.status === "Completed"
                              ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800/60"
                              : entry.status === "In Progress"
                              ? "bg-sky-950/70 text-sky-400 border border-sky-800/60"
                              : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                          }`}>
                            {entry.status}
                          </span>
                        </div>

                        <div className="mt-2">
                          <h5 className="text-sm font-sans font-bold text-white">{entry.title}</h5>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-sans">{entry.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Handwritten-Style Executive Thought Note */}
                  <div className="p-4 rounded-xl bg-[#1c1611] border border-[#3e2c1e] relative z-10">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#FFB067] mb-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="uppercase font-bold tracking-wider">Tactical Executive Memo</span>
                    </div>
                    <p className="text-xs font-serif italic text-neutral-300 leading-relaxed">
                      "Consultative selling is not about convincing someone to buy; it is about uncovering the precise business pain point and co-crafting the undeniable solution."
                    </p>
                    <div className="mt-2 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                      <span>Ref: MBA Marketing Management • Pune</span>
                      <span className="text-[#FF8A3D] font-bold">SM — Signed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Why Physical Notebooks Matter in Executive Sales */}
              <div className="lg:col-span-5 flex flex-col space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A3D]/10 border border-[#FF8A3D]/30 text-[#FF8A3D] text-xs font-mono">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>TACTILE STRATEGIC RIGOR</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  Executive Diaries & Intentional Note-Taking
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  In high-stakes corporate meetings and stakeholder consultations, a hardbound executive diary conveys presence, active listening, and undivided attention that typing on a laptop cannot match.
                </p>

                {/* Value Propositions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8A3D] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Active Discovery Documentation:</span>
                      <p className="text-neutral-400 mt-0.5">Capturing nuanced client expressions, unspoken reservations, and executive decision-maker org structures.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8A3D] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Structured Daily Time-Boxing:</span>
                      <p className="text-neutral-400 mt-0.5">Prioritizing high-leverage revenue activities first thing in the morning before inbox clutter begins.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8A3D] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Milestone Accountability:</span>
                      <p className="text-neutral-400 mt-0.5">Physical tracking of follow-up commitments made to clients, ensuring zero dropped leads.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    📓 Notebook: Leather Hardbound 240-GSM
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    ⚡ Focus: 100% Meeting Presence
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: PRECISION FOUNTAIN PENS & CONTRACT STATIONERY */}
          {activeTab === "pen" && (
            <motion.div
              key="pen-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Visual Executive Pen Suite Showcase */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="relative rounded-2xl bg-neutral-950 border border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden text-left">
                  
                  {/* Stylized Executive Pen Illustration & Specifications */}
                  <div className="relative w-full h-44 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800/80 flex flex-col items-center justify-center p-6 overflow-hidden">
                    
                    {/* Metallic Fountain Pen Graphic using SVG */}
                    <div className="relative w-full max-w-md flex items-center justify-center">
                      <svg viewBox="0 0 600 70" className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                        {/* Pen Nib (Gold / Brass Accent) */}
                        <polygon points="30,35 60,25 60,45" fill="url(#goldGradient)" stroke="#d4af37" strokeWidth="1" />
                        <line x1="30" y1="35" x2="52" y2="35" stroke="#1a1a1a" strokeWidth="1.5" />
                        <circle cx="52" cy="35" r="1.5" fill="#1a1a1a" />

                        {/* Grip Section */}
                        <rect x="60" y="27" width="40" height="16" rx="2" fill="#262626" stroke="#404040" strokeWidth="1" />

                        {/* Gold Band 1 */}
                        <rect x="100" y="25" width="8" height="20" rx="1" fill="url(#goldGradient)" />

                        {/* Barrel (Matte Gunmetal / Titanium) */}
                        <rect x="108" y="25" width="300" height="20" rx="3" fill="url(#gunmetalGradient)" stroke="#525252" strokeWidth="1" />
                        <line x1="108" y1="30" x2="408" y2="30" stroke="#737373" strokeWidth="0.8" opacity="0.6" />

                        {/* Monogram Engraving on Pen Body */}
                        <text x="230" y="38" fill="#e5e5e5" fontSize="8" fontFamily="monospace" letterSpacing="2">
                          SACHIN MAHATO • EXECUTIVE
                        </text>

                        {/* Gold Band 2 */}
                        <rect x="408" y="24" width="10" height="22" rx="1" fill="url(#goldGradient)" />

                        {/* Pen Cap End / Finial */}
                        <rect x="418" y="26" width="120" height="18" rx="4" fill="url(#gunmetalGradient)" stroke="#525252" strokeWidth="1" />
                        {/* Metallic Clip */}
                        <rect x="430" y="20" width="80" height="4" rx="2" fill="url(#goldGradient)" />
                        <circle cx="510" cy="22" r="3" fill="url(#goldGradient)" />

                        {/* Gradients definitions */}
                        <defs>
                          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F5D061" />
                            <stop offset="50%" stopColor="#E6A123" />
                            <stop offset="100%" stopColor="#F5D061" />
                          </linearGradient>
                          <linearGradient id="gunmetalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#404040" />
                            <stop offset="50%" stopColor="#171717" />
                            <stop offset="100%" stopColor="#2e2e2e" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="mt-4 flex items-center justify-between w-full text-[10px] font-mono text-neutral-400">
                      <span>TOOL: Precision Fountain Pen (Medium Nib)</span>
                      <span className="text-[#FF8A3D]">PURPOSE: Deal Signatures & High-Impact Correspondence</span>
                    </div>
                  </div>

                  {/* 3 Executive Deal Protocol Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-sans font-bold text-white">Deal Sign-Off</h5>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        Formalizing SLAs, scope parameters, and contractual milestone approvals with enterprise clients.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
                        <FileText className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-sans font-bold text-white">Executive Proposals</h5>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        Structuring custom commercial packages, ROI business cases, and multi-tier pricing proposals.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                      <div className="w-7 h-7 rounded-lg bg-[#FF8A3D]/10 border border-[#FF8A3D]/20 text-[#FF8A3D] flex items-center justify-center mb-2">
                        <Target className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-sans font-bold text-white">Strategic Memos</h5>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        Authoring sharp executive summaries for sales leadership, identifying emerging expansion vectors.
                      </p>
                    </div>
                  </div>

                  {/* Quote Banner */}
                  <div className="mt-3 p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-neutral-300">
                      "A signed contract is only the beginning; the real relationship is built in the execution."
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-5 flex flex-col space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>THE SIGNATURE INSTRUMENT</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  Precision Stationery & Commercial Agreements
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  The pen symbolizes commitment and trust in commercial transactions. From signing off on high-value retail merchandising agreements to crafting personalized executive follow-up correspondence, Sachin values the weight of formal commitment.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Consultative Proposal Drafting:</span>
                      <p className="text-neutral-400 mt-0.5">Creating bespoke value propositions tailored to the exact KPIs of decision-makers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Clear Commercial Terms:</span>
                      <p className="text-neutral-400 mt-0.5">Eliminating ambiguity in sales contracts, payment terms, and delivery expectations.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Executive Etiquette:</span>
                      <p className="text-neutral-400 mt-0.5">Demonstrating professionalism that commands respect across corporate enterprise hierarchy.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    ✒️ Nib: 18K Two-Tone Brass & Steel
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    📜 Standard: Enterprise NDA & SLA
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: CORPORATE OFFICE & BOARDROOM */}
          {activeTab === "office" && (
            <motion.div
              key="office-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Modern Corporate Office / Boardroom Blueprint */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="relative rounded-2xl bg-neutral-950 border border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden text-left">
                  
                  {/* Corporate Office Blueprint Schematic */}
                  <div className="relative w-full rounded-xl bg-neutral-900/90 border border-neutral-800 p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Executive Boardroom & Conference Setup
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                        HEADQUARTERS HQ-1
                      </span>
                    </div>

                    {/* Conference Room Architecture Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-200">Main Presentation Stage</span>
                          <span className="text-[10px] text-purple-400 font-mono">AV Ready</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                          Equipped for high-impact pitch decks, live financial simulations, and hybrid video linkups with pan-India distribution partners.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-200">Consultative Negotiation Table</span>
                          <span className="text-[10px] text-emerald-400 font-mono">In-Person</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                          Dedicated setting for face-to-face deal structuring, multi-stakeholder consensus building, and contract finalization.
                        </p>
                      </div>
                    </div>

                    {/* Operational Environment Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                      <div className="p-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-center">
                        <span className="text-neutral-500 block text-[9px] uppercase">Environment</span>
                        <span className="text-white font-semibold">Tier-1 Corporate</span>
                      </div>
                      <div className="p-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-center">
                        <span className="text-neutral-500 block text-[9px] uppercase">Mobility</span>
                        <span className="text-sky-400 font-semibold">Field & Virtual</span>
                      </div>
                      <div className="p-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-center">
                        <span className="text-neutral-500 block text-[9px] uppercase">Availability</span>
                        <span className="text-emerald-400 font-semibold">Pan-India Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Meeting Protocol */}
                  <div className="pt-4 flex flex-col space-y-2 font-mono text-xs">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                      Executive Meeting Cadence & Standards
                    </span>
                    <div className="flex items-center justify-between p-2.5 rounded bg-neutral-900/60 border border-neutral-800/80">
                      <span className="text-neutral-300">1. Pre-Meeting Intelligence Dossier Dispatch</span>
                      <span className="text-[#FF8A3D]">24h Prior</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-neutral-900/60 border border-neutral-800/80">
                      <span className="text-neutral-300">2. Needs Discovery & Live Objection Handling</span>
                      <span className="text-sky-400">First 15 Mins</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-neutral-900/60 border border-neutral-800/80">
                      <span className="text-neutral-300">3. Action Item Matrix & Stakeholder Sign-Off</span>
                      <span className="text-emerald-400">Closing 10 Mins</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-5 flex flex-col space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>CORPORATE SPACES & FIELD MOBILITY</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  Boardroom Presence & Enterprise Acumen
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  Whether presenting to C-suite executives in a glass-walled conference room, conducting live retail store visits at Decathlon, or coordinating remote sales operations across cross-functional teams, Sachin thrives in professional corporate settings.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Executive Stage Poise:</span>
                      <p className="text-neutral-400 mt-0.5">Confident, articulate presentations that translate technical features into tangible corporate ROI.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Cross-Functional Collaboration:</span>
                      <p className="text-neutral-400 mt-0.5">Unifying sales, product marketing, supply chain, and legal teams to close complex enterprise contracts.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">Agile Workspace Adaptability:</span>
                      <p className="text-neutral-400 mt-0.5">Comfortable operating across physical retail floors, corporate boardrooms, and remote virtual deal rooms.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    🏢 Setting: Corporate HQ & On-Site Retail
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                    🌐 Scope: Enterprise & Retail Clients
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Interactive Desk Tools Glance */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sky-400">
              <Laptop className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-neutral-400 block text-[10px] font-mono uppercase">Primary Station</span>
              <span className="text-white font-medium">Enterprise CRM Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#FF8A3D]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-neutral-400 block text-[10px] font-mono uppercase">Strategic Log</span>
              <span className="text-white font-medium">Leather Executive Diary</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
              <PenTool className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-neutral-400 block text-[10px] font-mono uppercase">Closing Instrument</span>
              <span className="text-white font-medium">Precision Fountain Pen</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-purple-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-neutral-400 block text-[10px] font-mono uppercase">Corporate Theater</span>
              <span className="text-white font-medium">Modern Boardroom Suite</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
