import React, { Suspense } from "react";
import styles from "@/styles/home/Section2.module.css";
import ProgressBar from "./Section2/ProgressBar";

const LazyWillOpen = React.lazy(() => import("./Section2/WillOpen"));
const LazyOpen = React.lazy(() => import("./Section2/Open"));
const LazyClose = React.lazy(() => import("./Section2/Close"));
const LazyFirst = React.lazy(() => import("./Section2/First"));
const LazyFinal = React.lazy(() => import("./Section2/Final"));
const LazyFirstFinish = React.lazy(() => import("./Section2/FirstFinish"));
const LazyFinalFinish = React.lazy(() => import("./Section2/FinalFinish"));

export default function Section2() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <ProgressBar />
        <Suspense fallback={<div>Loading...</div>}>
          {/* Uncomment the component you want to load */}
          {/* <LazyWillOpen /> */}
          <LazyOpen />
          {/* <LazyClose /> */}
          {/* <LazyFirst /> */}
          {/* <LazyFinal /> */}
          {/* <LazyFirstFinish /> */}
          {/* <LazyFinalFinish /> */}
        </Suspense>
      </div>
    </section>
  );
}
