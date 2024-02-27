import styles from "@/styles/home/Section2.module.css";
import Link from "next/link";
export default function FinalFinish() {
  return (
    <>
      <h1>Final Round ...</h1>
      <p>
        Calling all cosmic voyagers! The gates to our celestial quiz are about
        to open, but only for the most intrepid space explorers. While you wait
        for your chance to join this exclusive event, use this time to chart
        your course through the cosmos. Remember, knowledge is power, and the
        competition will be fierce. So, gather your stardust, spacefarers, and
        prepare for a celestial showdown like no other!
      </p>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} href="/finalRound">
          Final Round Results
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.infoCard}>
          <h4>10</h4>
          <h5>final teams</h5>
        </div>
        <div className={styles.infoCard}>
          <h5>Selected From</h5>
        </div>
        <div className={styles.infoCard}>
          <h4>40+</h4>
          <h5>teams</h5>
        </div>
      </div>
    </>
  );
}
