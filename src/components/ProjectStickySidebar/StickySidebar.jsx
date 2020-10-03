import React, { useState, useEffect } from "react";

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
                <h6>Location: {projectData.venue == "" ? `City of ${projectData.location}` : `${projectData.venue}, City of ${projectData.location}`}</h6>
                {
                    projectData.is_open ? <h6>Time Remaining: {timeLeftObj.days} days, {timeLeftObj.hours} hrs</h6> : <h6>Closed to funding on {dueDateObj.date}</h6>
                }

            </div>

            {
                projectData.view_count != null ? <ProjectAnalytics project={projectData} /> : projectData.is_open ? <PledgeForm project={projectData} /> : null
            }

        </div>
    );
}

export default StickySidebar;
