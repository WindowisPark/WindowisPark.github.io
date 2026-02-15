import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Projects.module.css';

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?#]+)/);
  return match ? match[1] : null;
}

const thumbnails = import.meta.glob('../../assets/images/*.{png,jpg,jpeg,webp}', { eager: true });

function getThumbnail(key) {
  if (!key) return null;
  const match = Object.entries(thumbnails).find(([path]) => path.includes(`/${key}.`));
  return match ? match[1].default : null;
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const ytId = getYouTubeId(project.links?.video);
  const thumbSrc = getThumbnail(project.thumbnail);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {thumbSrc && (
          <div className={styles.modalThumb}>
            <img src={thumbSrc} alt={project.title} />
          </div>
        )}

        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{project.title}</h2>

          <div className={styles.modalMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>기간</span>
              <span>{project.period}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>팀 구성</span>
              <span>{project.team}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>역할</span>
              <span>{project.role}</span>
            </div>
          </div>

          {project.problem && (
            <div className={styles.modalSection}>
              <h3>문제 상황</h3>
              <p>{project.problem}</p>
            </div>
          )}

          {project.decision && (
            <div className={styles.modalSection}>
              <h3>설계 결정</h3>
              <p>{project.decision}</p>
            </div>
          )}

          {project.result && (
            <div className={styles.modalSection}>
              <h3>결과</h3>
              <p>{project.result}</p>
            </div>
          )}

          <div className={styles.modalSection}>
            <h3>사용 기술</h3>
            <div className={styles.modalTags}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.modalTag}>{tech}</span>
              ))}
            </div>
          </div>

          {ytId && (
            <div className={styles.modalSection}>
              <h3>시연 영상</h3>
              <div className={styles.videoWrapper}>
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title="프로젝트 시연 영상"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className={styles.modalLinks}>
            {project.links?.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.links?.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Demo
              </a>
            )}
            {project.links?.video && !ytId && (
              <a href={project.links.video} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Video
              </a>
            )}
            {project.links?.ppt && (
              <a href={project.links.ppt} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                PPT / PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
