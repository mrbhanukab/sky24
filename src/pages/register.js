import React, { useState, Suspense } from "react"; // Import useState and Suspense from React
import Head from "next/head";
import styles from "@/styles/register.module.css";

// Lazy load all components
const Step1 = React.lazy(() => import("@/components/register/Step1"));
const Step2 = React.lazy(() => import("@/components/register/Step2"));
const Step3 = React.lazy(() => import("@/components/register/Step3"));
const Step4 = React.lazy(() => import("@/components/register/Step4"));
const Step5 = React.lazy(() => import("@/components/register/Step5"));

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
        <Suspense fallback={<div>Loading...</div>}>
          {status === 1 && <Step1 func={pull_data} />}
          {status === 2 && <Step2 func={pull_data} />}
          {status === 3 && <Step3 func={pull_data} />}
          {status === 4 && <Step4 func={pull_data} />}
          {status === 5 && <Step5 />}
        </Suspense>
      </main>
    </>
  );
}
