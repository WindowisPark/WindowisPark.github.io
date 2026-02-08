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
          </div>
        </div>
      </div>
    </section>
  );
}
