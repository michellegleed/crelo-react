import React from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { allProjects } from '../data';

function HomePage() {
    return (
        <div id="homepage-container">
            <div id="welcome-message">
                <h1>Hey username</h1>
                <h3>Welcome back! Thanks for supporting the creation of awesome projects in your local neighbourhood.</h3>
                <h3>My Total Pledges:</h3>
                <h4>$120 across five projects</h4>
                <h3>Next Badge:</h3>
                <h4>Pledged $150 in total to local projects</h4>
            </div>
            <div id="project-list">
                {allProjects.map((projectData, index) => {
                    return <ProjectCard key={index} projectData={projectData} />
                })}
            </div>
        </div>
    );
}

export default HomePage;