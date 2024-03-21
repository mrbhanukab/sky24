import React, { useState, useEffect } from "react";
import styles from "@/styles/index.module.css";
import Link from "next/link";

export default function First() {
  // const [schools, setSchools] = useState(0);

  return (
    <>
      <h1>FIRST ROUND RESULT ...</h1>
      <p>
        To all cosmic contenders, the moment of reckoning has arrived! With the
        conclusion of the first round comes the revelation of our stellar
        frontrunners. As the cosmic dust settles, we congratulate those who have
        emerged victorious and earned their rightful place in the final
        showdown. Brace yourselves, finalists, for the ultimate test of cosmic
        acumen awaits. May the stars align in your favor as you embark on this
        thrilling voyage toward celestial triumph!
      </p>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} href="/round/firstRound">
          First Round Results
        </Link>
      </div>
    </>
  );
}
