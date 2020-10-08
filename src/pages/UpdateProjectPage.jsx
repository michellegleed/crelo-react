import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditProjectForm from '../components/Forms/EditProjectForm/EditProjectForm';
import ProgressUpdateForm from '../components/Forms/ProgressUpdateForm/ProgressUpdateForm';
import { UserDetailsContext } from '../utils/context';



function UpdateProjectPage() {

    const { id } = useParams();
    const { userDetails } = useContext(UserDetailsContext);

    const history = useHistory();

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
            .then(() => {

            });
    }, [id]);


    // Check if user has permission, if not push to 404 page
    useEffect(() => {
        console.log("usr details: ", userDetails);
        console.log("project usr details: ", projectData);
        console.log("got to 1st line of useEffect");
        if (userDetails.user && projectData) {
            console.log("got to 2nd line of useEffect");
            if (userDetails.user.id !== projectData.user.id) {
                console.log("got to 3rd line of useEffect");
                history.push("/unauthorized")
            }
        }
    }, [userDetails, projectData])

    // useEffect(() => {
    //     setDateObj(dateObjectFormatter(projectData.date_created));
    //     setTimeLeftObj(timeLeftFormatter(projectData.due_date));
    //     setDueDateObj(dateObjectFormatter(projectData.due_date));
    // }, [projectData]);

    return (
        projectData ?
            <div id="update-project-container">
                <ProgressUpdateForm projectID={projectData.id} />
                <EditProjectForm project={projectData} />
            </div>


            :
            <p>Loading project update form</p>
        // <h1>This is the update project page</h1>
    );
}

export default UpdateProjectPage;