import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ProjectCard from '../../components/ActivityFeedCards/ProjectCard/ProjectCard';
import LoadingContext from '../../utils/loadingContext';

import "./BrowseCategories.css";

import Spinner from '../../utils/spinner.jsx';
import { UserDetailsContext } from '../../utils/context';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function BrowseCategoriesPage() {

    const { showLoading, hideLoading } = useContext(LoadingContext);
    const { userDetails, actions } = useContext(UserDetailsContext);

    const [projectList, setProjectList] = useState();
    const [selectedCategory, setSelectedCategory] = useState("favourites");

    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            // showLoading();
            fetch(`${process.env.REACT_APP_API_URL}locations/${userDetails.location.id}/categories/${selectedCategory}`, {
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
                    // hideLoading();
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

    const checkIsFavourite = () => {
        return userDetails.user.favourite_categories.includes(selectedCategory);
    }

    const checkIfBtnSelected = (id) => {
        if (id === selectedCategory) {
            return "selected"
        }
        return ""
    }

    const updateFavourites = (action, categoryID) => {
        if (action === "add" || action === "remove") {
            const url = `${process.env.REACT_APP_API_URL}account/${action}-category/${categoryID}`;
            console.log()
            const token = window.localStorage.getItem("token");
            if (token) {
                fetch(url, {
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
                        console.log("new user data = ", data);
                        actions.updateUserDetails(data);
                    })
            }
            else {
                history.push("login/");
            }
        }
    }

    /// Get Categories List
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

    const getCategoryNameFromID = (id) => {
        if (categoryList) {
            for (let i = 0; i < categoryList.length; i++) {
                if (categoryList[i].id === id) {
                    return <h6>{categoryList[i].name}</h6>
                }
            }
        }
        return null;

    }

    return (
        <div>
            <div id="category-menu">
                {categoryList ?
                    categoryList.map(item => <button key={item.id} className={checkIfBtnSelected(item.id)} onClick={() => changeCategory(item.id)}>{item.name}</button>)
                    :
                    null
                }
                {/*  <button onClick={() => changeCategory(1)}>Education</button>
                 <button onClick={() => changeCategory(2)}>Arts + Entertainment</button>
                 <button onClick={() => changeCategory(3)}>Local Landscape</button>
                 <button onClick={() => changeCategory(4)}>Health</button>
                 <button onClick={() => changeCategory(5)}>Kids</button> */}
                <button className={checkIfBtnSelected("favourites")} onClick={() => changeCategory("favourites")}>My Followed Categories</button>
            </div>

            <div id="project-list">
                {
                    userDetails.user ?
                        selectedCategory !== "favourites" ?
                            checkIsFavourite() ?
                                <button onClick={() => updateFavourites("remove", selectedCategory)}>Remove from My Followed Categories</button>
                                :
                                <button onClick={() => updateFavourites("add", selectedCategory)}>Add to My Followed Categories</button>
                            : userDetails.user.favourite_categories.length > 0 ?
                                <div>
                                    <h3>Followed Categories:</h3>
                                    {userDetails.user.favourite_categories.map(categoryId => getCategoryNameFromID(categoryId))}
                                </div>
                                :
                                <ErrorMessage message="You're not following any categories" type="warning" />
                        : null
                }

                {
                    projectList ?
                        projectList.length > 0 ?
                            <div id="activity-content">
                                {projectList.map((project, index) => {
                                    return <ProjectCard project={project} key={index} isActivityFeed={false} />
                                })}
                            </div>
                            :
                            <div id="activity-content">
                                <h2>No Open Projects Found</h2>
                            </div>
                        :
                        // <Spinner />
                        null
                }
            </div>
        </div>
    )
}

export default BrowseCategoriesPage;