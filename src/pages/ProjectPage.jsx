import React from "react";

import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import PledgeCard from "../components/PledgeCard/PledgeCard";
import { oneProject } from "../data";
import { dateFormatter } from "../utils/dateFormatter.js";

function ProjectPage() {
  const dateObj = dateFormatter(oneProject.date_created);

  return (
    <div>
      <img src={oneProject.image} id="project-header-image"></img>
      <h2>{oneProject.title}</h2>
      <h3>
        Created on: {dateObj.date} at {dateObj.time}
      </h3>
      <h4>${oneProject.current_amount_pledged} pledged</h4>
      <ProgressBar
        percentage={oneProject.current_percentage_pledged}
        current={oneProject.current_amount_pledged}
        goal={oneProject.goal_amount}
      />
      <p>{oneProject.description}</p>
      <h3>Pledges:</h3>
      <ul>
        {oneProject.pledges.map((pledge, index) => {
          return <PledgeCard key={index} pledge={pledge} />;
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;
