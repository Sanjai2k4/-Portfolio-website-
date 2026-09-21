import { GraduationCap, Calendar, MapPin, Award, BookOpen, School } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Education = () => {
  const { education } = portfolioData;

  const getEducationIcon = (id) => {
    switch (id) {
      case "be-cse":
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case "hsc":
        return <School className="w-5 h-5 text-blue-400" />;
      case "sslc":
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="education" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll scroll-mt-24 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Schooling</span>
          </h2>
          <p className="mt-2.5 text-slate-400 text-sm sm:text-base">
            Academic qualifications highlighting engineering training, analytical fundamentals, and performance milestones.
          </p>
        </div>

        {/* Compact Education Timeline Cards - Completely Colorless / Transparent */}
        <div className="space-y-5 relative">
          {/* Vertical Connecting Line */}
          <div className="hidden sm:block absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-blue-500/40 via-cyan-500/30 to-transparent" />

          {education.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-5 group"
            >
              {/* Timeline Pin Node */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-transparent border border-[var(--border-subtle)] shadow-sm shrink-0 z-10 group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_15px_var(--glow-color)] transition-all duration-300">
                {getEducationIcon(item.id)}
              </div>

              {/* Colorless Card Container */}
              <div className="w-full colorless-card p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    {/* Level Pill & Period */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-transparent text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 text-xs font-semibold">
                        {item.level}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    {/* Degree / Certificate Name */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[var(--accent-primary)] transition-colors">
                      {item.degree}
                    </h3>

                    {/* Institute Name & Location */}
                    <p className="text-xs sm:text-sm font-medium text-[var(--text-sub)] mt-0.5">
                      {item.institute}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-[var(--accent-primary)]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Compact Score Badge */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center px-3.5 py-2 rounded-xl bg-transparent border border-[var(--border-subtle)] shrink-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>{item.scoreType}</span>
                    </span>
                    <span className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                      {item.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
