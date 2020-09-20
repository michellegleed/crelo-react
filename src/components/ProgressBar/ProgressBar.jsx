import React, { useState, useEffect } from "react";

import "./ProgressBar.css";

const ProgressBar = (props) => {
  const { percentage, current, goal } = props;

  const [pc, setPercentage] = useState(0);

  const animationDelay = () => {
      setPercentage(percentage + 10.0);
  }

  useEffect(() => {
      const adInterval = setInterval(animationDelay, 0);
      return () => {
          clearInterval(adInterval);
          console.log("removed animation delay interval");
      }
  }, [])

  const fillerStyles = {
    width: `${pc <= 100 ? pc : 100}%`,
    backgroundColor: `${
      pc >= 100  ? "rgb(5, 209, 15)" : pc > 60 ? "rgb(255, 196, 0)" : "red"
    }`,
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
