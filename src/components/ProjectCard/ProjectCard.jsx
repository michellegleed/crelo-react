import React from 'react';
import { Link } from "react-router-dom";

import './ProjectCard.css';

function ProjectCard(props) {

    // destructuring the props
    const { project } = props;

    return (
        <div className="project-card activity-card">
            <Link to="/project">
                <div className="card-container">
                    <img src={project.image} />
                    <p className="red">
                        <i class="fas fa-lightbulb"></i>
                        New
                    </p>
                    <div className="card-text">
                    <h3 className="card-title">{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
                        <p>{project.description}</p>
                        </div>
                </div>
                {/* <div className="card-text">
                    <p>{project.description.slice(0, 145)}...</p>
                </div> */}
            </Link>
        </div>
    );
    // return (
    //     <div className="project-card activity-card">
    //         <Link to="/project">
    //             <div className="card-container">
    //                 <img src={project.image} />
    //                 <div className="card-title">
    //                     <h3>{project.title} {project.venue != "" ? `@ ${project.venue}` : null}</h3>
    //                 </div>
    //             </div>
    //             <div className="card-text">
    //                 <p>{project.description}</p>
    //             </div>
    //         </Link>
    //     </div>
    // );
}

export default ProjectCard;