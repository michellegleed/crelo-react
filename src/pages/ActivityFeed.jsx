import React from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectList from '../components/Footer/ProjectList/ProjectList';

import ProjectCard from '../components/ProjectCard/ProjectCard';
import { allProjects } from '../data';

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
            <div id="welcome-message">
                <h1>Hey username</h1>
                <h3>Welcome back! Thanks for supporting the creation of awesome projects in your local neighbourhood.</h3>
                <h3>My Total Pledges:</h3>
                <h4>$120 across five projects</h4>
                <h3>Next Badge:</h3>
                <h4>Pledged $150 in total to local projects</h4>
            </div>

            <ProjectList projects={allProjects} />
            {/* <div id="project-list">

                {allProjects.map((projectData, index) => {
                    return <ProjectCard key={index} projectData={projectData} category="2" />
                })}
               
            </div> */}
        </div>
    );
}

export default HomePage;