import Styles from "@/styles/Archive.module.css";

export default function Archive() {
  const handleClick = () => {
    window.location.href = "https://github.com/mrbhanukab/sky24";
  };

  return (
    <section className={Styles.card} onClick={handleClick}>
      <h1>Public Archive</h1>
      <p>This project is archived. You're viewing a preview. Click here to view the repo.</p>
    </section>
  );
}