import styles from "@/styles/round.module.css";

export default function FirstRound({ teams }) {
  return (
    <>
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
