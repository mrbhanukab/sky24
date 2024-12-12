import { useState } from "react";
import styles from "@/styles/round.module.css";

export default function FirstRound({ teams }) {
  const [presidentContactNumber, setPresidentContactNumber] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [firstRoundMarks, setFirstRoundMarks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/path/to/teams.json");
      const teams = await response.json();

      const team = teams.find(
        (team) =>
          team.formData.presidentContactNumber === presidentContactNumber &&
          team.selectedTeam === selectedTeam
      );

      if (team) {
        const firstroundMarks = team.firstround || {};
        setFirstRoundMarks(Object.entries(firstroundMarks));
      } else {
        alert("No matching record found!");
      }
    } catch (error) {
      alert("Error retrieving data. Please try again later.");
    }
  };

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
        <form className={styles.ext} onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Type Your President's Phone Number"
            pattern="0[0-9]{9}"
            autoComplete="tel"
            value={presidentContactNumber}
            onChange={(e) => setPresidentContactNumber(e.target.value)}
            required
          />
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            required
          >
            <option value="">Select a Team</option>
            <option value="A">Team A</option>
            <option value="B">Team B</option>
            <option value="C">Team C</option>
          </select>
          <button type="submit">Show Extended Results Sheet</button>
        </form>
        {firstRoundMarks.length > 0 && (
          <div className={styles.pvt}>
            <h2>First Round Marks</h2>
            <ul>
              {firstRoundMarks.map(([subject, marks]) => (
                <li key={subject}>
                  <b>{subject}:</b> {marks}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}