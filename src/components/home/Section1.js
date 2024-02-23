import styles from "@/styles/home/Section1.module.css";

export default function Section1() {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <div className={styles.environment} />
        <div className={styles.maintext}>
        <h2
          className={`${styles.hero} ${styles.glitch} ${styles.layers}`}
          data-text="SKY `24"
        >
          <span>SKY `24</span>
        </h2>
        <h3>by Isipathana College<br />Astronomy Society</h3>
        </div>
        <p className={styles.text}>Scroll Down ↓</p>
      </div>
    </section>
  );
}
