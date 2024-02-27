import styles from "@/styles/home/Section1.module.css";
import Image from "next/image";

export default function Section1() {
  return (
    <section className={styles.section}>
      <div className={styles.schoolContainer}>
        <Image
          className={styles.Particals}
          src="/assets/Particals.png  "
          width={1000}
          height={1000}
          loading="lazy"
          alt="Particals.png"
        />
        <h3>Isipathana College Astronomy Society</h3>
        <Image
          className={styles.school}
          src="/assets/School-Logo.png  "
          width={1000}
          height={1000}
          loading="lazy"
          alt="School-Logo.png"
        />
      </div>
      <Image
        className={styles.logo}
        src="/assets/Sky Logo.png  "
        width={1000}
        height={1000}
        loading="lazy"
        alt="Sky Logo.png"
      />
      <p className={styles.text}>Scroll Down ↓</p>
      {/* <Image
        className={styles.bgTop}
        src="/assets/Bg-Top.png  "
        width={4000}
        height={4000}
        loading="lazy"
        alt="Bg-Top.png"
      /> */}
    </section>
  );
}
