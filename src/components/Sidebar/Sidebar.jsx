import styles from './Sidebar.module.css';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Sidebar({ activeSection }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className={styles.sidebar}>
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.dot} ${activeSection === id ? styles.active : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={label}
        >
          <span className={styles.tooltip}>{label}</span>
        </button>
      ))}
    </aside>
  );
}
