import React from 'react';

import ProjectCard from '../../ProjectCard/ProjectCard';

const ProjectList = (props) => { 

    const { projects } = props;

    return (
        <div id="project-list">

        {projects.map((project, index) => {
            return <ProjectCard key={index} project={project} />
        })}

        </div>
    )
}

export default ProjectList;