import {
  Award,
  Calendar,
  CheckCircle2,
  Cloud,
  Code2,
  Lightbulb,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Certifications = ({ onViewCertificate }) => {
  const { certifications } = portfolioData;

  const getCertIcon = (type) => {
    switch (type) {
      case "cloud":
        return <Cloud className="w-6 h-6 text-red-400" />;
      case "code":
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case "lightbulb":
        return <Lightbulb className="w-6 h-6 text-purple-400" />;
      default:
        return <Award className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Certifications</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Industry and academic credentials validating knowledge in Cloud AI, Full Stack Development, and Design Thinking.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => onViewCertificate(cert)}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-xl hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header with Icon and Date badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 shadow-md group-hover:scale-110 group-hover:rotate-3 group-hover:border-purple-400/50 transition-all duration-300">
                    {getCertIcon(cert.iconType)}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {cert.date && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-xs font-semibold text-slate-300 border border-white/10">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{cert.date}</span>
                      </span>
                    )}
                    {cert.certificateId && (
                      <span className="text-[10px] font-mono text-purple-300/80 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                        ID: {cert.certificateId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Organization and Title */}
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 block">
                    {cert.organization}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  {cert.subTitle && (
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      {cert.subTitle}
                    </p>
                  )}
                </div>

                {/* Short Description */}
                {cert.description && (
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {cert.description}
                  </p>
                )}

                {/* Skills Chips */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Core Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-900/80 text-slate-300 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action: "View Certificate" Button & Category Tag */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCertificate(cert);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                  aria-label={`View Certificate for ${cert.title}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>

                <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{cert.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
