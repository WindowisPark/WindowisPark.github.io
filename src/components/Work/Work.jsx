import { useModeData } from '../../context/ModeContext';
import SectionTitle from '../common/SectionTitle';
import CaseCard from '../common/CaseCard';
import styles from './Work.module.css';

export default function Work({ onOpen }) {
  const { profile, projects } = useModeData();
  const companies = profile.experience.filter((e) => e.type === 'work');

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <SectionTitle index="01" title="Work" subtitle="경력 안에서 자동화하고, 숫자로 확인한 것" />

        <div className={styles.companies}>
          {companies.map((c) => (
            <div key={c.org} className={styles.company}>
              <div className={styles.companyMeta}>
                <h3 className={styles.companyName}>{c.title}</h3>
                <p className={styles.role}>{c.role}</p>
                <p className={styles.period}>{c.period}</p>
                {c.employment && <p className={styles.period}>{c.employment}</p>}
              </div>

              <div className={styles.cases}>
                {projects
                  .filter((p) => p.section === 'work' && p.org === c.org)
                  .map((p) => (
                    <CaseCard key={p.id} project={p} onOpen={() => onOpen(p)} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
