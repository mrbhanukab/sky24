import styles from "@/styles/home/Section2.module.css";
import Link from "next/link";

export default function Open() {
  return (
    <>
      <h1>REGISTRATION OPEN</h1>
      <p>
        Calling all cosmic voyagers! The gates to our celestial quiz are about
        to open, but only for the most intrepid space explorers. While you wait
        for your chance to join this exclusive event, use this time to chart
        your course through the cosmos. Remember, knowledge is power, and the
        competition will be fierce. So, gather your stardust, spacefarers, and
        prepare for a celestial showdown like no other!
      </p>
      <div className={styles.btnGroup}>
        <Link className={styles.btn}  href="/register">
          Register Now
        </Link>
        <Link className={styles.btn} href="/rules">Rules & Regulation</Link>
      </div>
    </>
  );
}
