import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/register.module.css";

const Step1 = dynamic(() => import("@/components/register/Step1"));
const Step2 = dynamic(() => import("@/components/register/Step2"));
const Step3 = dynamic(() => import("@/components/register/Step3"));
const Step4 = dynamic(() => import("@/components/register/Step4"));

export default function Home() {
  const [status, setStatus] = useState(1);

  const pull_data = (data) => {
    setStatus(data);
  };

  return (
    <>
      <Head>
        <title> SKY24 | Register</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
      </Head>
      <main className={styles.mainContainer}>
        <h1>REGISTRATION FORM</h1>
        <div>
          {status === 1 && <Step1 func={pull_data} />}
          {status === 2 && <Step2 func={pull_data} />}
          {status === 3 && <Step3 func={pull_data} />}
          {status === 4 && <Step4 />}
        </div>
      </main>
    </>
  );
}
