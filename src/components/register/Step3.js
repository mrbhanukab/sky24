import React, { useState } from "react"; // Import useState from React
import styles from "@/styles/register.module.css";

export default function Step3(props) {
  const [selectedCenter, setSelectedCenter] = useState("colombo");
  const [srcMap, setSrcMap] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0243835157376!2d79.86564797578664!3d6.887682618822538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b3a2a7fbef7%3A0x270e752088df4370!2sIsipathana%20College!5e0!3m2!1sen!2slk!4v1708606664468!5m2!1sen!2slk"
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
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0243835157376!2d79.86564797578664!3d6.887682618822538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b3a2a7fbef7%3A0x270e752088df4370!2sIsipathana%20College!5e0!3m2!1sen!2slk!4v1708606664468!5m2!1sen!2slk"
      );
    } else if (selectedValue === "matara") {
      setSrcMap(
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3968.298721171468!2d80.534848!3d5.9535164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13f2fccbd5171%3A0xe8fd88a01a8bdb6!2sRahula%20College!5e0!3m2!1sen!2slk!4v1710170981192!5m2!1sen!2slk"
      );
    } else if (selectedValue === "kandy") {
      setSrcMap(
        "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d494.68767167102425!2d80.63546983491824!3d7.297427900000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1710171505811!5m2!1sen!2slk"
      );
    } else if (selectedValue === "anuradhapura") {
      setSrcMap(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.6662496668!2d80.40751270000001!3d8.3359217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf5a62d9a7611%3A0x387440fbae77a0ac!2sAnuradhapura%20Central%20College!5e0!3m2!1sen!2slk!4v1708613797222!5m2!1sen!2slk"
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
          Rahula College &#44; Matara
        </option>
        <option key="kandy" value="kandy">
          St.Sylvester's College &#44; Kandy
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
      <button type="submit">
        Submit <span className={styles.note}>*[2]</span>
      </button>
    </form>
  );
}
