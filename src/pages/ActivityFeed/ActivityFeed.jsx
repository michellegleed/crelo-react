import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './ActivityFeed.css';
// import './ActivityFeedSmallCards.css';

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
    const [totalPledgeAmts, setTotalPledgeAmts] = useState();
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
        let totalMoney = 0;
        let totalHours = 0;
        for (let i = 0; i < userDetails.pledges.length; i++) {
            if (userDetails.pledges[i].type_id == 1) {
                totalMoney += parseInt(userDetails.pledges[i].amount);
            } else if (userDetails.pledges[i].type_id == 2) {
                totalHours += parseInt(userDetails.pledges[i].amount);
            }
        }

        console.log("total money = ", totalMoney);
        console.log("total Hours = ", totalHours);

        return (< div id="total-pledges">
            <h3><i class="fas fa-donate"></i>My Total Pledges:</h3>
            {
                // totalMoney > 0 ?
                <h5>{`$${totalMoney} across ${userDetails.pledges.length} projects`}</h5>
                // <h5>{`$${totalMoney}`}</h5>
                // :
                // null
            }
            {
                // totalHours > 0 ?
                // <h5>{`${totalHours} hrs`}</h5>
                // :
                // null
            }
            {/* <h5>{`${userDetails.pledges.length} projects`}</h5> */}
        </div>);
    }


    return (
        <div id="homepage-container">

            <div id="activity-content">
                <div id="welcome-message" className="activity-card">
                    <h1>Hey {userDetails.user ? userDetails.user.username : null}</h1>
                    <h3>Welcome back! Thanks for supporting the creation of awesome projects in your local neighbourhood.</h3>
                    {
                        userDetails.pledges ?
                            getTotalPledgeAmt()
                            :
                            null
                    }
                </div>

                {
                    activityFeed ?
                        activityFeed.map((item, index) => {
                            switch (item.action) {
                                case "project-created": return <ProjectCard key={index} project={item.project} isActivityFeed={true} />
                                case "milestone": return <MilestoneCard key={index} item={item} />
                                case "progress-update": return <ProgressUpdateCard key={index} image={item.image} project={item.project} info={item.info} />
                                case "last-chance": return item.project.is_open ? <LastChanceCard key={index} project={item.project} /> : null
                            }
                        })
                        :
                        <h2>** Loading New Activity... **</h2>
                }
            </div >
        </div >
    );
}

export default HomePage;