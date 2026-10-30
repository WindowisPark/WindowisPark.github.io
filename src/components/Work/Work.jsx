import { useModeData } from '../../context/ModeContext';
import SectionTitle from '../common/SectionTitle';
import CaseCard from '../common/CaseCard';
import styles from './Work.module.css';

// "주식회사 그린리본 (GREEN-RIBBON Corp.)" → 이름과 괄호 속 영문을 나눠 좁은 칸에서도 깔끔하게
function splitCompanyName(title) {
  const match = title.match(/^(.*?)\s*\((.+)\)$/);
  return match ? { name: match[1], alias: match[2] } : { name: title, alias: null };
}

export default function Work({ onOpen }) {
  const { profile, projects } = useModeData();
  const companies = profile.experience.filter((e) => e.type === 'work');

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <SectionTitle index="01" title="Work" subtitle="경력 안에서 자동화하고, 숫자로 확인한 것" />

        <div className={styles.companies}>
          {companies.map((c) => {
            const { name, alias } = splitCompanyName(c.title);
            return (
              <div key={c.org} className={styles.company}>
                <div className={styles.companyMeta}>
                  <h3 className={styles.companyName}>{name}</h3>
                  {alias && <p className={styles.alias}>{alias}</p>}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
