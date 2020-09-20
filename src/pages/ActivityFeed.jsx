import React from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { allProjects } from '../data';

function HomePage () {
    return (
        <div id="project-list">
            {allProjects.map((projectData, index) => {
                return <ProjectCard key={index} projectData={projectData} />
            })}
        </div>
    );
}

export default HomePage;