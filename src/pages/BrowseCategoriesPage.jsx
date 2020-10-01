import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProjectCard from '../components/ActivityFeedCards/ProjectCard/ProjectCard';
import LoadingContext from '../utils/loadingContext';

import "./ActivityFeed/ActivityFeed.css";

import Spinner from './../utils/spinner.jsx';

function BrowseCategoriesPage() {

    const { showLoading, hideLoading } = useContext(LoadingContext);

    const [projectList, setProjectList] = useState();
    const [selectedCategory, setSelectedCategory] = useState("favourites");

    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            showLoading();
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
                    hideLoading();
                })
        }
        else {
            history.push("login/");
        }

    }, [selectedCategory]);

    const changeCategory = (id) => { 
        setProjectList();
        setSelectedCategory(id);
    }

    return (
        <div>
            <nav id="category-menu">
                <button onClick={() => changeCategory(1)}>Education</button>
                <button onClick={() => changeCategory(2)}>Arts + Entertainment</button>
                <button onClick={() => changeCategory(3)}>Local Landscape</button>
                <button onClick={() => changeCategory(4)}>Health</button>
                <button onClick={() => changeCategory(5)}>Kids</button>
                <button onClick={() => changeCategory("favourites")}>My Followed Categories</button>
            </nav>

            <div id="activity-content">
                {/* <Spinner /> */}
                {
                    projectList ?
                        projectList.length > 0 ?
                            projectList.map((project, index) => {
                                return <ProjectCard project={project} key={index} />
                            })
                            :
                            <h2>No Open Projects Found</h2>
                        :
                        <Spinner />
                    }
            </div>
        </div>
    )
}

export default BrowseCategoriesPage;