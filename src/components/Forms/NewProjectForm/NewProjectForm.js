import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import './NewProjectForm.css'

import { capitalizeFirstLetter } from './../../../utils/capitaliseFirstLetter';

function NewProjectForm() {

    const token = window.localStorage.getItem("token");

    const [errorMessage, setErrorMessage] = useState();

    const [projectDetails, setProjectDetails] = useState({
        pledgetype: 1,
        category: 1,
        description: "",
        image: "",
        title: "",
        venue: "",
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
            [id]: value,
        }));
    }

    const handleDateChange = (e) => {
        const { id, value } = e.target;
        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
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
            body: JSON.stringify(projectDetails),
        })
        const data = await response.json()
        return {
            ok: response.ok,
            ...data
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postData()
            .then(data => {
                if (data.ok) {
                    history.push(`project/${data.id}`);
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            .catch(error => history.push("/network-error"))
    }

    /// Get Categories for Select Part of Form
    const [categoryList, setCategoryList] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}project-categories/`)
            .then((results) => {
                return results.json()
            })
            .then((data) => {
                setCategoryList(data);
                // data.map(category => {
                //     console.log(category.id, category.name)
                // })
            });
    }, []);

    /// Get Pledge Type options for Select Part of Form
    const [pledgetypeList, setPledgetypeList] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}pledges/types/`)
            .then((results) => {
                return results.json()
            })
            .then((data) => {
                setPledgetypeList(data);
                // data.map(pledgetype => {
                //     console.log(pledgetype.id, pledgetype.name)
                // })
            });
    }, []);


    return (
        <div id="new-project-container">
            <form id="new-project-form">
                <h1>Create A Project</h1>
                <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div>
                <div className="form-item">
                    <label htmlFor="category">Category:</label>
                    {categoryList ?
                        <select id="category" name="category" onChange={handleChange}>
                            {
                                categoryList.map(category => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                        </select>
                        :
                        null
                    }
                </div>
                <div className="form-item">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        placeholder="Enter an image URL"
                        onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="title">Project Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Project title"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="venue">Venue:</label>
                    <input
                        type="text"
                        id="venue"
                        onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="description">Project description:</label>
                    <textarea
                        type="text"
                        id="description"
                        value={projectDetails.description}
                        onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="pledgetype">What will users be pledging?</label>
                    {pledgetypeList ?
                        <select id="pledgetype" name="pledgetype" onChange={handleChange}>
                            {
                                pledgetypeList.map(pledgetype => {
                                    return <option value={pledgetype.id}>{capitalizeFirstLetter(pledgetype.type)}</option>
                                })}
                        </select>
                        :
                        null
                    }
                </div>
                <div className="form-item">
                    <span id="funding-target">
                        <label htmlFor="goal_amount">Funding Target:</label>
                        {projectDetails.pledgetype == 1 ? <p>$</p> : null}
                        <input
                            type="text"
                            id="goal_amount"
                            placeholder="Funding Target"
                            onChange={handleChange} />
                        {projectDetails.pledgetype == 2 ? <p>hrs</p> : null}
                    </span>
                </div>
                <div className="form-item">
                    <label htmlFor="due_date">Funding End Date:</label>
                    <input
                        type="date"
                        id="due_date"
                        placeholder="DD/MM/YYYY"
                        onChange={handleDateChange} />
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Save
            </button>
            </form>

            <div id="project-info-container">
                {projectDetails.image ?
                    <img src={projectDetails.image} id="pledge-page-header-img" />
                    :
                    null
                }

                <h1 className="card-title">{projectDetails.title} {projectDetails.venue === "" ? null : `@ ${projectDetails.venue}`}</h1>
            </div>
        </div>
    )
}

export default NewProjectForm;