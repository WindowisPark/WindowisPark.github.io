import profile from '../../data/profile.json';
import profileImage from '../../assets/images/profile.png';
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 4L12 13 2 4"/>
                </svg>
                <span>Email</span>
              </a>
            )}
            {contact.blog && (
              <a href={contact.blog} target="_blank" rel="noopener noreferrer" aria-label="Tistory">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                </svg>
                <span>Tistory</span>
              </a>
            )}
            {contact.velog && (
              <a href={contact.velog} target="_blank" rel="noopener noreferrer" aria-label="Velog">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553.465-.66.893-1.418 1.283-2.273.405-.855.608-1.62.608-2.295 0-.405-.113-.727-.338-.968-.21-.255-.608-.577-1.193-.968.705-.33 1.238-.51 1.598-.51.36 0 .705.18 1.035.54.345.345.518.855.518 1.53 0 1.29-.608 2.805-1.823 4.545-.405.585-1.253 1.71-2.543 3.378l-1.838.03L8.21 8.005c-.285.705-.54 1.29-.765 1.755l-1.34 2.843-.6-.225c.63-2.22 1.118-4.215 1.463-5.985.12-.63.18-1.065.18-1.305 0-.27-.075-.48-.225-.63-.15-.165-.42-.345-.81-.54.42-.36.81-.54 1.17-.54l-.4-.128z"/>
                </svg>
                <span>Velog</span>
              </a>
            )}
          </div>
        </div>

        <div className={`${styles.visual} ${styles.anim7}`}>
          <div className={styles.profileRing}>
            <div className={styles.profileCircle}>
              <img src={profileImage} alt={name} />
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
