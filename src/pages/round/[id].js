import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/components/firebase";
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
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id === "firstRound") {
        const teamsRef = collection(db, "teams");
        const q = query(teamsRef, where("selected", "==", true));
        const querySnapshot = await getDocs(q);
        const teamsData = [];
        querySnapshot.forEach((doc) => {
          teamsData.push(doc.data());
        });
        setTeams(teamsData);
      } else if (id === "finalRound") {
        const teamsRef = collection(db, "teams");
        const q = query(teamsRef, where("final", ">", 0));
        const querySnapshot = await getDocs(q);
        const finalTeamsData = [];
        const otherTeamsData = [];
        querySnapshot.forEach((doc) => {
          const teamData = doc.data();
          if (teamData.final <= 3) {
            finalTeamsData.push(teamData);
          } else {
            otherTeamsData.push(teamData);
          }
        });
        setFinalTeams(finalTeamsData);
        setOtherTeams(otherTeamsData);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1200); // Set loading to false once data fetching is done
    };

    const getStatusFromFirestore = async () => {
      try {
        const docRef = doc(db, "system", "settings");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTimeout(() => {
            if (data.status < 4) {
              window.location.replace("/404");
            }
          }, 1000);
          setStatus(data.status);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    if (id) {
      fetchData();
      getStatusFromFirestore();
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
      </Head>
      {loading ? (
        <Loading txt="Fetching Data ..." />
      ) : id === "firstRound" && status > 4 w update? (
        <FirstRound teams={teams} />
      ) : id === "finalRound" && status > 6 ? (
        <FinalRound finalTeams={finalTeams} otherTeams={otherTeams} />
      ) : (
        <div className={styles.mainContainer}>Somthing Went Wrong ...</div>
      )}
      <Footer />
    </>
  );
}
