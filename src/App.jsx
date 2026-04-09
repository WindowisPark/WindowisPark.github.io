import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useScrollSpy from './hooks/useScrollSpy';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import ScrollToTop from './components/common/ScrollToTop';
import ResumePdf from './components/ResumePdf/ResumePdf';
import PortfolioPdf from './components/PortfolioPdf/PortfolioPdf';

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTIONS);

  // Print target: 'resume' | 'portfolio' | null
  const [printTarget, setPrintTarget] = useState(null);

  const handleDownloadResume = useCallback(() => setPrintTarget('resume'), []);
  const handleDownloadPortfolio = useCallback(() => setPrintTarget('portfolio'), []);

  // Trigger browser print when printTarget is set
  useEffect(() => {
    if (!printTarget) return;

    // Wait for the PDF component to render
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    });

    const onAfterPrint = () => setPrintTarget(null);
    window.addEventListener('afterprint', onAfterPrint);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, [printTarget]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('section:not(#hero)').forEach((el) => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar
        activeSection={activeSection}
        onDownloadResume={handleDownloadResume}
        onDownloadPortfolio={handleDownloadPortfolio}
      />
      <Sidebar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
      <ScrollToTop />

      {/* Print-only: portal to body so @media print can hide #root */}
      {printTarget && createPortal(
        <div className="print-area">
          {printTarget === 'resume' && <ResumePdf />}
          {printTarget === 'portfolio' && <PortfolioPdf />}
        </div>,
        document.body
      )}
    </>
  );
}
