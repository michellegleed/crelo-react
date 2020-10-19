import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './ProgressUpdateForm.css'

function ProgressUpdateForm(props) {

    const token = window.localStorage.getItem("token");

    const [progressUpdate, setProgressUpdate] = useState();

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProgressUpdate((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }

    const postData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${props.projectID}/progress-updates/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify(progressUpdate),
        });
        console.log("stringified progress update to send to API = ", JSON.stringify(progressUpdate));
        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(progressUpdate);
        postData().then(response => {
            console.log("progress update POST response = ", response);
            // redirect to project page on successful post
            history.push(`project/${props.projectID}`);
        });
    }


    return (
        <div>
            <h2>Add A Progress Update...</h2>
            <form>
                <div className="form-item">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        placeholder="Enter the url for the project image"
                        onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" onChange={handleChange} />
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Save
            </button>
            </form>
        </div>
    )
}

export default ProgressUpdateForm;