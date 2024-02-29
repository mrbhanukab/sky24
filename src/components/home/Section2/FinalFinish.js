import React, { useState, useEffect } from "react";
import styles from "@/styles/home/Section2.module.css";
import Link from "next/link";

export default function Final() {
  return (
    <>
      <h1>FINAL ROUND RESULT ...</h1>
      <p>
        To all cosmic adventurers, our journey among the stars has drawn to a
        close, culminating in the announcement of our celestial champions. With
        hearts full of cosmic wonder, we applaud the stellar efforts of all
        participants who made this event an unforgettable cosmic spectacle.
        Congratulations to our victors, whose names shall be etched among the
        stars as beacons of cosmic excellence. As we bid farewell to this
        extraordinary voyage, let us cherish the memories forged and carry the
        spirit of cosmic exploration in our hearts until we meet again among the
        stars!
      </p>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} href="/finalRound">
          Final Round Results
        </Link>
      </div>
    </>
  );
}
