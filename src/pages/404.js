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
    }, 800);
    setTimeout(() => {
      window.location.replace("/sky24/");
    }, 4000);
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.webp"
        />
        <link
          rel="icon"
          type="image/webp"
          sizes="32x32"
          href="/favicon-32x32.webp"
        />
        <link
          rel="icon"
          type="image/webp"
          sizes="16x16"
          href="/favicon-16x16.webp"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                Let us guide you back(within 5sec) to our cosmic hub, where the
                wonders of the universe await.
              </b>{" "}
              Prepare for re-entry as we redirect you to our cosmic spaceship,
              ensuring your journey among the stars continues without
              interruption.
            </p>
            <div className={styles.btnGroup}>
              <Link className={styles.btn} href="/">
                Redirect Me Now
              </Link>
            </div>
          </div>
        </section>
      )}{" "}
    </>
  );
}
