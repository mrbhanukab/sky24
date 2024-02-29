import React, { useState } from "react"; // Import useState from React
import styles from "@/styles/register.module.css";

export default function Step1(props) {
  // Define state variable for form data object
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    societyEmail: "",
    teacherInCharge: "",
    ticContactNumber: "",
    presidentName: "",
    presidentContactNumber: "",
    language: "sinhala", // Default value for language select
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save form data to session storage
    sessionStorage.setItem("formData", JSON.stringify(formData));
    // Redirect to next step
    props.func(2);
  };

  // Function to update form data for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to update form data for select input
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Step1}>
      <h2>1. Society Info</h2>
      <input
        type="text"
        autoFocus
        required
        placeholder="School Name"
        name="schoolName"
        value={formData.schoolName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="School Address"
        name="schoolAddress"
        value={formData.schoolAddress}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        required
        placeholder="Society Email"
        autoComplete="email"
        name="societyEmail"
        value={formData.societyEmail}
        onChange={handleInputChange}
      />
      <input
        type="text"
        required
        placeholder="Teacher In Charge"
        name="teacherInCharge"
        value={formData.teacherInCharge}
        onChange={handleInputChange}
      />
      <input
        type="tel"
        required
        placeholder="Contact Number of T.I.C."
        autoComplete="tel"
        pattern="0[0-9]{9}"
        name="ticContactNumber"
        value={formData.ticContactNumber}
        onChange={handleInputChange}
      />
      <input
        type="text"
        required
        placeholder="President Name"
        name="presidentName"
        value={formData.presidentName}
        onChange={handleInputChange}
      />
      <input
        type="tel"
        required
        placeholder="Contact Number of President"
        autoComplete="tel"
        pattern="0[0-9]{9}"
        name="presidentContactNumber"
        value={formData.presidentContactNumber}
        onChange={handleInputChange}
      />
      <select
        name="language" // Specify the name attribute for the select element
        value={formData.language} // Set the value to control the select element
        onChange={handleSelectChange} // Handle the change event
        required
      >
        <option value="sinhala">Sinhala</option>
        <option value="english">English</option>
        <option value="tamil">Tamil</option>
        <option value="multilingual">
          Multilingual <span className={styles.note}>*[1]</span>
        </option>
      </select>
      <button type="submit">
        Step 2 <span className={styles.note}>*[2]</span>
      </button>
    </form>
  );
}
