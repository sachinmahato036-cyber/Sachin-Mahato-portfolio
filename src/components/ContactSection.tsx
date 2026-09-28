/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, Linkedin, MapPin, Briefcase, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    roleType: "analytics",
    message: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const widgetsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const widgetItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleDownloadResume = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = [255, 138, 61]; // #FF8A3D (Orange brand)

    // Helper to draw clean sections
    const drawSectionHeader = (title: string, yPos: number) => {
      doc.setFillColor(245, 246, 248);
      doc.rect(15, yPos, 180, 7, "F");
      
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, yPos, 3, 7, "F");
      
      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(title.toUpperCase(), 22, yPos + 5);
      return yPos + 12;
    };

    let y = 14;
    
    // --- Page 1 ---
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 30, 30);
    doc.text("SACHIN MAHATO", 15, y);
    
    y += 5.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("M.B.A. - Marketing Management", 15, y);
    
    y += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("sachinmahato036@gmail.com  |  +91 7488005740  |  Jamshedpur, Jharkhand, India - 831012", 15, y);
    
    y += 4;
    doc.text("LinkedIn: https://www.linkedin.com/in/sachin-mahato-15b215212", 15, y);
    
    y += 4.5;
    doc.setDrawColor(220, 224, 230);
    doc.setLineWidth(0.4);
    doc.line(15, y, 195, y);
    
    y += 6;
    y = drawSectionHeader("Professional Summary", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const summary = "MBA (Marketing) student with experience in market research, customer engagement, CRM, and sales support. Strong communication, relationship-building, and consultative selling skills developed through internships and live projects. Skilled at understanding customer needs, providing solutions, conducting follow-ups, and contributing to business growth. Seeking opportunities in Sales, Business Development, and Customer Success roles.";
    const splitSummary = doc.splitTextToSize(summary, 180);
    doc.text(splitSummary, 15, y);
    y += splitSummary.length * 4 + 4;

    // Key Expertise
    y = drawSectionHeader("Key Expertise", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(50, 50, 50);
    
    const col1 = [
      "* customer relationship management",
      "* consultative selling",
      "* client engagement and relationship building"
    ];
    const col2 = [
      "* Communication presentation skills",
      "* market research & customer analysis",
      "* sales support & customer acquisition"
    ];
    
    col1.forEach((skill, idx) => {
      doc.text(skill, 18, y + (idx * 4.5));
    });
    col2.forEach((skill, idx) => {
      doc.text(skill, 110, y + (idx * 4.5));
    });
    
    y += (col1.length * 4.5) + 5;

    // Academic Education Section
    y = drawSectionHeader("Education", y);
    
    const edu = [
      {
        school: "MIT College of Management Pune",
        degree: "M.B.A. - Marketing Management",
        dur: "2024 - 2026",
        score: "CGPA: 7.01 / 10"
      },
      {
        school: "Xavier institute of Tribal education",
        degree: "B.B.A. - Human Resource Management (Full Time)",
        dur: "2021 - 2024",
        score: "Percentage : 75 / 100"
      },
      {
        school: "st Mary's English high school, Jamshedpur",
        degree: "Higher Secondary (12th) | CBSE Board",
        dur: "2021",
        score: "Percentage: 65 / 100"
      },
      {
        school: "st Mary's English high school, Jamshedpur",
        degree: "Matriculation (10th) | CBSE Board",
        dur: "2019",
        score: "Percentage: 58 / 100"
      }
    ];

    edu.forEach((school) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      doc.text(school.school, 15, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(110, 110, 110);
      doc.text(school.dur, 195 - doc.getTextWidth(school.dur), y);
      
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      doc.text(school.degree, 15, y);
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(school.score, 195 - doc.getTextWidth(school.score), y);
      
      y += 6.5;
    });

    // Page 1 Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Candidate Dossier  |  Sachin Mahato Resume", 15, 285);
    doc.text("Page 1 of 2", 195 - doc.getTextWidth("Page 1 of 2"), 285);

    // --- Page 2 ---
    doc.addPage();
    y = 14;
    
    // Header for Page 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("SACHIN MAHATO  |  RESUME DOSSIER", 15, y);
    y += 2;
    doc.setDrawColor(220, 224, 230);
    doc.line(15, y, 195, y);
    y += 6;

    // Internships (Satpura & Harelal)
    y = drawSectionHeader("Professional Internships", y);
    
    const internships = [
      {
        company: "SATPURA AGRO TECH  |  Agriculture / Dairy / Forestry / Fishing",
        role: "Marketing Internship",
        dur: "08 Jun, 2025 - 08 Aug, 2025",
        skills: "customer relationship management, Sales support, client interaction, market research, Business communication",
        desc: "Conducted market research and interacted with customers to understand their requirements and preferences. Supported sales activities, maintained customer records through CRM tools, and assisted in relationship management. Collaborated with teams to identify business opportunities and contributed to customer acquisition and retention efforts."
      },
      {
        company: "harelal construction company pvt ltd  |  Construction & Engineering",
        role: "HR Intern",
        dur: "01 Jul, 2023 - 14 Aug, 2023",
        skills: "Communication & Workforce Coordination, Recruitment & Employee Management, HR Operations & Documentation, Recruitment & Talent Acquisition",
        desc: "Supported HR operations by assisting in recruitment, employee onboarding, attendance management, and workforce coordination. Developed strong communication, organizational, and employee management skills through practical experience in the construction sector."
      }
    ];

    internships.forEach((job) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      doc.text(job.company, 15, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(job.dur, 195 - doc.getTextWidth(job.dur), y);
      
      y += 3.8;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(job.role, 15, y);
      
      y += 3.5;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(90, 90, 90);
      doc.text(`Key Skills: ${job.skills}`, 15, y);
      
      y += 3.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      const splitText = doc.splitTextToSize(job.desc, 180);
      doc.text(splitText, 15, y);
      y += splitText.length * 3.6 + 4.5;
    });

    // Projects Section
    y = drawSectionHeader("Projects", y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    doc.text("LIVE PROJECT  |  Retail Customer Experience & Merchandising", 15, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const liveDur = "01 Sep, 2024 - 06 Sep, 2024";
    doc.text(liveDur, 195 - doc.getTextWidth(liveDur), y);
    
    y += 3.8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Mentor: Faiz Salman Mitha  |  Team Size: 15", 15, y);
    
    y += 3.5;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(90, 90, 90);
    doc.text("Key Skills: customer engagement, consultative selling, Communication, merchandising, team collaboration", 15, y);
    
    y += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);
    const liveDesc = "Engaged with customers to understand buying behavior and product preferences. Assisted in product recommendations, merchandising activities, and customer feedback collection. Worked closely with store teams to improve customer experience and support sales objectives.";
    const splitLive = doc.splitTextToSize(liveDesc, 180);
    doc.text(splitLive, 15, y);
    y += splitLive.length * 3.6 + 4.5;

    // Assessments / Certifications & Seminars
    y = drawSectionHeader("Certifications & Seminars", y);
    
    const certs = [
      { title: "Microsoft project management build Job-ready skills", org: "Coursera in collab with Microsoft" },
      { title: "Career Essentials in Generative AI", org: "Microsoft and LinkedIn Learning" },
      { title: "AI tools and ChatGPT workshop", org: "Be10x Certification" },
      { title: "ICSSR-ERC SPONSORED NATIONAL CONFERENCE", org: "XITE College, Gamharia" },
      { title: "Workshop on Innovation In Management (06-08 Feb 2025)", org: "MIT Art, Design and Technology, Pune" }
    ];

    certs.forEach((cert) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(40, 40, 40);
      
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, y - 2, 1.5, 1.5, "F");
      
      doc.text(cert.title, 19, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(110, 110, 110);
      doc.text(`• ${cert.org}`, 195 - doc.getTextWidth(`• ${cert.org}`), y);
      y += 4;
    });

    // Personal Details
    y += 1;
    y = drawSectionHeader("Personal Details", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(60, 60, 60);
    doc.text("Gender: Male  |  DOB: 29 Nov, 2002  |  Languages: English, Hindi, Bengali  |  Phone: +91-7488005740", 15, y);
    y += 3.6;
    doc.text("Current Address: dhannigora rugri jamshedpur, Jamshedpur, Jharkhand, India - 831012", 15, y);
    y += 3.6;
    doc.text("Hobbies & Interests: Exploring new places, Tech & gadgets, Learning new skills", 15, y);

    // Page 2 Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text("Sachin Mahato  |  M.B.A. Marketing Management Resume", 15, 287);
    doc.text("Page 2 of 2", 195 - doc.getTextWidth("Page 2 of 2"), 287);

    doc.save("Sachin_Mahato_Resume.pdf");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    // Simulate premium API round-trip latency
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      // Reset after brief period
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", org: "", roleType: "analytics", message: "" });
      }, 5000);
    }, 1200);
  };

  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32 border-t border-white/5 bg-transparent"
      id="contact-section"
    >
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-16 md:mb-24 flex flex-col items-start text-left z-10"
        id="contact-header-text"
      >
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF8A3D] uppercase mb-2">
          [ 07 // CONNECT ]
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
          Initiate <span className="text-[#FF8A3D] text-glow-orange">Contact</span>
        </h2>
        <div className="h-1 w-20 bg-[#FF8A3D] mt-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start z-10"
        id="contact-grid-frame"
      >
        {/* Left Col: Contact specifications and cards */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col space-y-6 text-left" id="contact-left-details">
          <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-wide">
            Looking for high-impact sales & business development roles.
          </h3>
          <p className="text-sm text-[#B3B3B3] leading-relaxed font-sans">
            I am actively seeking roles in <strong className="text-white">Sales, Business Development, Solutions Consulting, and Customer Success</strong>. If your organization values proactive customer discovery, consultative selling, and disciplined pipeline execution, let's connect!
          </p>

          <motion.div
            variants={widgetsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 pt-4"
            id="contact-info-widgets"
          >
            {/* Direct Email Link Widget */}
            <motion.a
              variants={widgetItemVariants}
              href="mailto:sachinmahato036@gmail.com"
              className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#FF8A3D]/30 hover:bg-white/[0.03] transition-all flex items-center gap-4 group"
            >
              <div className="p-3 bg-white/[0.03] rounded-lg group-hover:bg-[#FF8A3D]/10 group-hover:scale-105 transition-all">
                <Mail className="w-5 h-5 text-[#FF8A3D]" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#B3B3B3] uppercase">
                  DIRECT EMAIL DIRECTORY
                </span>
                <span className="block text-sm font-mono text-white font-medium group-hover:text-[#FFB067] transition-colors">
                  sachinmahato036@gmail.com
                </span>
              </div>
            </motion.a>

            {/* Direct Phone Widget */}
            <motion.a
              variants={widgetItemVariants}
              href="tel:+917488005740"
              className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-emerald-400/30 hover:bg-white/[0.03] transition-all flex items-center gap-4 group"
            >
              <div className="p-3 bg-white/[0.03] rounded-lg group-hover:bg-emerald-400/10 group-hover:scale-105 transition-all">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#B3B3B3] uppercase">
                  CONTACT NUMBER
                </span>
                <span className="block text-sm font-mono text-white font-medium group-hover:text-emerald-300 transition-colors">
                  +91 7488005740
                </span>
              </div>
            </motion.a>

            {/* Geographical marker */}
            <motion.div
              variants={widgetItemVariants}
              className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-4"
            >
              <div className="p-3 bg-white/[0.03] rounded-lg">
                <MapPin className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#B3B3B3] uppercase">
                  CURRENT LOCATION & RESIDENCE
                </span>
                <span className="block text-sm text-white font-medium">
                  Dhannigora Rugri, Jamshedpur, Jharkhand, India - 831012
                </span>
              </div>
            </motion.div>

            {/* Opportunities sought */}
            <motion.div
              variants={widgetItemVariants}
              className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-4"
            >
              <div className="p-3 bg-white/[0.03] rounded-lg">
                <Briefcase className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#B3B3B3] uppercase">
                  SOUGHT OPPORTUNITIES
                </span>
                <span className="block text-sm text-white font-medium">
                  Sales • Business Development • Customer Success • CRM Management
                </span>
              </div>
            </motion.div>

            {/* Premium Glassmorphic 'Download Resume' Floating Card */}
            <motion.div variants={widgetItemVariants} className="pt-2">
              <button
                onClick={handleDownloadResume}
                className="w-full p-4.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#FF8A3D]/40 hover:bg-[#FF8A3D]/5 hover:shadow-[0_0_25px_rgba(255,138,61,0.15)] transition-all duration-300 flex items-center justify-between group cursor-pointer active:scale-[0.98] relative overflow-hidden"
                id="download-resume-glass-btn"
              >
                {/* Visual Glass Shimmer Pulse Grid */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-shimmer" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-white/[0.03] rounded-lg group-hover:bg-[#FF8A3D]/10 text-[#FF8A3D] group-hover:scale-105 transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] font-mono tracking-[0.15em] text-[#FFB067] uppercase font-bold">
                      ACADEMIC DOSSIER
                    </span>
                    <span className="block text-sm font-sans font-bold text-white tracking-wide group-hover:text-[#FF8A3D] transition-colors">
                      Download Resume / CV
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/[0.05] rounded-full group-hover:bg-[#FF8A3D]/20 transition-all text-gray-400 group-hover:text-white mr-2 relative z-10">
                  <Download className="w-4 h-4 animate-bounce" style={{ animationDuration: '2.5s' }} />
                </div>
              </button>
            </motion.div>

            {/* Social Profile connections - Staggered Social Icons */}
            <motion.div variants={widgetItemVariants} className="pt-4 border-t border-white/5">
              <span className="block text-[9px] font-mono tracking-widest text-[#FF8A3D] uppercase mb-3 font-semibold">
                [ 06-A // SOCIAL DIRECTORIES ]
              </span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/sachin-mahato-15b215212"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-[#0B0B0B] border border-white/10 hover:border-[#FF8A3D]/50 hover:bg-[#FF8A3D]/10 hover:text-[#FFB067] text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-3.5 group cursor-pointer w-1/2"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-[#FF8A3D] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono font-medium tracking-wider">LinkedIn Profile</span>
                </a>
                <a
                  href="mailto:sachinmahato036@gmail.com"
                  className="px-5 py-3 bg-[#0B0B0B] border border-white/10 hover:border-[#4DA3FF]/50 hover:bg-[#4DA3FF]/10 text-white hover:text-sky-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-3.5 group cursor-pointer w-1/2"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4 text-[#4DA3FF] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono font-medium tracking-wider">Email Inbox</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Col: Interactive Simulated Email Form */}
        <motion.div variants={itemVariants} className="lg:col-span-7 w-full text-left" id="contact-form-card">
          <div className="p-6 md:p-8 rounded-2xl bg-[#0B0B0B] border border-white/10 shadow-2.5xl relative overflow-hidden">
            {/* Mini visual border accents */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8A3D] to-transparent" />

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="form-fields"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                      Your Name
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Director of Analytics"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3 bg-[#050505] border border-white/5 focus:border-[#FF8A3D]/40 outline-none rounded-xl text-xs text-white placeholder-gray-600 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                        Your Professional Email Address
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="e.g. manager@corporation.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="p-3 bg-[#050505] border border-white/5 focus:border-[#FF8A3D]/40 outline-none rounded-xl text-xs text-white placeholder-gray-600 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                        Organization / Brand Name
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. Decathlon Retail, Satpura Tech"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="p-3 bg-[#050505] border border-white/5 focus:border-[#FF8A3D]/40 outline-none rounded-xl text-xs text-white placeholder-gray-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                      Proposed Role Division
                    </span>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="p-3 bg-[#050505] border border-white/5 focus:border-[#FF8A3D]/40 outline-none rounded-xl text-xs text-white transition-colors"
                    >
                      <option value="analytics">Business Analytics & Dashboards</option>
                      <option value="market-research">Market Research & Competitors</option>
                      <option value="crm">CRM Dynamics & Sales Strategy</option>
                      <option value="other">Other Operations / Discussion</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
                      Brief Message or Scope Proposal
                    </span>
                    <textarea
                      rows={4}
                      placeholder="Discuss hiring terms, regional projects, or diagnostic analytics inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="p-3 bg-[#050505] border border-white/5 focus:border-[#FF8A3D]/40 outline-none rounded-xl text-xs text-white placeholder-gray-600 resize-none transition-colors"
                    />
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#FF8A3D] text-[#050505] hover:bg-[#FFB067] font-semibold text-xs font-mono tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A3D]/10 cursor-pointer active:scale-[0.98]"
                    id="contact-submit-btn"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-[#050505] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>TRANSMIT PROPOSAL</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
                      Proposal Transmitted
                    </h3>
                    <p className="text-xs text-[#B3B3B3] max-w-sm leading-relaxed">
                      Thank you for initiating communication! The simulated contact state has registered successfully. Sachin will coordinate as soon as possible.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono italic">
                    Form resets automatically in 5 seconds.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
