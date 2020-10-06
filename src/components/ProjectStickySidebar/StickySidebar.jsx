import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import ProjectAnalytics from "../ProjectAnalytics/ProjectAnalytics.jsx";
import PledgeForm from "../Forms/PledgeForm/PledgeForm.jsx";

import "./StickySidebar.css";

function StickySidebar(props) {

    const { projectData, timeLeftObj, dueDateObj } = props;

    return (
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
                <h6><i class="fas fa-map-marker-alt"></i>{projectData.venue == "" ? `City of ${projectData.location}` : `${projectData.venue}, City of ${projectData.location}`}</h6>
                {
                    projectData.is_open ? <h6><i class="far fa-clock"></i>{timeLeftObj.days} days, {timeLeftObj.hours} hrs remaining</h6> : <h6><i class="far fa-clock"></i>Closed to funding on {dueDateObj.date}</h6>
                }
            </div>

            {
                projectData.view_count != null ?
                    <ProjectAnalytics project={projectData} />
                    :
                    projectData.is_open ?
                        <Link to="">Make A Pledge</Link>
                        :
                        null

            }


            {/* {
                projectData.view_count != null ? <ProjectAnalytics project={projectData} /> : projectData.is_open ? <PledgeForm project={projectData} /> : null
            } */}

        </div>
    );
}

export default StickySidebar;
