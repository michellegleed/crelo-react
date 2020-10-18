import React from "react";

import './ProjectAnalytics.css';

function ProjectAnalytics(props) {

    const { project } = props;
    return (
        <div id="analytics">
            <h2><i class="fas fa-info-circle"></i>Project Stats</h2>
            <p>Total Page Views: {project.view_count}</p>
            <p>Total Pledge Count: {project.pledge_count ? project.pledge_count : 0}</p>
            {
                project.pledgetype === 1 ?
                    <p>Average Pledge: ${project.average_pledge}</p>
                    :
                    project.pledgetype === 2 ?
                        <p>Average Pledge: {project.average_pledge} hrs</p>
                        :
                        null

            }
            <p>Conversion Rate: {project.conversion_rate}%</p>
        </div>
    );
}

export default ProjectAnalytics;
