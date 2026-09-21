import { useState, useEffect, useRef } from "react";
import {
  Download,
  Menu,
  X,
  FileText,
  ChevronDown,
  Eye,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

  const { theme, setTheme, toggleTheme } = useTheme();
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

  // Close resume dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
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
      const navOffset = 180;
      let active = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navOffset && rect.bottom > 60) {
            active = section;
          }
        }
      }
      // If at the very bottom of the page, highlight contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        active = "contact";
      }
      if (active) setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full max-w-full overflow-x-clip z-40 transition-all duration-300 ${
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
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-main)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_var(--glow-color)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                Sanjai
              </span>{" "}
              <span>G</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--bg-chip)] border border-[var(--border-subtle)] backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[var(--accent-primary)] bg-[var(--accent-primary)]/15 shadow-[0_0_15px_var(--glow-color)] border border-[var(--accent-primary)]/30 font-bold"
                      : "text-[var(--text-sub)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-card-hover)] hover:shadow-[0_0_10px_var(--glow-color)]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Elements: Single Theme Switcher + Unified Resume Dropdown */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Single Theme Toggle Button - Explicitly mentioning Dark or Light */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-chip)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] text-[var(--text-main)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_var(--glow-color)] cursor-pointer text-xs font-semibold"
              title={theme === "dark" ? "Switch to Light theme" : "Switch to Dark theme"}
              aria-label={`Current theme: ${theme === "dark" ? "Dark" : "Light"}`}
            >
              {theme === "dark" ? (
                <>
                  <Moon className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold tracking-wide">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold tracking-wide">Light</span>
                </>
              )}
            </button>

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
                    <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-[var(--border-subtle)] mb-1 flex items-center justify-between">
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
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-[var(--text-main)] hover:text-cyan-400 hover:bg-cyan-500/15 transition-all duration-150 group/item cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover/item:bg-cyan-500/20 group-hover/item:scale-105 transition-all">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight">View Resume</span>
                        <span className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5">Preview in modal</span>
                      </div>
                    </button>

                    {/* Option 2: Download Resume */}
                    <a
                      href="/resume.pdf"
                      download="Sanjai_G_Resume.pdf"
                      onClick={() => setResumeDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-[var(--text-main)] hover:text-cyan-400 hover:bg-cyan-500/15 transition-all duration-150 group/item cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500/20 group-hover/item:scale-105 transition-all">
                        <Download className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight">Download Resume</span>
                        <span className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5">Save PDF copy</span>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle + Quick Buttons */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Quick 1-tap Theme Switcher - Mentioning Dark or Light */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[var(--text-main)] bg-[var(--bg-chip)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all cursor-pointer shadow-sm text-xs font-semibold"
              title={theme === "dark" ? "Switch to Light theme" : "Switch to Dark theme"}
              aria-label={`Current theme: ${theme === "dark" ? "Dark" : "Light"}`}
            >
              {theme === "dark" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[var(--accent-primary)] bg-[var(--bg-chip)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] rounded-xl sm:hidden cursor-pointer shadow-sm transition-all"
              aria-label="Quick View Resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-[var(--text-main)] hover:text-[var(--accent-primary)] bg-[var(--bg-chip)] border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with smooth scrolling so content is never cut off */}
      {isOpen && (
        <div className="xl:hidden px-4 pt-3 pb-6 bg-[var(--modal-bg)] backdrop-blur-2xl border-b border-[var(--border-subtle)] max-h-[calc(100vh-4.5rem)] overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "text-[var(--accent-primary)] bg-[var(--bg-chip)] border border-[var(--border-subtle)]"
                      : "text-[var(--text-sub)] hover:text-[var(--accent-primary)] hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Mobile Theme Selector - Single button explicitly mentioning Dark or Light */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between px-1">
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Theme
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-chip)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] text-[var(--text-main)] transition-all duration-300 cursor-pointer shadow-sm text-xs font-semibold w-auto shrink-0"
                title={theme === "dark" ? "Switch to Light theme" : "Switch to Dark theme"}
                aria-label={`Current theme: ${theme === "dark" ? "Dark" : "Light"}`}
              >
                {theme === "dark" ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Actions: View Resume & Download - Only fills around text, doesn't expand */}
            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold px-2 block mb-2.5">
                Resume Options
              </span>
              <div className="flex flex-wrap items-center gap-2.5 px-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--text-main)] rounded-xl bg-[var(--bg-chip)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] shadow-sm transition-all cursor-pointer w-auto shrink-0"
                >
                  <Eye className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>View Resume</span>
                </button>

                <a
                  href="/resume.pdf"
                  download="Sanjai_G_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-sm transition-all cursor-pointer w-auto shrink-0"
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