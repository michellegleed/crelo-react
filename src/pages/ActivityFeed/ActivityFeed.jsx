import React from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './ActivityFeed.css';

import ProjectCard from '../../components/ProjectCard/ProjectCard';
import MilestoneCard from '../../components/MilestoneCard/MilestoneCard';
import ProgressUpdateCard from '../../components/ProgressUpdateCard/ProgressUpdateCard';
import LastChanceCard from '../../components/LastChanceCard/LastChanceCard';


import { activityFeed } from '../../data';

function HomePage() {
    return (
        <div id="homepage-container">
            <nav id="category-menu">
                <Link to="/education">Education</Link>
                <Link to="/arts">Arts + Entertainment</Link>
                <Link to="/landscape">Local Landscape</Link>
                <Link to="/kids">Kids</Link>
                <Link to="/health">Health</Link>
                <Link to="/favourites">My Followed Categories</Link>
            </nav>
    
            <div id="activity-content">
                <div id="welcome-message">
                    <h1>Hey username</h1>
                    <h3>Welcome back! Thanks for supporting the creation of awesome projects in your local neighbourhood.</h3>
                    <h3><i class="fas fa-donate"></i>My Total Pledges:</h3>
                    <h4>$120 across five projects</h4>
                    <h3><i class="fas fa-certificate"></i>Next Badge:</h3>
                    <h4>Pledged $150 in total to local projects</h4>
                </div>
                {activityFeed.activity.map((item, index) => {
                    switch (item.action) { 
                        case "project-created": return <ProjectCard key={index} project={item.project} />
                        case "milestone": return <MilestoneCard key={index} item={item} />
                        case "progress-update": return <ProgressUpdateCard key={index} project={item.project} info={item.info}/>
                        case "last-chance": return <LastChanceCard key={index} project={item.project} />
                    }
                    
                })}
               
            </div>



            


        </div>
    );
}

export default HomePage;