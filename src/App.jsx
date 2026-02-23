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

// A4: 210×297mm, margin: top/bottom 10mm, left/right 12mm
const M_TOP = 10, M_BOTTOM = 10, M_LEFT = 12, M_RIGHT = 12;
const CONTENT_W_MM = 210 - M_LEFT - M_RIGHT; // 186mm
const CONTENT_H_MM = 297 - M_TOP - M_BOTTOM; // 277mm
const CANVAS_SCALE = 2;

async function generateSmartPdf(element, filename) {
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  const canvas = await html2canvas(element, {
    scale: CANVAS_SCALE,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: 794,
    windowWidth: 794,
  });

  // 페이지 콘텐츠 높이(px): 캔버스 너비가 CONTENT_W_MM에 대응
  const pageH_px = Math.round(canvas.width * (CONTENT_H_MM / CONTENT_W_MM));
  const totalH_px = canvas.height;
  const containerRect = element.getBoundingClientRect();

  // 강제 브레이크 위치 ([data-pdf-break])
  const breakPositions = [...element.querySelectorAll('[data-pdf-break]')]
    .map(el => Math.round((el.getBoundingClientRect().top - containerRect.top) * CANVAS_SCALE))
    .filter(p => p > 0)
    .sort((a, b) => a - b);

  // 잘리면 안 되는 요소의 경계 ([data-pdf-avoid])
  const avoidBounds = [...element.querySelectorAll('[data-pdf-avoid]')].map(el => {
    const r = el.getBoundingClientRect();
    return {
      top: Math.round((r.top - containerRect.top) * CANVAS_SCALE),
      bottom: Math.round((r.bottom - containerRect.top) * CANVAS_SCALE),
    };
  });

  // 페이지 컷 위치 결정
  const pageCuts = [0];
  let cursor = 0;

  while (cursor < totalH_px) {
    let cut = cursor + pageH_px;

    // 강제 브레이크가 자연 컷보다 먼저 오면 우선 적용
    const forced = breakPositions.find(p => p > cursor && p < cut);
    if (forced !== undefined) {
      pageCuts.push(forced);
      cursor = forced;
      continue;
    }

    if (cut >= totalH_px) break;

    // avoid 요소가 컷에 걸리면 요소 상단으로 이동
    for (const { top, bottom } of avoidBounds) {
      if (top < cut && bottom > cut && (bottom - top) <= pageH_px) {
        cut = top;
        break;
      }
    }

    if (cut <= cursor) cut = cursor + pageH_px; // 무한 루프 방지
    if (cut >= totalH_px) break;

    pageCuts.push(cut);
    cursor = cut;
  }
  pageCuts.push(totalH_px);

  // 페이지별 슬라이스 → jsPDF 조립
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  for (let i = 0; i < pageCuts.length - 1; i++) {
    if (i > 0) pdf.addPage();

    const sliceTop = pageCuts[i];
    const sliceH = pageCuts[i + 1] - sliceTop;

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceH;
    pageCanvas.getContext('2d').drawImage(
      canvas, 0, sliceTop, canvas.width, sliceH, 0, 0, canvas.width, sliceH
    );

    const imgH_mm = (sliceH / canvas.width) * CONTENT_W_MM;
    pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', M_LEFT, M_TOP, CONTENT_W_MM, imgH_mm);
  }

  pdf.save(filename);
}

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
          await generateSmartPdf(resumeRef.current, '박창희_이력서.pdf');
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
          await generateSmartPdf(portfolioRef.current, '박창희_프로젝트_포트폴리오.pdf');
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
