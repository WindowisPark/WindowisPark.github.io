import { useModeData } from '../../context/ModeContext';
import SectionTitle from '../common/SectionTitle';
import styles from './Background.module.css';

export default function Background() {
  const { profile } = useModeData();
  const { skills, certificates = [], awards = [], activities = [] } = profile;
  const education = profile.experience.filter((e) => e.type === 'education');

  return (
    <section id="background" className={styles.section}>
      <div className="container">
        <SectionTitle index="03" title="Background" subtitle="학력 · 기술 · 자격 · 수상 · 활동" />

        <dl className={styles.rows}>
          <div className={styles.row}>
            <dt>학력</dt>
            <dd>
              {education.map((e) => (
                <div key={e.title} className={styles.item}>
                  <span className={styles.itemTitle}>{e.title}</span>
                  <span className={styles.itemSub}>{e.role}</span>
                  {e.details.length > 0 && <span className={styles.itemSub}>{e.details.join(' · ')}</span>}
                  <span className={styles.itemMeta}>{e.period} · {e.description}</span>
                </div>
              ))}
            </dd>
          </div>

          <div className={styles.row}>
            <dt>기술</dt>
            <dd>
              {skills.map((s) => (
                <div key={s.category} className={styles.skill}>
                  <span className={styles.skillCategory}>{s.category}</span>
                  <span>{s.items.join(' · ')}</span>
                </div>
              ))}
            </dd>
          </div>

          <div className={styles.row}>
            <dt>자격증</dt>
            <dd>
              {certificates.map((c) => (
                <div key={c.name} className={styles.item}>
                  <span className={styles.itemTitle}>{c.name}</span>
                  <span className={styles.itemMeta}>{c.date} · {c.issuer} · {c.status}</span>
                </div>
              ))}
            </dd>
          </div>

          <div className={styles.row}>
            <dt>수상</dt>
            <dd>
              {awards.map((a) => (
                <div key={a.name} className={styles.item}>
                  <span className={styles.itemTitle}>{a.name}</span>
                  <span className={styles.itemSub}>{a.description}</span>
                  <span className={styles.itemMeta}>{a.date}</span>
                </div>
              ))}
            </dd>
          </div>

          <div className={styles.row}>
            <dt>활동</dt>
            <dd>
              {activities.map((a) => (
                <div key={a.name} className={styles.item}>
                  <span className={styles.itemTitle}>{a.name}</span>
                  <span className={styles.itemSub}>{a.description}</span>
                  <span className={styles.itemMeta}>{a.period}</span>
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
