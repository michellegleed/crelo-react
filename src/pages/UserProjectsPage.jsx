import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import { useHistory } from 'react-router-dom';
import ProjectCard from '../components/ActivityFeedCards/ProjectCard/ProjectCard';

import "./ActivityFeed/ActivityFeed.css";

function UserProjectsPage() {

    const [projectList, setProjectList] = useState();

    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}account/projects/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token}`
                },
            })
                .then((results) => {
                    if (results.status == 200) {
                        return results.json()
                    }
                })
                .then((data) => {
                    setProjectList(data);
                })
        }
        else {
            history.push("login/");
        }

    }, []);



    return (
        <div >
            {
                projectList ?
                projectList.map((project, index) => { 
                    return <ProjectCard project={project} key={index} />
                })
                    : <div>
                        <h2>No Projects.</h2>
                        <h4><Link to="/new-project">Click here </Link>to create a project</h4>
                    </div>
            }
        </div>
    );
}

export default UserProjectsPage;