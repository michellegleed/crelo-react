import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProjectCard from '../../components/ActivityFeedCards/ProjectCard/ProjectCard';

import { UserDetailsContext } from '../../utils/context';
import { fetchRequest } from '../../utils/fetchRequest';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import Spinner from '../../components/Spinner/Spinner';

function BrowseCategoriesPage() {

    const { userDetails, actions } = useContext(UserDetailsContext);

    const [isFetching, setIsFetching] = useState(true);
    const [projectList, setProjectList] = useState();
    const [selectedCategory, setSelectedCategory] = useState("favourites");
    const [errorMessage, setErrorMessage] = useState();

    const history = useHistory();

    useEffect(() => {
        if (userDetails) {
            setIsFetching(true)
            fetchRequest(`${process.env.REACT_APP_API_URL}locations/${userDetails.location.id}/categories/${selectedCategory}/`)
                .then((result) => {
                    setIsFetching(false)
                    if (result.ok) {
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

    const updateFavourites = (action, categoryID) => {
        if (action === "add" || action === "remove") {
            fetchRequest(`${process.env.REACT_APP_API_URL}account/${action}-category/${categoryID}/`)
                .then((result) => {
                    if (result.ok) {
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

    useEffect(() => {
        setIsFetching(true)
        fetchRequest(`${process.env.REACT_APP_API_URL}project-categories/`)
            .then((result) => {
                setIsFetching(false)
                if (result.ok) {
                    setCategoryList(result.data);
                }
            })
            .catch(error => {
                history.push("/network-error")
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
        isFetching.current ?
            <Spinner />
            :
            <div>
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
                <div id="category-menu">
                    {
                        categoryList ?
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
                                <div className="centred-text">
                                    <h2>No Open Projects Found</h2>
                                </div>
                            :
                            null
                    }
                </div>
            </div>
    )
}

export default BrowseCategoriesPage;