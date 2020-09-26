import React from 'react';
import { Link } from "react-router-dom";

import './ActivityCard.css';

import ProgressBar from '../ProgressBar/ProgressBar';

function MilestoneCard(props) {

    // destructuring the props
    const { item } = props;

    getCardType = () => { 
        switch (item.action) { 
            case 'milestone': return (<p className="card-type">
                <i class="fas fa-trophy"></i>
                        Milestone
            </p>);
            case 'last-chance': return (<p className="card-type">
                <i class="fas fa-exclamation-circle"></i>
                        Last Chance
            </p>);
            case 'progress-update': return (<p className="card-type">
                <i class="fas fa-chart-line"></i>
                        Progress Update
            </p>);
            case 'project-created': return (<p className="card-type">
                <i class="fas fa-lightbulb"></i>
                        New
            </p>)
        }
    }

    get CardContent = () => { 
        switch (item.action) {
            case 'milestone': return (<ReactFragment><h6>Goal 25% complete</h6>
                        <p>{`WooHoo! People in your community have pledged $${item.project.current_amount_pledged} towards this project.`}</p>
                        <ProgressBar
                            percentage={item.project.current_percentage_pledged}
                            current={item.project.current_amount_pledged}
                            goal={item.project.goal_amount}
                        />
                <p>{item.project.description.slice(0, 300)}...</p></ReactFragment>);
            
            // case 'last-chance': return (<p className="card-type">
            //     <i class="fas fa-exclamation-circle"></i>
            //             Last Chance
            // </p>);
            // case 'progress-update': return (<p className="card-type">
            //     <i class="fas fa-chart-line"></i>
            //             Progress Update
            // </p>);
            // case 'project-created': return (<p className="card-type">
            //     <i class="fas fa-lightbulb"></i>
            //             New
            // </p>)
        }
    }

    return (
        <div className="activity-card">
            <Link to="/project">
                <div className="card-container">
                    <img src={item.project.image} />
                    {getCardType()}
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