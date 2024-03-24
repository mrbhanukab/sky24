import React, { useEffect, useState } from "react";
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

const FirstResults = ({ onClose, data }) => {
  const [updatedData, setUpdatedData] = useState(data);

  const handleInputChange = (e, schoolIndex, field) => {
    const updatedSchools = [...updatedData.membersData];

    if (field === "selected") {
      // Toggle the selected property
      updatedSchools[schoolIndex].selected = e.target.checked;
    } else {
      // Check if firstround is null and initialize it if necessary
      if (!updatedSchools[schoolIndex].firstround) {
        updatedSchools[schoolIndex].firstround = {};
      }
      // Update the value of the specified field
      updatedSchools[schoolIndex].firstround[field] = e.target.value;
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
              selected: school.selected,
              firstround: school.firstround,
            });
          }
        }

        alert("Data updated successfully!");
        location.reload();
        onClose(); // Close the modal or perform any other actions
      } catch (error) {
        alert("Error updating data. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.results}>
      <h2>First Round Results</h2>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Schoolname</th>
            <th>Team</th>
            <th>Selected</th>
            <th>Observation</th>
            <th>Cosmology</th>
            <th>Astro Physics</th>
            <th>General Astronomy</th>
            <th>Rocketry</th>
          </tr>
        </thead>
        <tbody>
          {updatedData.membersData
            .slice() // Create a copy of the array
            .sort((a, b) => a.school.localeCompare(b.school)) // Sort the array alphabetically based on school name
            .map((school, index) => (
              <tr key={index}>
                <td>{school.school}</td>
                <td>{school.team}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={school.selected}
                    onChange={(e) => handleInputChange(e, index, "selected")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.firstround?.Observation || ""}
                    onChange={(e) => handleInputChange(e, index, "Observation")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.firstround?.Cosmology || ""}
                    onChange={(e) => handleInputChange(e, index, "Cosmology")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.firstround?.AstroPhysics || ""}
                    onChange={(e) =>
                      handleInputChange(e, index, "AstroPhysics")
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.firstround?.GeneralAstronomy || ""}
                    onChange={(e) =>
                      handleInputChange(e, index, "GeneralAstronomy")
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={school.firstround?.Rocketry || ""}
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

export default FirstResults;
