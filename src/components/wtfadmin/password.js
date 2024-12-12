import { useState } from "react";
import styles from "@/styles/wtfadmin.module.css";

const Password = ({ func }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const adminPassword = "password-admin";
    const viewerPassword = "password-viewer";

    if (password === adminPassword) {
      func("admin");
    } else if (password === viewerPassword) {
      func("viewer");
    } else {
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