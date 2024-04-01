import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/wtfadmin.module.css";
import Loading from "@/components/Loading";

const Modal = dynamic(() => import("@/components/wtfadmin/modal"));
const Footer = dynamic(() => import("@/components/Footer"));
const FirstRound = dynamic(() => import("@/components/Check/FirstRound"));

export default function Check() {
  const [loading, setLoading] = useState(false);
  const [examCenter, setExamCenter] = useState("");
  const [selectedRound, setSelectedRound] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    // You can add logic here to handle form submission
    // For now, let's just handle showing the appropriate round component
    if (selectedRound === "first") {
      // If the first round is selected, show the FirstRound component
      setSelectedRound("first");
    } else if (selectedRound === "final") {
      // Logic for handling final round
      // You can display a message or take appropriate action
      alert("Final round isn't configured yet.");
      setSubmitted(false);
    }
  };

  const handleExamCenterChange = (event) => {
    setExamCenter(event.target.value);
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Loading txt="Loading ..." />
      ) : (
        <>
          <div className={styles.content}>
            {submitted && selectedRound === "first" ? (
              <FirstRound examCenter={examCenter} />
            ) : (
              <form
                className={styles.selectSection}
                onSubmit={handleFormSubmit}
              >
                <select
                  value={examCenter}
                  onChange={handleExamCenterChange}
                  required
                >
                  <option value="">Select an Exam Center</option>
                  <option value="colombo">Isipathana College, Colombo</option>
                  <option value="matara">Rahula College, Matara</option>
                  <option value="kandy">St. Sylvester's College, Kandy</option>
                  <option value="anuradhapura">
                    Anuradhapura Central College, Anuradhapura
                  </option>
                </select>
                <select
                  value={selectedRound}
                  onChange={handleRoundChange}
                  required
                >
                  <option value="">Select a Round</option>
                  <option value="first">First Round</option>
                  <option value="final">Final Round</option>
                </select>
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
