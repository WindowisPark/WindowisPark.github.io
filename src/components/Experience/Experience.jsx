import profile from '../../data/profile.json';
import SectionTitle from '../common/SectionTitle';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <SectionTitle title="Experience" subtitle="경력 & 교육" />

        <div className={styles.timeline}>
          {profile.experience.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.marker}>
                <div className={styles.dot} />
                {i < profile.experience.length - 1 && <div className={styles.line} />}
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
      </div>
    </section>
  );
}
