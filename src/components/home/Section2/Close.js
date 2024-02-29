import styles from "@/styles/home/Section2.module.css";
import Link from "next/link";

export default function Close() {
  return (
    <>
      <h1>REGISTRATION CLOSE ...</h1>
      <p>
        To all cosmic contenders, heed this announcement! The gateway to our
        celestial challenge is now sealed, marking the commencement of the
        inaugural round. As the cosmic curtain rises, it's time for our intrepid
        explorers to showcase their cosmic prowess. Remember, the competition is
        fierce, and only the most astute will advance to the next phase. So,
        gather your cosmic courage, adventurers, and prepare to embark on this
        thrilling expedition through the cosmos!
      </p>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} href="/rules">
          Rules & Regulation
        </Link>
      </div>
    </>
  );
}
