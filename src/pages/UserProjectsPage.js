import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import ProjectCard from '../components/ActivityFeedCards/ProjectCard/ProjectCard';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { fetchRequest } from '../utils/fetchRequest';

import "./ActivityFeed/ActivityFeed.css";

function UserProjectsPage() {

    const [projectList, setProjectList] = useState();

    const history = useHistory();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}account/projects/`)
            .then((result) => {
                if (result.ok) {
                    console.log(result.data);
                    setProjectList(result.data);
                }
                else {
                    history.push("/unauthorized");
                }
            })
    }, []);


    return (
        <div >
            <h1 className="page-title">My Projects:</h1>
            {
                projectList ?
                    projectList.length > 0 ?
                        <div id="activity-content">
                            {projectList.map((project, index) => {
                                return <ProjectCard project={project} key={index} isActivityFeed={false} />
                            })}
                        </div>
                        :
                        <div>
                            <ErrorMessage message="You haven't created any projects" type="warning" />
                            <Link to="/new-project"><button>Create A Project</button></Link>
                        </div>
                    :
                    null
            }
        </div>
    );
}

export default UserProjectsPage;