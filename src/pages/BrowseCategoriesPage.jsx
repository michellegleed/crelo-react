import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProjectCard from '../components/ActivityFeedCards/ProjectCard/ProjectCard';

import "./ActivityFeed/ActivityFeed.css";

function BrowseCategoriesPage() {

    const [projectList, setProjectList] = useState();
    const [selectedCategory, setSelectedCategory] = useState("favourites");

    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}locations/1/categories/${selectedCategory}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token}`
                },
            })
                .then((results) => {
                    if (results.status == 200) {
                        return results.json()
                    }
                })
                .then((data) => {
                    setProjectList(data);
                })
        }
        else {
            history.push("login/");
        }

    }, [selectedCategory]);

    return (
        <div>
            <nav id="category-menu">
                <button onClick={() => setSelectedCategory(1)}>Education</button>
                <button onClick={() => setSelectedCategory(2)}>Arts + Entertainment</button>
                <button onClick={() => setSelectedCategory(3)}>Local Landscape</button>
                <button onClick={() => setSelectedCategory(4)}>Health</button>
                <button onClick={() => setSelectedCategory(5)}>Kids</button>
                <button onClick={() => setSelectedCategory("favourites")}>My Followed Categories</button>
            </nav>

            <div id="activity-content">
                {
                    projectList ?
                    projectList.map((project, index) => {
                        return <ProjectCard project={project} key={index} />
                    })
                    :
                    <h2>** Loading new projects... **</h2>
                }
            </div>
        </div>
    )
}

export default BrowseCategoriesPage;