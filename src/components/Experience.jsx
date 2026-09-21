import { Briefcase, Calendar, CheckCircle2, Building2, Award } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll bg-transparent">
      {/* Subtle ambient light - purely transparent background */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

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

        {/* Compact Experience Timeline Cards - No heavy boxed background container */}
        <div className="space-y-5 relative">
          {/* Vertical Connecting Line */}
          <div className="hidden sm:block absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500/30" />

          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-5 group"
            >
              {/* Compact Timeline Node */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/90 border border-white/15 shadow-md shrink-0 z-10 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all duration-300">
                <Briefcase className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Compact Experience Card - Lightweight Glassmorphic */}
              <div className="w-full glass-card-compact p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden">
                {/* Top Accent Gradient Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${
                    index === 0
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600"
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                  <div>
                    {/* Role & Duration Pill */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                        {exp.role}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.title}
                    </h3>

                    {/* Company Name */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {exp.id === "future-focus" && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold self-start sm:self-auto">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>Assessed: Excellent</span>
                    </div>
                  )}
                </div>

                {/* Bullet Points */}
                <ul className="space-y-1.5 my-3">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies Used */}
                <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                    Tech:
                  </span>
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-900/80 text-cyan-300 border border-white/5"
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
