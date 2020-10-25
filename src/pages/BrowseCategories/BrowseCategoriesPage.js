import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ProjectCard from '../../components/ActivityFeedCards/ProjectCard/ProjectCard';

// import "./BrowseCategories.css";

import { UserDetailsContext } from '../../utils/context';
import { fetchRequest } from '../../utils/fetchRequest';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function BrowseCategoriesPage() {

    const { userDetails, actions } = useContext(UserDetailsContext);

    const [projectList, setProjectList] = useState();
    const [selectedCategory, setSelectedCategory] = useState("favourites");
    const [errorMessage, setErrorMessage] = useState();

    const history = useHistory();

    // useEffect(() => {
    //     const token = window.localStorage.getItem("token");
    //     if (token) {
    //         if (userDetails) {
    //             fetch(`${process.env.REACT_APP_API_URL}locations/${userDetails.location.id}/categories/${selectedCategory}/`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `token ${token}`
    //                 },
    //             })
    //                 .then((results) => {
    //                     if (results.status == 200) {
    //                         return results.json()
    //                     }
    //                 })
    //                 .then((data) => {
    //                     setProjectList(data);
    //                 })
    //         }
    //     }
    //     else {
    //         history.push("login/");
    //     }

    // }, [selectedCategory, userDetails]);

    useEffect(() => {
        if (userDetails) {
            fetchRequest(`${process.env.REACT_APP_API_URL}locations/${userDetails.location.id}/categories/${selectedCategory}/`)
                .then((result) => {
                    if (result.ok) {
                        console.log(result.data);
                        setProjectList(result.data);
                    }
                    else {
                        history.push("/unauthorized");
                    }
                })
        }
    }, [selectedCategory, userDetails]);

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

    // const updateFavourites = (action, categoryID) => {
    //     if (action === "add" || action === "remove") {
    //         const url = `${process.env.REACT_APP_API_URL}account/${action}-category/${categoryID}/`;
    //         console.log()
    //         const token = window.localStorage.getItem("token");
    //         if (token) {
    //             fetch(url, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `token ${token}`
    //                 },
    //             })
    //                 .then((results) => {
    //                     if (results.status == 200) {
    //                         return results.json()
    //                     }
    //                 })
    //                 .then((data) => {
    //                     console.log("new user data = ", data);
    //                     actions.updateUserDetails(data);
    //                 })
    //         }
    //         else {
    //             history.push("login/");
    //         }
    //     }
    // }

    const updateFavourites = (action, categoryID) => {
        if (action === "add" || action === "remove") {
            fetchRequest(`${process.env.REACT_APP_API_URL}account/${action}-category/${categoryID}/`)
                .then((result) => {
                    if (result.ok) {
                        console.log(result.data);
                        actions.updateUserDetails(result.data);
                    }
                    else {
                        history.push("/unauthorized");
                    }
                })
        }
    }

    /// Get Categories List
    const [categoryList, setCategoryList] = useState();

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}project-categories/`)
    //         .then((results) => {
    //             return results.json()
    //         })
    //         .then((data) => {
    //             setCategoryList(data);
    //             data.map(category => {
    //                 console.log(category.id, category.name)
    //             })
    //         });
    // }, []);

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}project-categories/`)
            .then((result) => {
                if (result.ok) {
                    setCategoryList(result.data);
                }
            })
            .catch(error => {
                history.push("/network-error")
                // setErrorMessage(error.message);
            })
    }, []);

    const getCategoryNameFromID = (id) => {
        if (categoryList) {
            for (let i = 0; i < categoryList.length; i++) {
                if (categoryList[i].id === id) {
                    return <li key={i}><h6>{categoryList[i].name}</h6></li>
                }
            }
        }
        return null;

    }

    return (
        <div>
            {
                errorMessage ?
                    <ErrorMessage message={errorMessage} type="error" />
                    :
                    null
            }
            <div id="category-menu">
                {categoryList ?
                    categoryList.map(item => <button key={item.id} className={checkIfBtnSelected(item.id)} onClick={() => changeCategory(item.id)}>{item.name}</button>)
                    :
                    null
                }
                <button className={checkIfBtnSelected("favourites")} onClick={() => changeCategory("favourites")}>My Followed Categories</button>
            </div>

            <div id="project-list">
                {
                    userDetails ?
                        selectedCategory !== "favourites" ?
                            checkIsFavourite() ?
                                <button className="add-remove-fav-category" onClick={() => updateFavourites("remove", selectedCategory)}><i class="fas fa-minus-circle"></i> Remove from My Followed Categories</button>
                                :
                                <button className="add-remove-fav-category" onClick={() => updateFavourites("add", selectedCategory)}><i class="fas fa-plus-circle"></i> Add to My Followed Categories</button>
                            : userDetails.user.favourite_categories.length > 0 ?
                                <div id="followed-categories-list">
                                    <h3>Followed Categories:</h3>
                                    <ul>
                                        {userDetails.user.favourite_categories.map(categoryId => getCategoryNameFromID(categoryId))}
                                    </ul>

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
                        <h2 className="loading-msg">** Loading Projects... **</h2>
                }
            </div>
        </div>
    )
}

export default BrowseCategoriesPage;