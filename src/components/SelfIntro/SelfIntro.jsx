import profile from '../../data/profile.json';
import SectionTitle from '../common/SectionTitle';
import styles from './SelfIntro.module.css';

export default function SelfIntro() {
  const { selfIntro } = profile;

  return (
    <section id="selfintro" className={styles.section}>
      <div className="container">
        <SectionTitle title="Self Intro" subtitle="저는 이런 사람입니다" />

        <div className={styles.content}>
          {selfIntro.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.questionRow}>
                <span className={styles.qNumber}>Q{i + 1}.</span>
                <h3 className={styles.question}>{item.question}</h3>
              </div>
              <p className={styles.answer}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
