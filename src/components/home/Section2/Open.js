import styles from "@/styles/home/Section2.module.css";
import Link from "next/link";

export default function Open() {
  return (
    <>
      <h1>REGISTRATION OPEN ...</h1>
      <p>
        Attention, cosmic enthusiasts! The portal to our stellar quiz is now
        open for registration, beckoning the boldest space adventurers to embark
        on this extraordinary journey. While you await your chance to partake in
        this unparalleled event, seize the opportunity to delve deeper into the
        mysteries of the universe. Remember, every bit of knowledge you gather
        enhances your chances of triumphing in this cosmic quest. So, ready your
        star charts, fellow travelers, and brace yourselves for an epic odyssey
        among the stars!
      </p>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} href="/register">
          Register Now
        </Link>
        <Link className={styles.btn} href="/rules">
          Rules & Regulation
        </Link>
      </div>
    </>
  );
}
