import React, { useState, useEffect } from "react";
import styles from "@/styles/index.module.css";

export default function Final() {
  const [finalTeams, setFinalTeams] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your JSON data
        const data = {
          finalist: 5,
          total: 50,
        };
        setFinalTeams(data.finalist || 0);
        setTotalTeams(data.total || 0);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>FINAL ROUND STARTED ...</h1>
      <p>
        Attention, cosmic champions! The culmination of our cosmic odyssey is
        upon us with the commencement of the final round. In this climactic
        stage of our celestial showdown, the brightest stars among us vie for
        supremacy, each step bringing us closer to crowning our ultimate cosmic
        victors. The stakes are high, the tension palpable, as our intrepid
        finalists navigate the cosmic labyrinth in pursuit of glory. So, summon
        your cosmic resolve, finalists, and let the celestial battle begin!
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
    </>
  );
}