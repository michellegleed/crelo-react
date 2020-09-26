import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import ProjectCard from '../components/ProjectCard/ProjectCard';

// import { allProjects } from '../data';

function HomePage() {

    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/`)
            .then((results) => {
                return results.json()
            })
            .then((data) => {
                setProjectList(data);
            });
    }, []);

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

            {/* <ProjectList projects={allProjects} /> */}          
            <div id="project-list">
                {projectList.map((project, index) => {
                    return <ProjectCard key={index} project={project} category="2" />
                })}
               
            </div>
        </div>
    );
}

export default HomePage;