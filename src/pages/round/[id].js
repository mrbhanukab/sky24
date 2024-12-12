import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/round.module.css";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
const FirstRound = dynamic(() => import("@/components/round/FirstRound"));
const FinalRound = dynamic(() => import("@/components/round/FinalRound"));

export default function Round() {
  const router = useRouter();
  const { id } = router.query;
  const [teams, setTeams] = useState([]);
  const [finalTeams, setFinalTeams] = useState([]);
  const [otherTeams, setOtherTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/teams.json");
        const jsonData = await response.json();
        if (id === "firstRound") {
          const selectedTeams = jsonData.filter((team) => team.selected === true);
          setTeams(selectedTeams);
        } else if (id === "finalRound") {
          const finalTeamsData = jsonData.filter((team) => team.final > 0);
          const topFinalTeams = finalTeamsData.filter((team) => team.final <= 3);
          const otherFinalTeams = finalTeamsData.filter((team) => team.final > 3);
          setFinalTeams(topFinalTeams);
          setOtherTeams(otherFinalTeams);
        }
      } catch (error) {
        alert("Error fetching data from JSON file.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          SKY24 | {id === "firstRound" ? "First Round" : "Final Round"} Results
          Sheet
        </title>
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
        <Loading txt="Fetching Data ..." />
      ) : id === "firstRound" ? (
        <FirstRound teams={teams} />
      ) : id === "finalRound" ? (
        <FinalRound finalTeams={finalTeams} otherTeams={otherTeams} />
      ) : (
        <div className={styles.mainContainer}>Something Went Wrong ...</div>
      )}
      <Footer />
    </>
  );
}