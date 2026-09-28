/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { User, GraduationCap, Compass, Briefcase, Award, Languages, Heart, MapPin, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };

  const facts = [
    {
      icon: <Compass className="w-5 h-5 text-[#FF8A3D]" />,
      title: "CRM & Consultative Selling",
      description: "Strong communication, relationship-building, and consultative selling skills developed through internships and live retail projects."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-sky-400" />,
      title: "Market Research & Client Engagement",
      description: "Skilled at understanding customer needs, providing solutions, conducting follow-ups, and contributing to business growth."
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      title: "Certified Agile & AI Proficiency",
      description: "Certified in Microsoft Project Management (Coursera) and generative AI workflows (Be10x & Microsoft/LinkedIn)."
    }
  ];

  const educationMilestones = [
    {
      institution: "MIT College of Management Pune",
      degree: "M.B.A. - Marketing Management",
      period: "2024 - 2026",
      score: "CGPA: 7.01 / 10",
      status: "Pursuing",
      badgeColor: "text-[#FF8A3D] border-[#FF8A3D]/30 bg-[#FF8A3D]/10"
    },
    {
      institution: "Xavier Institute of Tribal Education",
      degree: "B.B.A. - Human Resource Management (Full Time)",
      period: "2021 - 2024",
      score: "Percentage: 75 / 100",
      status: "Completed",
      badgeColor: "text-sky-400 border-sky-400/30 bg-sky-400/10"
    },
    {
      institution: "St. Mary's English High School, Jamshedpur",
      degree: "Higher Secondary (12th) & Secondary (10th) | CBSE",
      period: "Class of 2021 & 2019",
      score: "12th: 65% | 10th: 58%",
      status: "Completed",
      badgeColor: "text-purple-400 border-purple-400/30 bg-purple-400/10"
    }
  ];

  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32 border-t border-white/5 bg-transparent"
      id="about-section"
    >
      {/* Sub-header title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative mb-16 md:mb-24 flex flex-col items-start text-left z-10"
        id="about-header-text"
      >
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF8A3D] uppercase mb-2">
          [ 02 // EXECUTIVE PROFILE ]
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
          Professional <span className="text-[#FF8A3D] text-glow-orange">Summary</span>
        </h2>
        <div className="h-1 w-20 bg-[#FF8A3D] mt-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start z-10"
        id="about-grid-box"
      >
        {/* Left column: Professional Bio & Education Journey */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 flex flex-col space-y-6 text-left"
          id="about-left-bio"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#FFB067]">
            <User className="w-4 h-4" />
            <span>SACHIN MAHATO • RESUME OVERVIEW</span>
          </div>

          <p className="text-lg md:text-xl font-light text-white leading-relaxed font-sans">
            "MBA (Marketing) student with experience in market research, customer engagement, CRM, and sales support. Strong communication, relationship-building, and consultative selling skills developed through internships and live projects."
          </p>

          <p className="text-base text-[#B3B3B3] leading-relaxed font-sans">
            Skilled at understanding customer needs, providing solutions, conducting follow-ups, and contributing to business growth. Seeking opportunities in <span className="text-white font-medium">Sales</span>, <span className="text-white font-medium">Business Development</span>, and <span className="text-white font-medium">Customer Success</span> roles.
          </p>

          {/* Academic Journey Timeline Cards */}
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-widest text-gray-400 uppercase flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF8A3D]" />
              Education History
            </h4>

            <div className="space-y-3">
              {educationMilestones.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-left"
                >
                  <div>
                    <span className="text-sm font-sans font-bold text-white block">
                      {item.institution}
                    </span>
                    <span className="text-xs text-gray-400 block">
                      {item.degree}
                    </span>
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1">
                    <span className="text-xs font-mono font-semibold text-white">
                      {item.score}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column: Highlights, Key Strengths, Personal Details */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col space-y-6"
          id="about-right-values"
        >
          {facts.map((fact, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all flex items-start gap-4 text-left group"
            >
              <div className="p-3 bg-white/[0.04] rounded-xl group-hover:scale-110 transition-transform">
                {fact.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-mono font-semibold text-white tracking-widest uppercase">
                  {fact.title}
                </h4>
                <p className="text-xs text-[#B3B3B3] leading-relaxed">
                  {fact.description}
                </p>
              </div>
            </div>
          ))}

          {/* Personal Details & Languages Dossier */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FF8A3D]/10 to-transparent border border-[#FF8A3D]/20 text-left space-y-4">
            <h4 className="text-xs font-mono font-semibold tracking-widest text-[#FFB067] uppercase flex items-center justify-between">
              <span>Personal Dossier</span>
              <span className="text-[10px] text-gray-400 font-mono">DOB: 29 Nov, 2002</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-gray-400 text-[10px] font-mono uppercase flex items-center gap-1">
                  <Languages className="w-3 h-3 text-sky-400" /> Known Languages
                </span>
                <span className="text-white font-medium block">English • Hindi • Bengali</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 text-[10px] font-mono uppercase flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#FF8A3D]" /> Interests & Hobbies
                </span>
                <span className="text-white font-medium block">Tech & Gadgets • Exploring • Learning</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 text-[10px] font-mono uppercase block">Address / Location</span>
                <span className="text-white font-medium">Dhannigora Rugri, Jamshedpur, Jharkhand, India - 831012</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
