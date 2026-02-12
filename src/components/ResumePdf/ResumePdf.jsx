import { forwardRef } from 'react';
import profile from '../../data/profile.json';
import projects from '../../data/projects.json';
import profileImage from '../../assets/images/profile.png';
import styles from './ResumePdf.module.css';

const ResumePdf = forwardRef(function ResumePdf(_, ref) {
  const { name, title, subtitle, contact, about, skills, experience, certificates, awards } = profile;

  return (
    <div ref={ref} className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header} data-pdf-avoid="">
        <img src={profileImage} alt={name} className={styles.profileImg} />
        <div className={styles.headerInfo}>
          <div className={styles.headerName}>{name}</div>
          <div className={styles.headerTitle}>{title}</div>
          <div className={styles.headerContact}>
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.github && <span>github.com/WindowisPark</span>}
          </div>
        </div>
      </div>

      {/* About */}
      <div className={styles.section} data-pdf-avoid="">
        <div className={styles.sectionTitle}>About</div>
        <p className={styles.aboutText}>{about.description}</p>
        <div className={styles.highlights}>
          {about.highlights.map((h, i) => (
            <span key={i} className={styles.highlightTag}>{h}</span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className={styles.section} data-pdf-avoid="">
        <div className={styles.sectionTitle}>Skills</div>
        {skills.map((group) => (
          <div key={group.category} className={styles.skillRow}>
            <span className={styles.skillCategory}>{group.category}</span>
            <span className={styles.skillItems}>{group.items.join(' / ')}</span>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Experience</div>
        {experience.map((item, i) => (
          <div key={i} className={styles.expItem} data-pdf-avoid="">
            <div className={styles.expHeader}>
              <span className={styles.expTitle}>{item.title}</span>
              <span className={styles.expPeriod}>{item.period}</span>
            </div>
            <div className={styles.expRole}>{item.role}</div>
            {item.description && <div className={styles.expDesc}>{item.description}</div>}
            {item.details.length > 0 && (
              <ul className={styles.expDetails}>
                {item.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* === Page 2: Projects === */}
      <div data-pdf-break="" />

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Projects</div>
        {projects.map((p) => (
          <div key={p.id} className={styles.project} data-pdf-avoid="">
            <div className={styles.projectHeader}>
              <span className={styles.projectTitle}>{p.title}</span>
              <span className={styles.projectMeta}>{p.period}</span>
            </div>
            <div className={styles.projectSubtitle}>{p.subtitle}</div>
            <div className={styles.projectRole}>{p.team} · {p.role}</div>
            <p className={styles.projectDesc}>{p.description}</p>
            {p.features.length > 0 && (
              <ul className={styles.projectFeatures}>
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            <div className={styles.projectTech}>
              <span className={styles.projectTechLabel}>Tech: </span>
              {p.techStack.join(', ')}
            </div>
          </div>
        ))}
      </div>

      {/* Awards & Certificates — compact */}
      {(awards?.length > 0 || certificates?.length > 0) && (
        <div className={styles.section} data-pdf-avoid="">
          {awards?.length > 0 && (
            <div className={styles.compactGroup}>
              <div className={styles.sectionTitle}>Awards</div>
              {awards.map((a, i) => (
                <div key={i} className={styles.compactItem}>
                  <span className={styles.compactName}>{a.name}</span>
                  <span className={styles.compactDate}>{a.date}</span>
                  {a.description && <span className={styles.compactDesc}> — {a.description}</span>}
                </div>
              ))}
            </div>
          )}

          {certificates?.length > 0 && (
            <div className={styles.compactGroup}>
              <div className={styles.sectionTitle}>Certificates</div>
              {certificates.map((c, i) => (
                <div key={i} className={styles.compactItem}>
                  <span className={styles.compactName}>{c.name}</span>
                  <span className={styles.compactDate}>{c.date} · {c.issuer}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default ResumePdf;
