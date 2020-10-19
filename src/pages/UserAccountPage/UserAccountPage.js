import React, { useEffect, useState, useContext } from 'react';

import PledgeCard from '../../components/PledgeCard/PledgeCard';
import UserProfileForm from '../../components/Forms/UserProfileForm/UserProfileForm';
import UserProfile from '../../components/UserProfile/UserProfile';

import { UserDetailsContext } from '../../utils/context';

import './UserAccountPage.css';

function UserAccountPage() {

    const { actions } = useContext(UserDetailsContext);

    const [userData, setUserData] = useState({ user: {}, pledges: [], location: {}, projects: [] });

    const [showForm, setShowForm] = useState(false);

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
                actions.updateAllDetails(data);

                console.log("username: ", userData.user.username);
            });
    }, []);

    const updateAccountDetails = (userDetails) => {
        setUserData(prevData => {
            return {
                ...prevData,
                user: userDetails.user,
                location: userDetails.location
            }
        })
        setShowForm(false);
    }

    return (
        <div>
            <h1 id="page-title">My Profile:</h1>

            <UserProfile user={userData.user} location={userData.location} />

            <div className="profile-form-container">
                <button onClick={() => setShowForm(true)}>Edit Profile</button>

                {showForm ?
                    <div className="account-page-section" id="edit-profile-form">
                        <UserProfileForm user={userData.user} location={userData.location} updateAccountDetails={updateAccountDetails} />
                    </div>
                    :
                    null}
            </div>

            <div className="account-page-section" id="user-pledges">
                <h1>Pledges:</h1>
                {userData.pledges.map((pledge, index) => {
                    return pledge.anonymous ?
                        null
                        :
                        <PledgeCard pledge={pledge} isProfilePage={true} key={index} />
                })
                }
            </div>
        </div>
    );
}

export default UserAccountPage;