import styles from "@/styles/register.module.css";
import Link from "next/link";

const Step5 = () => {
  return (
    <section className={styles.Step1}>
      <p className={styles.successP}>
        Congratulations! Your data has been successfully submitted to our
        database, officially enrolling you in our quiz. Stay updated with all
        notifications and alerts regarding the competition by following our
        WhatsApp channel. You'll receive all pertinent information through this
        channel. Get ready to embark on this exciting journey through the
        cosmos!
      </p>
      <Link
        className={styles.btn}
        href="https://www.youtube.com/@isipathana-astro"
      >
        Follow Our WhatsApp Channel
      </Link>
      <p className={styles.successP}>
        If you encounter any problems with submission or have inquiries about
        the event, please don't hesitate to contact us immediately. Your
        satisfaction and smooth participation are our utmost priorities, and
        we're here to assist you every step of the way. Reach out to us without
        delay, and we'll ensure your cosmic journey continues seamlessly!
      </p>
      <Link className={styles.btn} href="https://www.youtube.com/@isipathana-astro">
        Ginura Buddila(President)
      </Link>
      <Link className={styles.btn} href="https://www.youtube.com/@isipathana-astro">
        Suyama Janidu
      </Link>
      <Link className={styles.btn} href="https://www.youtube.com/@isipathana-astro">
        Sethum Hansana
      </Link>
      <Link className={styles.btn} href="https://www.youtube.com/@isipathana-astro">
        Vimeth Damhiru
      </Link>
    </section>
  );
};

export default Step5;
