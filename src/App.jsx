import { useEffect } from 'react';
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

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTIONS);

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

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <Sidebar activeSection={activeSection} />
      <main>
        <Hero />
        <div className="fade-in"><About /></div>
        <div className="fade-in"><Skills /></div>
        <div className="fade-in"><Experience /></div>
        <div className="fade-in"><Projects /></div>
        <div className="fade-in"><Contact /></div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
      <ScrollToTop />
    </>
  );
}
