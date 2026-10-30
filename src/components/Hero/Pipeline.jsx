import { Fragment, useEffect, useState } from 'react';
import styles from './Pipeline.module.css';

const STEPS = ['수집', '실행', '검증', '알림'];
const TICK_MS = 900;
// 끝까지 완료된 상태를 몇 틱 보여준 뒤 처음부터 다시
const HOLD_TICKS = 3;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// 자동화가 단계별로 돌고 확인되는 모습을 보여주는 장식용 애니메이션
export default function Pipeline() {
  const [tick, setTick] = useState(() => (prefersReducedMotion() ? STEPS.length : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setTick((t) => (t + 1) % (STEPS.length + HOLD_TICKS)), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const current = Math.min(tick, STEPS.length);

  return (
    <div className={styles.pipe} role="img" aria-label="자동화 파이프라인: 수집, 실행, 검증, 알림">
      <span className={styles.label}>daily run</span>
      {STEPS.map((step, i) => (
        <Fragment key={step}>
          {i > 0 && <span className={`${styles.link} ${i <= current ? styles.linkOn : ''}`} />}
          <span className={`${styles.step} ${i < current ? styles.done : ''} ${i === current ? styles.run : ''}`}>
            <span className={styles.dot} aria-hidden="true">✓</span>
            {step}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
