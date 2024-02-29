import Head from "next/head";
import dynamic from "next/dynamic";

const Section1 = dynamic(() => import("@/components/home/Section1"));
const Section2 = dynamic(() => import("@/components/home/Section2"));
const Section4n5 = dynamic(() => import("@/components/home/Section4n5"));

export default function Home() {
  return (
    <>
      <Head>
        <title> SKY`24 | Home</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Section1 />
        <Section2 />
        <Section4n5 />
      </main>
    </>
  );
}
