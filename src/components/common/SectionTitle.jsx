import styles from './SectionTitle.module.css';

export default function SectionTitle({ index, title, subtitle }) {
  return (
    <div className={styles.wrapper}>
      {index && <span className={styles.index}>{index}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
