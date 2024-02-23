import React, { useState } from "react"; // Import useState from React
import styles from "@/styles/register.module.css";

export default function Step3(props) {
  const position = [
    "1d3961.0243835157376!2d79.86564797578664!3d6.887682618822538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b3a2a7fbef7%3A0x270e752088df4370!2sIsipathana%20College!5e0!3m2!1sen!2slk!4v1708606664468",
    "1d992.083934940675!2d80.54352448483662!3d5.948388888341097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138d4cb2adf4d%3A0xc9c150f269c89d25!2sMain%20Office%2C%20Kumarathunga%20Mawatha%2C%20Matara!5e0!3m2!1sen!2slk!4v1708616323826",
    "1d3957.675274227323!2d80.61309204024671!3d7.277740792759698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368942d21023f%3A0x3843546e47aefe57!2sKingswood%20College%2C%20Kandy!5e0!3m2!1sen!2slk!4v1708613720931",
    "1d3947.6662496668!2d80.40751270000001!3d8.3359217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf5a62d9a7611%3A0x387440fbae77a0ac!2sAnuradhapura%20Central%20College!5e0!3m2!1sen!2slk!4v1708613797222",
  ];
  const [selectedCenter, setSelectedCenter] = useState("colombo");
  const [srcMap, setSrcMap] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!" +
      position[0] +
      "!5m2!1sen!2slk"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save selected center to session storage
    sessionStorage.setItem("selectedCenter", selectedCenter);
    props.func(4);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCenter(selectedValue);
    if (selectedValue === "colombo") {
      setSrcMap(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!" +
          position[0] +
          "!5m2!1sen!2slk"
      );
    } else if (selectedValue === "matara") {
      setSrcMap(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!" +
          position[1] +
          "!5m2!1sen!2slk"
      );
    } else if (selectedValue === "kandy") {
      setSrcMap(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!" +
          position[2] +
          "!5m2!1sen!2slk"
      );
    } else if (selectedValue === "anuradhapura") {
      setSrcMap(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!" +
          position[3] +
          "!5m2!1sen!2slk"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Step1}>
      <h2>3. Choose Exam Center</h2>
      <select
        value={selectedCenter}
        defaultValue="colombo"
        onChange={handleSelectChange}
        required
      >
        <option key="colombo" value="colombo">
          Isipathana College &#44; Colombo
        </option>
        <option key="matara" value="matara">
          St. Thomas' College &#44; Matara
        </option>
        <option key="kandy" value="kandy">
          Kingswood College &#44; Kandy
        </option>
        <option key="anuradhapura" value="anuradhapura">
          Anuradhapura Central College &#44; Anuradhapura
        </option>
      </select>
      <iframe
        src={srcMap}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={styles.map}
      ></iframe>
      <button type="submit">Submit</button>
    </form>
  );
}
