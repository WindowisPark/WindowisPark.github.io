import styles from './Projects.module.css';

const thumbnails = import.meta.glob('../../assets/images/*.{png,jpg,jpeg,webp}', { eager: true });

function getThumbnail(key) {
  if (!key) return null;
  const match = Object.entries(thumbnails).find(([path]) => path.includes(`/${key}.`));
  return match ? match[1].default : null;
}

export default function ProjectCard({ project, onClick }) {
  const thumbSrc = getThumbnail(project.thumbnail);

  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.cardThumb}>
        {thumbSrc ? (
          <img src={thumbSrc} alt={project.title} />
        ) : (
          <div className={styles.cardPlaceholder}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        <div className={styles.cardOverlay}>
          <span>자세히 보기</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardSubtitle}>{project.subtitle}</p>

        <div className={styles.cardMeta}>
          <span>{project.period}</span>
          <span>{project.team}</span>
        </div>

        <div className={styles.cardTags}>
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className={styles.cardTag}>{tech}</span>
          ))}
          {project.techStack.length > 4 && (
            <span className={styles.cardTag}>+{project.techStack.length - 4}</span>
          )}
        </div>
      </div>
    </article>
  );
}
