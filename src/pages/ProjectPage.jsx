import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import ProjectDetailCard from "../components/ProjectDetailCard/ProjectDetailCard";
import PledgeCard from "../components/PledgeCard/PledgeCard";

// import { oneProject } from "../data";



import { dateObjectFormatter, timeLeftFormatter } from "../utils/dateFormatter.js";
import ProjectAnalytics from "../components/ProjectAnalytics/ProjectAnalytics.jsx";
import PledgeForm from "../components/Forms/PledgeForm/PledgeForm.jsx";
import DeleteProjectForm from "../components/DeleteProjectForm/DeleteProjectForm.jsx";
import StickySidebar from "../components/ProjectStickySidebar/StickySidebar.jsx";
// import ProjectCard from "../components/ProjectCard/ProjectCard.jsx";

function ProjectPage() {

  const [projectData, setProjectData] = useState({ user: {}, updates: [], pledges: [] });

  const { id } = useParams();

  const [dateObj, setDateObj] = useState({});
  const [timeLeftObj, setTimeLeftObj] = useState({});
  const [dueDateObj, setDueDateObj] = useState({});

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
    setDueDateObj(dateObjectFormatter(projectData.due_date));
  }, [projectData]);

  const closeProject = async () => {
    const dateNow = new Date();
    const dateIso = dateNow.toISOString();

    const token = window.localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`
      },
      body: JSON.stringify({ due_date: dateIso }),
    });
    return response.json();
  }

  return (
    <div>

      <h1>{projectData.title}</h1>

      <div id="creator-details">
        <p>Created by</p>
        <img src="" />
        <h3>{projectData.user.username}</h3>
      </div>

      {
        projectData.is_open ? null : <h2 id="project-closed-warning">** This Project is now Closed to Pledges **</h2>
      }

      {
        projectData.view_count != null ? <button onClick={closeProject}>Close This Project</button> : null
      }

      {
        projectData.view_count != null ?
          <Link to={`/project/${id}/update`}>Update Project</Link>
          :
          null
      }

      <StickySidebar projectData={projectData} timeLeftObj={timeLeftObj} dueDateObj={dueDateObj} />

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
