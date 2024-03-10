import styles from "@/styles/index.module.css";

export default function ProgressBar(props) {
  // Function to generate events array based on props.status
  const generateEvents = (status) => {
    switch (status) {
      case 2:
        return [
          { event: "REGISTRATION WILL OPEN SOON", status: 2 },
          { event: "REGISTRATION OPEN", status: 1 },
          { event: "REGISTRATION CLOSE", status: 0 },
          { event: "FIRST ROUND", status: 0 },
          { event: "RELEASE FIRST ROUND RESULTS", status: 0 },
          { event: "FINAL ROUND", status: 0 },
          { event: "RELEASE FINAL ROUND RESULTS", status: 0 },
        ];
      case 3:
        return [
          { event: "REGISTRATION WILL OPEN SOON", status: 2 },
          { event: "REGISTRATION OPEN", status: 2 },
          { event: "REGISTRATION CLOSE", status: 1 },
          { event: "FIRST ROUND", status: 0 },
          { event: "RELEASE FIRST ROUND RESULTS", status: 0 },
          { event: "FINAL ROUND", status: 0 },
          { event: "RELEASE FINAL ROUND RESULTS", status: 0 },
        ];
      case 4:
        return [
          { event: "REGISTRATION WILL OPEN SOON", status: 2 },
          { event: "REGISTRATION OPEN", status: 2 },
          { event: "REGISTRATION CLOSE", status: 2 },
          { event: "FIRST ROUND", status: 1 },
          { event: "RELEASE FIRST ROUND RESULTS", status: 0 },
          { event: "FINAL ROUND", status: 0 },
          { event: "RELEASE FINAL ROUND RESULTS", status: 0 },
        ];
      case 5:
        return [
          { event: "REGISTRATION WILL OPEN SOON", status: 2 },
          { event: "REGISTRATION OPEN", status: 2 },
          { event: "REGISTRATION CLOSE", status: 2 },
          { event: "FIRST ROUND", status: 2 },
          { event: "RELEASE FIRST ROUND RESULTS", status: 1 },
          { event: "FINAL ROUND", status: 0 },
          { event: "RELEASE FINAL ROUND RESULTS", status: 0 },
        ];
      case 6:
        return [
          { event: "REGISTRATION WILL OPEN SOON", status: 2 },
          { event: "REGISTRATION OPEN", status: 2 },
          { event: "REGISTRATION CLOSE", status: 2 },
          { event: "FIRST ROUND", status: 2 },
          { event: "RELEASE FIRST ROUND RESULTS", status: 2 },
          { event: "FINAL ROUND", status: 1 },
          { event: "RELEASE FINAL ROUND RESULTS", status: 0 },
        ];
      case 7:
        return [
          { event: "REGISTRATION WILL OPEN SOON", status: 2 },
          { event: "REGISTRATION OPEN", status: 2 },
          { event: "REGISTRATION CLOSE", status: 2 },
          { event: "FIRST ROUND", status: 2 },
          { event: "RELEASE FIRST ROUND RESULTS", status: 2 },
          { event: "FINAL ROUND", status: 2 },
          { event: "RELEASE FINAL ROUND RESULTS", status: 1 },
        ];
      // Add cases for other statuses as needed
      default:
        return [
          { event: "REGISTRATION WILL OPEN SOON", status: 0 },
          { event: "REGISTRATION OPEN", status: 0 },
          { event: "REGISTRATION CLOSE", status: 0 },
          { event: "FIRST ROUND", status: 0 },
          { event: "RELEASE FIRST ROUND RESULTS", status: 0 },
          { event: "FINAL ROUND", status: 0 },
          { event: "RELEASE FINAL ROUND RESULTS", status: 0 },
        ];
    }
  };

  // Generate events array based on props.status
  const events = generateEvents(props.status);

  // Mapping events to JSX
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
