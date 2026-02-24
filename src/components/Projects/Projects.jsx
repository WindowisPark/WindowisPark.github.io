import { useState, useMemo } from 'react';
import projects from '../../data/projects.json';
import SectionTitle from '../common/SectionTitle';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

const FILTERS = [
  { label: '전체', value: 'all' },
  { label: '개인 프로젝트', value: '개인' },
  { label: '팀 프로젝트', value: '팀' },
];

const SORTS = [
  { label: '최신순', value: 'newest' },
  { label: '오래된순', value: 'oldest' },
];

function parsePeriodStart(period) {
  const match = period.match(/^(\d{4})\.(\d{2})/);
  if (!match) return 0;
  return parseInt(match[1]) * 100 + parseInt(match[2]);
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  const displayed = useMemo(() => {
    let list = filter === 'all'
      ? projects
      : projects.filter((p) => p.team.includes(filter));

    return [...list].sort((a, b) => {
      const diff = parsePeriodStart(b.period) - parsePeriodStart(a.period);
      return sort === 'newest' ? diff : -diff;
    });
  }, [filter, sort]);

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <SectionTitle title="Projects" subtitle="프로젝트 포트폴리오" />

        <div className={styles.controls}>
          <div className={styles.chips}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`${styles.chip} ${filter === f.value ? styles.chipActive : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
                <span className={styles.chipCount}>
                  {f.value === 'all'
                    ? projects.length
                    : projects.filter((p) => p.team.includes(f.value)).length}
                </span>
              </button>
            ))}
          </div>

          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.grid}>
          {displayed.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
