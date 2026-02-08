import profile from '../../data/profile.json';
import SectionTitle from '../common/SectionTitle';
import styles from './Experience.module.css';

export default function Experience() {
  const allItems = [
    ...profile.experience,
    ...(profile.certificates || []).map((c) => ({ ...c, type: 'certificate' })),
    ...(profile.awards || []).map((a) => ({ ...a, type: 'award' })),
  ];

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <SectionTitle title="Experience" subtitle="경력 · 교육 · 자격증 · 수상" />

        <div className={styles.timeline}>
          {profile.experience.map((item, i) => (
            <div key={`exp-${i}`} className={styles.item}>
              <div className={styles.marker}>
                <div className={styles.dot} />
                <div className={styles.line} />
              </div>
              <div className={styles.card}>
                <span className={styles.badge}>
                  {item.type === 'work' ? 'WORK' : 'EDUCATION'}
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.role}>{item.role}</p>
                <p className={styles.period}>{item.period}</p>
                <p className={styles.description}>{item.description}</p>
                {item.details.length > 0 && (
                  <ul className={styles.details}>
                    {item.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {(profile.certificates?.length > 0 || profile.awards?.length > 0) && (
          <div className={styles.extras}>
            {profile.awards?.length > 0 && (
              <div className={styles.extraGroup}>
                <h3 className={styles.extraTitle}>수상</h3>
                <div className={styles.extraCards}>
                  {profile.awards.map((a, i) => (
                    <div key={i} className={styles.extraCard}>
                      <span className={`${styles.badge} ${styles.badgeAward}`}>AWARD</span>
                      <h4>{a.name}</h4>
                      <p className={styles.extraDate}>{a.date}</p>
                      {a.description && <p className={styles.extraDesc}>{a.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.certificates?.length > 0 && (
              <div className={styles.extraGroup}>
                <h3 className={styles.extraTitle}>자격증</h3>
                <div className={styles.extraCards}>
                  {profile.certificates.map((c, i) => (
                    <div key={i} className={styles.extraCard}>
                      <span className={`${styles.badge} ${styles.badgeCert}`}>CERTIFICATE</span>
                      <h4>{c.name}</h4>
                      <p className={styles.extraDate}>{c.date} · {c.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
