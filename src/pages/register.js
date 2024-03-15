import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/register.module.css";
import Loading from "@/components/Loading";

const Step1 = dynamic(() => import("@/components/register/Step1"));
const Step2 = dynamic(() => import("@/components/register/Step2"));
const Step3 = dynamic(() => import("@/components/register/Step3"));
const Step4 = dynamic(() => import("@/components/register/Step4"));
const Step5 = dynamic(() => import("@/components/register/Step5"));

export default function Register() {
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading ? (
        <Loading txt="Loading ..." />
      ) : (
        <>
          <main className={styles.mainContainer}>
            <h1>
              {status === 5 ? "REGISTRATION COMPLETE" : "REGISTRATION FORM"}
            </h1>
            <div>
              {status === 1 && <Step1 func={pull_data} />}
              {status === 2 && <Step2 func={pull_data} />}
              {status === 3 && <Step3 func={pull_data} />}
              {status === 4 && <Step4 func={pull_data} />}
              {status === 5 && <Step5 />}
            </div>
          </main>
          <div className={styles.footnote}>
            <h2>Footnote</h2>
            <ol>
              <li>
                If your teammates are competing in different languages use the
                "Multilingual" option and you must inform us personally. Also in
                both Sinhala and Tamil medium papers, English will be used as
                the second language option.
              </li>
              <li>
                If you accidentally submitted wrong details when proceeding to
                the next step, don't worry. You can re-edit the information at
                the end of the form before submitting it to the database.
              </li>
              <li>
                If you accidentally submitted incorrect details when filling out
                the form for the database, please &nbsp;
                <a
                  href="https://wa.me/94706162457"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact us.
                </a>
              </li>
            </ol>
          </div>
        </>
      )}
    </>
  );
}
