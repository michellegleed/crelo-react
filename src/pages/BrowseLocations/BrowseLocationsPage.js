import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import "..//BrowseCategories/BrowseCategories.css";
import "../ActivityFeed/ActivityFeed.css";

import Spinner from '../../components/Spinner/Spinner';

import ProjectCard from '../../components/ActivityFeedCards/ProjectCard/ProjectCard';
import MilestoneCard from '../../components/ActivityFeedCards/MilestoneCard/MilestoneCard';
import ProgressUpdateCard from '../../components/ActivityFeedCards/ProgressUpdateCard/ProgressUpdateCard';
import LastChanceCard from '../../components/ActivityFeedCards/LastChanceCard/LastChanceCard';
import { fetchRequest } from '../../utils/fetchRequest';

function BrowseLocationsPage() {

    const isFetching = useRef(true);

    /// Get LocationList for location buttons/menu
    const [locationList, setLocationList] = useState();

    const [locationActivity, setLocationActivity] = useState();
    const [selectedLocation, setSelectedLocation] = useState(1);

    const history = useHistory();

    useEffect(() => {
        isFetching.current = true
        fetchRequest(`${process.env.REACT_APP_API_URL}locations/${selectedLocation}`)
            .then((result) => {
                isFetching.current = false
                if (result.ok) {
                    setLocationActivity(result.data);
                }
                else {
                    history.push("/unathorized");
                }
            })
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

    useEffect(() => {
        isFetching.current = true
        fetchRequest(`${process.env.REACT_APP_API_URL}locations/`)
            .then((result) => {
                isFetching.current = false
                if (result.ok) {
                    setLocationList(result.data);
                }
                else {
                    history.push("/unathorized");
                }
            })
            .catch(error => {
                history.push("/network-error")
            })
    }, []);


    return (
        isFetching.current ?
            <Spinner />
            :
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
                        <h1 className="page-heading" id="location-heading">{locationActivity.name}</h1>
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
                            null
                    }
                </div>
            </div>
    )
}

export default BrowseLocationsPage;