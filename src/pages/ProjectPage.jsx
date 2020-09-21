import React from "react";

import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import ProjectDetailCard from "../components/ProjectDetailCard/ProjectDetailCard";
import PledgeCard from "../components/PledgeCard/PledgeCard";

import { oneProject } from "../data";

import { dateObjectFormatter, timeLeftFormatter } from "../utils/dateFormatter.js";
// import ProjectCard from "../components/ProjectCard/ProjectCard.jsx";

function ProjectPage() {

  const dateObj = dateObjectFormatter(oneProject.date_created);
  const timeLeftObj = timeLeftFormatter(oneProject.due_date);

  return (
    <div>

      <h1>{oneProject.title}</h1>

      <div id="creator-details">
        <p>Created by</p>
        <img src="" />
        <h3>{oneProject.user}</h3>
      </div>

      <div className="sticky-sidebar">
        <div id="targets">
          <h4>Target: ${oneProject.goal_amount}</h4>
          <h4>${oneProject.current_amount_pledged} pledged</h4>
          <ProgressBar
            percentage={oneProject.current_percentage_pledged}
            current={oneProject.current_amount_pledged}
            goal={oneProject.goal_amount}
          />
        </div>

        <div id="time-location">
          <h6>Location: {oneProject.venue == "" ? `City of ${oneProject.location}` : `${oneProject.venue}`}</h6>

          <h6>Time Remaining: {timeLeftObj.days} days, {timeLeftObj.hours} hrs</h6>
        </div>

        <div id="pledge-form">
          <h3>Make A Pledge...</h3>
          <form>
            <input placeholder="Enter amount" id="pledge-value"></input>
            <textarea placeholder="Add a comment" id="pledge-comment"></textarea>
            <label for="anonymous">Keep this anonymous</label>
            <input type="checkbox" id="anonymous"></input>
            <button>Submit</button>
          </form>
        </div>
      </div>

      <div className="project-content">
      <ProjectDetailCard image={oneProject.image} date={dateObj.date} content={oneProject.description} />

      {oneProject.updates.map((update, index) => {
        const date = dateObjectFormatter(update.date_posted);
        return <ProjectDetailCard image={update.image} date={date.date} content={update.content} key={index} />
      })}
      </div>

      <div id="pledges">
        <h3>Pledges:</h3>
        <div>
          {oneProject.pledges.map((pledge, index) => {
            return <PledgeCard key={index} pledge={pledge} />;
          })}
        </div>
      </div>

    </div>
  );
}

export default ProjectPage;
