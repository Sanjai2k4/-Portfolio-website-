import { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Sparkles,
  Phone,
  Code2,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const HeroSection = () => {
  const { student, socialLinks } = portfolioData;

  // Dynamic typing animation for roles
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  useEffect(() => {
    const currentWord = student.typingRoles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        if (displayedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1800);
          setTypingSpeed(60);
        }
      } else {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % student.typingRoles.length);
          setTypingSpeed(110);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed, student.typingRoles]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-28 isolate w-full max-w-full"
    >
      {/* Dynamic ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[500px] max-w-full bg-gradient-to-tr from-cyan-600/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 left-0 sm:left-10 w-48 sm:w-80 h-48 sm:h-80 bg-cyan-500/10 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-purple-600/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{student.availability}</span>
          </div>

          {/* Subheading Greeting */}
          <p className="text-cyan-400 text-sm md:text-base font-semibold tracking-wider uppercase mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Welcome to my developer portfolio</span>
          </p>

          {/* Main Hero Name */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">
              {student.name}
            </span>
          </h1>

          {/* Dynamic Typing Title */}
          <div className="h-10 sm:h-12 flex items-center mb-4 text-xl sm:text-2xl lg:text-3xl font-bold text-slate-300">
            <span className="text-slate-400 mr-2 font-normal">I am a</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300 border-b-2 border-cyan-400 pb-0.5">
              {displayedText}
            </span>
            <span className="w-0.5 h-6 sm:h-7 bg-cyan-400 ml-1 animate-pulse" />
          </div>

          {/* Primary Designation Pill - Theme-adaptive across all modes */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[var(--bg-chip)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] text-sm font-semibold tracking-wide mb-6 shadow-sm transition-all backdrop-blur-md">
            <Code2 className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-[var(--text-main)]">{student.title}</span>
          </div>

          {/* Concise, Professional Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            {student.tagline}
          </p>

          {/* Quick info metadata (Location & Clickable Phone) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-400 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{student.location}</span>
            </div>
            <a
              href={student.phoneTel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{student.phone}</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 w-full sm:w-auto">
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="glass-btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mr-1">
              Connect:
            </span>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn p-2.5 rounded-xl text-slate-300 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn p-2.5 rounded-xl text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${student.email}`}
              className="glass-btn p-2.5 rounded-xl text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-200"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={student.phoneTel}
              className="glass-btn p-2.5 rounded-xl text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-200"
              aria-label="Call Sanjai"
              title="Call Sanjai G"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: LARGE CIRCULAR Profile Picture with Premium Animated Glow BEHIND */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px] aspect-square group cursor-pointer">
            {/* === ANIMATED MULTI-COLOR GLOW EFFECT STRICTLY POSITIONED BEHIND THE CIRCULAR IMAGE === */}

            {/* 1. Flowing Soft Ambient Gradient Blob behind circle (Cyan, Blue, Purple) */}
            <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-tr from-cyan-500/35 via-blue-600/30 to-purple-600/35 blur-2xl -z-20 animate-profile-glow group-hover:from-cyan-400/50 group-hover:via-blue-500/40 group-hover:to-purple-500/50 transition-all duration-500" />

            {/* 2. Rotating Gradient Outer Halo Ring behind circle */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/35 to-purple-500/40 opacity-75 -z-10 animate-profile-ring blur-md group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />

            {/* 3. Subtle Reverse Rotating Orbit Ring Accent behind circle */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-dashed border-cyan-400/30 -z-10 animate-profile-ring-reverse pointer-events-none group-hover:border-cyan-300/60 transition-all duration-500" />

            {/* === MODERN CIRCULAR GLASS & GRADIENT FRAME === */}
            <div className="relative w-full h-full rounded-full p-2.5 sm:p-3 bg-gradient-to-b from-white/25 via-white/10 to-cyan-500/20 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:border-cyan-400/60 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.45)]">
              {/* Internal Image Container (Circular) */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950">
                <img
                  src={student.profilePic}
                  alt={`${student.name} - Profile`}
                  className="w-full h-full object-cover object-[50%_18%] transition-transform duration-700 ease-out group-hover:scale-108"
                  onError={(e) => {
                    e.currentTarget.src = student.fallbackPic;
                  }}
                />

                {/* Subtle soft glass light refraction overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/15 via-transparent to-white/20 pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Clean Name & Title Below Circular Avatar */}
          <div className="mt-6 text-center z-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {student.name}
            </h3>
            <p className="text-sm font-semibold text-cyan-400 mt-0.5">
              {student.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
