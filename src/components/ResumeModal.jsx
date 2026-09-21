import { useEffect, useState } from "react";
import { Download, X, ExternalLink, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const ResumeModal = ({ isOpen, onClose }) => {
  const { student } = portfolioData;
  const [isPdfLoaded, setIsPdfLoaded] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl"
        style={{ background: "var(--modal-bg, rgba(3, 7, 18, 0.96))" }}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="resume-modal-title"
                className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2"
              >
                <span>{student.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium hidden sm:inline-block">
                  Resume Preview
                </span>
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                Java Full Stack Developer • 2026 Batch
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Sanjai_G_Resume.pdf"
              className="glass-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Resume</span>
              <span className="sm:hidden">Download</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn p-2 rounded-xl text-slate-300 hover:text-white transition-colors"
              title="Open in new tab"
              aria-label="Open resume in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="glass-btn p-2 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close resume viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / Viewer */}
        <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-950 flex flex-col">
          {/* Desktop PDF Object/iFrame */}
          <div className="w-full h-full flex-1">
            <object
              data="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
              type="application/pdf"
              className="w-full h-full border-none"
              onError={() => setIsPdfLoaded(false)}
            >
              {/* Fallback for devices without inline PDF support */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900/60">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Resume Preview Ready</h3>
                <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                  Your device or browser prefers opening PDFs directly. Tap below to view or save Sanjai G's official resume.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Fullscreen Viewer</span>
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Sanjai_G_Resume.pdf"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save to Device</span>
                  </a>
                </div>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
