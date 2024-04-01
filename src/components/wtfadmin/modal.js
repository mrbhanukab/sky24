import { useState } from "react";
import styles from "@/styles/wtfadmin.module.css";

const Modal = ({
  data,
  onClose,
  type,
  status,
  onSubmitStatus,
  onSubmitCheck,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = () => {
    onSubmitStatus(selectedStatus);
    onClose();
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        {type === "status" && (
          <>
            <h2>Select Status</h2>
            <input
              type="number"
              id="status"
              name="quantity"
              min="2"
              max="8"
              value={selectedStatus}
              onChange={handleStatusChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
        {type === "school" && (
          <>
            <h2>{data.schoolName}</h2>
            <p>
              <strong>School Address:</strong> {data.schoolAddress}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Teacher In Charge:</strong> {data.teacherInCharge}
            </p>
            <p>
              <strong>TIC Contact:</strong> {data.ticContact}
            </p>
            <p>
              <strong>President:</strong> {data.president}
            </p>
            <p>
              <strong>President Contact:</strong> {data.presidentContact}
            </p>
          </>
        )}
        {type === "team" && (
          <>
            <h2>
              {data.school} | Team {data.team}
            </h2>
            <p>
              <strong>Exam Center:</strong> {data.location}
            </p>
            <p>
              <strong>Language:</strong> {data.language}
            </p>
            {[1, 2, 3, 4, 5].map((index) => (
              <p key={index}>
                <strong>Member {index}:</strong> {data[`member${index}`]}
              </p>
            ))}
          </>
        )}
        {type === "check" && (
          <>
            <h2>Are you sure?</h2>
            <p>Did these people,</p>
            {[1, 2, 3, 4, 5].map((index) => (
              <p key={index}>
                <strong>Member {index}:</strong> {data[`member${index}`]}
              </p>
            ))}
            <p>
              representing{" "}
              <strong>
                {data.school} {data.team}
              </strong>{" "}
              come? Setting check to true in the database, maybe irreversible.
            </p>
            <button onClick={onSubmitCheck}>
              Yeah, they are in front of me
            </button>
          </>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
