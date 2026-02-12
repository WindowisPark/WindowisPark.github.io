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

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTIONS);
  const [pdfReady, setPdfReady] = useState(false);
  const resumeRef = useRef(null);
  const generatingRef = useRef(false);

  const handleDownloadPdf = useCallback(() => {
    if (generatingRef.current) return;
    generatingRef.current = true;
    setPdfReady(true);
  }, []);

  // pdfReady가 true가 되면 ResumePdf가 DOM에 마운트 → 2프레임 대기 → 캡처
  useEffect(() => {
    if (!pdfReady || !resumeRef.current) return;

    let cancelled = false;

    // 2프레임 대기: 브라우저가 레이아웃+페인트를 완료하도록 보장
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        if (cancelled) return;

        try {
          const html2pdf = (await import('html2pdf.js')).default;

          await html2pdf()
            .set({
              margin: [10, 12, 10, 12],
              filename: '박창희_포트폴리오.pdf',
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
          console.error('PDF 생성 실패:', err);
        } finally {
          setPdfReady(false);
          generatingRef.current = false;
        }
      });
    });

    return () => { cancelled = true; };
  }, [pdfReady]);

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
      <Navbar activeSection={activeSection} onDownloadPdf={handleDownloadPdf} />
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
      {pdfReady &&
        createPortal(
          <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '794px',
            zIndex: 9999,
            overflow: 'visible',
            background: '#fff',
          }}>
            <ResumePdf ref={resumeRef} />
          </div>,
          document.body
        )
      }
    </>
  );
}
