import { ArrowUp, Github, Linkedin, Mail, Phone, Heart } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Footer = () => {
  const { student, socialLinks } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative bg-[var(--bg-body)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                Sanjai
              </span>{" "}
              G
            </h3>
            <p className="text-cyan-400 text-xs sm:text-sm font-semibold mt-0.5">
              {student.title}
            </p>
            <p className="text-slate-400 text-xs max-w-sm mt-2 leading-relaxed">
              Passionate software engineer building robust Java backend services, responsive React frontends, and reliable web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">
              Experience
            </a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">
              Education
            </a>
            <a href="#certifications" className="hover:text-cyan-400 transition-colors">
              Certifications
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${student.email}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={student.phoneTel}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              aria-label={`Call ${student.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 hover:-translate-y-1 ml-2 cursor-pointer"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {student.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Java Full Stack Developer</span>
            <span>•</span>
            <span className="text-slate-400">Salem, Tamil Nadu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
