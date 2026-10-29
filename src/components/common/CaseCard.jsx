import styles from './CaseCard.module.css';

const images = import.meta.glob('../../assets/images/*.{png,jpg,jpeg,webp}', { eager: true });

function getImage(key) {
  if (!key) return null;
  const match = Object.entries(images).find(([path]) => path.includes(`/${key}.`));
  return match ? match[1].default : null;
}

// 경력 케이스와 대표 프로젝트가 같은 틀(자동화 / 확인)로 읽히게 하는 카드
export default function CaseCard({ project, onOpen, showImage = false }) {
  const imageSrc = showImage ? getImage(project.thumbnail) : null;
  const { links = {} } = project;

  return (
    <article id={`case-${project.id}`} className={styles.card}>
      {imageSrc && (
        <button className={styles.image} onClick={onOpen} aria-label={`${project.title} 자세히 보기`}>
          <img src={imageSrc} alt="" loading="lazy" />
        </button>
      )}

      <div className={styles.body}>
        <header className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.meta}>{project.period} · {project.team}</p>
        </header>

        <p className={styles.summary}>{project.summary}</p>

        <div className={styles.columns}>
          <div>
            <span className={styles.label}>자동화</span>
            <ul className={styles.list}>
              {project.automation.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <span className={styles.label}>확인</span>
            <ul className={styles.list}>
              {project.verification.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        {project.quote && <blockquote className={styles.quote}>{project.quote}</blockquote>}

        <footer className={styles.footer}>
          <button className={styles.more} onClick={onOpen}>
            자세히 보기 <span aria-hidden="true">→</span>
          </button>
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className={styles.link}>Demo ↗</a>
          )}
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {links.githubLabel || 'GitHub'} ↗
            </a>
          )}
          <span className={styles.stack}>{project.techStack.slice(0, 5).join(' · ')}</span>
        </footer>
      </div>
    </article>
  );
}
