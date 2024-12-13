import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/index.module.css";
import ProgressBar from "./Section2/ProgressBar";

const LazyOpen = dynamic(() => import("./Section2/Open"));
const LazyClose = dynamic(() => import("./Section2/Close"));
const LazyFirst = dynamic(() => import("./Section2/First"));
const LazyFinal = dynamic(() => import("./Section2/Final"));
const LazyFirstFinish = dynamic(() => import("./Section2/FirstFinish"));
const LazyFinalFinish = dynamic(() => import("./Section2/FinalFinish"));

export default function Section2() {
  const [status, setStatus] = useState(() => {
    return parseInt(sessionStorage.getItem("status")) || 7;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const newStatus = parseInt(sessionStorage.getItem("status")) || 7;
      setStatus(newStatus);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const renderComponent = () => {
    switch (status) {
      case 2:
        return <LazyOpen />;
      case 3:
        return <LazyClose />;
      case 4:
        return <LazyFirst />;
      case 5:
        return <LazyFirstFinish />;
      case 6:
        return <LazyFinal />;
      case 7:
        return <LazyFinalFinish />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.section2}>
      <div className={styles.card2}>
        <ProgressBar status={status} setStatus={setStatus} />
        <React.Suspense fallback={<div>Loading...</div>}>
          {renderComponent()}
        </React.Suspense>
      </div>
    </section>
  );
}