import React, { useState, useEffect, useMemo } from "react";
import { doc, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase";
import dynamic from "next/dynamic";
import styles from "@/styles/wtfadmin.module.css";
import Loading from "@/components/Loading";

const Modal = dynamic(() => import("@/components/wtfadmin/modal"));
const Footer = dynamic(() => import("../Footer"));

export default function Viewer() {
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [data, setData] = useState({
    schoolsData: [],
    membersData: [],
    schoolsCount: 0,
    teamsCount: 0,
    status: 2,
    languageCounts: {
      sinhala: 0,
      english: 0,
      tamil: 0,
      multilingual: 0,
    },
    centerCounts: {
      anuradhapura: 0,
      kandy: 0,
      colombo: 0,
      matara: 0,
    },
  });

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const statusDocRef = doc(db, "system", "settings");
        const statusDocSnap = await getDoc(statusDocRef);
        if (statusDocSnap.exists()) {
          const statusData = statusDocSnap.data();
          setData((prevData) => ({ ...prevData, status: statusData.status }));
        } else {
          console.log("No status document found!");
        }

        const teamsQuerySnapshot = await getDocs(collection(db, "teams"));
        const numTeams = teamsQuerySnapshot.size;
        setData((prevData) => ({ ...prevData, teamsCount: numTeams }));

        const uniqueSchools = new Set();
        const schools = [];
        teamsQuerySnapshot.forEach((doc) => {
          const formData = doc.data().formData;
          if (formData && formData.schoolName) {
            const schoolName = formData.schoolName;
            if (!uniqueSchools.has(schoolName)) {
              uniqueSchools.add(schoolName);
              const schoolData = {
                schoolName: schoolName,
                schoolAddress: formData.schoolAddress,
                email: formData.societyEmail,
                teacherInCharge: formData.teacherInCharge,
                ticContact: formData.ticContactNumber,
                president: formData.presidentName,
                presidentContact: formData.presidentContactNumber,
              };
              schools.push(schoolData);
            }
          }
        });
        setData((prevData) => ({
          ...prevData,
          schoolsCount: uniqueSchools.size,
          schoolsData: schools,
        }));

        const members = [];
        const languageCountsObj = {
          sinhala: 0,
          english: 0,
          tamil: 0,
          multilingual: 0,
        };
        const centerCountsObj = {
          anuradhapura: 0,
          kandy: 0,
          colombo: 0,
          matara: 0,
        };

        teamsQuerySnapshot.forEach((doc) => {
          const formData = doc.data().formData;
          const membersArray = doc.data().members;

          let memberData = {
            school: formData.schoolName,
            language: formData.language,
          };
          memberData.team = doc.data().selectedTeam;
          memberData.location = doc.data().selectedCenter;

          membersArray.forEach((member, index) => {
            memberData[
              `member${index + 1}`
            ] = `${member.name} (${member.whatsappNumber})`;

            languageCountsObj[formData.language]++;
            centerCountsObj[doc.data().selectedCenter]++;
          });

          members.push(memberData);
        });

        setData((prevData) => ({
          ...prevData,
          membersData: members,
          languageCounts: languageCountsObj,
          centerCounts: centerCountsObj,
        }));
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchDataFromFirestore();
  }, []);

  const openSchoolModal = (schoolName) => {
    setSelectedSchool(schoolName);
  };

  const openTeamModal = (teamName) => {
    setSelectedTeam(teamName);
  };

  const closeSchoolModal = () => {
    setSelectedSchool(null);
  };

  const closeTeamModal = () => {
    setSelectedTeam(null);
  };

  const memoizedMembersData = useMemo(
    () => data.membersData,
    [data.membersData]
  );

  return (
    <>
      {loading ? (
        <Loading txt="Loading ..." />
      ) : (
        <>
          {selectedSchool !== null && (
            <Modal
              data={data.schoolsData.find(
                (school) => school.schoolName === selectedSchool
              )}
              type="school"
              onClose={closeSchoolModal}
            />
          )}
          {selectedTeam !== null && (
            <Modal
              data={memoizedMembersData.find(
                (member) => member.school + member.team === selectedTeam
              )}
              onClose={closeTeamModal}
              type="team"
            />
          )}
          <div className={styles.content}>
            <h1>Statistics - Admin</h1>
            <section className={styles.section}>
              <div>
                Schools<span>{data.schoolsCount}</span>
              </div>
              <div>
                Teams<span>{data.teamsCount}</span>
              </div>
              <div>
                Status<span>{data.status}</span>
              </div>
            </section>
            <section className={styles.numbersSec}>
              <div>
                <h1>Language Info</h1>
                {Object.entries(data.languageCounts).map(
                  ([language, count]) => (
                    <p key={language}>{`${language}: ${count} People`}</p>
                  )
                )}
              </div>
              <div>
                <h1>Centers Info</h1>
                {Object.entries(data.centerCounts).map(([center, count]) => (
                  <p key={center}>{`${center}: ${count} People`}</p>
                ))}
              </div>
            </section>
            <table className={styles.Table}>
              <caption>Registered Members</caption>
              <thead>
                <tr>
                  <th>School</th>
                  <th>Team</th>
                  <th>Language</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {memoizedMembersData.map((member, index) => (
                  <tr key={index}>
                    <td>
                      <button onClick={() => openSchoolModal(member.school)}>
                        {member.school}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          openTeamModal(member.school + member.team)
                        }
                      >
                        {member.team}
                      </button>
                    </td>
                    <td>{member.language}</td>
                    <td>{member.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
