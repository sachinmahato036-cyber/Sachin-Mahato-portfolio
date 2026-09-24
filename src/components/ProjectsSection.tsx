/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import {
  Users,
  LineChart,
  MessageSquare,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Layers,
  Zap,
  Globe
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  ComposedChart
} from "recharts";
import { ProjectSection } from "../types";

// Static dashboard metric structures for Decathlon Project tabs
const DECATHLON_TABS: Record<string, ProjectSection> = {
  behavior: {
    title: "Customer Behavior Analysis",
    subtitle: "Evaluating footfall, session conversion metrics, and visual heatmaps",
    metrics: [
      { label: "Purchase Conversion", value: "3.24%", description: "Benchmarked (+0.42%)", trend: "up" },
      { label: "High-Intent Visits", value: "11,840", description: "In-store digital logins", trend: "up" },
      { label: "Bounce Threshold", value: "42.1%", description: "Average department escape", trend: "down" },
    ],
    insights: [
      "Identified that over 65% of sports-app users utilize the checkout-scanner when browsing the premium technical-apparel section.",
      "Identified critical friction in the footwear department: average fitting delays exceeding 8 minutes reduced repeat conversion by 14%.",
      "Drafted cross-selling strategies recommending proximity placement of lightweight socks near premium training models."
    ],
    iconName: "Users"
  },
  inventory: {
    title: "Inventory & Merchandising",
    subtitle: "Realigning stock levels, item layout, and premium SKU shelf allocation",
    metrics: [
      { label: "Out of Stock Rate", value: "1.85%", description: "Core running apparel", trend: "down" },
      { label: "Stock Turn Buffer", value: "+14 Days", description: "Safety buffer optimized", trend: "up" },
      { label: "Merchandise Velocity", value: "+12.4%", description: "Post shelf-layout tweak", trend: "up" },
    ],
    insights: [
      "Maintained structured inventory audits during high-demands peaks using advanced Excel forecasting sheets.",
      "Redesigned focal merchandising banners which increased engagement for mid-range carbon-sole running shoes by 23%.",
      "Configured automatic regional replenishment triggers, shaving 3 days off key warehouse turnaround cycles."
    ],
    iconName: "Layers"
  },
  feedback: {
    title: "Customer Feedback Analytics",
    subtitle: "Evaluating NPS, digital ticket feedback, and operational bottlenecks",
    metrics: [
      { label: "NPS Rating Index", value: "+46 Pt", description: "Highest peak registered", trend: "up" },
      { label: "Response Delay", value: "1.4 Min", description: "Average helpdesk prompt", trend: "down" },
      { label: "Resolution Metric", value: "94.2%", description: "Single-contact solved", trend: "up" },
    ],
    insights: [
      "Parsed more than 4,500 written customers feedback logs using keyword-clustering matrices in Power BI to surface high-priority complaints.",
      "Recognized consistent client demands for interactive test-stages in the rackets division, which were successfully prototyped.",
      "Improved post-purchase consumer survey logs, yielding a response-increase of +11%."
    ],
    iconName: "MessageSquare"
  },
  collaboration: {
    title: "Operational Insights & Shared Goals",
    subtitle: "Cross-functional synchronization, resource pipelines, and board audits",
    metrics: [
      { label: "Core Teams Synced", value: "4 Regional", description: "Apparel, Gear, Ops & HR", trend: "up" },
      { label: "Delivery Efficiency", value: "98.1%", description: "Logistical target hit", trend: "up" },
      { label: "Audit Compliance", value: "100%", description: "Passed national check", trend: "up" },
    ],
    insights: [
      "Championed weekly cross-functional dashboard reports aligning store managers and field marketing leads.",
      "Constructed custom predictive marketing excel templates, helping managers allocate local promotional funds with 15% better precision.",
      "Standardized customer relationship hand-offs between digital helpdesk counters and on-site checkout personnel."
    ],
    iconName: "Zap"
  }
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: any;
  key?: any;
}

function TiltCard({ children, className, id, variants }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse coordinate ratios to small degree coordinate-rotations for 3D depth tilt
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      id={id}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Custom trend datasets supporting Business Analytics interactive charting theme
const TREND_DATASETS: Record<string, any[]> = {
  behavior: [
    { name: "Mon", traffic: 8200, conversion: 2.1 },
    { name: "Tue", traffic: 9400, conversion: 2.4 },
    { name: "Wed", traffic: 10100, conversion: 2.8 },
    { name: "Thu", traffic: 9800, conversion: 2.6 },
    { name: "Fri", traffic: 11400, conversion: 3.1 },
    { name: "Sat", traffic: 14200, conversion: 3.5 },
    { name: "Sun", traffic: 11840, conversion: 3.24 },
  ],
  inventory: [
    { name: "Week 1", stockOut: 4.2, turnover: 8.5 },
    { name: "Week 2", stockOut: 3.5, turnover: 9.2 },
    { name: "Week 3", stockOut: 2.8, turnover: 10.4 },
    { name: "Week 4", stockOut: 2.1, turnover: 11.1 },
    { name: "Week 5", stockOut: 1.85, turnover: 12.4 },
  ],
  feedback: [
    { month: "Jan", nps: 32, delay: 2.5 },
    { month: "Feb", nps: 35, delay: 2.2 },
    { month: "Mar", nps: 38, delay: 1.8 },
    { month: "Apr", nps: 41, delay: 1.6 },
    { month: "May", nps: 44, delay: 1.5 },
    { month: "Jun", nps: 46, delay: 1.4 },
  ],
  collaboration: [
    { name: "Apparel", score: 88, target: 90 },
    { name: "Gear", score: 94, target: 92 },
    { name: "Ops", score: 98.1, target: 95 },
    { name: "HR", score: 92, target: 88 },
  ]
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050505]/95 border border-white/10 p-3 rounded-xl shadow-2xl text-left backdrop-blur-md text-[10px] font-mono">
        <p className="font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <div className="space-y-1 mt-1.5">
          {payload.map((pld: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color || pld.fill }} />
              <span className="text-gray-400">{pld.name}:</span>
              <span className="text-white font-bold">{pld.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

interface ProjectAnalyticsChartProps {
  activeTab: string;
}

function ProjectAnalyticsChart({ activeTab }: ProjectAnalyticsChartProps) {
  const data = TREND_DATASETS[activeTab] || [];

  if (activeTab === "behavior") {
    return (
      <div className="w-full mt-6 bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between" id="chart-behavior-frame">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-mono tracking-widest text-[#FF8A3D] uppercase font-bold">
            Weekly Footfall & Conversion Trend
          </span>
          <span className="text-[9px] font-mono text-gray-500">
            Unit: Visitors (Line) & % Conversion (Area)
          </span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8A3D" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#FF8A3D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="conversion" name="Conversion Rate (%)" stroke="#FF8A3D" strokeWidth={1.5} fillOpacity={1} fill="url(#colorConversion)" />
              <Line type="monotone" dataKey="traffic" name="Store Traffic" stroke="#4DA3FF" strokeWidth={1.5} dot={{ r: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (activeTab === "inventory") {
    return (
      <div className="w-full mt-6 bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between" id="chart-inventory-frame">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold">
            Velocity vs Stock Out Analysis
          </span>
          <span className="text-[9px] font-mono text-gray-500">
            Unit: Out-of-Stock % (Line) & Merchandise Velocity (Bar)
          </span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="turnover" name="Merchandise Velocity (+%)" fill="#4DA3FF" radius={[3, 3, 0, 0]} barSize={18} />
              <Line type="monotone" dataKey="stockOut" name="Stock-Out Rate (%)" stroke="#FF8A3D" strokeWidth={1.5} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (activeTab === "feedback") {
    return (
      <div className="w-full mt-6 bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between" id="chart-feedback-frame">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
            Customer NPS & Support Latency Timeline
          </span>
          <span className="text-[9px] font-mono text-gray-500">
            Unit: NPS Score Pt (Area) & Delay Min (Line)
          </span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="nps" name="NPS Index (+Pt)" stroke="#10B981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorNps)" />
              <Line type="monotone" dataKey="delay" name="Response Delay (Min)" stroke="#EF4444" strokeWidth={1.5} dot={{ r: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between" id="chart-collaboration-frame">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-mono tracking-widest text-[#FFB067] uppercase font-bold">
          Regional Efficiency Target Compliance
        </span>
        <span className="text-[9px] font-mono text-gray-500">
          Unit: Department Score % vs Logistical Target %
        </span>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" name="Efficiency Score (%)" fill="#FFB067" radius={[3, 3, 0, 0]} barSize={12} />
            <Bar dataKey="target" name="Logistical Target (%)" fill="#38BDF8" radius={[3, 3, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof DECATHLON_TABS>("behavior");

  const activeData = DECATHLON_TABS[activeTab];

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case "Users":
        return <Users className="w-5 h-5 text-[#FF8A3D]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-sky-400" />;
      case "MessageSquare":
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-[#FFB067]" />;
      default:
        return <Users className="w-5 h-5 text-[#FF8A3D]" />;
    }
  };

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
      id="projects-section"
    >
      <div className="absolute inset-0 bg-radial-gradient from-[#ff8a3d]/5 to-transparent pointer-events-none z-0 filter blur-3xl opacity-50" />

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-16 md:mb-24 flex flex-col items-start text-left z-10"
        id="projects-header-text"
      >
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF8A3D] uppercase mb-2">
          [ 03 // LIVE CASES ]
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
          Retail Merchandising & <span className="text-[#FF8A3D] text-glow-orange">Live Project</span>
        </h2>
        <p className="text-xs font-mono text-gray-400 mt-2 tracking-wide block max-w-lg">
          Live Project (01 Sep, 2024 - 06 Sep, 2024) | Mentor: Faiz Salman Mitha | Team Size: 15. Consultative selling, customer engagement, and BI retail analytics simulator.
        </p>
        <div className="h-1 w-20 bg-[#FF8A3D] mt-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10"
        id="interactive-dashboard-frame"
      >
        {/* Left Side: Interactive Nav Tabs */}
        <div className="lg:col-span-4 flex flex-col space-y-3 w-full" id="dashboard-tab-menu">
          <TiltCard variants={itemVariants} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4 text-left cursor-pointer hover:border-[#FF8A3D]/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono tracking-widest text-[#FFB067] uppercase font-bold block">
                Live Retail Project
              </span>
              <span className="text-[9px] font-mono text-gray-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                Team Size: 15
              </span>
            </div>
            <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
              DECATHLON RETAIL CASE
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Mentor: <span className="text-white font-medium">Faiz Salman Mitha</span>. Engaged with customers to understand buying behavior, assisted in product recommendations, and optimized store merchandising.
            </p>
            <div className="flex flex-wrap gap-1 mt-2.5">
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#FFB067]">Consultative Selling</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-sky-400">Customer Engagement</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-emerald-400">Merchandising</span>
            </div>
          </TiltCard>

          {(Object.keys(DECATHLON_TABS) as Array<keyof typeof DECATHLON_TABS>).map((key) => {
            const isSelected = activeTab === key;
            const tab = DECATHLON_TABS[key];
            return (
              <motion.button
                variants={itemVariants}
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative p-4 rounded-xl text-left border transition-all flex items-center gap-3.5 group cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-white/[0.04] to-transparent border-[#FF8A3D]/40 shadow-lg text-white"
                    : "bg-transparent border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/[0.01]"
                }`}
                id={`tab-btn-${key}`}
              >
                {/* Active slider bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-3 bottom-3 w-[3px] bg-[#FF8A3D] rounded-r"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div
                  className={`p-2.5 rounded-lg transition-transform group-hover:scale-105 ${
                    isSelected ? "bg-[#FF8A3D]/10" : "bg-white/[0.03]"
                  }`}
                >
                  {getIcon(tab.iconName)}
                </div>

                <div className="min-w-0 pr-2">
                  <span className="block text-xs font-mono font-semibold tracking-wider uppercase group-hover:text-white transition-colors">
                    {tab.title}
                  </span>
                  <span className="block text-[10px] text-gray-400 truncate mt-0.5 font-sans">
                    {tab.subtitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Side: Render Dashboard Data Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-8 w-full" id="dashboard-content-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-8 rounded-2xl bg-[#0B0B0B] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative top grid bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8A3D] via-[#FFB067] to-[#4da3ff]" />

              {/* Simulated UI Window Bar */}
              <div className="flex justify-between items-center pb-6 border-b border-white/5 text-xs text-gray-400 font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                  <span className="text-[10px] uppercase text-gray-500 tracking-widest pl-2">VIRTUAL BI STREAM</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <Globe className="w-3.5 h-3.5 text-[#FFB067] animate-spin" style={{ animationDuration: "12s" }} />
                  <span>METRIC LATENCY: OPTIMAL</span>
                </div>
              </div>

              {/* Title Section */}
              <div className="py-6 text-left space-y-1">
                <span className="text-[10px] font-mono text-[#FF8A3D] font-bold tracking-widest uppercase">
                  ACTIVE LOG ANALYSIS
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-wide">
                  {activeData.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  {activeData.subtitle}
                </p>
              </div>

              {/* KPI Scorecard Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-white/5" id="dashboard-scorecard">
                {activeData.metrics.map((metric, mIdx) => (
                  <TiltCard
                    key={mIdx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#FF8A3D]/25 transition-all text-left space-y-1 relative group cursor-pointer"
                  >
                    <span className="text-[10px] font-mono tracking-widest text-[#B3B3B3] uppercase">
                       {metric.label}
                    </span>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl md:text-3xl font-display font-medium text-white group-hover:text-[#FF8A3D] transition-colors leading-none pt-1">
                        {metric.value}
                      </span>
                      {metric.trend && (
                        <span
                          className={`text-[9px] font-mono flex items-center gap-0.5 py-0.5 px-1.5 rounded-full leading-none ${
                            metric.trend === "up"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {metric.trend === "up" ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span>{metric.trend === "up" ? "RAISE" : "DROP"}</span>
                        </span>
                      )}
                    </div>
                    <span className="block text-[9px] font-mono text-gray-400 truncate">
                      {metric.description}
                    </span>
                  </TiltCard>
                ))}
              </div>

              {/* Dynamic Interactive Recharts Visualizations */}
              <ProjectAnalyticsChart activeTab={activeTab} />

              {/* Insights and Strategic Recommendations */}
              <div className="pt-6 text-left space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-white uppercase text-glow-orange">
                  <Sparkles className="w-4 h-4 text-[#FFB067]" />
                  <span>Strategic Insights & Findings</span>
                </div>

                <div className="space-y-3">
                  {activeData.insights.map((insight, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors text-xs text-gray-300 leading-relaxed font-sans"
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
