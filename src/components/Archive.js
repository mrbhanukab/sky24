import { useEffect } from "react";
import Styles from "@/styles/Archive.module.css";

export default function Archive() {
  useEffect(() => {
    const handleSectionPress = () => {
      let status = parseInt(sessionStorage.getItem("status")) || 2;
      status = status >= 7 ? 2 : status + 1;
      sessionStorage.setItem("status", status);
      window.location.reload(); // Refresh the page
    };

    const section = document.querySelector(`.${Styles.card}`);
    section.addEventListener("click", handleSectionPress);

    return () => {
      section.removeEventListener("click", handleSectionPress);
    };
  }, []);

  return (
    <section className={Styles.card}>
      <h1>Public Archive</h1>
    </section>
  );
}