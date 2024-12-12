import React, { useState } from "react";
import styles from "@/styles/wtfadmin.module.css";

const FinalResults = ({ onClose, data }) => {
  const [updatedData, setUpdatedData] = useState(data);

  const handleInputChange = (e, schoolIndex, field) => {
    const updatedSchools = [...updatedData.membersData];

    if (field === "final") {
      const finalValue = parseInt(e.target.value);
      updatedSchools[schoolIndex].final = isNaN(finalValue) ? 0 : finalValue;
    } else {
      if (!updatedSchools[schoolIndex].finalround) {
        updatedSchools[schoolIndex].finalround = {};
      }
      updatedSchools[schoolIndex].finalround[field] = e.target.value;
    }

    setUpdatedData({ ...updatedData, membersData: updatedSchools });
  };

  const handleSubmit = () => {
    let confirmation = prompt(
      "Changes Maybe Unrecoverable, Please Make Sure you Don't Fucked up!  Type 'Submit The Shit' to Submit Data."
    );

    if (confirmation === "Submit The Shit") {
      alert("done");
      onClose();
    }
  };

  return (
    <div className={styles.results}>
      <h2>Final Round Results</h2>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Schoolname</th>
            <th>Team</th>
            <th>Rank</th>
            <th>Observation</th>
            <th>Cosmology</th>
            <th>Astro Physics</th>
            <th>General Astronomy</th>
            <th>Rocketry</th>
          </tr>
        </thead>
        <tbody>
          {updatedData.membersData
            .slice()
            .sort((a, b) => a.school.localeCompare(b.school))
            .map((school, index) => (
              <tr key={index}>
                <td>{school.school}</td>
                <td>{school.team}</td>
                <td>
                  <input
                    type="text"
                    value={school.final || ""}
                    onChange={(e) => handleInputChange(e, index, "final")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.finalround?.Observation || ""}
                    onChange={(e) => handleInputChange(e, index, "Observation")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.finalround?.Cosmology || ""}
                    onChange={(e) => handleInputChange(e, index, "Cosmology")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.finalround?.AstroPhysics || ""}
                    onChange={(e) =>
                      handleInputChange(e, index, "AstroPhysics")
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.finalround?.GeneralAstronomy || ""}
                    onChange={(e) =>
                      handleInputChange(e, index, "GeneralAstronomy")
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.finalround?.Rocketry || ""}
                    onChange={(e) => handleInputChange(e, index, "Rocketry")}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={styles.btngrp}>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FinalResults;