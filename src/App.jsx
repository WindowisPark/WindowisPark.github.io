import { useEffect, useState, useRef, useCallback } from 'react';
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

  // Resume PDF state
  const [resumeReady, setResumeReady] = useState(false);
  const resumeRef = useRef(null);
  const resumeGenerating = useRef(false);

  // Portfolio PDF state
  const [portfolioReady, setPortfolioReady] = useState(false);
  const portfolioRef = useRef(null);
  const portfolioGenerating = useRef(false);

  const handleDownloadResume = useCallback(() => {
    if (resumeGenerating.current) return;
    resumeGenerating.current = true;
    setResumeReady(true);
  }, []);

  const handleDownloadPortfolio = useCallback(() => {
    if (portfolioGenerating.current) return;
    portfolioGenerating.current = true;
    setPortfolioReady(true);
  }, []);

  // Generate Resume PDF
  useEffect(() => {
    if (!resumeReady || !resumeRef.current) return;
    let cancelled = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        if (cancelled) return;
        try {
          const html2pdf = (await import('html2pdf.js')).default;
          await html2pdf()
            .set({
              margin: [10, 12, 10, 12],
              filename: '박창희_이력서.pdf',
              image: { type: 'jpeg', quality: 0.95 },
              html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 794,
                windowWidth: 794,
              },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
              pagebreak: {
                before: '[data-pdf-break]',
                avoid: '[data-pdf-avoid]',
              },
            })
            .from(resumeRef.current)
            .save();
        } catch (err) {
          console.error('이력서 PDF 생성 실패:', err);
        } finally {
          setResumeReady(false);
          resumeGenerating.current = false;
        }
      });
    });

    return () => { cancelled = true; };
  }, [resumeReady]);

  // Generate Portfolio PDF
  useEffect(() => {
    if (!portfolioReady || !portfolioRef.current) return;
    let cancelled = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        if (cancelled) return;
        try {
          const html2pdf = (await import('html2pdf.js')).default;
          await html2pdf()
            .set({
              margin: [10, 12, 10, 12],
              filename: '박창희_프로젝트_포트폴리오.pdf',
              image: { type: 'jpeg', quality: 0.95 },
              html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 794,
                windowWidth: 794,
              },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
              pagebreak: {
                before: '[data-pdf-break]',
                avoid: '[data-pdf-avoid]',
              },
            })
            .from(portfolioRef.current)
            .save();
        } catch (err) {
          console.error('포트폴리오 PDF 생성 실패:', err);
        } finally {
          setPortfolioReady(false);
          portfolioGenerating.current = false;
        }
      });
    });

    return () => { cancelled = true; };
  }, [portfolioReady]);

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

  const portalStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '794px',
    zIndex: 9999,
    overflow: 'visible',
    background: '#fff',
  };

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
      {resumeReady &&
        createPortal(
          <div style={portalStyle}>
            <ResumePdf ref={resumeRef} />
          </div>,
          document.body
        )
      }
      {portfolioReady &&
        createPortal(
          <div style={portalStyle}>
            <PortfolioPdf ref={portfolioRef} />
          </div>,
          document.body
        )
      }
    </>
  );
}
