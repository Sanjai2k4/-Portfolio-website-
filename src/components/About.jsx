import { useState } from "react";
import { User, Code2, Sparkles, CheckCircle2, FileText, Award, ArrowRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const About = () => {
  const { student, about } = portfolioData;
  const [activeTab, setActiveTab] = useState("detailed");

  const stats = [
    { label: "Graduation", value: "2026", sub: "B.E. Computer Science" },
    { label: "Core Domain", value: "Java", sub: "Spring Boot & Full Stack" },
    { label: "Projects", value: "2+", sub: "Full-Stack Web Apps" },
    { label: "Certifications", value: "3", sub: "Oracle, NoviTech, NPTEL" },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll scroll-mt-24 isolate overflow-hidden w-full max-w-full">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Sanjai G</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Software engineer dedicated to crafting reliable web applications, robust backend APIs, and clean software architecture.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 text-center group"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-1 group-hover:scale-105 transition-transform">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-white mb-0.5">{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Story Card */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
            {/* View Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Professional Profile</h3>
              </div>
              <div className="inline-flex items-center p-1 bg-[var(--bg-chip)] rounded-xl border border-[var(--border-subtle)] self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "summary"
                      ? "bg-[var(--accent-primary)] text-white shadow-md font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Quick Summary
                </button>
                <button
                  onClick={() => setActiveTab("detailed")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "detailed"
                      ? "bg-[var(--accent-primary)] text-white shadow-md font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Detailed Bio
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            {activeTab === "summary" ? (
              <div className="space-y-4 text-[var(--text-main)] text-base leading-relaxed animate-in fade-in duration-300">
                <p className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-chip)] border border-[var(--border-subtle)] text-[var(--text-main)] font-medium leading-relaxed shadow-sm">
                  {about.short}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-sm text-[var(--text-sub)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Java Object-Oriented Architecture</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[var(--text-sub)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Responsive Interfaces with React.js</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[var(--text-sub)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Spring Boot, Node.js & REST APIs</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[var(--text-sub)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Relational (MySQL) & Document (MongoDB) DBs</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-[var(--text-sub)] text-base leading-relaxed animate-in fade-in duration-300">
                <p>
                  I am a passionate software developer with strong foundational expertise in <span className="text-white font-semibold">Java, Spring Boot, React.js, and modern full-stack web engineering</span>. My focus centers on writing clean, readable code and translating functional specifications into stable, user-friendly digital solutions.
                </p>
                <p>
                  Through developer internships and academic projects, I have developed RESTful APIs, implemented database schemas with MySQL and MongoDB, and crafted responsive user interfaces using React.js and modern CSS. I value disciplined engineering practices, methodical problem solving, and effective team communication.
                </p>
                <div className="p-4 rounded-xl bg-[var(--bg-chip)] border border-[var(--border-subtle)] text-[var(--text-sub)]">
                  <strong className="text-white">Career Objective:</strong> As a 2026 computer science graduate, I aim to apply my technical grounding in Java full-stack technologies to real-world engineering challenges, delivering value through maintainable, performant software.
                </div>
              </div>
            )}

            {/* Quick Action */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Open for software engineering opportunities</span>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Quick Snapshot */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel p-6 rounded-3xl border border-white/10">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Quick Snapshot</span>
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Role:</span>
                  <span className="font-semibold text-white">{student.title}</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Batch:</span>
                  <span className="font-semibold text-white">2026 Passout</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Degree:</span>
                  <span className="font-semibold text-white">B.E. CSE</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">College:</span>
                  <span className="font-semibold text-white text-right text-xs">DGCT, Salem</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Status:</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open for opportunities
                  </span>
                </li>
              </ul>
            </div>

            {/* What I Bring Card */}
            <div className="glass-panel p-6 rounded-3xl border border-[var(--border-subtle)]">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Core Competencies</span>
              </h4>
              <p className="text-xs text-[var(--text-sub)] leading-relaxed">
                Strong fundamentals in Core Java, Spring Boot, OOPs, React.js frontend architecture, REST API design, swift adaptability to new technologies, and disciplined problem-solving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
