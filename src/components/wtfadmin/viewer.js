import React, { useState, useEffect, useMemo } from "react";
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
    const fetchDataFromJson = async () => {
      try {
        const response = await fetch("/sky24/teams.json");
        const jsonData = await response.json();
        const teams = Object.values(jsonData); // Convert the object to an array
        const numTeams = teams.length;
        setData((prevData) => ({ ...prevData, teamsCount: numTeams }));

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
          anuradhapura: 0,
          kandy: 0,
          colombo: 0,
          matara: 0,
        };

        teams.forEach((team) => {
          const formData = team.formData;
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

          const membersArray = team.members;
          let memberData = {
            school: formData.schoolName,
            language: formData.language,
            selected: team.selected || null,
            final: team.final || null,
            firstround: team.firstround || null,
            finalround: team.finalround || null,
          };
          memberData.team = team.selectedTeam;
          memberData.location = team.selectedCenter;

          membersArray.forEach((member, index) => {
            memberData[
              `member${index + 1}`
            ] = `${member.name} (${member.whatsappNumber})`;

            languageCountsObj[formData.language]++;
            centerCountsObj[team.selectedCenter]++;
          });

          members.push(memberData);
        });

        setData((prevData) => ({
          ...prevData,
          schoolsCount: uniqueSchools.size,
          schoolsData: schools,
          membersData: members,
          languageCounts: languageCountsObj,
          centerCounts: centerCountsObj,
        }));
      } catch (error) {
        alert("Error fetching data from JSON file.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchDataFromJson();
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
            <h1>Statistics [View Only]</h1>
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
          </div>
          <Footer />
        </>
      )}
    </>
  );
}