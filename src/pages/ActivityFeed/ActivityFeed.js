import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import './ActivityFeed.css';
// import './ActivityFeedSmallCards.css';

import ProjectCard from '../../components/ActivityFeedCards/ProjectCard/ProjectCard';
import MilestoneCard from '../../components/ActivityFeedCards/MilestoneCard/MilestoneCard';
import ProgressUpdateCard from '../../components/ActivityFeedCards/ProgressUpdateCard/ProgressUpdateCard';
import LastChanceCard from '../../components/ActivityFeedCards/LastChanceCard/LastChanceCard';

import Spinner from '../../components/Spinner/Spinner';

import { UserDetailsContext } from '../../utils/context';
import { fetchRequest } from '../../utils/fetchRequest';

function HomePage() {

    // const [isFetching, setIsFetching] = useState(true);
    const isFetching = useRef(true);

    const { userDetails } = useContext(UserDetailsContext);

    const [activityFeed, setActivityFeed] = useState();
    const [totalPledgeAmts, setTotalPledgeAmts] = useState();
    const [error, setError] = useState();

    const history = useHistory();

    useEffect(() => {
        if (!userDetails) {
            isFetching.current = false
            // console.log("exiting out of use effect early - user details not fetched yet")
            return
        }
        isFetching.current = true
        fetchRequest(`${process.env.REACT_APP_API_URL}locations/${userDetails.location.id}/`)
            .then((result) => {
                // setIsFetching(false);
                isFetching.current = false
                if (result.ok) {
                    setActivityFeed(result.data.activity);
                }
                else {
                    history.push("/unauthorized");
                }
            })
    }, [userDetails]);


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

        return (< div id="total-pledges">
            <h3><i class="fas fa-donate"></i>My Total Pledges:</h3>
            {
                <h5>{`$${totalMoney} across ${userDetails.pledges.length} projects`}</h5>
            }
        </div>);
    }


    return (
        isFetching.current ?
            <Spinner />
            :

            <div id="homepage-container">
                {
                    userDetails ?
                        userDetails.location ?
                            <div id="activity-location-links">
                                <h6>
                                    <i class="fas fa-map-marker-alt"></i>
                                    You're in {userDetails.location.name}</h6>
                                <h6><Link to="/locations" className="coloured-text">Snoop on other communities <i class="fas fa-chevron-right"></i></Link></h6>
                            </div>
                            :
                            null
                        :
                        null
                }

                < div id="activity-content">
                    <div id="welcome-message" className="activity-card">
                        <h1>Hey {userDetails ? userDetails.user.username : null}</h1>
                        <h3>Welcome back! Thanks for supporting the creation of awesome projects in your local neighbourhood.</h3>
                        {
                            userDetails ?
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
                                    case "progress-update": return <ProgressUpdateCard key={index} project={item.project} image={item.image} info={item.info} date={item.date} />
                                    case "last-chance": return item.project.is_open ? <LastChanceCard key={index} project={item.project} /> : null
                                }
                            })
                            :
                            null
                    }
                </div >
            </div >
    );
}

export default HomePage;