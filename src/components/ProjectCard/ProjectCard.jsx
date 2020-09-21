import React from 'react';
import { Link } from "react-router-dom";

import './ProjectCard.css';

function ProjectCard(props) {

    // destructuring the props
    const { project } = props;

    return (
        <div className="project-card">
            <Link to="/project">
                <img src={project.image} />
                <h3>{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                <p>{project.description}</p>
            </Link>
        </div>
    );
}

export default ProjectCard;