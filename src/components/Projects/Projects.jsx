import { useModeData } from '../../context/ModeContext';
import SectionTitle from '../common/SectionTitle';
import CaseCard from '../common/CaseCard';
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
            <li key={p.id} id={`case-${p.id}`} className={styles.other}>
              <span className={styles.otherPeriod}>{p.period}</span>
              <div className={styles.otherMain}>
                <span className={styles.otherName}>{p.title}</span>
                <span className={styles.otherDesc}>{p.oneLiner}</span>
              </div>
              <div className={styles.otherLinks}>
                {p.situation && (
                  <button onClick={() => onOpen(p)}>자세히</button>
                )}
                {p.links?.report && (
                  <a href={p.links.report} target="_blank" rel="noopener noreferrer">리포트 ↗</a>
                )}
                {p.links?.github && (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                )}
                {p.links?.demo && (
                  <a href={p.links.demo} target="_blank" rel="noopener noreferrer">바로가기 ↗</a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
