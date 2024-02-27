import React, { useState } from "react"; // Import useState from React
import styles from "@/styles/register.module.css";

export default function Step2(props) {
  // Define state variables for form data
  const [selectedTeam, setSelectedTeam] = useState("");
  const [members, setMembers] = useState([
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
  ]);

  // Function to handle team selection
  const handleTeamSelect = (event) => {
    setSelectedTeam(event.target.value);
  };

  // Function to handle member input change
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Save form data to session storage
    sessionStorage.setItem("selectedTeam", selectedTeam);
    sessionStorage.setItem("members", JSON.stringify(members));
    // Redirect to next step
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
            required
            placeholder={`${index + 1}st Member Name`}
            value={member.name}
            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
          />
          <input
            type="tel"
            required
            placeholder="Whatsapp Number"
            pattern="0[0-9]{9}"
            autoComplete="tel"
            value={member.whatsappNumber}
            onChange={(e) =>
              handleMemberChange(index, "whatsappNumber", e.target.value)
            }
          />
        </div>
      ))}
      <button type="submit">Step 3</button>
    </form>
  );
}
