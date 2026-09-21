import { useState, useEffect, useRef } from "react";
import {
  Download,
  Menu,
  X,
  FileText,
  Palette,
  ChevronDown,
  Check,
  Eye,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

  const { theme, setTheme, themes } = useTheme();
  const themeDropdownRef = useRef(null);
  const resumeDropdownRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const handleResumeMouseEnter = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setResumeDropdownOpen(true);
  };

  const handleResumeMouseLeave = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setResumeDropdownOpen(false);
    }, 200);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  // Close theme & resume dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(e.target)
      ) {
        setThemeDropdownOpen(false);
      }
      if (
        resumeDropdownRef.current &&
        !resumeDropdownRef.current.contains(e.target)
      ) {
        setResumeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "experience",
        "education",
        "certifications",
        "contact",
      ];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentThemeObj =
    themes.find((t) => t.id === theme) || themes[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-nav)] backdrop-blur-2xl border-b border-[var(--border-subtle)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] py-3.5"
          : "bg-[var(--bg-nav)]/60 backdrop-blur-xl border-b border-[var(--border-subtle)]/40 py-4 sm:py-5 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Name: "Sanjai G" */}
          <a
            href="#hero"
            className="flex items-center group relative cursor-pointer"
            aria-label="Sanjai G - Back to top"
          >
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_var(--glow-color)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                Sanjai
              </span>{" "}
              <span className="text-white">G</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-cyan-400 bg-cyan-500/15 shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-cyan-500/30"
                      : "text-slate-300 hover:text-cyan-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Elements: Theme Switcher + Unified Resume Dropdown */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Switcher Dropdown */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="glass-btn flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white text-sm font-semibold cursor-pointer"
                title="Switch Theme"
                aria-label="Select theme"
              >
                <Palette className="w-4 h-4 text-cyan-400" />
                <span className="hidden md:inline">{currentThemeObj.shortName}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                    themeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="py-2 rounded-2xl bg-[var(--modal-bg)] backdrop-blur-2xl border border-[var(--border-subtle)] shadow-2xl">
                    <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 mb-1">
                      Select Theme
                    </div>
                    {themes.map((t) => {
                      const isSelected = t.id === theme;
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id);
                            setThemeDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-sm font-medium transition-colors text-left cursor-pointer ${
                            isSelected
                              ? "text-cyan-400 bg-cyan-500/10"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner"
                              style={{ backgroundColor: t.previewColor }}
                            />
                            <span>{t.name}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Unified RESUME Dropdown Container */}
            <div
              className="relative"
              ref={resumeDropdownRef}
              onMouseEnter={handleResumeMouseEnter}
              onMouseLeave={handleResumeMouseLeave}
            >
              <button
                onClick={() => setResumeDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 cursor-pointer tracking-wider"
                aria-expanded={resumeDropdownOpen}
                aria-haspopup="true"
                aria-label="Resume options menu"
              >
                <FileText className="w-4 h-4" />
                <span>RESUME</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${
                    resumeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Hover Dropdown Menu */}
              {resumeDropdownOpen && (
                <div
                  className="absolute right-0 top-full pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={handleResumeMouseEnter}
                  onMouseLeave={handleResumeMouseLeave}
                >
                  <div className="p-1.5 rounded-2xl bg-[var(--modal-bg)] backdrop-blur-2xl border border-[var(--border-subtle)] shadow-2xl shadow-cyan-950/40">
                    <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span>Resume Options</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    </div>

                    {/* Option 1: View Resume */}
                    <button
                      type="button"
                      onClick={() => {
                        setResumeDropdownOpen(false);
                        onOpenResume();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/15 transition-all duration-150 group/item cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover/item:bg-cyan-500/20 group-hover/item:scale-105 transition-all">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight">View Resume</span>
                        <span className="text-[11px] text-slate-400 leading-tight mt-0.5">Preview in modal</span>
                      </div>
                    </button>

                    {/* Option 2: Download Resume */}
                    <a
                      href="/resume.pdf"
                      download="Sanjai_G_Resume.pdf"
                      onClick={() => setResumeDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/15 transition-all duration-150 group/item cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500/20 group-hover/item:scale-105 transition-all">
                        <Download className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight">Download Resume</span>
                        <span className="text-[11px] text-slate-400 leading-tight mt-0.5">Save PDF copy</span>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle + Quick Buttons */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-xl sm:hidden cursor-pointer"
              aria-label="Quick View Resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden px-4 pt-3 pb-6 bg-[var(--modal-bg)] backdrop-blur-2xl border-b border-[var(--border-subtle)] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Theme Selector */}
            <div className="pt-3 border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-4 block mb-2">
                Themes
              </span>
              <div className="grid grid-cols-2 gap-2 px-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                      theme === t.id
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        : "bg-slate-900/70 text-slate-300 border-white/10"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: t.previewColor }}
                    />
                    <span className="truncate">{t.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Actions: View Resume & Download */}
            <div className="pt-3 border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-4 block mb-2">
                Resume Options
              </span>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-cyan-300 rounded-xl bg-cyan-950/60 border border-cyan-500/40 shadow-sm cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Resume</span>
                </button>

                <a
                  href="/resume.pdf"
                  download="Sanjai_G_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;