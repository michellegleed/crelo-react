import React from 'react';

import './ProjectDetailCard.css';

import { dateObjectFormatter } from '../../utils/dateFormatter';

function ProjectDetailCard(props) {

    const { image, date, content } = props;
    const dateObj = dateObjectFormatter(date);

    return (
        <div className="project-detail-card">
            <img src={image} />
            <h6>{dateObj.date}</h6>
            <p>{content}</p>
        </div>
    );
}

export default ProjectDetailCard;