/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Award, Sparkles } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
  description: string;
}

interface SkillCategory {
  name: string;
  color: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Sales & CRM Strategy",
    color: "#FF8A3D", // Orange
    skills: [
      { name: "Customer Relationship Management (CRM)", level: 95, description: "Managing customer accounts, pipeline tracking, and customer retention systems" },
      { name: "Consultative Selling", level: 92, description: "Understanding customer pain-points, value propositions, and tailored solution selling" },
      { name: "Client Engagement & Relationship Building", level: 90, description: "High-touch customer interactions, post-sale relationship building, and account growth" },
      { name: "Sales Support & Follow-ups", level: 88, description: "Coordinating sales lifecycle activities, prospect qualification, and follow-up cadence" }
    ]
  },
  {
    name: "Market Research & Analytics",
    color: "#38BDF8", // Cyan / Blue
    skills: [
      { name: "Market Research & Consumer Analysis", level: 90, description: "Primary/secondary field studies, customer preference benchmarking, and competitive analysis" },
      { name: "Retail Merchandising & Live Projects", level: 88, description: "Store layout optimization, product placement, and customer buying behavior diagnostics" },
      { name: "Power BI & Data Visualization", level: 86, description: "Interactive dashboards, performance reporting metrics, and data presentation" },
      { name: "Advanced Microsoft Excel", level: 90, description: "Financial forecasting, pivot tables, CRM lead segmentation, and data analysis" }
    ]
  },
  {
    name: "Generative AI & Productivity",
    color: "#A78BFA", // Violet / Purple
    skills: [
      { name: "ChatGPT & Prompt Engineering", level: 94, description: "Certified via Be10x & Microsoft; designing multi-turn prompt workflows and prompt architectures" },
      { name: "AI-Powered Data Analysis", level: 89, description: "Utilizing AI interpreters and statistical assistants for rapid market insights" },
      { name: "AI-Based Presentation Creation", level: 92, description: "Accelerating executive slide decks, narrative synthesis, and visual collateral" },
      { name: "Responsible AI & Ethics", level: 88, description: "Microsoft & LinkedIn certified in ethical AI deployment and organizational safety" }
    ]
  },
  {
    name: "Agile Operations & Leadership",
    color: "#34D399", // Emerald
    skills: [
      { name: "Agile Project Management", level: 90, description: "Microsoft & Coursera certified; sprint frameworks, WBS, and milestone delivery" },
      { name: "Stakeholder Management & Leadership", level: 88, description: "Cross-functional team alignment, executive briefs, and team coordination" },
      { name: "Risk & Performance Management", level: 86, description: "KPI tracking, operational bottlenecks diagnosis, and mitigation registers" },
      { name: "Communication & Workforce Coordination", level: 92, description: "HR operational experience, employee onboarding, and presentation delivery" }
    ]
  }
];

// Flat radar axes mapping core resume competencies
interface RadarData {
  axis: string;
  value: number;
  category: string;
  description: string;
}

const RADAR_DATA: RadarData[] = [
  { axis: "CRM Systems", value: 95, category: "Sales & CRM Strategy", description: "CRM tool records, relationship building, customer acquisition and retention" },
  { axis: "Consultative Sales", value: 92, category: "Sales & CRM Strategy", description: "Client requirement discovery, consultative selling, and tailored product recommendations" },
  { axis: "Market Research", value: 90, category: "Market Research & Analytics", description: "Customer surveys, competitor analysis, and demand trend discovery" },
  { axis: "Merchandising", value: 88, category: "Market Research & Analytics", description: "Store shelf placement, buying behavior evaluation, and customer experience improvement" },
  { axis: "GenAI & Prompting", value: 94, category: "Generative AI & Productivity", description: "Be10x certified in prompt engineering, ChatGPT automation, and workflow acceleration" },
  { axis: "AI Data Analysis", value: 89, category: "Generative AI & Productivity", description: "AI-assisted dataset diagnostics, automated summaries, and trend forecasting" },
  { axis: "Agile Projects", value: 90, category: "Agile Operations & Leadership", description: "Microsoft certified project planning, agile sprints, and milestone delivery" },
  { axis: "Stakeholder Mgmt", value: 88, category: "Agile Operations & Leadership", description: "Team leadership, cross-departmental coordination, and performance tracking" },
  { axis: "Communication", value: 92, category: "Agile Operations & Leadership", description: "Executive presentations, consultative discussions, and workforce coordination" }
];

interface RadarChartProps {
  activeCategoryName: string;
}

// Built-in Interactive D3 Radar Chart Component
export function RadarChart({ activeCategoryName }: RadarChartProps) {
  const [hoveredNode, setHoveredNode] = useState<RadarData | null>(null);

  const width = 290;
  const height = 290;
  const radius = 90;
  const cx = width / 2;
  const cy = height / 2;

  // Level grid circles (20%, 40%, 60%, 80%, & 100% capacity)
  const levels = [20, 40, 60, 80, 100];

  // Parse points with polar coordinates matching radar angle spokes
  const points = useMemo(() => {
    return RADAR_DATA.map((d, i) => {
      const angle = (i * 2 * Math.PI) / RADAR_DATA.length - Math.PI / 2;
      const r = (d.value / 100) * radius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      
      const labelDistance = radius + 20;
      const labelX = cx + labelDistance * Math.cos(angle);
      const labelY = cy + labelDistance * Math.sin(angle);

      return {
        ...d,
        angle,
        x,
        y,
        labelX,
        labelY,
        index: i
      };
    });
  }, [cx, cy, radius]);

  // Generate the coordinates polygon boundary
  const polygonPath = useMemo(() => {
    const coords = points.map(p => `${p.x},${p.y}`);
    return coords.length > 0 ? `M ${coords.join(" L ")} Z` : "";
  }, [points]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-2xl p-4 overflow-visible w-full min-h-[380px]">
      {/* Absolute Hover Tooltip Centerpiece */}
      <div className="absolute top-2 left-0 right-0 h-14 flex items-center justify-center z-20 px-2 pointer-events-none">
        <AnimatePresence mode="wait">
          {hoveredNode ? (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-[#050505]/95 border border-white/10 p-3 rounded-xl text-left shadow-2xl max-w-sm backdrop-blur-md pointer-events-auto"
            >
              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-mono font-bold uppercase" style={{ color: hoveredNode.category === "Business Analytics" ? "#FF8A3D" : hoveredNode.category === "Customer Behavior & CRM" ? "#4DA3FF" : "#FFB067" }}>
                  {hoveredNode.axis}
                </span>
                <span className="text-[10px] font-mono text-white bg-white/10 py-0.5 px-1.5 rounded-md font-semibold">
                  Proficiency: {hoveredNode.value}%
                </span>
              </div>
              <p className="text-[9px] text-[#C1C1C1] font-sans leading-relaxed mt-1">
                {hoveredNode.description}
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-mono text-gray-500 italic uppercase tracking-wider text-center"
            >
              Hover nodes to inspect expertise specifics
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Canvas drawing using D3 radial properties */}
      <svg width={width} height={height} className="overflow-visible mt-12 select-none" style={{ pointerEvents: "auto" }}>
        
        {/* Horizontal concentric level circles */}
        {levels.map((level, idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={(level / 100) * radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Level coordinate metrics labels (20%, 40%, etc) */}
        {levels.map((level, idx) => (
          <text
            key={idx}
            x={cx + 3}
            y={cy - (level / 100) * radius + 3}
            fontSize="7"
            className="font-mono fill-gray-600 font-semibold"
          >
            {level}%
          </text>
        ))}

        {/* Dynamic Spoke lines */}
        {points.map((p, idx) => {
          const spokeX = cx + radius * Math.cos(p.angle);
          const spokeY = cy + radius * Math.sin(p.angle);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={spokeX}
              y2={spokeY}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1.2"
              strokeDasharray="2 3"
            />
          );
        })}

        {/* Axis Labels positioning */}
        {points.map((p, idx) => {
          const isSelected = p.category === activeCategoryName;
          let textAnchor = "middle";
          if (Math.cos(p.angle) > 0.15) textAnchor = "start";
          if (Math.cos(p.angle) < -0.15) textAnchor = "end";

          return (
            <text
              key={idx}
              x={p.labelX}
              y={p.labelY + 2}
              textAnchor={textAnchor}
              fontSize="9"
              className={`font-mono transition-all duration-300 font-bold tracking-tight cursor-default ${
                isSelected ? "fill-white font-black" : "fill-gray-500"
              }`}
            >
              {p.axis}
            </text>
          );
        })}

        {/* Global core polygon background area */}
        <path
          d={polygonPath}
          fill="rgba(255, 255, 255, 0.015)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />

        {/* Highlight overlapping overlay corresponding to the active navigation category */}
        {SKILL_CATEGORIES.map((cat) => {
          const isSelected = cat.name === activeCategoryName;
          
          // Construct polar coordinate set that isolates only current category's levels
          const catCoords = points.map(p => {
            const levelVal = p.category === cat.name ? p.value : 12; // pull non-actives back to center
            const r = (levelVal / 100) * radius;
            const x = cx + r * Math.cos(p.angle);
            const y = cy + r * Math.sin(p.angle);
            return `${x},${y}`;
          });
          const catPath = `M ${catCoords.join(" L ")} Z`;

          return (
            <path
              key={cat.name}
              d={catPath}
              className="transition-all duration-500 pointer-events-none"
              fill={isSelected ? `${cat.color}20` : "transparent"}
              stroke={isSelected ? cat.color : "transparent"}
              strokeWidth={isSelected ? "2" : "0"}
            />
          );
        })}

        {/* Vertex circle nodes with hover binds */}
        {points.map((p, idx) => {
          const isSelected = p.category === activeCategoryName;
          const isHovered = hoveredNode?.axis === p.axis;
          const nodeColor = p.category === "Business Analytics" ? "#FF8A3D" : p.category === "Customer Behavior & CRM" ? "#4DA3FF" : "#FFB067";

          return (
            <g key={idx}>
              {/* Invisible interactive hover proxy */}
              <circle
                cx={p.x}
                cy={p.y}
                r="10"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(p)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              
              {/* Visible dynamic node */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 6 : isSelected ? 4.5 : 3}
                fill={isHovered ? "#FFFFFF" : nodeColor}
                stroke="#050505"
                strokeWidth="1.5"
                className="pointer-events-none transition-all duration-150"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"radar" | "metrics">("radar");

  const activeCategory = SKILL_CATEGORIES[selectedCategory];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
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

  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32 border-t border-white/5 bg-transparent"
      id="skills-section"
    >
      <div className="absolute inset-0 bg-radial-gradient from-[#ff8a3d]/5 to-transparent pointer-events-none z-0 filter blur-3xl opacity-40" />

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-16 md:mb-20 flex flex-col items-start text-left z-10"
        id="skills-header-text"
      >
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FFB067] uppercase mb-2">
          [ 04 // EXPERTISE ]
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
          Capabilities & <span className="text-[#FFB067] text-glow-blue">Stack</span>
        </h2>
        <div className="h-1 w-20 bg-[#FFB067] mt-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10"
        id="skills-grid-frame"
      >
        {/* Left Side: Category picker widgets */}
        <div className="lg:col-span-5 flex flex-col space-y-4 text-left" id="skills-picker-list">
          <motion.div variants={itemVariants} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-[#FFB067] font-bold uppercase block mb-1">
              Methodology Focus
            </span>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Click separate divisions below to filter live capabilities, center core overlay vertices, and review strategic descriptors.
            </p>
          </motion.div>

          {SKILL_CATEGORIES.map((category, index) => {
            const isSelected = selectedCategory === index;
            return (
              <motion.button
                variants={itemVariants}
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`w-full p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-white/[0.04] to-transparent border-white/15 text-white"
                    : "bg-transparent border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/[0.01]"
                }`}
                id={`skill-cat-btn-${index}`}
              >
                {/* Visual accent color band */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[4px] transition-all"
                  style={{ backgroundColor: isSelected ? category.color : "transparent" }}
                />

                <div className="flex justify-between items-center pr-2">
                  <div className="space-y-1">
                    <span
                      className="text-xs font-mono tracking-widest uppercase font-semibold block transition-colors group-hover:text-white"
                      style={{ color: isSelected ? category.color : undefined }}
                    >
                      {category.name}
                    </span>
                    <span className="text-[10px] text-gray-400 block font-sans">
                      {category.skills.length} core methodologies listed
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "translate-x-1" : "text-gray-600 group-hover:translate-x-0.5"
                    }`}
                    style={{ color: isSelected ? category.color : undefined }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Side: Tabbed Skills visualizers (Progress metrics & D3 Spider Radar) */}
        <motion.div variants={itemVariants} className="lg:col-span-7 w-full text-left" id="skills-display-card">
          <div className="p-6 md:p-8 rounded-2xl bg-[#0B0B0B] border border-white/5 shadow-2.5xl relative">
            
            {/* Split layout toggle controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-6 border-b border-white/5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                  ACTIVE FLUENCY ROADMAP
                </span>
                <span className="block text-sm font-display font-medium text-white uppercase tracking-wider">
                  {activeCategory.name}
                </span>
              </div>
              
              <div className="flex gap-1.5 p-1 bg-[#050505] border border-white/5 rounded-xl self-stretch sm:self-auto justify-center">
                <button
                  onClick={() => setViewMode("radar")}
                  className={`px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase font-bold rounded-lg transition-all cursor-pointer ${
                    viewMode === "radar"
                      ? "bg-[#FFB067] text-[#050505] shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  D3 Radar Graph
                </button>
                <button
                  onClick={() => setViewMode("metrics")}
                  className={`px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase font-bold rounded-lg transition-all cursor-pointer ${
                    viewMode === "metrics"
                      ? "bg-[#FFB067] text-[#050505] shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Metrics lists
                </button>
              </div>
            </div>

            {/* Inner dynamic cards block */}
            <div className="py-4">
              <AnimatePresence mode="wait">
                {viewMode === "radar" ? (
                  <motion.div
                    key="radar-graph"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <RadarChart activeCategoryName={activeCategory.name} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="linear-metrics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 py-4"
                  >
                    {activeCategory.skills.map((skill, index) => (
                      <div key={index} className="space-y-2.5 text-left">
                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                              {skill.name}
                            </h4>
                            <p className="text-xs text-[#B3B3B3] leading-relaxed font-sans max-w-md">
                              {skill.description}
                            </p>
                          </div>
                          <span className="text-xs font-mono font-semibold" style={{ color: activeCategory.color }}>
                            {skill.level}%
                          </span>
                        </div>

                        {/* Animated progres line */}
                        <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: activeCategory.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom summary note */}
            <div className="pt-6 border-t border-white/5 text-[10px] text-gray-500 font-mono italic">
              * Verification based on practical coursework metrics, live cases audits, and diagnostic evaluation at Satpura Agro Tech.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
