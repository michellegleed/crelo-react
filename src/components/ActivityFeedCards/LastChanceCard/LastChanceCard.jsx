import React from 'react';
import { Link } from "react-router-dom";

import { timeLeftFormatter } from '../../../utils/dateFormatter';

function LastChangeCard(props) {

    // destructuring the props
    const { project } = props;

    const dateObj = timeLeftFormatter(project.due_date);

    return (
        <div className="last-chance-card activity-card">
            <Link to={`/project/${project.id}/`}>
                <div className="card-container">
                    <img src={project.image} />
                    <p className="card-type">
                        <i class="fas fa-exclamation-circle"></i>
                        Last Chance
                    </p>
                    <div className="card-text">
                        <h3 className="card-title">{project.title}</h3>
                        <h3 className="activity-card-icon"><i class="fas fa-exclamation-circle"></i></h3>
                        <h4 className="activity-card-subtitle">
                            {/* <i class="fas fa-exclamation-circle"></i> */}
                            {dateObj.days > 0 ? `Closing in ${dateObj.days} days` : `Closing in ${dateObj.hours} hours`}
                        </h4>
                        <p>{project.description.slice(0, 300)}...</p>
                        <h6>{project.category.name}</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default LastChangeCard;