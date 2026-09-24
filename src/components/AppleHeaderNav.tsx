/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export default function AppleHeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section highlight calculation
      const sections = ["about-section", "experience-section", "projects-section", "skills-section", "credentials-section", "contact-section"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Profile", href: "#about-section", id: "about-section" },
    { label: "Journey", href: "#experience-section", id: "experience-section" },
    { label: "Decathlon BI", href: "#projects-section", id: "projects-section" },
    { label: "Skills", href: "#skills-section", id: "skills-section" },
    { label: "Credentials", href: "#credentials-section", id: "credentials-section" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#000000]/80 backdrop-blur-xl border-b border-white/[0.08] py-2.5 shadow-2xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand / Name Emblem */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF8A3D] to-[#FFB067] flex items-center justify-center text-[#050505] font-mono font-bold text-xs shadow-md shadow-[#FF8A3D]/20 group-hover:scale-105 transition-transform">
            SM
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white group-hover:text-[#FFB067] text-xs font-sans tracking-tight font-semibold transition-colors">
              Sachin Mahato
            </span>
            <span className="text-[9px] font-mono text-[#86868b] tracking-wider uppercase leading-none hidden sm:inline">
              M.B.A. - Marketing Management
            </span>
          </div>
        </a>

        {/* Center Nav Links - Apple Style */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md px-3 py-1 rounded-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white font-medium shadow-sm"
                    : "text-[#86868b] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contact CTA Pill */}
          <a
            href="#contact-section"
            className="flex items-center gap-1 bg-white text-[#050505] hover:bg-[#F5F5F7] px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium tracking-tight transition-all duration-200 hover:scale-[1.02] shadow-md cursor-pointer"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3 text-[#050505]" />
          </a>
        </div>
      </div>
    </header>
  );
}
