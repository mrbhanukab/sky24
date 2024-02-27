import Head from "next/head";
import Section1 from "@/components/home/Section1";
import Section4n5 from "@/components/home/Section4n5";
import Section2 from "@/components/home/Section2";
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
