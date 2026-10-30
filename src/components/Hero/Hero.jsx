import { useModeData } from '../../context/ModeContext';
import profileImage from '../../assets/images/profile.png';
import Pipeline from './Pipeline';
import styles from './Hero.module.css';

// 헤드라인에서 강조할 구절
const EMPHASIS = /(자동화|숫자로 확인)/;

function emphasize(text) {
  return text.split(EMPHASIS).map((part, i) => (EMPHASIS.test(part) ? <em key={i}>{part}</em> : part));
}

function scrollToId(e, id) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const { profile } = useModeData();
  const { name, title, affiliation, subtitle, proofs, contact } = profile;
  // 쉼표에서 줄을 바꿔 의미 단위로 끊기게
  const [firstClause, ...restClauses] = subtitle.split(', ');

  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.role}>{title}</p>
            {affiliation && <p className={styles.affiliation}>{affiliation}</p>}

            <h1 className={styles.headline}>
              {emphasize(firstClause)}
              {restClauses.length > 0 && <>,<br />{emphasize(restClauses.join(', '))}</>}
            </h1>

            <Pipeline />
          </div>

          <div className={styles.photo}>
            <img src={profileImage} alt={name} />
          </div>
        </div>

        <ul className={styles.proofs}>
          {proofs.map((p) => (
            <li key={p.target}>
              <a href={`#case-${p.target}`} onClick={(e) => scrollToId(e, `case-${p.target}`)}>
                <span className={styles.proofSource}>{p.source}</span>
                <span className={styles.proofText}>{p.text}</span>
              </a>
            </li>
          ))}
        </ul>

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
