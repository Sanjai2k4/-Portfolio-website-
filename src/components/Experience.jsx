import { Briefcase, Calendar, CheckCircle2, Building2, Award } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll scroll-mt-24 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work & Internships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Experience</span>
          </h2>
          <p className="mt-2.5 text-slate-400 text-sm sm:text-base">
            Hands-on software engineering experience applying Core Java, Spring Boot, React.js, and web standards.
          </p>
        </div>

        {/* Compact Experience Timeline Cards - Completely Colorless / Transparent */}
        <div className="space-y-5 relative">
          {/* Vertical Connecting Line */}
          <div className="hidden sm:block absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-cyan-500/40 via-blue-500/30 to-transparent" />

          {experience.map((exp) => (
            <div
              key={exp.id}
              className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-5 group"
            >
              {/* Compact Timeline Node */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-transparent border border-[var(--border-subtle)] shadow-sm shrink-0 z-10 group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_15px_var(--glow-color)] transition-all duration-300">
                <Briefcase className="w-4 h-4 text-[var(--accent-primary)]" />
              </div>

              {/* Colorless Experience Card */}
              <div className="w-full colorless-card p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                  <div>
                    {/* Role & Duration Pill */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-transparent text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 text-xs font-semibold">
                        {exp.role}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[var(--accent-primary)] transition-colors">
                      {exp.title}
                    </h3>

                    {/* Company Name */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-sub)] mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {exp.id === "future-focus" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-transparent border border-emerald-500/40 text-emerald-500 dark:text-emerald-400 text-xs font-semibold self-start sm:self-auto">
                      <Award className="w-3 h-3 text-emerald-500" />
                      <span>Assessed: Excellent</span>
                    </div>
                  )}
                </div>

                {/* Bullet Points */}
                <ul className="space-y-1.5 my-3.5">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-sub)] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies Used */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                    Tech:
                  </span>
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-transparent text-[var(--text-sub)] border border-[var(--border-subtle)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
