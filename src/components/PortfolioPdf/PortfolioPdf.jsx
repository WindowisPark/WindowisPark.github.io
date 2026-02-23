import { forwardRef } from 'react';
import profile from '../../data/profile.json';
import projects from '../../data/projects.json';
import profileImage from '../../assets/images/profile.png';
import styles from './PortfolioPdf.module.css';

const PortfolioPdf = forwardRef(function PortfolioPdf(_, ref) {
  const { name, title, contact } = profile;

  return (
    <div ref={ref} className={styles.wrapper}>
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
          {idx > 0 && idx % 2 === 0 && <div data-pdf-break="" />}
          <div className={styles.project} data-pdf-avoid="">

            {/* 프로젝트 헤더 */}
            <div className={styles.projectHeader}>
              <div className={styles.projectTitleRow}>
                <span className={styles.projectNum}>{String(idx + 1).padStart(2, '0')}</span>
                <span className={styles.projectTitle}>{p.title}</span>
              </div>
              <span className={styles.projectMeta}>{p.period} · {p.team}</span>
            </div>
            <div className={styles.projectRole}>{p.role}</div>

            {/* 문제 상황 */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>문제 상황</div>
              <p className={styles.fieldText}>{p.problem}</p>
            </div>

            {/* 설계 결정 */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>설계 결정</div>
              <p className={styles.fieldText}>{p.decision}</p>
            </div>

            {/* 결과 — 하이라이트 */}
            <div className={`${styles.field} ${styles.fieldResult}`}>
              <div className={styles.fieldLabelResult}>결과</div>
              <p className={styles.fieldText}>{p.result}</p>
            </div>

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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default PortfolioPdf;
