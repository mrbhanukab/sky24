import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/firstResults.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/components/firebase";

export default function FirstRound() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("selected", "==", true));
      const querySnapshot = await getDocs(q);
      const teamsData = [];
      querySnapshot.forEach((doc) => {
        teamsData.push(doc.data());
      });
      setTeams(teamsData);
    };

    fetchTeams();
  }, []);

  return (
    <>
      <Head>
        <title>SKY24 | First Round Results Sheet</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
      </Head>
      <main className={styles.mainContainer}>
        <h1>First Round Results Sheet</h1>
        <p>
          To all cosmic contenders, the moment of triumph has arrived!
          Congratulations to our stellar champions who have emerged victorious
          in the final round. Your cosmic acumen has shone brightly, earning you
          a well-deserved place among the stars. To all participants, your
          bravery and perseverance have made this cosmic journey unforgettable.
          Though the victory may be shared by few, the spirit of cosmic
          exploration unites us all. Here's to the stars that guide us and the
          journey that binds us together!
        </p>
        <table className={styles.resultsTable}>
          <caption>Selected Teams for Final Round</caption>
          <thead>
            <tr>
              <th>School Name</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
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
