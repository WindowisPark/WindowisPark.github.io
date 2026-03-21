import { createContext, useContext } from 'react';

import profile from '../data/profile-backend.json';
import projects from '../data/projects-backend.json';

const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  return (
    <ModeContext.Provider value={{ profile, projects }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useModeData() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useModeData must be used within ModeProvider');
  return ctx;
}
