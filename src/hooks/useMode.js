import { useState, useEffect } from 'react';

function getInitialMode() {
  // URL 파라미터 우선
  const params = new URLSearchParams(window.location.search);
  const urlMode = params.get('mode');
  if (urlMode === 'builder' || urlMode === 'backend') return urlMode;

  // localStorage 폴백
  const saved = localStorage.getItem('portfolioMode');
  if (saved === 'builder' || saved === 'backend') return saved;

  return 'backend';
}

export default function useMode() {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('portfolioMode', mode);
  }, [mode]);

  const toggleMode = () => setMode((prev) => (prev === 'builder' ? 'backend' : 'builder'));

  return [mode, toggleMode];
}
