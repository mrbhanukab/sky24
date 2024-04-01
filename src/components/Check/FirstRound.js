import React, { useState, useEffect, useMemo } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/components/firebase";
import dynamic from "next/dynamic";
import styles from "@/styles/wtfadmin.module.css";
import Loading from "@/components/Loading";

const Modal = dynamic(() => import("@/components/wtfadmin/modal"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function FirstRound({ examCenter }) {
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [checkModalData, setCheckModalData] = useState(null);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [data, setData] = useState({
    schoolsData: [],
    membersData: [],
    schoolsCount: 0,
    teamsCount: 0,
    checkedTeamsCount: 0,
    languageCounts: {
      sinhala: 0,
      english: 0,
      tamil: 0,
      multilingual: 0,
    },
    centerCounts: {
      [examCenter]: 0,
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
        }

        const teamsQuerySnapshot = await getDocs(collection(db, "teams"));
        const numTeamsInCenter = teamsQuerySnapshot.docs.filter(
          (doc) => doc.data().selectedCenter === examCenter
        ).length;
        setData((prevData) => ({ ...prevData, teamsCount: numTeamsInCenter }));

        const uniqueSchools = new Set();
        const schools = [];
        teamsQuerySnapshot.forEach((doc) => {
          const formData = doc.data().formData;
          if (formData && formData.schoolName) {
            const schoolName = formData.schoolName;
            if (doc.data().selectedCenter === examCenter) {
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
          [examCenter]: 0,
        };
        let checkedTeamsCount = 0;

        teamsQuerySnapshot.forEach((doc) => {
          const formData = doc.data().formData;
          const membersArray = doc.data().members;

          let memberData = {
            school: formData.schoolName,
            language: formData.language,
          };
          memberData.team = doc.data().selectedTeam;
          memberData.location = doc.data().selectedCenter;

          if (memberData.location === examCenter) {
            membersArray.forEach((member, index) => {
              memberData[
                `member${index + 1}`
              ] = `${member.name} (${member.whatsappNumber})`;

              languageCountsObj[formData.language]++;
              centerCountsObj[examCenter]++;
            });

            if (doc.data().firstCheck === true) {
              memberData.firstCheck = "checked";
              checkedTeamsCount++;
            } else {
              memberData.firstCheck = "not checked";
            }

            members.push(memberData);
          }
        });

        setData((prevData) => ({
          ...prevData,
          membersData: members,
          languageCounts: languageCountsObj,
          centerCounts: centerCountsObj,
          checkedTeamsCount: checkedTeamsCount,
        }));
      } catch (error) {
        alert("Error fetching data from Firestore. Slow Internet?");
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirestore();
  }, [examCenter]);

  const openSchoolModal = (schoolName) => {
    setSelectedSchool(schoolName);
  };

  const openTeamModal = (teamName) => {
    setSelectedTeam(teamName);
  };

  const openCheckModal = (schoolData) => {
    setCheckModalData(schoolData);
    setShowCheckModal(true);
  };

  const closeSchoolModal = () => {
    setSelectedSchool(null);
  };

  const closeTeamModal = () => {
    setSelectedTeam(null);
  };

  const closeCheckModal = () => {
    setCheckModalData(null);
    setShowCheckModal(false);
  };

  const memoizedMembersData = useMemo(
    () => data.membersData,
    [data.membersData]
  );

  const handleSubmitCheck = async (data) => {
    try {
      const teamsRef = collection(db, "teams");
      const q = query(
        teamsRef,
        where("formData.schoolName", "==", data.school),
        where("selectedTeam", "==", data.team)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await updateDoc(doc(teamsRef, docId), {
          firstCheck: true,
        });

        const fetchDataFromFirestore = async () => {
          try {
            const statusDocRef = doc(db, "system", "settings");
            const statusDocSnap = await getDoc(statusDocRef);
            if (statusDocSnap.exists()) {
              const statusData = statusDocSnap.data();
              setData((prevData) => ({
                ...prevData,
                status: statusData.status,
              }));
            }

            const teamsQuerySnapshot = await getDocs(collection(db, "teams"));
            const numTeamsInCenter = teamsQuerySnapshot.docs.filter(
              (doc) => doc.data().selectedCenter === examCenter
            ).length;
            setData((prevData) => ({
              ...prevData,
              teamsCount: numTeamsInCenter,
            }));

            const uniqueSchools = new Set();
            const schools = [];
            teamsQuerySnapshot.forEach((doc) => {
              const formData = doc.data().formData;
              if (formData && formData.schoolName) {
                const schoolName = formData.schoolName;
                if (doc.data().selectedCenter === examCenter) {
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
              [examCenter]: 0,
            };
            let checkedTeamsCount = 0;

            teamsQuerySnapshot.forEach((doc) => {
              const formData = doc.data().formData;
              const membersArray = doc.data().members;

              let memberData = {
                school: formData.schoolName,
                language: formData.language,
              };
              memberData.team = doc.data().selectedTeam;
              memberData.location = doc.data().selectedCenter;

              if (memberData.location === examCenter) {
                membersArray.forEach((member, index) => {
                  memberData[
                    `member${index + 1}`
                  ] = `${member.name} (${member.whatsappNumber})`;

                  languageCountsObj[formData.language]++;
                  centerCountsObj[examCenter]++;
                });

                if (doc.data().firstCheck === true) {
                  memberData.firstCheck = "checked";
                  checkedTeamsCount++;
                } else {
                  memberData.firstCheck = "not checked";
                }

                members.push(memberData);
              }
            });

            setData((prevData) => ({
              ...prevData,
              membersData: members,
              languageCounts: languageCountsObj,
              centerCounts: centerCountsObj,
              checkedTeamsCount: checkedTeamsCount,
            }));
          } catch (error) {
            alert("Error fetching data from Firestore. Slow Internet?");
          } finally {
            setLoading(false);
          }
        };

        fetchDataFromFirestore();

        // Close the check modal
        closeCheckModal();
      } else {
        console.error("Document not found for school and team ID:", data);
      }
    } catch (error) {
      console.error("Error updating database:", error);
      // Handle error as needed
    }
  };

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
          {showCheckModal && checkModalData && (
            <Modal
              data={checkModalData}
              type="check"
              onClose={closeCheckModal}
              onSubmitCheck={() => handleSubmitCheck(checkModalData)} // Pass a function
            />
          )}

          <div className={styles.content}>
            <h1>
              {examCenter.charAt(0).toUpperCase() + examCenter.slice(1)} Center
              Info
            </h1>
            <section className={styles.section}>
              <div>
                Schools<span>{data.schoolsCount}</span>
              </div>
              <div>
                Teams<span>{data.teamsCount}</span>
              </div>
              <div>
                Confirmed<span>{data.checkedTeamsCount}</span>
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
                <h4>Total:{data.centerCounts[examCenter]} People</h4>
              </div>
            </section>
            <table className={styles.Table}>
              <caption>Registered Members</caption>
              <thead>
                <tr>
                  <th>School</th>
                  <th>Team</th>
                  <th>Language</th>
                  <th>Status</th>
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
                    <td>
                      {member.firstCheck === "checked" ? (
                        <b>Checked ✅</b>
                      ) : (
                        <button onClick={() => openCheckModal(member)}>
                          Check
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
