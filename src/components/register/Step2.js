import React, { useState } from "react";
import styles from "@/styles/register.module.css";
import Select from "react-select";

export default function Step2(props) {
  const [selectedTeam, setSelectedTeam] = useState("A");
  const [members, setMembers] = useState([
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
    { name: "", whatsappNumber: "" },
  ]);

  const handleTeamSelect = (selectedOption) => {
    setSelectedTeam(selectedOption.value);
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
      <Select
        options={[
          { value: "A", label: "Team A" },
          { value: "B", label: "Team B" },
          { value: "C", label: "Team C" },
        ]}
        value={{ value: selectedTeam, label: `Team ${selectedTeam}` }}
        onChange={handleTeamSelect}
        placeholder="Select a Team"
        required
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {members.map((member, index) => (
        <div key={index} className={styles.twoCol}>
          <input
            type="text"
            autoFocus
            placeholder={`${index + 1}${index < 2 ? "st" : "th"} Member Name`}
            value={member.name}
            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
            required={index < 2} // Make first two inputs required
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
            required={index < 2} // Make first two inputs required
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
