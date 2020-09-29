import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function NewProjectForm() {

    const token = window.localStorage.getItem("token");

    const [credentials, setCredentials] = useState({
        title: "",
        venue: "",
        description: "",
        pledgetype: 1,
        goal_amount: 0,
        image: "",
        category: 0
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    }

    const handleDateChange = (e) => { 
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: `${value}T00:00:00Z`,
        }));
    }

    const postData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        postData().then(response => {
            console.log(response);
            // redirect to project page on successful post
            history.push(`project/${response.id}`);
        });
    }

    return (
        <form>
            <div>
                <label htmlFor="title">Project Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Project title"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="venue">Venue:</label>
                <input
                    type="text"
                    id="venue"
                    placeholder="Venue"
                    onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Project description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="Project description"
                    onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="goal_amount">Funding Target:</label>
                <input
                    type="text"
                    id="goal_amount"
                    placeholder="Funding Target"
                    onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    placeholder="Enter the url for the project image"
                    onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="due_date">Funding End Date:</label>
                <input
                    type="date"
                    id="due_date"
                    placeholder="DD/MM/YYYY"
                    onChange={handleDateChange} />
            </div>
            <div>
                <label htmlFor="category">Select Project Category:</label>
                <input
                    type="text"
                    id="category"
                    placeholder="Enter the project category"
                    onChange={handleChange} />
            </div>

            <button type="submit" onClick={handleSubmit}>
                Save
            </button>
        </form>
    )
}

export default NewProjectForm;