import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './NewProjectForm.css'

import { capitalizeFirstLetter } from './../../../utils/capitaliseFirstLetter';

function NewProjectForm() {

    const token = window.localStorage.getItem("token");

    const [projectDetails, setProjectDetails] = useState({
        title: "",
        venue: "",
        description: "",
        pledgetype: 1,
        goal_amount: 0,
        image: "",
        category: 1,
        pledgetype: 1
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
        <form>
            <div>
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
            <div>
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

            <button type="submit" onClick={handleSubmit}>
                Save
            </button>
        </form>
    )
}

export default NewProjectForm;