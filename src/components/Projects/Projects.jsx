import { useState } from 'react';
import projects from '../../data/projects.json';
import SectionTitle from '../common/SectionTitle';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <SectionTitle title="Projects" subtitle="프로젝트 포트폴리오" />

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
