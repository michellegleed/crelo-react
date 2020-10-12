import React, { useState, useEffect } from "react";

import "./ProgressBar.css";

const ProgressBar = (props) => {
  const { percentage } = props;

  const [fillerStyles, setFillerStyles] = useState({});

  useEffect(() => {
    console.log("percentage is... ", percentage);
    if (percentage) {
      setFillerStyles({
        width: `${percentage <= 100 ? percentage : 100}%`,
        backgroundColor: `${percentage >= 100 ? "rgb(5, 209, 15)" : percentage > 60 ? "rgb(255, 196, 0)" : "red"
          }`,
      })
    }
  }, [percentage]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="completed-section" style={fillerStyles}>
          <span className="label">{`${percentage}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
