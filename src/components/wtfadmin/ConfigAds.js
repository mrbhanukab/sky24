// ConfigAds.js

import { useState } from "react";
import Styles from "@/styles/Ads.module.css";

export default function ConfigAds(props) {
  const [mainVideoId, setMainVideoId] = useState(props.adsData.Main);
  const [othersVideoIds, setOthersVideoIds] = useState(props.adsData.Others);
  const [display, setDisplay] = useState(props.adsData.display);

  const handleMainVideoIdChange = (event) => {
    setMainVideoId(event.target.value);
  };

  const handleOthersVideoIdChange = (sponsor, event) => {
    setOthersVideoIds({
      ...othersVideoIds,
      [sponsor]: event.target.value,
    });
  };

  const handleDisplayChange = (event) => {
    setDisplay(event.target.checked);
  };

  const handleSubmit = () => {
    // Submit the updated data
    const updatedData = {
      Main: mainVideoId,
      display: display,
      Others: othersVideoIds,
    };
    props.onSubmit(updatedData); // Call parent function to submit data
  };

  return (
    <div className={Styles.mainConfigContainer}>
      <div className={Styles.input}>
        <h1>Config Advertisement Info</h1>
        <label>Main Video ID:</label>
        <input
          type="text"
          value={mainVideoId}
          onChange={handleMainVideoIdChange}
        />
        {Object.entries(othersVideoIds).map(([sponsor, videoId]) => (
          <div key={sponsor}>
            <label>{sponsor} Video ID:</label>
            <input
              type="text"
              value={videoId}
              onChange={(e) => handleOthersVideoIdChange(sponsor, e)}
            />
          </div>
        ))}
      </div>
      <label>
        Display
        <input
          type="checkbox"
          checked={display}
          onChange={handleDisplayChange}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
