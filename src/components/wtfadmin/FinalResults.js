import React, { useState } from "react";
import styles from "@/styles/wtfadmin.module.css";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/components/firebase";

const FinalResults = ({ onClose, data }) => {
  const [updatedData, setUpdatedData] = useState(data);

  const handleInputChange = (e, schoolIndex, field) => {
    const updatedSchools = [...updatedData.membersData];

    if (field === "final") {
      // Parse the input value as an integer
      const finalValue = parseInt(e.target.value);
      // Update the final property
      updatedSchools[schoolIndex].final = isNaN(finalValue) ? 0 : finalValue;
    } else {
      // Check if finalround is null and initialize it if necessary
      if (!updatedSchools[schoolIndex].finalround) {
        updatedSchools[schoolIndex].finalround = {};
      }
      // Update the value of the specified field
      updatedSchools[schoolIndex].finalround[field] = e.target.value;
    }

    // Update the state with the modified data
    setUpdatedData({ ...updatedData, membersData: updatedSchools });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    let confirmation = prompt(
      "Changes Maybe Unrecoverable, Please Make Sure you Don't Fucked up!  Type 'Submit The Shit' to Submit Data."
    );

    if (confirmation === "Submit The Shit") {
      try {
        const teamsRef = collection(db, "teams");

        for (const school of updatedData.membersData) {
          const q = query(
            teamsRef,
            where("formData.schoolName", "==", school.school),
            where("selectedTeam", "==", school.team)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;
            await updateDoc(doc(teamsRef, docId), {
              final: school.final,
              finalround: school.finalround,
            });
          }
        }

        alert("Data updated successfully!");
        location.reload();
        onClose(); // Close the modal or perform any other actions
      } catch (error) {
        console.error("Error updating data:", error);
        alert("Error updating data. Please try again later.");
      }
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
            <th>Final</th>
            <th>Observation</th>
            <th>Cosmology</th>
            <th>Astro Physics</th>
            <th>General Astronomy</th>
            <th>Rocketry</th>
          </tr>
        </thead>
        <tbody>
          {updatedData.membersData.map((school, index) => (
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
                  onChange={(e) => handleInputChange(e, index, "AstroPhysics")}
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
