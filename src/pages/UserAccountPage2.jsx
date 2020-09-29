import React, { useEffect, useState } from 'react';

import BadgeList from '../components/BadgeList/BadgeList';
import PledgeCard from '../components/PledgeCard/PledgeCard';
import UserProfile from '../components/UserProfile/UserProfile';

function UserAccountPage() {

    const [userData, setUserData] = useState({ user: {}, pledges: [], badges: [], projects: []});

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}account/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
        })
            .then((results) => {
                return results.json()
            })
            .then((data) => {
                console.log(data);
                setUserData(data);
                console.log("username: ", userData.user.username);
            });
    }, []);


    const [page, updatePage] = useState("badges");

    const getCurrentPage = (pageState) => {
        switch (pageState) {
            // case "badges": return <BadgeList badgeList={user.badges} />;
            case "pledges": let pledgeList = userData.pledges.map((pledge, index) => {
                return <PledgeCard pledge={pledge} key={index} />});
                return pledgeList;
            case "profile":
                return <UserProfile user={userData.user} />;
            default:
                return;
        }
    }

    return (
        <div>
            <button onClick={() => updatePage("badges")}>Badges</button>
            <button onClick={() => updatePage("pledges")}>Pledges</button>
            <button onClick={() => updatePage("profile")}>Profile</button>

            <div className="account-content">
                {getCurrentPage(page)}
            </div>
        </div>
    );
}

export default UserAccountPage;