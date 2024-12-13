import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/wtfadmin.module.css";
import Loading from "@/components/Loading";

const Modal = dynamic(() => import("@/components/wtfadmin/modal"));

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
    const fetchDataFromJson = async () => {
      try {
        const response = await fetch("/sky24/teams.json");
        const jsonData = await response.json();
        const teams = Object.values(jsonData); // Convert the object to an array
        const numTeamsInCenter = teams.filter(
          (team) => team.selectedCenter === examCenter
        ).length;
        setData((prevData) => ({ ...prevData, teamsCount: numTeamsInCenter }));

        const uniqueSchools = new Set();
        const schools = [];
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

        teams.forEach((team) => {
          const formData = team.formData;
          if (formData && formData.schoolName) {
            const schoolName = formData.schoolName;
            if (team.selectedCenter === examCenter) {
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

          const membersArray = team.members;
          let memberData = {
            school: formData.schoolName,
            language: formData.language,
          };
          memberData.team = team.selectedTeam;
          memberData.location = team.selectedCenter;

          if (memberData.location === examCenter) {
            membersArray.forEach((member, index) => {
              memberData[
                `member${index + 1}`
              ] = `${member.name} (${member.whatsappNumber})`;

              languageCountsObj[formData.language]++;
              centerCountsObj[examCenter]++;
            });

            if (team.firstCheck === true) {
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
          schoolsCount: uniqueSchools.size,
          schoolsData: schools,
          membersData: members,
          languageCounts: languageCountsObj,
          centerCounts: centerCountsObj,
          checkedTeamsCount: checkedTeamsCount,
        }));
      } catch (error) {
        alert("Error fetching data from JSON file.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromJson();
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

  const handleSubmitCheck = (data) => {
    const updatedMembersData = memoizedMembersData.map((member) => {
      if (member.school === data.school && member.team === data.team) {
        return { ...member, firstCheck: "checked" };
      }
      return member;
    });

    setData((prevData) => ({
      ...prevData,
      membersData: updatedMembersData,
      checkedTeamsCount: prevData.checkedTeamsCount + 1,
    }));

    closeCheckModal();
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
              onSubmitCheck={() => handleSubmitCheck(checkModalData)}
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