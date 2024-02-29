import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/finalResults.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/components/firebase";

export default function FinalRound() {
  const [finalTeams, setFinalTeams] = useState([]);
  const [otherTeams, setOtherTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("final", ">", 0));
      const querySnapshot = await getDocs(q);
      const finalTeamsData = [];
      const otherTeamsData = [];
      querySnapshot.forEach((doc) => {
        const teamData = doc.data();
        if (teamData.final <= 3) {
          finalTeamsData.push(teamData);
        } else {
          otherTeamsData.push(teamData);
        }
      });
      setFinalTeams(finalTeamsData);
      setOtherTeams(otherTeamsData);
    };

    fetchTeams();
  }, []);

  return (
    <>
      <Head>
        <title>SKY24 | Final Round Results Sheet</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
      </Head>
      <main className={styles.mainContainer}>
        <h1>Final Round Results Sheet</h1>
        <p>
          To all cosmic adventurers, our journey among the stars has concluded
          with the crowning of our celestial champions. Congratulations to the
          winners, whose names now shine brightly among the stars. To all
          participants, your tenacity and spirit have made this event
          unforgettable. As we bid farewell, let's cherish the memories and
          carry the cosmic spirit within until we meet among the stars again!
        </p>
        <div className={styles.finalTeamsContainer}>
          {finalTeams.map((team, index) => (
            <div key={index} className={styles.finalTeamCard}>
              <p className={styles.place}>{team.final}</p>
              <div>
                <h2>{team.formData.schoolName}</h2>
                <p>Team: {team.selectedTeam}</p>
              </div>
            </div>
          ))}
        </div>
        <table className={styles.resultsTable}>
          <caption>Other Teams</caption>
          <thead>
            <tr>
              <th>Place</th>
              <th>School Name</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {otherTeams.map((team, index) => (
              <tr key={index}>
                <td>{team.final}</td>
                <td>{team.formData.schoolName}</td>
                <td>{team.selectedTeam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
