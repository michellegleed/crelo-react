import React from 'react';
import { Link } from "react-router-dom";

import './MilestoneCard.css';

import Badge from '../../Badge/Badge';
import ProgressBar from '../../ProgressBar/ProgressBar';

function MilestoneCard(props) {

    // destructuring the props
    const { item } = props;

    return (
        <div className="milestone-card activity-card">
            <Link to="/project">
                    <div className="card-container">
                        <img src={item.project.image} />
                        <p className="card-type">
                            <i class="fas fa-trophy"></i>
                        Milestone
                    </p>
                        <div className="card-text">
                            <h3 className="card-title">{item.project.title} {item.project.venue != "" ? `@ ${item.project.venue}` : null}</h3>
                        <h6>Goal 25% complete</h6>
                        <p>{`WooHoo! People in your community have pledged $${item.project.current_amount_pledged} towards this project.`}</p>
                        <ProgressBar
                            percentage={item.project.current_percentage_pledged}
                            current={item.project.current_amount_pledged}
                            goal={item.project.goal_amount}
                        />
                        <p>{item.project.description.slice(0, 300)}...</p>
                        </div>
                    </div>
            </Link>
        </div>
    );
}

export default MilestoneCard;