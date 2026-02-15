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
            {contact.github && <span>github.com/WindowisPark</span>}
          </div>
        </div>
      </div>

      {/* Projects */}
      {projects.map((p, idx) => (
        <div key={p.id}>
          {idx > 0 && idx % 2 === 0 && <div data-pdf-break="" />}
          <div className={styles.project} data-pdf-avoid="">
            <div className={styles.projectHeader}>
              <span className={styles.projectTitle}>{p.title}</span>
              <span className={styles.projectMeta}>{p.period} · {p.team}</span>
            </div>
            <div className={styles.projectRole}>{p.role}</div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>문제 상황</div>
              <p className={styles.fieldText}>{p.problem}</p>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>설계 결정</div>
              <p className={styles.fieldText}>{p.decision}</p>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>결과</div>
              <p className={styles.fieldText}>{p.result}</p>
            </div>

            <div className={styles.techRow}>
              <span className={styles.techLabel}>사용 기술</span>
              <span className={styles.techItems}>{p.techStack.join(' / ')}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default PortfolioPdf;
