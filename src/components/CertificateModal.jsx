import { useEffect, useState } from "react";
import {
  X,
  Download,
  ExternalLink,
  Award,
  Calendar,
  CheckCircle2,
  Maximize2,
  Minimize2,
  FileText,
} from "lucide-react";

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsFullscreen(false);
  }, [certificate]);

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

  if (!isOpen || !certificate) return null;

  const downloadFileName =
    certificate.downloadName ||
    (certificate.fileUrl ? certificate.fileUrl.split("/").pop() : "certificate.pdf");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-250"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full flex flex-col rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl transition-all duration-300 animate-in zoom-in-95 ${
          isFullscreen
            ? "max-w-[99vw] h-[98vh]"
            : "max-w-4xl h-[90vh] sm:h-[88vh]"
        }`}
        style={{ background: "var(--modal-bg, rgba(3, 7, 18, 0.97))" }}
      >
        {/* Top Accent Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="cert-modal-title"
                className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug truncate"
              >
                {certificate.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 mt-0.5">
                <span className="text-cyan-400 font-semibold">{certificate.organization}</span>
                {certificate.date && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {certificate.date}
                    </span>
                  </>
                )}
                {certificate.certificateId && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-purple-300 text-[11px]">
                      ID: {certificate.certificateId}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* External Window Link */}
            {certificate.fileUrl && (
              <a
                href={certificate.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Open PDF in new tab"
                aria-label="Open certificate PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-red-500/40 transition-colors cursor-pointer"
              title="Close modal (Esc)"
              aria-label="Close certificate viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal PDF Viewer Body */}
        <div className="flex-1 w-full relative overflow-hidden bg-slate-950/90 flex flex-col p-2 sm:p-4">
          {certificate.fileUrl ? (
            <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 relative">
              {/* Native PDF viewer */}
              <iframe
                src={`${certificate.fileUrl}#toolbar=0&navpanes=0`}
                title={certificate.title}
                className="w-full h-full border-none rounded-xl bg-slate-950"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-900/60 rounded-2xl border border-white/10">
              <FileText className="w-12 h-12 text-purple-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{certificate.title}</h3>
              <p className="text-xs text-slate-400 max-w-md">
                Issued by {certificate.organization}
              </p>
            </div>
          )}
        </div>

        {/* Prominent Certificate Modal Footer with "Download Certificate" Button */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 shrink-0 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-medium">Original Verified Certificate Document</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href={certificate.fileUrl}
              download={downloadFileName}
              className="glass-btn flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.55)] transition-all duration-300 cursor-pointer"
              title={`Download ${downloadFileName}`}
            >
              <Download className="w-4 h-4" />
              <span>Download Certificate</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
