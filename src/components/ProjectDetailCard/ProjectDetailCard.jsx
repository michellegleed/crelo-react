import React from 'react';
import { Link } from "react-router-dom";

import './ProjectDetailCard.css';

function ProjectDetailCard(props) {

    // destructuring the props
    const { image, date, content } = props;

    return (
        <div className="project-detail-card">
            <img src={image} />
            <h6>{date}</h6>
            <p>{content}</p>
        </div>
    );
}

export default ProjectDetailCard;