import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import Image from "next/image";
import styles from "@/styles/index.module.css";

const Section2 = dynamic(() => import("@/components/index/Section2"));

export default function Home() {
  const [images, setImages] = useState({
    Particals: null,
    SchoolLogo: null,
    SkyLogo: null,
  });
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    const fetchAndStoreImage = async (imageUrl, sessionStorageKey) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.addEventListener("load", () => {
          setImages((prevImages) => ({
            ...prevImages,
            [sessionStorageKey]: reader.result,
          }));
        });
      } catch (error) {
        console.error("Error fetching or reading the image:", error);
      }
    };

    fetchAndStoreImage("assets/Particals.png", "Particals");
    fetchAndStoreImage("assets/School-Logo.png", "SchoolLogo");
    fetchAndStoreImage("assets/Sky%20Logo.png", "SkyLogo");
    setLoading(2);
    setTimeout(() => {
      setLoading(3);
    }, 1500);
  }, []);

  return (
    <>
      <Head>
        <title> SKY`24 | Home</title>
        <meta
          name="description"
          content="Welcome to Sky24, your gateway to thrilling quiz competitions hosted by ICAS. Dive into the world of knowledge and excitement as you challenge your intellect against competitors from around the globe. Join us on a journey where curiosity meets competition."
        />
        <meta property="og:title" content="SKY`24 | Home" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://sky24-icas.web.app" />
        <meta
          property="og:description"
          content="Welcome to Sky24, your gateway to thrilling quiz competitions hosted by ICAS. Dive into the world of knowledge and excitement as you challenge your intellect against competitors from around the globe. Join us on a journey where curiosity meets competition."
        />
        <meta
          name="keywords"
          content="Isipathana College, Isipathana College Astronomy Society (ICAS), Sri Lanka Astronomy, Astronomy Education, Sky Observation, ICAS SKY Program, ICAS SKY24, Sky24 Telescope, Sri Lankan Astronomy Clubs, Colombo Astronomy, Isipathana College astronomy club activities, Learn astronomy in Sri Lanka, How to observe the sky in Sri Lanka, Sri Lankan astrophotography, Upcoming astronomy events in Sri Lanka"
        />
        <meta charset="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
      {loading === 1 || loading === 2 ? (
        <Loading txt="Loading Assets ..." />
      ) : (
        ""
      )}
      {loading === 2 || loading === 3 ? (
        <>
          <main>
            <section className={styles.section}>
              <div className={styles.schoolContainer}>
                {images.Particals && (
                  <Image
                    className={styles.Particals}
                    src={images.Particals}
                    width={1000}
                    height={1000}
                    alt="Particals.png"
                  />
                )}
                <h3>Isipathana College Astronomy Society</h3>
                {images.SchoolLogo && (
                  <Image
                    className={styles.school}
                    src={images.SchoolLogo}
                    width={1000}
                    height={1000}
                    alt="School-Logo.png"
                  />
                )}
              </div>
              {images.SkyLogo && (
                <Image
                  className={styles.logo}
                  src={images.SkyLogo}
                  width={1000}
                  height={1000}
                  alt="Sky Logo.png"
                />
              )}
              <p className={styles.text}>Scroll Down ↓</p>
            </section>
            <Section2 />
            <Section3 />
          </main>
          <Footer />
        </>
      ) : (
        ""
      )}
    </>
  );
}

function Section3() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1>ICAS ...</h1>
        <p>
          I.C.A.S. (Isipathana College Astronomical Society) was founded in the
          year 2004. The association aims to develop the astronomical knowledge
          of Isipathana College students. They also hold various competitions to
          enhance the interest of Sri Lankan astronomy enthusiasts.
        </p>
        <div className={styles.social}>
          <a
            href="https://www.facebook.com/isipathana.astro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.simg}
              src="/assets/sicons/facebook.png"
              width={100}
              height={100}
              alt="Facebook"
            />
          </a>
          <a
            href="https://www.instagram.com/isipathana.astro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.simg}
              src="/assets/sicons/instgram.png"
              width={100}
              height={100}
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.youtube.com/@isipathana-astro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.simg}
              src="/assets/sicons/youtube.png"
              width={100}
              height={100}
              alt="Youtube"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
