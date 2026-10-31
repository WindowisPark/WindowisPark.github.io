import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useScrollSpy from './hooks/useScrollSpy';
import { useModeData } from './context/ModeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Work from './components/Work/Work';
import Projects from './components/Projects/Projects';
import ProjectModal from './components/Projects/ProjectModal';
import Background from './components/Background/Background';
import Contact from './components/Contact/Contact';
import ScrollToTop from './components/common/ScrollToTop';
import ResumePdf from './components/ResumePdf/ResumePdf';
import PortfolioPdf from './components/PortfolioPdf/PortfolioPdf';

const SECTIONS = ['hero', 'work', 'projects', 'background', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTIONS);

  // Work와 Projects가 같은 상세 모달을 공유
  const { projects } = useModeData();
  const [openProject, setOpenProject] = useState(null);

  // 상세 모달은 #case-<slug> 주소와 함께 열고 닫아서, 케이스별 링크로 바로 들어올 수 있게
  const handleOpenProject = useCallback((project) => {
    history.replaceState(null, '', `#case-${project.slug}`);
    setOpenProject(project);
  }, []);
  const handleCloseProject = useCallback(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setOpenProject(null);
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.match(/^#case-(.+)$/)?.[1];
      const project = projects.find((p) => p.slug === slug);
      if (!project) return;
      document.getElementById(`case-${slug}`)?.scrollIntoView();
      setOpenProject(project);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [projects]);

  // Print target: 'resume' | 'portfolio' | null
  const [printTarget, setPrintTarget] = useState(null);

  const handleDownloadResume = useCallback(() => setPrintTarget('resume'), []);
  const handleDownloadPortfolio = useCallback(() => setPrintTarget('portfolio'), []);

  // Trigger browser print when printTarget is set
  useEffect(() => {
    if (!printTarget) return;

    // 저장 파일명이 document.title을 따르므로 인쇄 동안만 교체
    const prevTitle = document.title;
    document.title = printTarget === 'resume' ? '박창희_이력서' : '박창희_프로젝트_포트폴리오';

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
      document.title = prevTitle;
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
      <main>
        <Hero />
        <Work onOpen={handleOpenProject} />
        <Projects onOpen={handleOpenProject} />
        <Background />
        <Contact />
      </main>
      {openProject && <ProjectModal project={openProject} onClose={handleCloseProject} />}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} 박창희. All rights reserved.</p>
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
