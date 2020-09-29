import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function DeleteProjectForm(props) {

    const { projectID } = props;

    const [showModal, setModalDisplay] = useState(false);

    let modalDisplay = {
        display: showModal ? "block" : "none"
    }

    const history = useHistory();

    const confirmDelete = () => {
        setModalDisplay(true);
    }

    const hideModal = () => {
        setModalDisplay(false);
    }

    const sendDeleteRequest = async () => {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}project/${projectID}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
        });
        return response.json();
    }

    const deleteProject = () => {
        console.log("deleting project", projectID);
        sendDeleteRequest().then(response => {
        console.log(response);
        window.localStorage.setItem("token", response.token);
        history.push("/");
        });
    }


    return (
        <div>
            <button onClick={confirmDelete}>Delete Project</button>
            <div id="delete-project-modal" style={modalDisplay}>
                <h3>Please confirm that you want to delete this project</h3>
                <p>This will remove the project page, all progress updates and all pledges.</p>
                <button onClick={deleteProject}>Delete</button>
                <button onClick={hideModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteProjectForm;