import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function EditProjectForm(props) {

    const token = window.localStorage.getItem("token");

    const { project } = props;

    const [errorMessage, setErrorMessage] = useState();

    const [projectDetails, setProjectDetails] = useState(project);

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
            [id]: value,
        }));
        console.log(id, value);
    }

    const handleDateChange = (e) => {
        const { id, value } = e.target;
        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
            [id]: `${value}T00:00:00Z`,
        }));
    }

    const postData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${projectDetails.id}/`, {
            method: "put",
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
        postData().then(data => {
            if (data.ok) {
                history.push(`project/${data.id}`);
            } else {
                // the API returned an error - do something with it
                console.error(data);
                setErrorMessage("Oops - did you delete something from your project like the venue, description or goal? All fields are required.");
            }
        })
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
                data.map(category => {
                    console.log(category.id, category.name)
                })
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
                data.map(pledgetype => {
                    console.log(pledgetype.id, pledgetype.name)
                })
            });
    }, []);


    return (
        <div>
            <h2>Edit Project...</h2>
            {
                errorMessage ?
                    <ErrorMessage message={errorMessage} type="error" />
                    :
                    null
            }

            <form>
                <div className="form-item" s>
                    <label htmlFor="category">Category:</label>
                    {categoryList ?
                        <select id="category" name="category" value={projectDetails.category} onChange={handleChange}>
                            {
                                categoryList.map(category => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                        </select>
                        :
                        null
                    }
                </div>
                <div className="form-item" s>
                    <label htmlFor="title">Project Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder={projectDetails.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item" s>
                    <label htmlFor="venue">Venue:</label>
                    <input
                        type="text"
                        id="venue"
                        placeholder={projectDetails.venue}
                        onChange={handleChange} />
                </div>
                <div className="form-item" s>
                    <label htmlFor="description">Project description:</label>
                    <textarea
                        type="text"
                        id="description"
                        onChange={handleChange}>
                        {projectDetails.description}
                    </textarea>
                </div>
                <div className="form-item" s>
                    <span id="funding-target">
                        <label htmlFor="goal_amount">Funding Target:</label>
                        {projectDetails.pledgetype == 1 ? <p>$</p> : null}
                        <input
                            type="text"
                            id="goal_amount"
                            placeholder={projectDetails.goal_amount}
                            onChange={handleChange} />
                        {projectDetails.pledgetype == 2 ? <p>hrs</p> : null}
                    </span>
                </div>
                <div className="form-item" s>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        placeholder={projectDetails.image}
                        onChange={handleChange} />
                </div>
                <div className="form-item" s>
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
        </div>
    )
}

export default EditProjectForm;