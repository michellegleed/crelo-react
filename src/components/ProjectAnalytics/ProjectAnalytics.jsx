import React from "react";

import './ProjectAnalytics.css';

function ProjectAnalytics(props) {

    const { project } = props;
    return (
        <div id="analytics">
            <h2><i class="fas fa-info-circle"></i>Project Stats</h2>
            <p>Total Page Views: {project.view_count}</p>
            <p>Total Pledge Count: {project.pledge_count}</p>
            <p>Average Pledge: ${project.average_pledge}</p>
            <p>Conversion Rate: {project.conversion_rate}%</p>
        </div>
    );
}

export default ProjectAnalytics;
