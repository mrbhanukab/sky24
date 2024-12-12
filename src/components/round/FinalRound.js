import { useState } from "react";
import styles from "@/styles/round.module.css";

export default function FinalRound({ finalTeams, otherTeams }) {
  const [presidentContactNumber, setPresidentContactNumber] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [finalRoundMarks, setFinalRoundMarks] = useState([]);

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
        const finalRoundMarks = team.finalround || {};
        setFinalRoundMarks(Object.entries(finalRoundMarks));
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
            <div
              key={index}
              className={`${styles.finalTeamCard} ${
                team.final === 1
                  ? styles.first
                  : team.final === 2
                  ? styles.second
                  : team.final === 3
                  ? styles.third
                  : ""
              }`}
            >
              <p className={styles.place}>{team.final}.</p>
              <div className={styles.details}>
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
        {finalRoundMarks.length > 0 && (
          <div>
            <h2>Final Round Marks</h2>
            <ul>
              {finalRoundMarks.map(([subject, marks]) => (
                <li key={subject}>
                  {subject}: {marks}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}