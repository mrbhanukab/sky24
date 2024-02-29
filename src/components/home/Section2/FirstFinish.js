import React, { useState, useEffect } from "react";
import styles from "@/styles/home/Section2.module.css";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebase";
import Link from "next/link";

export default function First() {
  const [schools, setSchools] = useState(0);
  const [teams, setTeams] = useState(0);
  const [participants, setParticipants] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "system", "first");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSchools(data.participants || 0);
          setTeams(data.school || 0);
          setParticipants(data.teams || 0);
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
      <h1>First Round ...</h1>
      <p>
        Calling all cosmic voyagers! The gates to our celestial quiz are about
        to open, but only for the most intrepid space explorers. While you wait
        for your chance to join this exclusive event, use this time to chart
        your course through the cosmos. Remember, knowledge is power, and the
        competition will be fierce. So, gather your stardust, spacefarers, and
        prepare for a celestial showdown like no other!
      </p>
      <div className={styles.info}>
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
      </div>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} href="/firstRound">
          First Round Results
        </Link>
      </div>
    </>
  );
}
