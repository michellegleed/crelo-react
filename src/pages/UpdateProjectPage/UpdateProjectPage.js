import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom";

import EditProjectForm from '../../components/Forms/EditProjectForm/EditProjectForm';
import ProgressUpdateForm from '../../components/Forms/ProgressUpdateForm/ProgressUpdateForm';
import { UserDetailsContext } from '../../utils/context';
import { fetchRequest } from '../../utils/fetchRequest';
import Spinner from '../../components/Spinner/Spinner';

import './UpdateProjectPage.css';

function UpdateProjectPage() {

    const isFetching = useRef(true);

    const { id } = useParams();
    const { userDetails } = useContext(UserDetailsContext);

    const history = useHistory();

    const [projectData, setProjectData] = useState();

    useEffect(() => {
        isFetching.current = true
        fetchRequest(`${process.env.REACT_APP_API_URL}projects/${id}/`)
            .then((result) => {
                isFetching.current = false
                if (result.ok) {
                    setProjectData(result.data);
                }
                else {
                    history.push("/notfound");
                }
            })
    }, [id]);

    // Check if user has permission, if not push to 401 page
    useEffect(() => {
        if (userDetails.user && projectData) {
            if (userDetails.user.id !== projectData.user.id) {
                history.push("/unauthorized")
            }
        }
    }, [userDetails, projectData])

    return (
        isFetching.current ?
            <Spinner />
            :
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