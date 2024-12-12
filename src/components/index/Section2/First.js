import React, { useState, useEffect } from "react";
import styles from "@/styles/index.module.css";

export default function First() {
  const [schools, setSchools] = useState(0);
  const [teams, setTeams] = useState(0);
  const [participants, setParticipants] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your JSON data
        const data = {
          school: 10,
          teams: 50,
          participants: 200,
        };
        setSchools(data.school || 0);
        setTeams(data.teams || 0);
        setParticipants(data.participants || 0);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>FIRST ROUND STARTED ...</h1>
      <p>
        Attention, celestial adventurers! The journey through our cosmic
        challenge has officially begun with the commencement of the first round.
        As our brave spacefarers navigate the celestial terrain, the atmosphere
        crackles with anticipation and excitement. Every question posed is a
        stepping stone toward cosmic glory, and every answer brings us closer to
        uncovering the brightest minds among the stars. So, focus your cosmic
        energies, participants, and forge ahead with determination!
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
    </>
  );
}