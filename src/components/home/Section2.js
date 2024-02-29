import React from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/home/Section2.module.css";
import ProgressBar from "./Section2/ProgressBar";

const LazyWillOpen = dynamic(() => import("./Section2/WillOpen"));
const LazyOpen = dynamic(() => import("./Section2/Open"));
const LazyClose = dynamic(() => import("./Section2/Close"));
const LazyFirst = dynamic(() => import("./Section2/First"));
const LazyFinal = dynamic(() => import("./Section2/Final"));
const LazyFirstFinish = dynamic(() => import("./Section2/FirstFinish"));
const LazyFinalFinish = dynamic(() => import("./Section2/FinalFinish"));

export default function Section2() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <ProgressBar />
        <React.Suspense fallback={<div>Loading...</div>}>
          {/* Uncomment the component you want to load */}
          {/* <LazyWillOpen /> */}
          <LazyOpen />
          {/* <LazyClose /> */}
          {/* <LazyFirst /> */}
          {/* <LazyFinal /> */}
          {/* <LazyFirstFinish /> */}
          {/* <LazyFinalFinish /> */}
        </React.Suspense>
      </div>
    </section>
  );
}
