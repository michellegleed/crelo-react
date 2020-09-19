import React from 'react';
import { Link } from "react-router-dom";

import './ProjectCard.css';

function ProjectCard(props) {

    // destructuring the props
    const { projectData } = props;

    return (
        <div className="project-card">
            <Link to="/project">
                <img src={projectData.image} />
                <h3>{projectData.title} {projectData.venue != "" ? `@ ${projectData.venue}` : null}</h3>
                <p>{projectData.description}</p>
            </Link>
        </div>
    );
}

export default ProjectCard;