import styles from "@/styles/home/Section4n5.module.css";
import Image from "next/image";

export default function Section4n5() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1>ICAS ...</h1>
        <p>
          I.C.A.S. (Isipathana College Astronomical Society) was founded in the
          year 2004. The association aims to develop the astronomical knowledge
          of Isipathana College students. They also hold various competitions to
          enhance the interest of Sri Lankan astronomy enthusiasts.
        </p>
        <div className={styles.social}>
          <a href="https://www.facebook.com/isipathana.astro" target="_blank">
            <Image
              className={styles.img}
              src="/assets/sicons/facebook.png"
              width={1000}
              height={1000}
              loading="lazy"
              alt="Facebook"
            />
          </a>
          <a href="https://www.instagram.com/isipathana.astro" target="_blank">
            <Image
              className={styles.img}
              src="/assets/sicons/instgram.png"
              width={1000}
              height={1000}
              loading="lazy"
              alt="Facebook"
            />
          </a>
          <a href="https://www.youtube.com/@isipathana-astro" target="_blank">
            <Image
              className={styles.img}
              src="/assets/sicons/youtube.png"
              width={1000}
              height={1000}
              loading="lazy"
              alt="Facebook"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
