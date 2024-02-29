import React, { useState, useEffect } from "react";
import styles from "@/styles/home/Section2.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebase";
import Link from "next/link";

export default function Final() {
  const [finalTeams, setFinalTeams] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "system", "final");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFinalTeams(data.finalist || 0);
          setTotalTeams(data.total || 0);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>FINAL ROUND RESULT ...</h1>
      <p>
        To all cosmic adventurers, our journey among the stars has drawn to a
        close, culminating in the announcement of our celestial champions. With
        hearts full of cosmic wonder, we applaud the stellar efforts of all
        participants who made this event an unforgettable cosmic spectacle.
        Congratulations to our victors, whose names shall be etched among the
        stars as beacons of cosmic excellence. As we bid farewell to this
        extraordinary voyage, let us cherish the memories forged and carry the
        spirit of cosmic exploration in our hearts until we meet again among the
        stars!
      </p>
      <div className={styles.info}>
        <div className={styles.infoCard}>
          <h4>{finalTeams}</h4>
          <h5>final teams</h5>
        </div>
        <div className={styles.infoCard}>
          <h5>Selected From</h5>
        </div>
        <div className={styles.infoCard}>
          <h4>{totalTeams} +</h4>
          <h5>teams</h5>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} href="/finalRound">
          Final Round Results
        </Link>
      </div>
    </>
  );
}
