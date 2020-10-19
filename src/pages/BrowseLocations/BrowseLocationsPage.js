import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import "..//BrowseCategories/BrowseCategories.css";
import "../ActivityFeed/ActivityFeed.css";

import { UserDetailsContext } from '../../utils/context';

import ProjectCard from '../../components/ActivityFeedCards/ProjectCard/ProjectCard';
import MilestoneCard from '../../components/ActivityFeedCards/MilestoneCard/MilestoneCard';
import ProgressUpdateCard from '../../components/ActivityFeedCards/ProgressUpdateCard/ProgressUpdateCard';
import LastChanceCard from '../../components/ActivityFeedCards/LastChanceCard/LastChanceCard';

function BrowseLocationsPage() {

    const { userDetails, actions } = useContext(UserDetailsContext);

    const [locationActivity, setLocationActivity] = useState();
    const [selectedLocation, setSelectedLocation] = useState(1);

    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}locations/${selectedLocation}`, {
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
                    setLocationActivity(data);
                })
        }
        else {
            history.push("login/");
        }

    }, [selectedLocation]);

    const changeLocation = (id) => {
        setLocationActivity();
        setSelectedLocation(id);
    }

    const checkIfBtnSelected = (id) => {
        if (id === selectedLocation) {
            return "selected"
        }
        return ""
    }

    /// Get LocationList
    const [locationList, setLocationList] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}locations/`)
            .then((results) => {
                return results.json()
            })
            .then((data) => {
                setLocationList(data);
            });
    }, []);


    return (
        <div>
            <div id="category-menu">
                {locationList ?
                    locationList.map(item => <button key={item.id} className={checkIfBtnSelected(item.id)} onClick={() => changeLocation(item.id)}>{item.name}</button>)
                    :
                    null
                }
            </div>

            {
                locationActivity ?
                    <h1>{locationActivity.name}</h1>
                    :
                    null
            }
            <div id="activity-content">
                {
                    locationActivity ?
                        locationActivity.activity.length > 0
                            ?
                            locationActivity.activity.map((item, index) => {
                                switch (item.action) {
                                    case "project-created": return <ProjectCard key={index} project={item.project} isActivityFeed={true} />
                                    case "milestone": return <MilestoneCard key={index} item={item} />
                                    case "progress-update": return <ProgressUpdateCard key={index} image={item.image} project={item.project} date={item.date} info={item.info} />
                                    case "last-chance": return item.project.is_open ? <LastChanceCard key={index} project={item.project} /> : null
                                }
                            })
                            :
                            <h2>** No Recent Activity **</h2>
                        :
                        <h2>** Searching for Location... **</h2>
                }
            </div>
        </div>
    )
}

export default BrowseLocationsPage;