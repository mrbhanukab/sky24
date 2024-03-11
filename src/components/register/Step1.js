import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import CreatableSelect from "react-select/creatable";
import { db } from "@/components/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

export default function Step1(props) {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    societyEmail: "",
    teacherInCharge: "",
    ticContactNumber: "",
    presidentName: "",
    presidentContactNumber: "",
    language: "sinhala",
  });
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const schoolsRef = collection(db, "teams");
      const querySnapshot = await getDocs(schoolsRef);
      const schoolNames = [];
      querySnapshot.forEach((doc) => {
        const schoolName = doc.data().formData.schoolName;
        if (schoolName && !schoolNames.includes(schoolName)) {
          schoolNames.push(schoolName);
        }
      });
      const formattedOptions = schoolNames.map((name) => ({
        value: name,
        label: name,
      }));
      setOptions(formattedOptions);
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("formData", JSON.stringify(formData));
    props.func(2);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions([...options, newOption]);
    setValue(newOption);
    setFormData({
      ...formData,
      schoolName: inputValue,
      // Clear schoolAddress and societyEmail when creating a new school
      schoolAddress: "",
      societyEmail: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = async (newValue, actionMeta) => {
    setValue(newValue);
    if (actionMeta.action === "select-option") {
      const schoolName = newValue.value;
      const schoolsRef = collection(db, "teams");
      const q = query(
        schoolsRef,
        where("formData.schoolName", "==", schoolName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data().formData;
        setFormData({
          ...formData,
          schoolName: data.schoolName,
          schoolAddress: data.schoolAddress,
          societyEmail: data.societyEmail,
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Step1}>
      <h2>1. Society Info</h2>
      <CreatableSelect
        isClearable
        onChange={handleSelectChange}
        onCreateOption={handleCreate}
        options={options}
        value={value}
        formatCreateLabel={(inputValue) => `Add School "${inputValue}"`}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Select or Type Your School Name & Click Add"
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
        name="language"
        value={formData.language}
        onChange={handleInputChange}
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
