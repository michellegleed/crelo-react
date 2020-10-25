import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import './ProjectPage.css';

import ProjectDetailCard from "../../components/ProjectDetailCard/ProjectDetailCard";
import PledgeCard from "../../components/PledgeCard/PledgeCard";
import CreatorDetails from "../../components/CreatorDetails/CreatorDetails.js";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { dateObjectFormatter, timeLeftFormatter } from "../../utils/dateFormatter.js";
import { fetchRequest } from "../../utils/fetchRequest";

function ProjectPage() {

    const [projectData, setProjectData] = useState({ user: {}, updates: [], pledges: [] });

    const { id } = useParams();
    const history = useHistory();

    const [projectClosed, setProjectClosed] = useState();
    const [errorMessage, setErrorMessage] = useState();

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

    // useEffect(() => {
    //   const token = window.localStorage.getItem("token");
    //   fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `token ${token}`
    //     },
    //   })
    //     .then(results => {
    //       console.log("queried project detail view")
    //       return results.json();
    //     })
    //     .then(data => {
    //       setProjectData(data);
    //       console.log(data);
    //     })
    // }, [id, projectClosed]);

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}projects/${id}/`)
            .then((result) => {
                if (result.ok) {
                    console.log(result.data);
                    setProjectData(result.data);
                }
                else {
                    history.push("/notfound");
                }
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

        // const token = window.localStorage.getItem("token");
        fetchRequest(`${process.env.REACT_APP_API_URL}projects/${id}/`, "put", { due_date: dateIso })
            // const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
            //   method: "put",
            //   headers: {
            //     "Content-Type": "application/json",
            //     "Authorization": `token ${token}`
            //   },
            //   body: JSON.stringify({ due_date: dateIso }),
            // })
            .then((response) => {
                if (response.ok) {
                    setErrorMessage(null);
                    setProjectClosed(true);
                } else {
                    console.log(response);
                    setErrorMessage("Error closing project. Please try again in a moment.");
                }
            })

    }

    return (
        projectData ?
            <div id="project-page-container">
                < div id="project-header" >
                    {
                        projectData ?
                            <CreatorDetails user={projectData.user} />
                            :
                            null
                    }
                    <h1>{projectData.title}</h1>
                </div >

                <div id="project-buttons">
                    <div className="error-message">
                        {
                            errorMessage ?
                                <ErrorMessage message={errorMessage} type="error" />
                                :
                                null
                        }
                    </div>
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

                <ProjectSidebar projectData={projectData} />

                {projectData.view_count == null && projectData.is_open ?
                    <Link to={`/project/${projectData.id}/pledge`} id="sticky-pledge-button" className="pledge-button" style={buttonStyle}><button><i class="fas fa-donate"></i><p>Pledge to this Project</p></button></Link>
                    :
                    null
                }

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
            </div>
            :
            <div id="project-page-container" ></div>
    );
}

export default ProjectPage;
