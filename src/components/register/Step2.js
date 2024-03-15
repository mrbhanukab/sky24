import React, { useState } from "react";
import styles from "@/styles/register.module.css";

export default function Step2(props) {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [members, setMembers] = useState([
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
  ]);

  const handleTeamSelect = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("selectedTeam", selectedTeam);
    sessionStorage.setItem("members", JSON.stringify(members));
    props.func(3);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Step1}>
      <h2>2. Team info</h2>
      <select value={selectedTeam} onChange={handleTeamSelect} required>
        <option value="">Select a Team</option>
        <option value="A">Team A</option>
        <option value="B">Team B</option>
        <option value="C">Team C</option>
      </select>
      {members.map((member, index) => (
        <div key={index} className={styles.twoCol}>
          <input
            type="text"
            autoFocus
            placeholder={`${index + 1}st Member Name`}
            value={member.name}
            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
            {...(index < 2 ? { required: true } : {})}
          />
          <input
            type="tel"
            placeholder="Whatsapp Number"
            pattern="0[0-9]{9}"
            autoComplete="tel"
            value={member.whatsappNumber}
            onChange={(e) =>
              handleMemberChange(index, "whatsappNumber", e.target.value)
            }
            {...(index < 2 ? { required: true } : {})}
          />
        </div>
      ))}
      <button type="submit">
        Step 3 <span className={styles.note}>*[2]</span>
      </button>
      <div></div>
    </form>
  );
}
