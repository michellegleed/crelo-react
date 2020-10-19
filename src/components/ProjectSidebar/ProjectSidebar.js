import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { dateObjectFormatter, timeLeftFormatter } from "../../utils/dateFormatter.js";
import ProgressBar from '../ProgressBar/ProgressBar';
import ProjectAnalytics from '../ProjectAnalytics/ProjectAnalytics';

import './ProjectSidebar.css';

function ProjectSidebar(props) {

    const { projectData } = props;

    const [buttonStyle, setButtonStyle] = useState({});
    const [dateObj, setDateObj] = useState({});
    const [timeLeftObj, setTimeLeftObj] = useState({});
    const [dueDateObj, setDueDateObj] = useState({});

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

    return (
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
                            <Link to={`/project/${projectData.id}/pledge`} className="pledge-button" id="static-pledge-button"><button><i class="fas fa-donate"></i><p>Pledge to this Project</p></button></Link>
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
                        null
                }
            </div>
        </div >
    )

}

export default ProjectSidebar;