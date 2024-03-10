import styles from "@/styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://www.youtube.com/@isipathana-astro" target="_blank">
        Youtube
      </a>
      &nbsp;|&nbsp;
      <a href="https://www.instagram.com/isipathana.astro" target="_blank">
        Instagram
      </a>
      &nbsp;|&nbsp;
      <a href="https://www.facebook.com/isipathana.astro" target="_blank">
        Facebook
      </a>
      &nbsp;|&nbsp;
      <a href="https://github.com/mrbhanukab" target="_blank">
        Developer
      </a>
    </footer>
  );
}
