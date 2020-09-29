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

    return (
        <div>
            <div className="account-content">
                <UserProfile user={userData.user} />
                {
                    userData.pledges.map((pledge, index) => { 
                        return <PledgeCard pledge={pledge} key={index} />
                    })
                }
            </div>
        </div>
    );
}

export default UserAccountPage;