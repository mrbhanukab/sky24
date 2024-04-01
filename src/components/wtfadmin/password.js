import { useState } from "react";
import styles from "@/styles/wtfadmin.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebase";
import md5 from "md5";

const Password = ({ func }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = doc(db, "system", "wtfadmin");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { admin, viewer, check } = docSnap.data();
        const inputHash = md5(password);

        if (inputHash === admin) {
          func("admin");
        } else if (inputHash === viewer) {
          func("viewer");
        } else if (inputHash === check) {
          func("check");
        } else {
          func("error");
        }
      } else {
        func("error");
      }
    } catch (error) {
      alert("Error getting document. Slow Internet?");
      func("error");
    }
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <input
        type="password"
        required
        placeholder="Enter your password ..."
        name="password"
        onChange={handleInputChange}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Password;
