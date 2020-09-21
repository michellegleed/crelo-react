import React from 'react';
import { Link } from "react-router-dom";

import './ProgressUpdateCard.css';

function ProgressUpdateCard(props) {

    // destructuring the props
    const { project, info } = props;

    return (
        <div className="progress-update-card">
            <Link to="/project">
                <img src={project.image} />
                <h3>{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                <h6>{project.user} added a progress update:</h6>
                <p>{info}</p>
            </Link>
        </div>
    );
}

export default ProgressUpdateCard;