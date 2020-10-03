import React, { useEffect, useState } from 'react';

import BadgeList from '../components/BadgeList/BadgeList';
import PledgeCard from '../components/PledgeCard/PledgeCard';
import UserProfileForm from '../components/UserProfile/UserProfileForm';

function UserAccountPage() {

    const [userData, setUserData] = useState({ user: {}, pledges: [], badges: [], projects: [] });

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

    const updateUserDetails = (userDetails) => {
        setUserData(prevData => {
            return {
                ...prevData,
                user: userDetails
            }
        })
    }

    return (
        <div>
            <div className="account-content">
                <UserProfileForm user={userData.user} updateUserDetails={updateUserDetails} />
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