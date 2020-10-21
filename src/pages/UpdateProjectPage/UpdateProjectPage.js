import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";

import EditProjectForm from '../../components/Forms/EditProjectForm/EditProjectForm';
import ProgressUpdateForm from '../../components/Forms/ProgressUpdateForm/ProgressUpdateForm';
import { UserDetailsContext } from '../../utils/context';
import { fetchRequest } from '../../utils/fetchRequest';

import './UpdateProjectPage.css';

function UpdateProjectPage() {

    const { id } = useParams();
    const { userDetails } = useContext(UserDetailsContext);

    const history = useHistory();

    const [projectData, setProjectData] = useState();

    // useEffect(() => {
    //     const token = window.localStorage.getItem("token");
    //     fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `token ${token}`
    //         },
    //     })
    //         .then(results => {
    //             return results.json();
    //         })
    //         .then(data => {
    //             setProjectData(data);
    //             console.log(data);
    //         })
    //         .then(() => {

    //         });
    // }, [id]);

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}projects/${id}/`)
            .then((result) => {
                if (result.ok) {
                    console.log(result.data);
                    setProjectData(result.data);
                }
                else {
                    history.push("/notfound");
                }
            })
    }, [id]);

    // Check if user has permission, if not push to 401 page
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

    return (
        projectData ?
            <div id="update-project-container">
                <ProgressUpdateForm projectID={projectData.id} />
                <EditProjectForm project={projectData} />
            </div>
            :
            <p>Loading project update form</p>
    );
}

export default UpdateProjectPage;