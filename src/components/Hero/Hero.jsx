import profile from '../../data/profile.json';
import styles from './Hero.module.css';

export default function Hero() {
  const { name, title, subtitle, contact } = profile;

  return (
    <section id="hero" className={styles.hero}>
      {/* 배경 장식 요소 */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgGrid} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.textArea}>
          <p className={`${styles.greeting} ${styles.anim1}`}>안녕하세요,</p>
          <h1 className={`${styles.name} ${styles.anim2}`}>
            <span className={styles.nameHighlight}>{name}</span>
            입니다
          </h1>
          <h2 className={`${styles.title} ${styles.anim3}`}>{title}</h2>
          <p className={`${styles.subtitle} ${styles.anim4}`}>{subtitle}</p>

          <div className={`${styles.cta} ${styles.anim5}`}>
            <a href="#projects" className={styles.btnPrimary} onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              프로젝트 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className={styles.btnSecondary} onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              연락하기
            </a>
          </div>

          <div className={`${styles.social} ${styles.anim6}`}>
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 4L12 13 2 4"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className={`${styles.visual} ${styles.anim7}`}>
          <div className={styles.profileRing}>
            <div className={styles.profileCircle}>
              {profile.profileImage ? (
                <img src={profile.profileImage} alt={name} />
              ) : (
                <div className={styles.placeholder}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 21v-1a6 6 0 0112 0v1"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.scrollIndicator} ${styles.anim8}`}>
        <span>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
