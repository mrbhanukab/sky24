import styles from "@/styles/register.module.css";
import React, { useEffect } from "react";

const Step5 = (props) => {
  useEffect(() => {
    setTimeout((window.location.href = "/"), 4000);
  }, []);
  return (
    <form className={styles.Step1}>
      <h2>Submitted Successfully!</h2>
      <br />
      <h3>Forwarding to Home Page ...</h3>
    </form>
  );
};

export default Step5;
