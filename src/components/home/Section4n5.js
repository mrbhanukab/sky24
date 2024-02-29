import styles from "@/styles/home/Section4n5.module.css";

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
          <a
            href="https://www.facebook.com/isipathana.astro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.img}
              src="/assets/sicons/facebook.png"
              width={100}
              height={100}
              loading="lazy"
              alt="Facebook"
            />
          </a>
          <a
            href="https://www.instagram.com/isipathana.astro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.img}
              src="/assets/sicons/instgram.png"
              width={100}
              height={100}
              loading="lazy"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.youtube.com/@isipathana-astro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.img}
              src="/assets/sicons/youtube.png"
              width={100}
              height={100}
              loading="lazy"
              alt="Youtube"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
