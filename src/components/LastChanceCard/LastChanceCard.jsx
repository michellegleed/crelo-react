import React from 'react';
import { Link } from "react-router-dom";

import './LastChanceCard.css';

import { timeLeftFormatter } from '../../utils/dateFormatter';

function LastChangeCard(props) {

    // destructuring the props
    const { project } = props;

    const dateObj = timeLeftFormatter(project.due_date);

    return (
        <div className="last-chance-card">
            <Link to="/project">
                <img src={project.image} />
                <h3>{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                <p>
                    <i class="fas fa-exclamation-circle"></i>
                    {dateObj.days > 0 ? `Closing in ${dateObj.days} days` : `Closing in ${dateObj.hours} hours`}
                </p>
                <p>{project.description}</p>
            </Link>
        </div>
    );
}

export default LastChangeCard;