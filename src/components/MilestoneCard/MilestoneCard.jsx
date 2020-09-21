import React from 'react';
import { Link } from "react-router-dom";

import './MilestoneCard.css';

import Badge from '../Badge/Badge';

function MilestoneCard(props) {

    // destructuring the props
    const { item } = props;

    return (
        <div className="milestone-card">
            <Link to="/project">
                <h3>Milestone Reached!</h3>
                <Badge title={`${item.info}% of Target`} icon="fas fa-trophy" date={item.date}></Badge>
                <h4>{item.project.title}</h4>
            </Link>
        </div>
    );
}

export default MilestoneCard;