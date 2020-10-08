import React from 'react';
import { Link } from "react-router-dom";

function ProgressUpdateCard(props) {

    // destructuring the props
    const { image, project, info } = props;

    return (
        <div className="progress-update-card activity-card">
            <Link to={`/project/${project.id}/`}>
                <div className="card-container">
                    <img src={image == "" || !image ? project.image : image} />
                    <p className="card-type">
                        <i class="fas fa-chart-line"></i>
                        Progress Update
                    </p>
                    <div className="card-text">
                        <h3 className="card-title">{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                        <h3 className="activity-card-icon"><i class="far fa-edit"></i></h3>
                        <h4 className="activity-card-subtitle">{project.user}'s update:</h4>
                        <p>{info.slice(0, 400)}...</p>
                        <h6>Wednesday 12th September 2020</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProgressUpdateCard;