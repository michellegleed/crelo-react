import React from 'react';
import { Link } from "react-router-dom";

function ProjectCard(props) {

    // destructuring the props
    const { project } = props;

    const getCategoryIcon = (categoryID) => {
        switch (categoryID) {
            case 1: return <i class="fas fa-user-graduate"></i>;
            case 2: return <i class="fas fa-theater-masks"></i>;
            case 3: return <i class="fas fa-leaf"></i>
            case 4: return <i class="fas fa-bicycle"></i>;
            case 5: return <i class="fas fa-child"></i>;
        }
    }

    return (
        <div className="project-card activity-card">
            <Link to={`/project/${project.id}/`}>
                <div className="card-container">
                    <img src={project.image} />
                    <p className="card-type">
                        <i class="fas fa-lightbulb"></i>
                        New
                    </p>
                    <div className="card-text">
                        <h3 className="card-title">{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                        <h3 className="activity-card-icon">{getCategoryIcon(project.category.id)}</h3>
                        <p>{project.description}</p>
                        <h6>{project.category.name}</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProjectCard;