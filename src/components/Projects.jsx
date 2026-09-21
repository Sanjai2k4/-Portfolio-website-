import { useState } from "react";
import {
  FolderGit2,
  Github,
  ExternalLink,
  CheckCircle2,
  X,
  Code2,
  ShoppingBag,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Projects = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
      {/* Glow Effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Practical full-stack and web engineering projects showcasing clean architecture, responsive UX, and AI capabilities.
          </p>
        </div>

        {/* Compact Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Header with icon & category badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 text-cyan-400 shadow-sm group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                    {project.id === "ecommerce-web" ? (
                      <ShoppingBag className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-indigo-400" />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-900/90 text-slate-300 border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Details (Expand) and GitHub */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl"
            style={{ background: "var(--modal-bg, rgba(3, 7, 18, 0.96))" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                {selectedProject.status}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {selectedProject.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-8">
              {selectedProject.title}
            </h3>

            {/* Full Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                Project Overview
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedProject.fullDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Key Features & Capabilities:
              </h4>
              <ul className="space-y-2">
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Details */}
            {selectedProject.architecture && (
              <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Architecture & Implementation:
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedProject.architecture}
                </p>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-cyan-300 border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
