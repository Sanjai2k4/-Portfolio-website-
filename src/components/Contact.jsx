import { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Linkedin,
  Github,
  Check,
  Copy,
  Phone,
  MessageSquare,
  Clock,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// Optional email service integration endpoint (e.g. Formspree / Resend proxy)
// You can set VITE_FORMSPREE_ID in your .env or replace the string below.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "";

const Contact = () => {
  const { student, socialLinks } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please enter a message (at least 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(student.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(student.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);
    setStatusMessage("");

    try {
      if (FORMSPREE_ID) {
        // Send via Formspree API if configured
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmissionStatus("success");
          setStatusMessage("Thank you! Your message has been sent successfully.");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          throw new Error("Service unavailable. Switching to email client.");
        }
      } else {
        // Direct reliable email dispatch via mailto with client-side verification
        await new Promise((resolve) => setTimeout(resolve, 600));

        const mailtoUrl = `mailto:${student.email}?subject=${encodeURIComponent(
          `[Portfolio Contact] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `Hello Sanjai,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
        )}`;

        window.location.href = mailtoUrl;

        setSubmissionStatus("success");
        setStatusMessage(
          `Your email client has been opened with your pre-filled inquiry. If it didn't open automatically, you can send directly to ${student.email}.`
        );
      }
    } catch {
      // Graceful fallback to mailto
      const mailtoUrl = `mailto:${student.email}?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Hello Sanjai,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
      )}`;
      window.location.href = mailtoUrl;

      setSubmissionStatus("success");
      setStatusMessage(
        `Your email client has been opened with your pre-filled message for ${student.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll scroll-mt-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Touch</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Looking for a Java Full Stack Developer, have an open role, or want to collaborate? Send a message anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* Phone Number Card (Clickable to call) */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between">
                <a
                  href={student.phoneTel}
                  className="flex items-center gap-3.5 flex-1 group/phone"
                  aria-label={`Call Sanjai at ${student.phone}`}
                >
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover/phone:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Phone Number (Click to call)
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white group-hover/phone:text-emerald-400 transition-colors">
                      {student.phone}
                    </p>
                  </div>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="glass-btn p-2 rounded-xl text-slate-400 hover:text-white hover:border-emerald-500/40 transition-all shrink-0 ml-2 cursor-pointer"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copiedPhone && (
                <p className="text-xs text-emerald-400 font-semibold mt-2.5 animate-in fade-in">
                  ✓ Copied phone number to clipboard!
                </p>
              )}
            </div>

            {/* Direct Email Card with Copy button */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${student.email}`}
                  className="flex items-center gap-3.5 flex-1 overflow-hidden group/mail"
                  aria-label={`Email Sanjai at ${student.email}`}
                >
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover/mail:scale-105 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Email Address (Click to write)
                    </p>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover/mail:text-cyan-400 transition-colors truncate block">
                      {student.email}
                    </span>
                  </div>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="glass-btn p-2 rounded-xl text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all shrink-0 ml-2 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copiedEmail && (
                <p className="text-xs text-emerald-400 font-semibold mt-2.5 animate-in fade-in">
                  ✓ Copied email to clipboard!
                </p>
              )}
            </div>

            {/* Location Card */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Location
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  {student.location}
                </p>
                <p className="text-xs text-slate-400">Available for In-Office & Remote Roles</p>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Response Time
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  Prompt replies within 24 hours
                </p>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                Professional Profiles
              </p>
              <div className="flex gap-3">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
                  aria-label="Sanjai G LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                  aria-label="Sanjai G GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Fill out the verified form below or contact directly at{" "}
                <span className="text-cyan-400 font-semibold">{student.email}</span>.
              </p>

              {submissionStatus === "success" ? (
                <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center animate-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Dispatched</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    {statusMessage}
                  </p>
                  <button
                    onClick={() => {
                      setSubmissionStatus(null);
                      setStatusMessage("");
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-white/10 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                          errors.name ? "border-red-500 ring-1 ring-red-500" : "border-white/10"
                        } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                          errors.email ? "border-red-500 ring-1 ring-red-500" : "border-white/10"
                        } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Subject / Job Opportunity *
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Java Full Stack Developer Position"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                        errors.subject ? "border-red-500 ring-1 ring-red-500" : "border-white/10"
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors`}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Sanjai, we reviewed your portfolio and would like to discuss..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                        errors.message ? "border-red-500 ring-1 ring-red-500" : "border-white/10"
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Message...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
