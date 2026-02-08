import profile from '../../data/profile.json';
import SectionTitle from '../common/SectionTitle';
import styles from './Contact.module.css';

export default function Contact() {
  const { contact } = profile;

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <SectionTitle title="Contact" subtitle="연락처" />

        <div className={styles.content}>
          <p className={styles.description}>
            프로젝트에 관심이 있으시거나 함께 일하고 싶으시다면 편하게 연락해 주세요.
          </p>

          <div className={styles.cards}>
            {contact.email && (
              <a href={`mailto:${contact.email}`} className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 4L12 13 2 4"/>
                  </svg>
                </div>
                <span className={styles.cardLabel}>Email</span>
                <span className={styles.cardValue}>{contact.email}</span>
              </a>
            )}

            {contact.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <span className={styles.cardLabel}>GitHub</span>
                <span className={styles.cardValue}>WindowisPark</span>
              </a>
            )}

            {contact.phone && (
              <a href={`tel:${contact.phone}`} className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <span className={styles.cardLabel}>Phone</span>
                <span className={styles.cardValue}>{contact.phone}</span>
              </a>
            )}

            {contact.blog && (
              <a href={contact.blog} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                  </svg>
                </div>
                <span className={styles.cardLabel}>Tistory</span>
                <span className={styles.cardValue}>jose5744</span>
              </a>
            )}

            {contact.velog && (
              <a href={contact.velog} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553.465-.66.893-1.418 1.283-2.273.405-.855.608-1.62.608-2.295 0-.405-.113-.727-.338-.968-.21-.255-.608-.577-1.193-.968.705-.33 1.238-.51 1.598-.51.36 0 .705.18 1.035.54.345.345.518.855.518 1.53 0 1.29-.608 2.805-1.823 4.545-.405.585-1.253 1.71-2.543 3.378l-1.838.03L8.21 8.005c-.285.705-.54 1.29-.765 1.755l-1.34 2.843-.6-.225c.63-2.22 1.118-4.215 1.463-5.985.12-.63.18-1.065.18-1.305 0-.27-.075-.48-.225-.63-.15-.165-.42-.345-.81-.54.42-.36.81-.54 1.17-.54l-.4-.128z"/>
                  </svg>
                </div>
                <span className={styles.cardLabel}>Velog</span>
                <span className={styles.cardValue}>bomboychang</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
