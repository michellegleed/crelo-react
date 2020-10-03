import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './ActivityFeed.css';

import ProjectCard from '../../components/ActivityFeedCards/ProjectCard/ProjectCard';
import MilestoneCard from '../../components/ActivityFeedCards/MilestoneCard/MilestoneCard';
import ProgressUpdateCard from '../../components/ActivityFeedCards/ProgressUpdateCard/ProgressUpdateCard';
import LastChanceCard from '../../components/ActivityFeedCards/LastChanceCard/LastChanceCard';

import { UserDetailsContext } from '../../utils/context';
// import { act } from 'react-dom/test-utils';


// import { activityFeed } from '../../data';

function HomePage() {

    const { userDetails } = useContext(UserDetailsContext);

    const [activityFeed, setActivityFeed] = useState();
    const [error, setError] = useState();

    const history = useHistory();

    useEffect(() => {
        console.log("user info from context ", userDetails);
        const token = window.localStorage.getItem("token");
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}locations/1/`, {
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
                    setActivityFeed(data.activity);
                })
        }
        else {
            history.push("login/");
        }

    }, []);

    const getTotalPledgeAmt = () => {
        let total = 0;
        for (let i = 0; i < userDetails.pledges.length; i++) {
            total += parseInt(userDetails.pledges[i].amount);
        }
        return total;
    }


    return (
        <div id="homepage-container">

            <div id="activity-content">
                <div id="welcome-message" className="activity-card">
                    <h1>Hey {userDetails.user ? userDetails.user.username : null}</h1>
                    <h3>Welcome back! Thanks for supporting the creation of awesome projects in your local neighbourhood.</h3>
                    <h3><i class="fas fa-donate"></i>My Total Pledges:</h3>
                    <h4>${userDetails.pledges ? getTotalPledgeAmt() : null} across five projects</h4>
                    <h3><i class="fas fa-certificate"></i>Next Badge:</h3>
                    <h4>Pledged $150 in total to local projects</h4>
                </div>

                {
                    activityFeed ?
                        activityFeed.map((item, index) => {
                            switch (item.action) {
                                case "project-created": return <ProjectCard key={index} project={item.project} />
                                case "milestone": return <MilestoneCard key={index} item={item} />
                                case "progress-update": return <ProgressUpdateCard key={index} image={item.image} project={item.project} info={item.info} />
                                case "last-chance": return item.project.is_open ? <LastChanceCard key={index} project={item.project} /> : null
                            }
                        })
                        :
                        <h2>** Loading New Activity... **</h2>
                }
            </div>
        </div>
    );
}

export default HomePage;