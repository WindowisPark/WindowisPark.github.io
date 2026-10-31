import { useModeData } from '../../context/ModeContext';
import SectionTitle from '../common/SectionTitle';
import CaseCard from '../common/CaseCard';
import ProjectActions from '../common/ProjectActions';
import styles from './Projects.module.css';

export default function Projects({ onOpen }) {
  const { projects } = useModeData();
  const selected = projects.filter((p) => p.section === 'selected');
  const others = projects.filter((p) => p.section === 'other');

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <SectionTitle index="02" title="Projects" subtitle="경력 밖에서, 같은 방식으로 만든 것" />

        <div className={styles.selected}>
          {selected.map((p) => (
            <CaseCard key={p.id} project={p} onOpen={() => onOpen(p)} showImage />
          ))}
        </div>

        <h3 className={styles.othersTitle}>그 외</h3>
        <ul className={styles.others}>
          {others.map((p) => (
            <li key={p.id} id={`case-${p.slug}`} className={styles.other}>
              <span className={styles.otherPeriod}>{p.period}</span>
              <div className={styles.otherMain}>
                <span className={styles.otherName}>{p.title}</span>
                <span className={styles.otherDesc}>{p.oneLiner}</span>
              </div>
              <ProjectActions project={p} onOpen={() => onOpen(p)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
