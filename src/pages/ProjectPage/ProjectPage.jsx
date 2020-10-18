import React, { useState, useEffect } from "react";
import { useParams, Link, withRouter } from "react-router-dom";

import './ProjectPage.css';

import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import ProjectDetailCard from "../../components/ProjectDetailCard/ProjectDetailCard";
import PledgeCard from "../../components/PledgeCard/PledgeCard";

// import { oneProject } from "../data";



import { dateObjectFormatter, timeLeftFormatter } from "../../utils/dateFormatter.js";
import ProjectAnalytics from "../../components/ProjectAnalytics/ProjectAnalytics.jsx";
import PledgeForm from "../../components/Forms/PledgeForm/PledgeForm.jsx";
import DeleteProjectForm from "../../components/DeleteProjectForm/DeleteProjectForm.jsx";
// import ProjectCard from "../components/ProjectCard/ProjectCard.jsx";

function ProjectPage() {

  const [projectData, setProjectData] = useState({ user: {}, updates: [], pledges: [] });

  const [projectClosed, setProjectClosed] = useState()

  const { id } = useParams();

  const [buttonStyle, setButtonStyle] = useState({});
  const [dateObj, setDateObj] = useState({});
  const [timeLeftObj, setTimeLeftObj] = useState({});
  const [dueDateObj, setDueDateObj] = useState({});

  useEffect(() => {
    document.addEventListener('scroll', showStickyButton);
    return () => {
      document.removeEventListener('scroll', showStickyButton);
    }
  })

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`
      },
    })
      .then(results => {
        console.log("queried project detail view")
        return results.json();
      })
      .then(data => {
        setProjectData(data);
        console.log(data);
      })
  }, [id, projectClosed]);

  useEffect(() => {
    setDateObj(dateObjectFormatter(projectData.date_created));
    setTimeLeftObj(timeLeftFormatter(projectData.due_date));
    setDueDateObj(dateObjectFormatter(projectData.due_date));
  }, [projectData]);

  const showStickyButton = () => {
    setButtonStyle({
      display: "block"
    });
  }

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
    })
    if (response.ok) {
      setProjectClosed(true);
      return response.json();
      // return response.json();
      // response.json()
      // .then(response => history.push(`projects / ${ id } /))
    }
  }

  return (
    <div id="project-page-container">

      <div id="project-header">
        {projectData ?
          <div id="creator-details">
            <Link to={`/user/${projectData.user.id}`}>
              <img className="sml-user-image" src={projectData.user.image} />
              <div>
                <p>Created by</p>
                <h3>{projectData.user.username}</h3>
              </div>
            </Link>
          </div>
          :
          null
        }
        <h1>{projectData.title}</h1>
      </div>

      <div id="project-buttons">
        {
          projectData.is_open ? null : <h2 id="project-closed-warning">** This Project is now Closed to Pledges **</h2>
        }
        {
          projectData.view_count != null ?
            <Link to={`/project/${id}/update`}><button><i class="fas fa-pencil-alt"></i>Update Project</button></Link>
            :
            null
        }
        {
          projectData.view_count != null && projectData.is_open ? <button id="close-project-btn" onClick={closeProject}><i class="far fa-times-circle"></i>Close This Project</button> : null
        }
      </div>

      <div>
        <img src={projectData.image} id="mobile-project-header-image" />
      </div>

      <div id="sidebar">
        <div className="sidebar-item">
          <div id="time-location-info">
            {projectData.venue == "" ?
              <h6><i class="fas fa-map-marker-alt"></i>City of {projectData.location}</h6>
              :
              <h6><i class="fas fa-map-marker-alt"></i>{projectData.venue}, City of {projectData.location}</h6>
            }
            {
              projectData.is_open ? <h6><i class="far fa-clock"></i>{timeLeftObj.days} days, {timeLeftObj.hours} hrs remaining</h6> : <h6><i class="far fa-clock"></i>Closed to funding on {dueDateObj.date}</h6>
            }
          </div>
          {
            projectData ?
              <ProgressBar
                percentage={projectData.current_percentage_pledged}
              />
              :
              null

          }

          <div id="project-targets-div">
            {
              projectData.pledgetype === 1 ?
                <React.Fragment>
                  <h4 className="coloured-text">Target: ${projectData.goal_amount}</h4>
                  <h4>Pledged: ${projectData.current_amount_pledged ? projectData.current_amount_pledged : 0}</h4>
                </React.Fragment>
                :
                projectData.pledgetype === 2 ?
                  <React.Fragment>
                    <h4 className="coloured-text">Target: {projectData.goal_amount} hrs</h4>
                    <h4>Pledged: {projectData.current_amount_pledged ? projectData.current_amount_pledged : 0} hrs</h4>
                  </React.Fragment>
                  :
                  null

            }

            {
              projectData.view_count == null && projectData.is_open ?
                <Link to={`/project/${id}/pledge`} className="pledge-button" id="static-pledge-button"><button><i class="fas fa-donate"></i><p>Pledge to this Project</p></button></Link>
                :
                null
            }


          </div>
        </div>

        <div className="sidebar-item">
          {
            projectData.view_count != null ?
              <ProjectAnalytics project={projectData} />
              :
              projectData.is_open ?
                <Link to={`/project/${id}/pledge`} id="sticky-pledge-button" className="pledge-button" style={buttonStyle}><button><i class="fas fa-donate"></i><p>Pledge to this Project</p></button></Link>
                :
                null
          }
        </div>
      </div >

      <div id="project-page-content">
        <div className="project-content">
          <ProjectDetailCard image={projectData.image} date={projectData.date_created} content={projectData.description} />

          {
            projectData.updates.map((update, index) => {
              return <ProjectDetailCard image={update.image} date={update.date} content={update.content} key={index} />
            })
          }
        </div>

        <div id="pledges">
          <h2>Pledges:</h2>
          <div>
            {
              projectData.pledges.map((pledge, index) => {
                return <PledgeCard key={index} pledge={pledge} isProfilePage={false} />;
              })
            }
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProjectPage;
