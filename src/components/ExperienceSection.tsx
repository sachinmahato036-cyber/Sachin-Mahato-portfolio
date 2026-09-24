/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Briefcase, CheckCircle, Milestone, ChevronLeft, ChevronRight, GraduationCap, Users } from "lucide-react";

interface MilestoneItem {
  duration: string;
  role: string;
  company: string;
  sector?: string;
  details: string[];
  skills: string[];
  color: string;
  icon: string;
  highlight?: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    duration: "08 Jun, 2025 - 08 Aug, 2025",
    role: "Marketing Internship",
    company: "Satpura Agro Tech",
    sector: "Agriculture / Dairy / Forestry / Fishing",
    details: [
      "Conducted market research and interacted with customers to understand their requirements and preferences.",
      "Supported sales activities, maintained customer records through CRM tools, and assisted in relationship management.",
      "Collaborated with teams to identify business opportunities and contributed to customer acquisition and retention efforts."
    ],
    skills: ["Customer Relationship Management", "Sales Support", "Client Interaction", "Market Research", "Business Communication"],
    color: "#FF8A3D", // Orange focus
    icon: "Briefcase",
    highlight: "Primary Marketing & CRM Internship"
  },
  {
    duration: "01 Sep, 2024 - 06 Sep, 2024",
    role: "Live Retail Project",
    company: "Decathlon Live Case Study",
    sector: "Retail & Customer Experience (Team Size: 15)",
    details: [
      "Mentored by Faiz Salman Mitha within a high-tempo 15-member store engagement squad.",
      "Engaged directly with customers to understand buying behavior and product preferences.",
      "Assisted in product recommendations, merchandising activities, and customer feedback collection.",
      "Worked closely with store teams to improve customer experience and support sales objectives."
    ],
    skills: ["Customer Engagement", "Consultative Selling", "Communication", "Merchandising", "Team Collaboration"],
    color: "#38BDF8", // Cyan / Azure
    icon: "Users",
    highlight: "Mentor: Faiz Salman Mitha"
  },
  {
    duration: "2024 - 2026",
    role: "M.B.A. - Marketing Management",
    company: "MIT College of Management Pune",
    sector: "Postgraduate Degree (CGPA: 7.01 / 10)",
    details: [
      "Pursuing M.B.A. in Marketing Management with a solid 7.01/10 CGPA.",
      "Developing advanced skills in consultative selling, market research, CRM pipelines, and customer journey optimization.",
      "Active participant in management innovation workshops and industry conferences."
    ],
    skills: ["Marketing Management", "Consultative Selling", "CRM Systems", "Market Research"],
    color: "#C084FC", // Purple accent
    icon: "GraduationCap",
    highlight: "CGPA: 7.01 / 10"
  },
  {
    duration: "01 Jul, 2023 - 14 Aug, 2023",
    role: "HR Intern",
    company: "Harelal Construction Company Pvt Ltd",
    sector: "Construction & Engineering",
    details: [
      "Supported HR operations by assisting in recruitment, employee onboarding, attendance management, and workforce coordination.",
      "Developed strong communication, organizational, and employee management skills through practical experience in the construction sector.",
      "Coordinated daily staff attendance records and facilitated operational documentation."
    ],
    skills: ["Communication & Workforce Coordination", "Recruitment & Employee Management", "HR Operations", "Talent Acquisition"],
    color: "#4DA3FF", // Blue
    icon: "Briefcase",
    highlight: "Workforce & Talent Operations"
  },
  {
    duration: "2021 - 2024",
    role: "B.B.A. - Human Resource Management (Full Time)",
    company: "Xavier Institute of Tribal Education (XITE)",
    sector: "Undergraduate Degree (Score: 75 / 100)",
    details: [
      "Graduated with Distinction (75%) specializing in Human Resource Management.",
      "Participated in and helped coordinate ICSSR-ERC sponsored national conferences and academic symposiums.",
      "Demonstrated excellence in organizational behavior, business communication, and cross-functional team leadership."
    ],
    skills: ["HR Management", "National Conferences", "Team Leadership", "Business Communication"],
    color: "#34D399", // Emerald
    icon: "GraduationCap",
    highlight: "Percentage: 75%"
  },
  {
    duration: "2019 - 2021",
    role: "Higher Secondary (12th) & Secondary (10th)",
    company: "St. Mary's English High School, Jamshedpur",
    sector: "CBSE Board (12th: 65% | 10th: 58%)",
    details: [
      "Completed 12th CBSE in 2021 (65%) and 10th CBSE in 2019 (58%).",
      "Built rigorous foundation in English communication, mathematics, and business economics in Jamshedpur, Jharkhand."
    ],
    skills: ["CBSE Board", "Communication", "Analytical Foundation"],
    color: "#A78BFA", // Violet
    icon: "GraduationCap",
    highlight: "Jamshedpur High School"
  }
];

export default function ExperienceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Track horizontal scrolling progress
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  // Create smooth spring timeline loader
  const timelineProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  const scrollTimeline = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const getIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-4 h-4" style={{ color }} />;
      case "GraduationCap":
        return <GraduationCap className="w-4 h-4" style={{ color }} />;
      case "Users":
        return <Users className="w-4 h-4" style={{ color }} />;
      default:
        return <Milestone className="w-4 h-4" style={{ color }} />;
    }
  };

  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32 border-t border-white/5 bg-transparent overflow-hidden"
      id="experience-section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-radial-gradient from-[#4da3ff]/5 to-transparent pointer-events-none z-0 filter blur-3xl opacity-40" />

      {/* Header text */}
      <div className="relative mb-8 md:mb-12 flex flex-col items-start text-left z-10" id="experience-header-text">
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#4DA3FF] uppercase mb-2">
          [ 02 // TIMELINE ]
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
          Experience & <span className="text-[#4DA3FF] text-glow-blue">Education</span>
        </h2>
        <p className="text-xs font-mono text-gray-400 mt-2 tracking-wide block max-w-lg">
          Chronological roadmap of corporate internships, live retail engagements, and academic milestones from Sachin Mahato's verified resume.
        </p>
        <div className="h-1 w-20 bg-[#4DA3FF] mt-4 rounded-full" />
      </div>

      {/* Controller Buttons & Indicator */}
      <div className="relative flex justify-between items-center mb-6 z-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-[#4DA3FF] font-semibold bg-[#4DA3FF]/10 py-1.5 px-3 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] animate-pulse" />
            <span>INTERNSHIPS & DEGREES</span>
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scrollTimeline("left")}
            className="p-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] text-white transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTimeline("right")}
            className="p-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] text-white transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spring Timeline Progress Line */}
      <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#4DA3FF] via-[#FF8A3D] to-[#34D399]"
          style={{ scaleX: timelineProgress, transformOrigin: "left" }}
        />
      </div>

      {/* Horizontal Scrollable Road Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-none z-10 relative cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {MILESTONES.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="flex-shrink-0 w-[330px] sm:w-[380px] snap-center"
          >
            <div className="h-full p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-all flex flex-col justify-between space-y-4 text-left group">
              {/* Card Top Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-gray-400">
                    {item.duration}
                  </span>
                  {item.highlight && (
                    <span
                      className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: `${item.color}40`,
                        backgroundColor: `${item.color}15`,
                        color: item.color
                      }}
                    >
                      {item.highlight}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div
                    className="p-2.5 rounded-xl border flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    style={{
                      borderColor: `${item.color}40`,
                      backgroundColor: `${item.color}10`
                    }}
                  >
                    {getIcon(item.icon, item.color)}
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-white tracking-wide">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono font-medium text-gray-300">
                      {item.company}
                    </p>
                    {item.sector && (
                      <p className="text-[10px] font-mono text-gray-500">
                        {item.sector}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-xs text-[#B3B3B3] leading-relaxed">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-500 group-hover:text-white transition-colors" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Skill Tags */}
              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {item.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-gray-400 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
