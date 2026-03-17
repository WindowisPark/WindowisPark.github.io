import { createContext, useContext } from 'react';
import useMode from '../hooks/useMode';

import profileBackend from '../data/profile-backend.json';
import profileBuilder from '../data/profile-builder.json';
import projectsBackend from '../data/projects-backend.json';
import projectsBuilder from '../data/projects-builder.json';

const DATA = {
  backend: { profile: profileBackend, projects: projectsBackend },
  builder: { profile: profileBuilder, projects: projectsBuilder },
};

const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [mode, toggleMode] = useMode();
  const { profile, projects } = DATA[mode];

  return (
    <ModeContext.Provider value={{ mode, toggleMode, profile, projects }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useModeData() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useModeData must be used within ModeProvider');
  return ctx;
}
