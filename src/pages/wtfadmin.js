import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const Password = dynamic(() => import("../components/wtfadmin/password"));
const Viewer = dynamic(() => import("../components/wtfadmin/viewer"));
const Admin = dynamic(() => import("../components/wtfadmin/admin"));

export default function Wtfadmin() {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
  }, []);

  const pullData = (data) => {
    setType(data);
  };

  return (
    <>
      <Head>
        <title>SKY`24 | Admin Dashboard</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
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
    case "viewer":
      return <Viewer />;
    case "admin":
      return <Admin />;
    default:
      return <Password func={pullData} />;
  }
}
