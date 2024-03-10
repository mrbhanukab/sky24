import styles from "@/styles/loading.module.css";

export default function Loading(props) {
  return (
    <section className={styles.container}>
      <div className={styles.loader}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      <h3 className={styles.txt}>
        {props.txt == null || props.txt == "" ? "Loading ..." : props.txt}
      </h3>
    </section>
  );
}
