import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditProjectForm from '../components/Forms/EditProjectForm/EditProjectForm';
import ProgressUpdateForm from '../components/Forms/ProgressUpdateForm/ProgressUpdateForm';



function UpdateProjectPage() {

    const { id } = useParams();

    const [projectData, setProjectData] = useState();

    // const [dateObj, setDateObj] = useState({});
    // const [timeLeftObj, setTimeLeftObj] = useState({});
    // const [dueDateObj, setDueDateObj] = useState({});

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                setProjectData(data);
                console.log(data);
            })
    }, [id]);

    // useEffect(() => {
    //     setDateObj(dateObjectFormatter(projectData.date_created));
    //     setTimeLeftObj(timeLeftFormatter(projectData.due_date));
    //     setDueDateObj(dateObjectFormatter(projectData.due_date));
    // }, [projectData]);

    return (
        projectData ?
            <div id="update-project-container">
                <EditProjectForm project={projectData} />
                <ProgressUpdateForm projectID={projectData.id} />
            </div>


            :
            <p>Loading project update form</p>
        // <h1>This is the update project page</h1>
    );
}

export default UpdateProjectPage;