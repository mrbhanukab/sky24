import styles from "@/styles/round.module.css";

export default function FinalRound({ finalTeams, otherTeams }) {
  return (
    <>
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
