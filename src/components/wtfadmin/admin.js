import React, { useState, useEffect, useMemo } from "react";
import { doc, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase";
import dynamic from "next/dynamic";
import styles from "@/styles/wtfadmin.module.css";
import Loading from "@/components/Loading";

const Modal = dynamic(() => import("@/components/wtfadmin/modal"));
const Footer = dynamic(() => import("../Footer"));
const FirstResults = dynamic(() => import("./FirstResults"));
const FinalResults = dynamic(() => import("./FinalResults"));
const Ads = dynamic(() => import("./../Ads"));
const ConfigAds = dynamic(() => import("./ConfigAds"));

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(2);
  const [adsData, setAdsData] = useState(null);
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
        // Fetch status data
        const statusDocRef = doc(db, "system", "settings");
        const statusDocSnap = await getDoc(statusDocRef);

        if (statusDocSnap.exists()) {
          const statusData = statusDocSnap.data();
          setData((prevData) => ({ ...prevData, status: statusData.status }));
        }

        // Fetch teams data
        const teamsQuerySnapshot = await getDocs(collection(db, "teams"));
        const numTeams = teamsQuerySnapshot.size;
        setData((prevData) => ({ ...prevData, teamsCount: numTeams }));

        // Extract unique schools data
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

        // Extract members data
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
            selected: doc.data().selected || null,
            final: doc.data().final || null,
            firstround: doc.data().firstround || null,
            finalround: doc.data().finalround || null,
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

        // Fetch ads data
        const adsDocRef = doc(db, "system", "Ads"); // Assuming "Ads" document exists in the "system" collection
        const adsDocSnap = await getDoc(adsDocRef);

        if (adsDocSnap.exists()) {
          const adsData = adsDocSnap.data();
          setAdsData(adsData); // Assuming you have a useState for ads data
        }
      } catch (error) {
        alert("Error fetching data from Firestore. Slow Internet?");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
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

  const toggleStatusModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async () => {
    const statusInt = parseInt(selectedStatus);

    if (isNaN(statusInt)) {
      alert("Status must be a valid integer.");
      return;
    }

    try {
      await setDoc(doc(db, "system", "settings"), { status: statusInt });

      const statusDocRef = doc(db, "system", "settings");
      const statusDocSnap = await getDoc(statusDocRef);

      if (statusDocSnap.exists()) {
        const statusData = statusDocSnap.data();
        setData((prevData) => ({
          ...prevData,
          status: statusData.status,
        }));
      }
    } catch (error) {
      alert("Error updating status!");
    }
  };

  const handleToggleResult = (resultType) => {
    setSelectedResult(selectedResult === resultType ? null : resultType);
  };

  const handleAdSubmit = async (updatedData) => {
    // Update state with new data

    // Update data in the database
    try {
      setAdsData(updatedData);
      const adsDocRef = doc(db, "system", "Ads");
      await setDoc(adsDocRef, updatedData);
      alert("Ads data updated successfully in the database.");
    } catch (error) {
      alert("Error updating ads data in the database. Slow Internet?");
    }
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
          {isModalOpen && (
            <Modal
              type="status"
              isOpen={isModalOpen}
              onClose={toggleStatusModal}
              status={selectedStatus}
              onSubmitStatus={(newStatus) => {
                setSelectedStatus(newStatus);
                handleSubmit();
              }}
            />
          )}
          <div className={styles.content}>
            <h1>Statistics [Sudo Mode]</h1>
            <section className={styles.section}>
              <div>
                Schools<span>{data.schoolsCount}</span>
              </div>
              <div>
                Teams<span>{data.teamsCount}</span>
              </div>
              <div onClick={toggleStatusModal}>
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
                {memoizedMembersData
                  .sort((a, b) => {
                    // First, sort by school name
                    const schoolComparison = a.school.localeCompare(b.school);
                    if (schoolComparison !== 0) {
                      return schoolComparison;
                    }
                    // If school names are the same, sort by team name
                    return a.team.localeCompare(b.team);
                  })
                  .map((member, index) => (
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
            <section className={styles.section}>
              <button
                className={styles.button}
                onClick={() => handleToggleResult("first")}
              >
                First Round Result
              </button>
              <button
                className={styles.button}
                onClick={() => handleToggleResult("final")}
              >
                Final Round Result
              </button>
              <button
                className={styles.button}
                onClick={() => handleToggleResult("ads")}
              >
                Advertisement
              </button>
            </section>
            {selectedResult === "first" && (
              <FirstResults
                data={data}
                onClose={() => handleToggleResult("first")}
              />
            )}
            {selectedResult === "final" && (
              <FinalResults
                data={data}
                onClose={() => handleToggleResult("final")}
              />
            )}
            {selectedResult === "ads" && (
              <>
                <ConfigAds adsData={adsData} onSubmit={handleAdSubmit} />
                <h3>Preview</h3>
                <Ads adsData={adsData} />
              </>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
