import { useModeData } from '../../context/ModeContext';
import profileImage from '../../assets/images/profile.png';
import styles from './Hero.module.css';

// 헤드라인에서 강조할 구절
const EMPHASIS = /(자동화|숫자로 확인)/;

function scrollToId(e, id) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const { profile } = useModeData();
  const { name, title, subtitle, proofs, contact } = profile;

  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <img src={profileImage} alt={name} className={styles.avatar} />
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.role}>{title}</p>
          </div>
        </div>

        <h1 className={styles.headline}>
          {subtitle.split(EMPHASIS).map((part, i) =>
            EMPHASIS.test(part) ? <em key={i}>{part}</em> : part
          )}
        </h1>

        <ol className={styles.proofs}>
          {proofs.map((p, i) => (
            <li key={p.target}>
              <a href={`#case-${p.target}`} onClick={(e) => scrollToId(e, `case-${p.target}`)}>
                <span className={styles.proofMeta}>
                  <span className={styles.proofIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {p.source}
                </span>
                <span className={styles.proofText}>{p.text}</span>
                <span className={styles.proofArrow} aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ol>

        <div className={styles.links}>
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
          {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
          <a href="/commit-blog">Dev Log</a>
        </div>
      </div>
    </section>
  );
}
