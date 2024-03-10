import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/index.module.css";
import ProgressBar from "./Section2/ProgressBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebase";

const LazyOpen = dynamic(() => import("./Section2/Open"));
const LazyClose = dynamic(() => import("./Section2/Close"));
const LazyFirst = dynamic(() => import("./Section2/First"));
const LazyFinal = dynamic(() => import("./Section2/Final"));
const LazyFirstFinish = dynamic(() => import("./Section2/FirstFinish"));
const LazyFinalFinish = dynamic(() => import("./Section2/FinalFinish"));

export default function Section2() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const getStatusFromFirestore = async () => {
      try {
        const docRef = doc(db, "system", "settings");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStatus(data.status);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getStatusFromFirestore();
  }, []);

  const renderComponent = (component) => {
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
        <ProgressBar status={status} />
        <React.Suspense fallback={<div>Loading...</div>}>
          {renderComponent()}
        </React.Suspense>
      </div>
    </section>
  );
}
