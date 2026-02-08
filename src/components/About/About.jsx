import profile from '../../data/profile.json';
import SectionTitle from '../common/SectionTitle';
import styles from './About.module.css';

export default function About() {
  const { about } = profile;

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <SectionTitle title="About" subtitle="저를 소개합니다" />

        <div className={styles.content}>
          <p className={styles.description}>{about.description}</p>

          <div className={styles.highlights}>
            {about.highlights.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className={styles.cardText}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
