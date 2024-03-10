import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import styles from "@/styles/index.module.css";
import Link from "next/link";

const Section2 = dynamic(() => import("@/components/index/Section2"));

export default function Custom404() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title> SKY`24 | Page Not Found</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loading txt="Loading ..." />
      ) : (
        <section className={styles.section2}>
          <div className={styles.card2}>
            <h1>Page Not Found ...</h1>
            <p>
              Oops! It seems like you've ventured into uncharted cosmic
              territory. Fear not, fellow explorer!{" "}
              <b>
                Let us guide you back to our cosmic hub, where the wonders of
                the universe await.
              </b>{" "}
              Prepare for re-entry as we redirect you to our cosmic spaceship,
              ensuring your journey among the stars continues without
              interruption.
            </p>
            <div className={styles.btnGroup}>
              <Link className={styles.btn} href="/">
                Redirect Me
              </Link>
            </div>
          </div>
        </section>
      )}{" "}
    </>
  );
}
