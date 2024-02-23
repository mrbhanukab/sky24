import styles from "@/styles/home/Section2.module.css";

export default function ProgressBar() {
  const events = [
    { event: "REGISTRATION WILL OPEN SOON", status: 2 },
    { event: "REGISTRATION OPEN", status: 1 },
    { event: "REGISTRATION CLOSE", status: 0 },
    { event: "FIRST ROUND", status: 0 },
    { event: "RELEASE FIRST ROUND RESULTS", status: 0 },
    { event: "FINAL ROUND", status: 0 },
    { event: "RELEASE FINAL ROUND RESULTS", status: 0 },
  ];

  const progress = events.map(
    (
      item,
      index // Added 'index' parameter
    ) => (
      <li
        key={index} // Added key prop with unique identifier
        className={
          item.status === 1
            ? `${styles.iscomplete} ${styles.ishovered}`
            : item.status === 2
            ? styles.iscomplete
            : ""
        }
      >
        <span>{item.event}</span>
      </li>
    )
  );

  return <ul className={styles.progressBar}>{progress}</ul>;
}
