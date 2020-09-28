import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import ProjectDetailCard from "../components/ProjectDetailCard/ProjectDetailCard";
import PledgeCard from "../components/PledgeCard/PledgeCard";

// import { oneProject } from "../data";

import { dateObjectFormatter, timeLeftFormatter } from "../utils/dateFormatter.js";
import ProjectAnalytics from "../components/ProjectAnalytics/ProjectAnalytics.jsx";
import PledgeForm from "../components/PledgeForm/PledgeForm.jsx";
// import ProjectCard from "../components/ProjectCard/ProjectCard.jsx";

function ProjectPage() {

  const [projectData, setProjectData] = useState({ updates: [], pledges: [] });

  const { id } = useParams();

  const [dateObj, setDateObj] = useState({});
  const [timeLeftObj, setTimeLeftObj] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`
      },
    })
      .then(results => {
        return results.json();
      })
      .then(data => {
        setProjectData(data);
        console.log(data);
      })
  }, [id]);

  useEffect(() => {
    setDateObj(dateObjectFormatter(projectData.date_created));
    setTimeLeftObj(timeLeftFormatter(projectData.due_date));
  }, [projectData]);

  return (
    <div>
      <h1>{projectData.title}</h1>

      <div id="creator-details">
        <p>Created by</p>
        <img src="" />
        <h3>{projectData.user}</h3>
      </div>

      <div className="sticky-sidebar">
        <div id="targets">
          <h4>Target: ${projectData.goal_amount}</h4>
          <h4>${projectData.current_amount_pledged} pledged</h4>
          <ProgressBar
            percentage={projectData.current_percentage_pledged}
            current={projectData.current_amount_pledged}
            goal={projectData.goal_amount}
          />
        </div>

        <div id="time-location">
          <h6>Location: {projectData.venue == "" ? `City of ${projectData.location}` : `${projectData.venue}`}</h6>

          <h6>Time Remaining: {timeLeftObj.days} days, {timeLeftObj.hours} hrs</h6>
        </div>

        {
          projectData.view_count != null ? <ProjectAnalytics project={projectData} /> : <PledgeForm project={projectData}/>
        }

      </div>

      <div className="project-content">
      <ProjectDetailCard image={projectData.image} date={projectData.date_created} content={projectData.description} />
      
        {
          projectData.updates.map((update, index) => {
          return <ProjectDetailCard image={update.image} date={update.date_posted} content={update.content} key={index} />
          })
        }
      </div>

      <div id="pledges">
        <h3>Pledges:</h3>
        <div>
          {projectData.pledges.map((pledge, index) => {
            return <PledgeCard key={index} pledge={pledge} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
