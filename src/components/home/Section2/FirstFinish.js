import React, { useState, useEffect } from "react";
import styles from "@/styles/home/Section2.module.css";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebase";
import Link from "next/link";

export default function First() {
  // const [schools, setSchools] = useState(0);
  // const [teams, setTeams] = useState(0);
  // const [participants, setParticipants] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const docRef = doc(db, "system", "first");
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         const data = docSnap.data();
  //         setSchools(data.participants || 0);
  //         setTeams(data.school || 0);
  //         setParticipants(data.teams || 0);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } catch (error) {
  //       console.error("Error getting document:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
        <Link className={styles.btn} href="/firstRound">
          First Round Results
        </Link>
      </div>
      {/* <div className={styles.info}>
        <div className={styles.infoCard}>
          <h4>{schools} +</h4>
          <h5>schools</h5>
        </div>
        <div className={styles.infoCard}>
          <h4>{teams} +</h4>
          <h5>teams</h5>
        </div>
        <div className={styles.infoCard}>
          <h4>{participants} +</h4>
          <h5>participants</h5>
        </div>
      </div> */}
    </>
  );
}
