import { useModeData } from '../../context/ModeContext';
import profileImage from '../../assets/images/profile.png';
import styles from './PortfolioPdf.module.css';

const diagramFiles = import.meta.glob('../../assets/images/diagrams/*.svg', { eager: true });
const imageFiles = import.meta.glob('../../assets/images/*.{png,jpg}', { eager: true });

function getDiagram(key) {
  if (!key) return null;
  const match = Object.entries(diagramFiles).find(([path]) => path.includes(`/${key}.`));
  return match ? match[1].default : null;
}

function getImage(key) {
  if (!key) return null;
  const match = Object.entries(imageFiles).find(([path]) => path.includes(`/${key}.`));
  return match ? match[1].default : null;
}

// 다이어그램이 없는 프로젝트는 대표 스크린샷으로 대체
function getFallbackImage(p) {
  if (p.diagram) return null;
  return getImage(p.images?.[0] || p.thumbnail);
}

export default function PortfolioPdf() {
  const { profile, projects } = useModeData();
  const { name, title, contact } = profile;

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header} data-pdf-avoid="">
        <img src={profileImage} alt={name} className={styles.profileImg} />
        <div className={styles.headerInfo}>
          <div className={styles.headerName}>{name}</div>
          <div className={styles.headerTitle}>{title} · 프로젝트 포트폴리오</div>
          <div className={styles.headerContact}>
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.github && <span>{contact.github.replace('https://', '')}</span>}
          </div>
        </div>
      </div>

      {/* Projects */}
      {projects.map((p, idx) => (
        <div key={p.id}>
          <div className={`${styles.project} ${idx > 0 ? styles.projectBreak : ''}`}>

            {/* 프로젝트 헤더 */}
            <div className={styles.projectHeader}>
              <div className={styles.projectTitleRow}>
                <span className={styles.projectNum}>{String(idx + 1).padStart(2, '0')}</span>
                <span className={styles.projectTitle}>{p.title}</span>
              </div>
              <span className={styles.projectMeta}>{p.period} · {p.team}</span>
            </div>
            <div className={styles.projectRole}>{p.role}</div>

            {/* 한 줄 요약 */}
            {p.summary && <p className={styles.projectSummary}>{p.summary}</p>}

            {/* 상황 */}
            {p.situation && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>상황</div>
                <p className={styles.fieldText}>{p.situation}</p>
              </div>
            )}

            {/* 판단 */}
            {p.judgment && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>판단</div>
                <p className={styles.fieldText}>{p.judgment}</p>
              </div>
            )}

            {/* 아키텍처 다이어그램 */}
            {p.diagram && getDiagram(p.diagram) && (
              <div className={styles.diagramField}>
                <div className={styles.fieldLabel}>아키텍처</div>
                <div className={styles.diagramImg}>
                  <img src={getDiagram(p.diagram)} alt={p.diagramCaption || '아키텍처'} />
                </div>
                {p.diagramCaption && (
                  <p className={styles.diagramCaption}>{p.diagramCaption}</p>
                )}
              </div>
            )}

            {/* 스크린샷 (다이어그램이 없을 때) */}
            {getFallbackImage(p) && (
              <div className={styles.diagramField}>
                <div className={styles.fieldLabel}>스크린샷</div>
                <div className={styles.diagramImg}>
                  <img src={getFallbackImage(p)} alt={`${p.title} 스크린샷`} className={styles.screenshotImg} />
                </div>
              </div>
            )}

            {/* 작업 */}
            {p.work && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>작업</div>
                <p className={styles.fieldText}>{p.work}</p>
              </div>
            )}

            {/* 결과와 회고 */}
            {p.outcome && (
              <div className={`${styles.field} ${styles.fieldResult}`}>
                <div className={styles.fieldLabelResult}>결과와 회고</div>
                <p className={styles.fieldText}>{p.outcome}</p>
              </div>
            )}

            {/* 리팩토링 진행 현황 (있을 때만) */}
            {p.refactoring && (
              <div className={`${styles.field} ${styles.fieldRefactoring}`}>
                <div className={styles.fieldLabelRefactoring}>리팩토링 진행 현황</div>
                <p className={styles.fieldText}>{p.refactoring}</p>
              </div>
            )}

            {/* 사용 기술 + GitHub 링크 */}
            <div className={styles.projectFooter}>
              <div className={styles.techBadges}>
                {p.techStack.map((tech) => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
              {p.links?.github && (
                <span className={styles.projectLink}>
                  GitHub: {p.links.github.replace('https://', '')}
                </span>
              )}
              {p.links?.report && (
                <span className={styles.projectLink}>
                  Report: {p.links.report.replace('https://', '')}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
