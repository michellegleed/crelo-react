import React from 'react';
import { Link } from "react-router-dom";

import ProgressBar from '../../ProgressBar/ProgressBar';

function MilestoneCard(props) {

    // destructuring the props
    const { item } = props;

    return (
        <div className="milestone-card activity-card">
            <Link to={`/project/${item.project.id}/`}>
                <div className="card-container">
                    <img src={item.project.image} />
                    <p className="card-type">
                        <i class="fas fa-trophy"></i>
                        Milestone
                    </p>
                    <div className="card-text">
                        <h3 className="card-title">{item.project.title} {item.project.venue != "" ? `@ ${item.project.venue}` : null}</h3>
                        <h3 className="activity-card-icon"><i class="fas fa-chart-line"></i></h3>
                        <ProgressBar
                            percentage={item.project.current_percentage_pledged}
                            current={item.project.current_amount_pledged}
                            goal={item.project.goal_amount}
                        />
                        <h4 className="activity-card-subtitle">{item.info}% Milestone</h4>
                        <p>{`WooHoo! People in your community have pledged $${item.project.current_amount_pledged} towards this project.`}</p>
                        <h6>Wednesday 12th September 2020</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MilestoneCard;