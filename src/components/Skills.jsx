import {
  Code2,
  Server,
  Database,
  Wrench,
  Sparkles,
  Layers,
  Cpu,
  Terminal,
  Globe,
  Binary,
  Workflow,
  CheckCircle,
  FileCode,
  HardDrive,
  GitBranch,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Skills = () => {
  const { skills } = portfolioData;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Programming Languages":
        return <Terminal className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform duration-300" />;
      case "Frontend":
        return <Globe className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Backend":
        return <Server className="w-5 h-5 text-emerald-400 group-hover:translate-y-[-2px] transition-transform duration-300" />;
      case "Databases":
        return <Database className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "Tools":
        return <Wrench className="w-5 h-5 text-blue-400 group-hover:-rotate-12 transition-transform duration-300" />;
      case "Core Concepts":
        return <BrainCircuit className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getSkillIcon = (skill) => {
    switch (skill.toLowerCase()) {
      case "java":
      case "spring boot":
      case "hibernate":
        return <FileCode className="w-3 h-3 text-amber-400" />;
      case "javascript":
      case "python":
        return <Binary className="w-3 h-3 text-yellow-400" />;
      case "html5":
      case "css3":
      case "react.js":
        return <Code2 className="w-3 h-3 text-cyan-400" />;
      case "mysql":
      case "mongodb":
        return <HardDrive className="w-3 h-3 text-purple-400" />;
      case "git":
      case "github":
      case "postman":
        return <GitBranch className="w-3 h-3 text-blue-400" />;
      default:
        return <CheckCircle className="w-3 h-3 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Tech Stack</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Practical proficiencies across object-oriented programming, scalable backend microservices, modern web interfaces, and databases.
          </p>
        </div>

        {/* EQUAL HEIGHT CSS GRID WITH STRICT TOP ALIGNMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {skills.map((group) => (
            <div
              key={group.category}
              className="relative rounded-3xl p-6 sm:p-7 glass-panel border border-white/10 hover:border-cyan-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)] h-full overflow-hidden"
            >
              {/* Subtle hover gradient illumination behind the card */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Consistent Category Header Alignment */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 shadow-sm shrink-0">
                      {getCategoryIcon(group.category)}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {group.category}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 px-2.5 py-1 rounded-full bg-slate-900 border border-white/5 shrink-0">
                    {group.skills.length} skills
                  </span>
                </div>

                {/* Individual Skill Badges with Mini Icons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {group.skills.map((skillName) => (
                    <div
                      key={skillName}
                      className="glass-card-compact inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-200 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)] text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-sm group/chip cursor-default"
                    >
                      {getSkillIcon(skillName)}
                      <span>{skillName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400/80">
                  <ShieldCheck className="w-3 h-3" />
                  Verified in Projects
                </span>
                <span className="font-mono text-cyan-400/60 group-hover:text-cyan-400 transition-colors">
                  0{skills.indexOf(group) + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
