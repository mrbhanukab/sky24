import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const Password = dynamic(() => import("../components/wtfadmin/password"));
const Check = dynamic(() => import("../components/Check/Check"));

export default function WTFcheck() {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
  }, []);

  const pullData = (data) => {
    setType(data);
  };

  return (
    <>
      <Head>
        <title>SKY`24 | WTFcheck</title>
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
      </Head>
      {loading ? (
        <Loading txt="Loading ..." />
      ) : (
        <Content type={type} pullData={pullData} />
      )}
    </>
  );
}

function Content({ type, pullData }) {
  switch (type) {
    case null:
      return <Password func={pullData} />;
    case "check":
      return <Check />;
    case "admin":
      return <Check />;
    default:
      return <Password func={pullData} />;
  }
}
