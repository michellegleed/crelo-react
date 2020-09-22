import React from 'react';
import { Link } from "react-router-dom";

import './ProgressUpdateCard.css';

function ProgressUpdateCard(props) {

    // destructuring the props
    const { project, info } = props;

    return (
        <div className="progress-update-card activity-card">
            <Link to="/project">
                <div className="card-image">
                    <img src={project.image} />
                    <h3 className="card-title">{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                </div>
                <div className="card-text">
                    <h6>{project.user} added a progress update:</h6>
                    <p>{info.slice(0, 145)}...</p>
                </div>
            </Link>
        </div>
    );
}

export default ProgressUpdateCard;