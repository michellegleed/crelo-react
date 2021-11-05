import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import ProjectCard from '../components/ActivityFeedCards/ProjectCard/ProjectCard';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { fetchRequest } from '../utils/fetchRequest';
import Spinner from '../components/Spinner/Spinner';

import "./ActivityFeed/ActivityFeed.css";

function UserProjectsPage() {

    const [projectList, setProjectList] = useState();

    const history = useHistory();

    const isFetching = useRef(true);

    useEffect(() => {
        isFetching.current = true;
        fetchRequest(`${process.env.REACT_APP_API_URL}account/projects/`)
            .then((result) => {
                isFetching.current = false;
                if (result.ok) {
                    setProjectList(result.data);
                }
                else {
                    history.push("/unauthorized");
                }
            })
    }, []);


    return (
        isFetching.current ?
            <Spinner />
            :
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