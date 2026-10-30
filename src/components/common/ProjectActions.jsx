import styles from './ProjectActions.module.css';

// 카드와 목록이 같은 순서·같은 이름으로 버튼을 쓰게 한다: 외부 링크(↗) 다음에 '자세히 보기'
export default function ProjectActions({ project, onOpen }) {
  const { links = {} } = project;

  return (
    <div className={styles.actions}>
      {links.demo && (
        <a href={links.demo} target="_blank" rel="noopener noreferrer" className={styles.link}>사이트 ↗</a>
      )}
      {links.report && (
        <a href={links.report} target="_blank" rel="noopener noreferrer" className={styles.link}>리포트 ↗</a>
      )}
      {links.github && (
        <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {links.githubLabel || 'GitHub'} ↗
        </a>
      )}
      {project.situation && (
        <button className={styles.more} onClick={onOpen}>자세히 보기</button>
      )}
    </div>
  );
}
