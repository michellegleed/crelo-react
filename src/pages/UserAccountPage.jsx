import React, { useEffect, useState } from 'react';

import BadgeList from '../components/BadgeList/BadgeList';
import PledgeCard from '../components/PledgeCard/PledgeCard';
import UserProfile from '../components/UserProfile/UserProfile';

import { loggedInUser } from '../data';

function UserAccountPage() {

    const [page, updatePage] = useState("badges");

    const getCurrentPage = (pageState) => {
        switch (pageState) {
            case "badges": return <BadgeList badgeList={loggedInUser.badges} />;
            case "pledges": let pledgeList = loggedInUser.pledges.map((pledge, index) => {
                return <PledgeCard pledge={pledge} key={index} />});
                return pledgeList;
            case "profile":
                return <UserProfile user={loggedInUser} />;
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