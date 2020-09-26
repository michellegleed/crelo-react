import React from 'react';
import { Link } from "react-router-dom";

import './LastChanceCard.css';

import { timeLeftFormatter } from '../../utils/dateFormatter';

function LastChangeCard(props) {

    // destructuring the props
    const { project } = props;

    const dateObj = timeLeftFormatter(project.due_date);

    return (
        <div className="last-chance-card activity-card">
            <Link to="/project">
                <div className="card-container">
                    <img src={project.image} />
                    <p className="card-type">
                        <i class="fas fa-exclamation-circle"></i>
                        Last Chance
                    </p>
                    <div className="card-text">
                        <h3 className="card-title">{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                        <h4 className="white">
                            <i class="fas fa-exclamation-circle"></i>
                            {dateObj.days > 0 ? `Closing in ${dateObj.days} days` : `Closing in ${dateObj.hours} hours`}
                        </h4>
                    <p>{project.description.slice(0, 400)}...</p>
                    </div>
                    </div>
            </Link>
        </div>
    );
}

export default LastChangeCard;