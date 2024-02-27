import React, { useState } from "react";
import styles from "@/styles/register.module.css";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/components/firebase";

const Step4 = (props) => {
  const [formData, setFormData] = useState(
    JSON.parse(sessionStorage.getItem("formData"))
  );
  const [selectedTeam, setSelectedTeam] = useState(
    sessionStorage.getItem("selectedTeam")
  );
  const [members, setMembers] = useState(
    JSON.parse(sessionStorage.getItem("members"))
  );
  const [selectedCenter, setSelectedCenter] = useState(
    sessionStorage.getItem("selectedCenter")
  );
  const [already, setAlready] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamsRef = collection(db, "teams");
      const q = query(
        teamsRef,
        where("formData.schoolName", "==", formData.schoolName),
        where("selectedTeam", "==", selectedTeam)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setAlready(true);
        return;
      }

      const formDataObject = {
        formData: formData,
        selectedTeam: selectedTeam,
        members: members,
        selectedCenter: selectedCenter,
      };
      const docRef = await addDoc(teamsRef, formDataObject);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      alert("Error adding document!");
    }
    sessionStorage.clear();
    props.func(5);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedMembers = [...members];
      updatedMembers[index][name] = value;
      setMembers(updatedMembers);
    } else {
      switch (name) {
        case "schoolName":
          setFormData({ ...formData, schoolName: value });
          break;
        case "societyEmail":
          setFormData({ ...formData, societyEmail: value });
          break;
        case "teacherInCharge":
          setFormData({ ...formData, teacherInCharge: value });
          break;
        case "ticContactNumber":
          setFormData({ ...formData, ticContactNumber: value });
          break;
        case "presidentName":
          setFormData({ ...formData, presidentName: value });
          break;
        case "presidentContactNumber":
          setFormData({ ...formData, presidentContactNumber: value });
          break;
        case "selectedTeam":
          setSelectedTeam(value);
          break;
        case "selectedCenter":
          setSelectedCenter(value);
          break;
        default:
          break;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Step1}>
      <h2>Review Your Information</h2>
      <p>You can Edit Info By Click On Relevant Info.</p>
      <div className={styles.Step4}>
        <div className={styles.card}>
          <h3>Society Info</h3>
          <p className={styles.p}>
            School Name:
            <input
              type="text"
              name="schoolName"
              autoFocus
              value={formData.schoolName}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.p}>
            Society Email:
            <input
              type="text"
              name="societyEmail"
              autoFocus
              value={formData.societyEmail}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.p}>
            Teacher In Charge:
            <input
              type="text"
              name="teacherInCharge"
              autoFocus
              value={formData.teacherInCharge}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.p}>
            Contact (Teacher In Charge):
            <input
              type="text"
              pattern="0[0-9]{9}"
              name="ticContactNumber"
              autoFocus
              value={formData.ticContactNumber}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.p}>
            President:
            <input
              type="text"
              name="presidentName"
              autoFocus
              value={formData.presidentName}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.p}>
            Contact (President):
            <input
              type="text"
              name="presidentContactNumber"
              pattern="0[0-9]{9}"
              autoFocus
              value={formData.presidentContactNumber}
              onChange={handleInputChange}
            />
          </p>
        </div>
        <div className={styles.card}>
          <h3>Team Info</h3>
          <p className={styles.p}>
            Selected Team:
            <p>Should be one from A, B or C</p>
            <input
              type="text"
              name="selectedTeam"
              autoFocus
              value={selectedTeam}
              onChange={handleInputChange}
            />
          </p>
          {members.map((member, index) => (
            <li key={index} type="none">
              <p className={styles.p}>
                {index + 1} Member
                <input
                  type="text"
                  name="name"
                  autoFocus
                  value={member.name}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <input
                  type="text"
                  name="whatsappNumber"
                  pattern="0[0-9]{9}"
                  autoFocus
                  value={member.whatsappNumber}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </p>
            </li>
          ))}
        </div>
        <div className={styles.card}>
          <h3>Exam Center</h3>
          <p>Should be one from Colombo, Matara, Kandy or Anuradhapura</p>
          <p className={styles.p}>
            <input
              type="text"
              name="selectedCenter"
              autoFocus
              value={selectedCenter}
              onChange={handleInputChange}
            />
          </p>
        </div>
      </div>
      {already === true && (
        <div className={styles.already}>
          <h2>Data already exists!</h2>
          <p>
            Data for this school and team already exists. If the team (A/B/C) is
            wrong, correct and resubmit. Otherwise, contact us via WhatsApp.
            <ul>
              <li>
                <a href="https:wa.me/94706162457">Ginura (President)</a>
              </li>
              <li>
                <a href="https:wa.me/94703886215">Movindu (Past-President)</a>
              </li>
              <li>
                <a href="https:wa.me/94767733492">Developer</a>
              </li>
            </ul>
          </p>
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Step4;
