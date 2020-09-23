import React from 'react';
import { Link } from "react-router-dom";

import './ProgressUpdateCard.css';

function ProgressUpdateCard(props) {

    // destructuring the props
    const { image, project, info } = props;

    return (
        <div className="progress-update-card activity-card">
            <Link to="/project">
                <div className="card-container">
                    <img src={image == "" || !image ? project.image : image} />
                    <p className="red">
                        <i class="fas fa-chart-line"></i>
                        Progress Update
                    </p>
                    <div className="card-text">
                        <h3 className="card-title">{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                        <h6>{project.user} added a progress update:</h6>
                        <p>{info.slice(0, 400)}...</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProgressUpdateCard;