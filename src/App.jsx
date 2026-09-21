import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import CertificateModal from "./components/CertificateModal";

const AppContent = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Global scroll reveal effect using Intersection Observer
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-body)] text-[var(--text-main)] relative antialiased transition-colors duration-300">
      {/* Dynamic ambient dot pattern adaptable to theme */}
      <div
        className="fixed inset-0 pointer-events-none -z-20 opacity-70"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--dot-color) 1.2px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      <main>
        <HeroSection />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications
          onViewCertificate={(cert) => setSelectedCertificate(cert)}
        />
        <Contact />
      </main>

      <Footer />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={Boolean(selectedCertificate)}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;