import React from "react";
import styles from "@/styles/register.module.css";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/components/firebase";

const Step4 = (props) => {
  // Check if window is defined before accessing sessionStorage
  if (typeof window === "undefined") return null;

  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const selectedTeam = sessionStorage.getItem("selectedTeam");
  const members = JSON.parse(sessionStorage.getItem("members"));
  const selectedCenter = sessionStorage.getItem("selectedCenter");

  const formDataObject = {
    formData: formData,
    selectedTeam: selectedTeam,
    members: members,
    selectedCenter: selectedCenter,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if data already exists with the same schoolName and selectedTeam
      const teamsRef = collection(db, "teams");
      const q = query(
        teamsRef,
        where("formData.schoolName", "==", formData.schoolName),
        where("selectedTeam", "==", selectedTeam)
      );
      const querySnapshot = await getDocs(q);

      // If data exists, do not upload
      if (!querySnapshot.empty) {
        alert("Data already exists, not uploading.");
        return;
      }

      // If data does not exist, upload formDataObject to Firestore
      const docRef = await addDoc(teamsRef, formDataObject);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    sessionStorage.clear();
    props.func(5);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Step1}>
      <h2>Review Your Information</h2>
      <div className={styles.Step4}>
        <div className={styles.card}>
          <h3>Society Info</h3>
          <p>
            <strong>School Name:</strong> {formData.schoolName}
          </p>
          {/* Other society info fields */}
        </div>
        <div className={styles.card}>
          <h3>Team Info</h3>
          <p>
            <strong>Selected Team:</strong> {selectedTeam}
          </p>
          <ul>
            {members.map((member, index) => (
              <li key={index}>
                <p>
                  <strong>{index + 1}st Member Name:</strong> {member.name}
                </p>
                {/* Other member info fields */}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <h3>Exam Center</h3>
          <p>
            <strong>Selected Center:</strong> {selectedCenter}
          </p>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Step4;
