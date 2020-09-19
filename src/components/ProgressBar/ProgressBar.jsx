import React, { useState, useEffect } from "react";

import "./ProgressBar.css";

const ProgressBar = (props) => {
  const { percentage, current, goal } = props;

  // const [percentage, setPercentage] = useState(0);

  // const animationDelay = () => {
  //     setPercentage(percentage);
  // }

  // const useEffect = () => {
  //     setInterval(animationDelay, 5000);
  //     return clearInterval(animationDelay);
  // }

  const fillerStyles = {
    height: `${percentage}%`,
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="completed-section" style={fillerStyles}>
          <span className="label">{`${percentage}%`}</span>
        </div>
      </div>
      <p>Goal ${goal}</p>
    </div>
  );
};

export default ProgressBar;
